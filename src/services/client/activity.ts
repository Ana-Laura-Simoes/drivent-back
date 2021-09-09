import Activity from "@/entities/Activity";

export async function getDays() {
  return await Activity.getActivities();
}

export async function getActivitiesByDay(day: string) {
  return await Activity.getActivitiesByDay(day);
}

