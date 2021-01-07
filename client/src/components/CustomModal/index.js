import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const CustomModal = ({ header, title, content, show, toggle, id }) => (
  <Modal
    isOpen={show}
    toggle={toggle}
    key={show}
    id={id}
    className="fadeInRight"
  >
    {header && <ModalHeader toggle={toggle}>{title}</ModalHeader>}
    <ModalBody>{content}</ModalBody>
  </Modal>
);

export default CustomModal;
