import { Avatar, IconButton, Input } from "@mui/material";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { auth, db } from "../firebase";
import {useCollection} from "react-firebase-hooks/firestore"
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import Message from "./Message";
import { useState,useRef } from "react";
import firebase from 'firebase';
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from 'timeago-react';

function Chatscreen({chat,messages}) {
    const [user] = useAuthState(auth);
    const [input,setInput] = useState('');
	const endOfMessageRef = useRef(null);
    const router = useRouter();
    const [messagesSnapshot] = useCollection(
		db
			.collection('chats')
			.doc(router.query.id)
			.collection('messages')
			.orderBy('timestamp', 'asc')
	);
	const [recipientSnapshot] = useCollection(
		db
			.collection('users')
			.where('email', '==', getRecipientEmail(chat.users, user))
	);
    const showMessages = () => {
		if (messagesSnapshot) {
			console.log('this messchapshot', messagesSnapshot.docs);
			return messagesSnapshot.docs.map((message) => (
				<Message
					key={message.id}
					user={message.data().user}
					message={{
						...message.data(),
						timestamp: message.data().timestamp?.toDate().getTime(),
					}}
				/>
			));
		} else {
			return JSON.parse(messages).map((message) => (
				<Message key={message.id} user={message.user} message={message} />
			));
		}
	};
	const scrollToBottom = () =>{
		endOfMessageRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	}

    const sendMessage = (e) => {
		e.preventDefault();
		//Update the last seen
		db.collection('users').doc(user.uid).set(
			{
				lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
			},
			{ merge: true }
		);
		db.collection('chats').doc(router.query.id).collection('messages').add({
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			message: input,
			user: user.email,
			photoURL: user.photoURL,
		});

		setInput('');
		scrollToBottom()
	};
	const recipientEmail = getRecipientEmail(chat.users, user);
	const recipient = recipientSnapshot?.docs?.[0]?.data();
    return (
        <div>
            <div className="Header sticky bg-white z-50 top-0 flex p-3 h-20 items-center border-b border-gray-100">
			{recipient ? (
					<Avatar src={recipient?.photoURL} />
				) : (
					<Avatar>{recipientEmail[0]}</Avatar>
				)}
                <div className="header-info ml-4 flex-1">
                    <h3 className="mb-1">{recipientEmail}</h3>
                    {recipientSnapshot ? (
						<p>
							Last active:{' '}
							{recipient?.lastSeen?.toDate() ? (
								<TimeAgo datetime={recipient?.lastSeen?.toDate()} />
							) : (
								'Unavailable'
							)}
						</p>
					) : (
						<p>Loading last active...</p>
					)}
                    </div>
                <div className="header-icon">
                        <IconButton>
                            <AttachFileIcon/>
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon/>
                        </IconButton>
                </div>
            </div>
            <div className="message container p-7 bg-gray-400 min-h-screen">
				{showMessages()}
                <div ref={endOfMessageRef} className="end of message mb-12"/>
            </div>
            <form className="flex items-center sticky p-3 bottom-0 bg-white z-50">
                <InsertEmoticonIcon/>
                <input value={input} onChange={(e)=>setInput(e.target.value)} className="flex-1 items-center p-1 sticky bottom-0 bg-gray-200 border-none outline-none ml-4 mr-4 rounded-lg"/>
                <button hidden disabled={!input} type='submit' onClick={sendMessage}>Send</button>
                <MicIcon/>
            </form>
        </div>
    )
}

export default Chatscreen
