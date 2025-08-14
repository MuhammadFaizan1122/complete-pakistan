import axios from 'axios'

export const handleCreateJob = async (payload) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASEURL_2}/job`, payload);
        return res;
    } catch (error) {
        console.error("Create Job error:", error);
        return error.response;
    }
};

export const handleGetJobs = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASEURL_2}/job`);
        return res;
    } catch (error) {
        console.error("Get Job error:", error);
        return error.response;
    }
};

export const handleGetJobsByUser = async (userId) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASEURL_2}/job/by-user?userId=${userId}`);
        return res;
    } catch (error) {
        console.error("Get Job error:", error);
        return error.response;
    }
};

