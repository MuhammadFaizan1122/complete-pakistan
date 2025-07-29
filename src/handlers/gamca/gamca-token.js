import axios from 'axios';

export const handleCreateGamcaToken = async (data) => {
  const res = await axios.post('/api/gamca-token', data);
  return res.data;
};

export const handleGetGamcaToken = async () => {
  const res = await axios.get('/api/gamca-token');
  return res.data;
};

export const handleUpdateGamcaToken = async (data) => {
  const res = await axios.put('/api/gamca-token', data);
  return res.data;
};

export const handleDeleteGamcaToken = async () => {
  const res = await axios.delete('/api/gamca-token');
  return res.data;
};