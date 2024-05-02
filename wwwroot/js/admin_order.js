let columns = [];
document.addEventListener("DOMContentLoaded", function () {
    columns = [
        { data: "order_id", name: "Order Id", "autoWidth": true, type: "string", className: 'dt-center' },
        { data: "customer_details.name", name: "Customer Name", type: "string", "autoWidth": true, },
        {
            data: null,
            name: "Bill Amount",
            "autoWidth": true,
            type: "string",
            render: function (data, type, row) {
                return formatIndianPrice(row.price_breakup.discounted_price);
            },
        },
        {
            data: null,
            name: "Date",
            type: "string",
            "autoWidth": true,
            render: function (data, type, row) {
                return formatDate(row.created_at);
            },
        },
        { data: "order_status", name: "Order Status", type: "string", "autoWidth": true },
    ];

    BindGrid('https://gaitondeapi.imersive.io/api/order/get', columns);
});

var fp = flatpickr(".date", {
    //dateFormat: "d-m-Y",
    dateFormat: "Y-m-d",
});

$("#btnSearch").click(function () {

    var selectedItems = document.querySelectorAll('#selectStatus .selected-items .item');
    var selectedValues = [];
    selectedItems.forEach(function (item) {
        var textContentWithoutX = item.textContent.replace('×', '').trim();
        selectedValues.push(textContentWithoutX);
    });
    var selectedValuesCommaSeparated = selectedValues.join(', ');

    alert(selectedValuesCommaSeparated);


    BindGrid(`https://gaitondeapi.imersive.io/api/order/get?start_date=${$("#fromDate").val()}&end_date=${$("#toDate").val()}`, columns);
});