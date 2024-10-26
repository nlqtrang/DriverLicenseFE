import { Modal } from "antd";
export const ConfirmModal = ({ title, okText, cancelText, onOk, onCancel }) => {
  Modal.confirm({
    title,
    okText,
    cancelText,
    style: { top: "15%" },
    onOk,
    onCancel,
  });
};
