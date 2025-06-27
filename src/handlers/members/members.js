import axios from 'axios';

export const handleCreateMember = async (payload) => {
    try {
        const res = await axios.post('/api/members', payload);
        return res.data;
    } catch (error) {
        return { error: error?.response?.data?.message || 'Failed to create member' };
    }
};

export const handleGetMembers = async (userId) => {
  try {
    const res = await axios.get(`/api/members?userId=${userId}`);
    return res.data.data;
  } catch (error) {
    console.error('Error fetching members:', error);
    return [];
  }
};