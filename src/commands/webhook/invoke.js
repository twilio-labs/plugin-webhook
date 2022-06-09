const axios = require('axios');
const { flags } = require('@oclif/command');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { isValidAuthToken, getEventData, getAxiosRequest, getDataOverrides } = require('../../utils/helpers');

class InvokeCommand extends TwilioClientCommand {
  async run() {
    await super.run();
    const { flags, args } = await this.parse();

    const validAuthToken = isValidAuthToken(flags['auth-token']);
    if (!validAuthToken && !flags['no-signature']) {
      throw new Error('A valid Auth Token is required. You can remove that requirement by using the --no-signature flag.')
    }

    const dataOverrides = getDataOverrides(flags['data-urlencode'] || []);
    const data = getEventData(flags.type, this.twilioClient.accountSid, dataOverrides);

    const request = getAxiosRequest(flags.method, args.url, data, flags['auth-token'])

    const response = await axios.default.request(request);

    if (flags.verbose) {
      this.output(response.headers)
    }

    this.output({ data: response.data });
  }
}

InvokeCommand.flags = {
  'type': flags.enum({
    options: ['sms'],
    description: 'What type of ',
    'default': 'sms'
  }),
  'method': flags.enum({
    options: ['GET', 'POST'],
    default: 'POST',
    description: 'The HTTP method that should be used for the webhook request'
  }),
  'auth-token': flags.string({
    description: 'The Auth Token to use to generate the X-Twilio-Signature. Required unless --no-signature is used.'
  }),
  'no-signature': flags.boolean({
    default: false,
    description: 'Circumvents the generation of the X-Twilio-Signature field',
  }),
  'verbose': flags.boolean({
    description: 'Output additional response data such as response headers',
    default: false,
    char: 'v'
  }),
  'data-urlencode': flags.string({
    description: 'Override a request field. In the format Key=Value. Example: Body=Hello',
    multiple: true,
    char: 'd'
  }),
  'account-sid': flags.string({
    description: 'The Account SID to use in the event data. Defaults to your active CLI profile.'
  }),
  ...TwilioClientCommand.flags,
};

InvokeCommand.args = [
  {
    name: 'url',
    required: true,
    description: 'The URL of your webhook',
    hidden: false
  }
]

InvokeCommand.description = 'Emulate a Twilio webhook request to your URL';

module.exports = InvokeCommand;
