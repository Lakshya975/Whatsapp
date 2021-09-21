import { Avatar } from "@mui/material"
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail"

function Chat({id,users}) {
    const [user]= useAuthState(auth);
    const [recipentSnapshot] = useCollection(
        db.collection("users").where("email","==",getRecipientEmail(users,user))
    );
    const recipentEmail = getRecipientEmail(users,user)
    const
    return (
        <div className="flex items-center p-4 break-words cursor-pointer hover:bg-gray-200">
            <Avatar className="m-1 mr-1"/>
            <p>{recipentEmail}</p>
        </div>
    )
}

export default Chat
