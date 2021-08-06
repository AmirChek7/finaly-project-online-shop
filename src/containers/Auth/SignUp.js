import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { clientContext } from '../../contexts/ClientContext';

const SignUp = () => {
    const { registerUser } = useContext(clientContext)
    const history = useHistory()
    const [newUser, setNewUser] = useState({
        email: '',
        password: ''
    })
    const handleInput = (e) => {
        let obj = {
            ...newUser,
            [e.target.name]: e.target.value
        }
        setNewUser(obj)
    }
    const handleClick = () => {
        console.log(newUser)
        registerUser(newUser, history)
    }

    return (
        <div>
            <input onChange={handleInput} name="email" type="text" />
            <input onChange={handleInput} name="password" type="password" />
            <button onClick={handleClick}>Зарегистрироваться</button>
        </div>
    );
};

export default SignUp;