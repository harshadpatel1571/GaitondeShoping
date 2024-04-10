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

function getParameterValueByName(name) {

    var url = window.location.href.toString();

    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


//-- this is for session related functions.
async function checkServerSession() {
    var session_id = localStorage.getItem('session_id');
    var shope_name = localStorage.getItem('shop_name');
    if (session_id != null) {

        const data = {
            "session_id": session_id,
            "shop": shope_name,
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
        console.log(result[0]);

        if (result.length == 0) {
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
        localStorage.setItem('shop_name', result[0].shop.trim().toLowerCase());
        return true;
    }
    else {
        return false;
    }
}

//-- This is for Product Related functions.

async function Getproductaspershop() {

    var shope_name = localStorage.getItem('shop_name');
    const data = {
        "shop": `${shope_name}`,
    };

    const response = await fetch('https://pkjnhdiqab.execute-api.us-east-1.amazonaws.com/default/getProductByShop', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    console.log(result);
    return result;
}

async function GetSingleProductData() {

    //var shope_name = localStorage.getItem('shop_name');
    const data = {
        "product_id": "a1cae3cc-7f97-4619-87d6-fc977e22955e",
    };

    const response = await fetch('https://hesclts35l.execute-api.us-east-1.amazonaws.com/default/getParticularProductData', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    return result;
}

// this is for cart related functions.
async function AddItemToCart(productId, veriantId, qtty) {
    var session_id = localStorage.getItem('session_id');
    const data = {
        "product_id": productId,
        "variant_id": veriantId,
        "session_id": session_id,
        "qty": qtty
    };

    const response = await fetch('https://7seegteiv0.execute-api.us-east-1.amazonaws.com/default/addItemsToCart', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    return result;
}