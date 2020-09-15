export default class UserInfo {
  constructor({ nameSelector, jobSelector,avatarSelector }) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this.__avatarSelector = avatarSelector
  }

  getUserInfo() {
    const name = document.querySelector(this._nameSelector).textContent.trim();
    const job = document.querySelector(this._jobSelector).textContent.trim();
    return { name, job };
  }

  setUserInfo(name, job) {
    document.querySelector(this._nameSelector).textContent = name;
    document.querySelector(this._jobSelector).textContent = job;
  }

  setUserAvatar(avatar){
    document.querySelector(this.__avatarSelector).src = avatar;
  }

}
