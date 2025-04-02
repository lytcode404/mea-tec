import axios from "axios";

const API_URL = "https://task-manager-dtiv.onrender.com";
// const API_URL = "http://localhost:5000";

export const registerUser = (userData) =>
  axios.post(`${API_URL}/api/auth/register`, userData);



export const loginUser = async (userData) => {
  const res = await axios.post(`${API_URL}/api/auth/login`, userData);
  console.log(res)
  return {
    token: res.data.token,
    user: { name: res.data.name, email: res.data.email }, // Ensure this matches API response
  };
};





export const getTasks = (token) =>
  axios.get(`${API_URL}/api/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });



export const createTask = (token, task) =>
  axios.post(`${API_URL}/api/tasks`, task, {
    headers: { Authorization: `Bearer ${token}` },
  });


export const updateTask = (token, id, task) =>
  axios.put(`${API_URL}/api/tasks/${id}`, task, {
    headers: { Authorization: `Bearer ${token}` },
  });


export const deleteTask = (token, id) =>
  axios.delete(`${API_URL}/api/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
