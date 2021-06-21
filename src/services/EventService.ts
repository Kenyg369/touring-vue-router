//Event Service is where we do API calls
import axios, { AxiosResponse } from "axios"
import { Event } from "../type"

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Kenyg369/touring-vue-router',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

//perPage= Events to return per page, page = The page we're on
//Note:Define Getter in Service.js:
//So we can get the data as per query parameters specified
//,later in other function call, which in EventList component
export async function getEvents(): Promise<Event[]> {
  const response = await apiClient.get('/events')
  return response.data
}

export async function getEvent(id: Number): Promise<Event> {
  const response = await apiClient.get('/events/' + id)
  return response.data
}

export async function getPageEvents(perPage: Number, page: Number): Promise<AxiosResponse<Event[]>> {
  return apiClient.get<Event[]>('/events?_limit=' + perPage + '&_page=' + page)
}