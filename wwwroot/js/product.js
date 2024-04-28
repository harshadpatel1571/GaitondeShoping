var data = [];
var startIndex = 8;
var itemsPerLoad = 8;

$(document).ready(async function () {
    let session = await checkServerSession();
    if (session) {
        const result = await Getproductaspershop();
        if (!result.error) {
            data = [];
            startIndex = 8;
            data = result.data;
            $("#divProductList").empty();
            BindProductDataBaisedOnResult(data.slice(0, startIndex));
        }
        else {
            $("#divProductList").empty();
            let html = "<p>No Data Found.</p>";
            $("#divProductList").append(html);
        }

        const filter = await GetFilterData();
        if (!filter.error) {
            $.each(filter.data, function (index, value) {
                let htmlTitle = `<div class="d-flex justify-content-between mb-3">
                    <h5 class="text-orange">${value.variant_type}</h5>
                    <a href="#" data-bs-toggle="offcanvas" data-bs-target="#offcanvasFor${value.variant_type}" 
                    aria-controls="offcanvasFor${value.variant_type}"><img src="wwwroot/images/next-arrow.svg"></a>
                </div>`;
                $("#divFilterByTitleCanvas").append(htmlTitle);

                let htmlOffCanvas = `<div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasFor${value.variant_type}"
                aria-labelledby="offcanvasFor${value.variant_type}Label">
                <div class="offcanvas-header border-bottom">
                  <h5 class="text-orange font-24 semibold offcanvas-title" id="offcanvasFor${value.variant_type}Label">Filter</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                  <div class="d-flex gap-3 mb-3">
                    <a href="#" data-bs-toggle="offcanvas" data-bs-target="#    "
                      aria-controls="offcanvasWithBothOptions"><img src="wwwroot/images/back-arrow.svg"></a>
                    <h5 class="text-orange">${value.variant_type}</h5>
                  </div>
  
                  <div class="px-5" id="divFilterDataFor${value.variant_type}">
                  </div>
                </div>
                <div class="offcanvas-footer border-top p-3 d-flex align-items-center justify-content-around">
                  <a class="text-orange me-3" href="products.html">Clear</a>
                  <button class="btn btn-1" onclick="GetFilterProducts()">Apply</button>
                </div>
              </div>`;

                $("#divOffCanvasFilters").append(htmlOffCanvas);

                setTimeout(function () {
                    value.titles.sort((index, val) => {
                        return index - val;
                    });
                    $.each(value.titles, function (index, val) {
                        let htmlFilter = `<div class="form-check">
                            <input class="form-check-input filterValues" type="checkbox" value="${value.variant_type}_${val}" id="chkFor${value.variant_type}">
                            <label class="text-orange form-check-label" for="chkFor${value.variant_type}">
                            ${val}
                            </label>
                        </div>`;
                        $(`#divFilterDataFor${value.variant_type}`).append(htmlFilter);
                    });
                }, 1000);
            });
        }
    }
});

async function GetFilterData() {

    const response = await fetch(`https://gaitondeapi.imersive.io/api/product/getVariantsType`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    return result;
}

async function GetFilterProducts(catagory_name) {
    var shope_name = localStorage.getItem('shop_name');
    let selectedValues = [];
    let variantTypes = [];
    let titles = [];

    $('.form-check-input:checked').each(function () {
        selectedValues.push($(this).val());
    });

    selectedValues.forEach(function (value) {
        let parts = value.split('_');
        let variantType = parts[0];
        let title = parts[1];

        if (!variantTypes.includes(variantType)) {
            variantTypes.push(variantType);
        }
        titles.push(title);
    });

    let url = "";
    if (catagory_name == undefined) {
        url = `https://gaitondeapi.imersive.io/api/product/byShop?shop=${shope_name}&variant_type=${variantTypes}&title=${titles}`
    }
    else {
        url = `https://gaitondeapi.imersive.io/api/product/byShop?shop=${shope_name}&category=${catagory_name}`
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    if (result.error) {
        data = [];
        startIndex = 8;
        data = result.data;
        $("#divProductList").empty();
        BindProductDataBaisedOnResult(data.slice(0, startIndex));
    }
    else {
        $("#divProductList").empty();
        let html = "<p>No Data Found.</p>";
        $("#divProductList").append(html);
    }

    if (catagory_name == undefined) {

        $("#divFilteredItems").removeClass('d-none');
        $.each(variantTypes, function (index, value) {
            let html = `<div class="btn-1 p-2 gap-2 rounded-5 d-flex justify-content-between align-items-center">
            <span class="text-white bold FilteredItems-head">${value}&nbsp;:&nbsp;</span>
            <span class="text-white bold FilteredItems-size">${titles}&nbsp;(${result.data.length})</span>
            <button class="btn text-white p-0 FilteredItems-cancel" onclick="filterRemove()">
            <svg width="12" height="12" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                d="M0.047515 7.11836L3.11164 4.05423L0.0643508 1.00694L1.00716 0.0641294L4.05445 3.11142L7.11858 0.0472936L8.09506 1.02377L5.03093 4.0879L8.07823 7.1352L7.13542 8.07801L4.08812 5.03071L1.024 8.09484L0.047515 7.11836Z"
                fill="white" />
            </svg>
            </button>
        </div>`;
            $("#divFilteredItems").append(html);
            $('.offcanvas').offcanvas('hide');
        });

        let removeHtml = `<a class="text-black-95 bold" href="products.html">Remove All</a>`;

        $("#divFilteredItems").append(removeHtml);
    }
}

function BindProductDataBaisedOnResult(result) {

    $.each(result, function (index, value) {
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
                                <p class="font-18 bold mb-0">${value.product_name.length > 13 ? value.product_name.substring(0, 13) + '&hellip;' : value.product_name} </p>
                                <p class="font-18 bold mb-0">&#8377&nbsp;${price}</p>
                                <!-- <lable class="font-15 bold mb-0 bg-orange-20 d-flex"> &nbsp; &nbsp; &#8377 ${price}</lable> -->
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
        $("#divProductList").append(html);
        if (value.variants != null) {
            value.variants.sort((ind, val) => {
                return ind.variant_title - val.variant_title;
            });
            $.each(value.variants, function (ind, val) {
                let div = `<input type="radio" class="btn-check" name="chkVeriant" id="cartAdd_prod_${value.product_id}_${val.variant_title}" value="${val.variant_id}" autocomplete="off">
                        <label class="btn-quickAdd-size btn p-2 me-2 mb-2" for="cartAdd_prod_${value.product_id}_${val.variant_title}">${val.variant_title}</label>`;
                $(`#div_product_filter_${value.product_id}`).append(div);
            });
        }
    });

    let seeAll = `<div class="d-flex justify-content-center mt-4" id="divSeeMore">
                            <button type="button" class="btn btn-3" onclick="pageData()">See More<svg style="margin-left: 12px;" width="24"
                                height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                d="M23.7071 8.70711C24.0976 8.31658 24.0976 7.68342 23.7071 7.29289L17.3431 0.928932C16.9526 0.538408 16.3195 0.538408 15.9289 0.928932C15.5384 1.31946 15.5384 1.95262 15.9289 2.34315L21.5858 8L15.9289 13.6569C15.5384 14.0474 15.5384 14.6805 15.9289 15.0711C16.3195 15.4616 16.9526 15.4616 17.3431 15.0711L23.7071 8.70711ZM0 9L23 9V7L0 7L0 9Z"
                                fill="#EC5B47" />
                            </svg>
                            </button>
                        </div>`;

    $("#divProductList").append(seeAll);

}

function pageData() {
    var endIndex = startIndex + itemsPerLoad;
    if (endIndex <= data.length) {
        $('#divSeeMore').remove();
        var additionalItems = data.slice(startIndex, endIndex);
        BindProductDataBaisedOnResult(additionalItems);
        startIndex = endIndex;
    } else if (startIndex < data.length) {
        $('#divSeeMore').remove();
        var additionalItems = data.slice(startIndex);
        BindProductDataBaisedOnResult(additionalItems);
        $('#divSeeMore').remove();
    } else {
        $('#divSeeMore').remove();
    }
}
