$(document).ready(async function () {
    let session = await checkServerSession();
    if (session) {
        const result = await GetAllCartItems();
    }
});


async function GetAllCartItems() {
    const data = {
        
        "session_id": "60987207-7a3d-40f4-bf75-7ade491171dd",
        
    };

    const response = await fetch('https://ckdsvy7303.execute-api.us-east-1.amazonaws.com/default/getCartdetails', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    console.log(result);
}