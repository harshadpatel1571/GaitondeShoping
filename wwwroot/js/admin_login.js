$(document).ready(function () {

    $("#loginform").validate({
        rules: {
            Username: {
                required: true,
            },
            Password: {
                required: true,
            },

        },
        messages: {
            Username: {
                required: "Please enter a Username",
            },
            Password: {
                required: "Please enter a Password",
            },
        },

    });
});



$('#btn_login').click(async function () {
    if (!$('#loginform').valid()) {
        return;
    }
    const result = await AdminLogin();
    console.log(result);
    var email = $("#adminUsername").val()
    if(result.data.email== email) {
        window.location.href = "/admin/dashboard.html"; 
    } else {
        
    }
});

async function AdminLogin() {
    const data = {
        "shop": 'teststore@gaitonde.com',
        "email": $("#adminUsername").val(),
        "password": $("#adminPassword").val(),
    }
    const response = await fetch(`https://gaitondeapi.imersive.io/api/user/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    return result;
}
