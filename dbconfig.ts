import { DataSource } from "typeorm";
import { Balance } from "./Entity/balance";
import { Orders } from "./Entity/orders";

export const DataSourceManger = new DataSource({
    type: 'postgres',
    port: 5432,
    username: 'ullas',
    password: '',
    database: 'sample',
    synchronize: true,
    entities: [Balance, Orders]
})