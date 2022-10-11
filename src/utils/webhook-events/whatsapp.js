const { event: baseEvent } = require('./_base');

const event = {
  headers: {
    ...baseEvent.headers,
  },
  body: {
    ...baseEvent.body.AccountSid,
    ...baseEvent.body.ApiVersion,
    "From": "whatsapp:+15017122661",
    "Body": "Test whatsapp msg",
    "MessageSid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "NumMedia": "0",
    "NumSegments": "1",
    "ReferralNumMedia": "0",
    "ProfileName": "PNaaaaa",
    "SmsMessageSid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "SmsSid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "SmsStatus": "received",
    "To":"whatsapp:+15558675310",
    "WaId":"15017122661",
  }
}

module.exports = { event };
