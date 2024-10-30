import { useContext, useState } from "react";
import UserContext from "../UserContext";
import { Autocomplete, TextField } from "@mui/material";
import "./Search.css";

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
    <div className="search">
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
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
      <div className="right">
        <button id="search-btn" onClick={handleSubmit} alt="search button">
          🔍
        </button>
        <button
          id="add-btn"
          onClick={handleClickToAddFriend}
          alt="add friend button"
        >
          ➕
        </button>
      </div>
    </div>
  );
};

export default Search;
