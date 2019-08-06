import React from 'react'
import Message from './Message'
import ReactDOM from 'react-dom'


class MessageList extends React.Component {

    componentWillUpdate()
    {
        const node = ReactDOM.findDOMNode(this);
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
    }

    componentDidUpdate()
    {
        if(this.shouldScrollToBottom){
        const node = ReactDOM.findDOMNode(this);
        node.scrollTop = node.scrollHeight;
        }
    }

    render() {
        if(!this.props.roomId){
            return(
                <div className="message-list">
                    <div className="join-room">
                        &larr; Join a room!
                    </div>
                </div>
            )
        }
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