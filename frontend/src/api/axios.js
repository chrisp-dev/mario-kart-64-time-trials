import axios from 'axios'
import rateLimit from 'axios-rate-limit'

const instance = rateLimit(axios.create({
    baseURL: 'http://localhost:3000/', // Ensure this matches your backend server's address and port
    headers: {
        'Content-Type': 'application/json'
    }
}), { maxRequests: 5, perMilliseconds: 20000 })

export const getData = async (url) => {
    try {
        const response = await instance.get(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message)
        throw error
    }
}

export const postData = async (url, data) => {
    try {
        const response = await instance.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        console.error('Error posting data:', error.response ? error.response.data : error.message)
        throw error
    }
}

export default instance