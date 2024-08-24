import projectModel from "../models/projectModel.js";

const createProject = async (req, res) => {
  console.log("creating project");

  const name = req.body.name;
  const description = req.body.description;
  const members = req.body.members;
  const creator = req.body.creator;
  const gitRepo = req.body.gitRepo;
  const category = req.body.category;
  const idMembers = req.body.idMembers;

  if (!name || !creator) {
    return res.status(400).send("missing name or creator");
  }

  try {
    const newProject = await projectModel.create({
      name: name,
      description: description,
      members: members,
      creator: creator,
      gitRepo: gitRepo,
      category: category,
      idMembers: idMembers,
      image: `http://localhost:5000/images/${name}.jpg`,
    });

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
  if (category === "All") {
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

export default {
  createProject,
  getProjects,
  getProjectById,
  getProjectsByCategory,
  getProjectsByUserID,
  searchProjects,
  deleteProject,
};
