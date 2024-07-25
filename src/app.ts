import { envs } from "./config"
import { MongoDatabase } from "./data/mongodb"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/servers"

(() => {

  main()

})()

async function main() {
   await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
   })
  // TODO: inicio de nuestro server
  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes
  }).start()
}