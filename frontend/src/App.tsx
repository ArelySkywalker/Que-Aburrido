import React, { useEffect, useState } from "react";
import { Activity as ActivityModel } from "./models/activity";
import Activity from "./components/Activity";

function App() {
  const [activities, setActivities] = useState<ActivityModel[]>([]);

  useEffect(() => {
    const localhost = async () => {
      try {
        const response = await fetch("/api/activities", {
          method: "GET",
        });
        const activities = await response.json();
        setActivities(activities);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };
    localhost();
  }, []);

  return (
    <div className="flex w-full">
      {activities.map((activity) => {
        return (
          <div className="card grid h-20 flex-grow place-items-center">
            <Activity activity={activity} />
          </div>
        );
      })}
    </div>
  );
}

export default App;
