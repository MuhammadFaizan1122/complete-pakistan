import axios from 'axios';

export const handleGetVTPs = async () => {
  try {
    const response = await axios.get('/api/recruitment/vtp');
    return response;
  } catch (error) {
    console.error('Error fetching VTPs:', error.response?.data?.error || error.message);
    return [];
  }
};

export const handleGetVTPById = async (id) => {
  try {
    const response = await axios.get(`/api/recruitment/vtp?userId=${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching VTP by ID:', error.response?.data?.error || error.message);
    return { error: error.response?.data?.error || error.message };
  }
};

export const handleCreateVTP = async (payload) => {
  try {
    const response = await axios.post('/api/recruitment/vtp', payload);
    return response.data.data;
  } catch (error) {
    console.error('Error creating VTP:', error.response?.data?.error || error.message);
    return { error: error.response?.data?.error || error.message };
  }
};

export const handleUpdateVTP = async (payload) => {
  try {
    const response = await axios.put('/api/recruitment/vtp', payload);
    return response;
  } catch (error) {
    console.error('Error updating VTP:', error.response?.data?.error || error.message);
    return { error: error.response?.data?.error || error.message };
  }
};

export const handleDeleteVTP = async (id) => {
  try {
    const response = await axios.delete(`/api/recruitment/vtp?id=${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error deleting VTP:', error.response?.data?.error || error.message);
    return { error: error.response?.data?.error || error.message };
  }
};