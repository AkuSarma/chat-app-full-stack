const FriendsList = ({friends, filteredChats, currentFriendChat, deleteFriend}) => {

    const handleClick = friend => {
        deleteFriend(friend)
    }
    // return chat between the logged in user and the clicked friend 
// for each friend of the logged in user, 
    const friendsList = friends.map((friend) => {
      const chat = filteredChats.find((chat) => {
        return chat.users.findIndex((user) => user._id === friend._id) !== -1;
      });

      return (
        <li
          key={friend._id}
          className="flex justify-between items-center p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200 shadow-sm mb-2"
        >
          <p
            onClick={() => currentFriendChat(chat)}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            {friend.username}
          </p>
          <button
            onClick={() => handleClick(friend)}
            className="text-red-500 hover:text-red-700 text-lg transition-colors duration-200"
          >
            &#128465;
          </button>
        </li>
      );
    });

    return (
      <div id="friends-list-div" className="bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-gray-700 font-bold text-lg mb-4">Friends</h3>
        <div className="friends-list-container">
          <ul className="friends-list space-y-2">{friendsList}</ul>
        </div>
      </div>
    );


}

export default FriendsList;