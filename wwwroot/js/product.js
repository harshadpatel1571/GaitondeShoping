$(document).ready(async function () {
    let session = await checkServerSession();
    if (session) {
        // const result = await Getproductaspershop();
        // if (result.error) {
        //     $("#divProductList").append(result.msg);
        // }
        // else {
        //     if (result.data != null) {
        //         $.each(result.data.slice(0, 24), function (index, value) {
        //             var image = value.images != null ? value.images[0].image_url : '';
        //             var price = value.variants.filter(x => x.product_id == value.product_id)[0] != null ? value.variants.filter(x => x.product_id == value.product_id)[0].price : 0;
        //             let html = `<div class="col-sm-3 px-0">
        //                             <a href="product-page.html?product_id=${value.product_id}" style="text-decoration: none;">
        //                             <div class="card rounded-0 border-1">
        //                                 <img src="${image}" class="card-img-top rounded-0" alt="">
        //                                 <div
        //                                 class="card-footer border-0 rounded-0 bg-orange-20 d-flex align-items-center justify-content-between">
        //                                 <p class="font-20 bold mb-0">${value.product_name}</p><br>
        //                                 <p class="font-20 bold mb-0">&#8377 ${price}</p>
        //                                 <button class="btn p-0" onclick="">
        //                                     <img src="wwwroot/images/product-add-icon.svg" alt="add-icon">
        //                                 </button>
        //                                 </div>
        //                             </div>
        //                             </a>
        //                         </div>`;
        //             $("#divProductList").append(html);
        //         });

        //         let seeAll = `<div class="d-flex justify-content-center mt-4">
        //                         <button type="button" class="btn btn-3">See More<svg style="margin-left: 12px;" width="24"
        //                             height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                             <path
        //                             d="M23.7071 8.70711C24.0976 8.31658 24.0976 7.68342 23.7071 7.29289L17.3431 0.928932C16.9526 0.538408 16.3195 0.538408 15.9289 0.928932C15.5384 1.31946 15.5384 1.95262 15.9289 2.34315L21.5858 8L15.9289 13.6569C15.5384 14.0474 15.5384 14.6805 15.9289 15.0711C16.3195 15.4616 16.9526 15.4616 17.3431 15.0711L23.7071 8.70711ZM0 9L23 9V7L0 7L0 9Z"
        //                             fill="#EC5B47" />
        //                         </svg>
        //                         </button>
        //                     </div>`;

        //         $("#divProductList").append(seeAll);
        //     }
        // }

        //const filter = await GetFilterData();
        const filter = {
            "error": false,
            "msg": "Variant type mentioned below!",
            "data": [
                {
                    "variant_type": "size",
                    "titles": [
                        "10",
                        "11",
                        "12",
                        "6",
                        "7",
                        "8",
                        "9"
                    ]
                },
                {
                    "variant_type": "size-2",
                    "titles": [
                        "10",
                        "11",
                        "12",
                        "6",
                        "7",
                        "8",
                        "9"
                    ]
                },
                {
                    "variant_type": "size-3",
                    "titles": [
                        "10",
                        "11",
                        "12",
                        "6",
                        "7",
                        "8",
                        "9"
                    ]
                }
            ]
        }

        if (!filter.error) {
            console.log(filter.data);
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
                    <a href="#" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions"
                      aria-controls="offcanvasWithBothOptions"><img src="wwwroot/images/back-arrow.svg"></a>
                    <h5 class="text-orange">${value.variant_type}</h5>
                  </div>
  
                  <div class="px-5" id="divFilterDataFor${value.variant_type}">
                  </div>
                </div>
                <div class="offcanvas-footer border-top p-3 d-flex align-items-center justify-content-around">
                  <a class="text-orange me-3" href="#">Clear</a>
                  <button class="btn btn-1">Apply</button>
                </div>
              </div>`;

                $("#divOffCanvasFilters").append(htmlOffCanvas);

                setTimeout(function () {
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

function GetFilterProducts() {

    let selectedValues = [];

    $('.form-check-input:checked').each(function () {
        selectedValues.push($(this).val());
    });

    selectedValues.forEach(function (value) {
        let parts = value.split('_');
        let variantType = parts[0];
        let title = parts[1];

        console.log(variantType);
        console.log(title);

        // // Construct the API URL
        // let apiUrl = `https://gaitondeapi.imersive.io/api/product/byShop?shop=teststore@gaitonde.com&variant_type=${variantType}&title=${title}`;
        
    });
}
