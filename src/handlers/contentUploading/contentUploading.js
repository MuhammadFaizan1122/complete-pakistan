import axios from 'axios'
export const handleUpload = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file); 

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASEURL}/files/upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return res;
    } catch (error) {
        console.error("Content upload error:", error);
        return error.response;
    }
};
