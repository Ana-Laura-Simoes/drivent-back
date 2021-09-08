import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import Day from "./Day";

@Entity("weekdays")
export default class Weekday extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(() => Day, (day: Day) => day.weekday)
    day: Day;
}
