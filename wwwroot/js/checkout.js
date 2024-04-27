$(document).ready(async function () {
    const result = await GetAllCartItems();
    bindCheckoutData(result);

    $("#yourForm").validate({
        rules: {
            first_name: {
                required: true,
            },
            last_name: {
                required: true,
            },
            Address: {
                required: true,
            },
            city: {
                required: true,
            },
            state: {
                required: true,
            },
            pincode: {
                required: true,
                digits: true
            },
            phone_number: {
                required: true,
                digits: true
            },
            Email_address: {
                required: true,
                email: true
            },
            // Add other rules for firstname, lastname, email, etc.
        },
        messages: {
            first_name: {
                required: "Please enter a Name",
            },
            last_name: {
                required: "Please enter a Last Name",
            },
            Address: {
                required: "Please enter a Valid Address",
            },
            city: {
                required: "Please enter a City Name",
            },
            state: {
                required: "Please enter a State Name",
            },
            pincode: {
                required: "Please enter a Only Number",
            },
            phone_number: {
                required: "Please enter a Only Phone Number",
            },
            Email_address: {
                required: "Please enter a Valid Email Address",
            },
            // Add other messages
        },
    });

});


async function GetAllCartItems(pincode) {
    var session_id = localStorage.getItem('session_id');
    var cheak_request_id = getParameterValueByName('checkout_request_id');
    if (session_id != null) {

        var url = "";
        if (pincode == undefined) {
            url = `https://gaitondeapi.imersive.io/api/checkout/get?session_id=${session_id}&checkout_request_id=${cheak_request_id}`;
        }
        else {
            url = `https://gaitondeapi.imersive.io/api/checkout/get?session_id=${session_id}&checkout_request_id=${cheak_request_id}`;
        }
        const response = await fetch(url, {
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

    if (!$("#yourForm").valid()) {
        return;
    }

    var session_id = localStorage.getItem('session_id');
    var cheak_request_id = getParameterValueByName('checkout_request_id');

    if (session_id = null) { return }

    // Assuming you retrieve the total amount and other details required for the payment dynamically
    let totalAmount = $("#spnCheakoutTotalAmount").text().replace("Rs. ", "").replace(".00", "") + "00"; // Convert to paise

    const data = {
        "first_name": $("#txtFirstName").val(),
        "last_name": $("#txtLastName").val(),
        "phone": $("#txtPhone").val(),
        "email": $("#txtEmail").val(),
        "street_address": $("#txtAddress").val(),
        "option_data": $("#txtAddress2").val(),
        "city": $("#txtCity").val(),
        "state": $("#txtCity").val(),
        "country": "india",
        "is_billing": true,
        "is_shipping": true,
        "pincode": parseInt($("#txtPin").val()),
        "order_note": "Shoes orders",
        "checkout_request_id": cheak_request_id
    };

    const response = await fetch('https://gaitondeapi.imersive.io/api/order/request', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    const razorpay_order_id = result.data.razorpay_order_id


    // If CheckoutRequest is successful, configure Razorpay payment options
    var options = {
        "key": "rzp_test_1SHB78pdDfDeda", // Enter the Key ID generated from the Dashboard
        "amount": totalAmount, // Amount in paise
        "currency": "INR",
        "name": $("#txtFirstName").val(),
        "description": "Order Transaction",
        "image": "https://gaitonde.imersive.io/wwwroot/images/gaitonde-logo.svg",
        "order_id": razorpay_order_id, //This is a sample Order ID.
        "handler": async function (paymentResponse) {
            // Handle payment success, proceed further as required

            const data_create = {
                "payload": {
                    "payment": {
                        "entity": {
                            "order_id": paymentResponse.razorpay_order_id,
                            "id": paymentResponse.razorpay_payment_id,
                            "status": "paid"
                        }
                    }
                }
            };
            const response_create = await fetch('https://gaitondeapi.imersive.io/api/webhook/order/update', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result_create = await response_create.json();
            await DeleteAllCartItems();
            window.location = "index.html";
        },
        "prefill": {
            "name": $("#txtFirstName").val(),
            "email": $("#txtEmail").val(),
            "contact": $("#txtPhone").val()
        },
        "notes": {
            "Session": session_id,
            "CheckoutrequestID": cheak_request_id
        },
        "theme": {
            "color": "#DB4834"
        }
    };
    var paymentGateway = new Razorpay(options);
    paymentGateway.open();
});

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
        "state": $("#txtstate").val(),
        "country": "india",
        "is_billing": true,
        "is_shipping": true,
        "pincode": parseInt($("#txtPin").val()),
        "order_note": "Shoes orders",
        "checkout_request_id": checkoutReqId
    };

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

function bindCheckoutData(result) {
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

            if ($("#txtPin").val() == "") {
                $("#spnAllText").text("Including all taxes");
            }
            else {
                let gstString = "";
                let tax = result.data[0].tax_calculation[0];

                if (tax.igst > 0) {
                    gstString = `Including all taxes (IGST : Rs. ${tax.igst})`;
                }
                else {
                    gstString = `Including all taxes (CGST : Rs. ${tax.cgst} and SGST : Rs. ${tax.sgst})`;
                }

                $("#spnAllText").text(gstString);
            }
        }
    }
}

$("#txtPin").focusout(async function () {
    const result = await GetAllCartItems($("#txtPin").val());
    if (!result.error) {
        $("#divcheakoutproductlist").empty();
        bindCheckoutData(result);
    }
});