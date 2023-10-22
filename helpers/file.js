const uploadFile = (file, path) => {
  return new Promise((resolve, reject) => {
    file.mv(path, (error) => {
      if (error) {
        reject(error);
      }

      resolve();
    });
  });
};

module.exports = {
  uploadFile,
};
