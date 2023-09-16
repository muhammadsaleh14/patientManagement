import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteDetail } from "@/app/GlobalRedux/store/detailSlice";
import { useState } from "react";
import DetailsEditDialog from "./detailsEditDialog";

enum Options {
  Edit = "Edit",
  Delete = "Delete",
}

const optionsArray: string[] = Object.values(Options);

//console.log(optionsArray);

const ITEM_HEIGHT = 48;

export default function DetailsMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isEditing, setEditing] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (optionString: string) => {
    if (optionString === Options.Edit) {
      setEditOpen(true);
    }
    // if (optionString === Options.Delete) {
    //   deleteDetail(detailId);
    // }
    setAnchorEl(null);
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
        {optionsArray.map((optionString) => (
          <MenuItem
            key={optionString}
            // selected={optionString === Options.Edit}
            onClick={() => handleClose(optionString)}
            className="hover:bg-slate-500"
          >
            {optionString}
          </MenuItem>
        ))}
      </Menu>
      <DetailsEditDialog open={isEditOpen} setOpen={setEditOpen} />
    </div>
  );
}
