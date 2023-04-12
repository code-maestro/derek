const toExcel = (param, name) => {
   
    var table = $(`#${param}`);

    if (table && table.length) {
        $(table).table2excel({
            exclude: ".nopnt",
            name: param,
            filename: name + new Date().toISOString().slice(0, 10).replace(/[\-\:\.]/g, "") + ".xls",
            fileext: ".xls",
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true,
            preserveColors: true
        });
    }
}
