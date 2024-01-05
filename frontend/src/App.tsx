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
    <div>
      {activities.map((activity) => {
        return <Activity activity={activity} key={activity._id} />;
      })}
    </div>
  );
}

export default App;
