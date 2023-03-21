const webpush = require('web-push')
// console.log(webpush.generateVAPIDKeys());
const publicKey = 'BKZFqKFlgk-7khhOgHDr9F937ypcOcXXigjifkW8qg0S_VA8lbQHjvFXqjeK919wrohGmlaKpEJ2SCZLa8t3uT8';
const privateKey = 'y9kjEo5-eST8h_ZhOEJtK241z23LLGzIfF_t7k61J9g';

const sub = {
    endpoint: "https://fcm.googleapis.com/fcm/send/dBQ4_2mTeCE:APA91bFSvZZWyxU0rWGdLXj_WHvMKegajxyBH1YSUCxccl9OOURjAtxMLOR76jXKMvxrVX_DkPiQgY1K-oOhcYH37VJ_yk8z6QGgDI3IPnfrpTtl60o8W4MexaL-SybfJT3Vy-ePkkuB",
    expirationTime: null,
    keys: { p256dh: "BLx2IDEuEP08kJxRo2KsOyBEnvwSRGdpL3eF3yYniRRdImFy5txL7s0NLA7WhZqRKFs2ff9qjlkKfAQM8aokHlw", auth: "EjPMB6Vo491i3fyquLYZ9Q" }
}

webpush.setVapidDetails('mailto:example12@gmail.com', publicKey, privateKey)
const payload = {
    "notification": {
        "data": { url: 'https://www.youtube.com/' },
        "title": 'angular-pwa',
        "vibrate": [100, 59, 100],
    }
}
const options = {
    vapidDetails: {
        subject: 'mailto:example_email@example.com',
        publicKey: publicKey,
        privateKey: privateKey,
    },
    TTL: 60,
};

webpush.sendNotification(sub, JSON.stringify(payload), options)
    .then(() => console.log("sent.."))
    .catch((error) => console.log("error", error))