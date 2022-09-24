import { ModalWrapper } from "../components/ModalWrapper"

export const ReplyContainer = ({message,setShowReplyModal}) =>{
    return(
   <ModalWrapper>
   <button onClick={()=>setShowReplyModal(false)}/>
   </ModalWrapper>
    )

}