import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateUser from './components/CreateUser';
import UserList from './components/UserList';
import './App.css';

const App = () => {
  // creates state:
  // users - current value of state
  // setUsers - function to update state
  const [users, setUsers] = useState([]);

  // loads all users from data base
  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch(error => console.error('Error fetching users: ', error));
  }, []);

  // send create request
  const handleCreateUser = (newUser) => {
    axios.post('http://localhost:5000/users/add', newUser)
      .then(response => {
        // adds new users to existing list
        setUsers([...users, response.data]);
        console.log('User created: ', response.data)
      })
      .catch(error => console.error('Error creating user: ', error));
  };

  // send update request
  const handleUpdateUser = (userId, updatedUser) => {
    axios.put(`http://localhost:5000/users/update/${userId}`, updatedUser)
      .then(response => {
        // update data if id matches
        const updatedUsers = users.map(user => 
          user._id === userId ? { ...user, ...updatedUser } : user
        );
        setUsers(updatedUsers);
        console.log('User updated: ', response.data)
      })
      .catch(error => console.error('Error updating user: ', error));
  };

  // send delete request
  const handleDeleteUser = (userId) => {
    // delete if id matches
    setUsers(users.filter(user => user._id !== userId));
    axios.delete(`http://localhost:5000/users/${userId}`)
      .then(response => console.log('User deleted: ', response.data))
      .catch(error => console.error('Error deleting user: ', error));
  };

  return (
    <div className = "container">
      <CreateUser onCreate={handleCreateUser} />
      <UserList users={users}
        onUpdate={handleUpdateUser}
        onDelete={handleDeleteUser} />
    </div>
  );
};

export default App;