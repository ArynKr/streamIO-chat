

export const useUserData = (set) => ({
  userId:null,
  userName:null,
  showChannelList:true,
  activeChannel:null,
  setUserId: (payload) => set(() => {return ({userId:payload})}),
  setUserName: (payload) => set(() => {return ({userName:payload})}),
  setShowChannelList:(payload)=>set((state)=>{return ({showChannelList:payload})}),
  setActiveChannel: (payload) => set(() => {return ({activeChannel:payload})}),

  
})


