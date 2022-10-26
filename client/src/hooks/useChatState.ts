import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';

export const useChatState = () => {
  const dispatch = useAppDispatch();
  const chatId = useAppSelector((state: RootState) => state.chats.chatId);
 

  return { chatId, dispatch };
};