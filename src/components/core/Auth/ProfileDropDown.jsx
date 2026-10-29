import React, { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { logout } from "../../../services/operations/authAPI";

export default function ProfileDropDown() {
    const { user } = useSelector((state) => state.profile);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useOnClickOutside(ref, () => setOpen(false));

    if (!user) return null;

    const handleLogout = () => {
        dispatch(logout(navigate));
        setOpen(false);
    };

    return (
        <div ref={ref} className="relative">
            {/* Profile Button */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-x-1"
            >
                <img
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[30px] rounded-full object-cover"
                />

                <AiOutlineCaretDown className="text-sm text-richblack-100" />
            </button>

            {/* Dropdown Menu */}
            {open && (
                <div
                    className="absolute right-0 top-[118%] z-[1000]
                    overflow-hidden rounded-md border border-richblack-700
                    bg-richblack-800 divide-y divide-richblack-700"
                >
                    {/* Dashboard */}
                    <Link
                        to="/dashboard/my-profile"
                        onClick={() => setOpen(false)}
                        className="flex w-full items-center gap-x-2
                        px-3 py-2.5 text-sm text-richblack-100
                        hover:bg-richblack-700 hover:text-richblack-25"
                    >
                        <VscDashboard className="text-lg" />
                        Dashboard
                    </Link>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-x-2
                        px-3 py-2.5 text-sm text-richblack-100
                        hover:bg-richblack-700 hover:text-richblack-25"
                    >
                        <VscSignOut className="text-lg" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

//e.propogation() means:When this element is clicked, stop that click from
//  reaching its parent elements., this is used bcoz it helps us not to open the entire profile and opens only the modal that we need