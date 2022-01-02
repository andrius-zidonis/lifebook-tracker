const http = require('http');

const httpServer = http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headers = req.headers;
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', function(data) {
      buffer += decoder.write(data);
    });

    req.on('end', function() {
      buffer += decoder.end();

      const data = {
        trimmedPath: trimmedPath,
        queryStringObject: queryStringObject,
        method: method,
        headers: headers,
        payload: helpers.parseJsonToObject(buffer),
      };

      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      console.log(`
        Request is received on this path: ${trimmedPath} 
        with this method: ${method}
        with this query: ${JSON.stringify(queryStringObject)}
        with this headers: ${JSON.stringify(headers)}
        with payload: ${payloadString}
        response status: ${statusCode}
        ${!!error ? `error: ${JSON.stringify(error)}` : ''}
      `);
    });
});

const config = {
  httpPort: 80,
  envName: 'dev'
};

httpServer.listen(config.httpsPort, function() {
  console.log(`Listening on https://localhost:${config.httpsPort} now in ${config.envName} mode`);
});
