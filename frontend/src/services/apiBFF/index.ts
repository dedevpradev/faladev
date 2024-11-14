import axios from 'axios'

export const apiBFF = axios.create({
	baseURL: '/api',
})
