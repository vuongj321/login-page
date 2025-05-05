import React, { useState } from 'react';

const UserList = ({ users, onUpdate, onDelete }) => {
    // contains which user is being edited
    const [isEditing, setIsEditing] = useState(null);
    // contains edited user data
    const [editedUser, setEditedUser] = useState({ name: '', email: '', password: ''});

    // enable editing and fill current data
    const handleEdit = (user) => {
        setIsEditing(user._id);
        console.log('id: ', user._id);
        setEditedUser({ name: user.name, email: user.email, password: user.password});
    };

    // update data and disable editing
    const handleSave = (userId) => {
        // console.log('id: ', userId);
        // console.log('id: ', isEditing);
        // console.log('updated user: ', editedUser);
        onUpdate(userId, editedUser);
        setIsEditing(null);
    };

    // cancel button
    const handleCancel = () => {
        setIsEditing(null);
    }
    
    return (
        <div>
            <h2>All Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {isEditing === user._id ? (
                            <div>
                                <input 
                                    type= "text"
                                    value={editedUser.name}
                                    onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value})}
                                />
                                <input 
                                    type= "text"
                                    value={editedUser.email}
                                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value})}
                                />
                                <input 
                                    type= "text"
                                    value={editedUser.password}
                                    onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value})}
                                />
                                <button onClick={() => handleSave(user._id)}>Save</button>
                                <button onClick={() => handleCancel()}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <strong>Name: {user.name}</strong>
                                <p>Email: {user.email}</p>
                                <p>Password: {user.password}</p>
                                <button onClick={() => handleEdit(user)}>Update</button>
                                <button onClick={() => onDelete(user._id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;