import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './Chat.css';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';

// import { doc, onSnapshot, getDoc } from 'firebase/firestore';


function Chat() {


  
  const[seed, setSeed] = useState("");
  const[input, setInput] = useState("");
  const {roomsId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [{user}, dispatch] = useStateValue();
 


  // useEffect(()=>{
  //   // if (roomId){
  //   //   db.collection("rooms")
  //   //     .doc(roomId)
  //   //     .onSnapshot((snapshot)=> setRoomName
  //   //     (snapshot.data().name));

  //   //     console.log("Hello room ",roomName);
  //   //  }
  //   if(roomId){
  //     db.collection('rooms').doc(roomId).onSnapshot((snapshot)=> setRoomName(snapshot.data().name));
  //   }
  // }, [roomId]);

  const[messages, setMessages]= useState([]); 

  useEffect(()=>{
      if(roomsId){
        db.collection('rooms').doc(roomsId).onSnapshot((snapshot)=>{
          setRoomName(snapshot.data().name)
        })
      
        db.collection('rooms')
        .doc(roomsId)
        .collection('messages')
        .orderBy('timestamp','asc')
        .onSnapshot((snapshot)=>
         setMessages(snapshot.docs.map((doc)=>
         doc.data()))
        );
      }else{
        console.log("Else part")
      }
  },[roomsId])

  useEffect(()=>{
    setSeed(Math.floor(Math.random()*5000));
  },[])

  const sendMessage = (e) => {
        e.preventDefault();
        console.log("you typed ", input);
        db.collection('rooms').doc(roomsId).collection('messages').add({
          message: input,
          name: user.displayName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");

  }

  return (
    <div className='chat'>
        <div className='chat__header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

          <div className='chat__headerInfo'>
              <h3>{roomName}</h3>
              <p>Last seen{"  "}
              { new Date(
                messages[messages.length-1]?.
                timestamp?.toDate()
              ).toUTCString()}
              </p>
          </div>
          <div className='chat__headerRight'>
              <IconButton>
                 <SearchIcon />
              </IconButton>
              <IconButton>
                  <AttachFileIcon />
              </IconButton>
              <IconButton>
                  <MoreVertIcon />
              </IconButton>
          </div>
        </div>
        <div className='chat__body'>
          {messages.map((message)=>(
           <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
           <span className='chat__name'>
               {message.name}
           </span>
           {message.message}
           <span className='chat__timestamp'>
               {new Date(message.timestamp?.toDate()).toUTCString()}
           </span>
           </p>
          ))}
 
        </div>
        <div className='chat__footer'>
              <InsertEmoticonIcon />
              <form>
                <input value={input} onChange={(e)=>setInput(
                  e.target.value
                )} placeholder='  Type a message' type='text' />
                <button onClick={sendMessage} type="submit">Send a message</button>
              </form>
              <KeyboardVoiceIcon/>
        </div>
    </div>
  )
}

export default Chat;