import {useRef, useState} from "react"
import "./index.css"
import { SendMessageFn } from "../../types/message.type";


interface IMessageInputProps {
  sendMessage: SendMessageFn
}

export default function MessageInput({sendMessage}: IMessageInputProps) {
  const textRef = useRef<HTMLTextAreaElement>(null)
  const [isSending, setIsSending] = useState(false)

  return (
    <div className="message-input">
      <textarea
        ref={textRef}
        name="messageText"
        className="message-input__text"
        placeholder="Write a message"
        cols={35}
        rows={3}
      ></textarea>

      <button 
        disabled={isSending}
        onClick={
          () => {
            if (textRef?.current?.value === undefined || isSending) {
              return;
            }

            setIsSending(true)
            sendMessage(textRef.current.value).then(() => {
              if (textRef?.current?.value === undefined) {
                return;
              }
              textRef.current.value = ""
            }).finally(() => {
              setIsSending(false)
            })
          }
        } 
        className="message-input__send-button" 
      />
    </div>
  )
}
