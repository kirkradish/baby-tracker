import CloseIcon from '../../assets/icons/CloseIcon';
import PropTypes from 'prop-types';
import './headline.css';

export default function Headline({ title, notes }) {
  return (
    <section className="headline">
      <header>
        <h2>{title}</h2>
        <span className="add-button"><CloseIcon /></span>
      </header>
      <article>
        {notes.map(note => (
          <p key={note.title}>
            <span className="bold-text">{note.header}: </span>
            {note.body}
          </p>
        ))}
      </article>
    </section>
  );
}

Headline.propTypes = {
  title: PropTypes.string.isRequired,
  notes: PropTypes.array.isRequired
}