import React from 'react';


class LoginForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {login: '', password: ''}
    }

    handleChange(event)
    {
        this.setState(
                {
                    [event.target.name]: event.target.value
                }
            );
    }

    handleSubmit(event) {
      this.props.getToken(this.state.login, this.state.password)
      event.preventDefault()
    }

    render() {
      return (
      <div className="container">
        <form onSubmit={(event)=> this.handleSubmit(event)} className="row g-3">
            <div className="col-auto">
                <input type="text" name="login" placeholder="login"
                    value={this.state.login} onChange={(event)=>this.handleChange(event)} />
            </div>
            <div className="col-auto">
                <input type="password" name="password" placeholder="password"
                    value={this.state.password} onChange={(event)=>this.handleChange(event)} />
            </div>
            <div className="col-auto">
                <input type="submit" value="Login" className="btn btn-outline-dark mb-3 btn-sm"/>
            </div>
        </form>
      </div>
      );
    }
  }

export default LoginForm