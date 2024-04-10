import axios from "axios";

const BASE_URL = 'http://localhost:3000';

export const getAllFeatures = async (page: number, per_page: number) => {
    try {
        const url = `${BASE_URL}/api/features?page=${page}&per_page=${per_page}`

        const { data } = await axios.get(url)
        return data;

    } catch (error: any) {
        console.error('Error fetching:', error);
    }
}

// export const getProductById = async (id: number) => {
//     try {
//         const { data } = await axios.get(`${BASE_URL}/product/${id}`)
//         return data;

//     } catch (error: any) {
//         console.error('Error fetching user:', error);
//     }
// }