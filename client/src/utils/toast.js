import pubsub from 'sweet-pubsub';

const show = (toast) => pubsub.emit('toast', toast);

const showSuccess = ({ title, message }) =>
  show({ type: 'success', title, message });

const showError = ({ title, message }) =>
  show({ type: 'danger', title, message });

export default { showSuccess, showError };
