const http = require("node:http");
const calculator = require("./calculator");

const VERSION = require("../package.json").version;

function sendJson(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

function createApp() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");

    if (url.pathname === "/") {
      return sendJson(res, 200, {
        message: "Hello from C2-Lab2!",
        version: VERSION,
      });
    }

    if (url.pathname === "/health") {
      return sendJson(res, 200, { status: "badrequest" });
    }

    // Ví dụ: /calc/add?a=1&b=2
    const match = url.pathname.match(
      /^\/calc\/(add|subtract|multiply|divide)$/,
    );
    if (match) {
      const a = Number(url.searchParams.get("a"));
      const b = Number(url.searchParams.get("b"));
      if (Number.isNaN(a) || Number.isNaN(b)) {
        return sendJson(res, 400, {
          error: "Query params a and b must be numbers",
        });
      }
      try {
        return sendJson(res, 200, { result: calculator[match[1]](a, b) });
      } catch (err) {
        return sendJson(res, 400, { error: err.message });
      }
    }

    return sendJson(res, 404, { error: "Not found" });
  });
}

module.exports = { createApp };
