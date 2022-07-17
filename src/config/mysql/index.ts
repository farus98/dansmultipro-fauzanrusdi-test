import { Login } from "../../entity/login.entity";

export const database = () => ({
  db_config: {
    type: "mysql",
    host: process.env.DB_HOST ? process.env.DB_HOST : "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME ? process.env.DB_USERNAME : "admin",
    password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "admin123",
    database: process.env.DB_NAME ? process.env.DB_NAME : "dans_multipro",
    entities: [
     Login
    ],
    synchronize: process.env.ENV == "production" ? true : false,
    logging: process.env.ENV == "production" ? true : false,
  },
});