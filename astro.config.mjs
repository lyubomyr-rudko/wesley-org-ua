// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";

export default defineConfig({
  site: process.env.SITE_URL ?? "https://wesley.org.ua",
  integrations: [react(), partytown()],
});
