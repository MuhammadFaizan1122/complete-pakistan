import axios from 'axios';

export const handleGetConsultants = async (params = {}) => {
  try {
    const response = await axios.get('/api/consultant', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching consultants:', error.response?.data?.error || error.message);
    return { success: false, error: error.response?.data?.error || 'Failed to fetch consultants' };
  }
};

export const handleCreateConsultant = async (data) => {
  try {
    const response = await axios.post('/api/consultant', data);
    return response.data;
  } catch (error) {
    console.error('Error creating consultant:', error.response?.data?.error || error.message);
    return { success: false, error: error.response?.data?.error || 'Failed to create consultant' };
  }
};