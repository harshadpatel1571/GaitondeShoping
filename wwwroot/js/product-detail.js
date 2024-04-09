$(document).ready(async function () {
    let session = await checkServerSession();
    if (session) {
        const result = await GetSingleProductData();
        if (result.error) {
            //$("#divProductList").append(result.msg);
            alert(result.msg);
        }
        else {
            if (result.data != null) {
                console.log(result.data);
            }
        }
    }
});

$("#btnAddToCart").click(async function () {
    var result = await AddItemToCart("1",4,1);
    if(result.length > 0 && (result != undefined || result != null))
    {
        alert("item added to cart");
    }
});