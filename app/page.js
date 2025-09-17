'use client'
import classes from './page.module.css'
import Login from '../components/Login';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


export default function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      <div className={classes.description}>
        <h1>Welcome to Phoenix Library</h1>
        <h2>A World of Books Awaits!</h2>
        <p>We believe that every book is a unique experience. Let us help you find the perfect one for you!</p>
        {!isAuthenticated && <Login />}
      </div>
    </>
  );
}
