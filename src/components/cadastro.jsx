// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [password, setPassword] = useState('');


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://nodeandexpress-nz44.onrender.com/user', {
        name: name,
        email: email,
        password: password

      });

      setEmail("");
      setName("");
      setPassword("");
      setAlertMessage('Novo usuário cadastrado: ' + JSON.stringify(response.data));
      setAlertOpen(true); 
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <button type="submit">Cadastrar</button>
      </form>
      {alertOpen && (
        <Alert severity="success" onClose={handleCloseAlert}>
          {alertMessage}
        </Alert>
      )}
    </div>
  );
};

export default Register;