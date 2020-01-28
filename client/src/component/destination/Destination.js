import React from 'react';
import "./Destination.css";

let jumboStyles = {
    margin:"auto",
    display:"block",
    marginBottom:"10px",
    padding:"10px",
};

class Destination extends React.Component{
    // clearForm = (cb) => {
    //     this._input.focus();
    //     this._input.value = "";
    //     cb()
        
    // }


    render(){
       
        return(
            
            <div className="row dest">
                <div className="jumbotron col-7" style={jumboStyles}>
                    <div className="input-group">
                        {/* <div className="input-group-prepend">
                            <span className="input-group-text">From</span>
                        </div>
                        <input type="text" className="form-control" placeholder="From.."></input> */}
                    </div><br></br>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">To</span>
                        </div>
                        <input
                            onChange={this.props.handleInputChange}
                            value={this.props.value}
                            name="destination"
                            type="text" 
                            className="form-control" 
                            placeholder="Destination"
                            id="destination"
                            ref={(el) => {this._input = el}}
                        ></input>
                    </div><br></br>
                    <button onClick={this.handleFormSubmit}  className="btn btn-primary mt-8">
                        Go!
                    </button>
                </div>
            </div>
        );
    };
};

export default Destination;