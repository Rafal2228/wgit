module.exports = function (wgit) {
  wgit.args = process.argv;
  wgit.home = process.env.HOME;
  wgit.root = process.mainModule.filename;
};
