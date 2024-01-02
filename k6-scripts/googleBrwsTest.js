import { browser } from "k6/experimental/browser";
import { check } from "k6";

const url = "https://www.google.com/";

export const options = {
  scenarios: {
    ui: {
      executor: "shared-iterations",
      options: {
        browser: {
          type: "chromium",
          headless: false,
        },
      },
      vus: 3,
      //   duration: "5m",
      iterations: 10,
      //   maxDuration: "10s",
    },
  },
  //   thresholds: {
  //     checks: ["rate==1.0"],
  //   },
};

export default async () => {
  const page = browser.newPage();

  try {
    await page.goto(url);
    page.locator('textarea[name="q"]').type("K6");

    // const submitButton = page.locator('input[type="submit"]');
    // await Promise.all([page.waitForNavigation(), submitButton.click()]);

    page.keyboard.press("Enter");

    // await Promise.all([
    //   page.waitForNavigation(),
    //   page.screenshot({ path: "screenshots/screenshot.png" }),
    // ])

    // check(page, {
    //   header: (p) =>
    //     p.locator("h3").textContent() ==
    //     "Grafana k6: Load testing for engineering teams",
    // });
  } catch (err) {
    console.error(err);
  } finally {
    page.close();
  }
};
