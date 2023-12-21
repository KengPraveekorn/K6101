import http from "k6/http";
import { check, sleep } from "k6";
// import { Trend } from 'k6/metrics';
// import k6example from 'https://raw.githubusercontent.com/grafana/k6/master/examples/thresholds_readme_example.js';
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.2/index.js";
import { jUnit } from "https://jslib.k6.io/k6-summary/0.0.2/index.js";


// const myTrend = new Trend('my_trend');
const url = 'https://pokeapi.co/api/v2/ability/1'

export const options = {
  vus: 100, // Virtual users
  duration: "10s",
  // thresholds: {
  //   http_req_duration: ["p(95)<200"], // 95% of requests should be below 200ms
  // },
};

// export const options = {
//   stages: [
//     { duration: "30s", target: 20 },
//     { duration: "1m30s", target: 10 },
//     { duration: "20s", target: 0 },
//   ],
// };

export default () => {
  // 'https://httpbin.test.k6.io/'
  const res = http.get(url);
  check(res, {
    "status was 200": (r) => r.status == 200,
    // "body size is 30,000 bytes": (r) => r.body.length == 30000,
  });
  let body = JSON.parse(res.body);
  console.log(body);
  sleep(1);

  // const res = http.get("https://httpbin.test.k6.io/",{
  //   tags: {
  //     my_tag: "I'm a tag",
  //   },
  // });

  // myTrend.add(res.timings.connecting, { my_tag: "I'm a tag" });
};

export const handleSummary = (data) => {
  return {
    stdout: textSummary(data, { indent: "→", enableColors: true }),
    "raw-data.json": JSON.stringify(data),
    "junit.xml": jUnit(data),
  };
};