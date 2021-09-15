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

    static async getPasswordRecovery() {
      return await this.find();
    }
}
