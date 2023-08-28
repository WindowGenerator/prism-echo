import { useEffect, useRef, useState } from 'react';
import { Message, SendMessageFn } from '../types/message.type';


function useChat(websocketArrdess: string): [Message[], SendMessageFn] {
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(websocketArrdess);
    socket.onclose = () => console.info('Websocket connection was closed')
    socket.onopen = () => console.info('WebSocket connection opened')
    socket.onmessage = (event: MessageEvent) => {
      const message = {
          isBot: true,
          text: event.data
      } as Message;

      setMessages((prevMessages) => [...prevMessages, message])
    }

    socketRef.current = socket

    return () => {
      // Disconnect from the WebSocket server on unmount
      socket.close()
    };
  }, [websocketArrdess]);

  const sendMessage = async (message: string) => {
    if (socketRef.current !== null && socketRef.current.readyState === WebSocket.OPEN) {
      await socketRef.current.send(message)
      setMessages((prevMessages) => [...prevMessages, {
        isBot: false,
        text: message
      }])
    }
  };
 
  return [
    messages,
    sendMessage,
  ];
}

export default useChat;