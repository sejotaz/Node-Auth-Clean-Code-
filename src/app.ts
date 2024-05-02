import { envs } from "./config"
import { Server } from "./presentation/servers"

(() => {

  main()

})()

async function main() {
  // todo: await base de datos
  // todo: inicio de nuestro server
  new Server({
    port: envs.PORT
  }).start()
}