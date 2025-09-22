import path from "path";
import fs from "fs";

async function saveImage(file) {
  const uploadDir = path.join(__dirname, "../uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
  
  const filename = Date.now() + "-" + file.originalname;
  const filePath = path.join(uploadDir, filename);

  await fs.promises.writeFile(filePath, file.buffer);
  return `/uploads/${filename}`; // URL to serve image
}

export default saveImage ;
