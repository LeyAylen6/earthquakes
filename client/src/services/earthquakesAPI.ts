import axios from "axios";

const BASE_URL = 'http://localhost:3000';

export const getAllFeatures = async (page: number, perPage: number, magType: string) => {
    try {
        const url = `${BASE_URL}/api/features?page=${page}&per_page=${perPage}&mag_type=${magType}`

        const { data } = await axios.get(url)
        return data;

    } catch (error: any) {
        console.error('Error fetching:', error);
    }
}

export const createCommentByFeatureId = async (featureId: number, comment: string) => {
    try {
        const url = `${BASE_URL}/api/features/${featureId}/comments`

        const response = await axios.post(url, { body: comment })
        return response

    } catch (error: any) {
        throw new Error("Error on create comment")
    }
}

export const getCommentsByFeatureId = async (featureId: number) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/features/${featureId}/comments`)
        return data;

    } catch (error: any) {
        throw new Error("Error getting comments")
    }
}