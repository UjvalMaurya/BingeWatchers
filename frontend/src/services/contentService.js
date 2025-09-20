import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

const API_URL = "http://localhost:5000/api/content";

export const getContentByType = async (type, token) => {
  try {
    const res = await axios.get(`${API_URL}?type=${type}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
