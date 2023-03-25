export default class Api {
    constructor() {
    }

    getDataUserInfo() {
        const p = fetch('https://nomoreparties.co/v1/cohort-61/users/me', {
            method: 'GET',
            headers: {
                authorization: 'bcc1a74c-1889-44aa-90fb-64902ff81902',
            }
        })

        return p.then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    getDataCards() {
        const p = fetch('https://mesto.nomoreparties.co/v1/cohort-61/cards', {
            method: 'GET',
            headers: {
                authorization: 'bcc1a74c-1889-44aa-90fb-64902ff81902',
            }
        })

        return p.then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    sendDataUserInfo({ userName, userAbout }) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-61/users/me', {
            method: 'PATCH',
            headers: {
                authorization: 'bcc1a74c-1889-44aa-90fb-64902ff81902',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userName,
                about: userAbout
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    sendDataCards(name, link) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-61/cards', {
            method: 'POST',
            headers: {
                authorization: 'bcc1a74c-1889-44aa-90fb-64902ff81902',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    deleteCard(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-61/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: 'bcc1a74c-1889-44aa-90fb-64902ff81902',
                'Content-Type': 'application/json'
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    deleteOrAddLikeCard(method, id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-61/cards/${id}/likes`, {
            method: method,
            headers: {
                authorization: 'bcc1a74c-1889-44aa-90fb-64902ff81902',
                'Content-Type': 'application/json'
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    sendDataAvatar(link) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-61/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: 'bcc1a74c-1889-44aa-90fb-64902ff81902',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    avatar: link
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }
}