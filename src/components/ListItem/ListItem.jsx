import PropTypes from 'prop-types';
import './ListItem.css';

export default function ListItem({ header, aside }) {
  return (
    <article key={header} className="list-item">
      <header className="item-header">{header}</header>
      <aside className="item-aside">{aside}</aside>
    </article>
  );
}

ListItem.propTypes = {
  header: PropTypes.string.isRequired,
  aside: PropTypes.string.isRequired
}