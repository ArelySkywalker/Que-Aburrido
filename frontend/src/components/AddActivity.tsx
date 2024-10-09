import { useState } from "react";
import { ActivityInput } from "../network/types";
import * as ActivitiesAPI from "../network/activities_api";
import { Activity } from "../models/activity";

interface AddActivityDialogProps {
  onActivitySaved: (activity: Activity) => void;
}

const AddActivityDialog = ({ onActivitySaved }: AddActivityDialogProps) => {
  const [activity, setActivity] = useState<ActivityInput>({
    activityType: "",
    participants: 0,
  });

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
        const activityResponse = await ActivitiesAPI.createActivity(activity);
        onActivitySaved(activityResponse);
        // Close the modal after successful submission
        const modal = document.getElementById(
          "my_modal_1"
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
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Activity</h3>
          <p className="py-4">Please fill in the details below:</p>

          {/* Form for adding a new activity */}
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
                className={`input input-bordered ${
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
                className={`input input-bordered ${
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
                Add Activity
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  const modal = document.getElementById(
                    "my_modal_1"
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

export default AddActivityDialog;
