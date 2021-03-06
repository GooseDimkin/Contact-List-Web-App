import style from './AddContactPage.module.css';
import {connect} from 'react-redux';
import {getContactNameAC, getContactPhoneAC, addContactAC, clearFieldsAC} from './../../redux/reducers/contactsReducer';
import React from 'react';
import Button from './../Button/Button';

function AddContactPage(props) {

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

  const addContact = () => {
    if(!nameRef.current.value) {
      alert('Пожалуйста, введите имя контакта.');
      return
    }
    if(!phoneRef.current.value) {
      alert('Пожалуйста, введите телефон контакта.');
      return
    }

    let seed = 1;
    seed += Math.floor(Math.random() * 99);

    const newContact = {
      name: props.currentContactName,
      phone: props.currentContactPhone,
      avatar: 'https://picsum.photos/seed/' + seed + '/200/200'
    }
    
    let contacts_array = [];
    contacts_array = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts_array.push(newContact);

    contacts_array.sort(function(a, b){
      if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
      if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
      return 0;
    })

    localStorage.setItem('contacts', JSON.stringify(contacts_array));

    props.clearFieldsAC();
    return props.setModalAddContactActive(false);
  }

  return (
    <div className={props.modalAddContactActive ? `${style.modal} ${style.active}` : style.modal} onClick={() => props.setModalAddContactActive(false)}>
        <div className={props.modalAddContactActive ? `${style.modal__content} ${style.active}` : style.modal__content} onClick={e => e.stopPropagation()}>
            <div className={style.label}>New contact</div>
            <div className={style.content_center}><input className={style.input} ref={nameRef} value={props.currentContactName} onChange={getContactName} placeholder='Contact Name' type='text' /></div>
            <div className={style.content_center}><input type='number' className={style.input} ref={phoneRef} value={props.currentContactPhone} onChange={getContactPhone} placeholder='Contact Phone' /></div>
            <div className={style.content_center} onClick={addContact}><Button width='100%' marginTop='22px' backgroundColor='#06C668' text='Save'/></div>
            <div className={style.content_center} onClick={() => props.setModalAddContactActive(false)}><Button type='close' width='100%' marginTop='22px' text='Close'/></div>
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

const AddContactPageContainer = connect(mapStateToProps, {getContactNameAC, getContactPhoneAC, addContactAC, clearFieldsAC})(AddContactPage);

export default AddContactPageContainer;