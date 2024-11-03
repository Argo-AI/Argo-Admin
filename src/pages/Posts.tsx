import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/DataTable';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
// import AddData from '../components/AddData';
import {fetchAllPosts} from '../api/ApiCollection';
import {
  HiOutlineGlobeAmericas,
  HiOutlineLockClosed,
} from 'react-icons/hi2';
import axiosInstance, {IMAGE_BASE_URL} from "../api/axiosInstance";
import {FcCheckmark} from "react-icons/fc";
import {FaTimes} from "react-icons/fa";

const Posts = () => {
  // const [isOpen, setIsOpen] = React.useState(false);
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchAllPosts,
  });

  const columns: GridColDef[] = [
    {
      field: 'text',
      headerName: 'Content',
      minWidth: 300,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex gap-3 relative items-center py-2">
            <div className="w-20 h-12 sm:w-24 sm:h-14 xl:w-32 xl:h-[72px] rounded relative overflow-hidden">
              <img
                src={
                  params.row.media?.[0]?.url ? IMAGE_BASE_URL + params.row.media?.[0]?.url :
                  'https://placehold.co/720x400'
                }
                alt="thumbnail-picture"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col items-start gap-0">
              <div className="relative truncate-desc overflow-hidden text-ellipsis whitespace-nowrap">
                <span className="text-ellipsis whitespace-nowrap text-base font-medium dark:text-white ">
                  {params.row.text}
                </span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      field: 'author',
      headerName: 'Author',
      minWidth: 240,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex gap-3 items-center">
            <div className="avatar">
              <div className="w-6 xl:w-9 rounded-full">
                <img
                  src={
                    params.row.userDetails?.profilePicture ?  IMAGE_BASE_URL + params.row.userDetails?.profilePicture  : '/Portrait_Placeholder.png'
                  }
                  alt="user-picture"
                />
              </div>
            </div>
            <span className="mb-0 pb-0 leading-none truncate">
              @{params.row.userDetails?.userName}
            </span>
          </div>
        );
      },
    },
    {
      field: 'reportCount',
      headerName: 'Reported By',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 90,
      flex: 1,
      renderCell: (params) => {
        return      <div onClick={()=>{
          if(confirm(params?.row?.status == 'active' ? 'Are you sure you want to Deactivate?' : 'Are you sure you want to Activate?')){


            axiosInstance.patch(`admin/posts/status`,{
              postId: params?.row?.id,
              status: params?.row.status == 'active' ? 'blocked' : 'active'
            }).then((res)=>{

              console.log("here",res);
              toast(`Successfully ${params?.row?.status == 'active' ? 'deactivated' : 'activated'} posts`);

              setTimeout(()=>{
                location.reload();
              },1000);

            }).catch((err)=>{
              toast(err?.message);
            })
          }

        }} className="flex gap-3 items-center cursor-pointer">
              <span className={`mb-0 pb-0`}>
              {params.row.status == 'active' ? <FcCheckmark /> : <FaTimes className={`text-[#ff0000]`} />}
            </span>
        </div>
      },
    },
    {
      field: 'visibility',
      headerName: 'Visibility',
      minWidth: 90,
      flex: 1,
      renderCell: (params) => {
        if (params.row.visibility == 'Public') {
          return (
            <div className="flex gap-1 items-center">
              <HiOutlineGlobeAmericas className="text-lg" />
              <span className="p-0 mt-[1px] leading-none">
                {params.row.visibility}
              </span>
            </div>
          );
        } else if (params.row.visibility == 'Private') {
          return (
            <div className="flex gap-1 items-center">
              <HiOutlineLockClosed className="text-lg" />
              <span className="p-0 mt-[1px] leading-none">
                {params.row.visibility}
              </span>
            </div>
          );
        } else {
          return <span>Unknown</span>;
        }
      },
    },
    {
      field: 'createdAt',
      type: 'string',
      headerName: 'Date',
      minWidth: 140,
      renderCell: (params) => {
        return (
            <div className="flex gap-3 items-center">
              <span className="mb-0 pb-0 leading-none">
              {new Date(params.row.createdAt).toUTCString()}
            </span>
            </div>
        );
      },
    },
    // {
    //   field: 'views',
    //   type: 'number',
    //   headerName: 'Views',
    //   minWidth: 120,
    // },
    // {
    //   field: 'comments',
    //   type: 'number',
    //   headerName: 'Comments',
    //   minWidth: 120,
    //   renderCell: (params) => {
    //     return (
    //       <div>
    //         {params.row.comments && params.row.comments.length}
    //       </div>
    //     );
    //   },
    // },
    // {
    //   field: 'likes',
    //   type: 'number',
    //   headerName: 'Likes',
    //   minWidth: 80,
    // },
  ];

  React.useEffect(() => {
    if (isLoading) {
      toast.loading('Loading...', { id: 'promisePosts' });
    }
    if (isError) {
      toast.error('Error while getting the data!', {
        id: 'promisePosts',
      });
    }
    if (isSuccess) {
      toast.success('Got the data successfully!', {
        id: 'promisePosts',
      });
    }
  }, [isError, isLoading, isSuccess]);

  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              Posts
            </h2>
            {data && data.length > 0 && (
              <span className="text-neutral dark:text-neutral-content font-medium text-base">
                {data.length} Posts Found
              </span>
            )}
          </div>
          {/* <button
            onClick={() => setIsOpen(true)}
            className={`btn ${
              isLoading ? 'btn-disabled' : 'btn-primary'
            }`}
          >
            Add New Order +
          </button> */}
        </div>
        {isLoading ? (
          <DataTable
            slug="orders"
            columns={columns}
            rows={[]}
            includeActionColumn={false}
          />
        ) : isSuccess ? (
          <DataTable
            slug="orders"
            columns={columns}
            rows={data}
            includeActionColumn={false}
          />
        ) : (
          <>
            <DataTable
              slug="orders"
              columns={columns}
              rows={[]}
              includeActionColumn={false}
            />
            <div className="w-full flex justify-center">
              Error while getting the data!
            </div>
          </>
        )}

        {/* {isOpen && (
          <AddData
            slug={'user'}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )} */}
      </div>
    </div>
  );
};

export default Posts;
