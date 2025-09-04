// import axios from 'axios'
// export const handleUpload = async (file) => {
//     try {
//         const formData = new FormData();
//         formData.append('file', file); 

//         const res = await axios.post(
//             `${process.env.NEXT_PUBLIC_API_BASEURL_2}/files/upload`,
//             formData,
//             {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             }
//         );
//         return res;
//     } catch (error) {
//         console.error("Content upload error:", error);
//         return error.response;
//     }
// };

export async function handleUpload(file) {
  if (!file) {
    throw new Error('No file provided');
  }

  // Client-side validation
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf'
  ];

  if (file.size > maxSize) {
    throw new Error('File size too large (max 10MB)');
  }

  if (!allowedTypes.includes(file.type)) {
    throw new Error('File type not allowed');
  }

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/files/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  return result;
}