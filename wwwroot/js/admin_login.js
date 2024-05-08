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


$('#btncancel').click(function () {
    window.location.reload();
});

$('#btn_login').click(async function () {
    if (!$('#loginform').valid()) {
        return;
    }
    const result = await AdminLogin();

    if (!result.error) {

        localStorage.setItem('email', result.data.email);
        localStorage.setItem('role_id', result.data.role_id);
        localStorage.setItem('user_id', result.data.user_id);
        localStorage.setItem('user_name', result.data.user_name);
        window.location.href = "/admin/dashboard.html"
    }
    else {       
        Swal.fire({
          title: "Email and Password are incorrect. Try again !",
          icon: "warning",
          confirmButtonColor: "#F68373",
        }).then(() => {
            window.location.reload();
        });
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