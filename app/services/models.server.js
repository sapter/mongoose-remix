import { mongoose } from "~/services/db.server";

const postSchema = new mongoose.Schema({
  slug: String,
  title: String,
  html: String,
});

export const Post = mongoose.model("Post", postSchema);