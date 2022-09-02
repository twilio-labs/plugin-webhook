const axios = require('axios');
const { Flags } = require('@oclif/core');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { isValidAuthToken, getEventData, getAxiosRequest, getDataOverrides } = require('../../utils/helpers');

class InvokeCommand extends TwilioClientCommand {
  async run() {
    await super.run();
    const { flags, args } = await this.parse();

    const authToken = flags['auth-token'] || process.env.TWILIO_AUTH_TOKEN;
    const accountSid = this.twilioClient.accountSid || process.env.TWILIO_ACCOUNT_SID;

    const validAuthToken = isValidAuthToken(authToken);
    if (!validAuthToken) {
      if (!flags['no-signature'] && !authToken) {
        this.logger.error('A valid Auth Token is required.\nBy default we will use your TWILIO_AUTH_TOKEN environment variable. Alternatively, you can pass an auth token using the --auth-token="" flag or you can remove that requirement by using the --no-signature flag.');

        throw new Error('NO_AUTH_TOKEN')
      } else {
        this.logger.error('The Auth Token you passed is not valid. Please check that you provided the full Auth Token.')
        throw new Error('INVALID_AUTH_TOKEN');
      }
    }

    const dataOverrides = getDataOverrides(flags['data-urlencode'] || []);
    const data = getEventData(flags.type, accountSid, dataOverrides);

    try {
      const request = getAxiosRequest(flags.method, args.url, data, authToken)
      this.logger.debug(`Signature: "${request.headers['X-Twilio-Signature']}"`);

      const response = await axios.default.request(request);
      if (flags.include) {
        const headerOutput = Object.entries(response.headers).map(([key, value]) => {
          return `${key}: ${value}`
        }).join('\n')
        process.stdout.write(`HTTP/${response.request?.res.httpVersion || '1.1'} ${response.status} ${response.statusText}\n${headerOutput}\n\n`)
      }

      process.stdout.write(response.data);

    } catch (err) {
      this.logger.debug(err);
      this.logger.error(err.message);
      throw new Error('REQUEST_ERROR');
    }
  }
}

InvokeCommand.flags = {
  'type': Flags.enum({
    options: ['sms', 'voice'],
    description: 'What type of webhook event should it emulate?',
    'default': 'sms'
  }),
  'method': Flags.enum({
    options: ['GET', 'POST'],
    default: 'POST',
    description: 'The HTTP method that should be used for the webhook request',
    char: 'X'
  }),
  'auth-token': Flags.string({
    description: 'The Auth Token to use to generate the X-Twilio-Signature. Required unless --no-signature is used. Defaults to value of TWILIO_AUTH_TOKEN environment variable if nothing is passed.'
  }),
  'no-signature': Flags.boolean({
    default: false,
    description: 'Circumvents the generation of the X-Twilio-Signature field',
  }),
  'include': Flags.boolean({
    description: 'Output additional response data such as response headers',
    default: false,
    char: 'i'
  }),
  'data-urlencode': Flags.string({
    description: 'Override a request field. In the format Key=Value. Example: Body=Hello',
    multiple: true,
    char: 'd'
  }),
  'account-sid': Flags.string({
    description: 'The Account SID to use in the event data. Defaults to your active CLI profile or otherwise TWILIO_ACCOUNT_SID environment variable.'
  }),
  ...TwilioClientCommand.flags,
};

delete InvokeCommand.flags['cli-output-format'];

InvokeCommand.args = [
  {
    name: 'url',
    required: true,
    description: 'The URL of your webhook',
    hidden: false
  }
]

InvokeCommand.examples = [
  `# Invoke with a simulated call event\ntwilio webhook:invoke <your-url> --type=voice\n`,
  `# Pass in an explict auth token and Account SID to use\ntwilio webhook:invoke <your-url> --auth-token=$TWILIO_AUTH_TOKEN --account-sid=$TWILIO_ACCOUNT_SID --type=voice\n`,
  `# Simulate an SMS with the message "Hello"\ntwilio webhook:invoke <your-url> --auth-token=$TWILIO_AUTH_TOKEN --type=sms -d Body=Hello\n`,
  `# Skip X-Twilio-Signature header generation\ntwilio webhook:invoke <your-url> --no-signature\n`,
  `# Use Account SID from specific CLI profile\ntwilio webhook:invoke <your-url> --auth-token=$TWILIO_AUTH_TOKEN -p <your-profile>`
]

InvokeCommand.description = 'Emulate a Twilio webhook request to your URL';

InvokeCommand.docLink = 'https://github.com/twilio-labs/plugin-webhook';

module.exports = InvokeCommand;
