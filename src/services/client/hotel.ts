//import EnrollmentData from "@/interfaces/enrollment";
import Hotel from "@/entities/Hotel";

export async function getHotelsWithRooms() {
  return await Hotel.getHotels();
}

// export async function createNewEnrollment(enrollmentData: EnrollmentData) {
//   await Enrollment.createOrUpdate(enrollmentData);  
// }
