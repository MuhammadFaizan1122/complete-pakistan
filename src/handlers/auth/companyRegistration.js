import axios from "axios";

export const companyRegistration = async (payload) => {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASEURL_2}/company_registration`,
            payload
        );

        if (res.status === 201) {
            console.log("Account submitted for review. Manual login required after approval.");
        }

        return res;
    } catch (error) {
        console.error("Registration error:", error);
        return error.response;
    }
};

export const handleGetAgencies = async () => {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASEURL_2}/company_registration`
        );
        return res;
    } catch (error) {
        console.error("Registration error:", error);
        return error.response;
    }
};
