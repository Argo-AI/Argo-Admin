import axios from 'axios';
import axiosInstance from "./axiosInstance";

// GET TOP DEALS
export const fetchTopDeals = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/topdeals')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};


// GET ALL USERS
export const fetchUsers = async () => {
  const response = await axiosInstance
    .get('admin/users/list?page=1&limit=100')
    .then((res) => {
      res.data.users.users.map((r: any)=>{
          r['id'] = r['_id'];
          delete r['_id'];
      })
      return res.data.users.users;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

export const fetchAllPosts = async () => {
    const response = await axiosInstance
        .get('admin/posts/list?limit=100')
        .then((res) => {
            res.data.posts.map((r: any)=>{
                r['id'] = r['_id'];
                r['visibility'] = 'Public';
                r['tags'] = r.taggedUserDetails;
                delete r['_id'];
            })
          
            return res.data.posts.filter((r: any)=>{
                return r.postType !== 'story'
            });
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });

    return response;
};


export const fetchAllStories = async () => {
  const response = await axiosInstance
      .get('admin/posts/list?limit=100')
      .then((res) => {
          res.data.posts.map((r: any)=>{
              r['id'] = r['_id'];
              r['visibility'] = 'Public';
              r['tags'] = r.taggedUserDetails;
              delete r['_id'];
          })
        
          return res.data.posts.filter((r: any)=>{
              return r.postType === 'story'
          });
      })
      .catch((err) => {
          console.log(err);
          throw err;
      });

  return response;
};


// GET SINGLE USER
export const fetchSingleUser = async (id: string) => {
  const response = await axios
    .get(`https://react-admin-ui-v1-api.vercel.app/users/${id}`)
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET ALL PRODUCTS
export const fetchProducts = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/products')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET SINGLE PRODUCT
export const fetchSingleProduct = async (id: string) => {
  const response = await axios
    .get(`https://react-admin-ui-v1-api.vercel.app/products/${id}`)
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET ALL ORDERS
export const fetchOrders = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/orders')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET ALL POSTS
export const fetchPosts = async () => {
  const response = await axios
    .get('https://react-admin-ui-v1-api.vercel.app/posts')
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET ALL NOTES
export const fetchNotes = async () => {
  const response = await axios
    .get(`https://react-admin-ui-v1-api.vercel.app/notes?q=`)
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};

// GET ALL LOGS
export const fetchLogs = async () => {
  const response = await axios
    .get(`https://react-admin-ui-v1-api.vercel.app/logs`)
    .then((res) => {
      console.log('axios get:', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return response;
};
