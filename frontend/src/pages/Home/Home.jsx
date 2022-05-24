import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Modal,Button,Form} from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { toast } from 'react-toastify'

const Home = () => {
    const [user, setUser] = useState([])
    const [userID, setUserID] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [status, setStatus] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(()=>{
        async function fatchData(){
            const {data} = await axios.get('http://localhost:8000/info')
            setUser(data)
        }
        fatchData()
    },[user])

    const handleEdit = async(id)=>{
      const {data} = await axios.get(`http://localhost:8000/info/${id}`)
 
        setUserID(data._id)
        setName(data.name)
        setEmail(data.email)
        setGender(data.gender)
        setStatus(data.status)

        setShow(true)
    }

    const handleDelete = async(id)=>{
        await axios.post(`http://localhost:8000/info/delete`, {
            id
        })
    }


    const handleSubmit = (e)=>{
        e.preventDefault()
 
       axios.put('http://localhost:8000/info/edit', {
           id: userID,
           name: name,
           email: email,
           gender: gender,
           status: status
       }).then(()=>{
           setShow(false)
       })  
     }

  return (
    <div>
      <main id="site-main">
        <div class="container">
            <div class="box-nav d-flex-justify-between">
                <Link to="/new" class="border-shadow" user={user}>
                    <span class="text-gradient">New User <i class="fa-solid fa-user"></i></span>
                </Link>
            </div>


            <form action="/" method="post">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                           <th>ID</th>
                           <th>NAME</th>
                           <th>EMAIL</th>
                           <th>GENDER</th>
                           <th>STATUS</th>
                           <th>ACTION</th>
                        </tr>
                    </thead>

                    <tbody>
                        {user.map((items,index)=>(

                        <tr>
                            <td>{index + 1}</td>
                            <td>{items.name}</td>
                            <td>{items.email}</td>
                            <td>{items.gender}</td>
                            <td>{items.status}</td>
                            <td>
                                <a href="#" class="btn border-shadow update" onClick={()=>handleEdit(items._id)}>
                                    <span class="text-gradiant" ><i class="fa-solid fa-pen-to-square"></i></span>
                                </a>
                                <a href="#" class="btn border-shadow delete" onClick={()=>handleDelete(items._id)}>
                                    <span class="text-gradient"><i class="fa-solid fa-trash-can"></i></span>
                                </a>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </form>


            <Modal show={show} onHide={handleClose}>
                <Container className='p-3'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={name} type="name" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={email} type="email" placeholder="Enter Email"  onChange={(e)=>setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Label>Gender</Form.Label>
                    <Form.Group className="mb-2"> 
                        <Form.Check inline type="radio" label='Male' value='Male' checked={gender == 'Male'} onChange={(e)=>setGender(e.target.value)}/>
                        <Form.Check inline type="radio" label='Female' value='Female' checked={gender == 'Female'} onChange={(e)=>setGender(e.target.value)}/>
                    </Form.Group>

                    <Form.Label>Status</Form.Label>
                    <Form.Group className="mb-4">
                        <Form.Check inline type="radio" label='Active' value='Active' checked={status == 'Active'} onChange={(e)=>setStatus(e.target.value)}/>
                        <Form.Check inline type="radio" label='Inactive' value='Inactive' checked={status == 'Inactive'} onChange={(e)=>setStatus(e.target.value)}/>
                    </Form.Group>
            
                
                
                    <Button variant="primary" type="submit" style={{width:'100%',background:'black'}} onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form>
                </Container>
            </Modal>
        </div>
    </main>
    </div>
  )
}

export default Home
