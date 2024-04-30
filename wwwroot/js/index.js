$(document).ready(async function () {
    let session = await checkServerSession();
    if (session) {

        const offer = await GetDiscountOffer();
        if (offer.error)
        {
            $("#divSelloffer").addClass("d-none");
        }
        else{
            $("#divSelloffer").removeClass("d-none");
            //let html =`${offer.data[0].offer_title} ${offer.data[0].offer_description} - OFF ${offer.data[0].offer_value} &nbsp; <span class="badge bg-white text-orange">Shop Now</span>`;
            let html =`${offer.data[0].offer_description} &nbsp; <span class="badge bg-white text-orange">Shop Now</span>`;
            $("#spnOfferTitle").html(html);

        }

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
                                <h1 class="text-orange font-60">${value.banner_title}</h1>
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
                    var image = value.images != null ? value.images[0].image_url : "https://placehold.co/100x100/FDD1CB/white";
                    var price = value.variants.filter(x => x.product_id == value.product_id)[0] != null ? value.variants.filter(x => x.product_id == value.product_id)[0].price : 0;

                    let html = `<div class="col-6 col-lg-3 px-0">
                        <div class="card rounded-0 border-1 position-relative h-100 bg-orange-20">
                            ${value.best_seller ? '<img src="wwwroot/images/tag-bestSeller.svg" alt="best-seller" class="position-absolute best-seller-tag"></img>' : ''}
                            <!-- <img src="wwwroot/images/tag-outOfStock.svg" alt="out-of-stock" class="position-absolute out-of-stock-tag"></img> -->
                            <a href="product-page.html?product_id=${value.product_id}" style="text-decoration: none;">    
                                <img src="${image}" class="card-img-top rounded-0 img-fluid" alt="product-img">
                            </a>
                            <div class="bg-orange-20 card-footer p-2 border-0 rounded-0 bg-orange-20 d-flex align-items-center justify-content-between">
                            <div>
                            <p class="font-18 bold mb-0">${value.product_name} </p>
                            <p class="font-18 bold mb-0">&#8377&nbsp;${price}</p>
                                </div>
                                <button class="border-0 btn p-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas_prod_${value.product_id}" aria-controls="offcanvas_prod_${value.product_id}">
                                    <img src="wwwroot/images/product-add-icon.svg" alt="add-icon">
                                </button>
                            </div>
                            <div class="cart-offcanvas offcanvas offcanvas-bottom" data-bs-scroll="true" tabindex="-1" id="offcanvas_prod_${value.product_id}" aria-labelledby="offcanvasWithBothOptionsLabel">
                                <div class="d-flex justify-content-center offcanvas-header p-1 position-relative">
                                    <h6 class="d-flex align-items-center gap-1 offcanvas-title" id="offcanvasWithBothOptionsLabel">
                                        <span>
                                            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.86668 3.90386V3.07229C3.86668 2.25747 4.14413 1.47602 4.63797 0.899853C5.13182 0.323687 5.80162 0 6.50003 0C7.19843 0 7.86824 0.323687 8.36208 0.899853C8.85593 1.47602 9.13337 2.25747 9.13337 3.07229V3.90386C10.0371 3.93581 10.5905 4.04887 11.0125 4.45769C11.5975 5.02463 11.752 5.98318 12.0602 7.90111L12.5869 11.1782C13.0202 13.8753 13.2365 15.2238 12.6052 16.1119C11.9732 17 10.7969 17 8.44519 17H4.55486C2.20241 17 1.02689 17 0.394886 16.1119C-0.237117 15.2238 -0.0194271 13.8753 0.413143 11.1782L0.939812 7.90111C1.24879 5.984 1.40258 5.02463 1.98753 4.45769C2.40957 4.04887 2.96292 3.93581 3.86668 3.90386ZM4.92002 3.07229C4.92002 2.5834 5.08649 2.11453 5.3828 1.76883C5.6791 1.42313 6.08098 1.22892 6.50003 1.22892C6.91907 1.22892 7.32095 1.42313 7.61726 1.76883C7.91357 2.11453 8.08003 2.5834 8.08003 3.07229V3.89157H4.92002V3.07229ZM9.12635 7.88718C9.11501 7.80756 9.09033 7.73134 9.05374 7.66284C9.01715 7.59435 8.96935 7.53494 8.91307 7.488C8.8568 7.44106 8.79315 7.40751 8.72576 7.38927C8.65838 7.37103 8.58857 7.36845 8.52033 7.38169C8.45209 7.39492 8.38675 7.42371 8.32804 7.4664C8.26934 7.50909 8.21841 7.56486 8.17818 7.63051C8.13795 7.69617 8.10919 7.77042 8.09356 7.84904C8.07792 7.92766 8.07571 8.00911 8.08706 8.08872L8.78928 13.0044C8.80062 13.084 8.8253 13.1602 8.86189 13.2287C8.89848 13.2972 8.94628 13.3566 9.00256 13.4036C9.05883 13.4505 9.12248 13.4841 9.18987 13.5023C9.25725 13.5205 9.32706 13.5231 9.3953 13.5099C9.46354 13.4966 9.52888 13.4679 9.58759 13.4252C9.64629 13.3825 9.69722 13.3267 9.73745 13.2611C9.77768 13.1954 9.80644 13.1211 9.82207 13.0425C9.83771 12.9639 9.83992 12.8825 9.82857 12.8028L9.12635 7.88718ZM4.47973 7.38169C4.41148 7.36844 4.34167 7.371 4.27428 7.38924C4.20689 7.40747 4.14324 7.44102 4.08696 7.48796C4.03068 7.5349 3.98288 7.59432 3.94629 7.66282C3.9097 7.73132 3.88504 7.80756 3.87371 7.88718L3.17148 12.8028C3.16014 12.8825 3.16235 12.9639 3.17798 13.0425C3.19362 13.1211 3.22237 13.1954 3.26261 13.2611C3.30284 13.3267 3.35376 13.3825 3.41247 13.4252C3.47118 13.4679 3.53651 13.4966 3.60475 13.5099C3.673 13.5231 3.7428 13.5205 3.81019 13.5023C3.87758 13.4841 3.94122 13.4505 3.9975 13.4036C4.05377 13.3566 4.10157 13.2972 4.13817 13.2287C4.17476 13.1602 4.19943 13.084 4.21077 13.0044L4.913 8.08872C4.92436 8.00911 4.92216 7.92766 4.90653 7.84903C4.8909 7.7704 4.86215 7.69614 4.82191 7.63048C4.78168 7.56483 4.73075 7.50906 4.67203 7.46637C4.61332 7.42368 4.54797 7.3949 4.47973 7.38169Z" fill="white"/>
                                                </svg>
                                        </span>
                                        <span>Quick Add</span>
                                        </h6>
                                    <button type="button" class="m-0 p-2 border-0 position-absolute end-0 btn" data-bs-dismiss="offcanvas" aria-label="Close">
                                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.21875" width="20.0155" height="20" rx="10" fill="white"/>
                                        <path d="M7.32878 12.7617L9.78198 10.3104L7.34226 7.87254L8.09709 7.1183L10.5368 9.55613L12.99 7.10483L13.7718 7.88601L11.3186 10.3373L13.7583 12.7752L13.0035 13.5294L10.5638 11.0916L8.11057 13.5429L7.32878 12.7617Z" fill="#DB4834"/>
                                        </svg>
                                    </button>   
                                </div>
                                <div class="offcanvas-body">
                                    <p class="bold">Size</p>
                                    <div id="div_product_filter_${value.product_id}">
                                    
                                    </div>
                                    <div class="d-grid my-2">
                                        <button class="btn-quickAdd-cart btn" onclick="AddToCartProductFromQuick('${value.product_id}')">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    $("#divProduct").append(html);
                    if (value.variants != null) {
                        value.variants.sort((ind, val) => {
                            return ind.variant_title - val.variant_title;
                        });
                        $.each(value.variants, function (ind, val) {
                            let div = `<input type="radio" class="btn-check" name="chkVeriant" id="cartAdd_prod_${value.product_id}_${val.variant_title}" value="${val.variant_id}" autocomplete="off">
                        <label class="btn-quickAdd-size btn p-2 me-2 mb-2" for="cartAdd_prod_${value.product_id}_${val.variant_title}">${val.variant_title}</label>`;
                            $(`#div_product_filter_${value.product_id}`).append(div);
                        })
                    }
                });
            }
        }

        const newArrival = await GetNewArrivalProduct();
        if (newArrival.error) {
            $("#divNewArrival").append(result.msg);
        }
        else {
            if (newArrival.data != null) {
                $.each(newArrival.data, function (index, value) {
                    var image = value.images != null ? value.images[0].image_url : "https://placehold.co/100x100/FDD1CB/white";
                    var price = value.variants.filter(x => x.product_id == value.product_id)[0] != null ? value.variants.filter(x => x.product_id == value.product_id)[0].price : 0;
                    let html = `<div class="col-6 col-lg-3 px-0">
                    <div class="card rounded-0 border-1 position-relative h-100 bg-orange-20">
                        ${value.best_seller ? '<img src="wwwroot/images/tag-bestSeller.svg" alt="best-seller" class="position-absolute best-seller-tag"></img>' : ''}
                        <!-- <img src="wwwroot/images/tag-outOfStock.svg" alt="out-of-stock" class="position-absolute out-of-stock-tag"></img> -->
                        <a href="product-page.html?product_id=${value.product_id}" style="text-decoration: none;">    
                            <img src="${image}" class="card-img-top rounded-0 img-fluid" alt="product-img">
                        </a>
                        <div class="bg-orange-20 card-footer p-2 border-0 rounded-0 d-flex align-items-center justify-content-between">
                        <div>
                        <p class="font-18 bold mb-0">${value.product_name} </p>
                        <p class="font-18 bold mb-0">&#8377&nbsp;${price}</p>
                        </div>
                        <button class="border-0 btn p-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas_${value.product_id}" aria-controls="offcanvas_${value.product_id}">
                            <img src="wwwroot/images/product-add-icon.svg" alt="add-icon">
                        </button>
                    </div>

                        <div class="cart-offcanvas offcanvas offcanvas-bottom" data-bs-scroll="true" tabindex="-1" id="offcanvas_${value.product_id}" aria-labelledby="offcanvasWithBothOptionsLabel">
                            <div class="d-flex justify-content-center offcanvas-header p-1 position-relative">
                                <h6 class="d-flex align-items-center gap-1 offcanvas-title" id="offcanvasWithBothOptionsLabel">
                                    <span>
                                        <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.86668 3.90386V3.07229C3.86668 2.25747 4.14413 1.47602 4.63797 0.899853C5.13182 0.323687 5.80162 0 6.50003 0C7.19843 0 7.86824 0.323687 8.36208 0.899853C8.85593 1.47602 9.13337 2.25747 9.13337 3.07229V3.90386C10.0371 3.93581 10.5905 4.04887 11.0125 4.45769C11.5975 5.02463 11.752 5.98318 12.0602 7.90111L12.5869 11.1782C13.0202 13.8753 13.2365 15.2238 12.6052 16.1119C11.9732 17 10.7969 17 8.44519 17H4.55486C2.20241 17 1.02689 17 0.394886 16.1119C-0.237117 15.2238 -0.0194271 13.8753 0.413143 11.1782L0.939812 7.90111C1.24879 5.984 1.40258 5.02463 1.98753 4.45769C2.40957 4.04887 2.96292 3.93581 3.86668 3.90386ZM4.92002 3.07229C4.92002 2.5834 5.08649 2.11453 5.3828 1.76883C5.6791 1.42313 6.08098 1.22892 6.50003 1.22892C6.91907 1.22892 7.32095 1.42313 7.61726 1.76883C7.91357 2.11453 8.08003 2.5834 8.08003 3.07229V3.89157H4.92002V3.07229ZM9.12635 7.88718C9.11501 7.80756 9.09033 7.73134 9.05374 7.66284C9.01715 7.59435 8.96935 7.53494 8.91307 7.488C8.8568 7.44106 8.79315 7.40751 8.72576 7.38927C8.65838 7.37103 8.58857 7.36845 8.52033 7.38169C8.45209 7.39492 8.38675 7.42371 8.32804 7.4664C8.26934 7.50909 8.21841 7.56486 8.17818 7.63051C8.13795 7.69617 8.10919 7.77042 8.09356 7.84904C8.07792 7.92766 8.07571 8.00911 8.08706 8.08872L8.78928 13.0044C8.80062 13.084 8.8253 13.1602 8.86189 13.2287C8.89848 13.2972 8.94628 13.3566 9.00256 13.4036C9.05883 13.4505 9.12248 13.4841 9.18987 13.5023C9.25725 13.5205 9.32706 13.5231 9.3953 13.5099C9.46354 13.4966 9.52888 13.4679 9.58759 13.4252C9.64629 13.3825 9.69722 13.3267 9.73745 13.2611C9.77768 13.1954 9.80644 13.1211 9.82207 13.0425C9.83771 12.9639 9.83992 12.8825 9.82857 12.8028L9.12635 7.88718ZM4.47973 7.38169C4.41148 7.36844 4.34167 7.371 4.27428 7.38924C4.20689 7.40747 4.14324 7.44102 4.08696 7.48796C4.03068 7.5349 3.98288 7.59432 3.94629 7.66282C3.9097 7.73132 3.88504 7.80756 3.87371 7.88718L3.17148 12.8028C3.16014 12.8825 3.16235 12.9639 3.17798 13.0425C3.19362 13.1211 3.22237 13.1954 3.26261 13.2611C3.30284 13.3267 3.35376 13.3825 3.41247 13.4252C3.47118 13.4679 3.53651 13.4966 3.60475 13.5099C3.673 13.5231 3.7428 13.5205 3.81019 13.5023C3.87758 13.4841 3.94122 13.4505 3.9975 13.4036C4.05377 13.3566 4.10157 13.2972 4.13817 13.2287C4.17476 13.1602 4.19943 13.084 4.21077 13.0044L4.913 8.08872C4.92436 8.00911 4.92216 7.92766 4.90653 7.84903C4.8909 7.7704 4.86215 7.69614 4.82191 7.63048C4.78168 7.56483 4.73075 7.50906 4.67203 7.46637C4.61332 7.42368 4.54797 7.3949 4.47973 7.38169Z" fill="white"/>
                                            </svg>
                                    </span>
                                    <span>Quick Add</span>
                                    </h6>
                                <button type="button" class="m-0 p-2 border-0 position-absolute end-0 btn" data-bs-dismiss="offcanvas" aria-label="Close">
                                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.21875" width="20.0155" height="20" rx="10" fill="white"/>
                                    <path d="M7.32878 12.7617L9.78198 10.3104L7.34226 7.87254L8.09709 7.1183L10.5368 9.55613L12.99 7.10483L13.7718 7.88601L11.3186 10.3373L13.7583 12.7752L13.0035 13.5294L10.5638 11.0916L8.11057 13.5429L7.32878 12.7617Z" fill="#DB4834"/>
                                    </svg>
                                </button>   
                            </div>
                            <div class="offcanvas-body">
                                <p class="bold">Size</p>
                                <div id="div_filter_${value.product_id}">
                                
                                </div>
                                <div class="d-grid my-2">
                                    <button class="btn-quickAdd-cart btn" onclick="AddToCartProductFromQuick('${value.product_id}')">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                    $("#divNewArrival").append(html);
                    value.variants.sort((ind, val) => {
                        return ind.variant_title - val.variant_title;
                    });
                    $.each(value.variants, function (ind, val) {
                        let div = `<input type="radio" class="btn-check" name="chkVeriant" id="cartAdd_${value.product_id}_${val.variant_title}" value="${val.variant_id}" autocomplete="off">
                        <label class="btn-quickAdd-size btn p-2 me-2 mb-2" for="cartAdd_${value.product_id}_${val.variant_title}">${val.variant_title}</label>`;
                        $(`#div_filter_${value.product_id}`).append(div);
                    })
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
                    <a href="product-page.html?product_id=${value.product_id}"><img src="${image}" class="img-fluid" alt="best-seller-product"></a>
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

async function GetDiscountOffer() {
    const response = await fetch(`https://gaitondeapi.imersive.io/api/discount/getAll`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    return result;
}