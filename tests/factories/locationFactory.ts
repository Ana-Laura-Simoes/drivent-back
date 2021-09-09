import Location from "../../src/entities/Location";


export async function createLocation() {
  const name = "Auditório Principal";  
  const location = await Location.createNew(name);
  return location;
}