import styles from './Button.module.css';
import React from 'react';

function Button(props) {
    let buttonStyle;

    if(props.type === 'close') {
        buttonStyle = {
            background: 'white',
            marginTop: props.marginTop,
            marginLeft: props.marginLeft,
            width: props.width,
            color: '#D30000',
            border: '2px solid #D30000'
        }
    }else{
        buttonStyle = {
            backgroundColor: props.backgroundColor,
            marginTop: props.marginTop,
            marginLeft: props.marginLeft,
            width: props.width
        }
    }

    return (
        <button className={styles.button} style={buttonStyle}>{props.text}</button>
    );
}

export default Button;