import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";

export default function deleteAlert(title: string, onDelete: () => void) {
  confirmAlert({
    title: title,
    message: "Are you sure you want to do this.",
    buttons: [
      {
        label: "Yes",
        onClick: onDelete,
      },
      {
        label: "No",
        //onClick: () => alert('Click No')
      },
    ],
  });
}
