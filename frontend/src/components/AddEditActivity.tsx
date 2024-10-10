import { useEffect, useState } from "react";
import { Activity } from "../models/activity";
import { ActivityInput } from "../network/types";
import * as ActivitiesAPI from "../network/activities_api";

interface AddEditActivityDialogProps {
  activityToEdit?: Activity | null;
  onActivitySaved: (activity: Activity) => void;
}

const AddEditActivityDialog = ({
  activityToEdit,
  onActivitySaved,
}: AddEditActivityDialogProps) => {
  const [activity, setActivity] = useState<ActivityInput>({
    activityType: "",
    participants: 0,
  });

  useEffect(() => {
    setActivity({
      activityType: activityToEdit?.activityType || "",
      participants: activityToEdit?.participants || 0,
    });
  }, [activityToEdit]);

  const [errors, setErrors] = useState<{
    activityType?: string;
    participants?: string;
  }>({});

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setActivity((prev) => ({
      ...prev,
      [name]: name === "participants" ? parseInt(value) : value,
    }));
  };

  // Validate the form
  const validateForm = (): boolean => {
    let formIsValid = true;
    const validationErrors: { activityType?: string; participants?: string } =
      {};

    if (!activity.activityType || activity.activityType.trim() === "") {
      validationErrors.activityType = "Activity type is required";
      formIsValid = false;
    }

    if (!activity.participants || activity.participants <= 0) {
      validationErrors.participants = "Participants must be a positive number";
      formIsValid = false;
    }

    setErrors(validationErrors);
    return formIsValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (validateForm()) {
      try {
        let activityResponse: Activity;
        if (activityToEdit) {
          activityResponse = await ActivitiesAPI.updateActivity(
            activityToEdit._id,
            activity
          );
        } else {
          activityResponse = await ActivitiesAPI.createActivity(activity);
        }
        // Notify the parent component that the activity was saved
        onActivitySaved(activityResponse);
        setActivity({ activityType: "", participants: 0 });
        // Close the modal after successful submission
        const modal = document.getElementById(
          activityToEdit ? "edit_modal" : "add_modal"
        ) as HTMLDialogElement;
        if (modal) modal.close();
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
  };

  return (
    <>
      <dialog
        id={activityToEdit ? "edit_modal" : "add_modal"}
        className="modal"
      >
        <div className="modal-box bg-slate-200">
          <h3 className="font-bold text-lg">
            {activityToEdit ? "Edit" : "Add New"} Activity
          </h3>
          <p className="py-4">Please fill in the details below:</p>

          {/* Form for adding or updating an activity */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Activity Type Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Activity Type</span>
              </label>
              <input
                type="text"
                name="activityType"
                value={activity.activityType}
                onChange={handleInputChange}
                placeholder="Enter activity type"
                className={`input input-bordered bg-slate-50 ${
                  errors.activityType ? "input-error" : ""
                }`}
                required
              />
              {errors.activityType && (
                <span className="text-error text-sm">
                  {errors.activityType}
                </span>
              )}
            </div>

            {/* Participants Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Participants</span>
              </label>
              <input
                type="number"
                name="participants"
                value={activity.participants}
                onChange={handleInputChange}
                placeholder="Number of participants"
                className={`input input-bordered bg-slate-50 ${
                  errors.participants ? "input-error" : ""
                }`}
                min="1"
                required
              />
              {errors.participants && (
                <span className="text-error text-sm">
                  {errors.participants}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                {activityToEdit ? "Update" : "Add"} Activity
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setActivity({ activityType: "", participants: 0 });
                  const modal = document.getElementById(
                    activityToEdit ? "edit_modal" : "add_modal"
                  ) as HTMLDialogElement;
                  if (modal) modal.close();
                }}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddEditActivityDialog;
