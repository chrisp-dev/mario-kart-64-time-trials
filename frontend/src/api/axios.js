import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:3000/', // Ensure this matches your backend server's address and port
})

export const getData = async (url) => {
    try {
        const response = await instance.get(url)
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message)
        throw error
    }
}

export const postData = async (url, data) => {
    try {
        const response = await instance.post(url, data)
        return response
    } catch (error) {
        console.error('Error posting data:', error.response ? error.response.data : error.message)
        throw error
    }
}

export default instance