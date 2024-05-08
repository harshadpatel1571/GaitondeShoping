function BindGrid(pURL, pColumns, pdfColumn, excelColumn, printColumn, isPaging = true, isSearching = true) {
    $('#grid').DataTable().destroy();
    $('#grid').DataTable({
        paging: isPaging,
        lengthChange: true,
        searching: isSearching,
        ordering: true,
        lengthMenu: [[10, 25, 50, 75, 100, 250], [10, 25, 50, 75, 100, 250]],
        info: true,
        autoWidth: true,
        responsive: true,
        processing: true,
        //serverSide: true,
        filter: true,
        ajax: pURL,
        columns: pColumns,
    });

    restrictSearchFilter();
}

function restrictSearchFilter() {
    const table = $('#grid').DataTable();
    $('.dataTables_filter input')
        .unbind()
        .bind('input', function (e) {
            if (this.value.length >= 3 || e.keyCode === 13) {
                table.search(this.value).draw();
            }
            if (this.value === "") {
                table.search("").draw();
            }
        });
}


function formatDate(dateString) {
    var date = new Date(dateString);

    // Format the date
    var formattedDate = ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear();
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    var formattedTime = hours + ":" + minutes + " " + ampm;

    return formattedDate + " " + formattedTime;
}

function formatIndianPrice(number) {
    var formattedPrice = number.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

    if (formattedPrice.indexOf('.') === -1) {
        formattedPrice += '.00';
    }

    return formattedPrice;
}

function checkSession() {
    var userId = localStorage.getItem('user_id');
    var userName = localStorage.getItem('user_name');
    var email = localStorage.getItem('email');
    var roleId = localStorage.getItem('role_id');

    if (userId == undefined && userName == undefined && email == undefined && roleId == undefined) {
        return false;
    }
    else {
        return true;
    }
}


$('#btnlogout').click(function(){
    localStorage.removeItem('email');
    localStorage.removeItem('role_id');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    window.location.href = "/admin/login.html"; 
})