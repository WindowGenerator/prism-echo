import React from "react"
import "./index.css"
import Message from "../Message"
import MessageInput from "../MessageInput"

export default function Chat() {
  return (
    <div className="chat">
      <div className="messagesList">
        <Message messageAuthor="bot" messageText="Hello! How can I help you?" />
        <Message
          messageAuthor="user"
          messageText="Hi! Can you help me with my homework?"
        />
        <Message messageAuthor="bot" messageText="Of course!" />
        <Message
          messageAuthor="user"
          messageText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        />
      </div>
      <MessageInput />
    </div>
  )
}
