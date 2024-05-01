$(function () {
    const columns = [
        { data: "order_id", name: "Id", "autoWidth": true },
        { data: "order_note", name: "Name", "autoWidth": true },
    ];
    BindGrid(`https://gaitondeapi.imersive.io/api/order/get`, columns, [1], [1], [1]);
});