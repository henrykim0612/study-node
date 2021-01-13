const http = require('http');
const fs = require('fs').promises;

const parseCookies = (cookie = '') => cookie.split(';')
  .map(v => v.split('='))
  .reduce((acc, [k, v]) => {
    acc[k.trim()] = decodeURIComponent(v);
    return acc;
  }, {});

http.createServer(async (req, res) => {

  const baseUrl = 'http://localhost/';
  const cookies = parseCookies(req.headers.cookie);
  console.log(cookies);

  // 주소가 /login 으로 시작하는 경우
  if (req.url.startsWith('/login')) {
    // 책은 옛날 방식..url.parse 는 Deprecated 되었으므로 WHATWG 방식으로 바꿔야함..
    const myUrl = new URL(req.url, baseUrl);
    const name = myUrl.searchParams.get('name');
    const expires = new Date();
    // 쿠키 유효 시간을 현재 시간 +5 분으로 설정
    expires.setMinutes(expires.getMinutes() + 5);
    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toUTCString()}; HttpOnly; Path=/`,
    });
    res.end();
  } else if (cookies.name) {
    // name 쿠기가 있는 경우
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`${cookies.name} 님 안녕하세요`);
  } else {
    try {
      const data = await fs.readFile(__dirname + '/cookie2.html');
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(data);
    } catch (err) {
      res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
      res.end(err.message);
    }
  }
}).listen(8084, () => {
  console.log('8084 포트 대기중');
});