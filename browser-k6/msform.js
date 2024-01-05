import { browser } from 'k6/experimental/browser';
import { check,sleep } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {
    browser: {
      executor: 'constant-vus',
      exec: 'browserTest',
      vus: 1,
      duration: '3s',
      options: {
        browser: {
          type: 'chromium',
        }
      }
    }
  }
};

export async function browserTest() {
  const page = browser.newPage();

  try {
    await page.goto('https://forms.office.com/pages/responsepage.aspx?id=y3yDDp4oxEWPHuKDu39iiYdpyAZat29AuQ8j2kL6NnBUMjRDN1QzVlA2NUs1NFZPSUM2MVBHMlNKVS4u&origin=lprLink');

    await page.locator('//*[@id="form-main-content1"]/div/div[3]/div[4]/button').click(),
    page.locator('//*[@id="question-list"]/div[1]/div[2]/div/span/input').fill('Praveekorn Chianglong'),
    page.locator('//*[@id="question-list"]/div[2]/div[2]/div/span/input').fill('Keng'),
    page.locator('//*[@id="question-list"]/div[3]/div[2]/div/span/input').fill('7773095'),
    page.locator('#DatePicker0-label').fill('08/27/1998'),
    await page.locator('//*[@id="question-list"]/div[5]/div[2]/div/div/div[1]/div/label/span[1]/input').click(),
    await page.click('//*[@id="form-main-content1"]/div/div/div[2]/div[3]/div/button')

    check(page, {
      'Startform': page.locator('#FormTitleId_titleAriaId > div > span').textContent() === 'Demo Information Test',
      'Submit-Success': page.locator('//*[@id="form-main-content1"]/div/div/div[2]/div/div[2]/div[1]/span').textContent() === 'Your response has been successfully recorded.',
      })

    sleep(5);

  } finally {
    page.close();
  }
}