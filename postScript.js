import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 100, // Virtual users
  duration: "1s",
};

export default () => {
    const url = "http://localhost:5000/users";
    const payload = JSON.stringify({
        fname:'Praveekorn',
        lname:'Keng',
        username:'DeGang',
        password:'54321',
        avatar:'https://www.melivecode.com/users/4.png'
    });

    const params = {
        headers:{
            'Content-Type':'application/json',
        },
    };
    // http.post(url,payload,params);
    const res = http.post(url,payload,params);
    check(res, { "status was 200": (r) => r.status == 200 });
    sleep(1);
};
