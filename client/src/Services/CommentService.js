export default {
    getComments: (BID) => {
      return fetch("/comment/comments", {
        method: "post",
        body: JSON.stringify({BID: BID}),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "UnAuthorized", msgError: true } };
      });
    },
    postComment: (comment) => {
      return fetch("/comment/addcomment", {
        method: "post",
        body: JSON.stringify(comment),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
      });
    },
    delComment: (comment) => {
      return fetch("/answer/delcomment", {
        method: "post",
        body: JSON.stringify(comment),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
      });
    },
    
    editComment: (comment,CID) => {
      return fetch("/comment/editcomment", {
        method: "post",
        body: JSON.stringify({CID:CID,comment:comment}),
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
  