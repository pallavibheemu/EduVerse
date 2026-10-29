import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../../../services/operations/SettingsAPI";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const submitPasswordForm = async (data) => {
    try {
      setIsSubmitting(true);

      await changePassword(token, data);

      reset();
    } catch (err) {
      console.error(
        "Failed to update password:",
        err.response?.data?.message || err.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <h2 className="text-lg font-semibold text-richblack-5">
          Password
        </h2>

        <div className="flex flex-col gap-5 lg:flex-row">
          {/* Current password */}
          <div className="relative flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="oldPassword" className="lable-style">
              Current Password
            </label>

            <input
              type={showOldPassword ? "text" : "password"}
              id="oldPassword"
              placeholder="Enter Current Password"
              className="form-style pr-12"
              autoComplete="current-password"
              {...register("oldPassword", {
                required: "Please enter your current password",
              })}
            />

            <button
              type="button"
              aria-label={
                showOldPassword ? "Hide current password" : "Show current password"
              }
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showOldPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </button>

            {errors.oldPassword && (
              <span className="text-[12px] text-yellow-100">
                {errors.oldPassword.message}
              </span>
            )}
          </div>

          {/* New password */}
          <div className="relative flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="newPassword" className="lable-style">
              New Password
            </label>

            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              placeholder="Enter New Password"
              className="form-style pr-12"
              autoComplete="new-password"
              {...register("newPassword", {
                required: "Please enter your new password",
                minLength: {
                  value: 8,
                  message: "Password must contain at least 8 characters",
                },
              })}
            />

            <button
              type="button"
              aria-label={
                showNewPassword ? "Hide new password" : "Show new password"
              }
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </button>

            {errors.newPassword && (
              <span className="text-[12px] text-yellow-100">
                {errors.newPassword.message}
              </span>
            )}
          </div>
        </div>

        {/* Confirm new password */}
        <div className="relative flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="confirmNewPassword" className="lable-style">
            Confirm New Password
          </label>

          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmNewPassword"
            placeholder="Confirm New Password"
            className="form-style pr-12"
            autoComplete="new-password"
            {...register("confirmNewPassword", {
              required: "Please confirm your new password",
              validate: (value) =>
                value === watch("newPassword") ||
                "Passwords do not match",
            })}
          />

          <button
            type="button"
            aria-label={
              showConfirmPassword
                ? "Hide confirmation password"
                : "Show confirmation password"
            }
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </button>

          {errors.confirmNewPassword && (
            <span className="text-[12px] text-yellow-100">
              {errors.confirmNewPassword.message}
            </span>
          )}
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
          text={isSubmitting ? "Updating..." : "Update"}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}
