import "./index.css"


interface IMessageProps {
  isBotMessage: boolean,
  text: string
}

export default function Message({isBotMessage, text}: IMessageProps) {
  const author = isBotMessage ? "bot" : "user";
  const iconPath = isBotMessage ? "./assets/botIcon.png" : "./assets/userIcon.png";
  
  return (
    <div className={"message " + author}>
      <img
        className="message__icon"
        src={iconPath}
        alt="icon"
      />
      <div className="message__bubble">
        <p className="message__text">{text}</p>
      </div>
    </div>
  )
}
