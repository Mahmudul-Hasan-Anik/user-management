import React from 'react'
import { Link } from 'react-router-dom'
import { Form,Button } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useEffect } from 'react'


const NewUser = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [status, setStatus] = useState('')

    const handleSubmit = (e)=>{
       e.preventDefault()

       axios.post('http://localhost:8000/info',{
           name,
           email,
           gender,
           status
       }).then(()=>{
           setName('')
           setEmail('')
           setGender('')
           setStatus('')
           toast.success('Succefull');
       })
       .catch((err)=>{
        toast.error(' From submission fail');
       })
    } 

  return (
    <>
      <div id="site-main">
        <div class="container">
            <div class="box-nav d-flex-justify-between">
                <div class="filter">
                    <Link to="/"><i class="fa-solid fa-angles-left"></i> All Users</Link>
                </div>
            </div>

            <div class="form-title text-center">
                <h2 class="text-dark">New User</h2>
                <span class="text-dark">Use the below from for create new user</span>
            </div>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email"  onChange={(e)=>setEmail(e.target.value)}/>
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
        </div>
      </div> 
    </>
  )
}

export default NewUser