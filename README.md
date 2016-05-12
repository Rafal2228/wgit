# wgit

[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![devDependency Status][david-dev-image]][david-dev-url]

Simple cli for managing multiple projects in git

## Install

```bash
> npm install
```

## Link

```bash
> npm link
```

## Usage

### Init wgit

Initialize config file in ~/.wgit.json

```bash
> wgit init
```

### List projects

List all projects from config file

```bash
> wgit list
```

### Jump into repo

Changes directory to specified in project

```bash
> cd $(wgit dunk [tag])
```

#### or if you sourced init.sh

```bash
> wgit go [tag]
```

## Config file

Located in ~/.wgit.json

```json
{
  "projects": [
    {
      "name": "Project A",
      "root": "~/Projects/project_a",
      "repos": [
        {
          "name": "Dev 1",
          "tag": "dev1",
          "repo": "main/dev/1"
        },
        {
          "name": "Dev 2",
          "tag": "dev2",
          "repo": "branch/dev/2"
        }
      ]
    },
    {
      "name": "Project B",
      "root": "~/Projects/old/project_b",
      "repos": [
        {
          "name": "Old master",
          "tag": "old",
          "repo": "/"
        }
      ]
    }
  ]
}
```

## License

MIT

[travis-image]: https://api.travis-ci.org/wgit-io/wgit.svg?branch=master
[travis-url]: https://travis-ci.org/wgit-io/wgit

[coveralls-image]: https://coveralls.io/repos/github/wgit-io/wgit/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/wgit-io/wgit?branch=master

[david-image]: https://david-dm.org/wgit-io/wgit.svg
[david-url]: https://david-dm.org/wgit-io/wgit

[david-dev-image]: https://david-dm.org/wgit-io/wgit/dev-status.svg
[david-dev-url]: https://david-dm.org/wgit-io/wgit#info=devDependencies
