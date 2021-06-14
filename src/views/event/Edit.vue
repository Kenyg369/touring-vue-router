<template>
  <div v-if = "event">
    <p>Edit the event here</p>     
  </div>
</template>>

<script lang="ts">
export default{
  props: {
    event:{
      type:Object ,
      required: true
    }
  }
}
</script>
