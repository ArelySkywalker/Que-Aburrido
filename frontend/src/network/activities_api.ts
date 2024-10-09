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
