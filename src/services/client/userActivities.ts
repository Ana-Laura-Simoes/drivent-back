import ActivityUser from "@/entities/ActivityUser";
import ActivityInterface from "@/interfaces/activity";
import moment from "moment";

export async function getUserActivities(id: number) {
  return await ActivityUser.getUserActivities(id);
}

export async function checkUserActivities(id: number, activity: ActivityInterface) {
  const checkActivities = await ActivityUser.getUserActivities(id);

  for (let i = 0; i < checkActivities.length; i++) {
    if (
      moment(activity.beginTime).isBetween(
        moment(checkActivities[i].activity.beginTime),
        moment(checkActivities[i].activity.endTime)
      ) ||
      moment(activity.endTime).isBetween(
        moment(checkActivities[i].activity.beginTime),
        moment(checkActivities[i].activity.endTime)
      ) ||
      moment(activity.beginTime).isSame(
        moment(checkActivities[i].activity.beginTime)
      ) ||
      moment(activity.endTime).isSame(
        moment(checkActivities[i].activity.endTime)
      )
    ) {
      return false;
    }

    if (
      moment(checkActivities[i].activity.beginTime).isBetween(
        moment(activity.beginTime),
        moment(activity.endTime)
      ) ||
      moment(checkActivities[i].activity.endTime).isBetween(
        moment(activity.beginTime),
        moment(activity.endTime)
      )
    ) {
      return false;
    }
  }

  return true;
}

export async function insertUserActivity(userId: number, activityId: number) {
  return await ActivityUser.insertNewUserActivity(userId, activityId);
}

export async function deleteUserActivity(userId: number, activityId: number) {
  const findThisActivity = await ActivityUser.getSingleActivity(userId, activityId);

  if(findThisActivity.length === 0) return false;

  return await ActivityUser.deleteUserActivity(userId, activityId);
}
