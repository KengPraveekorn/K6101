import http from "k6/http";
import { check, sleep } from "k6";

// const vusMax = 200;
// const vusInscrease = 10;

export const options = {
  // scenarios:{
  //   zeebe:{
  //     executor: 'constant-vus',
  //     exec: 'TestZeebe',
  //     vus:10, // Virtual users
  //     duration: "60s",
  //   }
  // }
  // iterations: 5000,

  thresholds: {
    http_req_failed: ["rate<0.03"], // http errors should be less than 1%
    // http_req_duration: ["p(95)<500"], // 95% of requests must complete below 500ms
  },
  vus:300, // Virtual users
  duration: "60s",

  // stages: [
  //   { duration: "1s", target: 10 },
  //   { duration: "5s", target: 100 },
  //   { duration: "10s", target: 100 },
  //   { duration: "15s", target: 0 },
  // ]

};

export default () => {
  const startflow = "http://localhost:8080/api/runprocess/startflow";
  const payload = JSON.stringify({
    bpmnProcessId: "Process_0ex5r33",
    variables: {
      CurrentName: "Jumphon",
      Action: "Approve",
    },
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = http.post(startflow, payload, params);
  check(res, { "status was 200": (r) => r.status == 200 });
  sleep(1);
};

// export const setup =()=>{
//   // calculate the number of VUs based on vusMax and vusInscrease
//   const calculatedVus = Math.min(vusMax,__ENV.VU + vusInscrease)

//   // set the VUs for the scenario
//   options.scenarios.zeebe.vus = calculatedVus
// }