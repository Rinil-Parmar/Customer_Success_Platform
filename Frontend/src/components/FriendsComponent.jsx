import React, { useState, useEffect } from "react";

function FriendsComponent() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/friends/") // Assuming the API endpoint is at /friends.json
      .then((response) => response.json())
      .then((data) => setFriends(data))
      .catch((error) => console.error("Error fetching friends:", error));
  }, []);

  return (
    <div>
      <h1>List of Friends</h1>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            <strong>
              {friend.first_name} {friend.last_name}
            </strong>
            <p>Email: {friend.email}</p>
            <p>Phone: {friend.phone}</p>
            <p>Twitter: {friend.twitter}</p>
            <button onClick={() => handleDeleteFriend(friend.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  async function handleDeleteFriend(id) {
    try {
      await fetch(`/friends/${id}`, {
        method: "DELETE",
      });
      setFriends((prevFriends) =>
        prevFriends.filter((friend) => friend.id !== id)
      );
    } catch (error) {
      console.error("Error deleting friend:", error);
    }
  }
}

export default FriendsComponent;
