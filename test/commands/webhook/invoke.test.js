const { expect, test, constants, getFakeSid } = require('@twilio/cli-test');
const InvokeCommand = require('../../../src/commands/webhook/invoke');
const { Config, ConfigData } = require('@twilio/cli-core').services.config;

describe('webhook:invoke', () => {
  const runTest = test.do(ctx => {
    ctx.userConfig = new ConfigData();
    ctx.userConfig.addProfile(
      'default',
      constants.FAKE_ACCOUNT_SID,
      '',
      constants.FAKE_API_KEY,
      constants.FAKE_API_SECRET,
    );
    ctx.userConfig.setActiveProfile('default');
  })
    .env({ 'TWILIO_AUTH_TOKEN': '11111111111111111111111111111111' })
    .stdout()
    .twilioCliEnv(Config)


  runTest.nock('https://handler.twilio.com', api => {
    return api
      .post('/twiml/EHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
      .matchHeader('x-twilio-signature', 'kztpITUtQNpvjXiMmV/bZ6jnYms=')
      .reply(200, '<Response></Response>')
  }
  )
    .twilioCommand(InvokeCommand, ['https://handler.twilio.com/twiml/EHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'])
    .it('Makes a successful HTTP request with default values', ctx => {
      expect(ctx.stdout).to.equal('<Response></Response>')
    })


  runTest.nock('https://handler.twilio.com', api => {
    return api
      .get(uri => uri.startsWith('/twiml/EHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'))
      .matchHeader('x-twilio-signature', 'y3T/TQ1gBZSV7l22Cqpz3qz1YGM=')
      .reply(200, '<Response><Message>GET</Message></Response>')
  }
  )
    .twilioCommand(InvokeCommand, ['https://handler.twilio.com/twiml/EHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '-X', 'GET'])
    .it('Makes a GET request', ctx => {
      expect(ctx.stdout).to.equal('<Response><Message>GET</Message></Response>')
    })


  runTest.nock('https://handler.twilio.com', api => {
    return api
      .post(uri => uri.startsWith('/twiml/EHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'))
      .matchHeader('x-twilio-signature', 'cmt/eTktLhmz/At7Ip7ewFQsDPo=')
      .reply(200, '<Response><Say>POST</Say></Response>')
  }
  )
    .twilioCommand(InvokeCommand, ['https://handler.twilio.com/twiml/EHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '--type', 'voice'])
    .it('Handles voice requests', ctx => {
      expect(ctx.stdout).to.equal('<Response><Say>POST</Say></Response>')
    })


  runTest.nock('https://handler.twilio.com', api => {
    return api
      .post(uri => uri.startsWith('/twiml/EHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', body => body.includes("Body=%22Ahoy+from+tests%22")))
      .matchHeader('x-twilio-signature', '1kiKLAAQcu0UvIjTvxwAn8fuZKA=')
      .reply(200, '<Response><Say>POST</Say></Response>')
  }
  )
    .twilioCommand(InvokeCommand, ['https://handler.twilio.com/twiml/EHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '-d', 'Body="Ahoy from tests"'])
    .it('Handles voice requests', ctx => {
      expect(ctx.stdout).to.equal('<Response><Say>POST</Say></Response>')
    })


  runTest.nock('https://handler.twilio.com', api => {
    return api
      .post('/twiml/EHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
      .matchHeader('x-twilio-signature', 'oJQDvws9zhcj03RHMOW7CShnLvs=')
      .reply(200, '<Response></Response>')
  }
  )
    .twilioCommand(InvokeCommand, ['https://handler.twilio.com/twiml/EHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '--auth-token', '22222222222222222222222222222222'])
    .it('Handles custom auth token', ctx => {
      expect(ctx.stdout).to.equal('<Response></Response>')
    })


  runTest
    .stderr()
    .twilioCommand(InvokeCommand, ['https://handler.twilio.com/twiml/EHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '--auth-token', '1234'])
    .catch(err => { })
    .it('Fails with invalid auth token', ctx => {
      expect(ctx.stderr).to.contain('The Auth Token you passed is not valid.')
    })


  runTest
    .stderr()
    .env({ 'TWILIO_AUTH_TOKEN': '' })
    .twilioCommand(InvokeCommand, ['https://handler.twilio.com/twiml/EHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'])
    .catch(err => { })
    .it('Fails with missing auth-token', ctx => {
      expect(ctx.stderr).to.contain('A valid Auth Token is required.')
    })


  runTest
    .nock('https://handler.twilio.com', api => {
      return api
        .post('/twiml/EHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        .matchHeader('x-twilio-signature', '')
        .reply(200, '<Response></Response>')
    }
    )
    .env({ 'TWILIO_AUTH_TOKEN': '' })
    .twilioCommand(InvokeCommand, ['https://handler.twilio.com/twiml/EHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '--no-signature'])
    .it('Handles missing auth token with --no-signature ', ctx => {
      expect(ctx.stdout).to.equal('<Response></Response>')
    })


  runTest
    .nock('https://handler.twilio.com', api => {
      return api
        .post('/twiml/EHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        .matchHeader('x-twilio-signature', '1kiKLAAQcu0UvIjTvxwAn8fuZKA=')
        .reply(404, 'Endpoint not found')
    }
    )
    .stderr()
    .twilioCommand(InvokeCommand, ['https://handler.twilio.com/twiml/EHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'])
    .catch(err => { })
    .it('Handles failed request', ctx => {
      expect(ctx.stderr).to.contain('Request failed with status code 404')
    })


  runTest.nock('https://handler.twilio.com', api => {
    return api
      .defaultReplyHeaders({ 'X-Powered-By': 'nock' })
      .post('/twiml/EHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab')
      .matchHeader('x-twilio-signature', 'IAg6tLTh5CH+BUM9TYokw39DU4Y=')
      .reply(200, '<Response></Response>')
  }
  )
    .twilioCommand(InvokeCommand, ['https://handler.twilio.com/twiml/EHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab', '-i'])
    .it('Outputs headers', ctx => {
      expect(ctx.stdout.startsWith('HTTP/')).to.equal(true)
      expect(ctx.stdout).to.contain('x-powered-by: nock')
      expect(ctx.stdout).to.contain('<Response></Response>')
    })

});