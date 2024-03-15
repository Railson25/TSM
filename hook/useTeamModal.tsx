import { create } from "zustand";

interface useTeamModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useTeamModal = create<useTeamModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
