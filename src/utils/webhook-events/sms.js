const { event: baseEvent } = require('./_base');

const event = {
  headers: {
    ...baseEvent.headers,
  },
  body: {
    ...baseEvent.body,
    "Body": "Ahoy",
    "MessageSid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "NumMedia": "0",
    "NumSegments": "1",
    "ReferralNumMedia": "0",
    "SmsMessageSid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "SmsSid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "SmsStatus": "received",
  }
}

module.exports = { event };