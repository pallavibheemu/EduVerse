import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Player } from "video-react";
import { FiUploadCloud } from "react-icons/fi";

export default function Upload({
    name,
    label,
    register,
    setValue,
    errors,
    video = false,
    viewData = false,
    editData = false,
}) {
    const [selectedFile, setSelectedFile] = useState(null);

    const [previewSource, setPreviewSource] = useState(
        viewData ? viewData : editData ? editData : ""
    );

    // Creates a preview of the selected file
    const previewFile = (file) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    // Runs when a file is selected/dropped
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];

        if (file) {
            previewFile(file);
            setSelectedFile(file);
        }
    };

    // React Dropzone
    const {
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone({
        accept: video
            ? {
                  "video/*": [".mp4"],
              }
            : {
                  "image/*": [".jpeg", ".jpg", ".png"],
              },
        onDrop,
    });

    // Register the field with React Hook Form
    useEffect(() => {
        register(name, {
            required: true,
        });
    }, [register, name]);

    // Send selected file to React Hook Form
    useEffect(() => {
        setValue(name, selectedFile);
    }, [selectedFile, setValue, name]);

    // Cancel selected file
    const handleCancel = () => {
        setPreviewSource("");
        setSelectedFile(null);
        setValue(name, null);
    };

    return (
        <div className="flex flex-col space-y-2">

            {/* Label */}
            <label
                htmlFor={name}
                className="text-sm text-richblack-5"
            >
                {label}

                {!viewData && (
                    <sup className="text-pink-200">*</sup>
                )}
            </label>

            {/* Upload / Preview Area */}
            {previewSource ? (
                <div className="flex w-full flex-col p-6">
                    {!video ? (
                        <img
                            src={previewSource}
                            alt="preview"
                            className="h-full w-full rounded-md object-cover"
                        />
                    ) : (
                        <Player
                            aspectRatio="16:9"
                            playsInline
                            src={previewSource}
                        />
                    )}

                    {!viewData && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="mt-3 text-richblack-400 underline"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className={`${
                        isDragActive
                            ? "bg-richblack-600"
                            : "bg-richblack-700"
                    } flex min-h-[250px] w-full cursor-pointer
                    flex-col items-center justify-center rounded-md
                    border-2 border-dotted border-richblack-500`}
                >
                    <input {...getInputProps()} />

                    <FiUploadCloud className="text-2xl text-yellow-50" />

                    <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                        Drag and Drop a{" "}
                        {!video ? "image" : "video"}, or click to{" "}
                        <span className="font-semibold text-yellow-50">
                            Browse
                        </span>{" "}
                        a file
                    </p>

                    <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
                        <li>Aspect ratio 16:9</li>
                        <li>Recommended size 1024x576</li>
                    </ul>
                </div>
            )}

            {/* Error */}
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required
                </span>
            )}
        </div>
    );
}