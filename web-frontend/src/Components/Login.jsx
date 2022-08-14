import { useState,useEffect } from 'react';
import {BrowserRouter as Router,Route,Link,useNavigate} from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigator = useNavigate();
  const [data, setdata] = useState({username:'',password:''});
  const [status, setstatus] = useState('OK');
  const url = 'https://userauthky.herokuapp.com/api/'

  useEffect(() => {
    const credentials = JSON.parse(localStorage.getItem('credentials'));
    if (credentials){
      axios.post(url + 'validate/'+ credentials.username+'/', {token:credentials.token})
      .then(res => {
        if (res.data.status == 'OK'){
          navigator('/dashboard')
        }})
  }
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(url+'login/',data).then(res => {
      setstatus(res.data.status);
      if (res.data.status == 'OK'){
        localStorage.setItem('credentials',JSON.stringify(res.data.data))
        navigator('/dashboard')
        setdata({username:'',password:''});
      } else {
        window.alert('please check your username and password')
      }
    })

  }

  return (
    <>
    <p>STATUS : {status}</p>
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username : </label>
      <input type="text" name='username' value={data.username} required={true} onChange={(e) => {setdata({...data,username:e.target.value})}} placeholder="username"/>
      <br />
      <label htmlFor="password">Password : </label>
      <input type="password" name='password' value={data.password} minLength={8} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" onChange={(e) => {setdata({...data,password:e.target.value})}} placeholder="password"/>
      <br />
      <p>Don't have one? <Link to='/register'>Sign Up</Link></p>
      <input type="submit" value={"Login"} />
    </form>
    </>
  );
}

export default Login;
