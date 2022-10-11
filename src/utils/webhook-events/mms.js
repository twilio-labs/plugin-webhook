const { event: baseEvent } = require('./_base');

const event = {
  headers: {
    ...baseEvent.headers,
  },
  body: {
    ...baseEvent.body,
    "Body": "This is MMS type sample",
    "MessageSid": "MMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "MessagingServiceSid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "MediaContentType0": "image/jpeg",
    "MediaUrl0": "https://api.twilio.com/2010-04-01/Accounts/ACbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb/Messages/MMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media/MEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "NumMedia": "1",
    "NumSegments": "1",
    "ReferralNumMedia": "0",
    "SmsMessageSid": "MMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "SmsSid": "MMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "SmsStatus": "received",
  }
}

module.exports = { event };
