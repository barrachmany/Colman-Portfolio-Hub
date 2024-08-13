import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateTokens = async (user) => {
  try {
    const accessToken = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    const refreshToken = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_REFRESH_SECRET
    );

    if (user.refreshTokens == null) {
      user.refreshTokens = [refreshToken];
    } else {
      user.refreshTokens.push(refreshToken);
    }
    await user.save();
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const email = req.user.email;
    const userDB = await userModel.findOne({ email: email });

    if (!userDB) {
      return res.status(404).send("User not found");
    }

    if (req.body.email && req.body.email !== userDB.email) {
      const existingUser = await userModel.findOne({ email: req.body.email });
      if (existingUser && existingUser._id.toString() !== userDB._id.toString()) {
        return res.status(406).send("Email already exists");
      }

      userDB.email = req.body.email;
    }

    if (req.body.name) {
      userDB.name = req.body.name;
    }

    if (req.body.password && req.body.password !== userDB.password) {
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(req.body.password, salt);
      userDB.password = encryptedPassword;
    }

    await userDB.save();

    const tokens = await generateTokens(userDB);

    res.status(200).json(tokens);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const getUser = async (req, res) => {
  try {
    const _id = req.user._id;
    const userDB = await userModel.findOne({ _id: _id });
    if (!userDB) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(userDB);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const deleteUser = async (req, res) => {
  const email = req.user.email;
  const userDB = await userModel.findOne({ email: email });
  await userDB.delete();

  res.sendStatus(204);
};

const register = async (req, res) => {
  console.log("registering user");

  const email = req.body.email;
  const password = req.body.password;
  const id = req.body.id;
  const name = req.body.name;
  const imgUrl = req.file ? req.file.path : null;

  if (!email || !password) {
    return res.status(400).send("missing email or password");
  }
  try {
    const checkIfUserAlreadyExist = await userModel.findOne({ email: email });
    if (checkIfUserAlreadyExist != null) {
      return res.status(406).send("email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    const newUser = await userModel.create({
      email: email,
      password: encryptedPassword,
      id: id,
      name: name,
      imgUrl: imgUrl,
    });
    const tokens = await generateTokens(newUser);
    res.status(201).send(tokens);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).send("missing email or password");
  }
  try {
    const user = await userModel.findOne({ email: email });
    if (user == null) {
      return res.status(400).send("email or password incorrect");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send("email or password incorrect");
    }

    const tokens = await generateTokens(user);
    return res.status(200).send(tokens);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const logout = async (req, res) => {
  const userDB = await userModel.findOne({ email: user.email });
  userDB.refreshTokens = userDB.refreshTokens.filter((token) => token !== refreshToken);
  await userDB.save();
  res.sendStatus(204);
};

export default { register, login, logout, updateUser, getUser, deleteUser };
