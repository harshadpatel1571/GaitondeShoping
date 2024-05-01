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
        serverSide: true,
        filter: true,
        ajax: {
            url: pURL,
            type: "GET",
            datatype: "json",
        },
        columnDefs: [{
            targets: [0],
            visible: false,
            searchable: false
        }],
        columns: pColumns,
        dom: 'Blfrtip',
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