import style from './LoginPage.module.css';
import {connect} from 'react-redux';
import {changeCurrentInputTextAC, changeLoginStatusAC, setUserName} from './../../redux/reducers/loginReducer'
import React from 'react';
import {withRouter} from 'react-router-dom';

function LoginPage(props) {
    
    let ref = React.createRef();

    let changeCurrentInputText = () => {
        let currentInputText = ref.current.value;

        return props.changeCurrentInputTextAC(currentInputText);
    }

    let loginAction = () => {
        if(!props.currentInputText) 
            alert('Пожалуйста, введите имя пользователя для начала.') 
        else {
            props.changeLoginStatusAC(true);
            props.setUserName(props.currentInputText);
            props.history.push('/');
        }
    }

    return (
        <div>
            <div className={style.label}>SignIn</div>
            <input className={style.input} type='text' ref={ref} onChange={changeCurrentInputText} value={props.currentInputText} />
            <button className={style.button} onClick={loginAction}>Submit</button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        currentInputText: state.loginData.currentInputText
    }
}

let LoginPageContainer = connect(mapStateToProps, {changeCurrentInputTextAC, changeLoginStatusAC, setUserName})(LoginPage);

export default withRouter(LoginPageContainer);
