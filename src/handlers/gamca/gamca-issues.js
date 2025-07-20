import axios from 'axios';

export const handleCreateIssue = async (data) => {
  const res = await axios.post('/api/gamca-issues', data);
  return res.data;
};

export const handleGetAllIssues = async () => {
  const res = await axios.get('/api/gamca-issues');
  return res.data;
};

export const handleGetIssueById = async (id) => {
  const res = await axios.get(`/api/gamca-issues?id=${id}`);
  return res.data;
};

export const handleUpdateIssue = async (data) => {
  const res = await axios.patch('/api/gamca-issues', data);
  return res.data;
};

export const handleDeleteIssue = async (id) => {
  const res = await axios.delete(`/api/gamca-issues?id=${id}`);
  return res.data;
};