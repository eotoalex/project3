import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import Home from "./component/home/Home";
import Navigation from "./component/navigation/Navigation";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Profile from "./signin/Profile";
import NewsReview from './component/news_review/NewsReview';
import Comment from './component/comment/Comment';
import './App.css';


class App extends React.Component{
  render(){
    return (
      <Router>
        <div className="App">
          <Navbar test={console.log("Navbar Props => ",this.props)}/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/navigation" component={Navigation} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/news_review" component={NewsReview} />
            <Route exact path='/comment' component={Comment}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
