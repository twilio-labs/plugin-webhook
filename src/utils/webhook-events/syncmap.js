const { syncBaseEvent } = require('./syncBaseEvent');

const event = {
  headers: {
    ...syncBaseEvent.headers,
  },
  body: {
    ...syncBaseEvent.body,
    "ItemData": {"Identity":"user2"},
    "ItemRevision": "2",
    "MapSid": "MPccccccccccccccccccccccccccccccc",
    "MapUniqueName": "session123",
    "MapRevision": "3",
    "EventType": "map_item_added",
    "EventId": "10",
  }
};

module.exports = { event };
