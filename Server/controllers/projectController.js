import projectModel from "../models/projectModel.js";
import chatController from "./chatController.js";
import dotenv from "dotenv";

dotenv.config();

const createProject = async (req, res) => {
  console.log("creating project");

  const name = req.body.name;
  const description = req.body.description;
  const members = req.body.members;
  const creator = req.body.creator;
  const gitRepo = req.body.gitRepo;
  const category = req.body.category;
  const idMembers = req.body.idMembers;
  const likes = req.body.likes;
  const idLikes = req.body.idLikes;
  const year = req.body.year;
  const gallary = [];
  const mainUrl = process.env.MAIN_URL;

  if (req.files) {
    req.files.forEach((file) => {
      gallary.push(`${mainUrl}/uploads/${file.originalname}`);
    });
  }

  if (!name || !creator) {
    return res.status(400).send("missing name or creator");
  }

  const bestDescription = await chatController.createDescription(description);
  console.log(bestDescription);

  try {
    const newProject = await projectModel.create({
      name: name,
      description: bestDescription,
      members: members,
      creator: creator,
      gitRepo: gitRepo,
      category: category,
      idMembers: idMembers,
      image: `${mainUrl}/${name}.jpg`,
      year: year,
      gallary: gallary,
    });

    res.status(201).send(newProject);
  } catch (err) {
    return res.status(500).send(err.message);
  }
  // res.status(200).send("Project created successfully");
};

const getProjects = async (req, res) => {
  console.log("getting projects");

  try {
    const projects = await projectModel.find();
    res.status(200).send(projects);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getProjectById = async (req, res) => {
  console.log("getting project by project id");

  const id = req.params.id;

  try {
    const project = await projectModel.findById(id);

    res.status(200).send(project);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getProjectsByCategory = async (req, res) => {
  console.log("getting projects by category");

  const category = req.params.category;
  if (category === "All Internships") {
    return getProjects(req, res);
  }
  console.log(category);

  try {
    const projects = await projectModel.find({ category: category });
    res.status(200).send(projects);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getProjectsByYear = async (req, res) => {
  console.log("getting projects by year");

  const year = req.params.year;
  if (year === "All Years") {
    return getProjects(req, res);
  }
  console.log(year);

  try {
    const projects = await projectModel.find({ year: year });
    res.status(200).send(projects);
  } catch (err) {
    return;
    res.status(500).send(err.message);
  }
};

const searchProjects = async (req, res) => {
  console.log("searching projects");

  const query = req.query.search || "";
  const category = req.query.category || "";
  const year = req.query.year || "";

  try {
    const filter = {
      $and: [
        { name: { $regex: query, $options: "i" } },
        category ? { category: category } : {},
        year ? { year: year } : {},
      ],
    };

    const projects = await projectModel.find(filter);
    res.status(200).send(projects);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getProjectsByUserID = async (req, res) => {
  console.log("getting projects by user ID");

  try {
    const { id } = req.params;

    const projects = await projectModel.find({ idMembers: { $in: [id] } });

    console.log(projects);

    res.status(200).send(projects);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// const searchProjects = async (req, res) => {
//   console.log("searching projects");

//   const query = req.query.search;

//   try {
//     const projects = await projectModel.find({ name: { $regex: query, $options: "i" } });
//     res.status(200).send(projects);
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// };

const deleteProject = async (req, res) => {
  console.log("deleting project");

  const { id } = req.params;

  try {
    const project = await projectModel.findByIdAndDelete(id);
    res.status(200).send(project);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const likeProject = async (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.body;
  console.log("This is the project ID: ", projectId);
  console.log("This is the user ID: ", userId);

  try {
    let project = await projectModel.findById(projectId);

    const userHasLiked = project.idLikes.includes(userId);

    if (userHasLiked) {
      project.idLikes = project.idLikes.filter((id) => id !== userId);
    } else {
      project.idLikes.push(userId);
    }

    project.likes = project.idLikes.length;

    await project.save();

    res.json({ likes: project.likes, isLiked: !userHasLiked });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const findBestFit = async (req, res, next) => {
  let query = req.query.search;

  // Extract all projects descriptions
  const projects = await projectModel.find({}, { _id: 1, description: 1, name: 1 }).exec();
  console.log(projects);

  // Construct the prompt for GPT
  const descriptionsText = projects
    .map((project, index) => `${project._id}. ${project.name}: ${project.description}`)
    .join("\n");

  const prompt = `
       Here are some project descriptions:
       ${descriptionsText}

      Based on the following query: "${query}", please rank the projects from most to least relevant.
      Provide the project ID, name, and a brief explanation of why it is relevant, in the following JSON format:
        {
          "results": [
            {
              "id": "project_id",
              "name": "project_name",
              "relevance": "explanation"
            }
          ]
        }
        Please return only the JSON without any additional explanations or text, make all the brackets and quotes are correct.
        `;

  req.prompt = prompt;
  next();
};

const updateProject = async (req, res) => {
  console.log("updating project");

  const { id } = req.params;
  console.log(id);

  const {
    name,
    description,
    members,
    creator,
    gitRepo,
    category,
    idMembers,
    year,
    likes,
    idLikes,
    image,
  } = req.body;

  const bestDescription = await chatController.createDescription(description);
  console.log(bestDescription);

  try {
    const project = await projectModel.findByIdAndUpdate(id, {
      name: name,
      description: bestDescription,
      members: members,
      creator: creator,
      gitRepo: gitRepo,
      category: category,
      idMembers: idMembers,
      year: year,
      likes: likes,
      idLikes: idLikes,
      image: image,
    });

    res.status(200).send(project);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export default {
  createProject,
  getProjects,
  getProjectById,
  getProjectsByCategory,
  getProjectsByUserID,
  searchProjects,
  deleteProject,
  likeProject,
  findBestFit,
  updateProject,
  getProjectsByYear,
};
