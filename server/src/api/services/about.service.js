import About from "../models/about.model.js";

async function getAbout() {
  return await About.findOne().sort({ createdAt: -1 });
}

async function saveAbout(content) {
  let about = await About.findOne();
  if (about) {
    about.content = content;
    return await about.save();
  } else {
    return await About.create({ content });
  }
}

async function deleteAbout() {
  return await About.deleteMany({});
}

export default {
  getAbout,
  saveAbout,
  deleteAbout,
};
