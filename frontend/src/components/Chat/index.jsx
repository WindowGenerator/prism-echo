import React from "react"
import "./index.css"
import Message from "../Message"
import MessageInput from "../MessageInput"

export default function Chat() {
  return (
    <div className="chat">
      <Message messageAuthor="bot" messageText="Hello! How can I help you?" />
      <Message
        messageAuthor="user"
        messageText="Hi! Can you help me with my homework?"
      />
      <MessageInput />
    </div>
  )
}
