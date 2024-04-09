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
                    let html = `<div class="col px-0">
                    <a href="product-page.html?product_id=${value.product_id}" style="text-decoration: none;">
                <div class="card rounded-0 border-1">
                    <img src="${value.images[0].image_url}" class="card-img-top rounded-0" alt="...">
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