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

interface AddVisitProps {
  children: React.ReactNode;
  title: string;
  text: string;
  onAdd: () => void;
  // openProp: boolean;
}

const AddVisitPermission: React.FC<AddVisitProps> = ({
  // openProp,
  children,
  title,
  text,
  onAdd,
}) => {
  const [open, setOpen] = React.useState(false);
  // const [firstLoad, setFirstLoad] = React.useState(true);
  // React.useEffect(() => {
  //   handleClickOpen();
  // }, []);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (isPersist: boolean) => {
    if (!isPersist) {
      onAdd();
    }
    console.log("setopen to false");
    console.log("running");
    // if (!firstLoad) {
    setOpen(false);
    // }
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
            className="text-red-400 hover:text-red-700"
          >
            Disagree
          </Button>
          <Button
            onClick={() => {
              handleClose(false);
            }}
            autoFocus
            className="text-blue-500 hover:text-blue-700"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddVisitPermission;
