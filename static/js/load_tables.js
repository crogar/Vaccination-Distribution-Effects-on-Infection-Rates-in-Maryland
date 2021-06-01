console.log($("#select_dataset :selected").text());

function addCode() {
    $.getJSON('http://127.0.0.1:5000/gen_table/maryland_covid19-cases.csv', function(data) { // Populating tables
        console.log(data)
        document.getElementById("table-container").innerHTML += data;
        $(document).ready( function () {
            $('#table-container').DataTable();
        } );
    });
}

addCode()