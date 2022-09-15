import { useUserData } from "./slice/globalStates"
import create from 'zustand'

const useStore1 = create(set => ({
    ...useUserData(set),
    
}))

export default useStore1