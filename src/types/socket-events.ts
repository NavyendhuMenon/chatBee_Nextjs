export interface PrivateMessagePayload {
  sender: string;
  receiver: string;
  message: string;
  chatId: string;
}


export interface Message {
  _id: string;
  from: string;
  to: string;
  chatId: string;
  message: string;
  delivered: boolean;
  seen: boolean;
  createdAt?: string;
  updatedAt?: string;
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