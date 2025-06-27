import axios from 'axios';

export const getUserDashboardData = async (userId) => {
    try {
        const res = await axios.get(`/api/user-dashboard?userId=${userId}`);
        return res.data;
    } catch (error) {
        console.error('Dashboard fetch error:', error);
        return null;
    }
};
