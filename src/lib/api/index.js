import axios from 'axios';
import { PUBLIC_API_URL } from '$env/static/public';

const api = axios.create({
	baseURL: PUBLIC_API_URL || 'http://localhost:8080/v1',
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
});

export default api;
