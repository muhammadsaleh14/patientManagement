import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { detailContext } from "./sortabletest";
import {
  deleteDetail,
  updateDetail,
} from "@/app/GlobalRedux/store/patientSlice";
import { store } from "@/app/GlobalRedux/store/store";
import { useEffect } from "react";

export default function DetailsEditDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //   const [open, setOpen] = React.useState(false);
  const detail = React.useContext(detailContext);

  const [input, setInput] = React.useState<{
    detailHeading: string | undefined;
    detailText: string | undefined;
  }>({ detailHeading: detail?.detailHeading, detailText: detail?.details });

  const handleClickOpen = () => {
    //console.log("running handle click open");
    setOpen(true);
  };

  const handleClose = (save: boolean) => {
    if (save) {
      if (detail && detail.id && input.detailHeading && input.detailText) {
        store.dispatch(
          updateDetail({
            detailId: detail.id,
            detailHeading: input.detailHeading,
            detailText: input.detailText,
          })
        );
      }
    }
    setOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e) {
      const { name, value } = e.target;
      setInput((prevDetail) => ({
        ...prevDetail,
        [name]: value,
      }));
      // //console.log(name);
      // Update the detail state based on the input element's name
    }
  };
  const resetInput = () => {
    setInput({
      detailHeading: detail?.detailHeading,
      detailText: detail?.details,
    });
    //console.log(input);
  };
  useEffect(() => {
    resetInput();
  }, [open]);

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
          name="detailHeading"
          autoFocus
          required
          value={input.detailHeading}
          margin="dense"
          id="detailHeading"
          label="Detail Heading"
          type="text"
          variant="standard"
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="detailText"
          value={input.detailText}
          required
          autoFocus
          margin="dense"
          multiline
          maxRows={4}
          label="Detail Text"
          type="text"
          variant="standard"
          onChange={(e) => handleChange(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Cancel</Button>
        <Button onClick={() => handleClose(true)}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
