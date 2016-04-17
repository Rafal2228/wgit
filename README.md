# wgit

[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![devDependency Status][david-dev-image]][david-dev-url]

Simple cli for managing multiple projects in git

## Install globally

```bash
> npm install --global
```

## Install for development

```bash
> npm install --dev
```

## Usage

### Init wgit

```bash
> wgit init
```

### List projects

```bash
> wgit list
```

### Remote commands

```bash
> wgit status [tag]
> wgit submodule [tag]
> wgit branch [tag]
> wgit tag [tag]
> wgit diff [tag]
> wgit cached [tag]
> wgit fetch [tag]
> wgit pull [tag]
```

### Jump into repo

```bash
> cd $(wgit dunk [tag])
```

#### or

```bash
> cd `wgit dunk [tag]`
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

[travis-image]: https://travis-ci.org/Mc01/wgit.svg?branch=master
[travis-url]: https://travis-ci.org/Mc01/wgit

[coveralls-image]: https://coveralls.io/repos/github/Mc01/wgit/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/Mc01/wgit?branch=master

[david-image]: https://david-dm.org/Mc01/wgit.svg
[david-url]: https://david-dm.org/Mc01/wgit

[david-dev-image]: https://david-dm.org/Mc01/wgit/dev-status.svg
[david-dev-url]: https://david-dm.org/Mc01/wgit#info=devDependencies
