const { event: baseEvent } = require('./_base');

const syncBaseEvent = {
  headers: {
    ...baseEvent.headers,
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  body: {
    ...baseEvent.body.AccountSid,
    "DateCreated": "2022-09-17T23:31:53.232Z",
    "ServiceSid": "IS0aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "EndpointId": "twi1-12345cccccccccccccccbbbbddddxxxx",
    "EventId": "6",
    "EventType": "document_updated",
    "Identity": "user1",
    "ProtocolVersion": "v3",
  }
};

module.exports = { syncBaseEvent }
