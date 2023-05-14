import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import FormComponent from '@/components/generic/FormComponent';
import { useGetUserQuery } from '../../hooks/useGetUserQuery';
import { useUpdateUserMutation } from '../../hooks/useUpdateUserMutation';
import { UserInfoUpdateForm, UserUpdateResponse } from '../../types';
import Wrapper from '@/components/handling/Wrapper';
import Skeleton from 'react-loading-skeleton';

const ProfileInfo = () => {
  const updateUserMutation = useUpdateUserMutation();

  const { data: profileInfo } = useGetUserQuery();

  return (
    <div className='w-11/12 py-2'>
      <Toaster />
      <FormComponent
      styles={{form:'bg-stone-200 gap-2 flex flex-col', input:'bg-stone-300 rounded-sm pl-2 text-stone-400', button:'ml-auto px-2 py-2  rounded-lg mt-4 bg-stone-300 ring-2 ring-stone-400 text-stone-500 text-base hover:bg-stone-400', inputName: 'font-bold text-stone-500 text-lg flex items-center justify-between gap-4 pr-2'}}
        schema={UserInfoUpdateForm}
        submitFn={(formInputs: any) =>
          updateUserMutation.mutate(
            { payload: formInputs, type: 'info' },
            {
              onError: (e: any) => {
                console.log(e);
                toast(e.message + '. ' + e.response.data);
              },
              onSuccess: (response) => {
                try {
                  UserUpdateResponse.parse(response.data);
                  console.log('Update info success!');
                } catch (e: any) {
                  console.log(e);
                  toast('Server error. Please retry.');
                }
              },
            },
          )
        }
        options={[
          { extras: { type: 'text' }, name: 'name', default: profileInfo?.name },
          { extras: { type: 'text' }, name: 'email', default: profileInfo?.email },
        ]}
        submitBn={'Update'}
      />
    </div>
  );
};

export default () => (
  <Wrapper
    suspenseComponent={
      <div className='w-full h-[20rem]'>
        <Skeleton className='h-full w-full' />
      </div>
    }
  >
    <ProfileInfo />
  </Wrapper>
);
