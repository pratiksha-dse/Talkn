export default {
  getAnswers: (SEID) => {
    return fetch("/answer/answers", {
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
  postAnswer: (answer) => {
    return fetch("/answer/addanswer", {
      method: "post",
      body: JSON.stringify(answer),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    });
  },
  delAnswer: (answer) => {
    return fetch("/answer/delanswer", {
      method: "post",
      body: JSON.stringify(answer),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    });
  },
  
  editAnswer: (answer,AID) => {
    return fetch("/answer/editanswer", {
      method: "post",
      body: JSON.stringify({AID:AID, answer: answer}),
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
