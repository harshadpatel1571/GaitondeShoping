$(document).ready(async function () {
    const result = await GetAllCartItems();
    if (!result.error) {
        if (result.data[0].products != null) {
            $.each(result.data[0].products, function (index, value) {

                let html = `<div class="d-flex align-items-center justify-content-between py-2">
                        
                <div class="d-flex align-items-center">
                    <button class="btn p-0 position-relative">
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-orange-60">
                            ${value.quantity}
                        </span>
                        <img src="${value.images}" class="rounded-0 img-fluid" alt="product-img" width="100px" height="100px">
                    </button>
                    <div class="ms-2 ms-lg-4">
                        <h5 class="mb-2 text-orange font-20 bold">${value.product_title}</h5>
                        <p class="mb-0 text-orange font-18">${value.variant_title} <span></span></p>
                    </div>
                </div>
                <div>
                    <h5 class="text-orange font-18">Rs.${value.price_per_unit}</h5>
                </div>
            </div>`
                $("#divcheakoutproductlist").append(html);
            });

            $("#spnCheakoutTotalAmount").text("Rs. " + result.data[0].total_amount + ".00");
            $("#spnCheakoutSubTotalAmount").text("Rs. " + result.data[0].total_amount + ".00");
        }
    }

    else {
        Swal.fire({
            title: result.msg,
            icon: "success"
        });
    }
});


async function GetAllCartItems() {
    var session_id = localStorage.getItem('session_id');
    var cheak_request_id = getParameterValueByName('checkout_request_id');
    if (session_id != null) {
        const response = await fetch(`https://gaitondeapi.imersive.io/api/checkout/get?session_id=${session_id}&checkout_request_id=${cheak_request_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        return result;
    }
}

$('#btn_pay_now').click(async function paynow() {
    let checkout_request = await CheckoutRequest();
    if (!checkout_request.error) {
        let payment = await CheckoutRequestCreate(checkout_request.data[0].checkout_request_id);
        console.log(payment);
        if (!payment.error) {
            Swal.fire({
                title: result.msg,
                icon: "success"
            });
        }
        else {
            Swal.fire({
                title: result.msg,
                icon: "success"
            });
        }
    }
})

async function CheckoutRequest() {
    var session_id = localStorage.getItem('session_id');
    var cart_id = getParameterValueByName('cart_id');
    const data = {
        "cart_id": cart_id,
        "session_id": session_id,
    };

    const response = await fetch('https://gaitondeapi.imersive.io/api/checkout/create', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    return result;
}

async function CheckoutRequestCreate(checkoutReqId) {
    const data = {
        "first_name": $("#txtFirstName").val(),
        "last_name": $("#txtLastName").val(),
        "phone": $("#txtPhone").val(),
        "email": $("#txtEmail").val(),
        "street_address": $("#txtAddress").val() + " " + $("#txtAddress2").val(),
        "option_data": "13",
        "city": $("#txtCity").val(),
        "state": $("#txtCity").val(),
        "country": "india",
        "is_billing": true,
        "is_shipping": true,
        "pincode": parseInt($("#txtPin").val()),
        "order_note": "Shoes orders",
        "checkout_request_id": checkoutReqId
    };

    console.log(data);

    const response = await fetch('https://gaitondeapi.imersive.io/api/order/request', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    return result;
}