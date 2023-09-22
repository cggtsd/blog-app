import React, { useState } from 'react'
import { Base } from '../Base'
import { Col, Container, Row,Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { toast } from 'react-toastify'
import { loginUser } from '../../services/user-service'
import { doLogin } from '../../auth'
import { useNavigate } from 'react-router-dom'
export const Login = () => {
   const navigate=useNavigate()
   const [user,setUser]=useState({
      username:'',
      password:''
   })

   const handleChange= (e,field)=>{
      setUser({...user,[field]:e.target.value})
   }

   const resetUser=()=>{
      setUser({
         username:'',
         password:''
      })
   }

   const handleSubmit = e=>{
      e.preventDefault()
      console.log(user)
      //validations
      if(user.username.trim()==''||user.password.trim()==''){
         toast.error('username or password is required !!')
         return;
      }
      //send data to server
      loginUser(user)
      .then(resp=>{
         console.log(resp)
         //save data to session storage
         doLogin(resp,()=>{
            console.log('login detail is saved to session storage')
            navigate('/user/dashboard')
         })
         toast.success('Login Success')
      })
      .catch(error=>{
         console.log(error)
         if(error.response.status===401 || error.response.status===404){
            toast.error(error.response.message)
         }
        else
         toast.error('Something went wrong on server !!')
      })
   }

    return (
        
            <Base>
            <Container>
               <Row className='mt-4'>

                <Col sm={{size:6,offset:3}}>
                
                  <Card color='dark' inverse>
                    <CardHeader>

                     <h3>Login Here !!</h3>
                     
                    </CardHeader>
                    <CardBody>
                        {/* creating form */}

                       <Form onSubmit={handleSubmit}>
                        {/* email field */}
                       
                       <FormGroup>
                        <Label for="email">Enter Email</Label>
                        <Input
                        type='text'
                        placeholder='Enter Email'
                        id='email'
                        name='username'
                        onChange={e=>handleChange(e,'username')}
                        value={user.username}/>
                       </FormGroup>
                         
                          {/* password field */}
                       <FormGroup>
                          <Label for="password">Enter Password</Label>
                        <Input
                        type='password'
                        placeholder='Enter Password'
                        id='password'
                        name='password'
                        onChange={e=>handleChange(e,'password')}
                        value={user.password}/>
                       </FormGroup>
                       
                       
                       <Container className='text-center'>
                          <Button outline color='light'>Login</Button>
                          <Button onClick={resetUser} className='ms-2' color='secondary' type='reset'>Reset</Button>
                       </Container>


                       </Form>


                    </CardBody>





                  </Card>
                
                
                
                
                
                
                
                </Col>



               </Row>




             </Container>
            </Base>
       
    )
}
