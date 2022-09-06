<h1 align="center">@twilio-labs/plugin-webhook</h1>
<p align="center">Plugin for the <a href="https://github.com/twilio/twilio-cli">Twilio CLI</a> to test your Twilio webhooks and TwiML Bins.</p>
<p align="center">
<img alt="npm (scoped)" src="https://img.shields.io/npm/v/@twilio-labs/plugin-webhook.svg?style=flat-square"> <img alt="npm" src="https://img.shields.io/npm/dt/@twilio-labs/plugin-webhook.svg?style=flat-square"> <img alt="GitHub" src="https://img.shields.io/github/license/twilio-labs/plugin-serverless.svg?style=flat-square"> <a href="https://github.com/twilio-labs/.github/blob/main/CODE_OF_CONDUCT.md"><img alt="Code of Conduct" src="https://img.shields.io/badge/%F0%9F%92%96-Code%20of%20Conduct-blueviolet.svg?style=flat-square"></a> <a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome" /></a>
<hr>

This plugin adds functionality to the [Twilio CLI](https://github.com/twilio/twilio-cli) to invoke emulated webhook events including valid `X-Twilio-Signature` to validate the webhooks and TwiML Bins you are creating for your Twilio applications.

<!-- toc -->

<!-- tocstop -->

## Requirements

### Install the Twilio CLI

This tool is a plugin for the Twilio CLI meaning you'll have to first install the Twilio CLI. You can [find instructions for a variety of environments in our docs](https://www.twilio.com/docs/cli).

If you are using `npm` or `yarn` for global CLI tools you can run:

```sh-session
npm install -g twilio-cli
yarn global add twilio-cli
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
  -X, --method=(GET|POST)              [default: POST] The HTTP method that should be used for the webhook request
  -d, --data-urlencode=data-urlencode  Override a request field. In the format Key=Value. Example: Body=Hello
  -i, --include                        Output additional response data such as response headers
  -l=(debug|info|warn|error|none)      [default: info] Level of logging messages.
  -p, --profile=profile                Shorthand identifier for your profile.

  --account-sid=account-sid            The Account SID to use in the event data. Defaults to your active CLI profile or
                                       otherwise TWILIO_ACCOUNT_SID environment variable.

  --auth-token=auth-token              The Auth Token to use to generate the X-Twilio-Signature. Required unless
                                       --no-signature is used. Defaults to value of TWILIO_AUTH_TOKEN environment
                                       variable if nothing is passed.

  --no-signature                       Circumvents the generation of the X-Twilio-Signature field

  --silent                             Suppress  output and logs. This is a shorthand for "-l none -o none".

  --type=(sms|voice)                   [default: sms] What type of webhook event should it emulate?

EXAMPLES
  # Invoke with a simulated call event
  twilio webhook:invoke <your-url> --type=voice

  # Pass in an explict auth token and Account SID to use
  twilio webhook:invoke <your-url> --auth-token=$TWILIO_AUTH_TOKEN --account-sid=$TWILIO_ACCOUNT_SID --type=voice

  # Simulate an SMS with the message "Hello"
  twilio webhook:invoke <your-url> --auth-token=$TWILIO_AUTH_TOKEN --type=sms -d Body=Hello

  # Skip X-Twilio-Signature header generation
  twilio webhook:invoke <your-url> --no-signature

  # Use Account SID from specific CLI profile
  twilio webhook:invoke <your-url> --auth-token=$TWILIO_AUTH_TOKEN -p <your-profile>
```

_See code: [src/commands/webhook/invoke.js](https://github.com/twilio-labs/plugin-webhook/blob/v0.1.0/src/commands/webhook/invoke.js)_
<!-- commandsstop -->

### Contributing

We always welcome contributions to this project. To learn more about how to get started, [check out our contribution guide](docs/CONTRIBUTING.md).

### Code of Conduct

Please be aware that this project has a [Code of Conduct](https://github.com/twilio-labs/.github/blob/main/CODE_OF_CONDUCT.md). The tldr; is to just be excellent to each other ❤️

## License

MIT
