export default class UserInfo {
    constructor({ name, about, avatar }) {
        this._name = name;
        this._about = about;
        this._avatar = avatar;
    }

    getUserInfo() {
        const dataUserInfo = {
            userName: this._name.textContent,
            userAbout: this._about.textContent,
        };
        return dataUserInfo;
    }

    setUserInfo({ userName, userAbout, userAvatar}) {
        this._name.textContent = userName;
        this._about.textContent = userAbout;
        this._avatar.src = userAvatar;
    }
}