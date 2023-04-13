import React, { useState } from 'react';
import "./Featured.scss";
import { Link, useNavigate } from "react-router-dom"

const Featured = () => {

    const [input, setInput] = useState("")
    const navigate = useNavigate()

    const handleSubmit = ()=> {
        navigate(`gigs?search=${input}`)
    }

  return (
    <div className="featured">
        <div className="container">
            <div className="left">
                <h1>Find the perfect <i>freelance</i> services for your business</h1>
                <div className="search">
                    <div className="searchInput">
                        <img src="/img/search.png" alt=""/>
                        <input text="text" placeholder="Try building mobile app" onChange={e=>setInput(e.target.value)}/>
                    </div>
                    <button onClick={handleSubmit}>Search</button>
                </div>
                <div className="popular">
                    <span>Popular: </span>
                    <button> <Link className='link' to="/gigs?cat=design">Web Design</Link> </button>
                    <button><Link className='link' to="/gigs?cat=web">Wordpress</Link></button>
                    <button><Link className='link' to="/gigs?cat=design">Logo Design</Link></button>
                    <button><Link className='link' to="/gigs?cat=ai">AI services</Link></button>
                </div>
            </div>
            <div className="right">
                <img src="/img/man.png" alt=""/>
            </div>
        </div>
    </div>
  )
}

export default Featured