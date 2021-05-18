import style from './App.module.css';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import AddContactPage from './components/AddContactPage/AddContactPage';
import EditContactPage from './components/EditContactPage/EditContactPage';
import { useState } from 'react';
import Contact from './components/Contact/Contact';
import {getContactNameAC, getContactPhoneAC} from './redux/reducers/contactsReducer';
import Button from './components/Button/Button';

function App(props) {
  const logout = () => {
    localStorage.removeItem('isAuth');
    localStorage.removeItem('userName');
    localStorage.removeItem('contacts');
    localStorage.removeItem('id')
    window.location.reload();
  }

  const [modalAddContactActive, setModalAddContactActive] = useState(false);
  const [modalEditContactActive, setModalEditContactActive] = useState(false);

  const contacts = JSON.parse(localStorage.getItem('contacts'))

  const download = function(data) {
    const blob = new Blob([data], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'download.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  let csvData;
  let contactsItem;
  let contacts_value;

  if(contacts) {
    const objectToCsv = function(contacts) {
      const csvRows = [];
      const headers = Object.keys(contacts[0]);
      csvRows.push(headers.join(','));
  
      for(const row of contacts) {
        const values = headers.map(header => {
          const escaped = (''+row[header]).replace(/"/g, '\\"');
          return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
      }
      return csvRows.join('\n');
    }
  
    csvData = objectToCsv(contacts);

    let id = -1;
    contactsItem = contacts.map(c => <Contact id={id+=1} getContactNameAC={props.getContactNameAC} getContactPhoneAC={props.getContactPhoneAC} setModalEditContactActive={() => setModalEditContactActive} name={c.name} phone={c.phone} key={c} avatar={c.avatar} />)

    contacts_value = contactsItem.length;
  }

  return (
    <div className={style.main_content}>
      {props.isLoggined && localStorage.setItem('isAuth', true)} 
      {props.isLoggined && localStorage.setItem('userName', props.state.loginData.userName)}

      {!localStorage.getItem('isAuth') && <Redirect to='/login'/>}
      <div className={style.user_name}>Hello, {localStorage.getItem('userName')}</div>
      <button className={style.logout_button} onClick={logout}>Logout</button>
      <div className={style.buttons}>
        <span onClick={() => setModalAddContactActive(true)}><Button marginTop='89px' marginLeft='20px' backgroundColor='black' text='New Contact'/></span>
        <span onClick={() => download(csvData)}><Button marginTop='89px' marginLeft='20px' backgroundColor='black' text='Download CSV'/></span>
      </div>
      <AddContactPage modalAddContactActive={modalAddContactActive} setModalAddContactActive={setModalAddContactActive} />
      <EditContactPage modalEditContactActive={modalEditContactActive} setModalEditContactActive={setModalEditContactActive} />
      <div className={contacts_value <3 ? style.not_full_line_contacts : style.full_line_contacts}>
        {contactsItem}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggined: state.loginData.isLoggined
  }
}

const AppContainer = connect(mapStateToProps, {getContactNameAC, getContactPhoneAC})(App);

export default AppContainer;