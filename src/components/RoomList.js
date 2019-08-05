import React from 'react'

class RoomList extends React.Component {
    render () {
        console.log(this.props.rooms)
        return (
            <div className="rooms-list">
                <h3>Your Rooms: </h3>
               {this.props.rooms.map(room => {
                   return (
                       <ul>
                            <li key="room.id" className="room">
                                <a 
                                    onClick = {() => this.props.subscribeToRoom(room.id)} 
                                    href="#">
                                    # {room.name}
                                </a>
                            </li>
                       </ul>
                   )
               })}
            </div>
        )
    }
}

export default RoomList