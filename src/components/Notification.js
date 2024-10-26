import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const Notification = ({ message, errorCode, onClose }) => {
  if (!message) return null;
  const type = errorCode === 0 ? "success" : "danger";
  return (
    <ToastContainer position="top-center" className="p-3">
      <Toast onClose={onClose} show={!!message} bg={type} delay={3000} autohide>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Notification;
