import Activity from "@/entities/Activity";

export async function getDays() {
  return await Activity.getDays();
}
