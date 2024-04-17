let productId = "";
$(document).ready(async function () {
    let session = await checkServerSession();
    if (session) {
        productId = getParameterValueByName("product_id");
        if (productId != null) {
            const result = await GetSingleProductData(productId);
            if (result.error) {
                alert(result.msg);
            }
            else {
                if (result.data != null) {
                    const product = result.data;
                    var image = product.images != null ? product.images[0].image_url : "https://placehold.co/400x500/FDD1CB/white";
                    $("#imgProductMainImage").attr("src", image);
                    $("#spnProductName").text(product.product_name);

                    if (product.variants.length > 0) {
                        var checked = true;
                        $.each(product.variants, function (index, value) {
                            var size = value.variant_title;
                            let html = `<input type="radio" class="btn-check" name="options" id="${size}" value="${value.variant_id}" autocomplete="off" checked="${checked}" data-price="${value.price}">
                            <label class="btn-product-size btn p-2 me-2 mb-2" for="${size}">${size}</label>`;
                            $("#divSizeList").append(html);
                            checked = false;
                        });
                    }

                    if (product.images.length > 0) {
                        $.each(product.images, function (index, value) {
                            var image = value.image_url != null ? value.image_url : "https://placehold.co/100x100/FDD1CB/white";
                            let html = `<div>
                                        <button class="btn-product-color btn rounded-2 p-0 me-2 mb-1" type="button" onclick="changeImageUrl('${image}')">
                                            <img src="${image}" class="rounded-2 img-fluid" alt="product-color-img" style="height: 100px;width: 100px;">
                                        </button>
                                    </div>`;
                        $("#divImageSlider").append(html);
                        });
                    }

                    

                    var selectedValue = $('input[name="options"]:checked').data('price');
                    $("#spnProductPrice").text(`Rs ${selectedValue} /-`);
                }
            }
        }
    }
});

$(document).on('change', 'input[name="options"]', function () {
    var selectedValue = $('input[name="options"]:checked').data('price');
    $("#spnProductPrice").text(`Rs ${selectedValue} /-`);
});


$("#btnAddToCart").click(async function () {
    if (productId != null) {
        var size = $('input[name="options"]:checked').val();
        if (size == undefined) {
            alert("Please select size first.");
        }
        var result = await AddItemToCart(`${productId}`, size, 1);
        if (result.data.length > 0 && result != undefined) {
            alert(result.msg);
        }
    }
});

function changeImageUrl(url){
    $("#imgProductMainImage").attr("src", url);
}