"use Client";

import { setSelectedUser } from "@/redux/slices/selectedUserSlices";
import { AppDispatch, RootState } from "@/redux/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../hooks/useSocket";
import socket from "@/utils/socket";

interface ChatBoxProps {
  isMobile: boolean;
}

export default function ChatBox({ isMobile }: ChatBoxProps) {
  const { data: session } = useSession();

  const selectedUser = useSelector(
    (state: RootState) => state.selectedUser.selectedUser
  );


  const dispatch = useDispatch<AppDispatch>();

  const [message, setMessage] = useState("");

  const userId = session?.user?.id;

  useSocket("userId")

  if (!selectedUser) return null;

  const handleSend = (e:React.FormEvent)=>{
    e.preventDefault()

    if (!message.trim()) return

    socket.emit ("private-message",{

      sender : userId,
      receiver : selectedUser._id,
      message : message,
      chatId : selectedUser._id
    })
  }




  return (
    <div className="flex flex-col h-full bg-gray-100 rounded-xl shadow-md overflow-hidden">
      <div className="p-4 bg-white shadow text-[var(--color-primary)] font-bold text-lg flex items-center gap-3 rounded-t-xl">
        {isMobile && (
          <button
            onClick={() => dispatch(setSelectedUser(null))}
            className="text-[var(--color-primary)]"
          >
            <HiArrowLeft className="text-xl" />
          </button>
        )}

        <div className="w-8 h-8 relative rounded-full overflow-hidden">
          <Image
            src={`versel.svg`}
            alt={selectedUser.name}
            fill
            sizes="32px"
            className="object-cover"
          />
        </div>

        <span>{selectedUser.name}</span>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
        {/* <div className="max-w-[60%] bg-white p-3 rounded-lg shadow text-sm text-gray-800">
          Hello {selectedUser.name}!
        </div>
        <div className="max-w-[60%] bg-[var(--color-primary)] text-white p-3 rounded-lg shadow text-sm ml-auto">
          Hi! How are you?
        </div> */}
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white shadow flex items-center gap-2 rounded-b-xl">
        <input
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
        <button
          type="submit"
          className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all font-semibold"
        >
          Send
        </button>
      </form>
    </div>
  );
}
