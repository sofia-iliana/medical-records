const cloudinaryModule = require("cloudinary");

const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: "dgbbbc71s",
  api_key: "643915499379861",
  api_secret: "_LqgwxDfoVU6M11EM20zeamlNiI",
});

module.exports = cloudinary;
