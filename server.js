const http = require("http");

const HTML_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Deployment Successful</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      background: #0d1117;
      color: #e6edf3;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
    }

    /* ── Top badge ── */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 20px;
      padding: 6px 16px;
      font-size: 13px;
      color: #3fb950;
      font-weight: 600;
      letter-spacing: 0.4px;
      margin-bottom: 32px;
    }
    .badge-dot {
      width: 8px; height: 8px;
      background: #3fb950;
      border-radius: 50%;
    }

    /* ── Hero card ── */
    .card {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 16px;
      padding: 48px 56px;
      max-width: 760px;
      width: 100%;
      text-align: center;
    }

    .icon-wrap {
      width: 72px; height: 72px;
      background: linear-gradient(135deg, #238636 0%, #2ea043 100%);
      border-radius: 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 28px;
    }
    .icon-wrap svg { width: 38px; height: 38px; fill: #fff; }

    h1 {
      font-size: 32px;
      font-weight: 700;
      color: #f0f6fc;
      line-height: 1.2;
      margin-bottom: 12px;
    }
    h1 span { color: #3fb950; }

    .subtitle {
      font-size: 16px;
      color: #8b949e;
      line-height: 1.6;
      margin-bottom: 40px;
    }

    /* ── Stats row ── */
    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 40px;
    }
    .stat {
      background: #0d1117;
      border: 1px solid #21262d;
      border-radius: 12px;
      padding: 20px 16px;
    }
    .stat-value {
      font-size: 26px;
      font-weight: 700;
      color: #f0f6fc;
      line-height: 1;
      margin-bottom: 6px;
    }
    .stat-label {
      font-size: 12px;
      color: #8b949e;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      font-weight: 500;
    }

    /* ── Pipeline steps ── */
    .pipeline-title {
      font-size: 13px;
      font-weight: 600;
      color: #8b949e;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 16px;
      text-align: left;
    }
    .pipeline {
      display: flex;
      align-items: center;
      gap: 0;
      margin-bottom: 40px;
    }
    .step {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      position: relative;
    }
    .step:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 18px;
      left: calc(50% + 18px);
      right: calc(-50% + 18px);
      height: 2px;
      background: #3fb950;
    }
    .step-circle {
      width: 36px; height: 36px;
      border-radius: 50%;
      background: #238636;
      border: 2px solid #3fb950;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
      color: #fff;
      position: relative;
      z-index: 1;
    }
    .step-label {
      font-size: 12px;
      color: #8b949e;
      font-weight: 500;
      text-align: center;
    }

    /* ── Info row ── */
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 36px;
    }
    .info-item {
      background: #0d1117;
      border: 1px solid #21262d;
      border-radius: 10px;
      padding: 14px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
      text-align: left;
    }
    .info-icon {
      width: 32px; height: 32px;
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      font-size: 15px;
    }
    .info-icon.blue  { background: #1f3a5f; }
    .info-icon.green { background: #1a3a2a; }
    .info-icon.orange{ background: #3a2a0d; }
    .info-icon.purple{ background: #2a1a3a; }
    .info-text-label { font-size: 11px; color: #8b949e; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }
    .info-text-value { font-size: 14px; color: #e6edf3; font-weight: 600; margin-top: 2px; }

    /* ── Health pill ── */
    .health-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #0d1117;
      border: 1px solid #21262d;
      border-radius: 10px;
      padding: 14px 20px;
    }
    .health-left {
      display: flex; align-items: center; gap: 10px;
      font-size: 14px; color: #8b949e;
    }
    .health-left code {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 6px;
      padding: 2px 8px;
      font-family: 'Cascadia Code', 'Consolas', monospace;
      font-size: 13px;
      color: #79c0ff;
    }
    .health-status {
      display: flex; align-items: center; gap: 6px;
      font-size: 13px; font-weight: 600; color: #3fb950;
    }

    /* ── Footer ── */
    .footer {
      margin-top: 32px;
      font-size: 13px;
      color: #484f58;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .footer svg { width: 16px; height: 16px; fill: #484f58; }
  </style>
</head>
<body>

  <div class="badge">
    <span class="badge-dot"></span>
    GitHub Actions · CI/CD Pipeline
  </div>

  <div class="card">

    <div class="icon-wrap">
      <!-- checkmark -->
      <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
    </div>

    <h1>Deployment <span>Successful</span></h1>
    <p class="subtitle">
      Your Node.js application has been built, tested, packaged,<br/>
      and deployed to AWS EC2 — all automatically.
    </p>

    <!-- Stats -->
    <div class="stats">
      <div class="stat">
        <div class="stat-value" style="color:#3fb950;">4 / 4</div>
        <div class="stat-label">Jobs Passed</div>
      </div>
      <div class="stat">
        <div class="stat-value">Node 20</div>
        <div class="stat-label">Runtime</div>
      </div>
      <div class="stat">
        <div class="stat-value" style="color:#58a6ff;">EC2</div>
        <div class="stat-label">Target</div>
      </div>
    </div>

    <!-- Pipeline -->
    <p class="pipeline-title">Pipeline</p>
    <div class="pipeline">
      <div class="step">
        <div class="step-circle">1</div>
        <div class="step-label">Test</div>
      </div>
      <div class="step">
        <div class="step-circle">2</div>
        <div class="step-label">Package</div>
      </div>
      <div class="step">
        <div class="step-circle">3</div>
        <div class="step-label">Deploy</div>
      </div>
      <div class="step">
        <div class="step-circle">4</div>
        <div class="step-label">Verify</div>
      </div>
    </div>

    <!-- Info grid -->
    <div class="info-grid">
      <div class="info-item">
        <div class="info-icon blue">🌿</div>
        <div>
          <div class="info-text-label">Branch</div>
          <div class="info-text-value">main</div>
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon green">📦</div>
        <div>
          <div class="info-text-label">Artifact</div>
          <div class="info-text-value">nodejs-release</div>
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon orange">⚙️</div>
        <div>
          <div class="info-text-label">Process Manager</div>
          <div class="info-text-value">PM2 (fork mode)</div>
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon purple">🛡️</div>
        <div>
          <div class="info-text-label">Environment</div>
          <div class="info-text-value">Production</div>
        </div>
      </div>
    </div>

    <!-- Health check row -->
    <div class="health-row">
      <div class="health-left">
        Health endpoint &nbsp;<code>GET /health</code>
      </div>
      <div class="health-status">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="5" fill="#3fb950"/>
        </svg>
        200 OK — healthy
      </div>
    </div>

  </div>

  <div class="footer">
    <svg viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
        0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
        -.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2
        -3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82
        .64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08
        2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01
        1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
    </svg>
    github-actions-node &nbsp;·&nbsp; v1.0.0
  </div>

</body>
</html>`;

function createServer() {
    return http.createServer((req, res) => {
        if (req.url === "/health") {
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ status: "healthy" }));
        }

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(HTML_PAGE);
    });
}

if (require.main === module) {
    const PORT = process.env.PORT || 3000;

    createServer().listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = { createServer };
