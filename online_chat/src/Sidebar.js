import React, { useState,useEffect } from 'react';
import './Sidebar.css';
import SidebarChat from './SidebarChat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import db from './firebase';
import { useStateValue } from './StateProvider';
// import colRef from './firebase'
// import { onSnapshot, collection } from 'firebase/firestore';

function Sidebar() {

  const[rooms,setRooms]=useState([]);
  const [{user}, dispatch] = useStateValue();

  // const unsubscribe = db.collection('rooms');

  useEffect(()=>{

   const unsubscribe= db.collection("rooms").onSnapshot(snapshot=> 
      (
            setRooms(snapshot.docs.map(doc=>
             ({
              id: doc.id,
              data: doc.data(),
            }) 
            ))
      )

    )


return ()=>{
  unsubscribe();
}

  },[])


  return (
    <div className='sidebar'>
        <div className='sidebar__header'>
            <Avatar src={user?.photoURL} />
            <div className='sidebar__headerRight'>
              <IconButton>
              <DonutLargeIcon />
              </IconButton>
              <IconButton>
              <ChatIcon />
              </IconButton>
              <IconButton>
              <MoreVertIcon />
              </IconButton>
            </div>
        </div>

        <div className='sidebar__search'>
          <div className='sidebar__searchContainer'>
            <SearchIcon/>
          <input placeholder='Search or start a new chat' type='text'></input>
          </div>
        </div>

        <div className='sidebar__chats'>
            <SidebarChat addNewChat/>
            {rooms.map(room=>(
                <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
            ))}
        </div>
    </div> 
  )
}

export default Sidebar