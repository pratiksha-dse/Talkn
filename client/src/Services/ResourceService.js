export default {
  getResources: (SEID) => {
    return fetch("/resource/resources", {
      method: "post",
      body: JSON.stringify({SEID: SEID}),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized", msgError: true } };
    });
  },
  postResource: (resource) => {
    return fetch("/resource/addresource", {
      method: "post",
      body: JSON.stringify(resource),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    });
  },
  delResource: (resource) => {
    return fetch("/resource/delresource", {
      method: "post",
      body: JSON.stringify(resource),
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
