import style from './EditContactPage.module.css';
import {connect} from 'react-redux';
import {getContactNameAC, getContactPhoneAC, addContactAC, clearFieldsAC} from './../../redux/reducers/contactsReducer';
import React from 'react';
import Button from './../Button/Button';

function EditContactPage(props) {

  const nameRef = React.createRef();
  const phoneRef = React.createRef();

  const getContactName = () => {
    const currentContactNameVar = nameRef.current.value;
    return props.getContactNameAC(currentContactNameVar);
  }

  const getContactPhone = () => {
    const currentContactPhone = phoneRef.current.value;
    return props.getContactPhoneAC(currentContactPhone);
  }
  
  const contacts = JSON.parse(localStorage.getItem('contacts'));
  const key = localStorage.getItem('id');

  const addContact = () => {
    if(!nameRef.current.value) {
      alert('Пожалуйста, введите имя контакта.');
      return
    }
    if(!phoneRef.current.value) {
      alert('Пожалуйста, введите телефон контакта.');
      return
    }

    const newContact = {
      name: props.currentContactName,
      phone: props.currentContactPhone,
      avatar: contacts[key].avatar
    }

    contacts[key] = newContact;
    
    contacts.sort(function(a, b){
        if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        return 0;
    })

    localStorage.setItem('contacts', JSON.stringify(contacts));
    
    props.clearFieldsAC();
    return props.setModalEditContactActive(false);
  }

  const hide = () => {
    props.setModalEditContactActive(false);
    props.clearFieldsAC();
  }

  return (
    <div className={props.modalEditContactActive ? `${style.modal} ${style.active}` : style.modal} onClick={hide}>
        <div className={props.modalEditContactActive ? `${style.modal__content} ${style.active}` : style.modal__content} onClick={e => e.stopPropagation()}>
            <div className={style.label}>Edit contact</div>
            <div className={style.content_center}><input className={style.input} ref={nameRef} value={props.currentContactName} onChange={getContactName} placeholder='Contact Name' type='text' /></div>
            <div className={style.content_center}><input type='number' className={style.input} ref={phoneRef} value={props.currentContactPhone} onChange={getContactPhone} placeholder='Contact Phone'/></div>
            <div className={style.content_center} onClick={addContact}><Button width='100%' marginTop='22px' backgroundColor='#06C668' text='Save'/></div>
            <div className={style.content_center} onClick={hide}><Button type='close' width='100%' marginTop='22px' text='Close'/></div>
        </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentContactName: state.contactsData.currentContactName,
    currentContactPhone: state.contactsData.currentContactPhone
  }
}

const EditContactPageContainer = connect(mapStateToProps, {getContactNameAC, getContactPhoneAC, addContactAC, clearFieldsAC})(EditContactPage);

export default EditContactPageContainer;