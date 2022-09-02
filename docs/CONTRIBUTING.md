# Contributing

## Setup

In order to get started with the project make sure you have the following installed:

- Node.js v14 or newer and npm v8.5 or newer
- The [Twilio CLI](https://www.twilio.com/docs/cli)
- git

To setup the project run:

```bash
git clone https://github.com/twilio-labs/plugin-webhook.git
cd plugin-webhook
npm install
twilio plugins:link .
```

This will clone the project repository, install the dependencies and connect your local plugin version to the CLI so you can use it. To check if everything works try to run:

```bash
twilio webhook:invoke --help
```

To validate that it's using your local version run `twilio plugins` and check if it says `(link)` and the path to your folder next to the plugin.

## Running Tests

To run the test suite run:

```bash
npm test
```

The tests are also automatically run when you open a pull request and on any merges to `main`.

## Committing and opening a pull request

After you have performed the intended changes and have successfully run the tests you can commit your changes.

Before you open a pull request, if your changes apply to anything that would require a new release of the package (for example changes in `src/`), please run the following command to describe your changes:

```bash
npm run changeset
```

Afterwards run:

```bash
git add .changeset
git commit -m "docs: add changeset updates"
```

This will make sure that your changes will appear in the changelog and that we can create a new release.

Once you are done, push your changes to a branch on your forked repository and open a pull request in the repository.

## Code of Conduct

All contributions and interactions with this project fall under our [Code of Conduct](https://github.com/twilio-labs/.github/blob/main/CODE_OF_CONDUCT.md)
