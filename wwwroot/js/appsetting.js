// $(document).ready(function () {
//     if (!checkSession()) {
//         checkServerSession();
//     }
// });

// function checkSession() {
//     if (localStorage.getItem('session')) {
//         var encryptedData = localStorage.getItem('session');
//         var decryptedData = CryptoJS.AES.decrypt(encryptedData, 'secret_key').toString(CryptoJS.enc.Utf8);
//         return true;
//     } else {
//         return false;
//     }
// }

// function createSession() {
//     var encryptedData = CryptoJS.AES.encrypt("Harshad Koradiya", 'secret_key').toString();
//     localStorage.setItem('session', encryptedData);
//     console.log('Session created');
// }

// function urlRemake() {
//     if (location.pathname.endsWith('.html')) {
//         var newPath = location.pathname.replace('.html', '');
//         history.replaceState({}, '', newPath);
//     }
// }

async function checkServerSession() {
    var session_id = localStorage.getItem('session_id');
    if (session_id != null) {

        const data = {
            "session_id": session_id,
            "shop": "   onde.com",
            "machine_ip": "sample id",
            "machine_name": "machine name",
            "last_login": "2024-04-04T14:29:02.349Z",
            "is_expired": false
        };

        const response = await fetch('https://g2ggbk0iw0.execute-api.us-east-1.amazonaws.com/default/checkSession', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (result.data == null) {
            return createServerSession();
        }
        else
        {
            return true;
        }
    }
    else
    {
        createServerSession();
    }
}


async function createServerSession() {
    debugger;
    const data = {
        "shop": "testStore@gaitonde.com ",
        "machine_ip": "sample id",
        "machine_name": "machine name",
    };

    const response = await fetch('https://0vikxt51ll.execute-api.us-east-1.amazonaws.com/default/createSession', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    if (result != null) {
        //var encryptedData = CryptoJS.AES.encrypt(result.data, 'secret_key').toString();
        localStorage.setItem('session_id', result[0].session_id);
        return true;
    }
    else {
        return false;
    }
}