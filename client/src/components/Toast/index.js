import React, { useEffect, useState } from 'react';
import pubsub from 'sweet-pubsub';
import { uniqueId } from 'lodash';
import { Toast as ReactToast, ToastBody, ToastHeader } from 'reactstrap';
import './style.css';

const Toast = () => {
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  };

  useEffect(() => {
    const addToast = ({
      type = 'success',
      title = 'lägg till titel',
      message = 'lägg till message',
      duration = 5,
    }) => {
      const id = uniqueId('toast-');

      setToasts((currentToasts) => [
        ...currentToasts,
        { id, type, title, message },
      ]);

      if (duration) {
        setTimeout(() => removeToast(id), duration * 1000);
      }
    };

    pubsub.on('toast', addToast);

    return () => {
      pubsub.off('toast', addToast);
    };
  }, []);

  return (
    <>
      {toasts.map((toast, index) => (
        <ReactToast key={index}>
          <ToastHeader icon={toast.type}>{toast.title}</ToastHeader>
          <ToastBody>{toast.message}</ToastBody>
        </ReactToast>
      ))}
    </>
  );
};

export default Toast;
