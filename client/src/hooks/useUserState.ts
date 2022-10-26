import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';

export const useUserState = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);
  const me = useAppSelector((state: RootState) => state.user.profile);
  const online = useAppSelector((state: RootState) => state.user.online);

  return { user, me, online, dispatch };
};