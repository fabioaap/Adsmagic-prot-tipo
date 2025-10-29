import { defineConfig, devices } from "@playwright/test";

const storybookUrl = process.env.STORYBOOK_URL ?? "http://localhost:6006";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  testMatch: ["**/storybook-hub.smoke.spec.ts"],
  use: {
    baseURL: storybookUrl,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
