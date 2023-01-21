import { DataSource} from "typeorm"
import User from "../../../modules/users/infra/typeorm/entities/User"
import Appointment from "../../../modules/appointments/infra/typeorm/entities/Appointment"

const options:  any = {
    type: "postgres",
    host: "localhost",
    port: 2345,
    username: "postgres",
    password: "docker",
    database: "gostack_gobarber",
    logging: true,
    synchronize: false,
    entities: [
      User, Appointment
        // "./src/modules/users/infra/typeorm/entities/.ts",
        // "./src/modules/appointments/infra/typeorm/entities/.ts"

    ],
    subscribers: [
        "subscriber/*.js"
    ],
    entitySchemas: [
        "schema/*.json"
    ],
    migrations: [
        "./src/shared/infra/typeorm/migrations/*.ts"
    ],
    cli: {
        entitiesDir: "entity",
        migrationsDir: "src/database",
        subscribersDir: "subscriber"
    }
}

 export const AppDataSource = new DataSource(options)


