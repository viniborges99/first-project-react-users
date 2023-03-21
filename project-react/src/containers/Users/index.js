import React, { useState, useEffect } from "react";
//chamando os estilos do styles.js
import { Container, H1, Image, ContainerItens, Button, User } from "./styles"
import Avatar from '../../assets/avatar.svg' //chamando a img
import Seta from '../../assets/seta.svg'
import Lixeira from '../../assets/lixeira.svg'
import axios from 'axios'
import { useHistory } from "react-router-dom";

const Users = () => {
  const history = useHistory()

  const [users, setUsers] = useState([])


useEffect(() => {
  async function fetchUsers() {
    const { data: newUser } = await axios.get("http://localhost:3001/users")
    setUsers(newUser)
  }
  fetchUsers()
}, [])

async function deleteUser(userId) {
  await axios.delete(`http://localhost:3001/users/${userId}`)

  const newUsers = users.filter(user => user.id !== userId)
  setUsers(newUsers)
}

function goBackPage(){
  history.push("/")
}


return (
  <Container>
    <Image alt="pessoas conversando" src={Avatar} />
    <ContainerItens>
      <H1>Usuários</H1>
      <ul>
        {users.map((user) => (
          <User key={user.id}>
            <p>{user.name}</p>  <p>{user.age}</p>
            <button onClick={() => deleteUser(user.id)}><img alt="Lixeira" src={Lixeira} /></button>
          </User>
        ))}
      </ul>
      <Button onClick={goBackPage} ><img alt="seta" src={Seta} /> Voltar </Button>
    </ContainerItens>
  </Container>

)
}

export default Users