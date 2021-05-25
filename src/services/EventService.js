//Event Service is where we do API calls
import axios from "axios"

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Kenyg369/touring-vue-router',
  withCredentials: false,
  headers:{
    Accept:'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  //perPage= Events to return per page, page = The page we're on
  //Note:Define Getter in Service.js:
  //So we can get the data as per query parameters specified
  //,later in other function call, which in EventList component

  getEvents(perPage, page) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  }
} 