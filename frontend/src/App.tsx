import React, { useEffect, useState } from "react";
import Activity from "./components/Activity";
import Alert from "./components/common/Alert";
import AddEditActivityDialog from "./components/AddEditActivity";
import Loading from "./components/Loading";
import { Activity as ActivityModel } from "./models/activity";
import * as ActivitiesAPI from "./network/activities_api";
import { ApiError } from "./network/types";

function App() {
  const [activities, setActivities] = useState<ActivityModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [activitiesLoadingError, setActivitiesLoadingError] = useState<
    string | undefined
  >(undefined);
  const [activityToEdit, setActivityToEdit] = useState<ActivityModel | null>(
    null
  );
  const [isAddMode, setIsAddMode] = useState(false);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const activities = await ActivitiesAPI.fetchActivities();
        setActivities(activities);
      } catch (error) {
        console.error(error);
        const apiError = error as ApiError;
        setActivitiesLoadingError(apiError.message);
      } finally {
        setLoading(false);
      }
    };
    loadActivities();
  }, []);

  // Handle the logic for opening the Edit Activity modal
  useEffect(() => {
    const editModal = document.getElementById(
      "edit_modal"
    ) as HTMLDialogElement;
    if (activityToEdit && editModal) {
      editModal.show();
    }
  }, [activityToEdit]);

  // Handle the logic for opening the Add Activity modal
  useEffect(() => {
    const addModal = document.getElementById("add_modal") as HTMLDialogElement;
    if (isAddMode && !activityToEdit && addModal) {
      addModal.show();
    }
  }, [isAddMode, activityToEdit]);

  // Handle modal close/reset
  const handleCloseModal = () => {
    setActivityToEdit(null);
    setIsAddMode(false);
  };

  async function deleteActivity(activity: ActivityModel) {
    try {
      await ActivitiesAPI.deleteActivity(activity._id);
      setActivities((prevActivities) =>
        prevActivities.filter((a) => a._id !== activity._id)
      );
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  if (loading) {
    return <Loading />;
  }

  const ActivitiesList = () => {
    return (
      <div className="grid gap-6 justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => {
          return (
            <Activity
              key={activity._id}
              activity={activity}
              onActivitySelected={async (activity) => {
                await handleCloseModal(); // Reset state before showing modal again
                await setActivityToEdit(activity);
              }}
              onDeleteActivity={() => deleteActivity(activity)}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-10">
      {activities.length > 0 ? (
        <ActivitiesList />
      ) : (
        <div className="text-center">
          {activitiesLoadingError !== undefined ? (
            <Alert
              type="error"
              title="Something went wrong when trying to load activities."
              message={activitiesLoadingError}
            />
          ) : (
            <Alert
              type="info"
              title="No activities found."
              message="Please add an activity to get started."
            />
          )}
        </div>
      )}
      <div className="flex justify-center mt-6">
        <button
          className="btn btn-primary"
          onClick={async () => {
            await handleCloseModal(); // Reset state before showing modal again
            await setIsAddMode(true);
          }}
        >
          Add Activity
        </button>
        <AddEditActivityDialog
          activityToEdit={activityToEdit}
          onActivitySaved={(updatedActivity) => {
            if (activityToEdit) {
              // Update existing activity
              setActivities((activities) =>
                activities.map((existingActivity) =>
                  existingActivity._id === updatedActivity._id
                    ? updatedActivity
                    : existingActivity
                )
              );
            } else {
              // Add new activity
              setActivities((activities) => [...activities, updatedActivity]);
            }
            handleCloseModal(); // Reset after saving
          }}
        />
      </div>
    </div>
  );
}

export default App;
