import { Activity as ActivityModel } from "../models/activity";

const Activity = ({ activity }: { activity: ActivityModel }) => {
  const { activityType, participants, createdAt, updatedAt } = activity;
  const createdAtDate = new Date(createdAt);
  const updatedAtDate = new Date(updatedAt);

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{activityType}</h2>
        <p>{`Participants: ${participants}`}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Learn More</button>
        </div>
        <div className="card-actions justify-end">
          <div>
            {updatedAt > createdAt
              ? `Updated at: ${updatedAtDate.toLocaleString("en-US", {
                  weekday: "long", // e.g., "Monday"
                  year: "numeric", // e.g., "2024"
                  month: "long", // e.g., "October"
                  day: "numeric", // e.g., "8"
                  hour: "numeric", // e.g., "10 AM"
                  minute: "numeric", // e.g., "08"
                })}`
              : `Created at: ${createdAtDate.toLocaleString("en-US", {
                  weekday: "long", // e.g., "Monday"
                  year: "numeric", // e.g., "2024"
                  month: "long", // e.g., "October"
                  day: "numeric", // e.g., "8"
                  hour: "numeric", // e.g., "10 AM"
                  minute: "numeric", // e.g., "08"
                })}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
