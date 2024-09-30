import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/home.vue";
import Empire from "@/pages/empire.vue";
import USSR from "@/pages/ussr.vue";
import RF from "@/pages/rf.vue";
import Link from "@/pages/link.vue";
import Line from "@/pages/line.vue";
import PointAlongRoute from "@/pages/point_along_route.vue";
import Sine from "@/pages/sine.vue";
import TextPop2 from "@/pages/text_pop2.vue";

const routes = [
  { path: "/", component: Home, name: "home" },
  { path: "/empire", component: Empire, name: "empire" },
  { path: "/ussr", component: USSR, name: "ussr" },
  { path: "/rf", component: RF, name: "rf" },
  { path: "/link", component: Link, name: "link" },
  { path: "/line", component: Line, name: "line" },
  {
    path: "/point_along_route",
    component: PointAlongRoute,
    name: "point_along_route",
  },
  { path: "/sine", component: Sine, name: "sine" },
  { path: "/text_pop2", component: TextPop2, name: "text_pop2" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
