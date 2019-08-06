import React from 'react';
import './App.css';
import Chatkit from '@pusher/chatkit-client';

import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm.js';
import { tokenUrl, instanceLocator } from './config.js';

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
      roomId: null
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom= this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount()
  {
      const tokenProvider = new Chatkit.TokenProvider({
        url: tokenUrl
    });

      const chatManager = new Chatkit.ChatManager({
        instanceLocator,
        userId: 'Rudniev',
        tokenProvider: tokenProvider
    });

      chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser;

        this.getRooms();
      })
      .catch(error =>  console.log("error: ", error)); 
  }


  getRooms()
  {
    this.currentUser.getJoinableRooms()
    .then(joinableRooms => {
      this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
       
    })
    .catch(err => console.log('error on joinableRooms: ',err));
  
  }

  subscribeToRoom(roomId)
  {
    this.setState({messages: []});
    this.currentUser.subscribeToRoomMultipart({
      roomId: roomId,
      hooks:
        {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages,message]
            })
          } 
        }
    }).then(room => {
      this.setState({
        roomId: room.id
      })
      this.getRooms()
    })
    .catch(err => console.log('error on subscribing to room', err))
  }
  

  sendMessage(text)
  {
    this.currentUser.sendMessage(
      {
        text,
        roomId: this.state.roomId
      }
    );
  }

  createRoom(roomName)
  {
    this.currentUser.createRoom({
      //must have the name as a chatkit field
      name: roomName
    })
    .then(room => this.subscribeToRoom(room.id))
    .catch(err => console.log('error with: ',err));
  }

  render()
  {
    return (
    <div className="app">
        <RoomList 
          roomId = {this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
        <MessageList 
          roomId={this.state.roomId}
          messages={this.state.messages} />
        <SendMessageForm 
          disabled={!this.state.roomId}
          sendMessage={this.sendMessage} />
        <NewRoomForm createRoom={this.createRoom} />
    </div>
    );
  }

}

export default App;
