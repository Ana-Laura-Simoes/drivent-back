import Location from "../../src/entities/Location";
import Activity from "../../src/entities/Activity";
import faker from "faker/locale/pt_BR";

export async function createActivity(locationId:number) {
    const activity ={
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        locationId: locationId,
        maxInscriptions: faker.datatype.number(),
        inscriptions: faker.datatype.number(),
        beginTime:"2021-10-22 09:00:00",
        endTime:"2021-10-22 11:30:00",
    } 
  const newActivity = await Activity.createNew(activity);
  return newActivity;
}