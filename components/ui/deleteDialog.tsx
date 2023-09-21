import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { store } from "@/app/GlobalRedux/store/store";
import { deleteDetail } from "@/app/GlobalRedux/store/detailSlice";

export default function DeleteDialog({
  children,
  title,
  text,
  onDelete,
}: {
  children: React.ReactNode;
  title: string;
  text: string;
  onDelete: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (isPersist: boolean) => {
    if (!isPersist) {
      onDelete();
    }
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>{children}</div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => handleClose(true)}
            className="text-blue-400 hover:text-blue-700"
          >
            Disagree
          </Button>
          <Button
            onClick={() => {
              handleClose(false);
            }}
            autoFocus
            className="text-red-400 hover:text-red-700"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}