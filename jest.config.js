const { join } = require('path');

module.exports = {
  preset: null,
  name: 'plugin-webhook',
  displayName: 'plugin-webhook',
  globalTeardown: join(__dirname, 'jest.teardown.js'),
};
