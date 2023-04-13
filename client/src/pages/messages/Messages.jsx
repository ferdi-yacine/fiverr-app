import React from "react";
import "./Messages.scss";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient()   

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["conversation"])
    }
  });

  const handleRead = (id) => {
    mutation.mutate(id)
  }
    

  return (
    <div className="messages">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went Wrong!"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <tbody>
              <tr>
                <th>Buyer</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
              {data.map((c) => (
                <tr key={c.id}>
                  <td className="active">
                    {currentUser.isSeller ? c.buyerId : c.sellerId}
                  </td>
                  <td>
                    <Link className="link" to={`/message/${c.id}`}>
                      {c?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>{moment(c.updatedAt).fromNow()}</td>
                  <td>
                    {(currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer && (
                        <button onClick={()=>handleRead(c.id)}>Mark as read</button>
                      ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
