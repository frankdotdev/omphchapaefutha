import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootProjectorPath = path.join(__dirname, "app", "projector", "page.tsx");
const rootProjectorDir = path.join(__dirname, "app", "projector");

try {
  if (fs.existsSync(rootProjectorPath)) {
    fs.unlinkSync(rootProjectorPath);
  }
  if (fs.existsSync(rootProjectorDir)) {
    fs.rmdirSync(rootProjectorDir);
  }
} catch (e) {
  // Ignore if already deleted
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
