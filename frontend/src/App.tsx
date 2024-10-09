import React, { useEffect, useState } from "react";
import Activity from "./components/Activity";
import { Activity as ActivityModel } from "./models/activity";
import * as ActivitiesAPI from "./network/activities_api";
import AddActivityDialog from "./components/AddActivity";

function App() {
  const [activities, setActivities] = useState<ActivityModel[]>([]);

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
    <div className="container mx-auto p-6">
      {/* Grid Layout for Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => {
          return (
            <div key={activity._id} className="card p-4 rounded-lg bg-white">
              <Activity activity={activity} />
            </div>
          );
        })}
      </div>

      {/* Add Activity Button */}
      <div className="flex justify-center mt-6">
        <button
          className="btn btn-primary"
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
        <AddActivityDialog
          onActivitySaved={(newActivity) =>
            setActivities([...activities, newActivity])
          }
        />
      </div>
    </div>
  );
}

export default App;
