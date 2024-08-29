import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  refreshTokens: {
    type: Array,
  },
});

export default mongoose.model("User", userSchema);
