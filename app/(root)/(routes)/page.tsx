"use client";

import { useTeamModal } from "@/hook/useTeamModal";
import { useEffect } from "react";

const SetupPage = () => {
  const onOpen = useTeamModal((state) => state.onOpen);
  const isOpen = useTeamModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default SetupPage;
