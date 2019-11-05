$(document).ready(function () {

    getlistcombobox();
    getlistpuntajes(false); 
    $(".mostrarGanador").click(redirectMostrarGanador);
});
var redirectMostrarGanador = function () {
    var a = $("td[aria-describedby=table-listar-puntajes_puntajeTotal]").length;
    var list = [];
    for (let i = 0; i < a; i++) {
        list[i] = parseInt($($("td[aria-describedby=table-listar-puntajes_puntajeTotal]")[i]).text());
    }
    var maxValue = Math.max.apply(null, list);
    var position = list.indexOf(maxValue);
    var model = $($("td[aria-describedby=table-listar-puntajes_puntajeTotal]")[position]).parent();
    var result = {
        codigoParticipante: model.find("[aria-describedby=table-listar-puntajes_codigo]").text(),
        categoria: model.find("[aria-describedby=table-listar-puntajes_categoria]").text(),
        modalidad: model.find("[aria-describedby=table-listar-puntajes_modalidad]").text(),
        puntajeTotal: model.find("[aria-describedby=table-listar-puntajes_puntajeTotal]").text()
    };
    localStorage.setItem('cpa', result.codigoParticipante);
    localStorage.setItem('cat', result.categoria);
    localStorage.setItem('mod', result.modalidad);
    localStorage.setItem('pun', result.puntajeTotal);
    window.location.href = "/TUsuarioModalidadTandas/Edit";
};
var getlistcombobox = function () {
    $.ajax({
        url: "/TUsuarioModalidadTandas/GetComboBox",
        type: "GET",
        //data: { id: id },
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            var selecttanda = $('#tandaa'); // va buscar en todo el doc algun elemento que tenga el id 
            selecttanda.find('option').remove(); // son los elementos
            selecttanda.append('<option value="">' + 'Seleccione' + '</option>');
            $.each(response.tand, function (key, value) { //temp es la lista que va recorrer 
                selecttanda.append('<option value=' + value.pkItCodTan + '>' + value.pkItCodTan+'</option>');
            });
            var selectmodalidad = $('#desc');   
            selectmodalidad.find('option').remove();
            selectmodalidad.append('<option value="">' + 'Seleccione' + '</option>');
            $.each(response.d, function (key, value) {
                selectmodalidad.append('<option value=' + value.vtDescripcion + '>' + value.vtDescripcion + '</option>');
            });
            var selectcategoria = $('#desc1');
            selectcategoria.find('option').remove();
            selectcategoria.append('<option value="">' + 'Seleccione' + '</option>');
            $.each(response.d1, function (key, value) {
                selectcategoria.append('<option value=' + value.vtDescripcion1 + '>' + value.vtDescripcion1 + '</option>');
            });
        },
        error: function (response) {

        }
    });
};
var getlistpuntajes = function (flag) {
    var tanda = 0;
    var descripcion = null;
    var descripcion1 = null;
    if (flag) {
        tanda = $("#tandaa").val();
        descripcion = $("#desc").val();
        descripcion1 = $("#desc1").val();
    }
    $.ajax({
        url: "/TUsuarioModalidadTandas/MostrarPuntajes",
        type: "GET",
        data: { idtanda: tanda, des: descripcion, des1: descripcion1 },
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            if (flag) {
                //la primera ves que entre sera para listar y el flag sera false , por ende lo redireccionará a tableAsistencia y si agrega o elimina reutilizaremos esta funcionon para no crear mas y no tener mas codigo en vano por ende el flag sera true cuando creemos o eliminemos.
                $('#table-listar-puntajes').jqGrid('clearGridData');
                $('#table-listar-puntajes').jqGrid('setGridParam', { data: response.punta });
                $('#table-listar-puntajes').trigger('reloadGrid');
                $('#table-listar-puntajes').trigger('reloadGrid', { page: 1 });
            } else {
                tablepuntajes(response.punta);
            }
        },
        error: function (response) {
        }
    });
};
refreshPager = function (selectorTable, selectorPager) {
    $(selectorTable).navGrid(selectorPager, { add: false, edit: false, del: false, search: false, refresh: true });
};
var tablepuntajes = function (response) {
    $("#table-listar-puntajes").jqGrid({
        data: response,
        datatype: "local",
        rowNum: 10,
        rowList: [10, 20, 30],
        colModel: [
            { label: 'Codigo Participante', name: 'codigo', key: true },
            { label: 'Categoria', name: 'categoria' },
            { label: 'Modalidad', name: 'modalidad' },
            { label: 'Pista', name: 'pista' },
            { label: 'Tanda', name: 'tanda' },
            { label: 'Puntaje Total', name: 'puntajeTotal' }
            
        ],
        onSelectRow: function () {
            //var rowKey = $("#table-listar-norma").jqGrid('getGridParam', "selrow");
            //$("#radio-grid-norma-item-" + rowKey).prop("checked", true);
            //selectedNormaId = rowKey;
        },
        loadComplete: function () {
            //if (selectedNormaId > 0) {
            //    var grid = $("#table-listar-norma");
            //    grid.setSelection(selectedNormaId);
            //    $('#radio-grid-norma-item-' + selectedNormaId).attr('checked', true);
            //}

            //$('.ui-pg-input').keydown(function (event) { onlyNumbersWithEnterKeycode(event) });
            //$('.ui-pg-input').keyup(function (event) {
            //    validarNumeroMaximoPaginacion(event, 'sp_1_pager-listar-norma');
            //});
        },
        cmTemplate: { sortable: false },
        pager: "#pager-listar-puntajes"
    });

    refreshPager("#table-listar-puntajes", "#pager-listar-puntajes");

};