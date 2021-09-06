import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Hotel from "@/entities/Hotel";
import User from "@/entities/User";

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
    console.log(userId, roomId);
    const user = await User.getUserById(userId);

    if(user.roomId) {
      await this
        .createQueryBuilder()
        .update(Room)
        .set({ available: () => "available + 1" })
        .where("id = :id", { id: user.roomId } )
        .execute();
    }

    await User.updateUserRoom(userId, roomId);

    await this
      .createQueryBuilder()
      .update(Room)
      .set({ available: () => "available - 1" })
      .where("id = :id", { id: roomId } )
      .execute();
  }
}
