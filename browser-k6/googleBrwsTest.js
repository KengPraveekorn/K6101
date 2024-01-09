import { browser } from "k6/experimental/browser";
import { check, sleep } from "k6";

const url = "https://www.google.com/";

export const options = {
  scenarios: {
    ui: {
      executor: "shared-iterations",
      // executor: "constant-vus",
      vus: 1,
      // duration: "40s",
      iterations: 1,
      options: {
        browser: {
          type: "chromium",
          headless: false,
        },
      },
      
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

    page.keyboard.press("Enter");

    // await page.waitForNavigation(),
    page.screenshot({ path: "screenshots/screenshot.png" }),
    
    // await Promise.all([
    //   page.waitForNavigation(),
    //   page.screenshot({ path: "screenshots/screenshot.png" }),
    // ])

    check(page, {
      header: (p) =>
        p.locator('#rso > div.hlcw0c > div > div > div > div > div > div > div > div.yuRUbf > div > span > a > h3').textContent() ===
        "Grafana k6: Load testing for engineering teams",
    });

    sleep(1);

  }finally {
    page.close();
  }
};
