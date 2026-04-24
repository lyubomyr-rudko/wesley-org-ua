// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";

const site = process.env.SITE_URL ?? "https://wesley.org.ua";
const base = process.env.SITE_BASE ?? "/";

export default defineConfig({
  site,
  base,
  integrations: [react(), partytown()],
});
