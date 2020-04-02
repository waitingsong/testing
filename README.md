# NPM mono repository


[![GitHub tag](https://img.shields.io/github/tag/waitingsong/npm-mono-base.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![](https://img.shields.io/badge/lang-TypeScript-blue.svg)
[![Node CI](https://github.com/waitingsong/testing/workflows/Node%20CI/badge.svg)](https://github.com/waitingsong/testing/actions?query=workflow%3A%22Node+CI%22)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)


## Initialization

```sh
npm run repo:init
```


## Update

```sh
npm run bootstrap
```


## Test

- Use `npm run lint` to check code style.
- Use `npm run test` to run unit test.


## Note

- Run `npm run clean` before `npm run build`, if any file under typescript outDir folder was deleted manually.
- Default publish registry is `NPM`, configurated in file `lerna.json`


## Packages

| Package             | Version                  | Dependencies                   | DevDependencies                  |
| ------------------- | ------------------------ | ------------------------------ | -------------------------------- |
| [`group-by-score`]  | [![group-svg]][group-ch] | [![group-d-svg]][group-d-link] | [![group-dd-svg]][group-dd-link] |
| [`find-node-by-id`] | [![find-svg]][find-ch]   | [![find-d-svg]][find-d-link]   | [![find-dd-svg]][find-dd-link]   |
| [`inc-node-name`]   | [![inc-svg]][inc-ch]     | [![inc-d-svg]][inc-d-link]     | [![inc-dd-svg]][inc-dd-link]     |


## License
[MIT](LICENSE)


### Languages
- [English](README.md)
- [中文](README.zh-CN.md)


[`group-by-score`]: https://github.com/waitingsong/testing/tree/master/packages/group-by-score
[group-svg]: https://img.shields.io/npm/v/testing.svg?maxAge=86400
[group-ch]: https://github.com/waitingsong/testing/tree/master/packages/group-by-score/CHANGELOG.md
[group-d-svg]: https://david-dm.org/waitingsong/testing.svg?path=packages/group-by-score
[group-d-link]: https://david-dm.org/waitingsong/testing.svg?path=packages/group-by-score
[group-dd-svg]: https://david-dm.org/waitingsong/testing/dev-status.svg?path=packages/group-by-score
[group-dd-link]: https://david-dm.org/waitingsong/testing?path=packages/group-by-score#info=devDependencies

[`find-node-by-id`]: https://github.com/waitingsong/testing/tree/master/packages/tree-node
[find-svg]: https://img.shields.io/npm/v/testing.svg?maxAge=86400
[find-ch]: https://github.com/waitingsong/testing/tree/master/packages/tree-node/CHANGELOG.md
[find-d-svg]: https://david-dm.org/waitingsong/testing.svg?path=packages/tree-node
[find-d-link]: https://david-dm.org/waitingsong/testing.svg?path=packages/tree-node
[find-dd-svg]: https://david-dm.org/waitingsong/testing/dev-status.svg?path=packages/tree-node
[find-dd-link]: https://david-dm.org/waitingsong/testing?path=packages/tree-node#info=devDependencies

[`inc-node-name`]: https://github.com/waitingsong/testing/tree/master/packages/increase-node-name
[inc-svg]: https://img.shields.io/npm/v/testing.svg?maxAge=86400
[inc-ch]: https://github.com/waitingsong/testing/tree/master/packages/increase-node-name/CHANGELOG.md
[inc-d-svg]: https://david-dm.org/waitingsong/testing.svg?path=packages/increase-node-name
[inc-d-link]: https://david-dm.org/waitingsong/testing.svg?path=packages/increase-node-name
[inc-dd-svg]: https://david-dm.org/waitingsong/testing/dev-status.svg?path=packages/increase-node-name
[inc-dd-link]: https://david-dm.org/waitingsong/testing?path=packages/increase-node-name#info=devDependencies

