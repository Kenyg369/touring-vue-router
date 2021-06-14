<template>
  <div v-if = "GStore.event">
    <h1>{{ GStore.event.title }}</h1>
    <div id ="nav">
      <router-link :to="{ name: 'EventDetails', params:{id: id} }"> Details </router-link> 
      |
      <router-link :to="{ name: 'EventRegister', params:{id: id} }"> Register </router-link> 
      |
      <router-link :to="{ name: 'EventEdit', params:{id: id} }"> Edit </router-link>

    </div>
    <router-view :event="GStore.event" />
  </div>
</template>>

<script lang="ts">
export default{
  inject: ['GStore']
}
</script>
