import style from './LoginPage.module.css';
import {connect} from 'react-redux';
import {changeCurrentInputTextAC, changeLoginStatusAC, setUserName} from './../../redux/reducers/loginReducer'
import React from 'react';
import {withRouter} from 'react-router-dom';
import Button from './../Button/Button';

function LoginPage(props) {
    
    const ref = React.createRef();

    const changeCurrentInputText = () => {
        const currentInputText = ref.current.value;

        return props.changeCurrentInputTextAC(currentInputText);
    }

    const loginAction = () => {
        if(!ref.current.value) 
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
            <div className={style.content_center}><input className={style.input} type='text' placeholder="What's your name?" ref={ref} onChange={changeCurrentInputText} value={props.currentInputText} /></div>
            <div className={style.content_center} onClick={loginAction}><Button width='320px' marginTop='22px' backgroundColor='#06C668' text='Submit'/></div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        currentInputText: state.loginData.currentInputText
    }
}

const LoginPageContainer = connect(mapStateToProps, {changeCurrentInputTextAC, changeLoginStatusAC, setUserName})(LoginPage);

export default withRouter(LoginPageContainer);
