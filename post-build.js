import fs from "fs";
import path from "path";

const indexPath = path.join("dist", "index.html");

let html = fs.readFileSync(indexPath, "utf8");

html = html.replace(
  /<link\b(?=[^>]*\brel=(["'])preload\1)(?=[^>]*\bas=(["'])font\2)[^>]*\bhref=(["'])([^"']+)\3[^>]*>/gi,
  (_, _q1, _q2, _q3, href) => `<link href="${href}">`
);

html = html.replace(
  /\s+crossorigin(=("anonymous"|"use-credentials"|""|))?/gi,
  ""
);

fs.writeFileSync(indexPath, html, "utf8");
console.log("✅ post-build has done");
