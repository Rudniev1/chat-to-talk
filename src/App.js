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
      messages: []
    }
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
        currentUser.subscribeToRoomMultipart({
          roomId: '31264859',
          hooks:
            {
              onMessage: message => {
                this.setState({
                  messages: [...this.state.messages,message]
                })
              } 
            }
        })
        .catch(error => {
          console.log("error: ", error);
        })
    })
  }


  render()
  {
    return (
    <div className="app">
        <RoomList />
        <MessageList messages={this.state.messages}/>
        <SendMessageForm />
        <NewRoomForm />
    </div>
    );
  }

}

export default App;
