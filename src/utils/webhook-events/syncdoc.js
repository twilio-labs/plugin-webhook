const { syncBaseEvent } = require('./syncBaseEvent');

const event = {
  headers: {
    ...syncBaseEvent.headers,
  },
  body: {
    ...syncBaseEvent.body,
    "DocumentData": {"fname":"test","lname":"user1"},
    "DocumentRevision": "1",
    "DocumentSid": "ETccccccccccccccccccccccccccccccc",
    "DocumentUniqueName": "test_doc",
  }
};

module.exports = { event };
