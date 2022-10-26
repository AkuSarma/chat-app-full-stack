import { useContext } from "react";
import UserContext from "../UserContext";
import "./FriendsList.css"

const FriendsList = ({friends, filteredChats, currentFriendChat, deleteFriend}) => {

    const {users, loggedInUser} = useContext(UserContext);
   // filteredFriends returns array of arrays of logged in users friends as objects
    // const filteredFriends = users.map(user => {
    //     return friends.map(friend => {
    //         if (friend === user._id) {
    //             return user;
                
    //         }
    //     })
    // })
//     const filteredFriends = users.filter(user => {
// return friends.findIndex(friendId => friendId === user._id)
//     })

    // console.log('here', filteredFriends)
    // friends.map(friend => {

    // })

    const handleClick = friend => {
        deleteFriend(friend)
    }
//map through filteredChats, an array of chats containing logged in user

// 

    const friendsList = loggedInUser.friends.map(friend => {
        // console.log('hey im hereeees', filteredChats)

        // const friendChat = filteredChats.find(chat => {
        //     if(friend && (chat.users[0] === friend._id || chat.users[1] === friend._id)) {
        //         return chat;
        //     }
        // })
        const chat = filteredChats.find(chat => {
            return chat.users.findIndex(user => user._id === friend._id) !== -1
        })
        
    
        if (friend) {
            return (
            <li key={friend._id} onClick={() => currentFriendChat(chat)}>
                <p>{friend.username}</p>
                <button onClick={() => handleClick(friend)}>Delete Friend</button>
            </li>);
        }
    });
        
    // const friendChat = filteredChats.map(chat => chat.users[0] || chat.users[1] === friend)
        
        

    return (
        <div className="friends-list-container">
            <ul className="friends-list">{friendsList}</ul>
        </div>
    );

}

export default FriendsList;