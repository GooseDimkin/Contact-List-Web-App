import style from './Contact.module.css';
import React from 'react';

function Contact(props) {
  return (
    <div className={style.contact_block}>
        <div className={style.content_center}><img className={style.user_photo} src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png' alt='test' /></div>
        <div className={style.name}>Test Name</div>
        <button className={style.call_button}>Call</button>
    </div>
  );
}

export default Contact;