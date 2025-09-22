import aboutService from "../services/about.service.js";
import saveImage  from "../services/uploadService.js";

const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const url = await saveImage(file);
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: "Image upload failed" });
  }
};
const getAbout = async (req, res) => {
  try {
    const about = await aboutService.getAbout();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch about content" });
  }
};

const saveAbout = async (req, res) => {
  try {
    const { content } = req.body;
    const about = await aboutService.saveAbout(content);
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: "Failed to save about content" });
  }
};

const deleteAbout = async (req, res) => {
  try {
    await aboutService.deleteAbout();
    res.json({ message: "About Us section deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete about content" });
  }
};

export default {
    uploadImage,
    getAbout,
    saveAbout,
    deleteAbout
}