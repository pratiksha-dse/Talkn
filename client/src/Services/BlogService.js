export default {
    getBlogs: () => {
      return fetch("/blog/blogs").then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "UnAuthorized", msgError: true } };
      });
    },
    postBlog: (blog) => {
      console.log("doing1",blog);
      return fetch("/blog/addblog", {
        method: "post",
        body: JSON.stringify(blog),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
      });
    },
    getBlogByID: (id) => {
      return fetch("/blog/getblogbyid", {
        method: "post",
        body: JSON.stringify({_id: id}),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
      });
    },
    editBlog: (blog, BID) => {
      console.log("helo")
      return fetch("/blog/editblog", {
        method: "post",
        body: JSON.stringify({BID: BID, blog: blog}),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
      });
    },
    delBlog: (blog) => {
      return fetch("/blog/delblog", {
        method: "post",
        body: JSON.stringify(blog),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
      });
    },
  };
  