import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  idMembers: {
    type: [String],
    default: [],
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  creator: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    default: [],
  },
  gitRepo: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
});

// sassasa

export default mongoose.model("Project", projectSchema);
