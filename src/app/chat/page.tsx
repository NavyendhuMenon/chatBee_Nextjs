"use client";

import { useEffect, useState } from "react";
import Header from "@/components/HeaderBox";
import ChatBox from "@/components/ChatBox";
import UserList from "@/components/UserList";
import ProfileModal from "@/components/ProfileModal";

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showUserList = !isMobile || (isMobile && !selectedUser);
  const showChatBox = !isMobile || (isMobile && selectedUser);

  return (
    <>
      <Header onProfileClick={() => setShowProfile(true)}>
        <div className="h-full flex flex-col md:flex-row md:gap-x-4 p-2 md:p-4">
          {showUserList && (
            <div className="w-full md:w-2/8 bg-white rounded-lg shadow-md">
              <UserList setSelectedUser={setSelectedUser} />
            </div>
          )}
          {showChatBox && selectedUser && (
            <div className="flex-1 bg-white rounded-lg shadow-md">
              <ChatBox
                user={selectedUser}
                setSelectedUser={setSelectedUser}
                isMobile={isMobile}
              />
            </div>
          )}
        </div>
      </Header>

      {/* Modal Overlay */}
      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
    </>
  );
}
