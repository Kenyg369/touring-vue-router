import { ref } from "vue";
import { getEvents as getEventsApi, getEvent as getEventByIdApi } from "../services/EventService"
import { Event } from "../type";
//Move "const event" outside the export function of useEvents, which makes a gloal variable
//So it can be used by mutiple components 
let events = ref<Event[]>([]);
let event = ref<Event>();

//Didn't export the "const event", because we want protect it from unespected access
//So only the export funciton below can control the global state of "events"
export function useEvents() {
  const getEvents = async (): Promise<void> => {
    events.value = await getEventsApi();
  }
  const getEventById = async (id: Number): Promise<Event> => {
    let event = events.value.find(e => e.id === id);
    //Quick search: Try obtain the event from events array
    //Otherwise do another Promise API with specific ID 
    return event ? event : await getEventByIdApi(id)
  }
  return {
    events,
    getEvents,
    getEventById
  };
}
