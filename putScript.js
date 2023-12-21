import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10, // Virtual users
  duration: "2s",
};

export default () => {
    const url = "http://localhost:5000/users";
    const payload = JSON.stringify({
        id:'119',
        fname:'KENG',
        lname:'Keng',
        username:'DeGang',
        password:'123456789',
        avatar:'https://www.melivecode.com/users/5.png'
    });

    const params = {
        headers:{
            'Content-Type':'application/json',
        },
    };
    const res = http.put(url,payload,params);
    check(res, { "status was 200": (r) => r.status == 200 });
    sleep(1);
};
