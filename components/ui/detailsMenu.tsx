import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteDetail } from "@/app/GlobalRedux/store/patientSlice";
import { useEffect, useRef, useState } from "react";
import DetailsEditDialog from "./detailsEditDialog";
import { detailContext } from "./sortabletest";
import { store } from "@/app/GlobalRedux/store/store";
import DeleteDialog from "./deleteDialog";
import ReactDOM from "react-dom";

enum Options {
  Edit = "Edit",
  Delete = "Delete",
}

const optionsArray: string[] = Object.values(Options);

//console.log(optionsArray);

const ITEM_HEIGHT = 48;

export default function DetailsMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [deleteAnchor, setDeleteAnchor] = useState<null | HTMLDivElement>(null);
  // const divRef = useRef(null);
  // const [isEditing, setEditing] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const detail = React.useContext(detailContext);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (optionString: string) => {
    setAnchorEl(null);
    // console.log("in handle close");
    if (optionString === Options.Edit) {
      setEditOpen(true);
    }
    // if (optionString === Options.Delete) {
    //   deleteDetail(detailId);
    // }

    // if (optionString === Options.Delete) {
    //   return (
    //     <DeleteDialog
    //       title={`Are you sure you want to delete detail`}
    //       text={"The detail will be removed"}
    //       onDelete={() => {
    //         try {
    //           if (detail?.id) {
    //             console.log("deleting detail");
    //             store.dispatch(deleteDetail(detail.id));
    //           }
    //         } catch (error) {
    //           //console.log(error);
    //         }
    //       }}
    //     >
    //       <></>
    //     </DeleteDialog>
    //   );
    // }
  };

  // React.useEffect(() => {
  //   // Check if the targetRef is available
  //   if (divRef.current) {
  //     // Create a portal to render the content into the target element
  //     const portal = (

  //     );

  //     // Render the portal content into the target element using ReactDOM.createPortal
  //     ReactDOM.createPortal(portal, divRef.current);
  //   }
  // }, []);

  return (
    <div>
      <div ref={divRef}>
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
      </div>
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
        <MenuItem
          key={Options.Edit}
          // selected={optionString === Options.Edit}
          onClick={() => handleClose(Options.Edit)}
          className="hover:bg-slate-500"
        >
          {Options.Edit}
        </MenuItem>
        <div ref={}></div>
        <DeleteDialog
          title={`Are you sure you want to delete detail`}
          text={"The detail will be removed"}
          onDelete={() => {
            try {
              if (detail?.id) {
                console.log("deleting detail");
                store.dispatch(deleteDetail(detail.id));
              }
            } catch (error) {
              //console.log(error);
            }
          }}
        >
          <MenuItem
            key={Options.Delete}
            // selected={optionString === Options.Edit}
            onClick={() => handleClose(Options.Delete)}
            className="hover:bg-slate-500"
          >
            {Options.Delete}
          </MenuItem>
        </DeleteDialog>
      </Menu>
      <DetailsEditDialog open={isEditOpen} setOpen={setEditOpen} />
    </div>
  );
}
