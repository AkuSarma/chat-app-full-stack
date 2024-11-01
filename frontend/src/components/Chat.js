import UserContext from "../UserContext";
import { useContext, useState} from "react";
import ScrollToBottom from "react-scroll-to-bottom";


const Chat = ({currentChat, updateChat, socket}) => {

    const {loggedInUser} = useContext(UserContext);

    const [messageInput, setMessageInput] = useState("");

    const handleMessageChange = (event) => {
        setMessageInput(event.target.value);
    }

    const sendMessage = async (event) => {
        event.preventDefault();
        const params = {
            message: messageInput,
            user_id: loggedInUser._id, 
            chat_id: currentChat._id,
            created: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()  
        }
        await socket.emit("send_message", params);
        setMessageInput("");
    }

    const findUsername = () => {
        const chatUser = currentChat.users[0]._id === loggedInUser._id ? currentChat.users[1].username : currentChat.users[0].username;
        return chatUser
    }

    socket.on("receive_message", (message) => {
        updateChat(message);
    })

    return (
      <div className="flex flex-col h-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <header className="p-4 bg-blue-600 text-white font-bold text-center">
          <h2>{findUsername()}</h2>
        </header>

        <ScrollToBottom className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          <div className="space-y-3">
            {currentChat.messages.map((message, index) => {
              const isUserMessage = loggedInUser._id === message.user;
              return (
                <div
                  key={index}
                  className={`flex ${
                    isUserMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`${
                      isUserMessage ? "bg-blue-500 text-white" : "bg-gray-300"
                    } rounded-lg p-2 max-w-xs break-words`}
                  >
                    <p>{message.message}</p>
                    <p className="text-xs mt-1 text-right opacity-70">
                      {isUserMessage ? "You" : findUsername()} •{" "}
                      {message.created}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollToBottom>

        <form
          id="message-input"
          className="flex items-center p-3 border-t border-gray-300 bg-white"
          onSubmit={sendMessage}
        >
          <input
            type="text"
            placeholder="Type message..."
            onChange={handleMessageChange}
            value={messageInput}
            className="flex-1 p-2 mr-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            &#9658;
          </button>
        </form>
      </div>
    );

}

export default Chat;