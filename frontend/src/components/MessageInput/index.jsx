import React from "react"
import "./index.css"

export default function MessageInput() {
  return (
    <form className="message-input">
      <textarea
        name="messageText"
        className="message-input__text"
        placeholder="Write a message"
        cols="35"
        rows="3"
      ></textarea>

      <input type="submit" value="" className="message-input__send-button" />
    </form>
  )
}
