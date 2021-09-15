import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, getConnection } from "typeorm";
import bcrypt from "bcrypt";
import EmailNotAvailableError from "@/errors/EmailNotAvailable";
import ActivityUser from "./ActivityUser";
import PasswordRecoveryInterface from "@/interfaces/passwordRecovery";

const defaultImage = "'data:image/jpeg;base64,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'";

@Entity("users")
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: "text", default: () => `${defaultImage}` })
  image: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @OneToMany(() => ActivityUser, (activityUser) => activityUser.user)
  activityUser: ActivityUser;

  static async createNew(email: string, password: string) {
    await this.validateDuplicateEmail(email);
    const hashedPassword = this.hashPassword(password);

    const newUser = this.create({ email, password: hashedPassword });
    await newUser.save();

    return newUser;
  }

  static hashPassword(password: string) {
    return bcrypt.hashSync(password, 12);
  }

  static async validateDuplicateEmail(email: string) {
    const user = await this.findOne({ email });

    if(user) {
      throw new EmailNotAvailableError(email);
    }
  }  

  static async findByEmailAndPassword(email: string, password: string) {
    const user = await this.findOne({ email });
    
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    
    return null;
  }

  static async getUserById(id: number) {
    return await this.findOne({ id });
  }

  static async setNewPassword(passwordData: PasswordRecoveryInterface) {
    const hashedPassword = this.hashPassword(passwordData.password);
    return await this
      .createQueryBuilder()
      .update(User)
      .set({ password: hashedPassword })
      .where("email = :email", { email: passwordData.email })
      .execute();
  }
  
  static async changeUserPicture(id: number, image: string) {
    return await this.createQueryBuilder()
      .update(User)
      .set({ image: () => `'${image}'` })
      .where({ id })
      .execute();
  }
}

