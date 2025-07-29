import axios from 'axios';

export const handleGetCompanies = async (userId) => {
    try {
        const response = await axios.get(`/api/companies?userId=${userId}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching companies:', error.response?.data?.error || error.message);
        return [];
    }
};

export const handleCreateCompany = async (payload) => {
    try {
        const response = await axios.post('/api/companies', payload);
        return response.data.data;
    } catch (error) {
        console.error('Error creating company:', error.response?.data?.error || error.message);
        return { error: error.response?.data?.error || error.message };
    }
};

export const handleUpdateCompany = async (payload) => {
    try {
        const response = await axios.put('/api/companies', payload);
        return response.data.data;
    } catch (error) {
        console.error('Error updating company:', error.response?.data?.error || error.message);
        return { error: error.response?.data?.error || error.message };
    }
};

export const handleDeleteCompany = async (id) => {
    try {
        const response = await axios.delete(`/api/companies?id=${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error deleting company:', error.response?.data?.error || error.message);
        return { error: error.response?.data?.error || error.message };
    }
};