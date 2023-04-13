import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard"
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const minRef = useRef();
  const maxRef = useRef();

  const {search} = useLocation()



  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['gigs'],
    queryFn: () =>
      newRequest.get(`/gigs${search}&min=${minRef.current?.value}&max=${maxRef.current?.value}&sort=${sort}`).then(res => {
        return res.data
      })
  });

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };


  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">YALLA {">"} GRAPHICS & DESIGN {">"}</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Badget</span>
            <input type="text"  ref={minRef} placeholder="min" />
            <input type="text"  ref={maxRef} placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">SortBy</span>
            <span className="sortType">
              {sort === "sales" ? "Best selling" : "Newest"}
            </span>
            <img
              src="/public/img/down.png"
              alt=""
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading ? "loading" : error ? "Something went Wrong" : data.map((gig)=> (
            <GigCard key={gig._id} item={gig}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
