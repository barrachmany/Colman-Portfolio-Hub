import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const generateTokens = async (user) => {
    try {
        const accessToken = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
        const refreshToken = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_REFRESH_SECRET);

        if (user.refreshTokens == null) {
            user.refreshTokens = [refreshToken];
        } else {
            user.refreshTokens.push(refreshToken);
        }
        await user.save();
        return {
            'accessToken': accessToken,
            'refreshToken': refreshToken
        };
    } catch (err) {
        console.log(err);
    }
}


const register = async (req, res) => {
    console.log("registering user");

    const email = req.body.email;
    const password = req.body.password;
    const id = req.body.id;
    const name = req.body.name;
    // const imgUrl = req.file ? req.file.path : null;

    if (!email || !password) {
        return res.status(400).send("missing email or password");
    }
    try {
        const checkIfUserAlreadyExist = await userModel.findOne({ 'email': email });
        if (checkIfUserAlreadyExist != null) {
            return res.status(406).send("email already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const newUser = await userModel.create(
            {
                email: email,
                password: encryptedPassword,
                id: id,
                name: name,
                // imgUrl: imgUrl
            });
        const tokens = await generateTokens(newUser)
        res.status(201).send(tokens);

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).send("missing email or password");
    }
    try {
        const user = await userModel.findOne({ 'email': email });
        if (user == null) {
            return res.status(401).send("email or password incorrect");
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send("email or password incorrect");
        }

        const tokens = await generateTokens(user)
        return res.status(200).send(tokens);

    } catch (err) {
        return res.status(400).send(err.message);
    }
}

const logout = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (refreshToken == null) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403);
        const userDB = await userModel.findOne({ 'email': user.email });
        userDB.refreshTokens = userDB.refreshTokens.filter(token => token !== refreshToken);
        await userDB.save();
        res.sendStatus(204);
    });
}

export default { register, login, logout };