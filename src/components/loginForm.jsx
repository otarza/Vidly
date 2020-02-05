import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';
import { Redirect } from 'react-router-dom';

class LoginForm extends Form {
    state = {
        data: { username: '', password: '' },
        errors: {  }
    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }


    doSubmit = async () => {
        try{
            const { username, password } = this.state.data;
            await auth.login(username, password);
            const { state } = this.props.location 
            window.location = state ? state.from.pathname : "/";
        }
        catch(ex){
            console.log(ex.response);
            if(ex.response && ex.response.status === 400){
                const errors = { ...this.state.errors };
                errors.username = ex.response;
                console.log(ex.response)
                console.log(errors)
                this.setState({ errors })
            }
        }
    }

    

    render() { 
        if(auth.getCurrentUser()) return <Redirect to='/' />
        return ( 
        <div>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('username', 'Username')}
                {this.renderInput('password', 'Password', 'password')}
                {this.renderButton("Login")}
            </form>
        </div> );
    }
}
 
export default LoginForm;