import React, { useState } from 'react'
import { Base } from '../Base'
import { Col, Container, Row,Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button ,
FormFeedback} from 'reactstrap'
import { signup } from '../../services/user-service'

 import { toast } from 'react-toastify'

export const Signup = () => {

   const[data,setData]= useState({
        name:'',
        email:'',
        password:'',
        about:''
    })

    const [error,setError]=useState({
        errors:{},
        isError:false
    })

    const handleChange = (e,field)=>{
        console.log('handle change')
        setData({...data,[field]:e.target.value})
    }

    const resetData= ()=>setData({
        name:'',
        password:'',
        email:'',
        about:''
    })

    const handleSubmit= e=>{
        e.preventDefault();
        // console.log('Form Submiited');
        //console.log(data)
        signup(data)
        .then(resp=>{
          toast.success("User Registered Successfully user id "+resp.id)
          setData({
            name:'',
            password:'',
            email:'',
            about:''
          })
          setError({
            errors:{},
            isError:false
          })
        })
        .catch(error=>
          {
            console.log(error)
            setError({
              errors:error,
              isError:true
            })
          }
          )
    }
    return (
        
           <Base>
             <Container>
                
               <Row className='mt-4'>

                <Col sm={{size:6,offset:3}}>
                
                  <Card color='dark' inverse>
                    <CardHeader>

                     <h3>Fill the information to register !!</h3>
                     
                    </CardHeader>
                    <CardBody>
                        {/* creating form */}

                       <Form onSubmit={handleSubmit}>
                         {/* name field */}
                       <FormGroup>
                          <Label for="name">Enter Name</Label>
                        <Input
                        type='text'
                        placeholder='Enter Name'
                        id='name'
                        name='name'
                        onChange={e=>handleChange(e,'name')}
                        value={data.name}
                        invalid={error?.errors?.response?.data?.name?true:false}/>
                        <FormFeedback>
                             {error?.errors?.response?.data?.name}
                         </FormFeedback>
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
                        value={data.password}
                        invalid={error?.errors?.response?.data?.password?true:false}/>
                        <FormFeedback>
                             {error?.errors?.response?.data?.password}
                         </FormFeedback>
                       </FormGroup>
                          
                          {/* email field */}
                        <FormGroup>
                          <Label for="email">Enter Email</Label>
                        <Input
                        type='text'
                        placeholder='Enter Email'
                        id='email'
                        name='email'
                        onChange={e=>handleChange(e,'email')}
                        value={data.email}
                        invalid={error?.errors?.response?.data?.email?true:false}/>
                        <FormFeedback>
                             {error?.errors?.response?.data?.email}
                         </FormFeedback>
                       </FormGroup>

                        {/* about field */}
                        <FormGroup>
                          <Label for="about">Enter about yourself</Label>
                        <Input
                        type='textarea'
                        placeholder='Enter about yourself'
                        id='about'
                        name='about'
                        style={{height:'150px'}}
                        onChange={e=>handleChange(e,'about')}
                        value={data.about}
                        invalid={error?.errors?.response?.data?.about?true:false}/>
                         <FormFeedback>
                             {error?.errors?.response?.data?.about}
                         </FormFeedback>
                       </FormGroup>
                       <Container className='text-center'>
                          <Button outline color='light'>Register</Button>
                          <Button onClick={resetData} className='ms-2' color='secondary' type='reset'>Reset</Button>

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
