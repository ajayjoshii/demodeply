import axios from 'axios';

const API_URL = "http://localhost:3001/api/cart";

export const submitCart = async (cartItems, userId) => {
  return await axios.post(API_URL, { cartItems, userId });
};
