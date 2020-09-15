export default class Api{
  constructor(options){
    this._baseUrl = options.baseUrl;
    this._headers = {headers:options.headers};
    this._auth = options.auth;
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
        authorization: this._auth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        about,
      })
    })
    .then(res => {
      if (res.ok) return res.json()
      return Promise.reject(`Error: ${res.status}`)
    });
  }

  postNewCard({name,link}){
    return fetch(this._baseUrl+"cards",{
      method: "POST",
      headers: {   
        authorization: this._auth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(res => {
      if(res.ok) return res.json()
      return Promise.reject(`Error: ${res.status}`) 
    });
  }

  deleteCard(cardId){
    return fetch(this._baseUrl+`cards/${cardId}`,{
      method: "DELETE",
      headers: {   
        authorization: this._auth,
      }
    })
    .then(res => {
      if(res.ok) return res.json()
      return Promise.reject(`Error: ${res.status}`);
    })
  }  

  likeCard(cardId){
    return fetch(this._baseUrl+`cards/likes/${cardId}`,{
      method: "PUT",
      headers: {
        authorization: this._auth,
      }
    })
    .then(res => {
      if(res.ok) return res.json()
      return Promise.reject(`Error: ${res.status}`);
    })
  }

  unlikeCard(cardId){
    return fetch(this._baseUrl+`cards/likes/${cardId}`,{
      method: "DELETE",
      headers: {
        authorization: this._auth,
      }
    })
    .then(res => {
      if(res.ok) return res.json()
      return Promise.reject(`Error: ${res.status}`);
    })
  }

  updateProfilePicture(avatar){
    return fetch(this._baseUrl+'users/me/avatar',{
      method: "PATCH",
      headers: {
        authorization: this._auth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          avatar
        })
    })
    .then(res => {
      if(res.ok) return res.json()
      return Promise.reject(`Error: ${res.status}`);
    })
  }
  
}

