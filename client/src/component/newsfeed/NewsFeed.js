import React from "react";
import "./NewsFeed.css";
let cardBodyStyles;

class NewsFeed extends React.Component{
    constructor(props) {
        super(props)
        this.state = { 
    }} 
handleCardClick = (e) => {
    e.preventDefault();
    let positioning = this._card_body.style.position;
    this._card_body.focus();
    this._card_header.focus();
    if(positioning !== "relative"){
        this._card_body.style.position ="relative"
        this._card_body.style.visibility ="visible"
    } else if (positioning === "relative"){
        this._card_body.style.position ="fixed"
        this._card_body.style.visibility ="hidden"
      } 
}
handleReadClick = (e) => {
    e.preventDefault();
    window.location.href = "https://www.nydailynews.com" + this.props.href;
}
render(){
    return (
        <div className='card-container'>
            <div className="card" >
                <div 
                ref={(el) => {this._card_header = el}}
                className="card-header" 
                onClick={this.handleCardClick}>
                    {this.props.title}
                </div>
                <div 
                id="relatedTarget" 
                className="card-body"
                ref={(el) => {this._card_body = el}} 
                onClick={this.handleReadClick}
                style={cardBodyStyles}>
                    {this.props.headline}
                </div>
            </div>
        </div>
    );
    }
}
export default NewsFeed;