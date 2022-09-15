export default {
  login: (user) => {
    console.log(user);
    return fetch("/user/login", {
      method: "post",
      body: JSON.stringify({
        token: user.token,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      console.log(res);
      if (res.status !== 401) return res.json().then((data) => data);
      else
        return {
          isAuthenticated: false,
          user: { name: "", username: "", email: "", phone: "", univ: "" },
        };
    }).catch((err)=>{alert(err);});
  },
  register: (user) => {
    console.log(user);
    return fetch("/user/register", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  logout: () => {
    return fetch("/user/logout")
      .then((res) => res.json())
      .then((data) => data);
  },
  isAuthenticated: () => {
    return fetch("/user/authenticated").then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else
        return {
          isAuthenticated: false,
          user: { name: "", username: "", email: "", phone: "", univ: "" },
        };
    });
  },
  // changePwd: (user, newpwd) => {
  //   console.log(user);
  //   return fetch("/user/changepwd", {
  //     method: "post",
  //     body: JSON.stringify({user: user, newpwd: newpwd}),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => data);
  // },


  // getSlotsBooked2: (id) => {
  //   console.log(id);
  //   return fetch("/user/slotsbooked2", {
  //     method: "post",
  //     body: JSON.stringify({id:id}),
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json",
  //     },
  //   }).then((res) => {
  //     if (res.status !== 401) return res.json().then((data) => data);
  //     else
  //       return {
          
  //         user: { name: "", username: "", email: "", phone: "", univ: "" },
  //       };
  //   });
  // },
};
