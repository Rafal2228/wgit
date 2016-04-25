import find from 'findup-sync';

class Loader {
  constructor(filename, home = process.env.HOME) {
    this.args = process.argv;
    this.home = home;
    this.root = process.mainModule.filename;
    let file = find(filename, { cwd: this.home });
    if (file) {
      this.projects = require(file).projects;
      this.scan();
    } else {
      console.log('No valid root found.');
      process.exit(1);
    }
  }

  scan() {
    // To-Do: Change the way scan works
    this.tags = [];
    this.projects.forEach((item) => {
      item.repos.forEach((repo) => this.tags.push(repo.tag));
    });
  }

  _tagged(items, tag) {
    return items.filter((item) => item.tag === tag).shift();
  }

  browse(tag) {
    return this.projects
    .map((item) => {
      let repo = this._tagged(item.repos, tag);
      return repo ? [item.root, repo] : null;
    })
    .filter((item) => item !== null);
  }
}

export default Loader;
