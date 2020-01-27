import React from 'react';


class Comment extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            comment:[]
        }
    }

    handleCommentSubmit = (e) => {
        console.log("Form submit works.",  e.target)
    }

    render(){
        return(
            <div>
                <inputarea id='incident-comment'></inputarea>
                {/* Save to state so that we can transfer to the map. */}
                <button type="submit" onClick={this.handleCommentSubmit}></button>
            </div>
        )
    }
}

export default Comment;