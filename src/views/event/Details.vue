<template>
  <div v-if="event">
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>>

<script lang="ts">
import { Event } from "@/type";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    event: {
      type: Object as PropType<Event>,
      required: true,
    },
  },
});
</script>
