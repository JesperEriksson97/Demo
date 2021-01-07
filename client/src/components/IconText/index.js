import PropTypes from 'prop-types';
import './style.css';

const IconText = ({ icon, text }) => {
  const Icon = icon;
  return (
    <>
      <div className="icon-container">
        <Icon className="icon-size" />
        <span className="icon-text">{text}</span>
      </div>
    </>
  );
};

IconText.propTypes = {
  icon: PropTypes.object,
  text: PropTypes.string,
};

export default IconText;
