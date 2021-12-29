// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const MessageStatus = {
  "SENT": "SENT",
  "DELIVERED": "DELIVERED",
  "READ": "READ"
};

const { SavedMessages, Reaction, Message, ChatRoom, User, ChatRoomUser } = initSchema(schema);

export {
  SavedMessages,
  Reaction,
  Message,
  ChatRoom,
  User,
  ChatRoomUser,
  MessageStatus
};