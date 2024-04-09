$(document).ready(async function () {
    let session = await checkServerSession();
    if (session) {
        const result = await Getproductaspershop();
        if (result.error) {
            $("#divProductList").append(result.msg);
        }
        else {
            if (result.data != null) {
                console.log(result.data);
                $.each(result.data.slice(0, 6), function (index, value) {
                    let html = `<div class="col px-0">
                                    <a href="product-page.html?product_id=${value.product_id}" style="text-decoration: none;">
                                    <div class="card rounded-0 border-1">
                                        <img src="${value.images[0].image_url}" class="card-img-top rounded-0" alt="">
                        
                                        <div
                                        class="card-footer border-0 rounded-0 bg-orange-20 d-flex align-items-center justify-content-between">
                                        <p class="font-20 bold mb-0">${value.product_name}</p>
                                        <button class="btn p-0" onclick="">
                                            <img src="wwwroot/images/product-add-icon.svg" alt="add-icon">
                                        </button>
                                        </div>
                                    </div>
                                    </a>
                                </div>`;
                    $("#divProductList").append(html);
                });

                let seeAll = `<div class="d-flex justify-content-center mt-4">
                                <button type="button" class="btn btn-3">See More<svg style="margin-left: 12px;" width="24"
                                    height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                    d="M23.7071 8.70711C24.0976 8.31658 24.0976 7.68342 23.7071 7.29289L17.3431 0.928932C16.9526 0.538408 16.3195 0.538408 15.9289 0.928932C15.5384 1.31946 15.5384 1.95262 15.9289 2.34315L21.5858 8L15.9289 13.6569C15.5384 14.0474 15.5384 14.6805 15.9289 15.0711C16.3195 15.4616 16.9526 15.4616 17.3431 15.0711L23.7071 8.70711ZM0 9L23 9V7L0 7L0 9Z"
                                    fill="#EC5B47" />
                                </svg>
                                </button>
                            </div>`;

                $("#divProductList").append(seeAll);
            }
        }
    }
});