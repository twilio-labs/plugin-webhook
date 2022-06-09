<h1 align="center">@twilio-labs/plugin-webhook</h1>
<p align="center">Plugin for the <a href="https://github.com/twilio/twilio-cli">Twilio CLI</a> to test your Twilio webhooks and TwiML Bins.</p>
<p align="center">
<img alt="npm (scoped)" src="https://img.shields.io/npm/v/@twilio-labs/plugin-webhook.svg?style=flat-square"> <img alt="npm" src="https://img.shields.io/npm/dt/@twilio-labs/plugin-webhook.svg?style=flat-square"> <img alt="GitHub" src="https://img.shields.io/github/license/twilio-labs/plugin-serverless.svg?style=flat-square"> <a href="https://github.com/twilio-labs/.github/blob/main/CODE_OF_CONDUCT.md"><img alt="Code of Conduct" src="https://img.shields.io/badge/%F0%9F%92%96-Code%20of%20Conduct-blueviolet.svg?style=flat-square"></a> <a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome" /></a>
<hr>

This plugin adds functionality to the [Twilio CLI](https://github.com/twilio/twilio-cli) to invoke emulated webhook events including valid `X-Twilio-Signature` to validate the webhooks and TwiML Bins you are creating for your Twilio applications.

> **Important**: This version requires Twilio CLI version 3.0 or newer. For Twilio CLI version 2.x you have to use plugin-webhook version 1.2.6.

<!-- toc -->

<!-- tocstop -->

## Requirements

### Install the Twilio CLI

Via `npm` or `yarn`:

```sh-session
npm install -g twilio-cli
yarn global add twilio-cli
```

Via `homebrew`:

```sh-session
brew tap twilio/brew && brew install twilio
```

## Usage

```sh-session
$ twilio plugins:install @twilio-labs/plugin-webhook
$ twilio --help webhook
USAGE
  $ twilio webhook
...
```

## Commands

<!-- commands -->
* [`twilio webhook:invoke URL`](#twilio-webhookinvoke-url)

## `twilio webhook:invoke URL`

Emulate a Twilio webhook request to your URL

```
USAGE
  $ twilio webhook:invoke URL

ARGUMENTS
  URL  The URL of your webhook

OPTIONS
  -l=(debug|info|warn|error|none)  [default: info] Level of logging messages.
  -o=(columns|json|tsv|none)       [default: columns] Format of command output.
  -p, --profile=profile            Shorthand identifier for your profile.
  -v, --verbose                    Output additional response data such as response headers

  --auth-token=auth-token          The Auth Token to use to generate the X-Twilio-Signature. Required unless
                                   --no-signature is used.

  --method=(GET|POST)              [default: POST] The HTTP method that should be used for the webhook request

  --no-signature                   Circumvents the generation of the X-Twilio-Signature field

  --silent                         Suppress output and logs. This is a shorthand for "-l none -o none".

  --type=(sms|mms)                 [default: sms] What type of
```

_See code: [src/commands/webhook/invoke.js](https://github.com/twilio-labs/plugin-webhook/blob/v0.1.0/src/commands/webhook/invoke.js)_
<!-- commandsstop -->

### Code of Conduct

Please be aware that this project has a [Code of Conduct](https://github.com/twilio-labs/.github/blob/main/CODE_OF_CONDUCT.md). The tldr; is to just be excellent to each other ❤️

## License

MIT
