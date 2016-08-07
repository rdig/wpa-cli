# Contributing

Hi there contributor, we welcome you!

If you don't know were to start check out the [issues](https://github.com/rdig/wpa-cli/issues).

If you are a first timer look for those [labeled `good-first-bug`](https://github.com/rdig/wpa-cli/issues?q=is%3Aissue+is%3Aopen+label%3Agood-first-bug) or just ask around, there's always helpful people willing to set you on the right track.

If you still have no idea on how all these work or are fuzzy on the details, may I suggest watching the excelent [How to Contribute to an Open Source Project](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github) course on [egghead.io](https://egghead.io/).

## Issues

If you want a peticular feature, or noticed a bug head over to the [issues section](https://github.com/rdig/wpa-cli/issues) and [open new one](https://github.com/rdig/wpa-cli/issues/new).

### Bugs

Before submitting a new bug have a look at the issues [labeled `bug`](https://github.com/rdig/wpa-cli/issues?utf8=%E2%9C%93&q=label%3Abug%20) or [labeled `known-issue`](https://github.com/rdig/wpa-cli/issues?utf8=%E2%9C%93&q=label%3Aknown-issue%20) to make sure it wasn't already posted.

### New features

Before suggesting a new feature take a look at the [roadmap](https://github.com/rdig/wpa-cli#roadmap--todo) or the issues [labeled `roadmap`](https://github.com/rdig/wpa-cli/issues?utf8=%E2%9C%93&q=label%3Aroadmap%20), maybe it's already scheduled. If it's not, [submit it](https://github.com/rdig/wpa-cli/issues/new)!

### Manual testing

A lesser known method of contributing to a project is to manual install / clone the package and see it's working on different architectures / operating systems.

Since most of the times these are overlooked, we would gladly accept issues / PRs discovered through testing in this manner.

## Code

If you want to contribute code, fix bugs or add new features, here is what you need to know:

### Outline

This is a quick outline of the code contributing process:

1. Fork the repo
2. Create a new brach
3. Write new code / bugfix existing code
4. Lint your code
5. Write the tests *(in all honesty this should come before writing the code)*
6. Test your code
7. Submit a pull request to this repo

### Getting started

Fork and clone the repo *(change repo name as per your namespace / fork name)*:
```
git clone git@github.com:your-name/wpa-cli-fork.git
```

Install `npm`'s dependencies listed in `package.json`:
```
npm i
```

You have a number of `npm scripts` which you can use while developing. To run them use:
```
npm run <task_name>
```

The task are the following:

- `lint`: run `eslint`to lint your code. When done it will exit.
- `lint:watch`: continuously run `eslint` and watch for file changes.
- `test`: run `mocha` tests. When done, it will exit.
- `test:watch`: continuously run `mocha` and watch for file changes.

There is one more `npm script`, `prepublish` but that is only used before publishing / updating the package on [npmjs.com](https://www.npmjs.com/).

If you add new `npm packages` to the project, if they are project `dependencies` *(NOT dev dependencies)* plese make sure to `shrinkwrap` them by running:
```
npm shrinkwrap
```

Happy coding!

### Write tests

At the moment, this project lacks proper unit tests. If you contribute code, please [write tests](https://github.com/rdig/wpa-cli/tree/master/tests) *(Mocha/chai)* so we may be finally able to increase our code coverage.

### Contributing section

If you submit a new feature / bufix, and this is your first one, please make sure to also add you name / email *([npm person Object format](https://docs.npmjs.com/files/package.json#people-fields-author-contributors))* to the [contributors section](https://github.com/rdig/wpa-cli/blob/master/package.json#L32) inside of package.json

**Thanks for being awesome!**
