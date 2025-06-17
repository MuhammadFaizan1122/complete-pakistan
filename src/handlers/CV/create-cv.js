import axios from 'axios'

export const handleCreateCV = async (payload) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASEURL}/cv-profiles`, payload);
        return res;
    } catch (error) {
        console.error("Create CV error:", error);
        return error.response;
    }
};

