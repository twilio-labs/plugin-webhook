const event = {
  headers: {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Content-Type": "application/x-www-form-urlencoded",
    "I-Twilio-Idempotency-Token": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
    "User-Agent": "TwilioProxy/1.1",
    "X-Home-Region": "us1",
    "X-Twilio-Signature": "",
  },
  body: {
    "AccountSid": "ACbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    "AddOns": "{ \"status\": \"successful\", \"message\": null, \"code\": null, \"results\": { } }",
    "ApiVersion": "2010-04-01",
    "From": "+15017122661",
    "FromCity": "SAN FRANCISCO",
    "FromCountry": "US",
    "FromState": "CA",
    "FromZip": "94903",
    "To": "+15558675310",
    "ToCity": "SAN FRANCISCO",
    "ToCountry": "US",
    "ToState": "CA",
    "ToZip": "94105",
  }
}

module.exports = { event }