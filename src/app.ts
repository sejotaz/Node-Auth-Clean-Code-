import { envs } from "./config"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/servers"

(() => {

  main()

})()

async function main() {
  // TODO: await base de datos
  // TODO: inicio de nuestro server
  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes
  }).start()
}