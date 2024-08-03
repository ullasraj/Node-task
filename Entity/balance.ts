import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Balance {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @Column()
    currency_symbol: string

    @Column('double precision')
    balance: number
}       