import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  const apiUrl = "https://jsonplaceholder.typicode.com/users";

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(apiUrl);
        setUsers(response.data);
      } catch (error) {
        setError("Failed to fetch users.");
      }
    };
    fetchUsers();
  }, []);

  // Add or Edit user
  const saveUser = async (user) => {
    try {
      if (user.id) {
        // Edit user
        await axios.put(`${apiUrl}/${user.id}`, user);
        setUsers(users.map((u) => (u.id === user.id ? user : u)));
      } else {
        // Add user
        const response = await axios.post(apiUrl, user);
        setUsers([...users, { ...user, id: response.data.id }]);
      }
      setCurrentUser(null);
    } catch (error) {
      setError("Failed to save user.");
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      setError("Failed to delete user.");
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <UserList
        users={users}
        onEdit={(user) => setCurrentUser(user)}
        onDelete={deleteUser}
      />
      {currentUser && (
        <UserForm
          user={currentUser}
          onSave={saveUser}
          onCancel={() => setCurrentUser(null)}
        />
      )}
    </div>
  );
};

export default App;
