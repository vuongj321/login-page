import React, { useState } from 'react';

const CreateUser = ({ onCreate }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCreate = () => {
        if (!name || !email || !password) {
            alert('Please enter all fields!');
            return;
        }

        const newUser = {
            name: name,
            email: email,
            password: password,
        };

        onCreate(newUser);

        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <div>
            <h2>Create New User</h2>
            <label>Name: </label>
            <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label>Email: </label>
            <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label>Password: </label>
            <input 
                type="text" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button onClick={handleCreate}>Create User</button>  
        </div>
    );
};

export default CreateUser;