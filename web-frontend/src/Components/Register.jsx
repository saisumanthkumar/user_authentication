import {BrowserRouter as Router,Route,Link,useNavigate} from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';

function Register() {
  const navigator = useNavigate();
  const url = 'https://userauthky.herokuapp.com/api/'
  const [status, setstatus] = useState('OK');
  const [data, setdata] = useState({
    username:'',
    password:'',
    mail:''
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(url + 'register/',data)
      .then(res => {
        if(res.data.status == 'OK'){
          window.alert('Account Created Successfully')
          setdata({
            username:'',
            password:'',
            mail:''
          })
          navigator('/');
        } else{
          window.alert('Username already exists')
        }
      })
  }

  return (
    <>
    <p>STATUS : {status}</p>
    <form onSubmit={handleSubmit}>
      <label htmlFor="mail">Email-ID : </label>
      <input type="email" name='mail' value={data.mail} onChange={(e) => {setdata({...data,mail:e.target.value})}} placeholder="Email"/>
      <br />
      <label htmlFor="username">Username : </label>
      <input type="text" name='username' value={data.username} required={true} onChange={(e) => {setdata({...data,username:e.target.value})}} placeholder="username"/>
      <br />
      <label htmlFor="password">Password : </label>
      <input type="password" name='password' value={data.password} minLength={8} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" onChange={(e) => {setdata({...data,password:e.target.value})}} placeholder="password"/>
      <br />
      <p>Already had an account?<Link to='/'>Log in</Link></p>
      <input type="submit" value={"SignUp"} />
    </form>
    </>
  );
}

export default Register;
