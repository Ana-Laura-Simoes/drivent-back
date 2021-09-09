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

    static async getDayss() {
      const v = await this.find({ select: ["beginTime"] });
      console.log(v);
      return v;
    }

    static async getDays() {
      const beginTime="2021-10-21";

      const response= await this.createQueryBuilder("activities").where("DATE(activities.beginTime) = :time", { time: beginTime }).getMany();
      //this.createQueryBuilder("activities").where("DATE(activities.beginTime) = :time", { time: beginTime });
      console.log( response);
      return response;
      //return await this.find({ where: { beginTime: "2021-10-22 09:00:00" } });
      //.createQueryBuilder("activities").where("beginTime LIKE ‘%’ || :q || ‘%’", { q: beginTime }).getMany();
      
      //.find({ beginTime: Like(`%${beginTime}%`) }); 
      
      //.createQueryBuilder("activities")
      //.where("activities.beginTime ilike :beginTime", { beginTime: `%${beginTime}%` })
      //.getMany();
    }
}

