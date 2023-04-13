import React from "react";
import "./MyGigs.scss";
import { Link } from "react-router-dom";
import getCurrentUser from "../../utils/getCurrentUser.js"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const myGigs = () => {

  const currentUser = getCurrentUser();

  const queryClient = useQueryClient()   


  const { isLoading, error, data } = useQuery({
    queryKey: ["mygigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["mygigs"])
    }
  });

  const handleDelete = (id) => {
    mutation.mutate(id)
  }

  return (
    <div className="myGigs">
      { isLoading ? "Loading" : error ? "Something went Wrong" :
        <div className="container">
        <div className="title">
          <h1>Gigs</h1>
          <Link className="link" to="/add">
            <button>Add New Gig</button>
          </Link>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
            { data.map(gig=>(

              <tr key={gig._id}>
              <td>
                <img
                  className="image"
                  src={gig?.cover}
                  alt=""
                />
              </td>
              <td>{gig?.title}</td>
              <td>$ {gig?.price}</td>
              <td>{gig?.sales}</td>
              <td>
                <img className="delete" src="/img/delete.png" alt="" onClick={()=>handleDelete(gig._id)}/>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </div>
  );
};

export default myGigs;
