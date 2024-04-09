$(document).ready(async function () {
    let session = await checkServerSession();
    if (session) {
        const result = await GetAllCartItems();
        if (result.error) {
            $("#divProduct").append(result.msg);
        }
        else {
            if (result.data != null) {
                $.each(result.data.slice(0, 3), function (index, value) {
                    let html = `<div class="col px-0">
                        <div class="d-flex align-items-center justify-content-between border-bottom py-4">
                            <div class="d-flex align-items-center">
                                <button class="btn p-0">
                                    <img src="${value.images[0].image_url}" class="rounded-0 img-fluid" alt="product-color-img">
                                </button>
                                <div class="ms-4">
                                    <h4 class="mb-2 text-orange semibold font-30">${value.product_name}</h4>
                                    <p class="mb-0 text-orange semibold font-24">${value.product_size}<span>6</span></p>
                                </div>
                            </div>
                            <div>
                                <h4 class="text-orange semibold font-35">${value.product_price}</h4>
                                <div class="border-orange d-flex justify-content-between align-items-center">
                                    <button class="btn decrement" onclick="decrementQuantity()">-</button>
                                    <span class="text-orange quantity">${value.product_qty}</span>
                                    <button class="btn increment" onclick="incrementQuantity()">+</button>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    $("#divProduct").append(html);
                });
            }
        }
    }
});

$(".increment").click(async function () {
    var quantityElement = $(this).siblings(".quantity");
    var currentQuantity = parseInt(quantityElement.text());
    var newQtty = currentQuantity + 1;
    quantityElement.text(newQtty);
    let id = quantityElement[0].id;
    await EditCartItems(`${id}`, 4, newQtty);
});

$(".decrement").click(async function () {
    var quantityElement = $(this).siblings(".quantity");
    var currentQuantity = parseInt(quantityElement.text());
    if (currentQuantity > 1) {
        var newQtty = currentQuantity - 1;
        quantityElement.text(currentQuantity - 1);
        let id = quantityElement[0].id;
        await EditCartItems(`${id}`, 4, newQtty);
    }
    else {
        let id = quantityElement[0].id;
        console.log(quantityElement);
        if (id > 0) {
            alert(id);
            let response = await DeleteItemToCart(`${id}`, 4);
            console.log(response);
            if (response.length > 0) {
                alert("Item removed from cart");
            }
        }
    }
});

$("#btnEmptyCart").click(async function () {
    let result = await DeleteAllCartItems();
    if (result.length > 0 && (result != undefined || result != null)) {
        alert("cart are empty.");
    }
});

async function GetAllCartItems() {
    const data = {
        "session_id": "60987207-7a3d-40f4-bf75-7ade491171dd",
    };

    const response = await fetch('https://ckdsvy7303.execute-api.us-east-1.amazonaws.com/default/getCartdetails', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    console.log(result);
}

async function EditCartItems(productId, veriantId, qtty) {
    var session_id = localStorage.getItem('session_id');
    const data = {
        "product_id": productId,
        "variant_id": veriantId,
        "session_id": session_id,
        "qty": qtty
    };

    const response = await fetch('https://crjdjof3kf.execute-api.us-east-1.amazonaws.com/default/editCartItems', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    console.log(result);
}

async function DeleteAllCartItems() {

    var session_id = localStorage.getItem('session_id');

    const data = {
        "session_id": session_id
    };

    const response = await fetch('https://obmrkkuzm0.execute-api.us-east-1.amazonaws.com/default/deleteAllCartItems', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    return result;
}

async function DeleteItemToCart(productId, veriantId) {
    var session_id = localStorage.getItem('session_id');
    const data = {
        "product_id": productId,
        "variant_id": veriantId,
        "session_id": session_id
    };

    const response = await fetch('https://6ux7uee6ug.execute-api.us-east-1.amazonaws.com/default/deleteItemFromCart', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    return result;
}
