import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "@firebase/firestore";
import { db } from './firebase-config'
import { User } from "./models/user.model";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const usersCollectionRef = collection(db, "users")

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      return data;
    }

    getUsers().then(response => {
      setUsers(response.docs.map(doc => ({ ...doc.data() })) as User[]);
    });
  }, [])

  return (
    <>
      <div>
        {users.map((user: User) => (
          <div>{user.name}</div>
        ))}
      </div>
    </>
  );
}

export default App;
