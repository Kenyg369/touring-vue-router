<template>
  <div v-if = "event">
    <p>Register for the event here</p> 
    <button @click="register">Register Me</button>    
  </div>
</template>>

<script>
export default{
  props: ['event'],
  inject: ['GStore'],
  methods:{
    register(){
      //Call to API
      //If registered then redirect to event details

      this.GStore.flashMessage = 'you are successfully registered for' + this.event.title

      setTimeout(() => {
        this.Gstore.flashMessage = ''
      }, 3000)

      //Note: this.$router.push({xxx}) and <router-link :to={xxx}>> have same object and same syntax
      //it's because when call <router-link>,it's calling this.$router.push from router-link definition
      this.$router.push({
        name:'EventDetails',
        params: { id: this.event.id }
      })
    }
  }
}
</script>
