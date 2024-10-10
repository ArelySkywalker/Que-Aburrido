import React, { useEffect, useState } from "react";
import Activity from "./components/Activity";
import { Activity as ActivityModel } from "./models/activity";
import * as ActivitiesAPI from "./network/activities_api";
import AddEditActivityDialog from "./components/AddEditActivity";
import Loading from "./components/Loading";
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => {
          return (
            <div key={activity._id} className="card p-4 rounded-lg bg-white">
              <Activity
                activity={activity}
                onActivitySelected={async (activity) => {
                  await handleCloseModal(); // Reset state before showing modal again
                  await setActivityToEdit(activity);
                }}
                onDeleteActivity={() => deleteActivity(activity)}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      {activities.length > 0 ? (
        <ActivitiesList />
      ) : (
        <div className="text-center">
          {activitiesLoadingError !== undefined ? (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-bold">
                  Something went wrong when trying to load activities.
                </h3>
                <div className="text-xs">{activitiesLoadingError}</div>
              </div>
            </div>
          ) : (
            <div role="alert" className="alert alert-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>No activities found.</span>
            </div>
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
