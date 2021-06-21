<template>
  <div v-if="event">
    <p>Register for the event here</p>
    <button @click="register">Register Me</button>
  </div>
</template>>

<script lang="ts">
import { Event } from "../../type";
import { defineComponent, PropType } from "vue";
import { useFlashMessage } from "../../Composables/useFlashMessage";

export default defineComponent({
  props: {
    event: {
      type: Object as PropType<Event>,
      required: true,
    },
  },
  setup(props) {
    const { showMessage } = useFlashMessage();

    const register = () => {
      showMessage({
        message: `you are successfully registered for ${props.event.title}`,
        to: {
          name: "EventDetails",
          params: { id: props.event.id },
        },
      });
    };

    return {
      register,
    };
  },
});
</script>
