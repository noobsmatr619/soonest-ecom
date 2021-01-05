import React from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import { IconButton } from '@material-ui/core';
export default function  ErrorShow(props) {
  return (
    <div className="errorShow">
      <span className="errorMessage" >{props.message}</span>
      <IconButton className="errorIcon" onClick={props.clearError}><CancelIcon /></IconButton >
    </div>
  );
}
