// Creator: Grafana k6 Browser Recorder 1.0.1

import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = { vus: 1, duration: '10s' }

export default function main() {
  let response

  group('page_1 - https://test.k6.io/', function () {
    response = http.get('https://test.k6.io/', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
    sleep(4.9)
  })

  group('page_2 - https://test.k6.io/browser.php', function () {
    response = http.get('https://test.k6.io/browser.php', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
    })
  })
}