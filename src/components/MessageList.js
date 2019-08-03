import React from 'react'
import Message from './Message'


class MessageList extends React.Component {
    render() {
        return (
            <div className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                        <div className="message" >
                            <Message key={index} username={message.senderId} text={message.parts[0].payload.content}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default MessageList