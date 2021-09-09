import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Activity from "./Activity";

@Entity("locations")
export default class Location extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @OneToMany(() => Activity, (activity) => activity.location )
    activity: Activity [];
}
