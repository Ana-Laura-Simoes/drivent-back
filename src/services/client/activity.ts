import Activity from "@/entities/Activity";

export async function getActivities() {
  return await Activity.getActivities();
}
