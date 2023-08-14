import React from "react"
import "./index.css"

export default function MessageInput() {
  return (
    <form className="messageInput">
      <textarea
        name="messageText"
        className="messageText"
        placeholder="Write a message"
        cols="35"
        rows="3"
      ></textarea>

      <input type="submit" value="" className="sendMessageButton" />
    </form>
  )
}
