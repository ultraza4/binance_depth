import vuetify from './vuetify'
import router from "@/router/router";
import pinia from "@/store";

export function registerPlugins (app) {
  app.use(vuetify)
  app.use(router)
  app.use(pinia)
}
