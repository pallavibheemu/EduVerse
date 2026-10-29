
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../../services/operations/SettingsAPI";
import { useForm } from "react-hook-form";
import IconBtn from "../../../common/IconBtn";

const genders = [
  "Male",
  "Female",
  "Non-Binary",
  "Prefer not to say",
  "Other",
];

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitProfileForm = async (data) => {
    try {
      // Await the async operation so errors can be handled.
      await dispatch(updateProfile(token, data));

      // Navigate here only if updateProfile resolves on success.
      // If it returns an error instead of throwing, check its implementation.
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <h2 className="text-lg font-semibold text-richblack-5">
          Profile Information
        </h2>

        {/* First name and last name */}
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="firstName" className="lable-style">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter first name"
              className="form-style"
              defaultValue={user?.firstName ?? ""}
              {...register("firstName", {
                required: "Please enter your first name",
              })}
            />
            {errors.firstName && (
              <span className="text-[12px] text-yellow-100">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="lastName" className="lable-style">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter last name"
              className="form-style"
              defaultValue={user?.lastName ?? ""}
              {...register("lastName", {
                required: "Please enter your last name",
              })}
            />
            {errors.lastName && (
              <span className="text-[12px] text-yellow-100">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>

        {/* Date of birth and gender */}
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="dateOfBirth" className="lable-style">
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              className="form-style"
              defaultValue={
                user?.additionalDetails?.dateOfBirth?.slice(0, 10) ?? ""
              }
              {...register("dateOfBirth", {
                required: "Please enter your date of birth",
                max: {
                  value: new Date().toISOString().split("T")[0],
                  message: "Date of birth cannot be in the future",
                },
              })}
            />
            {errors.dateOfBirth && (
              <span className="text-[12px] text-yellow-100">
                {errors.dateOfBirth.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="gender" className="lable-style">
              Gender
            </label>
            <select
              id="gender"
              className="form-style"
              defaultValue={user?.additionalDetails?.gender ?? ""}
              {...register("gender", {
                required: "Please select your gender",
              })}
            >
              <option value="" disabled>
                Select gender
              </option>
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
            {errors.gender && (
              <span className="text-[12px] text-yellow-100">
                {errors.gender.message}
              </span>
            )}
          </div>
        </div>

        {/* Contact number and about */}
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="contactNumber" className="lable-style">
              Contact Number
            </label>
            <input
              id="contactNumber"
              type="tel"
              placeholder="Enter contact number"
              className="form-style"
              defaultValue={
                user?.additionalDetails?.contactNumber ?? ""
              }
              {...register("contactNumber", {
                required: "Please enter your contact number",
                minLength: {
                  value: 10,
                  message: "Invalid contact number",
                },
                maxLength: {
                  value: 12,
                  message: "Invalid contact number",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Use digits only",
                },
              })}
            />
            {errors.contactNumber && (
              <span className="text-[12px] text-yellow-100">
                {errors.contactNumber.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="about" className="lable-style">
              About
            </label>
            <textarea
              id="about"
              placeholder="Write something about yourself"
              className="form-style min-h-[100px]"
              defaultValue={user?.additionalDetails?.about ?? ""}
              {...register("about", {
                required: "Please enter something about yourself",
              })}
            />
            {errors.about && (
              <span className="text-[12px] text-yellow-100">
                {errors.about.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
        >
          Cancel
        </button>

        <IconBtn
          type="submit"
          text={isSubmitting ? "Saving..." : "Save"}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}
