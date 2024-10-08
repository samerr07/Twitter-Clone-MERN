
import React, { useState } from "react";
import useUpdateUser from "../hooks/useUpdateUser";
import { useDispatch } from "react-redux";
import { getRefresh } from "../redux/tweetSllice";

const EditProfileModal = () => {
    const [formData, setFormData] = useState({
        name: "",
        userName: "",
        email: "",
        bio: "",
    });
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const updateUser = useUpdateUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser(formData);
        dispatch(getRefresh())
        document.getElementById("edit_profile_modal").close(); // Close the modal after updating
    };

    return (
        <>
            <button
                className="btn btn-outline rounded-full btn-sm"
                onClick={() => document.getElementById("edit_profile_modal").showModal()}
            >
                Edit profile
            </button>
            <dialog id="edit_profile_modal" className="modal">
                <div className="modal-box border rounded-md border-gray-700 shadow-md">
                    <h3 className="font-bold text-lg my-3">Update Profile</h3>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap gap-2">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                                value={formData.name}
                                name="name"
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                                value={formData.userName}
                                name="userName"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <input
                                type="email"
                                placeholder="Email"
                                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                                value={formData.email}
                                name="email"
                                onChange={handleInputChange}
                            />
                            <textarea
                                placeholder="Bio"
                                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                                value={formData.bio}
                                name="bio"
                                onChange={handleInputChange}
                            />
                        </div>
                        <button className="btn btn-primary rounded-full btn-sm text-white">
                            Update
                        </button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button className="outline-none">Close</button>
                </form>
            </dialog>
        </>
    );
};

export default EditProfileModal;
