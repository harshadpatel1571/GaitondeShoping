$(document).ready(async function () {
    let session = await checkServerSession();
    if (session) {
        const result = await Getproductaspershop();
        if (result.error) {
            $("#divProduct").append(result.msg);
        }
        else {
            if (result.data != null) {
                $.each(result.data.slice(0, 8), function (index, value) {
                    var image = value.images != null ? value.images[0].image_url : '';
                    let html = `<div class="col-sm-3 px-0">
                    <a href="product-page.html?product_id=${value.product_id}" style="text-decoration: none;">
                <div class="card rounded-0 border-1">
                    <img src="${image}" class="card-img-top rounded-0" alt="...">
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

        const newArrival = await GetNewArrivalProduct();
        if (newArrival.error) {
            $("#divNewArrival").append(result.msg);
        }
        else {
            if (newArrival.data != null) {
                $.each(newArrival.data.slice(0, 6), function (index, value) {
                    var image = value.images != null ? value.images[0].image_url : '';
                    let html = `<div class="col-sm-3 px-0">
                    <a href="product-page.html?product_id=${value.product_id}" style="text-decoration: none;">
                <div class="card rounded-0 border-1">
                    <img src="${image}" class="card-img-top rounded-0" alt="...">
                        <div class="card-footer border-0 rounded-0 bg-orange-20 d-flex align-items-center justify-content-between">
                            <p class="font-20 bold mb-0">${value.product_name}</p>
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
                if (bestSeller.data[0] != null) {
                    var image = bestSeller.data[0].images != null ? bestSeller.data[0].images[0].image_url : '';
                    let html = `
                    <div class="col-12 col-lg-6 px-0 border-1 d-flex">
                        <img src="${image}" class="object-fit-fill" alt="best-seller" height="100%" width="670">
                    </div>`;
                    $("#divBestSeller").append(html);
                }
                if (bestSeller.data[1] != null) {
                    var image = bestSeller.data[1].images != null ? bestSeller.data[1].images[0].image_url : '';
                    let html = `<div class="col-12 col-lg-6 d-flex text-center">
                        <div class="row" id="divSecoundBestSeller">
                            <div class="col-12 px-0 border-1">
                                <img src="${image}" class="object-fit-fill" alt="best-seller" height="450" width="500">
                            </div>
                        </div>
                    </div>`
                    $("#divBestSeller").append(html);
                }
                if (bestSeller.data[2] != null) {
                    var image = bestSeller.data[2].images != null ? bestSeller.data[2].images[0].image_url : '';
                    let html = `<div class="col-12 px-0 border-1">
                                    <img src="${image}" class="object-fit-fill" alt="best-seller" height="450" width="500">
                                </div>`
                    $("#divSecoundBestSeller").append(html);
                }
            }
        }

        const topCollection = await GetTopCollection();
        if (bestSeller.error) {
            $("#divTopCollection").append(result.msg);
        }
        else {

            if (topCollection.data != null) {
                var image = topCollection.data[0].images != null ? topCollection.data[0].images[0].image_url : '';
                let html = `<div class="col-12 col-lg-6 d-flex align-items-end justify-content-center">
                <div class="d-flex flex-column">
                    <p class="font-20">Top Selling!</p>
                    <h1 class="text-orange font-60">Top Collection</h1>
                    <p class="font-20">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incidid</p>
                    <div class="text-center my-3">
                        <button class="btn btn-1" onclick="location.href='products.html'">Shop now</button>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6 d-flex align-items-start justify-content-center">
                <img src="${image}" class="" alt="banner-img" width="600" height="500">
            </div>`;
                $("#divTopCollection").append(html);
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

    var shope_name = localStorage.getItem('shop_name');
    const response = await fetch(`https://gaitondeapi.imersive.io/api/banner/getTopCollection?top_collection=true&limit=5&shop=${shope_name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    return result;
}