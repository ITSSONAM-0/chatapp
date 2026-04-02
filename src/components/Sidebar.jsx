import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages } =
    useContext(ChatContext);

  const { logout, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const filtered = input
    ? users.filter((u) => u.fullName?.toLowerCase().includes(input.toLowerCase()))
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <div
      className={`h-full bg-black/20 backdrop-blur-xl border-r border-white/10 px-4 py-5 text-white overflow-y-scroll 
        ${selectedUser ? "max-md:hidden" : ""}`}
    >
      {/* Header */}
      <div className="pb-5">
        <div className="flex justify-between items-center mb-4">
          <img src={assets.logo} className="w-32" />
          <div className="relative group">
            <img src={assets.menu_icon} className="h-5 cursor-pointer" />
            <div className="absolute right-0 top-6 w-36 bg-[#201e33] border border-white/20 text-sm rounded-lg p-3 hidden group-hover:block z-20">
              <p className="cursor-pointer mb-2" onClick={() => navigate("/profile")}>
                Edit Profile
              </p>
              <hr className="border-white/10 my-2" />
              <p className="cursor-pointer" onClick={() => logout()}>
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-[#282142] rounded-full flex items-center px-4 py-3">
          <img src={assets.search_icon} className="w-4 mr-2" />
          <input
            placeholder="Search Users..."
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent w-full outline-none text-white text-sm placeholder-gray-400"
          />
        </div>
      </div>

      {/* User List */}
      <div className="mt-3 flex flex-col gap-2">
        {filtered.map((user) => (
          <div
            key={user._id}
            onClick={() => {
              setSelectedUser(user);
              setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
            }}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition 
              ${selectedUser?._id === user._id ? "bg-white/10" : "hover:bg-white/5"}`}
          >
            <img
              src={user.profilePic || assets.avatar_icon}
              className="w-10 h-10 rounded-full"
            />
            <div className="leading-5">
              <p>{user.fullName}</p>
              {onlineUsers.includes(user._id) ? (
                <span className="text-green-400 text-xs">Online</span>
              ) : (
                <span className="text-gray-400 text-xs">Offline</span>
              )}
            </div>

            {/* Unseen Messages Badge */}
            {unseenMessages[user._id] > 0 && (
              <p className="ml-auto bg-violet-600/60 w-6 h-6 flex items-center justify-center text-xs rounded-full">
                {unseenMessages[user._id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
