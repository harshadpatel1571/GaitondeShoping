$(document).ready(async function () {
    let session = await checkServerSession();
    if (session) {
        const result = await Getproductaspershop();
        if (result.error) {
            $("#divProduct").append(result.msg);
        }
        else {
            if (result.data != null) {
                $.each(result.data.slice(0, 6), function (index, value) {
                    let html = `<div class="col-6 col-lg-3 px-0">
                    <a href="product-page.html?product_id=${value.product_id}" style="text-decoration: none;">
                <div class="card rounded-0 border-1">
                    <img src="${value.images[0].image_url}" class="card-img-top rounded-0 img-fluid" alt="product-img">
                        <div class="card-footer border-0 rounded-0 bg-orange-20 d-flex align-items-center justify-content-between">
                            <p class="font-20 bold mb-0">${value.product_name}</p>
                            <img src="wwwroot/images/product-add-icon.svg" alt="add-icon">
                        </div>
                    </div>
                </a>
                </div>`;
                    $("#divProduct").append(html);
                });
            }
        }
    }
});

async function EditCartItems() {
    const data = {
        "product_id": "1",
        "variant_id": 1,
        "session_id": "60987207-7a3d-40f4-bf75-7ade491171dd",
        "qty": 10,
        "shop": "testStore@gaitonde.com",
        "machine_ip": "sample id",
        "machine_name": "machine name",
        "last_login": "2024-04-04T14:29:02.349Z",
        "is_expired": false
    };

    const response = await fetch('https://agc7k8pd00.execute-api.us-east-1.amazonaws.com/default/editCartItems', {
        method: 'GET',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    console.log(result);
}