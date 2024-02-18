import React from 'react';
import axios from 'axios';

import styles from '@/styles/Login.module.css'



const login = () => {
  
  


  

  return (

    <div className={styles.container}>
      <div >
        <h1 className="text-center font-semibold text-xl mb-3">Admin Dashboard</h1>
        
        <div className={styles.wrapper}>
          <input
            placeholder="username"
            className={styles.input}
            // onChange={(e) => setUsername(e.target.value)}
          />

          <input
            placeholder="password"
            type="password"
            className={styles.input}
            // onChange={(e) => setPassword(e.target.value)}
          />

          <button  className={styles.button}>
            Sign In
          </button>
        </div>
        

        

        

        {error && <span className={styles.error}>Wrong Credentials!</span>}
      </div>
    </div>
  );
  
}

export default login;