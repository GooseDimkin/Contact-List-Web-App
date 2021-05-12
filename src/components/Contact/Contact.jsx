import style from './Contact.module.css';
import React from 'react';

function Contact(props) {
  return (
    <div className={style.contact_block}>
        <div className={style.content_center}><img className={style.user_photo} src='https://picsum.photos/200' alt='test' /></div>
        <div className={style.name}>{props.name}</div>
        <button className={style.call_button}>Call</button>
    </div>
  );
}

export default Contact;