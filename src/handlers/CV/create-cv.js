import axios from 'axios'

export const handleCreateCV = async (payload) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASEURL_2}/cv/create`, payload);
        return res;
    } catch (error) {
        console.error("Create CV error:", error);
        return error.response;
    }
};

export const handleGetCV = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASEURL_2}/cv/get`);
        return res;
    } catch (error) {
        console.error("Create CV error:", error);
        return error.response;
    }
};


export const handleGetCVbyUser = async (userId) => {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASEURL_2}/cv/create?userId=${userId.userId}`
        );
        return res;
    } catch (error) {
        console.error("Get CV error:", error);
        return error.response;
    }
};
