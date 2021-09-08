import faker from "faker";
import Hotel from "../../src/entities/Hotel";

export async function createHotel() {
  const hotel = Hotel.create({
    name: faker.name.firstName(),
    image: faker.image.imageUrl()
  });

  await hotel.save();
  
  return hotel;
}