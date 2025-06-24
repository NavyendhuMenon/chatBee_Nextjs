export interface PrivateMessagePayload {
  to: string;
  from: string;
  message: string;
  chatId: string;
}

export interface GroupMessagePayload {
  roomId: string;
  from: string;
  message: string;
}

export interface TypingPayload {
  to: string;
  isGroup: boolean;
  roomId?: string;
}

export interface DeliveryPayload {
  to: string;
  messageId: string;
}

export interface SeenPayload {
  to: string;
  messageId: string;
}