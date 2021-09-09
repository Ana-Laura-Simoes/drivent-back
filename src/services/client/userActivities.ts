import ActivityUser from "@/entities/ActivityUser";

export async function getUserActivities(id: number) {
  return await ActivityUser.getUserActivities(id);
}
