

import axios from 'axios';

// ✅ Create GAMCA Entry
export const handleCreateMadical = async (payload) => {
  try {
    const res = await axios.post(`/api/gamca-madical`, payload);
    return res.data;
  } catch (error) {
    console.error('Create Gamca error:', error);
    return null;
  }
};

// ✅ Get All or Filter by Email
export const handleFetchMadicals = async (id = '') => {
  try {
    const url = id ? `/api/gamca-madical?id=${id}` : `/api/gamca-madical`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error('Fetch Gamca list error:', error);
    return null;
  }
};

// ✅ Update by ID
export const handleUpdateMadical = async (id, payload) => {
  try {
    const res = await axios.patch(`/api/gamca-madical?id=${id}`, payload);
    return res.data;
  } catch (error) {
    console.error('Update Gamca error:', error);
    return null;
  }
};

// ✅ Delete by ID
export const handleDeleteMadical = async (id) => {
  try {
    const res = await axios.delete(`/api/gamca-madical?id=${id}`);
    console.log('working')
    return res.data;
  } catch (error) {
    console.error('Delete Gamca error:', error);
    return null;
  }
};
