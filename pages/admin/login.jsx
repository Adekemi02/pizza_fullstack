import React, {useState} from 'react';
import axios from 'axios';

import styles from '@/styles/Login.module.css'



const login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  


  const handleClick = async () => {
    try {
      await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      router.push("/admin");

    } catch (err) {
      setError(true);
    }
  };

  return (

    <div className={styles.container}>
      <div >
        <h1 className="text-center font-semibold text-xl mb-3">Admin Dashboard</h1>
        
        <div className={styles.wrapper}>
          <input
            placeholder="username"
            className={styles.input}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            placeholder="password"
            type="password"
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleClick} className={styles.button}>
            Sign In
          </button>
        </div>
        

        

        

        {error && <span className={styles.error}>Wrong Credentials!</span>}
      </div>
    </div>
  );
  
}

export default login;