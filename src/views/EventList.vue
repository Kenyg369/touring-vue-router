<template>
  <div class ="event-card-conatiner">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService.js"

export default {
  name: "EventList",
  components: {
    EventCard,
  },
  props: ['page'],

  data() {
    return {
      events: null
    }
  },
  created() {
  //axios.get(
  //  'https://my-json-server.typicode.com/Kenyg369/real-world-vue/events'
  //  )
     EventService.getEvents(2, this.page)
      .then(response => {
        this.events = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
};
</script>

<style scoped>
.event-card-conatiner{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
