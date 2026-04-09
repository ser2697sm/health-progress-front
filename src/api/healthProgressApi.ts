import axios from 'axios';


const healthProgressApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

//TODO: Crear interceptores

export { healthProgressApi }