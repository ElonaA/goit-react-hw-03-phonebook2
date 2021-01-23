import PropTypes from "prop-types";
import s from "./ContactList.module.css";

function ContactList({ data, onDeleteButton }) {
  return (

    <ul className={s.list}>
      {data.map(({ id, name, number }) => (
        <li key={id} className={s.item}>
          🙂 {name}   —  📞 {number}
          <button id={id} className={s.button} onClick={() => onDeleteButton(id)}>
          ❌
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
  ),
  onDeleteButton: PropTypes.func.isRequired,
};

export default ContactList;
