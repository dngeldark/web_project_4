export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
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
}
