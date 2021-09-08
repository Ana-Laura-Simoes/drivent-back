import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm";
import Weekday from "./Weekday";
import Activity from "./Activity";

@Entity("days")
export default class Day extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    weekdayId: number;

    @Column()
    date: string;

    @OneToOne(() => Weekday, (weekday) => weekday.day, { eager: true })
    weekday: Weekday;

    @OneToMany(() => Activity, (activity) => activity.day )
    activity: Activity [];
}
 
