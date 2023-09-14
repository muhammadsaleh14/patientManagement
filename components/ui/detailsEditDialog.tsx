import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { detailContext } from "./sortabletest";

export default function DetailsEditDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //   const [open, setOpen] = React.useState(false);
  const detail = React.useContext(detailContext);

  const [detailHeading, setDetailHeading] = React.useState(
    detail?.detailHeading
  );
  const [detailText, setDetailText] = React.useState(detail?.details);

  const handleClickOpen = () => {
    console.log("running handle click open");
    setOpen(true);
  };

  const handleClose = (save: boolean) => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={"sm"}
      //   className="fixed inset-0 flex items-center justify-center"
    >
      <DialogTitle>Edit Detail</DialogTitle>
      <DialogContent className="grid">
        <DialogContentText></DialogContentText>
        <TextField
          autoFocus
          required
          value={detailHeading}
          margin="dense"
          id="detailHeading"
          label="Detail Heading"
          type="text"
          variant="standard"
        />
        <TextField
          required
          autoFocus
          value={detailText}
          margin="dense"
          id="detailText"
          multiline
          maxRows={4}
          label="Detail Text"
          type="text"
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Cancel</Button>
        <Button onClick={() => handleClose(true)}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
