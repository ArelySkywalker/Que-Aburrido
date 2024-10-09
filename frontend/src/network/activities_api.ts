import { Activity } from "../models/activity";
import { ActivityInput, API_METHODS } from "./types";

/**
 *
 * @param inout The URL to fetch data from
 * @param init The request options
 * @returns The response from the server
 */
async function fetchData(
  inout: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  const response = await fetch(inout, init);
  if (!response.ok) {
    const errorBody = await response.json();
    const { errorMessage } = errorBody;
    throw new Error(errorMessage);
  }
  return response;
}

/**
 * Fetches all activities from the server
 * @returns A list of activities
 */
export async function fetchActivities(): Promise<Activity[]> {
  const response = await fetchData("/api/activities", {
    method: API_METHODS.GET,
  });
  return response.json();
}
/**
 * Creates an activity on the server
 * @param activity The activity to create
 * @returns The created activity
 */
export async function createActivity(
  activity: ActivityInput
): Promise<Activity> {
  const response = await fetchData("/api/activities", {
    method: API_METHODS.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activity),
  });
  return response.json();
}

/**
 * Updates an activity on the server
 * @param activityId The ID of the activity to update
 * @param activity The updated activity data
 * @returns The updated activity
 */
export async function updateActivity(
  activityId: string,
  activity: ActivityInput
): Promise<Activity> {
  const response = await fetchData(`/api/activities/${activityId}`, {
    method: API_METHODS.PATCH,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activity),
  });
  return response.json();
}

/**
 * Deletes an activity from the server
 * @param activityId The ID of the activity to delete
 */
export async function deleteActivity(activityId: string): Promise<void> {
  await fetchData(`/api/activities/${activityId}`, {
    method: API_METHODS.DELETE,
  });
}
