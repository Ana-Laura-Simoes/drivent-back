import Location from "@/entities/Location";

export async function getLocations() {
  return await Location.getLocations();
}
