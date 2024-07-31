import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
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
    image: {
        type: String,
    },
});

export default mongoose.model("Project", projectSchema);
