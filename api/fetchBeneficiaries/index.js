const request = require('request');
const util = require('util');

module.exports = async function (context, req) {
  const promiseRequest = util.promisify(request);
  context.log('JavaScript HTTP trigger function processed a request.');

  var options = {
    method: 'GET',
    url: `${process.env.WAVE_BASE}/beneficiaries`,
    headers: {
      Authorization: `Bearer ${process.env.WAVE_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await promiseRequest(options);

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: response.body,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: 'A Wave error occurred',
    };
  }
};
