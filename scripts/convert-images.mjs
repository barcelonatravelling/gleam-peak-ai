import sharp from "sharp";

const images = [
  "hero-ai-network",
  "enterprise-copilot",
  "decision-intelligence",
  "team-collaboration",
  "business-scaling",
  "assistant-icon",
];

for (const name of images) {
  await sharp(`public/${name}.png`)
    .webp({ quality: 80 })
    .toFile(`public/${name}.webp`);

  console.log(`Converted ${name}.png → ${name}.webp`);
}