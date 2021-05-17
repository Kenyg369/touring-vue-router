<template>
  <div class="event-card">
    <p>@{{event.time}} on @{{event.data}}, 2022</p>
    <h3>{{event.title}}</h3>
  </div>
</template>

<script>
export default {
  name: "EventCard",
  props: {
    event:{
      type: Object ,
      required: true
    }

  }
};
</script>

<style scoped>
.event-card{
  width: 250px;
  padding: 20px;
  border: 1px solid rgb(58, 57, 57);
  cursor: pointer;
  margin-bottom: 25px;
}
.event-card:hover{
  transform: scale(1.05) ;
  box-shadow: 0px 5px 5px 5px rgba(0, 0, 0, 0.2);
}

</style>
