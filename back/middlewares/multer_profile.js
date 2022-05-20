// *************************************************************************************** IMPORT(S)

const multer = require("multer");
const fs = require("fs");

// **************************************************************************** MULTER CONFIG OBJECT

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const dir = `../front/src/uploads/profils/user_${req.params.id}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    callback(null, dir);
  },
  filename: (req, file, callback) => {
    const fileName = "profile" + "_" + req.params.id;
    const extension = ".jpg";
    callback(null, fileName + extension);
  },
});

// *************************************************************************************** EXPORT(S)

module.exports = multer({ storage }).single("image");
