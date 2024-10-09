import { Activity as ActivityModel } from "../models/activity";

const Activity = ({ activity }: { activity: ActivityModel }) => {
  const { activityType, participants } = activity;

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{activityType}</h2>
        <p>{`Participants: ${participants}`}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default Activity;
