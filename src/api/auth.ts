import axios from 'axios';
import { UserState } from '../store/slices/userSlice';

const API_BASE = '/api';

interface Credentials {
  phone: string;
  password: string;
}

interface SignupData extends Credentials {
  name: string;
  location: string;
}

export async function login(creds: Credentials): Promise<UserState> {
  const res = await axios.post(`${API_BASE}/login`, creds);
  const { token, user } = res.data;
  if (token) {
    localStorage.setItem('token', token);
  }
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  return user;
}

export async function signup(data: SignupData): Promise<void> {
  await axios.post(`${API_BASE}/signup`, data);
}
