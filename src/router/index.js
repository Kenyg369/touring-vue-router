import { createRouter, createWebHistory } from "vue-router";
import EventList from "@/views/EventList.vue";
import About from "@/views/About.vue";
import EventLayout from "@/views/event/Layout.vue";
import EventDetails from "@/views/event/Details.vue";
import EventRegister from "@/views/event/Register.vue";
import EventEdit from "@/views/event/Edit.vue";
import NotFound from "@/views/event/NotFound.vue";
import NetworkError from "@/views/event/NetworkError";
import Nprogress from 'nprogress'
import EventService from "@/services/EventService.js"
import GStore from '@/store'


const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
    //1.Idea: Get the query parameter if it exists and cast it as an integer
    //, otherwise return 1
    //2.Process: Here, URL .../events?_page = x, (where x can be 1,2 or 3),
    //will pass {page:'x'} as a prop to component, (where x as a string will be parsed into a Int)
    //3.Transformation: It's lucky that our URL has "page" as its query parameter
    //,which we want to keep calling it "page"
    //where it could be route => ({page:parseInt(route.query.q)}), if URL is /event?_q = x
    //4.**Note this props function mode is a anoynous fucntion which provides a direct access to the designated page
    //,homepage doesn't have ?_page query parameter which makes page 1
    props: route => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/events/:id",
    name: "EventLayout",
    props: true,
    component: EventLayout,
    //"to" gives us the target route
    beforeEnter: to => {
      return EventService.getEvent(to.params.id) 
        .then(response => {
          GStore.event = response.data    
        })
        .catch(error => {
          if (error.response && error.response.status == 404){
            return({
              name:'404Resource',
              // with a parameter of string 'event', not a element called event
              //otherwise written as { resource:event } 
              params: { resource: 'event of '+ this.id }
            })
          }else{
            return({ name: 'NetworkError' })
          }
        })
    },
    children:[
      {
        path: "",
        name: "EventDetails",
        component: EventDetails, 
      },
      {
        path: "register",
        name: "EventRegister",
        component: EventRegister,
      },
      {
        path: "Edit",
        name: "EventEdit",
        component: EventEdit, 
      }
    ]
  },
  {
    //Match all routes that don't match an existing route
    path: "/:catchAll(.*)",
    name: "NotFound",    
    component: NotFound,
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true,
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError,
  },
  {
    //Match on /event/, and capture everything else in afterEvent
    //Using (.*) so that it will include/ in the match (by default it doesn't)
   path:"/event/:afterEvent(.*)",
   redirect: to => {
     return { path :'/events/'+ to.params.afterEvent }
   },
  }
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(() => {
  Nprogress.start()
})

router.afterEach(() =>{
  Nprogress.done()
})

export default router;
