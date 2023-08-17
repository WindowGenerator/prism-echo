import React from "react"
import "./index.css"

export default function Message(props) {
  return (
    <div className={"message " + props.messageAuthor}>
      <img
        className="message__icon"
        src={
          props.messageAuthor === "bot"
            ? "./assets/botIcon.png"
            : "./assets/userIcon.png"
        }
        alt="icon"
      />
      <div className="message__bubble">
        <p className="message__text">{props.messageText}</p>
      </div>
    </div>
  )
}
