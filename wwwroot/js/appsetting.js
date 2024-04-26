$(document).ready(async function () {
    setTimeout(function () {
        $('.imprzd-watermark').remove();
    }, 1000);

    const result = await GetAllCartItems();
    if (result.error) {
        $("#spnCartCount").text(0);
    }
    else {
        $("#spnCartCount").text(result.data[0].total_items);
    }
});

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
    if (session_id != null) {
        const response = await fetch(`https://gaitondeapi.imersive.io/api/session/check?session_id=${session_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        if (result.length == 0) {
            return createServerSession();
        }
        else {
            return true;
        }
    }
    else {
        return await createServerSession();
    }
}

async function createServerSession() {
    const data = {
        "shop": "teststore@gaitonde.com",
        "machine_ip": "sample id",
        "machine_name": "machine name",
    };

    const response = await fetch('https://gaitondeapi.imersive.io/api/session/create', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    if (result != null) {
        //var encryptedData = CryptoJS.AES.encrypt(result.data, 'secret_key').toString();
        localStorage.setItem('session_id', result.data.session_id);
        localStorage.setItem('shop_name', result.data.shop.trim().toLowerCase());
        return true;
    }
    else {
        return false;
    }
}

//-- This is for Product Related functions.

async function Getproductaspershop() {

    var shope_name = localStorage.getItem('shop_name');

    const response = await fetch(`https://gaitondeapi.imersive.io/api/product/byShop?shop=${shope_name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    return result;
}

async function GetSingleProductData(productId) {

    //var shope_name = localStorage.getItem('shop_name');
    const response = await fetch(`https://gaitondeapi.imersive.io/api/product/byId?product_id=${productId}`, {
        method: 'GET',
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

    const response = await fetch('https://gaitondeapi.imersive.io/api/cart/addItems', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    return result;
}

async function GetAllCartItems() {
    var session_id = localStorage.getItem('session_id');
    const response = await fetch(`https://gaitondeapi.imersive.io/api/cart/get?session_id=${session_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    return result;
}

$('#phone_number').on('input', function () {
    $(this).val($(this).val().replace(/\D/g, ''));
});

$("#btnContactUs").click(async function () {
    var form = $('#myForm')[0];
    if (form.checkValidity()) {

        var session_id = localStorage.getItem('session_id');
        var formData = {};
        $('#myForm').find('input, textarea').each(function () {
            formData[$(this).attr('id')] = $(this).val();
        });
        formData["session_id"] = session_id;

        const response = await fetch('https://gaitondeapi.imersive.io/api/customer/request', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        if (!result.error) {
            window.location.reload();
        }
    } else {
        alert('Please fill out all required fields.');
    }
});

async function AddToCartProductFromQuick(product_id) {
    var result = await AddItemToCart(`${product_id}`, $('input[name="chkVeriant"]:checked').val(), 1);
    if (result.data.length > 0 && result != undefined) {
        const result = await GetAllCartItems();
        if (result.error) {
            $("#spnCartCount").text(0);
        }
        else {
            Swal.fire({
                title: "Products added!",
                icon: "success",
                confirmButtonColor: "#DB4834",
            });
            $("#spnCartCount").text(result.data[0].total_items);
            $('.offcanvas').offcanvas('hide');
        }
    }
}

// $("#btnAddToCart").click(async function () {
//     if (productId != null) {
//         var size = $('input[name="options"]:checked').val();
//         if (size == undefined) {
//             alert("Please select size first.");
//         }
//         var result = await AddItemToCart(`${productId}`, size, 1);
//         if (result.data.length > 0 && result != undefined) {
//             const result = await GetAllCartItems();
//             if (result.error) {
//                 $("#spnCartCount").text(0);
//             }
//             else {
//                 $("#spnCartCount").text(result.data[0].total_items);
//             }
//         }
//     }
// });

function AddtoCartSweetAlert() {
    $("#btnAddToCart").click(function () {
        Swal.fire({
            title: "Products added!",
            icon: "success",
            confirmButtonColor: "#DB4834",
        });
    });

}