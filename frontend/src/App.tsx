import React, { useEffect, useState } from "react";
import { Activity } from "./models/activity";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

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

  return <div className="App">{JSON.stringify(activities)}</div>;
}

export default App;
