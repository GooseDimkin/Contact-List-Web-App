import style from './AddContactPage.module.css';

function AddContactPage(props) {

  return (
    <div className={props.active ? `${style.modal} ${style.active}` : style.modal} onClick={() => props.setActive(false)}>
        <div className={props.active ? `${style.modal__content} ${style.active}` : style.modal__content} onClick={e => e.stopPropagation()}>
            <div className={style.label}>New contact</div>
            <input className={style.input} type='text' />
            <button className={style.save_button}>Save</button>
            <button className={style.close_button}>Close</button>
        </div>
    </div>
  );
}

export default AddContactPage;