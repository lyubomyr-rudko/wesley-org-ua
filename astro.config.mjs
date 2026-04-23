// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";

export default defineConfig({
  site: "https://lyubomyr-rudko.github.io",
  integrations: [react(), partytown()],
});
