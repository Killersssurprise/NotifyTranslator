const notifier = require('node-notifier');
const {promisify} = require('util');
const exec = promisify(require('child_process').exec)
var request = require('request');
const path = require("path");


// Getting X11Clipboard (selected text, not ctrl+C)
async function getX11Clip() {
    // Exec output contains both stderr and stdout outputs
    let clip = await exec('xclip -o');
    // console.log("clip: " + clip.stdout);
    return clip.stdout.trim();
}

async function makeNotification(text) {

    notifier.notify(
        {
            title: 'Translator',
            message: text,
            icon: path.join(__dirname+'/../res', 'translate.png'), // Absolute path (doesn't work on balloons)
            sound: true, // Only Notification Center or Windows Toasters
            wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
        },
        function (err, response, metadata) {
            // Response is response from notification
            // Metadata contains activationType, activationAt, deliveredAt
        }
    );

}

async function makeGoogleTranslate() {

    let clipText = await getX11Clip();
    let sourceLang = 'en';
    let targetLang = 'ru';

    let url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + clipText + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(clipText);

    let headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/110.0',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://cdpn.io/',
        'Origin': 'https://cdpn.io',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site'
    };

    const options = {
        url: url,
        headers: headers,
        gzip: true
    };

    async function callback(error, response, body) {
        if (!(!error && response.statusCode === 200)) {
            return error;
        } else {
            // console.log(JSON.parse(body)[0][0][0])
            await makeNotification(JSON.parse(body)[0][0][0]);
        }
    }

    await request(options, callback);

}

makeGoogleTranslate();