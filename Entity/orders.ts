import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Orders {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @Column()
    order_type: string

    @Column()
    currency_symbol: string

    @Column('double precision')
    price: number

    @Column()
    quantity: number

    @Column()
    status: string
}