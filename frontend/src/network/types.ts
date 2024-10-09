export enum API_METHODS {
  GET = "GET",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface ActivityInput {
  activityType: string;
  participants: number;
}
