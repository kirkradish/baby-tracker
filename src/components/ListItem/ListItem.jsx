import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';
import './ListItem.css';

export default function ListItem({ id, path, header, aside }) {
  return (
    <NavLink to={`${path}/${id}`}>
      <article key={header} className="list-item">
        <header className="item-header">{header}</header>
        <aside className="item-aside">{aside}</aside>
      </article>
    </NavLink>
  );
}

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  aside: PropTypes.string.isRequired
}