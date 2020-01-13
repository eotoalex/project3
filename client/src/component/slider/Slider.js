import React from "react";
import {Carousel} from "react-bootstrap"
import NewsFeed from "../newsfeed/NewsFeed";
import "./Slider.css";

function Slider(props){

        return (
            <div className="slider-container">
                <div className="col-md-8 offset-md-2 col-sm-12">
                <Carousel 
                className="carousel"
                // controls={false}
                indicators={false}
                // touch={true}
                // autoPlay={true}
                stoponhover={true}>
                    {props.crimeNews.map(news => (
                <Carousel.Item>
                            <NewsFeed 
                            title={news.title} 
                            headline={news.headline} 
                            href={news.href}>
                            </NewsFeed>
                        </Carousel.Item>
                    ))}
                </Carousel>
                </div>
            </div>
        )
}

export default Slider;

