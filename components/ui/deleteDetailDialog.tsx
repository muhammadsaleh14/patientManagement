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

export default function DeleteDetailDialog({ detailId }: { detailId: number }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (isPersist: boolean) => {
    if (!isPersist) {
      try {
        store.dispatch(deleteDetail(detailId));
        // //console.log(details);
      } catch (error) {
        //console.log(error);
      }
    }
    setOpen(false);
  };

  return (
    <div>
      <Button variant="text" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to delete this detail?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            The details grouped with this heading will not be deleted, but will
            appear in the end of the details list
          </DialogContentText>
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
            onClick={() => handleClose(false)}
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
