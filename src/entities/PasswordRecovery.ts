import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("passwordsRecovery")
export default class PasswordRecovery extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column()
    token: string;
    
    static async createNew(email: string) {  
      const token = uuidv4();
      const newLocation = this.create({ email, token });
      await newLocation.save();
      return newLocation;
    }

    static async checkIfTokenIsExpired(token: string) {      
      const user = await this.find({ token });
      const x: any = new Date(user[0].createdAt);
      const y: any = new Date();
      const time = y - x;
      const formatedTime = Math.round(((time%86_400_000)%3_600_000)/60_000);

      return formatedTime;
    }

    static async getPasswordRecovery(token: string) {
      const user = await this.find({ token });
      return user;
    }   
}
