import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteDetail } from "@/app/GlobalRedux/store/patientSlice";
import { useState } from "react";
import DetailsEditDialog from "./detailsEditDialog";
import { detailContext } from "./sortabletest";
import { store } from "@/app/GlobalRedux/store/store";
import DeleteDialog from "./deleteDialog";

enum Options {
  Edit = "Edit",
  Delete = "Delete",
}

const ITEM_HEIGHT = 48;

export default function DetailsMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isEditOpen, setEditOpen] = useState(false);
  // const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const detail = React.useContext(detailContext);

  // const open = Boolean(anchorEl);
  const open = Boolean(isVisible);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsVisible(true);
  };
  const handleClose = (optionString: string) => {
    // setAnchorEl(null);

    setIsVisible(false);
    if (optionString === Options.Edit) {
      setEditOpen(true);
    }

    if (optionString === Options.Delete) {
      // setDeleteOpen(true);
      const deleteDialog = document.getElementById(
        detail?.id.toString() ?? "-1"
      );
      if (!deleteDialog) {
        throw new Error("The detail to be deleted is not availible");
      }
      deleteDialog?.click();
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        className={`${isVisible ? "block" : "invisible"}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem
          key={Options.Edit}
          // selected={optionString === Options.Edit}
          onClick={() => handleClose(Options.Edit)}
          className="hover:bg-slate-500 "
        >
          {Options.Edit}
        </MenuItem>
        <MenuItem
          key={Options.Delete}
          // selected={optionString === Options.Edit}
          onClick={() => handleClose(Options.Delete)}
          className="hover:bg-slate-500"
        >
          {Options.Delete}
        </MenuItem>
      </Menu>
      <DetailsEditDialog open={isEditOpen} setOpen={setEditOpen} />
      <DeleteDialog
        title={`Are you sure you want to delete detail`}
        text={"The detail will be removed"}
        onDelete={() => {
          if (detail?.id) {
            store.dispatch(deleteDetail(detail.id));
          }
        }}
      >
        <div id={detail?.id.toString()}></div>
      </DeleteDialog>
    </div>
  );
}
