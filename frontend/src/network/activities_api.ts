import { Activity } from "../models/activity";
import { User } from "../models/user";
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
 * Fetches the currently logged in user from the server
 * @returns The logged in user
 */
export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData("/api/users", {
    method: API_METHODS.GET,
  });
  return response.json();
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

/**
 * Logs in a user with the given credentials
 * @param credentials The credentials to log in with
 * @returns The logged in user
 */
export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData("/api/users/signup", {
    method: API_METHODS.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Logs in a user with the given credentials
 * @param credentials The credentials to log in with
 * @returns The logged in user
 */
export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData("/api/users/login", {
    method: API_METHODS.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

/**
 * Logs out the currently logged in user
 */
export async function logout(): Promise<void> {
  await fetchData("/api/users/logout", {
    method: API_METHODS.POST,
  });
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
