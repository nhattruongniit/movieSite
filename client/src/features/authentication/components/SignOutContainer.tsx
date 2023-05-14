import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../utils/signOutUser';
import ButtonComponent from '@/components/generic/ButtonComponent';
import { useQueryClient } from '@tanstack/react-query';
import {FaSignOutAlt} from 'react-icons/fa'

const SignOutContainer = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <ButtonComponent
      className='ml-auto flex px-2 py-2 rounded-lg mt-4 bg-stone-300 ring-2 ring-stone-900 text-stone-900 text-base font-bold hover:bg-stone-900 hover:text-stone-100 items-center gap-2'
      onClick={() => {
        signOutUser()
          .then(async (response) => {
            console.log(response);
            queryClient.invalidateQueries({ queryKey: ['shows'] });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            navigate(0)
          })
          .catch((e) => {
            console.log(e.message);
          });
      }}
    > <FaSignOutAlt className='text-lg' />
      Sign Out
    </ButtonComponent>
  );
};

export default SignOutContainer;
