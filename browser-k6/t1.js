import { browser } from 'k6/experimental/browser';
import { check,sleep } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {
    browser: {
      executor: 'constant-vus',
      exec: 'browserTest',
      vus: 1,
      duration: '1s',
      options: {
        browser: {
          type: 'chromium',
        }
      }
    },
    // news: {
    //   executor: 'constant-vus',
    //   exec: 'news',
    //   vus: 20,
    //   duration: '30s',
    // }
  }
};

export async function browserTest() {
  const page = browser.newPage();

  try {
    await page.goto('https://test.k6.io/browser.php');

    page.locator('#checkbox1').check();

    // page.locator('//button[text()="Get geolocation"]').click();
    page.locator('//button[text()="Increment"]').click();
    page.locator('#text1').fill('k6')
    page.locator('select[name="numbers"]').selectOption('zero');
    page.locator('select[name="colors"]').selectOption('red');

    sleep(5);
    
    check(page, {
      'checkbox is checked':
        page.locator('#checkbox-info-display').textContent() === 'Thanks for checking the box',
    //   'button is clicked':
    //     page.locator('#geolocation-info-display').textContent() === 'Lat: 12.68 Long: 101.30',
      'counter is incremented':
        page.locator('#counter-info-display').textContent() !== 'Counter: 0',
      'text is filled':
        page.locator('#text-info-display').textContent() === 'focused out off input text field',
      'choose number is selected':
        page.locator('#select-multiple-info-display').textContent() === 'Selected: zero ',
    //   'choose color is selected':
    //     page.locator('#colors-options').innerHTML === '#colors-options > option:nth-child(2)'
        
    });

    
  } finally {
    page.close();
  }
}

// export function news() {
//   const res = http.get('https://test.k6.io/news.php');

//   check(res, {
//     'status is 200': (r) => r.status === 200,
//   });

// }
