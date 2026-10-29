import axios from "axios";

export const axiosInstance= axios.create({}); //takes an instance of the axios

export const apiConnector= (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData? bodyData: null,
        headers: headers? headers:null,
        params: params? params: null,
    });
}

// method     → GET / POST / PUT / DELETE
// url        → where to send the request
// bodyData   → data you're sending
// headers    → additional information
// params     → query parameters


//example
// axiosInstance({
//     method: "POST",
//     url: "/login",
//     data: {
//         email: "abc@gmail.com",
//         password: "123456"
//     }
// });