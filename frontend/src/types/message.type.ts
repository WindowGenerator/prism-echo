export type Message = {
    text: string;
    isBot: boolean;
}

export type SendMessageFn = (message: string) => Promise<void>