import {
  Contact,
  ContactMessage,
} from "@/apis/chat/contacts/get/getContactsApi.types";
import { useEffect, useState } from "react";
import { ChatList } from "./chatList";
import ChatTopbar from "./chatTopbar";

interface ChatProps {
  messages: ContactMessage[];
  selectedUser: Contact;
  isMobile: boolean;
}

export function Chat({ messages, selectedUser, isMobile }: ChatProps) {
  const [messagesState, setMessagesState] =
    useState<ContactMessage[]>(messages);

  useEffect(() => {
    setMessagesState(messages ?? []);
  }, [messages]);

  const sendMessage = (newMessage: ContactMessage) => {
    setMessagesState([...messagesState, newMessage]);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedUser={selectedUser} />
      <ChatList
        messages={messagesState}
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
