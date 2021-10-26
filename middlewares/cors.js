const allowedMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const allowedUrl = [
  'https://api.matrosov.mesto.nomoredomains.rocks',
  'http://localhost:3000',
  'https://localhost:3000',
  'https://matrosov.mesto.nomoredomains.rocks',
];

module.exports = (req, res, next) => {
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const { origin } = req.headers;

  if (allowedUrl.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', allowedMethods);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
