import axios from "axios";

export const handleGetIndustry = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASEURL}/industries`);
        return res;
    } catch (error) {
        console.error("Industry error:", error);
        return error.response;
    }
};
