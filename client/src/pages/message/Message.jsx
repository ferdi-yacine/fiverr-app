import React from 'react';
import "./Message.scss";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const Message = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { id } = useParams();

  const queryClient = useQueryClient()  
  
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["messages"])
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    //AFTER CLICKING THE BUTTON AND SEND IT IT WILL BE AN EMPTY AGAIN
    e.target[0].value = ""
  }

  return (
    <div className="message">
      <div className='container'>
        <span className='breadcrumbs'>
          <Link className='link' to="/messages"> MESSAGES </Link> {">"} JOHN DOE {">"}
        </span>
        {isLoading ? "Loading" : error ? "Something went Wrong!" : <div className='messages'>
          {data.map(msg =>(

            <div className={msg.userId === currentUser._id ? "owner item" : "item"} key={msg._id}>
            <img src='https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600' alt='' />
            <p>
              {msg?.desc}
            </p>
          </div>
          ))}
          
        </div>}
        <hr/>
        <form className='write' onSubmit={handleSubmit}>
          <textarea name='desc' placeholder='write a message' id='' cols="30" rows="10"></textarea>
          <button type='submit'>send</button>
        </form>
      </div>
    </div>
  )
}

export default Message