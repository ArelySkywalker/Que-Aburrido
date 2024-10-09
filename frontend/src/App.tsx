import React, { useEffect, useState } from "react";
import Activity from "./components/Activity";
import { Activity as ActivityModel } from "./models/activity";
import * as ActivitiesAPI from "./network/activities_api";
import AddActivityDialog from "./components/AddActivity";

function App() {
  const [activities, setActivities] = useState<ActivityModel[]>([]);
  // const [showAddActivityDialog, setShowAddActivityDialog] = useState(false);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const activities = await ActivitiesAPI.fetchActivities();
        setActivities(activities);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };
    loadActivities();
  }, []);

  return (
    <div className=" ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((activity) => {
          return (
            <div
              key={activity._id}
              className="card grid h-20 flex-grow place-items-center"
            >
              <Activity activity={activity} />
            </div>
          );
        })}
      </div>
      <div className="container ">
        <button
          className="btn"
          // @ts-ignore
          onClick={() => {
            const modal = document.getElementById(
              "my_modal_1"
            ) as HTMLDialogElement;
            if (modal) modal.show();
          }}
        >
          Add Activity
        </button>
        <AddActivityDialog />
      </div>
    </div>
  );
}

export default App;
