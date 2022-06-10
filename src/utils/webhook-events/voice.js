const { event: baseEvent } = require('./_base');

const event = {
  headers: {
    ...baseEvent.headers,
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  body: {
    ...baseEvent.body,
    "CallSid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "CallStatus": "ringing",
    "CallToken": "",
    "Called": baseEvent.body.From,
    "CalledCity": baseEvent.body.FromCity,
    "CalledCountry": baseEvent.body.FromCountry,
    "CalledState": baseEvent.body.FromState,
    "CalledZip": baseEvent.body.FromZip,
    "Caller": baseEvent.body.To,
    "CallerCity": baseEvent.body.ToCity,
    "CallerCountry": baseEvent.body.ToCountry,
    "CallerState": baseEvent.body.ToState,
    "CallerZip": baseEvent.body.ToZip,
    "Direction": "inbound",
  }
}

module.exports = { event };