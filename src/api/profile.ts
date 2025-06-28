import api from './client';

export interface ProductData {
  _id?: string;
  name: string;
  price: number;
  image?: string;
}

export interface UpdateProfileData {
  name?: string;
  location?: string;
  address?: string;
}

export interface BusinessRequest {
  name: string;
  category: string;
  location: string;
  address: string;
}

export interface VerifyRequest {
  profession: string;
  bio: string;
}

export const getCurrentUser = async () => {
  const res = await api.get('/users/me');
  return res.data;
};

export const updateProfile = async (data: UpdateProfileData) => {
  const res = await api.patch('/users/me', data);
  return res.data;
};

export const requestVerification = async (data: VerifyRequest) => {
  await api.post('/verify-requests', data);
};

export const requestBusiness = async (data: BusinessRequest) => {
  await api.post('/shops/request', data);
};

export const getMyProducts = async () => {
  const res = await api.get('/shops/my-products');
  return res.data;
};

export const addProduct = async (data: ProductData) => {
  const res = await api.post('/products', data);
  return res.data;
};

export const updateProduct = async (id: string, data: ProductData) => {
  await api.patch(`/products/${id}`, data);
};

export const deleteProduct = async (id: string) => {
  await api.delete(`/products/${id}`);
};

export const getBusinessOrders = async () => {
  const res = await api.get('/orders/business');
  return res.data;
};

export const getVerifiedServiceRequests = async () => {
  const res = await api.get('/interests/verified-user');
  return res.data;
};

export const getUserOrders = async () => {
  const res = await api.get('/orders/user');
  return res.data;
};

export const getServiceHistory = async () => {
  const res = await api.get('/history/services');
  return res.data;
};

export const getFeedback = async (shopId: string) => {
  const res = await api.get('/feedback', { params: { shopId } });
  return res.data;
};

