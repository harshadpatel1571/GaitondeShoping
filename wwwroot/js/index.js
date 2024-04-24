$(document).ready(async function () {
    let session = await checkServerSession();
    if (session) {

        const topCollection = await GetTopCollection();
        console.log(topCollection);
        if (topCollection.error) {
            $("#divTopCollection").append(result.msg);
        }
        else {
            if (topCollection.data != null) {
                let active = "active";
                $.each(topCollection.data, function (index, value) {
                    let html = `<div class="carousel-item ${active}">
                        <div class="col-12 col-lg-6 d-flex align-items-center justify-content-center">
                            <div class="d-flex flex-column">
                                <h1 class="text-orange font-60">Top Collection</h1>
                                <p class="font-20">${value.banner_description}</p>
                                <div class="text-center my-3">
                                    <button class="btn btn-1" onclick="location.href='product-page.html?product_id=${value.product_id}'">Shop now</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-6 d-flex align-items-start justify-content-center">
                            <img src="${value.banner_url}" class="img-fluid" alt="banner-img">
                        </div>
                    </div>`;
                    $("#divTopCollection").append(html);
                    active = "";
                });
            }
        }

        const result = await Getproductaspershop();
        if (result.error) {
            $("#divProduct").append(result.msg);
        }
        else {
            if (result.data != null) {
                $.each(result.data.slice(0, 8), function (index, value) {
                    var image = value.images != null ? value.images[0].image_url : '';
                    var price = value.variants.filter(x => x.product_id == value.product_id)[0] != null ? value.variants.filter(x => x.product_id == value.product_id)[0].price : 0;
                    let html = `<div class="col-sm-3 px-0">
                    <a href="product-page.html?product_id=${value.product_id}" style="text-decoration: none;">
                        <div class="card rounded-0 border-1">
                            <div class="card-body p-0">
                                <img src="${image}" class="card-img-top rounded-0" alt="...">
                                <lable class="font-15 bold mb-0 bg-orange-20 d-flex"> &nbsp; &nbsp; &#8377 ${price}</lable>
                            </div>
                            <div class="card-footer border-0 rounded-0 bg-orange-20 d-flex align-items-center justify-content-between">
                                <lable class="font-15 bold mb-0">${value.product_name}</lable>
                                <img src="wwwroot/images/product-add-icon.svg" alt="add-icon">
                            </div>
                        </div>
                    </a>
                    </div>`;
                    $("#divProduct").append(html);
                });
            }
        }

        const newArrival = await GetNewArrivalProduct();
        if (newArrival.error) {
            $("#divNewArrival").append(result.msg);
        }
        else {
            if (newArrival.data != null) {
                $.each(newArrival.data.slice(0, 6), function (index, value) {
                    var image = value.images != null ? value.images[0].image_url : '';
                    var price = value.variants.filter(x => x.product_id == value.product_id)[0] != null ? value.variants.filter(x => x.product_id == value.product_id)[0].price : 0;
                    let html = `<div class="col-sm-3 px-0">
                    <a href="product-page.html?product_id=${value.product_id}" style="text-decoration: none;">
                <div class="card rounded-0 border-1">
                    <img src="${image}" class="card-img-top rounded-0" alt="...">
                        <div class="card-footer border-0 rounded-0 bg-orange-20 d-flex align-items-center justify-content-between">
                            <p class="font-15 bold mb-0">${value.product_name}</p><br/>
                            <p class="font-15 bold mb-0">&#8377 ${price}</p>
                            <img src="wwwroot/images/product-add-icon.svg" alt="add-icon">
                        </div>
                    </div>
                </a>
                </div>`;
                    $("#divNewArrival").append(html);
                });
            }
        }

        const bestSeller = await GetBestSeller();

        if (bestSeller.error) {
            $("#divBestSeller").append(result.msg);
        }
        else {
            if (bestSeller.data != null) {
                let active = "active";
                $.each(bestSeller.data, function (index, value) {
                    var image = value.images != null ? value.images[0].image_url : 'https://gaitonde.imersive.io/liveassets/a1cae3cc-7f97-4619-87d6-fc977e22955e/28122020143343.png';
                    let html = `<div class="carousel-item ${active}">
                    <img src="${image}" class="w-100" alt="best-seller-product">
                    </div>`;
                    $("#divBestSeller").append(html);
                    active = "";
                });
            }
        }

    }
});

async function GetNewArrivalProduct() {

    var shope_name = localStorage.getItem('shop_name');
    const response = await fetch(`https://gaitondeapi.imersive.io/api/banner/getNewArrival?new_arrival=true&limit=4&shop=${shope_name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    return result;
}

async function GetBestSeller() {

    var shope_name = localStorage.getItem('shop_name');
    const response = await fetch(`https://gaitondeapi.imersive.io/api/banner/getBestSeller?new_arrival=false&limit=5&shop=${shope_name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    return result;
}

async function GetTopCollection() {
    const response = await fetch(`https://gaitondeapi.imersive.io/api/banner/getAll`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    return result;
}