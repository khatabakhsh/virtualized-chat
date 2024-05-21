"use client";

import { Contact } from "@/apis/chat/contacts/get/getContactsApi.types";
import { useGetContactsApi } from "@/apis/chat/contacts/get/useGetContactsApi";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/cn";
import { setInCookie } from "@/utils/cookies";
import { useEffect, useState } from "react";
import { Sidebar } from "../shared/sidebar";
import { Chat } from "./chat";

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
  navCollapsedSize,
}: ChatLayoutProps) {
  const contactsQuery = useGetContactsApi();

  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [selectedUser, setSelectedUser] = useState<Contact>();

  useEffect(() => {
    contactsQuery.isSuccess && setSelectedUser(contactsQuery.data?.data?.[0]);
  }, [contactsQuery.isSuccess]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        setInCookie("react-resizable-panels:layout", sizes);
      }}
      className="h-full items-stretch"
    >
      {contactsQuery.data?.data && selectedUser ? (
        <>
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            collapsible={true}
            minSize={isMobile ? 0 : 24}
            maxSize={isMobile ? 8 : 30}
            onCollapse={() => {
              setIsCollapsed(true);
              setInCookie("react-resizable-panels:collapsed", true);
            }}
            onExpand={() => {
              setIsCollapsed(false);
              setInCookie("react-resizable-panels:collapsed", false);
            }}
            className={cn(
              isCollapsed &&
                "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
            )}
          >
            <Sidebar
              isCollapsed={isCollapsed || isMobile}
              links={contactsQuery.data?.data?.map((user) => ({
                name: user.name,
                messages: user.messages ?? [],
                avatar: user.avatar,
                variant: selectedUser?.name === user.name ? "grey" : "ghost",
                onClick: () => setSelectedUser(user),
              }))}
              isMobile={isMobile}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            <Chat
              messages={selectedUser?.messages}
              selectedUser={selectedUser}
              isMobile={isMobile}
            />
          </ResizablePanel>
        </>
      ) : (
        <Skeleton className="w-full h-full" />
      )}
    </ResizablePanelGroup>
  );
}
