import { createRouter, createWebHistory } from "vue-router";
import EventList from "@/views/EventList.vue";
import About from "@/views/About.vue";
import EventLayout from "@/views/event/Layout.vue";
import EventDetails from "@/views/event/Details.vue";
import EventRegister from "@/views/event/Register.vue";
import EventEdit from "@/views/event/Edit.vue";

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
    //4.**Note this props function mode is a anoynous fucntion
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
   path:'/event/:afterEvent(.*)',
   redirect: to => {
     return { path :'/events/'+ to.params.afterEvent }
   },
  }
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
