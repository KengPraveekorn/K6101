import { browser } from "k6/experimental/browser";
import { check, sleep } from "k6";
import http from "k6/http";

export const options = {
  scenarios: {
    browser: {
      // executor: "constant-vus",
      // executor: "ramping-vus",
      executor: "per-vu-iterations",
      exec: "browserTest",
      // vus: 5,
      // duration: "30s",

      // startVUs: 0,
      // stages: [
      //   // { duration: "10s", target: 3 },
      //   { duration: "20s", target: 3 },
      //   { duration: "5s", target: 0 },
      // ],
      // gracefulRampDown: '0s',

      // vus: 1,
      // iterations: 5,

      options: {
        browser: {
          type: "chromium",
          headless: false,
        },
      },
    },
    ui: {
      executor: 'constant-vus',
      exec: 'protocolTest',
      vus: 20,
      duration: '30s',
    }
  },
};

export async function browserTest() {
  const page = browser.newPage();

  try {
    await page.goto("https://forms.office.com/r/ZAqdgQ3SbY?origin=lprLink");

    await page
      .locator('//*[@id="form-main-content1"]/div/div[3]/div[4]/button')
      .click(),
      page
        .locator('//*[@id="question-list"]/div[1]/div[2]/div/span/input')
        .fill("Praveekorn Chianglong"),
      page
        .locator('//*[@id="question-list"]/div[2]/div[2]/div/span/input')
        .fill("Keng"),
      page
        .locator('//*[@id="question-list"]/div[3]/div[2]/div/span/input')
        .fill("7773095"),
      page.locator("#DatePicker0-label").fill("08/27/1998"),
      await page
        .locator(
          '//*[@id="question-list"]/div[5]/div[2]/div/div/div[1]/div/label/span[1]/input'
        )
        .click(),
      await page
        .locator('//*[@id="form-main-content1"]/div/div/div[2]/div[3]/div')
        .click(),
      check(page, {
        Startform:
          page
            .locator("#FormTitleId_titleAriaId > div > span")
            .textContent() === "Demo Information Test",
        "Submit-Success":
          page
            .locator(
              '//*[@id="form-main-content1"]/div/div/div[2]/div/div[2]/div[1]/span'
            )
            .textContent() === "Your response has been successfully recorded.",
      });

    sleep(1);
  } finally {
    page.close();
  }
}

export function protocolTest() {
  const res = http.get('https://forms.office.com/r/ZAqdgQ3SbY?origin=lprLink');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

}
