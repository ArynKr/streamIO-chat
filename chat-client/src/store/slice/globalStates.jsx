

export const useUserData = (set) => ({
  userId:null,
  userName:null,
  showChannelList:true,
  setUserId: (payload) => set(() => {return ({userId:payload})}),
  setUserName: (payload) => set(() => {return ({userName:payload})}),
  setShowChannelList:(payload)=>set((state)=>{return ({showChannelList:payload})})
  
})


