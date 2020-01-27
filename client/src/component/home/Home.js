import React, { Component } from 'react'
import './Home.css';
import {Carousel} from "react-bootstrap";
import {Link} from "react-router-dom";

class Home extends Component{
    render(){
    return (
        <div className="wrapper">
            <div className="jumbotron">
                <h1>Trekky</h1>
                <h2>Dont just find your way. Know your way.</h2>
               <Link to="/signup"> <button className="btn btn-success">Sign up for free!</button></Link>
            </div>
            <div className="description">
                <Carousel className="crs">
                    <Carousel.Item>
                        <img src={require("./pics/1111.png")}></img>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={require("./pics/0kj1.png")}></img>
                    </Carousel.Item>
                </Carousel>
                
            </div>
        </div>
    )
  }
}

export default Home;