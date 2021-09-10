import ActivityUser from "../../src/entities/ActivityUser";

export async function createUserActivity(userId:number, activityId: number) { 
  const newUserActivity = await ActivityUser.insertNewUserActivity(userId, activityId);
  return newUserActivity;
}