import { useState } from "react";
import Chat from "../components/chat";
import ChatsList from "../components/chatslist";
import Container from "../components/Container";
import Nav from "../components/nav";
import Spinner from "../components/ui/spinner";
import { useChats, useProfile } from "../utils/useApi";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import Icon from "../components/icon";

export const getServerSideProps = withPageAuthRequired();

export default function Chats() {
  let { profile, isLoading: isLoad } = useProfile();
  let { chats, isLoading, error } = useChats();
  const [selectedChat, setSelectedChat] = useState(0);

  if (!profile?._id && isLoad) {
    return (
      <div className="loginCard">
        <div className="bg"></div>
        <div className="card">
          <div className="absolute right-4 top-4 hoverShadow rounded-full cursor-pointer boxshadow-2">
            <IoClose size={24} className="pointer-events-none" />
          </div>
          <div className="icon w-full flex justify-center items-center">
            <Icon />
          </div>
          <h4>please Login In</h4>
          <p>You should be logged in for sending messages an saving ads</p>
          <Link
            href="/api/auth/login"
            className="post flex gap-2 items-center justify-center mt-4"
          >
            Login In
          </Link>
        </div>
      </div>
    );
  }
  return (
    <>
      <Nav />
      <Container className="chat flex justify-between items-start max-md:flex-col">
        {chats && (
          <ChatsList
            chats={chats}
            profile={profile}
            setSelected={setSelectedChat}
          />
        )}
        {chats && (
          <Chat selectedChat={selectedChat} profile={profile} chats={chats} />
        )}
      </Container>
    </>
  );
}
