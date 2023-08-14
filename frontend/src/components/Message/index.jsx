import React from "react"
import "./index.css"

export default function Message(props) {
  return (
    <div className={"message " + props.messageAuthor}>
      <img
        className="message-icon"
        src={
          props.messageAuthor === "bot"
            ? "./assets/botIcon.png"
            : "./assets/userIcon.png"
        }
        alt="icon"
      />
      <div className="message-bubble">
        <p className="message-text">{props.messageText}</p>
      </div>
    </div>
  )
}
