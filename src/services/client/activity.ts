import Activity from "@/entities/Activity";

export async function getDays() {
  return await Activity.getDays();
}

export async function getActivitiesByDay(day: string) {
  return await Activity.getActivitiesByDay(day);
}
