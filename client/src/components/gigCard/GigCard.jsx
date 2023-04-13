import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./GigCard.scss";

const GigCard = ({ item }) => {

  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then(res => {
        return res.data
      })
  });

  return (
    <Link className="link" to={`/gig/${item._id}`}>
      <div className="gigCard">
        <img src={item?.cover} alt="" />
        <div className="info">
          {isLoading ? "loading..." : error ? "Something went Wrong" : <div className="user">
            <img src={data.img || "https://ionicframework.com/docs/img/demos/avatar.svg"} />
            <span>{data.username}</span>
          </div>}
          <p>{item?.title}</p>
          <div className="star">
            <img src="/img/star.png" alt="" />
            <span>{!isNaN(item.totalStars / item.starNumber) && Math.round(item.totalStars / item.starNumber)}</span>
          </div>
        </div>
        <hr />
        <div className="details">
          <img src="/img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>$ {item?.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
