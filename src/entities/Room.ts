import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Hotel from "@/entities/Hotel";
import Payment from "@/entities/Payment";

@Entity("rooms")
export default class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  type: string;

  @Column()
  maxCapacity: number;

  @Column()
  available: number;

  @Column()
  hotelId: number;

  @ManyToOne(() => Hotel, hotel => hotel.rooms)
  hotel: Hotel;

  static async setOrUpdate(userId: number, roomId: number) {
    const { roomId: previousRoom } = await Payment.getPayment(userId);

    if(previousRoom) {
      await this
        .createQueryBuilder()
        .update(Room)
        .set({ available: () => "available + 1" })
        .where("id = :id", { id: previousRoom } )
        .execute();
    }

    await Payment.updatePaymentRoomId(userId, roomId);

    await this
      .createQueryBuilder()
      .update(Room)
      .set({ available: () => "available - 1" })
      .where("id = :id", { id: roomId } )
      .execute();
  }
}
