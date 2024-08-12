import projectModel from "../models/projectModel.js";
import userModel from "../models/userModel.js";

const createProject = async (req, res) => {
  console.log("creating project");

  const name = req.body.name;
  const description = req.body.description;
  const members = req.body.members;
  const creator = req.body.creator;
  const gitRepo = req.body.gitRepo;
  const category = req.body.category;
  const image = req.body.image;
  const idMembers = req.body.idMembers;

  if (!name || !creator) {
    return res.status(400).send("missing name or creator");
  }

  try {
    const newProject = await projectModel.create({
      name: name,
      description: description,
      creator: creator,
      members: members,
      gitRepo: gitRepo,
      category: category,
      idMembers: idMembers,
    });

    console.log(newProject);

    res.status(201).send(newProject);
  } catch (err) {
    return res.status(500).send(err.message);
  }
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
  console.log("getting project by  project id");

  try {
    const project = await projectModel.findById(id);
    //console.log(project);

    res.status(200).send(project);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getProjectsByCategory = async (req, res) => {
  console.log("getting projects by category");

  const category = req.params.category;
  console.log(category);

  try {
    const projects = await projectModel.find({ category: category });
    console.log(projects);
    res.status(200).send(projects);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getProjectsByUserID = async (req, res) => {
  console.log("getting projects by user ID");

  try {
    const { id } = req.params;
    console.log(id);

    const projects = await projectModel.find({ idMembers: id });
    res.status(200).send(projects);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const searchProjects = async (req, res) => {
  console.log("searching projects");

  const query = req.query.search;

  try {
    const projects = await projectModel.find({ name: { $regex: query, $options: "i" } });
    res.status(200).send(projects);
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
};
