import axios from 'axios';

const API_BASE = `${process.env.NEXT_PUBLIC_API_BASEURL_2}/job-applications`;

// ✅ Create Application
export const handleCreateJobApplication = async (payload) => {
  try {
    const res = await axios.post(`${API_BASE}`, payload);
    return res;
  } catch (error) {
    console.error("Create Job Application error:", error);
    return error.response;
  }
};

// ✅ Get All Applications (with optional filters)
export const handleGetJobApplications = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const res = await axios.get(`${API_BASE}?${queryParams}`);
    return res;
  } catch (error) {
    console.error("Get Job Applications error:", error);
    return error.response;
  }
};

// ✅ Get Single Application by ID
export const handleGetJobApplicationById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE}/${id}`);
    return res;
  } catch (error) {
    console.error("Get Job Application by ID error:", error);
    return error.response;
  }
};

// ✅ Update Application Status
export const handleUpdateJobApplicationStatus = async (id, status) => {
  try {
    const res = await axios.put(`${API_BASE}/${id}`, { status });
    return res;
  } catch (error) {
    console.error("Update Job Application error:", error);
    return error.response;
  }
};

// ✅ Delete Application
export const handleDeleteJobApplication = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/${id}`);
    return res;
  } catch (error) {
    console.error("Delete Job Application error:", error);
    return error.response;
  }
};
