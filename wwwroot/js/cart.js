$(document).ready(async function () {
    let session = await checkServerSession();
    if (session) {
        const result = await GetAllCartItems();
        if (result.error) {
            $("#divCartList").append(result.msg);
        }
        else {
            if (result.data != null) {
                // $.each(result.data, function (index, value) {
                //     //console.log(value.products);
                //     // let html = `<div class="col px-0">
                //     //     <div class="d-flex align-items-center justify-content-between border-bottom py-4">
                //     //         <div class="d-flex align-items-center">
                //     //             <button class="btn p-0">
                //     //                 <img src="${value.images[0].image_url}" class="rounded-0 img-fluid" alt="product-color-img">
                //     //             </button>
                //     //             <div class="ms-4">
                //     //                 <h4 class="mb-2 text-orange semibold font-30">${value.product_name}</h4>
                //     //                 <p class="mb-0 text-orange semibold font-24">${value.product_size}<span>6</span></p>
                //     //             </div>
                //     //         </div>
                //     //         <div>
                //     //             <h4 class="text-orange semibold font-35">${value.product_price}</h4>
                //     //             <div class="border-orange d-flex justify-content-between align-items-center">
                //     //                 <button class="btn decrement" onclick="decrementQuantity()">-</button>
                //     //                 <span class="text-orange quantity">${value.product_qty}</span>
                //     //                 <button class="btn increment" onclick="incrementQuantity()">+</button>
                //     //             </div>
                //     //         </div>
                //     //     </div>
                //     // </div>`;
                //     // $("#divCartList").append(html);
                // });
                var cartData = result.data[0];
                if (cartData != null) {
                    $.each(cartData.products, function (index, value) {
                        let html = `<div class="d-flex gap-3 align-items-center justify-content-between border-bottom py-4">
                                    <div class="d-flex align-items-center">
                                        <button class="btn p-0">
                                            <img src="${value.images}" class="rounded-0 img-fluid"
                                                alt="product-color-img" height="150" width="150">
                                        </button>
                                        <div class="ms-2 ms-lg-4">
                                            <h4 class="mb-2 text-orange semibold font-30">${value.product_title}</h4>
                                            <p class="mb-0 text-orange semibold font-24">Size : <span>${value.variant_title}</span></p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 class="text-orange semibold font-35">Rs. ${value.total_price}</h4>
                                        <div class="border-orange d-flex justify-content-between align-items-center">
                                            <button class="btn decrement">-</button>
                                            <span class="text-orange quantity" id="${value.variant_id}">${value.quantity}</span>
                                            <input type="hidden" id="dhn_prod_${value.variant_id}" value="${value.product_id}">
                                            <button class="btn increment">+</button>
                                        </div>
                                    </div>
                                </div>`;
                        $("#divCartList").append(html);
                    });
                    $("#divCheckoutDetail").removeClass("d-none");
                    $("#spnCartTotalAmount").text(cartData.total_amount);
                    $("#hdnCartId").val(cartData.cart_id);
                }
            }
        }
    }
});

$(document).on('click', '.increment', async function () {
    var quantityElement = $(this).siblings(".quantity");
    var currentQuantity = parseInt(quantityElement.text());
    var newQtty = currentQuantity + 1;
    quantityElement.text(newQtty);
    let id = quantityElement[0].id;
    let productId = $(`#dhn_prod_${id}`).val();
    let response = await EditCartItems(`${productId}`, id, newQtty);
});

$(document).on('click', '.decrement', async function () {
    var quantityElement = $(this).siblings(".quantity");
    var currentQuantity = parseInt(quantityElement.text());
    if (currentQuantity > 1) {
        var newQtty = currentQuantity - 1;
        quantityElement.text(currentQuantity - 1);
        let id = quantityElement[0].id;
        let productId = $(`#dhn_prod_${id}`).val();
        await EditCartItems(`${productId}`, id, newQtty);
    } else {
        let id = quantityElement[0].id;
        if (id > 0) {
            alert(id);
            let response = await DeleteItemToCart(`${id}`, 4);
            if (response.length > 0) {
                alert("Item removed from cart");
            }
        }
    }
});


$("#btnEmptyCart").click(async function () {
    let result = await DeleteAllCartItems();
    if (result.data.length > 0 && (result != undefined || result != null)) {
        alert("cart are empty.");
        window.location.reload();
    }
});

async function EditCartItems(productId, veriantId, qtty) {
    var session_id = localStorage.getItem('session_id');
    const data = {
        "product_id": productId,
        "variant_id": veriantId,
        "session_id": session_id,
        "qty": qtty
    };

    const response = await fetch('https://gaitondeapi.imersive.io/api/cart/edit', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    return result;
}

async function DeleteAllCartItems() {

    var session_id = localStorage.getItem('session_id');

    const data = {
        "session_id": session_id
    };

    const response = await fetch('https://gaitondeapi.imersive.io/api/cart/deleteAllItems', {
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

    const response = await fetch('https://gaitondeapi.imersive.io/api/cart/deleteItem', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    return result;
}

async function CheckoutRequest(cartId) {
    var session_id = localStorage.getItem('session_id');
    const data = {
        "session_id": session_id,
        "cart_id": cartId
    };

    const response = await fetch(`https://gaitondeapi.imersive.io/api/checkout/create`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    return result;
}

$("#btnCheckoutRequest").click(async function () {
    let cartId = $("#hdnCartId").val();
    if (cartId != null) {
        let response = await CheckoutRequest(cartId);
        if(response.error)
        {
            alert(response.msg);
            return false;
        }
        else
        {
            window.location = `checkout.html?checkout_request_id=${response.data[0].checkout_request_id}`;
        }
    }
    else {
        alert("Error for checkout.");
    }
});
