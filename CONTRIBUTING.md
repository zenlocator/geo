# CONTRIBUTING

Contributions are welcome, and are accepted via pull requests. Please review these guidelines before submitting any pull requests.

## Guidelines

- Please make sure your code passes the linter: `npm run lint`
- Ensure that the current tests pass, and if you've added something new, add the tests where relevant.
- Send a coherent commit history, making sure each individual commit in your pull request is meaningful.
- You may need to [rebase](https://git-scm.com/book/en/v2/Git-Branching-Rebasing) to avoid merge conflicts.
- If you are changing the behavior, or the public api, you may need to update the docs.
- Be sure to run `npm run build` before submitting a pull request.
- Please remember that we follow [SemVer](http://semver.org).

When you make a pull request, the tests will automatically be run again by [Travis CI](https://travis-ci.org).
