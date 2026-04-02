import React, { useContext, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../../context/ChatContext";

const HomePage = () => {
  const { selectedUser, setSelectedUser } = useContext(ChatContext);

  useEffect(() => {
    setSelectedUser(null);
  }, []);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative px-4 sm:px-[8%] py-[3%]">

      {/* 🔥 Purple Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#6b4bff]/40 blur-[180px] rounded-full opacity-70"></div>

      {/* Main Card */}
      <div
        className={`relative z-10 h-full w-full max-w-7xl backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl overflow-hidden grid grid-cols-1 
        ${selectedUser ? "md:grid-cols-[1fr_1.5fr_1fr]" : "md:grid-cols-2"}`}
      >
        <Sidebar />
        <ChatContainer />
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;
