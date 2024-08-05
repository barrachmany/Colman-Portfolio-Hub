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

export default { createProject };
