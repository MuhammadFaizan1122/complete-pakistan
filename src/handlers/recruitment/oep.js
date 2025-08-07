import axios from 'axios';

export const handleGetOEPs = async () => {
  try {
    console.log('first')
    // const response = await axios.get('/api/recruitment/oep');
    // return response.data.data;
  } catch (error) {
    console.error('Error fetching OEPs:', error.response?.data?.error || error.message);
    return [];
  }
};

export const handleGetOEPById = async (id) => {
  try {
    console.log('first')

    // const response = await axios.get(`/api/recruitment/oep?id=${id}`);
    // return response.data.data;
  } catch (error) {
    console.error('Error fetching OEP by ID:', error.response?.data?.error || error.message);
    return { error: error.response?.data?.error || error.message };
  }
};

export const handleCreateOEP = async (payload) => {
  try {
    // const response = await axios.post('/api/recruitment/oep', payload);
    // return response.data.data;
  } catch (error) {
    console.error('Error creating OEP:', error.response?.data?.error || error.message);
    return { error: error.response?.data?.error || error.message };
  }
};

export const handleUpdateOEP = async (payload) => {
  try {
    console.log('first')

    // const response = await axios.put('/api/recruitment/oep', payload);
    // return response.data.data;
  } catch (error) {
    console.error('Error updating OEP:', error.response?.data?.error || error.message);
    return { error: error.response?.data?.error || error.message };
  }
};

export const handleDeleteOEP = async (id) => {
  try {
    console.log('first')

    // const response = await axios.delete(`/api/recruitment/oep?id=${id}`);
    // return response.data.data;
  } catch (error) {
    console.error('Error deleting OEP:', error.response?.data?.error || error.message);
    return { error: error.response?.data?.error || error.message };
  }
};