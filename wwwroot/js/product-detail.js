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