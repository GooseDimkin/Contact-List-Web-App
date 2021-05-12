import style from './App.module.css';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux'

function App(props) {

  let logout = () => {
    localStorage.removeItem('isAuth');
    localStorage.removeItem('userName');
    window.location.reload();
  }

  return (
    <div>
      {props.isLoggined && localStorage.setItem('isAuth', true)} 
      {props.isLoggined && localStorage.setItem('userName', props.state.loginData.userName)}

      {!localStorage.getItem('isAuth') && <Redirect to='/login'/>}
      <button onClick={logout}>Logout</button>
      {localStorage.getItem('userName')}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggined: state.loginData.isLoggined
  }
}

let AppContainer = connect(mapStateToProps, null)(App);

export default AppContainer;