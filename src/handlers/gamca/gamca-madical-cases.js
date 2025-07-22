import axios from 'axios';

// ✅ Create  Medical Case
export const handleCreateMedicalCase = async (payload) => {
  try {
    const res = await axios.post(`/api/gamca-madical-cases`, payload);
    return res.data;
  } catch (error) {
    console.error('Create  Medical Case error:', error);
    return null;
  }
};

// ✅ Get All or Filter by ID
export const handleFetchMedicalCases = async (id = '') => {
  try {
    const url = id ? `/api/gamca-madical-cases?id=${id}` : `/api/gamca-madical-cases`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error('Fetch  Medical Case list error:', error);
    return null;
  }
};

// ✅ Update by ID
export const handleUpdateMedicalCase = async (id, payload) => {
  try {
    const res = await axios.patch(`/api/gamca-madical-cases?id=${id}`, payload);
    return res.data;
  } catch (error) {
    console.error('Update  Medical Case error:', error);
    return null;
  }
};

// ✅ Delete by ID
export const handleDeleteMedicalCase = async (id) => {
  try {
    const res = await axios.delete(`/api/gamca-madical-cases?id=${id}`);
    return res.data;
  } catch (error) {
    console.error('Delete  Medical Case error:', error);
    return null;
  }
};