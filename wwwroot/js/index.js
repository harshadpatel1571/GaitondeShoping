$(document).ready(function () {
    checkServerSession();
});

async function Getproductaspershop() {
    const data = {
        "session_id": "80459a11-9234-4c43-86a7-0f99c6522a8a",
        "shop": "testStore@gaitonde.com",
        "machine_ip": "sample id",
        "machine_name": "machine name",
        "last_login": "2024-04-04T14:29:02.349Z",
        "is_expired": false
    };

    const response = await fetch('https://pkjnhdiqab.execute-api.us-east-1.amazonaws.com/default/getProductByShop', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    console.log(result);
}

async function EditCartItems() {
    const data = {
        "product_id": "1",
        "variant_id": 1,
        "session_id": "60987207-7a3d-40f4-bf75-7ade491171dd",
        "qty": 10,
        "shop": "testStore@gaitonde.com",
        "machine_ip": "sample id",
        "machine_name": "machine name",
        "last_login": "2024-04-04T14:29:02.349Z",
        "is_expired": false
    };

    const response = await fetch('https://agc7k8pd00.execute-api.us-east-1.amazonaws.com/default/editCartItems', {
        method: 'GET',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    console.log(result);
}