import clsx from "clsx";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { Activity as ActivityModel } from "../models/activity";

interface ActivityProps {
  activity: ActivityModel;
  onActivitySelected: (activity: ActivityModel) => void;
  onDeleteActivity: (activity: ActivityModel) => void;
}

const Activity = ({
  activity,
  onActivitySelected,
  onDeleteActivity,
}: ActivityProps) => {
  const { activityType, participants } = activity;

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{activityType}</h2>
        <p>{`Participants: ${participants}`}</p>
        <div className="card-actions justify-end">
          <button
            className={clsx(
              "delete-activity-button badge badge-outline",
              "text-rose-700 border-text-rose-700",
              "hover:bg-rose-700 hover:border-text-rose-700 hover:text-white",
              "transition-all duration-300"
            )}
            onClick={() => onActivitySelected(activity)}
          >
            <FaRegPenToSquare />
          </button>
          <button
            className={clsx(
              "delete-activity-button badge badge-outline",
              "text-stone-950 border-stone-950",
              "hover:bg-stone-950 hover:text-white",
              "transition-all duration-300"
            )}
            onClick={() => onDeleteActivity(activity)}
          >
            <FaRegTrashCan />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Activity;
