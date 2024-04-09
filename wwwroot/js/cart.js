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

async function EditCartItems() {
    const data = {
        "product_id": "1",
        "variant_id": 1,
        "session_id": "d869d407-3315-4dfd-8144-c14fed80a0f4",
        "qty": 10
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
    const data = {
        "session_id": "d869d407-3315-4dfd-8144-c14fed80a0f4"
    };

    const response = await fetch('https://obmrkkuzm0.execute-api.us-east-1.amazonaws.com/default/deleteAllCartItems', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    console.log(result);
}

async function AddItemToCart() {
    const data = {
        "product_id": "1",
        "variant_id": 1,
        "session_id": "d869d407-3315-4dfd-8144-c14fed80a0f4",
        "qty": 4
    };

    const response = await fetch('https://7seegteiv0.execute-api.us-east-1.amazonaws.com/default/addItemsToCart', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    console.log(result);
}

async function DeleteItemToCart() {
    const data = {
        "product_id": "1",
        "variant_id": 1,
        "session_id": "d869d407-3315-4dfd-8144-c14fed80a0f4"
    };

    const response = await fetch('https://6ux7uee6ug.execute-api.us-east-1.amazonaws.com/default/deleteItemFromCart', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    console.log(result);
}
