import React, { Component } from 'react';
import Movies from './components/movies';
import NavBar from './components/navBar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import MovieForm from './components/movieForm';
import NotFound from './components/notFound';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Logout from './components/logout';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import 'font-awesome/css/font-awesome.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import auth from './services/authService';
import ProtectedRoute from './components/common/prodectedRoute';

class App extends Component {
  state = {}

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({user});
  }
  
  render() {
    const {user} = this.state;
    return(
    <React.Fragment>   
      <ToastContainer /> 
      <NavBar user={user} />  
      <div className="container">
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <ProtectedRoute 
            path="/movies/:id" 
            component={MovieForm}
          />
          <Route path="/movies" render={props => <Movies {...props} user={user}/>}/>
          <Route path="/customers" component={Customers}/>
          <Route path="/rentals" component={Rentals}/>
          <Route path="/not-found" component={NotFound}/>
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found"/>
        </Switch>
      </div>
    </React.Fragment>
    );
  };
}

export default App;
