# wgit

[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![devDependency Status][david-dev-image]][david-dev-url]

Beautiful project manager living in your shell

## Install

```bash
> npm install
```

## Link

```bash
> npm link
```

### Init

```bash
> wgit init
```

## Usage

### Add projects

(To be added in `crawl` branch)

```bash
> wgit crawl
```

### List projects

List git info of every defined project and it's submodules

```bash
> wgit list
```

### Go into project

Changes directory to specified in project

```bash
> cd $(wgit dunk [tag])
```

Or if you sourced init.sh (To be added in `expose` branch)

```bash
> echo "source ~/.wgit/init.sh" >> ~/.bash_profile
```

You can directly use

```bash
> wgit go [tag]
```

## License

MIT

[travis-image]: https://api.travis-ci.org/wgit-io/wgit.svg?branch=master
[travis-url]: https://travis-ci.org/wgit-io/wgit

[coveralls-image]: https://coveralls.io/repos/github/wgit-io/wgit/badge.svg?branch=master&
[coveralls-url]: https://coveralls.io/github/wgit-io/wgit?branch=master

[david-image]: https://david-dm.org/wgit-io/wgit.svg
[david-url]: https://david-dm.org/wgit-io/wgit

[david-dev-image]: https://david-dm.org/wgit-io/wgit/dev-status.svg
[david-dev-url]: https://david-dm.org/wgit-io/wgit#info=devDependencies
