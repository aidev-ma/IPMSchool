import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const svgPath = path.join(publicDir, "favicon.svg");

const svg = fs.readFileSync(svgPath);

const png32 = await sharp(svg).resize(32, 32).png().toBuffer();
const png48 = await sharp(svg).resize(48, 48).png().toBuffer();
const png180 = await sharp(svg).resize(180, 180).png().toBuffer();

fs.writeFileSync(path.join(publicDir, "favicon-32.png"), png32);
fs.writeFileSync(path.join(publicDir, "apple-touch-icon.png"), png180);

const icoBuffer = await pngToIco([png32, png48]);
fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);

console.log("Generated favicon-32.png, apple-touch-icon.png, favicon.ico");
