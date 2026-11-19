const http = require("http");

function createServer() {
    return http.createServer((req, res) => {
        if (req.url === "/health") {
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ status: "healthy" }));
        }

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Node.js CI/CD Deployment Successful!</h1>");
    });
}

if (require.main === module) {
    const PORT = process.env.PORT || 3000;

    createServer().listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = { createServer };
