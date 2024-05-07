let columns = [];
document.addEventListener("DOMContentLoaded", function () {
    columns = [
        { data: "category", name: "Category", "autoWidth": true, type: "string", className: 'dt-left' },
        { data: "product_name", name: "Product Name", type: "string", "autoWidth": true },
        { 
            data: null,
            name: "Size",
            "autoWidth": true,
            type: "string",
            className: 'dt-left',
            render: function (data, type, row) {
                return row.variants.map(variant => variant.variant_title).join(', ');
            }
        },
        {
            data: null,
            name: "Color",
            type: "string",
            "autoWidth": true,
            render: function(data, type, row) {
                if (row.color_variant && row.color_variant.length > 0) {
                    var colors = row.color_variant.map(variant => variant.product_color);
                    return colors.join(', ');
                } else {
                    return ''; 
                }
            }
        },
        
        
        { 
            data: null,
            name: "Price",
            type: "string",
            "autoWidth": true,
            render: function (data, type, row) {  
                return formatIndianPrice(row.variants[0].price);
            }
        },
        { 
            data: "status", 
            name: "Status", 
            type: "string", 
            "autoWidth": true,
            className: 'dt-center',
            render: function(data, type, row) {
                return '<i class="fas fa-pencil-alt"></i> ' +
                '<i class="fas fa-trash-alt"></i>';
            }
        }
    ];

    BindGrid('https://gaitondeapi.imersive.io/api/product/byShop?shop=teststore@gaitonde.com', columns);
});
