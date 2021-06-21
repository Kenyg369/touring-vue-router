<template>
  <div v-if="event">
    <p>Edit the event here</p>
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
