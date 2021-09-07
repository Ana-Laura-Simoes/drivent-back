import Room from "@/entities/Room";

export async function setOrUpdate(userId: number, roomId: number) {
  await Room.setOrUpdate(userId, roomId);
}

export async function getRoom(roomId: number) {
  return await Room.getRoom(roomId);
}
