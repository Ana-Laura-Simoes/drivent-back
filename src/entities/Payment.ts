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

  @Column()
  hotel: boolean;

  static async createNew({
    userName,
    userId,
    userEmail,
    price,
    type,
    hotel,
  }: PaymentInterface) {
    const payment = this.create({ userName, userId, userEmail, price, type, hotel });
    await payment.save();
    return payment;
  }

  static async getPayment(userId: number) {
    return await this.findOne({ where: { userId } });
  }
}
