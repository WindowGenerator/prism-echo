import "./index.css"
import Message from "../Message"
import MessageInput from "../MessageInput"
import useChat from "../../hooks/use-chat";
import {getConfiguration} from "../../services/configuration.service";

export default function Chat() {
  const configuration = getConfiguration()

  const [messages, sendMessage] = useChat(configuration.websocketApiUri);

  return (
    <div className="chat">
      <div className="messages-list">
        {
          messages.map(message => {
            return <Message isBotMessage={message.isBot} text={message.text} key={message.text}/>
          })
        }
      </div>
      <MessageInput sendMessage={sendMessage}/>
    </div>
  )
}
