import React from 'react';
import {NotificationContainer, AlertTextContainer, AlertText, CloseIcon} from "./Notification_Styles";

function Notification({message, setShowNotification}) {
  return (
    <NotificationContainer>
      <AlertTextContainer>
        <AlertText>{message}</AlertText>
        <CloseIcon onClick={() => setShowNotification(false)}/>
      </AlertTextContainer>
    </NotificationContainer>
  )
}

export default Notification
