import { useState, useEffect, useContext } from "react";
import FriendsList from "../components/FriendsList";
import Chat from "../components/Chat";
import Search from "../components/Search";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";

const ChatContainer = ({socket, fetchChats}) => {

    const [friends, setFriends] = useState([]);
    const {loggedInUser, setLoggedInUser, chats, users} = useContext(UserContext);

    const navigate = useNavigate()
    
    const [currentChat, setCurrentChat] = useState({
        users: [],
        messages: []
    });
    const [isDelete, setIsDelete] = useState(false)

// return array of chats containing the logged in user
    const filteredChats = chats.filter(chat => {
        return chat.users.findIndex(user => user._id === loggedInUser._id) !== -1
    })

    const addFriend = async (friend) => {
        const response = await fetch(`http://localhost:4000/addfriend/${loggedInUser._id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(friend)
        })
        const friendData = await response.json();
        if(friendData && friendData.message) return
        setLoggedInUser(friendData);
        setFriends(friendData.friends)
        const params = {
            user1_id: loggedInUser._id,
            user2_id: friend._id
        }
        socket.emit("create_chat", params)
        fetchChats()
        setIsDelete(false)
    }

    const deleteFriend = async (friend) => {
        const response = await fetch(`http://localhost:4000/deletefriend/${loggedInUser._id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(friend)
        })
        const updatedUser = await response.json();
        setLoggedInUser(updatedUser);
        setFriends(updatedUser.friends)
        deleteChat(friend)
        fetchChats()
        setIsDelete(true)
    }

    const deleteChat = async friend => {
        const chat = filteredChats.find(chat => {
            return chat.users.findIndex(user => user._id === friend._id) !== -1
        })
        await fetch(`http://localhost:4000/chat/${chat._id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        })
    }

    useEffect (() => {
         setFriends(loggedInUser.friends);
    }, [loggedInUser.friends])

    useEffect(() => {
        fetchChats()
    }, [loggedInUser.friends.length, currentChat.messages])
    
    const currentFriendChat = (friendChat) => {
        if(chats.findIndex(chat => chat._id === friendChat._id) !== -1){
            setIsDelete(false)
            setCurrentChat(friendChat);
            socket.emit("join_chat", friendChat._id);
        }
    }

    useEffect(() => {
        if(isDelete){
            setCurrentChat({
                users: [],
                messages: []
            })
        }
    },[isDelete])

    const filteredFriends = searchedUser => {
        setFriends(searchedUser)
    }

    const logOut = () => {
        setLoggedInUser()
        navigate('/')
    }

    const updateChat = (message) => {
        if(currentChat.messages.findIndex(currentMessage => currentMessage._id === message._id) === -1) {
            const updatedChat = {...currentChat};
            updatedChat.messages.push(message);
            setCurrentChat(updatedChat)
        }
    }

    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 min-w-[80vw]">
        <header className="w-full max-w-5xl bg-white rounded-lg shadow p-4 flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-600">You are logged in as:</p>
            <p className="font-semibold text-xl">{loggedInUser.username}</p>
          </div>
          <button
            onClick={logOut}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        <main className="w-full max-w-5xl bg-white rounded-lg shadow flex">
          <section className="w-1/3 border-r border-gray-200 p-4 flex flex-col">
            <Search filteredFun={filteredFriends} addFriend={addFriend} />
            <FriendsList
              friends={friends}
              filteredChats={filteredChats}
              currentFriendChat={currentFriendChat}
              deleteFriend={deleteFriend}
            />
          </section>

          <section className="w-2/3 p-4">
            {currentChat && currentChat.users.length > 0 ? (
              <Chat
                socket={socket}
                currentChat={currentChat}
                updateChat={updateChat}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a chat to start messaging
              </div>
            )}
          </section>
        </main>
      </div>
    );
}

export default ChatContainer;
