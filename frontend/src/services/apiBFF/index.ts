import axios from 'axios'

export const apiBFF = axios.create({
	baseURL: 'http://localhost:8080/api/',
})