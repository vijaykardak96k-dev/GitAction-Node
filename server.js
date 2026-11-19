const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/health") {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ status: "healthy" }));
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Node.js CI/CD Deployment Successful!</h1>");
});

server.listen(3000, "0.0.0.0", () => {
    console.log("Server running on port 3000");
});
