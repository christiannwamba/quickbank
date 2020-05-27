module.exports = function (req) {
  const header = req.headers['x-ms-client-principal'];
  const encoded = Buffer.from(header, 'base64');
  const decoded = encoded.toString('ascii');

  return JSON.parse(decoded);
};
