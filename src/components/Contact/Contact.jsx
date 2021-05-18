import style from './Contact.module.css';
import React from 'react';
import edit from './../../assets/edit.png';
import Button from './../Button/Button';

function Contact(props) {
  const setData = () => {
    props.getContactNameAC(props.name);
    props.getContactPhoneAC(props.phone);
  }
  return (
    <div className={style.contact_block}>
      <div onClick={setData}><div onClick={props.setModalEditContactActive(true)}><img onClick={() => localStorage.setItem('id', props.id)} className={style.edit_button} src={edit} alt='edit' /></div></div>
      <div className={style.content_center}><img className={style.user_photo} src={props.avatar} alt='test' /></div>
      <div className={style.name}>{props.name}</div>
      <a className={style.link} href={'tel:' + props.phone}><Button width='100%' marginTop='22px' backgroundColor='#06C668' text='Call'/></a>
    </div>
  );
}

export default Contact;