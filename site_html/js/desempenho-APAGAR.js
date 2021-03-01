window.onload = function () {
    MTD_Desempenho();
 //   MTD_MontaIndicadores();
};

function MTD_Desempenho() {
    var stb_html = '';
    var stb_classificacao = '';
    var parametros = {};
    $.ajax({
        type: 'POST',
        url: 'desempenho.aspx/MTD_Desempenho',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(parametros),
        beforeSend: function () {
            // $('#preCadastroCNPJ').html('<i class="fa  fa-spinner fa-spin"></i><span> Processando...</span>');
        },
        success: function (returnValue) {
            var jsonResult = JSON.parse(returnValue.d);
            if (jsonResult.length > 0) {

                stb_classificacao += '<div class="row mx-0 my-2 mt-md-5 mb-md-4">';
                stb_classificacao += '<div class="col-md-10 mx-auto">';
                stb_classificacao += '<div class="clearfix bg-blue rounded pt-4 pb-4 px-4">';
                stb_classificacao += '<div class="float-left w-75">';
                stb_classificacao += '<p class="mb-0 text-uppercase text-white text-4">Classificação da sua revenda: <span class="font-weight-bold" style="font-size:20px">' + jsonResult[0].NomeFaixa + '</span></p>';
                stb_classificacao += '<p class="mb-0 text-white text-4">Faturamento médio de IAAS + SAAS superior a R$ 30.000 / mês</p>';
                stb_classificacao += '</div>';
                stb_classificacao += '<div class="float-right text-white">';
                stb_classificacao += '<span class="text-5 font-weight-bold">$$$$</span>';
                stb_classificacao += '</div>';
                stb_classificacao += '</div>';
                stb_classificacao += '</div>';
                stb_classificacao += '</div>';

                $('#Classificacao_').html(stb_classificacao);

                stb_html += '<div class="accordion" id="accordion">';
                for (var i = 0; i < jsonResult.length; i++) {




                    var valorSoma = 0;
                    ValorSoma = jsonResult[i].PontosLass + jsonResult[i].PontosSaas;

                    stb_html += '<div class="card card-default">';
                    stb_html += '<div class="card-header">';
                    stb_html += '<h4 class="card-title m-0">';
                    stb_html += '<a class="accordion-toggle text-gray clearfix" data-toggle="collapse" data-parent="#accordion" href="#PDF' + jsonResult[i].mes + '">';
                    stb_html += '<div class="float-left">';
                    stb_html += '<span>' + jsonResult[i].NomeMes + '</span>';
                    stb_html += '</div>';
                    stb_html += '<div class="float-right">';
                    stb_html += '<span>' + ValorSoma + ' pontos</span>';
                    stb_html += '</div>';
                    stb_html += '</a>';
                    stb_html += '</h4>';
                    stb_html += '</div>';
                    stb_html += '<div id="PDF' + jsonResult[i].mes + '" class="collapse">';
                    stb_html += '<div class="card-body">';
                    stb_html += '<div class="table-responsive">';
                    stb_html += '<table class="table text-center">';
                    stb_html += '<thead>';
                    stb_html += '<tr>';
                    stb_html += '<th>CATEGORIA</th>';
                    stb_html += '<th>META</th>';
                    stb_html += '<th>FATURADO</th>';
                    stb_html += '<th>HABILITOU?</th>';
                    stb_html += '<th>PONTOS</th>';
                    stb_html += '</tr>';
                    stb_html += '</thead>';
                    stb_html += '<tbody>';
                    stb_html += '<tr>';
                    stb_html += '<td>IAAS</td>';
                    stb_html += '<td>R$' + jsonResult[i].metaIASS + '</td>';
                    stb_html += '<td>R$ ' + jsonResult[i].realIASS + '</td>';
                    if (jsonResult[i].HabilitadoIASS === "Não") {
                        stb_html += '<td><i class="far fa-times-circle fa-2x text-danger"></i></td>';
                    } else if (jsonResult[i].HabilitadoIASS === "Sim") {
                        stb_html += '<td><i class="far fa-check-circle fa-2x text-success"></i></td>';
                    }
                    stb_html += '<td>' + jsonResult[i].PontosLass + '</td>';
                    stb_html += '</tr>';
                    stb_html += '<tr>';
                    stb_html += '<td>SAAS</td>';
                    stb_html += '<td>R$' + jsonResult[i].metaSass + '</td>';
                    stb_html += '<td>R$ ' + jsonResult[i].RealSass + '</td>';
                    if (jsonResult[i].HabilitadoLass === "Não") {
                        stb_html += '<td><i class="far fa-times-circle fa-2x text-danger"></i></td>';
                    } else if (jsonResult[i].HabilitadoLass === "Sim") {
                        stb_html += '<td><i class="far fa-check-circle fa-2x text-success"></i></td>';
                    }
                    stb_html += '<td>' + jsonResult[i].PontosSaas + '</td>';
                    stb_html += '</tr>';
                    stb_html += '</tbody>';
                    stb_html += '</table>';
                    stb_html += '</div>';
                    stb_html += '</div>';
                    stb_html += '</div>';
                    stb_html += '</div>';
                }
                stb_html += '</div>';

                $('#MontaAccordion').html(stb_html);
            }
        }
    });
}
