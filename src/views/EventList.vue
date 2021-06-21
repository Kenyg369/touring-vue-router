<template>
  <div class="events">
    <EventCard
      v-for="event in eventItem.events"
      :key="event.id"
      :event="event"
    />
    <div class="pagination">
      <router-link
        id="paper-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; prev</router-link
      >
      <router-link
        id="paper-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >next &#62;</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { defineComponent, reactive, computed, watch } from "vue";
import EventCard from "../components/EventCard.vue";
import { getPageEvents } from "../services/EventService";
import { Event } from "../type";

export default defineComponent({
  name: "EventList",
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  components: {
    EventCard,
  },
  setup(props, _) {
    const eventItem = reactive({
      events: [] as Event[],
      totalEvents: 0,
    });

    const hasNextPage = computed((): boolean => {
      var totalPages = Math.ceil(eventItem.totalEvents / 2);
      return props.page < totalPages;
    });

    watch(
      () => props.page,
      () => {
        getPageEvents(2, props.page)
          .then((response) => {
            eventItem.events = response.data;
            eventItem.totalEvents = response.headers["x-total-count"];
          })
          .catch(() => {
            return { name: "NetWorkError" };
          });
      },
      { immediate: true }
    );

    return { eventItem, hasNextPage };
  },
});
</script>

<style scoped>
.events {
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
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>
