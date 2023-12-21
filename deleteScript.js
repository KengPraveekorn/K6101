import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10, // Virtual users
  duration: "2s",
};

export default () => {
    const url = "http://localhost:5000/users";
    const payload = JSON.stringify({
        id:'120'
    });

    const params = {
        headers:{
            'Content-Type':'application/json',
        },
    };
    const res = http.del(url,payload,params);
    check(res, { "status was 200": (r) => r.status == 200 });
    sleep(1);
};
