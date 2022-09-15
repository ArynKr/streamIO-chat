

export const useUserData = (set) => ({
  userId:null,
  userName:null,
  setUserId: (payload) => set(() => {return ({userId:payload})}),
  setUserName: (payload) => set(() => {return ({userName:payload})}),
  
})


