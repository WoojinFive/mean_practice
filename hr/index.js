var http = require('http');
var employeeService = require('./lib/employees');
var responder = require('./lib/responseGenerator');
var staticFile = responder.staticFile('/public');

http.createServer(function (req, res) {
  // 인자를 파싱한 URL
  var _url;

  // 메서드명을 소문자로 사용하는 클라이언트에 대비해서 대문자로 통일
  req.method = req.method.toUpperCase();
  console.log(req.mothod + ' ' + req.url);

  if (req.method !== 'GET') {
    res.writeHead(501, {
      'Content-Type': 'text/plain'
    });
    return res.end(req.method + ' is not implemented by this server.');
  }

  if (_url = /^\/employees$/i.exec(req.url)) {
    // 직원 목록 반환
    //res.writeHead(200);
    //return res.end('employee list');

    employeeService.getEmployees(function (error, data) {
      if (error) {
        //500 오류 전송
        return responder.send500(error, res);
      }
      // 200 상태 코드와 함께 데이터 전송
      return responder.sendJson(data, res);
    });
  } else if (_url = /^\/employees\/(\d+)$/i.exec(req.url)) {
    // 라우트에 포함된 id로 직원 검색
    //res.writeHead(200);
    //return res.end('a single employee');

    employeeService.getEmployee(_url[1], function (error, data) {
      if (error) {
        // 500 오류 전송
        return responder.send500(error, res);
      }

      if (!data) {
        // 404 오류 전송
        return responder.send404(res);
      }
      // 200 상태 코드와 함께 데이터 전송
      return responder.sendJson(data, res);
    });
  } else {
    // 정적 파일 전송
    res.writeHead(200);
    res.end('static file maybe');

    //파일이 존재하면 정적 파일 전송 시도
    //그렇지 않으면 404 오류 전송
  }
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');