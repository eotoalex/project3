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
    let cardDisplay = this._card_body.style.display;
    this._card_body.focus();
    if(cardDisplay !== "flex"){
        this._card_body.style.display ="inherit"
    } else if (cardDisplay === "inherit"){
        this._card_body.style.display ="none"
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
                <div className="card-header" onClick={this.handleCardClick}>
                    {this.props.title}
                </div>
                <div 
                id="relatedTarget" className="card-body"
                ref={(el) => {this._card_body = el}} 
                style={cardBodyStyles}>
                    {this.props.headline}
                    <button onClick={this.handleReadClick}>Read</button>
                </div>
            </div>
        </div>
    );
    }
}
export default NewsFeed;