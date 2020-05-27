const request = require('request');
const util = require('util');
const randomstring = require('randomstring');

module.exports = async function (context, req) {
  const promiseRequest = util.promisify(request);
  context.log('JavaScript HTTP trigger function processed a request.');

  const type = req.body.type;
  const path = type === 'SEND_MONEY' ? '/transfers' : '/bills';
  let payload;
  console.log(req.body)

  if (type === 'SEND_MONEY') {
    payload = {
      beneficiary: req.body.beneficiary,
      currency: 'NGN',
      amount: req.body.amount,
    };
  } else {
    payload = {
      country: 'NG',
      customer: type === 'BUY_AIRTIME' ? req.body.to : '+2348034567890', // FLW does not have test for TV
      amount: req.body.amount,
      recurrence: 'ONCE',
      type: 'AIRTIME' , // Just use Airtime since FLW does not have test for TV
      reference: randomstring.generate({
        length: 8,
        capitalization: 'uppercase',
      }),
    };
  }
  const options = {
    method: 'POST',
    url: `${process.env.WAVE_BASE}/${path}`,
    headers: {
      Authorization: `Bearer ${process.env.WAVE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await promiseRequest(options);
console.log(response.statusCode)
    if (response.statusCode === 200) {
      context.res = {
        // status: 200, /* Defaults to 200 */
        body: response.body,
      };
    } else {
      context.res = {
        status: 500,
        body: response.body,
      };
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: 'A Wave error occurred',
    };
  }
};
