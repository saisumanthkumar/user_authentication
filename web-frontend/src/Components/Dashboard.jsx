import {BrowserRouter as Router,Route,Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useState,useEffect} from 'react';

function Dashboard() {
  const credentials = JSON.parse(localStorage.getItem('credentials'));
  const [data, setdata] = useState({})
  const navigator = useNavigate();
  const [loading, setloading] = useState(true)
  const url = 'https://userauthky.herokuapp.com/api/'
  useEffect(() => {
    if (credentials){
      axios.post(url + 'validate/'+ credentials.username+'/', {token:credentials.token})
      .then(res => {
        if (res.data.status == 'OK'){
          setdata(res.data.data)
          setloading(false)
        } else{
          window.prompt('Unauthorized access')
        }
      })} else{
        window.alert('Unauthorized Access')
        navigator('/')
      }
  },[])

  const handleLogout = () => {
    localStorage.removeItem('credentials')
    navigator('/')
  }

  if (loading){
    return <h1>Loading...</h1>
  }
  return (
    <>
    <p><em><b>Username</b> : {credentials.username}</em></p>
    <p><em><b>Mail</b> : {data.mail}</em></p>
    <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Dashboard;
