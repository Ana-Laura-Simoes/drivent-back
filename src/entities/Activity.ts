import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import ActivityUser from "./ActivityUser";
import ActivityInterface from "../interfaces/activity";
import dayjs from "dayjs";

@Entity("activities")
export default class Activity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    locationId: number;

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

    static async createNew({
      name,
      description,
      locationId,
      maxInscriptions,
      inscriptions,
      beginTime,
      endTime,
    }: ActivityInterface) {  
      const newActivity = this.create({ name, description, locationId, maxInscriptions, inscriptions, beginTime, endTime });
      await newActivity.save();
      return newActivity;
    }

    static async getDays() {
      const activitiesDays =  await this.createQueryBuilder("activities")
        .select("activities.beginTime")
        .orderBy("activities.beginTime", "ASC")
        .getMany();
      
      //await this.find({ select: ["beginTime"] });    
      const days: any=[];
      activitiesDays.map((a) => {
        days.push(dayjs(a.beginTime).format("YYYY-MM-DD"));
      });   
      return (days.filter((item: Activity, index: number) => days.indexOf(item) === index));     
    }

    static async getActivities() {
      return await this.find({ select: ["maxInscriptions", "inscriptions"] });
    }
    
    static async getActivitiesByDay(day: string) {
      const response= await this.createQueryBuilder("activities")
        .where("DATE(activities.beginTime) = :time", { time: day })
        .orderBy("activities.beginTime", "ASC")
        .getMany();
      return response;
    }

    static async increaseInscriptions(id: number) {
      return await this.createQueryBuilder()
        .update(Activity)
        .set({ inscriptions: () => "inscriptions + 1" })
        .where({ id })
        .execute();
    }

    static async decreaseInscriptions(id: number) {
      return await this.createQueryBuilder()
        .update(Activity)
        .set({ inscriptions: () => "inscriptions - 1" })
        .where({ id })
        .execute();
    }
}

