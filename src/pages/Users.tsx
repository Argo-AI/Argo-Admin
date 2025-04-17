import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/DataTable';
import { fetchUsers } from '../api/ApiCollection';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import AddData from '../components/AddData';
import {FcCheckmark} from "react-icons/fc";
import {FaTimes, FaLock, FaLockOpen} from "react-icons/fa";
import axiosInstance, {IMAGE_BASE_URL} from "../api/axiosInstance";

const Users = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
  console.log(data);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'first_name',
      headerName: 'Profile',
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex gap-3 items-center">
            <div className="avatar">
              <div className="w-6 xl:w-9 rounded-full">
                <img
                  src={IMAGE_BASE_URL + params.row.profilePicture || '/Portrait_Placeholder.png'}
                  alt="user-picture"
                  onError={(e) => {
                    e.currentTarget.src = '/Portrait_Placeholder.png';
                  }}
                />
              </div>
            </div>
            <span className="mb-0 pb-0 leading-none">
              {params.row.firstName}
            </span>
          </div>
        );
      },
    },
    {
      field: 'userName',
      type: 'string',
      headerName: 'User Name',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'privacy',
      type: 'string',
      headerName: 'Visibility',
      minWidth: 120,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex gap-3 items-center">
            <span className="mb-0 pb-0 leading-none">
              {params.row.privacy  ? <FaLock /> : <FaLockOpen />}
            </span>
          </div>
        );
      },
    },
    {
      field: 'email',
      type: 'string',
      headerName: 'Email',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'provider',
      type: 'string',
      headerName: 'Phone',
      minWidth: 120,
      flex: 1,
    },
    {
      field: 'updatedAt',
      headerName: 'Created At',
      minWidth: 100,
      type: 'string',
      flex: 1,
      renderCell: (params) => {
        return (
            <div className="flex gap-3 items-center">
              <span className="mb-0 pb-0 leading-none">
              {new Date(params.row.updatedAt).toLocaleDateString()}
            </span>
            </div>
        );
      },
    },
    {
      field: 'isActive',
      headerName: 'Active',
      width: 80,
      type: 'boolean',
      flex: 1,
      renderCell: (params) => {
        return (
            <div onClick={()=>{
              if(confirm(params?.row?.isActive ? 'Are you sure you want to Deactivate?' : 'Are you sure you want to Activate?')){

                console.log(params.row);
                axiosInstance.patch(`users/${params?.row?.isActive ? 'deactivate' : 'activate'}/` + params?.row?.id).then((res)=>{

                  console.log("here",res);
                  toast(`Successfully ${params?.row?.isActive ? 'deactivated' : 'activated'} user`);

                  setTimeout(()=>{
                     location.reload();
                  },1000);

                }).catch((err)=>{
                  toast(err?.message);
                })
              }
            }} className="flex gap-3 items-center cursor-pointer">
              <span className={`mb-0 pb-0`}>
              {params.row.isActive ? <FcCheckmark /> : <FaTimes className={`text-[#ff0000]`} />}
            </span>
            </div>
        );
      },

    },
  ];

  React.useEffect(() => {
    if (isLoading) {
      toast.loading('Loading...', { id: 'promiseUsers' });
    }
    if (isError) {
      toast.error('Error while getting the data!', {
        id: 'promiseUsers',
      });
    }
    if (isSuccess) {
      toast.success('Got the data successfully!', {
        id: 'promiseUsers',
      });
    }
  }, [isError, isLoading, isSuccess]);

  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              Users
            </h2>
            {data && data.length > 0 && (
              <span className="text-neutral dark:text-neutral-content font-medium text-base">
                {data.length} Users Found
              </span>
            )}
          </div>

        </div>
        {isLoading ? (
          <DataTable
            slug="users"
            columns={columns}
            rows={[]}
            includeActionColumn={false}
          />
        ) : isSuccess ? (
          <DataTable
            slug="users"
            columns={columns}
            rows={data}
            includeActionColumn={false}
          />
        ) : (
          <>
            <DataTable
              slug="users"
              columns={columns}
              rows={[]}
              includeActionColumn={false}
            />
            <div className="w-full flex justify-center">
              Error while getting the data!
            </div>
          </>
        )}

        {isOpen && (
          <AddData
            slug={'user'}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
