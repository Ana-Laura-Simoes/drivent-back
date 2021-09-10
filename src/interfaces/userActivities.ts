import Activity from "./activity";

interface UserActivities {
    id: number,
    userId: number,
    activityId: number,
    activity: Activity[]
}

export default UserActivities;
