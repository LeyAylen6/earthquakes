import axios from "axios";

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Axios Code: ', error.code);
        console.error('Axios response:', error.response);
        console.error('Axios request:', error.request);
        console.error('Axios message:', error.message);

        return Promise.reject(error);
    }
);
