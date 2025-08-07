import axios from 'axios';

export const handleGetTTCs = async () => {
  try {
    console.log('first')

    // const response = await axios.get('/api/recruitment/ttc');
    // return response.data.data;
  } catch (error) {
    console.error('Error fetching TTCs:', error.response?.data?.error || error.message);
    return [];
  }
};

export const handleGetTTCById = async (id) => {
  try {
    console.log('first')

    // const response = await axios.get(`/api/recruitment/ttc?id=${id}`);
    // return response.data.data;
  } catch (error) {
    console.error('Error fetching TTC by ID:', error.response?.data?.error || error.message);
    return { error: error.response?.data?.error || error.message };
  }
};

export const handleCreateTTC = async (payload) => {
  try {
    console.log('first')

    // const response = await axios.post('/api/recruitment/ttc', payload);
    // return response.data.data;
  } catch (error) {
    console.error('Error creating TTC:', error.response?.data?.error || error.message);
    return { error: error.response?.data?.error || error.message };
  }
};

export const handleUpdateTTC = async (payload) => {
  try {
    console.log('first')

    // const response = await axios.put('/api/recruitment/ttc', payload);
    // return response.data.data;
  } catch (error) {
    console.error('Error updating TTC:', error.response?.data?.error || error.message);
    return { error: error.response?.data?.error || error.message };
  }
};

export const handleDeleteTTC = async (id) => {
  try {
    console.log('first')

    // const response = await axios.delete(`/api/recruitment/ttc?id=${id}`);
    // return response.data.data;
  } catch (error) {
    console.error('Error deleting TTC:', error.response?.data?.error || error.message);
    return { error: error.response?.data?.error || error.message };
  }
};