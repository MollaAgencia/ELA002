// $(document).on('click', '#preCadastroCNPJ', function (event) {
//     var parametros = {};
//     parametros.pLogin = $('#CNPJ_PRECADASTRO').val();
//     $.ajax({
//         type: 'POST',
//         url: '/cadastre-se.aspx/MTD_ValidaCadastro',
//         contentType: 'application/json; charset=utf-8',
//         dataType: 'json',
//         data: JSON.stringify(parametros),
//         beforeSend: function () {
//             $('#preCadastroCNPJ').html('<i class="fa  fa-spinner fa-spin"></i><span> Processando...</span>');
//         },
//         success: function (returnValue) {
//             var jsonResult = JSON.parse(returnValue.d);
//             if (jsonResult.length > 0) {
//                 if (jsonResult[0].cadastroAtivo == false) {
//                     $('#cadastroCompleto').removeClass('d-none');
//                     $('#preCadastroDnone').addClass('d-none');
//                     $('#cadas_cnpjPrincipal').val(jsonResult[0].CNPJPRINCIPAL);
//                     $('#cadas_nomeFantasia').val(jsonResult[0].NOMEFANTASIA);
//                     $('#reseller_ID').val(jsonResult[0].ResellerID);
//                     $('#cl_Classificacao').val(jsonResult[0].nomeFaixa);

//                 } else if (jsonResult[0].cadastroAtivo == true) {
//                     $('#preCadastroCNPJ').html('<div class="btn  text-white" id="preCadastroCNPJ" style="background-color:#9e2776;">Verificar</div>');
//                     Swal.fire(
//                         'Usuário já Cadastrado',
//                         'Caso não lembre sua senha<br> verifique no "Esqueci minha Senha"',
//                         'info'
//                     );
//                     return false;
//                 }
//             }

//         }
//     });
// });

//fancybox
// $(document).on('click', '[data-toggle="lightbox"]', function (event) {
//     event.preventDefault();
//     $(this).ekkoLightbox({
//         alwaysShowClose: false,
//         wrapping: false,
//     });
// });

/* --- AJAX login --- */
$('#btn_LoginAutenticacao').bind('click', function (event) {
    event.preventDefault();

    $('#alert_login').addClass('d-none');

    var parametros = {};
    parametros.CNPJ = $('#login_cnpj').val();
    parametros.SENHA = $('#login_senha').val();

    $.ajax({
        type: 'POST',
        url: 'Login.aspx/MTD_Autenticacao',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(parametros),
        beforeSend: function () {
            $('#btn_LoginAutenticacao').attr('disabled', 'disabled');
            $('#btn_LoginAutenticacao').html('<i class="fa fa-1x fa-spinner fa-spin"></i><span> Processando...</span>');
        },
        success: function (returnValue) {
            var jsonResult = JSON.parse(returnValue.d);
            if (jsonResult.PRP_Status === false) {
                Swal.fire(
                    'Erro ao realizar Login',
                    'Verifique se seu "USUÁRIO" e sua "SENHA"<br> estão corretos',
                    'info'
                );
                $('#btn_LoginAutenticacao').text('Login');
                $('#btn_LoginAutenticacao').removeAttr('disabled', 'disabled');

            }
            else {
                $('#alert_login').addClass('d-none');
                window.location.href = "index.aspx";
            }
        }
    });
});

// $(document).on('click', '#btn_sair', function (event) {
//     event.preventDefault;
//     window.location.href = "Login.aspx";
// });

/* --- AJAX Esqueci a senha --- */
$('#btn_EsqueciSenha').bind('click', function (event) {
    event.preventDefault();

    if ($('#ipt_cnpj').val() == '') {
        $('#alert_EsqueciSenha').removeClass('d-none').html('<span class="alert alert-danger py-2">Campo ID de Acesso está vazio.</span>');
        return false;
    }

    var parametros = {};
    parametros.pEsqueceuSenha = $('#ipt_cnpj').val();

    $.ajax({
        type: 'POST',
        url: 'Login.aspx/MTD_EsqueciSenha',
        data: JSON.stringify(parametros),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        beforeSend: function () {
            $('#btn_EsqueciSenha').attr('disabled', 'disabled');
            $('#alert_EsqueciSenha').removeClass('d-none').html('<span class="alert alert-info py-2"><i class="fa fa-1x fa-spinner fa-spin"></i> Enviando...</span>');
        },
        success: function (returnValue) {
            var jsonResult = JSON.parse(returnValue.d);
            if (jsonResult.PRP_Status == true) {
                $('#btn_EsqueciSenha').removeAttr('disabled', 'disabled');
                $('#alert_EsqueciSenha').removeClass('d-none').html(jsonResult.PRP_Mensagem);
            } else {
                $('#btn_EsqueciSenha').removeAttr('disabled', 'disabled');
                $('#alert_EsqueciSenha').removeClass('d-none').html('<p class="alert alert-warning py-2">' + jsonResult.PRP_Mensagem + '</p>');
            }
        }
    });
});


$(document).on('click', '#btnEnviaResetr', function (event) {
    event.preventDefault();
    var parametros = {};
    parametros.pSenha = $('#novaSenha').val();

    $.ajax({
        type: 'POST',
        url: 'ResetSenha.aspx/MTD_ResetSenha',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(parametros),
        beforeSend: function () {
            $('#btnEnviar').attr('disabled', 'disabled');
            $('#cadastrando').html('<div class="alert alert-primary text-center mt-2 py-1"><i class="fa fa-1x fa-spinner fa-spin"></i> Processando...</div>');
        },
        success: function (returnValue) {
            var jsonResult = JSON.parse(returnValue.d);
            if (jsonResult == null || jsonResult.length == 0) {
                $('#cadastrando').html('<div class="alert alert-danger text-center mt-2 py-1">Erro ao cadastrar a nova senha.</div>');
                $('#btnEnviar').removeAttr('disabled', 'disabled');
            } else if (jsonResult != "") {
                Swal.fire({
                    title: 'Nova senha cadastrada com sucesso!',
                    text: 'Realize o seu login',
                    type: 'success',
                }).then(function (result) {
                    if (result.value) {
                        window.location = "Login.aspx";
                    }
                });
            }
        }
    });
});


/* --- AJAX Cadastro --- */
$('#btn_Cadastrar').bind('click', function (event) {
    event.preventDefault();
    var parametros = {};
    //Cadastro Usuario//
    parametros.cnpjprincipal = $('#cadas_cnpjPrincipal').val();
    parametros.nomefantasia = $('#cadas_nomeFantasia').val();
    parametros.razaoSocial = $('#cadas_razaoSocial').val();
    parametros.site = $('#cadas_site').val();
    parametros.email = $('#cadas_emailPrincipal').val();
    parametros.telefone = $('#cadas_telefone').val();
    parametros.cep = $('#cadas_cep').val();
    parametros.endereco = $('#cadas_endereco').val();
    parametros.numero = $('#cadas_numero').val();
    parametros.complemento = $('#cadas_complemento').val();
    parametros.bairro = $('#cadas_bairro').val();
    parametros.cidades = $('#cadas_cidade').val();
    parametros.estado = $('#cadas_estado').val();
    parametros.Regulamento = $('#regulamento').is(':checked');
    parametros.senha = $('#cadas_senha').val();
    parametros.cadas_confSenha = $('#cadas_confSenha').val();
    //Cadastro Usuario//

    //Cadastro Socio/Proprietario//
    parametros.NomeSocio = $('#cadas_nomeSocios').val();
    parametros.EmailSocio = $('#cadas_emailSocios').val();
    parametros.TelefoneSocio = $('#cadas_numeroSocios').val();


    //INFORMAÇÕES VALIDA CADASTRO
    var validarCNPJ = validadorCNPJ(parametros.cnpjprincipal);
    if (validarCNPJ == false) {
        Swal.fire(
            'Campo Obrigatório',
            'Campo CNPJ INVÁLIDO',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">CNPJ INVÁLIDO</div>');
        $('input [name="cadas_cnpjPrincipal]').css("border", "1px solid red;");
        return false;
    } else if (validarCNPJ == true) {
        $('#alert_cadastro').addClass('d-none');
    }

    if (parametros.nomefantasia.length < 2) {
        Swal.fire(
            'Campo Obrigatório',
            'Campo Nome Fantasia INVÁLIDO ou Vazio',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">NOME FANTASIA INVÁLIDA OU VAZIO!</div>');
        $('#cadas_nomeFantasia').css("border: 1px solid red;");
        return false;
    }

    if (parametros.razaoSocial.length < 2) {
        Swal.fire(
            'Campo Obrigatório',
            'Campo Razão Social Fantasia INVÁLIDO ou Vazio',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">RAZÃO SOCIAL INVÁLIDA OU VAZIO!</div>');
        $('#cadas_razaoSocial').css("border: 1px solid red;");
        return false;
    }
    if (parametros.site < 2) {
        Swal.fire(
            'Campo Obrigatório',
            'Campo Site INVÁLIDO ou Vazio',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">LINK DO SITE INVÁLIDO OU VAZIO!</div>');
        $('#cadas_site').css("border: 1px solid red;");
        return false;
    }
    var validaEmail = validadorEmaill(parametros.email);
    if (validaEmail == false) {
        Swal.fire(
            'Campo Obrigatório',
            'Campo E-mail INVÁLIDO ou Vazio',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">E-MAIL INVÁLIDO!</div>');
        $('#cadas_emailPrincipal').css("border: 1px solid red;");
        return false;
    }

    if (parametros.telefone.length < 2) {
        Swal.fire(
            'Campo Obrigatório',
            'Campo Telefone INVÁLIDO ou Vazio',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">TELEFONE INVÁLIDA OU VAZIO!</div>');
        $('#cadas_telefone').css("border: 1px solid red;");
        return false;
    }
    if (parametros.cep.length < 2) {
        Swal.fire(
            'Campo Obrigatório',
            'Campo Cep INVÁLIDO ou Vazio',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">CEP INVÁLIDA OU VAZIO!</div>');
        $('#cadas_cep').css("border: 1px solid red;");
        return false;
    }
    if (parametros.endereco.length < 2) {
        Swal.fire(
            'Campo Obrigatório',
            'Campo Endereço INVÁLIDO ou Vazio',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">ENDEREÇO INVÁLIDA OU VAZIO!</div>');
        $('#cadas_endereco').css("border: 1px solid red;");
        return false;
    } if (parametros.cidades.length < 2) {
        Swal.fire(
            'Campo Obrigatório',
            'Campo Cidade INVÁLIDO ou Vazio',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">CIDADE INVÁLIDA OU VAZIO!</div>');
        $('#cadas_cidade').css("border: 1px solid red;");
        return false;
    }
    if (parametros.estado.length < 2) {
        Swal.fire(
            'Campo Obrigatório',
            'Campo Estado INVÁLIDO ou Vazio',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">ESTADO INVÁLIDA OU VAZIO!</div>');
        $('#cadas_estado').css("border: 1px solid red;");
        return false;
    }
    if (parametros.senha !== parametros.cadas_confSenha) {
        Swal.fire(
            'Campo Obrigatório',
            'Campo "Senha" e "Confirmar Senha", precisam ser iguais ',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">Campo "Senha" e "Confirma Senha" Precisam ser iguais</div>');
        $('#cadas_estado').css("border: 1px solid red;");
        return false;
    }

    function validadorEmaill(Email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(Email);
    }

    function validadorCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');
        if (cnpj === '') return false;
        if (cnpj.length !== 14)
            return false;
        if (cnpj === "00000000000000" ||
            cnpj === "11111111111111" ||
            cnpj === "22222222222222" ||
            cnpj === "33333333333333" ||
            cnpj === "44444444444444" ||
            cnpj === "55555555555555" ||
            cnpj === "66666666666666" ||
            cnpj === "77777777777777" ||
            cnpj === "88888888888888" ||
            cnpj === "99999999999999")
            return false;


        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) return false;
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        return true;
    }

    //FIM VALIDA CADASTRO BASE//

    //INICIO VALIDA CADASTRO SOCIO
    if (parametros.NomeSocio.length < 2) {
        Swal.fire(
            'Campo Obrigatório',
            'Campo Nome Socio/Proprietario está vazio',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">NECESSÁRIO PREENCHER OS CAMPO NOME DE SOCIO E PROPRIETÁRIO</div>');
        return false;
    }
    if (parametros.EmailSocio.length < 2) {
        Swal.fire(
            'Campo Obrigatório',
            'Campo E-mail Socio/Proprietario está vazio',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">NECESSÁRIO PREENCHER OS CAMPO EMAIL DE SOCIO E PROPRIETÁRIO</div>');
        return false;
    }
    if (parametros.TelefoneSocio.length < 2) {
        Swal.fire(
            'Campo Obrigatório',
            'Campo Telefone Socio/Proprietario está vazio',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">NECESSÁRIO PREENCHER OS CAMPO TELEFONE DE SOCIO E PROPRIETÁRIO</div>');
        return false;
    }
    parametros.nomeSocio01 = $('#NomeSocioClone_01').val();
    if (parametros.nomeSocio01 === undefined) {
        parametros.nomeSocio01 = "NULL";
    }
    parametros.EmailSocio01 = $('#cadas_emailSocios_01').val();
    if (parametros.EmailSocio01 === undefined) {
        parametros.EmailSocio01 = "NULL";
    }
    parametros.TelefoneSocio01 = $('#cadas_numeroSocios_01').val();
    if (parametros.TelefoneSocio01 === undefined) {
        parametros.TelefoneSocio01 = "NULL";
    }
    parametros.nomeSocio02 = $('#NomeSocioClone_02').val();
    if (parametros.nomeSocio02 === undefined) {
        parametros.nomeSocio02 = "NULL";
    }
    parametros.EmailSocio02 = $('#cadas_emailSocios_02').val();
    if (parametros.EmailSocio02 === undefined) {
        parametros.EmailSocio02 = "NULL";
    }
    parametros.TelefoneSocio02 = $('#cadas_numeroSociosClone_02').val();
    if (parametros.TelefoneSocio02 === undefined) {
        parametros.TelefoneSocio02 = "NULL";
    }
    //Cadastro Socio/Proprietario//

    //Cadastro Comercial//
    parametros.NomeComercial = $('#cadas_nomeComercial').val();
    parametros.EmailComercial = $('#cadas_emailComercial').val();
    parametros.TelefoneComercial = $('#cadas_numerocomercial').val();
    if (parametros.NomeComercial.length < 2) {
        Swal.fire(
            'Campo Obrigatório',
            'Campo Nome Comercial está vazio',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">NECESSÁRIO PREENCHER OS CAMPO NOME COMERCIAL</div>');
        return false;
    }
    if (parametros.EmailComercial.length < 2) {
        Swal.fire(
            'Campo Obrigatório',
            'Campo E-mail Comercial está vazio',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">NECESSÁRIO PREENCHER OS CAMPO EMAIL COMERCIAL</div>');
        return false;
    }
    if (parametros.TelefoneComercial.length < 2) {
        Swal.fire(
            'Campo Obrigatório',
            'Campo Telefone Comercial está vazio',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">NECESSÁRIO PREENCHER OS CAMPO TELEFONE COMERCIAL</div>');
        return false;
    }

    parametros.NomeComercial01 = $('#cadas_nomeComercialClone_01').val();
    if (parametros.NomeComercial01 === undefined) {
        parametros.NomeComercial01 = "NULL";
    }
    parametros.EmailComercial01 = $('#cadas_emailComercialClone_01').val();
    if (parametros.EmailComercial01 === undefined) {
        parametros.EmailComercial01 = "NULL";
    }
    parametros.TelefoneComercial01 = $('#cadas_numerocomercialClone_01').val();
    if (parametros.TelefoneComercial01 === undefined) {
        parametros.TelefoneComercial01 = "NULL";
    }
    parametros.NomeComercial02 = $('#cadas_nomeComercialClone_02').val();
    if (parametros.NomeComercial02 === undefined) {
        parametros.NomeComercial02 = "NULL";
    }
    parametros.EmailComercial02 = $('#cadas_emailComercialClone_02').val();
    if (parametros.EmailComercial02 === undefined) {
        parametros.EmailComercial02 = "NULL";
    }
    parametros.TelefoneComercial02 = $('#cadas_numerocomercialClone_02').val();
    if (parametros.TelefoneComercial02 === undefined) {
        parametros.TelefoneComercial02 = "NULL";
    }
    //Cadastro Comercial//

    //Cadastro Tecnico//
    parametros.nomeTecnico = $('#cadas_nomeResponsavelTecnico').val();
    parametros.EmailTecnico = $('#cadas_emailResponsavelTecnico').val();
    parametros.TelefoneTecnico = $('#cadas_numeroResponsavelTEcnico').val();

    if (parametros.nomeTecnico.length < 2) {
        Swal.fire(
            'Campo Obrigatório',
            'Campo Nome Técnico está vazio',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">NECESSÁRIO PREENCHER OS CAMPO NOME TÉCNICO</div>');
        return false;
    }
    if (parametros.EmailTecnico.length < 2) {
        Swal.fire(
            'Campo Obrigatório',
            'Campo E-mail Técnico está vazio',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">NECESSÁRIO PREENCHER OS CAMPO EMAIL TÉCNICO</div>');
        return false;
    }
    if (parametros.TelefoneTecnico.length < 2) {
        Swal.fire(
            'Campo Obrigatório',
            'Campo Telefone Técnico está vazio',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">NECESSÁRIO PREENCHER OS CAMPO TELEFONE TÉCNICO</div>');
        return false;
    }
    parametros.nomeTecnico01 = $('#cadas_nomeResponsavelTecnicoClone').val();
    if (parametros.nomeTecnico01 === undefined) {
        parametros.nomeTecnico01 = "NULL";
    }
    parametros.EmailTecnico01 = $('#cadas_nomeResponsavelTecnicoClone').val();
    if (parametros.EmailTecnico01 === undefined) {
        parametros.EmailTecnico01 = "NULL";
    }
    parametros.TelefoneTecnico01 = $('#cadas_nomeResponsavelTecnicoClone').val();
    if (parametros.TelefoneTecnico01 === undefined) {
        parametros.TelefoneTecnico01 = "NULL";
    }

    parametros.nomeTecnico02 = $('#cadas_nomeResponsavelTecnicoClone01').val();
    if (parametros.nomeTecnico02 === undefined) {
        parametros.nomeTecnico02 = "NULL";
    }
    parametros.EmailTecnico02 = $('#cadas_emailResponsavelTecnicoClone01').val();
    if (parametros.EmailTecnico02 === undefined) {
        parametros.EmailTecnico02 = "NULL";
    }
    parametros.TelefoneTecnico02 = $('#cadas_numeroResponsavelTEcnicoClone01').val();
    if (parametros.TelefoneTecnico02 === undefined) {
        parametros.TelefoneTecnico02 = "NULL";
    }
    //Cadastro Tecnico//

    parametros.NumerosFuncionarios = $('#cadas_numeroFuncionarios').val();
    if (parametros.NumerosFuncionarios === "") {
        Swal.fire(
            'Campo Obrigatório',
            'Campo  Número de Funcionarios está vazio',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">NÚMERO DE FUNCIONARIOS ESTÁ VAZIO!</div>');
        return false;
    }
    parametros.numerosEquipeVendas = $('#cadas_numeroEquipeVendas').val();
    if (parametros.numerosEquipeVendas === "") {
        Swal.fire(
            'Campo Obrigatório',
            'Campo Numero de equipe de Vendas está vazio',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">NÚMERO DE EQUIPE DE VENDAS ESTÁ VAZIO!</div>');
        return false;
    }

    //informações sobre negócios//
    parametros.saudecheck = $('#saudeCheck').is(':checked');
    parametros.industriaCheck = $('#industriaCheck').is(':checked');
    parametros.GovernoCheck = $('#GovernoCheck').is(':checked');
    parametros.VarejoCheck = $('#VarejoCheck').is(':checked');
    parametros.FinancasCheck = $('#FinancasCheck').is(':checked');
    parametros.EducacaoCheck = $('#EducacaoCheck').is(':checked');
    parametros.OutrosCheck = $('#OutrosCheck').is(':checked');

    parametros.VendAzure = $('#VendAzure').is(':checked');
    parametros.Vend365 = $('#Vend365').is(':checked');
    parametros.VendDynamic = $('#VendDynamic').is(':checked');
    parametros.vendOffice = $('#vendOffice').is(':checked');
    parametros.vendMine = $('#vendMine').is(':checked');
    parametros.vendpower = $('#vendpower').is(':checked');
    parametros.vendOutros = $('#vendOutros').is(':checked');
    parametros.Sim_Nao_Option = $('input[name=inlineRadioOptions]:checked').val();
    //informações sobre negócios//
    if (parametros.Sim_Nao_Option === undefined) {
        Swal.fire(
            'Campo Obrigatório',
            'Campo Compra em outro distribuidor está vazio',
            'info'
        );
        $('#alert_cadastro').removeClass('d-none').html('<div class="text-center alert alert-danger text-3 py-2">Compra em outro Distribuidor está vazio</div>');
        return false;
    }


    $.ajax({
        type: 'POST',
        url: 'cadastre-se.aspx/MTD_Cadasto',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(parametros),
        beforeSend: function () {
            $('#btn_Cadastro').attr('disabled', 'disabled');
            $('#btn_Cadastrar').removeClass('d-none').html('<span class="py-2"><i class="fa fa-1x fa-spinner fa-spin"></i> Processando...</span>');
        },
        success: function (returnValue) {
            var jsonResult = JSON.parse(returnValue.d);
            if (jsonResult.PRP_Status === true) {
                $('#btn_Cadastrar').addClass('d-none');
                Swal.fire({
                    title: 'Cadastro Realizado<br> com Sucesso!',
                    text: 'Seu cadasstro foi realizado com sucesso <br> você será redirecionado<br> para a pagina de login em instantes!',
                    type: 'success',
                }).then(function (result) {
                    if (result.value) {
                        window.location = "Login.aspx";
                    }
                });
                
                $('#alert_cadastro').removeClass('d-none').html('<p class="alert alert-info text-center py-2">' + jsonResult.PRP_Mensagem + ' para ir ao login <a href="login.aspx">Clique Aqui </a></p>');
                var delay = 10000;
                var url = "Login.aspx";
                setTimeout(function () { window.location = url; }, delay);

            }
            else {
                $('#alert_cadastro').removeClass('d-none').html('<p class="alert alert-danger text-center py-2">' + jsonResult.PRP_Mensagem + '</p>');
                $('#btn_Cadastro').removeAttr('disabled', 'disabled');
            }
        }
    });

});

$(document).on('click', '#Reg_Click', function (event) {
    event.preventDefault;
    $('#btn_Cadastrar').removeClass('d-none');
});
/* --- AJAX Contato --- */
$('#btn_contato').bind('click', function (event) {
    event.preventDefault();

    // Valida Nome
    if ($('#contato_nome').val().length < 3) {
        $('#alert_contato').removeClass('d-none').html('<span class="alert alert-danger py-2">Nome incompleto.</span>');
        $('#contato_nome').addClass('border border-danger');
        return false;
    } else {
        $('#alert_contato').addClass('d-none');
        $('#contato_nome').removeClass('border border-danger');
    }

    // Valida E-mail
    usuario = $('#contato_email').val().substring(0, $('#contato_email').val().indexOf('@'));
    dominio = $('#contato_email').val().substring($('#contato_email').val().indexOf('@') + 1, $('#contato_email').val().length);
    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search('@') == -1) &&
        (dominio.search('@') == -1) &&
        (usuario.search(' ') == -1) &&
        (dominio.search(' ') == -1) &&
        (dominio.search('.') != -1) &&
        (dominio.indexOf('.') >= 1) &&
        (dominio.lastIndexOf('.') < dominio.length - 1)) {
        $('#alert_contato').addClass('d-none');
        $('#contato_email').removeClass('border border-danger');
    } else {
        $('#alert_contato').removeClass('d-none').html('<span class="alert alert-danger py-2">E-mail inválido.</span>');
        $('#contato_email').addClass('border border-danger');
        return false;
    }

    // Valida Telefone
    if ($('#contato_celular').val().length < 13) {
        $('#alert_contato').removeClass('d-none').html('<span class="alert alert-danger py-2">Celular inválido.</span>');
        $('#contato_celular').addClass('border border-danger');
        return false;
    } else {
        $('#alert_contato').addClass('d-none');
        $('#contato_celular').removeClass('border border-danger');
    }

    // Validar mensagem / observação
    if ($('#contato_mensagem').val().length < 3) {
        $('#alert_contato').removeClass('d-none').html('<span class="alert alert-danger py-2">Deixe sua mensagem.</span>');
        $('#contato_mensagem').addClass('border border-danger');
        return false;
    } else {
        $('#alert_contato').addClass('d-none');
        $('#contato_mensagem').removeClass('border border-danger');
    }

    var parametros = {};
    parametros.PRP_Nome = $('#contato_nome').val();
    parametros.PRP_Email = $('#contato_email').val();
    parametros.PRP_Celular = $('#contato_celular').val();
    parametros.PRP_Mensagem = $('#contato_mensagem').val();

    $.ajax({
        type: 'POST',
        url: '/Login.aspx/MTD_Contato',
        data: JSON.stringify(parametros),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        beforeSend: function () {
            $('#btn_contato').attr('disabled', 'disabled');
            $('#alert_contato').removeClass('d-none').html('<span class="alert alert-info py-2"><i class="fa fa-1x fa-spinner fa-spin"></i> Enviando...</span>');
        },
        success: function (returnValue) {
            var jsonResult = JSON.parse(returnValue.d);
            if (jsonResult.PRP_Status === true) {
                $('#alert_contato').removeClass('d-none').html(jsonResult.PRP_Mensagem);
                $('#btn_contato').removeAttr('disabled', 'disabled');
            }
            else {
                $('#alert_contato').removeClass('d-none').html(jsonResult.PRP_Mensagem);
                $('#btn_contato').removeAttr('disabled', 'disabled');
            }
        }
    });
});

$(document).on('click', '#btnSocioAdd', function (event) {
    $('#btnSocioAdd').addClass('d-none');

    var stb_html = '';
    stb_html += '<div class="form-row">';
    stb_html += '<div class="form-group col-12">';
    stb_html += '<label class="mb-1">NOME:</label>';
    stb_html += '<div class="input-group">';
    stb_html += '<input name="" id="NomeSocioClone_01" type="text" class="form-control form-control-lg" required>';
    stb_html += '</div>';
    stb_html += '</div>';
    stb_html += '<div class="form-group col-12 col-md">';
    stb_html += '<label class="mb-1">E-MAIL:</label>';
    stb_html += '<div class="input-group">';
    stb_html += '<input name="" id="cadas_emailSocios_01" type="text" class="form-control form-control-lg" mask-email required>';
    stb_html += '</div>';
    stb_html += '</div>';
    stb_html += ' <div class="form-group col-12 col-md">';
    stb_html += '<label class="mb-1">TELEFONE:</label>';
    stb_html += '<div class="input-group">';
    stb_html += ' <input name="" id="cadas_numeroSocios_01" type="text" class="form-control form-control-lg" maxlength="11" mask-telefone required>';
    stb_html += ' </div>';
    stb_html += ' </div>';
    stb_html += ' </div>';
    stb_html += '<div class="btn btn-primary text-white" id="btnSocioAdd01">ADICIONAR +</div>';
    stb_html += '</div>';

    $('#clone01Socico').html(stb_html);
});

$(document).on('click', '#btnSocioAdd01', function (event) {
    $('#btnSocioAdd01').addClass('d-none');

    var stb_html = '';
    stb_html += '<div class="form-row">';
    stb_html += '<div class="form-group col-12">';
    stb_html += '<label class="mb-1">NOME:</label>';
    stb_html += '<div class="input-group">';
    stb_html += '<input name="" id="NomeSocioClone_02" type="text" class="form-control form-control-lg" required>';
    stb_html += '</div>';
    stb_html += '</div>';
    stb_html += '<div class="form-group col-12 col-md">';
    stb_html += '<label class="mb-1">E-MAIL:</label>';
    stb_html += '<div class="input-group">';
    stb_html += '<input name="" id="cadas_emailSocios_02" type="text" class="form-control form-control-lg" mask-email required>';
    stb_html += '</div>';
    stb_html += '</div>';
    stb_html += ' <div class="form-group col-12 col-md">';
    stb_html += '<label class="mb-1">TELEFONE:</label>';
    stb_html += '<div class="input-group">';
    stb_html += ' <input name="" id="cadas_numeroSociosClone_02" type="text" class="form-control form-control-lg" maxlength="11" mask-telefone required>';
    stb_html += ' </div>';
    stb_html += ' </div>';
    stb_html += ' </div>';
    stb_html += '</div>';


    $('#clone01Socico01').html(stb_html);

});

$(document).on('click', '#btnComercialAdd', function (event) {
    $('#btnComercialAdd').addClass('d-none');

    var stb_html = '';
    stb_html += '<div class="form-row">';
    stb_html += '<div class="form-group col-12">';
    stb_html += '<label class="mb-1">NOME:</label>';
    stb_html += '<div class="input-group">';
    stb_html += '<input name="" id="cadas_nomeComercialClone_01" type="text" class="form-control form-control-lg" required>';
    stb_html += '</div>';
    stb_html += '</div>';
    stb_html += '<div class="form-group col-12 col-md">';
    stb_html += '<label class="mb-1">E-MAIL:</label>';
    stb_html += '<div class="input-group">';
    stb_html += '<input name="" id="cadas_emailComercialClone_01" type="text" class="form-control form-control-lg"  mask-email  required>';
    stb_html += '</div>';
    stb_html += '</div>';
    stb_html += '<div class="form-group col-12 col-md">';
    stb_html += '<label class="mb-1">TELEFONE:</label>';
    stb_html += '<div class="input-group">';
    stb_html += '<input name= "" id="cadas_numerocomercialClone_01" type="text" class="form-control form-control-lg" mask-telefone maxlength="11" required />';

    stb_html += '</div>';
    stb_html += '</div>';
    stb_html += '</div>';

    stb_html += '<div class="btn btn-primary text-white" id="btnComercialAdd01">ADICIONAR +</div>';
    $('#clone01Comercial').html(stb_html);
});

$(document).on('click', '#btnComercialAdd01', function (event) {
    $('#btnComercialAdd01').addClass('d-none');

    var stb_html = '';
    stb_html += '<div class="form-row">';
    stb_html += '<div class="form-group col-12">';
    stb_html += '<label class="mb-1">NOME:</label>';
    stb_html += '<div class="input-group">';
    stb_html += '<input name="" id="cadas_nomeComercialClone_02" type="text" class="form-control form-control-lg" required>';
    stb_html += '</div>';
    stb_html += '</div>';
    stb_html += '<div class="form-group col-12 col-md">';
    stb_html += '<label class="mb-1">E-MAIL:</label>';
    stb_html += '<div class="input-group">';
    stb_html += '<input name="" id="cadas_emailComercialClone_02" type="text" class="form-control form-control-lg" mask-email required>';
    stb_html += '</div>';
    stb_html += '</div>';
    stb_html += '<div class="form-group col-12 col-md">';
    stb_html += '<label class="mb-1">TELEFONE:</label>';
    stb_html += '<div class="input-group">';
    stb_html += '<input name="" id="cadas_numerocomercialClone_02" type="text" class="form-control form-control-lg" mask-telefone maxlength="11"  required>';
    stb_html += '</div>';
    stb_html += '</div>';
    stb_html += '</div>';

    $('#clone01Comercial01').html(stb_html);

});

$(document).on('click', '#btnTecnicoAdd', function (event) {
    $('#btnTecnicoAdd').addClass('d-none');
    var stb_html = '';
    stb_html += '<div class="form-row">';
    stb_html += '<div class="form-group col-12">';
    stb_html += '<label class="mb-1">NOME:</label>';
    stb_html += '<div class="input-group">';
    stb_html += '<input name="" id="cadas_nomeResponsavelTecnicoClone" type="text" class="form-control form-control-lg" required>';
    stb_html += '</div>';
    stb_html += '</div>';
    stb_html += '<div class="form-group col-12 col-md">';
    stb_html += '<label class="mb-1">E-MAIL:</label>';
    stb_html += '<div class="input-group">';
    stb_html += '<input name="" id="cadas_emailResponsavelTecnicoClone" type="text" class="form-control form-control-lg" mask-email required>';
    stb_html += '</div>';
    stb_html += '</div>';
    stb_html += '<div class="form-group col-12 col-md">';
    stb_html += '<label class="mb-1">TELEFONE:</label>';
    stb_html += '<div class="input-group">';
    stb_html += '<input name="" id="cadas_numeroResponsavelTEcnicoClone" type="text" class="form-control form-control-lg" mask-telefone maxlength="11" required>';
    stb_html += '</div>';
    stb_html += '</div>';
    stb_html += '</div>';


    stb_html += '<div class="btn btn-primary text-white" id="btnTecnicoAdd01">ADICIONAR +</div>';
    $('#clone01Tecnico').html(stb_html);

});

$(document).on('click', '#btnTecnicoAdd01', function (event) {
    $('#btnTecnicoAdd01').addClass('d-none');
    var stb_html = '';
    stb_html += '<div class="form-row">';
    stb_html += '<div class="form-group col-12">';
    stb_html += '<label class="mb-1">NOME:</label>';
    stb_html += '<div class="input-group">';
    stb_html += '<input name="" id="cadas_nomeResponsavelTecnicoClone01" type="text" class="form-control form-control-lg" required>';
    stb_html += '</div>';
    stb_html += '</div>';
    stb_html += '<div class="form-group col-12 col-md">';
    stb_html += '<label class="mb-1">E-MAIL:</label>';
    stb_html += '<div class="input-group">';
    stb_html += '<input name="" id="cadas_emailResponsavelTecnicoClone01" type="text" class="form-control form-control-lg" mask-email required>';
    stb_html += '</div>';
    stb_html += '</div>';
    stb_html += '<div class="form-group col-12 col-md">';
    stb_html += '<label class="mb-1">TELEFONE:</label>';
    stb_html += '<div class="input-group">';
    stb_html += '<input name="" id="cadas_numeroResponsavelTEcnicoClone01" type="text" class="form-control form-control-lg" mask-telefone  maxlength="11" required>';
    stb_html += '</div>';
    stb_html += '</div>';
    stb_html += '</div>';


    $('#clone01Tecnico01').html(stb_html);

});
