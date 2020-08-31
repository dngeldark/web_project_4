export default class Api{
  constructor(options){
    this._baseUrl = options.baseUrl;
    this._headers = {headers:options.headers};
  }

  getInitialCards(){
    return fetch(this._baseUrl+"cards",this._headers)
    .then(res => {if (res.ok) return res.json()
    return Promise.reject(`Error: ${res.status}`)
    });
  }

  getUserInfo(){
    return fetch(this._baseUrl+"users/me",this._headers)
    .then(res => {if (res.ok) return res.json()
    return Promise.reject(`Error: ${res.status}`)
    })
  }

  setUserInfo(name,about){
    return fetch(this._baseUrl+"users/me", {
      method: "PATCH",
      headers: {
        authorization: "2dcdffb3-685e-4cea-8daa-c562836c5b1e",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        about,
      })
    })
    .then(data => {return data.json()});
  }

  postNewCard({name,link}){
    return fetch(this._baseUrl+"cards",{
      method: "POST",
      headers: {   
        authorization: "2dcdffb3-685e-4cea-8daa-c562836c5b1e",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(card => {return card.json()});
  }

  deleteCard(cardId){
    return fetch(this._baseUrl+`cards/${cardId}`,{
      method: "DELETE",
      headers: {   
        authorization: "2dcdffb3-685e-4cea-8daa-c562836c5b1e",
      }
    })
  }  

}

