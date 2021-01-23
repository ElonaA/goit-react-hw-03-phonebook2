import PropTypes from "prop-types";
import s from "./Filter.module.css";
import { v4 as uuidv4 } from 'uuid';



function Filter({ filter, onChangeFilter }) {
  const uniqId = uuidv4();

  return (
    <div className={s.inner}>
      
      <label className={s.label}>
        Find contact
      </label>
      <input
        name="filter"
        placeholder="Enter search word..."
        filter={filter}
        onChange={e => {onChangeFilter(e.target.value);
          }}
        id={uniqId}
        className={s.input}
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
