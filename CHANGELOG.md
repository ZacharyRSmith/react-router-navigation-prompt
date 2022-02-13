# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.9.6] - 2022-02-13
### Fixed
- security fixes: run `npm audit fix --force` (updated devDeps only)

## [1.9.5] - 2022-02-13
### Fixed
- security fixes: run `npm audit fix`
### Removed
- 08ae778 remove typescript from prepublishonly

## [1.9.4] - 2022-02-10
### Fixed
- package-lock.json out-of-sync with package.json

## [1.9.3] - 2022-02-10
### Fixed
- security fixes: Run npm audix fix

## [1.9.2] - 2022-02-10
### Fixed
- security fix: Updated package-lock.json and yarn.lock. Read more: https://github.com/ZacharyRSmith/react-router-navigation-prompt/pull/82

## [1.9.1] - 2021-09-18
### Fixed
- security fix: Updated package-lock.json and yarn.lock. Read more: https://github.com/ZacharyRSmith/react-router-navigation-prompt/pull/80

## [1.9.0] - 2021-09-18
### Added
- expose history action to this.props.when function. Read more: https://github.com/ZacharyRSmith/react-router-navigation-prompt/issues/78

## [1.8.15] - 2021-06-21
### Changed
- Enhanced README.md

## [1.8.14] - 2021-06-21
### Fixed
- security fix: Updated package.json

## [1.8.13] - 2020-07-15
### Changed
- Updated package.json

## [1.8.12] - 2020-06-19
### Changed
- Enhanced README.md

## [1.8.11] - 2020-04-16
### Fixed
- security fix: build(deps): bump https-proxy-agent from 2.2.1 to 2.2.4

## [1.8.10] - 2019-10-04
### Changed
- Flow

## [1.8.9] - 2019-10-03
### Changed
- Made Flow easier to consume

## [1.8.8] - 2019-09-28
### Changed
- Clarified README.md

## [1.8.7] - 2019-05-15
### Fixed
- TypeScript callback parameters to before* properties

## [1.8.6] - 2019-04-24
### Changed
- peerDependency ver of "react-router-dom" from "^4.2.2" to "4.x - 5"

## [1.8.5] - 2019-02-21
### Changed
- README.md to reduce number of people who run into context-binding issues

## [1.8.4] - 2019-01-17
### Fixed
- Flow typing

## [1.8.3] - 2019-01-17
### Fixed
- "Warning: A history supports only one prompt at a time" - by moving unblock assign to compodentDidMount

## [1.8.2] - 2018-11-30
### Fixed
- Typescript hated a semicolon

## [1.8.1] - 2018-11-28
### Fixed
- Typescript default export type

## [1.8.0] - 2018-10-09
### Added
- allowGoBack: bool prop (use _goBack_ method instead of _push_ when navigating back -- !! NOTE WELL !! it will _always_ navigate back only 1 item, even when it should navigate back more items.  read more: https://github.com/ZacharyRSmith/react-router-navigation-prompt/pull/30)

## [1.7.1] - 2018-10-09
### Fixed
- Typescript typings

## [1.7.0] - 2018-09-26
### Added
- Typescript typings

## [1.6.6] - 2018-09-15
### Added
- Note in README.md that BrowserHistory is supported, but not HashHistory

## [1.6.5] - 2018-09-02
### Added
- Demo to README.md

## [1.6.4] - 2018-07-25
### Fixed
- Only set state if mounted

## [1.6.3] - 2018-05-31
### Fixed
- README.md example

## [1.6.2] - 2018-05-28
### Added
- doc disableNative on README.md

## [1.6.1] - 2018-05-04
### Changed
- update: devDeps

## [1.6.0] - 2018-04-04
### Added
- Implements prop for disabling native browser confirmation

### Changed
- Update test script.

## [1.5.8] - 2018-03-18
### Fixed
- Only call when once from the block function.

## [1.5.7] - 2018-02-20
### Fixed
- Make prevUserAction an instance instead of module property

## [1.5.6] - 2018-02-20
### Fixed
- use entire location when navigation is confirmed

## [1.5.5] - 2018-01-23
### Changed
- Improve README

## [1.5.4] - 2018-01-22
### Added
- include package-lock.json in the repo

### Fixed
- make afterConfirm, afterCancel callable

## [1.5.3] - 2017-12-21
### Fixed
- Make react-router-dom an external dependency

## [1.5.2] - 2017-10-27
### Changed
- Update README

## [1.5.1] - 2017-10-25
### Fixed
- When action is `"POP"`, push (
We cannot know the correct history entry to pop to without using memory history - (https://github.com/ReactTraining/history#properties).)

## [1.5.0] - 2017-10-25
### Added
- props.when can be a function taking (crntLocation, nextLocation)

## [1.4.0] - 2017-10-24
### Added
- props.beforeCancel()
- props.beforeConfirm()
- props.afterCancel()
- props.afterConfirm()

## [1.3.0] - 2017-10-23
### Added
- tool: eslint

## [1.2.3] - 2017-10-23
### Fixed
- Handle history.pop()/history.goBack() correctly

## [1.2.2] - 2017-10-23
### Fixed
- build did not reflect src code

## [1.2.1] - 2017-10-23
### Fixed
- Access fresh props in history.block()'s callback

## [1.2.0] - 2017-10-23
### Added
- this.props.renderIfNotActive

## [1.1.2] - 2017-10-23
### Fixed
- build did not reflect src code

## [1.1.1] - 2017-10-23
### Fixed
- package.json

## [1.1.0] - 2017-10-22
### Changed
- Confirm navigation away from site

## [1.0.1] - 2017-10-22
### Added
- doc: Important caveat

## [1.0.0] - 2017-10-22
###
- this project's useable existence

## Older stuff
- why?
