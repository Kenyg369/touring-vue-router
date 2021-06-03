<template>
  <div class ="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link 
        id="paper-prev"
        :to="{ name: 'EventList', query:{ page:page-1 } }"
        rel="prev"
        v-if="page !=1"
        >&#60; prev</router-link
      >
      <router-link
        id="paper-next" 
        :to="{ name: 'EventList', query:{ page:page+1 } }"
        rel="next"
        v-if="hasNextPage"
        >next &#62;</router-link
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'

export default {
  name: "EventList",
  props: ['page'],
  components: {
    EventCard
  },
  data() {
    return {
      events: null,
      totalEvents: 0
    }
  },
  // Enter is only called when a route is being entered from a different one
  beforeRouteEnter(routeTo, routeFrom, next) {
    EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
      .then(response => {
        // "next" tells Vue Router to wait until the API call returns, before routing 
        next(comp =>{
          comp.events = response.data
          comp.totalEvents = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetWorkError' })      
      })
  },

  // Now we can use "this", since component is created.
  beforeRouteUpdate(routeTo) {
    //"Return" the promise so Vue knows to wait on the API before loading the page
    return EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
      .then(response => {
        this.events = response.data
        this.totalEvents = response.headers['x-total-count']  
      })
      .catch(() => {
        return { name: 'NetWorkError' }      
      })
  },


  computed:{
    hasNextPage() {
      var totalPages = Math.ceil(this.totalEvents / 2)
      return (this.page < totalPages)
    }
  }
}
</script>

<style scoped>
.events{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color:#2c3e50;
}
#page-prev {
  text-align: left ;
}
#page-next {
  text-align: right;
}
</style>
