import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);

  const handleAddUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    // console.log(name, email)
    const user = { name, email };


    //send post data
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user),

    })
      .then(res => res.json())
      .then(data => {

        const newUsers = [...users, data];
        setUsers(newUsers);
        console.log(data)
      })

  }


  return (
    <div className="App">
      <h1>My Own data:{users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" placeholder='Name' />
        <input type="email" name="email" id="" placeholder='Email' />
        <input type="submit" value="Add User" />
      </form>
      <h2>
        <ul>
          {
            users.map(user => <li key={user.id}>Id--{user.id}--  Email--{user.email}--  Name--{user.name}</li>)
          }
        </ul>

      </h2>
    </div>
  );
}

export default App;
