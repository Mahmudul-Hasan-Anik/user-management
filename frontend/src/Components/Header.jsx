import React from 'react'
import { useContext } from 'react'
import { Container,Navbar,Nav,Button,Dropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Store } from '../Store'

const Header = () => {
  const navigate = useNavigate()
  const {state, dispatch} = useContext(Store)
  const {userInformation} = state

  const handleLogout = ()=>{
    dispatch({
      type:'USER_LOGOUT'
    })
    navigate('/login')
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand >Management System</Navbar.Brand>
        <Nav className="ms-auto">
        <span className='nav_design'>
          <Link to='/'>Home</Link>
        </span>
    
        {userInformation? 
        <Dropdown>
          <Dropdown.Toggle variant="secondary" className='mt-1'>
          {userInformation.name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        :
          <Link to='/signup'>
            <span className='signup'><i class="fa-solid fa-user-plus"></i></span>
          </Link>
        }
        </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header