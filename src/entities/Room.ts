import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
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
  @JoinColumn()
  hotel: Hotel;

  static async getRoom(id: number) {
    return await this.findOne( id );
  }

  static async setOrUpdate(userId: number, newRoom: number) {
    const { roomId } = await Payment.getPayment(userId); 

    if(roomId) {
      await this
        .createQueryBuilder()
        .update(Room)
        .set({ available: () => "available + 1" })
        .where("id = :id", { id: roomId } )
        .execute();
    }

    await Payment.updatePaymentRoomId(userId, newRoom);

    await this
      .createQueryBuilder()
      .update(Room)
      .set({ available: () => "available - 1" })
      .where("id = :id", { id: newRoom } )
      .execute();
  }
}
