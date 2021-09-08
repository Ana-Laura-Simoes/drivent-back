import Room from "../../src/entities/Room";

export async function createRoom(hotelId: number) {
  const room = Room.create({
    number:"101",
    maxCapacity:2,
    available:2,
    hotelId,
    type:"Double",
  });

  await room.save();
  
  return room;
}