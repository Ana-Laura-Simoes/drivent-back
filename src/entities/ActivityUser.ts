import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
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

  static async getUserActivities(id: number) {
    return await this.find(
      {
        where: { userId: id },
        relations: ["activity"]
      }
    );
  }

  static async insertNewUserActivity(userId: number, activityId: number) {
    await Activity.increaseInscriptions(activityId);
    
    return await this.insert({
      userId,
      activityId
    });
  }
}
