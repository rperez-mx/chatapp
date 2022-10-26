import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';

export const useContactState = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state: RootState) => state.contacts.contacts);
  const currentContact = useAppSelector((state: RootState) => state.contacts.currentContact);
 

  return { contacts, currentContact, dispatch };
};