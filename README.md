# clean-typescript

This is a simple typescript template repo for getting started.  Start coding index.ts.  Tooling uses:

- `tsc` for building
- `jest` for testing
- `npm` for versioning
- `.github/workflows` (i.e github actions) for automation
- `releasing` on github will publish to npm

If you want to release to npm you can release with the button in github and the github actions will ship it to npm.

If you are using this in your own project and want to publish to NPM you will need to save a token 

## To Do with a new repo

- [ ] Update the package.json with the correct repo and name
- [ ] Publish to npm for the first time. Doing it locally with `npm publish --access=public` is probably easiest
- [ ] Clear template info for readme and update with better info

### Versioning

These commands should be run from the master branch when ready to bump a version.
Bumping a version will commit the bump and push it up as long as pushing tags up for release.

- `npm run bump` - Bumps current version i.e. `1.2.4` would bump to `1.2.5`
- `npm run bump-minor` - Bumps Minor version i.e. `1.2.4` would bump to `1.3.0`
- `npm run bump-major` - Bumps current version i.e. `1.2.4` would bump to `2.0.0`


## In your repo, delete above this and carry on with your new repo ^^^

- [Getting Started](#getting-started)
<!-- add linkes to content here -->
- [Contributing](#contributing)


## Getting Started

<!-- Add example of how to npm install -->

<!-- Add content here code examples -->

## Contributing

Pull requests are welcome, if you add bloat they will be rejected.  Keep things simple.

### Running locally

```bash
npm run test # Runs the test runner
npm run build # Builds using `tsc` from configs in the `tsconfig.json`
npm run dev # Runs build and watches for changes
```

### Under the hood

- `tsc` for building js sent to `/dist/`
- `jest` for testing all `.test.ts` or `.spec.ts` files and files in `__test__`
- `npm` for versioning
- `.github/workflows` (i.e github actions) for automation
  - `main.yml` runs tests and build on all branches
  - `publish.yml` ships code to npm when a release is published
