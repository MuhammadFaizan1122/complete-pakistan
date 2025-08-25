import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASEURL_2;

// ✅ Create Flight
export const handleCreateFlight = async (payload) => {
  try {
    const res = await axios.post(`${API_BASE}/flights`, payload);
    return res;
  } catch (error) {
    console.error("Create Flight error:", error);
    return error.response;
  }
};

// ✅ Get All Flights
export const handleGetFlights = async () => {
  try {
    const res = await axios.get(`${API_BASE}/flights`);
    return res;
  } catch (error) {
    console.error("Get Flights error:", error);
    return error.response;
  }
};

// ✅ Get Flight By ID
export const handleGetFlightById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE}/flights?id=${id}`);
    return res; 
  } catch (error) {
    console.error("Get Flight by ID error:", error);
    return error.response;
  }
};

// ✅ Update Flight
export const handleUpdateFlight = async (payload) => {
  try {
    const res = await axios.patch(`${API_BASE}/flights`, payload);
    return res;
  } catch (error) {
    console.error("Update Flight error:", error);
    return error.response;
  }
};

// ✅ Delete Flight
export const handleDeleteFlight = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/flights?id=${id}`);
    return res;
  } catch (error) {
    console.error("Delete Flight error:", error);
    return error.response;
  }
};
