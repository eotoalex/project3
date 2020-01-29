import React from 'react';
import {Modal,Button} from "react-bootstrap";
import Navigation from '../navigation/Navigation';


class Comment extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            comment:[],
            modalShow:true,
        }
    }

    handleCommentSubmit = (e) => {
        console.log("Form submit works.",  e.target)
    }

    handleModalClose = () => {
        console.log("Close Modal")
        // this.setState({modalShow:false})
        this.state.modalShow = false;
      }

    render(){
        return(
            <div>
                <Navigation >
                </Navigation>
                <Modal show={this.state.modalShow} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Input Area</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModalClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleModalClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={false} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Input Area</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModalClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleModalClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                
            </div>
        )
    }
}

export default Comment;