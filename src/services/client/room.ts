import Room from "@/entities/Room";

export async function setOrUpdate(userId: number, roomId: number) {
  await Room.setOrUpdate(userId, roomId);
}
