// Lint đơn giản: kiểm tra cú pháp mọi file .js bằng `node --check`
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const dirs = ["src", "test", "scripts"];
let failed = false;

for (const dir of dirs) {
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".js")) continue;
    const filePath = path.join(dir, file);
    try {
      execFileSync(process.execPath, ["--check", filePath], { stdio: "pipe" });
      console.log(`✔ ${filePath}`);
    } catch (err) {
      failed = true;
      console.error(`✖ ${filePath}\n${err.stderr}`);
    }
  }
}

process.exit(failed ? 1 : 0);
