import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "./Navbar.css"
import {Row,Container,Col } from 'reactstrap';
import NewsReview from '../newsreview/NewsReview.js'
import Navigation from '../navigation/Navigation';

class Navbar extends React.Component{
  constructor (props) {
    super(props)
    this.state={
      onClickRes:[]
    }
  }

    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/`)
        console.log("the slash => ", this.props.history.push(`/`))
    }

    handComment = () => {
      console.log("comment click works")
      
    }

    render (){
      const loginRegLink = (
        
        <ul className="navbar-nav ml-auto">
        <Container>
          <Row>
            <Col>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            </Col>
            <Col>
              <Link to="/signup" className="nav-link">
                Register
              </Link>
            </Col>
          </Row>
        </Container>
      </ul>
        )
        const userLink = (
          <ul className="navbar-nav ml-auto">
            <Container>
              <Row>
                <Col>
                <Link to="/" className="nav-link">
                  User
                </Link>
                </Col>
                <Col>
                  <a href="*" onClick={this.logOut.bind(this)} className="nav-link">
                    Logout
                  </a>
                </Col>
              </Row>
            </Container>
          </ul>
        )

    return (
      <nav className="navbar navbar-dark bg-dark custom">
          <a className="navbar-brand" href="/">Trekky</a>
          <ul className="navbar-nav mr-auto">
            <Container>
              <Row>
                <Col>
                  <Link to="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>
                      Home
                  </Link>
                </Col>
                <Col>
                  <Link to="/navigation" className={window.location.pathname === "/navigation" ? "nav-link active" : "nav-link"}>
                      Map
                  </Link>
                </Col>
                {/* <Col> 
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </Col> */}
                {/* <Col> 
                  <Link to="*" className="nav-link" >
                    Reviews
                  </Link>
                </Col> */}
                <Col> 
                  <Link to="/routes" className="nav-link" >
                    Routes
                  </Link>
                </Col>
                {/* <Col> 
                  <Link to="*" className="nav-link" onClick={this.handComment}>
                    Comment
                   </Link>
                </Col> */}
              </Row>
            </Container>
          </ul>
         
          {localStorage.usertoken ? userLink : loginRegLink}

      <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
        <ul className="mobile-nav-buttons">      
          <Link to="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>
            <i className="fas fa-home"></i>
          </Link>
          <Link to="/navigation" className={window.location.pathname === "/navigation" ? "nav-link active" : "nav-link"}>
            <i className="far fa-map"></i>
          </Link>
          <Link to="/" className="nav-link">
            <i className="fas fa-users-cog"></i>
          </Link>
          <Link to="/login" className="nav-link">
            <i className="fas fa-user-lock"></i>
          </Link>
          <Link to="/signup" className="nav-link">
            Register
          </Link>
        </ul>
      </nav>
      </nav>
      
    );
    }
}
export default Navbar;