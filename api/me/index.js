const request = require('request');
const util = require('util');
const getLoggedInUser = require('../lib/getLoggedInUser');

module.exports = async function (context, req) {
  const promiseRequest = util.promisify(request);
  const me = getLoggedInUser(req);
  var gitHubRequestOptions = {
    method: 'GET',
    url: `https://api.github.com/users/${me.userDetails}`,
    headers: {
      'Content-Type': 'application/json',
      'user-agent': 'node.js',
    },
  };
  const githubResponse = await promiseRequest(gitHubRequestOptions);

  context.res = {
    body: {
      clientPrincipal: me,
      profile: JSON.parse(githubResponse.body)
    },
  };
};
