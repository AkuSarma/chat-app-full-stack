import { useContext, useState } from "react";
import UserContext from "../UserContext";
import { Autocomplete, TextField } from "@mui/material";

const Search = ({ filteredFun, addFriend }) => {
  const { loggedInUser, users } = useContext(UserContext);
  const [searchedUser, setSearchedUser] = useState([]);
  const [isFriend, setIsFriend] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const optionsObjectArr = users.filter(
    (user) =>
      user.username &&
      loggedInUser &&
      user.username.toLowerCase() !== loggedInUser.username.toLowerCase()
  );

  const options = optionsObjectArr.map((user) => user.username);

  const filteredUser = () => {
    const foundUser = users.find((user) => {
      if (
        user.username &&
        inputValue &&
        user.username.toLowerCase() === inputValue.toLowerCase()
      ) {
        setSearchedUser(user);
        return user;
      } else {
        return null;
      }
    });
    return foundUser;
  };

  const filteredFriends = (username) => {
    return loggedInUser.friends.find((friend) => {
      if (
        friend.username &&
        username &&
        friend.username.toLowerCase() === username.toLowerCase()
      ) {
        setSearchedUser(friend);
        return friend;
      } else {
        return null;
      }
    });
  };

  const isFindFriend = () => {
    return loggedInUser.friends.find((friend) => {
      const isFind = users.find((user) => {
        if (user._id === friend._id && user.username) {
          return user.username.toLowerCase() === inputValue.toLowerCase();
        } else {
          return false;
        }
      });
      setIsFriend(isFind);
      return isFind;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue === "") filteredFun(loggedInUser.friends);
    const friend = filteredFriends(inputValue);
    if (isFindFriend() && friend) {
      filteredFun([friend]);
    }
    setInputValue("");
  };

  const handleClickToAddFriend = () => {
    if (!isFindFriend()) {
      const user = filteredUser();
      if (user) {
        addFriend(user);
      }
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md space-y-4">
      <Autocomplete
        freeSolo
        disableClearable
        options={options}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search username"
            className="w-full"
            InputProps={{
              ...params.InputProps,
              type: "search",
              className:
                "p-2 text-gray-700 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500",
            }}
          />
        )}
      />
      <div className="flex space-x-4">
        <button
          id="search-btn"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 focus:outline-none"
        >
          🔍
        </button>
        <button
          id="add-btn"
          onClick={handleClickToAddFriend}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200 focus:outline-none"
        >
          ➕
        </button>
      </div>
    </div>
  );
};

export default Search;
