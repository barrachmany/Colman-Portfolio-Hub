import projectModel from "../models/projectModel.js";

const createProject = async (req, res) => {
  console.log("creating project");

  const name = req.body.name;
  const description = req.body.description;
  const members = req.body.members;
  const creator = req.body.creator;
  const gitRepo = req.body.gitRepo;
  const category = req.body.category;
  const image = req.body.image;

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
}

const getProjectById = async (req, res) => {
  console.log("getting project by id");

  const id = req.params.id;

  try {
    const project = await projectModel.findById(id);
    res.status(200).send(project);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const getProjectsByCategory = async (req, res) => {
  console.log("getting projects by category");

  const category = req.params.category;

  try {
    const projects = await projectModel.find({ category: category });
    res.status(200).send(projects);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const getProjectsByCreator = async (req, res) => {
  console.log("getting projects by creator");

  const creator = req.params.creator;

  try {
    const projects = await projectModel.find({ creator: creator });
    res.status(200).send(projects);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

const searchProjects = async (req, res) => {
  console.log("searching projects");

  const query = req.query.search;

  try {
    const projects = await projectModel.find({ name: { $regex: query, $options: "i" } });
    res.status(200).send(projects);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}


export default { createProject, getProjects, getProjectById, getProjectsByCategory, getProjectsByCreator, searchProjects };
