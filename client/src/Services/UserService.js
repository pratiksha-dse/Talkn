export default {
  addUser: (user) => {
    console.log(user);
    return fetch("/user/adduser", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    });
  },
  getUserByemail: (email) => {
    return fetch("/user/getuserbyemail", {
      method: "post",
      body: JSON.stringify({email: email}),
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
  