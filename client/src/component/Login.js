 
import React, { Component } from 'react';
import { login } from './UserFunctions';
import { Redirect,Link } from 'react-router-dom';


class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {},
      redirect:true
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    login(user).then(res => {
      if (res) {
        this.props.history.push(`/profile`)
      }
    })
  }

  setRedirect = () => {
    return( 
      <div>
    <Redirect to='/signup' />
    </div>)
  }
 

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal" style={{"color":"rgb(27, 135, 223"}}>Please sign in</h1>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-secondary btn-lg btn-block"
              >
                Sign in
              </button>
            </form>
            <Link to="/signup">
            <button
                type="submit"
                className="btn btn-secondary btn-lg btn-block"
                style={{"margin":"auto","display":"block","marginTop":"10px"}}
                onClick={this.setRedirect}
              >
                Register
              </button>
              </Link>
              {/* <Link to="/news_review"><button className="button" id="article-comment" onClick={this.handleCommentBtn} value='Article URL'>Article Comment</button></Link> */}
          </div>
        </div>
      </div>
    )
  }
}

export default Login
