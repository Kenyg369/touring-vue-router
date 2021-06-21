<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }"> Details </router-link>
      |
      <router-link :to="{ name: 'EventRegister' }"> Register </router-link>
      |
      <router-link :to="{ name: 'EventEdit' }"> Edit </router-link>
    </div>
    <router-view :event="event" />
  </div>
  <div>Loading event...</div>
</template>>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useEvents } from "../../Composables/useEvent";
import { useRouter } from "vue-router";
export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props, _) {
    const { getEventById } = useEvents();
    const router = useRouter();
    const event = ref();

    getEventById(props.id)
      .then((resp) => (event.value = resp))
      .catch((error) => {
        if (error.response && error.response.status == 404) {
          router.push({
            name: "404Resource",
            // with a parameter of string 'event', not a element called event
            //otherwise written as { resource:event }
            params: { resource: `event of ${props.id}` },
          });
        } else {
          router.push({ name: "NetworkError" });
        }
      });
    return {
      event,
    };
  },
});
</script>
