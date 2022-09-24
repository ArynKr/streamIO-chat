export const useUserData = (set) => ({
  userId: null,
  userName: null,
  showChannelList: true,
  activeChannel: null,
  showChatModal: false,
  isReplying:false,

  setShowChatModal: (payload) => set(() => ({ showChatModal: payload })),
  setUserId: (payload) => set(() => ({ userId: payload })),
  setUserName: (payload) => set(() => ({ userName: payload })),
  setShowChannelList: (payload) =>
    set((state) => ({ showChannelList: payload })),
  setActiveChannel: (payload) => set(() => ({ activeChannel: payload })),
  setIsReplying:(payload)=>set(()=>({isReplying:payload}))
});
