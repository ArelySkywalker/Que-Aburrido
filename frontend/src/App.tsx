import React, { useEffect, useState } from "react";
import { Activity as ActivityModel } from "./models/activity";
import Activity from "./components/Activity";
import { Container, Grid } from "@mui/material";

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
    <Container>
      <Grid container spacing={2}>
      {activities.map((activity) => {
        return (
        <Grid item  xs={12} sm={12} md={6}  key={activity._id}><Activity activity={activity} /></Grid>);
      })}
      </Grid>
    </Container>
  );
}

export default App;
