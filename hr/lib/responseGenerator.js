var fs = require('fs');

exports.send404 = function (response) {
  console.error("Resource not found");
  response.writeHead(404, {
    'Content-Type': 'text/plain'
  });

  response.end('Not Found');
}

exports.sendJson = function (data, response) {
  response.writeHead(200, {
    'Content-Type': 'application/json'
  });

  response.end(JSON.stringify(data));
}

exports.send500 = function (data, response) {
  console.error(data.red);
  response.writeHead(500, {
    'Content-type': 'text-plain'
  });

  response.end(data);
}

exports.staticFile = function (staticPath) {
  return function(data, response) {
    var readStream;

    //라우트를 수정해서 /home과 /home.html 모두 동작하게 만든다
    data = data.replace(/^(\/home).(.html)?$/i, '$1.html');
    data = '.' + staticPath + data;

    fs.stat(data, function (error, stats) {
      if (error || stats.isDirectory()) {
        return exports.send404(response);
      }

      readStream = fs.createReadStream(data);
      return readStream.pipe(response);
    });
  }
}