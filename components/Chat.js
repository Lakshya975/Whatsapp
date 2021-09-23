import { Avatar } from "@mui/material"
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail"
import {useRouter} from "next/router"

function Chat({id,users}) {
    const router = useRouter()
    const [recipientSnapshot] = useCollection(db.collection('users').where('email','==',getRecipientEmail(users,user)));
    const [user]= useAuthState(auth);
    const recipient = recipientSnapshot?.docs?.[0]?.data();
	const recipientEmail = getRecipientEmail(users, user);
    const enterChat = () =>{
        router.push(`/chat/${id}`)
    }
    return (
        <div onClick={enterChat} className="flex items-center p-4 break-words cursor-pointer hover:bg-gray-200">
            {recipient ? (
					<Avatar src={recipient?.photoURL} className="m-1 mr-1" />
				) : (
					<Avatar className="m-1 mr-1">{recipientEmail[0]}</Avatar>
				)}

            <p>{recipientEmail}</p>
        </div>
    )
}

export default Chat
