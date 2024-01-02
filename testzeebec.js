import http from 'k6/http';
import { sleep } from 'k6';

// กำหนด vus_max
let vusMax = 200;

export let options = {
  scenarios: {
    example_scenario: {
      executor: 'constant-vus',
      exec: 'example',
      vus: 10,
      duration: '30s',
    },
  },
};

export function example() {
  // Your test logic here
  http.get('https://example.com');
  sleep(1);
}

export function setup() {
  // Calculate the number of VUs based on vusMax
  let calculatedVUs = Math.min(vusMax, __ENV.VU);

  // Set the VUs for the scenario
  options.scenarios.example_scenario.vus = calculatedVUs;
}

export function teardown(data) {
  // Your teardown logic here
}