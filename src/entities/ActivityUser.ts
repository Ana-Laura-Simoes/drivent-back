import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./User";
import Activity from "./Activity";

@Entity("activitiesUsers")
export default class ActivityUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    activityId: number;

    @ManyToOne(() => User, (user) => user.activityUser)
    user: User;

    @ManyToOne(() => Activity, (activity) => activity.activityUser)
    activity: Activity;
}
