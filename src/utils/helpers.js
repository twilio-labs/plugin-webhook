const webhooks = require('twilio/lib/webhooks/webhooks');

function isValidAuthToken(token) {
  return typeof token === 'string' && token.length === 32;
}

function getEventData(type, accountSid, dataOverrides = {}) {
  const { event } = require(`./webhook-events/${type}`);
  event.body = {
    ...event.body,
    AccountSid: accountSid,
    ...dataOverrides
  }
  return event;
}

function getAxiosRequest(method, url, eventData, authToken) {
  let fullUrl = new URL(url);
  let data = undefined;
  const headers = { ...eventData.headers };

  if (method === 'GET') {
    for (const [key, value] of Object.entries(eventData.body)) {
      fullUrl.searchParams.append(key, value);
    }
  } else if (method === 'POST') {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(eventData.body)) {
      params.append(key, value);
    }
    data = params.toString();
  }

  if (isValidAuthToken(authToken)) {
    const signature = webhooks.getExpectedTwilioSignature(
      authToken,
      fullUrl.toString(),
      method === 'POST' ? eventData.body : {}
    );
    headers['X-Twilio-Signature'] = signature;
  }

  return {
    method,
    url: fullUrl.toString(),
    headers,
    data
  }
}

function getDataOverrides(dataFields) {
  const data = {};
  for (const entry of dataFields) {
    const [key, ...values] = entry.split('=');
    const value = values.join('=');
    data[key] = value;
  }
  return data;
}

module.exports = { getEventData, isValidAuthToken, getAxiosRequest, getDataOverrides };