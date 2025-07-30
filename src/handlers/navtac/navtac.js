import axios from 'axios';

export const handleGetNavtacs = async () => {
  try {
    const response = await axios.get('/api/navtac');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching NAVTACs:', error.response?.data?.error || error.message);
    return [];
  }
};

export const handleGetNavtacById = async (id) => {
  try {
    const response = await axios.get(`/api/navtac?id=${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching NAVTAC by ID:', error.response?.data?.error || error.message);
    return { error: error.response?.data?.error || error.message };
  }
};

export const handleCreateNavtac = async (payload) => {
  try {
    const response = await axios.post('/api/navtac', payload);
    return response.data.data;
  } catch (error) {
    console.error('Error creating NAVTAC:', error.response?.data?.error || error.message);
    return { error: error.response?.data?.error || error.message };
  }
};

export const handleUpdateNavtac = async (payload) => {
  try {
    const response = await axios.put('/api/navtac', payload);
    return response.data.data;
  } catch (error) {
    console.error('Error updating NAVTAC:', error.response?.data?.error || error.message);
    return { error: error.response?.data?.error || error.message };
  }
};

export const handleDeleteNavtac = async (id) => {
  try {
    const response = await axios.delete(`/api/navtac?id=${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error deleting NAVTAC:', error.response?.data?.error || error.message);
    return { error: error.response?.data?.error || error.message };
  }
};