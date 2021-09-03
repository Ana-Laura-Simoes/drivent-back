import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import PaymentInterface from "@/interfaces/payment";

@Entity("payment")
export default class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  userId: number;

  @Column()
  userEmail: string;

  @Column()
  price: number;

  @Column()
  type: string;

  static async createNew({
    userName,
    userId,
    userEmail,
    price,
    type,
  }: PaymentInterface) {
    const payment = this.create({ userName, userId, userEmail, price, type });
    await payment.save();
    return payment;
  }
}
