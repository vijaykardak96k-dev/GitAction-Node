const { test } = require("node:test");
const assert = require("node:assert");
const { createServer } = require("../server");

test("Health endpoint returns healthy status", async () => {
    const server = createServer();

    await new Promise(resolve => server.listen(0, resolve));

    try {
        const port = server.address().port;
        const response = await fetch(`http://127.0.0.1:${port}/health`);
        const data = await response.json();

        assert.strictEqual(response.status, 200);
        assert.strictEqual(data.status, "healthy");
    } finally {
        await new Promise((resolve, reject) =>
            server.close(error => error ? reject(error) : resolve())
        );
    }
});
