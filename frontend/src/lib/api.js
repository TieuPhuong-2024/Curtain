import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCurtains = async () => {
  try {
    const response = await api.get('/curtains');
    return response.data;
  } catch (error) {
    console.error('Error fetching curtains:', error);
    throw error;
  }
};

export const getCurtainById = async (id) => {
  try {
    const response = await api.get(`/curtains/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching curtain with id ${id}:`, error);
    throw error;
  }
};

export const createCurtain = async (curtainData) => {
  try {
    const response = await api.post('/curtains', curtainData);
    return response.data;
  } catch (error) {
    console.error('Error creating curtain:', error);
    throw error;
  }
};

export const updateCurtain = async (id, curtainData) => {
  try {
    const response = await api.put(`/curtains/${id}`, curtainData);
    return response.data;
  } catch (error) {
    console.error(`Error updating curtain with id ${id}:`, error);
    throw error;
  }
};

export const deleteCurtain = async (id) => {
  try {
    const response = await api.delete(`/curtains/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting curtain with id ${id}:`, error);
    throw error;
  }
};

export const getBanners = async () => {
  try {
    const response = await api.get('/banners');
    return response.data;
  } catch (error) {
    console.error('Error fetching banners:', error);
    throw error;
  }
};

export const createBanner = async (bannerData) => {
  try {
    const response = await api.post('/banners', bannerData);
    return response.data;
  } catch (error) {
    console.error('Error creating banner:', error);
    throw error;
  }
};

export const updateBanner = async (id, bannerData) => {
  try {
    const response = await api.put(`/banners/${id}`, bannerData);
    return response.data;
  } catch (error) {
    console.error(`Error updating banner with id ${id}:`, error);
    throw error;
  }
};

export const deleteBanner = async (id) => {
  try {
    const response = await api.delete(`/banners/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting banner with id ${id}:`, error);
    throw error;
  }
};