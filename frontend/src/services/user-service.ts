import axios from 'axios'

const createUser = async (data: any) => {
  try {
    const response = await axios.post('/api/users', data)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { createUser }