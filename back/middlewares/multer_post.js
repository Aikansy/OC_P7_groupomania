// *************************************************************************************** IMPORT(S)

const multer = require("multer");
const fs = require("fs");

// **************************************************************************** MULTER CONFIG OBJECT

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/gif": "gif",
  "image/svg": "svg",
  "image/webp": "webp",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(file);
    console.log(req.body);

    const dir = `../front/src/uploads/posts/user_${req.body.creator_id}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    callback(null, dir);
  },
  filename: (req, file, callback) => {
    const fileName = "creatorid_" + req.body.creator_id;
    const extension = MIME_TYPES[file.mimetype];
    callback(null, fileName + "." + extension);
  },
});

// *************************************************************************************** EXPORT(S)

module.exports = multer({ storage }).single("image");
