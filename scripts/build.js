// Build đơn giản: copy src + package.json vào dist/ để làm artifact
const fs = require("node:fs");

fs.rmSync("dist", { recursive: true, force: true });
fs.mkdirSync("dist");
fs.cpSync("src", "dist/src", { recursive: true });
fs.copyFileSync("package.json", "dist/package.json");

console.log("Build completed: dist/");
