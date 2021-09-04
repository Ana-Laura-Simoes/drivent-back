import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import RoomsData from "@/interfaces/room";

@Entity("rooms")
export default class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  maxCapacity: number;

  @Column()
  available: number;
}
