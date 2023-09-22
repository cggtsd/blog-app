import React from 'react'
import { Card, Container, CardHeader, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { useState,useEffect } from 'react'
import { loadingAllCategories } from '../services/category-service'
import JoditEditor from 'jodit-react';
import { useRef } from 'react'
import { toast } from 'react-toastify';
import { createPost } from '../services/post-service';
import { getCurrentUserDetails } from '../auth';

export const AddPost = () => {
    const[categories,setCategories]=useState([])
    const editor = useRef(null);
    const [postContent,setPostContent] =useState({
        title:'',
        content:'',
        categoryId:'',
        userId:''
    })

    const handleChange=(e,field)=>{
        setPostContent({
            ...postContent,
            [field]:e.target.value
        })
    }

    
    const handleFieldChange=(data)=>{
        setPostContent({
            ...postContent,
            content:data
        })
    }


    const handleSubmit=(e)=>{
        e.preventDefault();


        console.log(postContent)


        if(postContent.title.trim()===""){
            toast.error("post title is required");
            return ;
        }
        if(postContent.content.trim()===""){
            toast.error("post content is required");
            return ;
        }
        if(postContent.categoryId.trim()==="" || postContent.categoryId.trim()==="0"){
            toast.error("post category is required");
            return ;
        }

        //submit data to server
 

        createPost(postContent).then(res=>{
            console.log(res)
            toast.success("post created successfully")
            setPostContent({
                title:'',
                content:'',
                categoryId:''
            });
        }).catch(err=>{
            console.log(err)
            toast.error(err);

        })






    }



    
    useEffect(()=>{
       setPostContent({
        ...postContent,
        userId:getCurrentUserDetails()?.id
       }) ;


         loadingAllCategories()
         .then(resp=>{
            console.log(resp)
            setCategories(resp)
         })
         .catch(error=>console.log(error))
    },[])


    return (
        <div>

            {JSON.stringify(postContent)}
            <br></br>
            <Container>
                <Card>
                    <CardHeader>
                        <h3>What is going in your mind ?</h3>

                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="title">Enter Tile</Label>
                                <Input
                                    type='text'
                                    placeholder='Enter Title'
                                    id='title'
                                    name='title'
                                    value={postContent.title}
                                     onChange={(e)=>{handleChange(e,'title')}}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="content">Enter Content</Label>
                                {/* <Input
                                    type='textarea'
                                    placeholder='Enter Content'
                                    id='content'
                                    style={{height:'200px'}}
                                /> */}
                                <JoditEditor
                                ref={editor}
                                 onChange={(data)=>{handleFieldChange(data)}}
                                 
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="category">Select Category</Label>
                                <Input
                                    type='select'
                                    id='category'
                                    defaultValue={0}
                                    value={postContent.categoryId}
                                    onChange={(e)=>{handleChange(e,'categoryId')}}


                                >
                                    <option value={0} disabled>--Select Category--</option>
                                    {
                                        categories.map((category,index)=>{
                                           return (
                                            <option key={index} value={category.categoryId}>{category.categoryTitle}</option>
                                           )
                                        })
                                    }
                                </Input>
                            </FormGroup>
                              <Container className='text-center'>
                                <Button color='primary'>Add Post</Button>
                                <Button className='ms-2' color='danger'>Reset</Button>

                              </Container>


                        </Form>







                    </CardBody>






                </Card>






            </Container>
        </div>
    )
}
