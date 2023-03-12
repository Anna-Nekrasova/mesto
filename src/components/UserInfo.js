export default class UserInfo {
    constructor({ name, about }) {
        this._name = name;
        this._about = about;
    }

    getUserInfo() {
        const dataUserInfo = {
            userName: this._name.textContent,
            userAbout: this._about.textContent,
        };
        return dataUserInfo;
    }

    setUserInfo({ userName, userAbout}) {
        this._name.textContent = userName;
        this._about.textContent = userAbout;
    }
}