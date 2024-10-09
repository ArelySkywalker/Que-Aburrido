export enum API_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface ActivityInput {
  activityType: string;
  participants: number;
}
