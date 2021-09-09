import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import ActivityUser from "./ActivityUser";
import { Like } from "typeorm";

@Entity("activities")
export default class Activity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    maxInscriptions: number;

    @Column()
    inscriptions: number;

    @Column()
    beginTime: Date;

    @Column()
    endTime: Date;

    @OneToMany(() => ActivityUser, (activityUser) => activityUser.activity)
    activityUser: ActivityUser;

    static async getDays() {
      const v = await this.find({ select: ["beginTime"] });
      console.log(v);
      return v;
    }

    static async getActivitiesByDay(day: string) {
      //const beginTime="2021-10-22";
      const response= await this.createQueryBuilder("activities").where("DATE(activities.beginTime) = :time", { time: day }).getMany();
      return response;
    }
}

