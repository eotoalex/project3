import React from 'react';
import {Modal,Button} from "react-bootstrap";
import Navigation from '../navigation/Navigation';
import API from '../../utils/API';

class Routes extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            comment:[],
            modalShow:true,
            modalShowTwo:false,
            destination:[],
            destinationLatLng:[]
        }
    }

    handleCommentSubmit = (e) => {
        console.log("Form submit works.",  e.target)
    }

    handleModalClose = () => {
        console.log("Close Modal")
        this.setState({modalShow:false})
    }

    handleModalCloseTwo = () => {
        console.log("This will have all the routes to show the user based on the crime data surrounding.")
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const address = this.state.destination;
        API.convertAddToLatLng(address)
        .then((res) => { 
            let latitude = res.data.results[0].geometry.location.lat;
            let longitude = res.data.results[0].geometry.location.lng;
            this.setState({destinationLatLng:{latitude,longitude}},
            () => {console.log("Destination in STate!",this.state.destinationLatLng)}
            )
        })
        console.log("target ", event.target)
        this.state.modalShow = false;
        // this.setState({modalShow:false})
    }

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
        console.log("Destination in state => ", this.state.destination)
    }

    render(){
        
        return(
            <div>
                {/* Require latlng for draggable destination marker */}
                <Navigation 
                destination={this.state.destinationLatLng}>
                </Navigation>
                <Modal show={this.state.modalShow} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Where are you trying to go?</Modal.Title>
                    </Modal.Header>
                    <input
                        onChange={this.handleInputChange}
                        value={this.props.value}
                        name="destination"
                        type="text" 
                        className="form-control" 
                        placeholder="Destination"
                        id="destination"
                        ref={(el) => {this._input = el}}
                    ></input>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleFormSubmit}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleFormSubmit}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.modalShowTwo} onHide={this.handleModalCloseTwo}>
                    <Modal.Header closeButton>
                        <Modal.Title>Comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Input Area</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModalCloseTwo}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleModalCloseTwo}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Can you give the user access to the marker which is connected to the original location. */}
            </div>
        )
    }
}

export default Routes;