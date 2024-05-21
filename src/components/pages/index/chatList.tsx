"use client";
import {
  Contact,
  ContactMessage,
} from "@/apis/chat/contacts/get/getContactsApi.types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/utils/cn";
import { useEffect, useRef } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import ChatBottombar from "./chatBottombar";
interface ChatListProps {
  messages: ContactMessage[];
  selectedUser: Contact;
  sendMessage: (newMessage: ContactMessage) => void;
  isMobile: boolean;
}

export function ChatList({
  messages,
  selectedUser,
  sendMessage,
  isMobile,
}: ChatListProps) {
  const virtuosoRef = useRef<VirtuosoHandle>(null);

  useEffect(() => {
    if (virtuosoRef.current) {
      setTimeout(() => {
        virtuosoRef.current?.scrollToIndex?.({
          index: (messages?.length || 1) - 1,
        });
      }, 10);
    }
  }, [messages, virtuosoRef]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
        <Virtuoso
          totalCount={messages?.length}
          ref={virtuosoRef}
          itemContent={(index) => {
            const item = messages?.[index];
            return (
              <div
                key={index}
                className={cn(
                  "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                  item?.name !== selectedUser?.name
                    ? "items-end"
                    : "items-start"
                )}
              >
                <div className="flex gap-3 items-center">
                  {item?.name === selectedUser?.name && (
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={item.avatar}
                        alt={item.name}
                        width={6}
                        height={6}
                      />
                    </Avatar>
                  )}
                  <span className=" bg-accent p-3 rounded-md max-w-xs">
                    {item?.message}
                  </span>
                  {item?.name !== selectedUser?.name && (
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={item?.avatar}
                        alt={item?.name}
                        width={6}
                        height={6}
                      />
                    </Avatar>
                  )}
                </div>
              </div>
            );
          }}
        />
      </div>
      <ChatBottombar sendMessage={sendMessage} isMobile={isMobile} />
    </div>
  );
}
