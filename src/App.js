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
      <div className={style.user_name}>Hello, {localStorage.getItem('userName')}</div>
      <button className={style.logout_button} onClick={logout}>Logout</button>
      <button className={style.new_contact_button}>New Contact</button>
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