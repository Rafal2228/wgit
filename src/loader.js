const find = require('findup-sync');

module.exports = function (wgit) {
  wgit.scan = function () {
    let tags = [];
    let append = (item) => tags.push(item.tag);

    this.projects.map((item) => {
      item.repos.map(append);
    });

    return tags;
  };

  wgit.loadConfig = function (filename) {
    let file = find(filename, { cwd: this.home });
    if (file) {
      this.projects = require(file).projects;
      this.tags = this.scan();
    } else {
      console.log('No valid root found.');
      process.exit(1);
    }
  };

  wgit._tagged = function (items, tag) {
    return items.filter((item) => item.tag === tag).shift();
  };

  wgit.browse = function (tag) {
    return this.projects
    .map((item) => {
      let repo = this._tagged(item.repos, tag);
      return repo ? [item.root, repo] : null;
    })
    .filter((item) => item !== null);
  };
};
