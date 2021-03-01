
// /* --- AJAX login --- */
// $('#btn_login').bind('click', function(event) {
//     event.preventDefault();
    
//     $('#alert_login').addClass('d-none');
    
//     var parametros = {};
//     parametros.pLogin = $('#login_cpf').val();
//     parametros.pSenha = $('#login_senha').val();

//      $.ajax({
//          type: 'POST',
//          url: '/Login/MTD_Autenticacao',
//          contentType: 'application/json; charset=utf-8',
//          dataType: 'json',
//          data: JSON.stringify(parametros),
//          beforeSend: function () {
//              $('#btn_login').attr('disabled', 'disabled');
//              $('#btn_login').html('<i class="fa fa-1x fa-spinner fa-spin"></i><span> Processando...</span>');
//          },
//          success: function (returnValue) {
//              var jsonResult = JSON.parse(returnValue);
//              if (jsonResult.PRP_Requisicao.PRP_Status == false) {
//                  $('#alert_login').removeClass('d-none');
//                  $('#alert_login').html(jsonResult.PRP_Requisicao.PRP_Mensagem);
//                  $('#btn_login').text('Login');
//                  $('#btn_login').removeAttr('disabled', 'disabled');
//              }
//              else {
//                  $('#alert_login').addClass('d-none');
//                  window.location.href = jsonResult.URL;
//              }
//          }
//      });
// });

// /* --- Pega valor de "login_cpf" e insere nas modais "Esqueci a Senha", "Cadastrar sua Senha" e "Contato" --- */
// $('#linkEsqSenha, #btn_login, #btn_contatoModal').bind('click', function(event) {
//     var valorLogin = $('#login_cpf').val();
//     if (valorLogin.lenth != ''){
//         document.getElementById('ipt_cpf').value = valorLogin;
//         document.getElementById('cadas_cpf').value = valorLogin;
//         document.getElementById('contato_email').value = valorLogin;
//     }
// });

// /* --- AJAX Esqueci a senha --- */
// $('#btn_EsqueciSenha').bind('click', function (event) {
//     event.preventDefault();

//     if ($('#ipt_cpf').val() == '') {
//         $('#alert_EsqueciSenha').removeClass('d-none').html('<span class="alert alert-danger py-2">Campo CPF vazio.</span>');
//         return false;
//     }
    
//     // Validar CPF
//         var cpf = $('#ipt_cpf').val();
//         cpf = cpf.replace('.', '');
//         cpf = cpf.replace('.', '');
//         cpf = cpf.replace('-', '');

//         if( cpf.length != 11 ||
//             cpf == '00000000000' ||
//             cpf == '11111111111' ||
//             cpf == '22222222222' ||
//             cpf == '33333333333' ||
//             cpf == '44444444444' ||
//             cpf == '55555555555' ||
//             cpf == '66666666666' ||
//             cpf == '77777777777' ||
//             cpf == '88888888888' ||
//             cpf == '99999999999' ){
//             $('#alert_EsqueciSenha').removeClass('d-none').html('<span class="alert alert-danger py-2">CPF inválido.</span>');
//             return false;
//         }
//         soma = 0;
//         for(i = 0; i < 9; i++){
//             soma += parseInt(cpf.charAt(i)) * (10 - i);
//         }   
//         resto = 11 - (soma % 11);
//         if(resto == 10 || resto == 11){
//             resto = 0;
//         }
//         if(resto != parseInt(cpf.charAt(9))){
//             $('#alert_EsqueciSenha').removeClass('d-none').html('<span class="alert alert-danger py-2">CPF inválido.</span>');
//             return false;
//         }
//         soma = 0;
//         for(i = 0; i < 10; i ++){
//             soma += parseInt(cpf.charAt(i)) * (11 - i);
//         }
//         resto = 11 - (soma % 11);
//         if(resto == 10 || resto == 11){
//             resto = 0;
//         }   
//         if(resto != parseInt(cpf.charAt(10))){
//             $('#alert_EsqueciSenha').removeClass('d-none').html('<span class="alert alert-danger py-2">CPF inválido.</span>');
//             return false;
//         }else{
//             $('#alert_EsqueciSenha').addClass('d-none');
//             // return true;
//         }

//     var parametros = {};
//     parametros.pLogin = $('#ipt_email').val();
    
//     $.ajax({
//         type: 'POST',
//         url: '/Login/MTD_EsqueciSenha',
//         data: JSON.stringify(parametros),
//         contentType: 'application/json; charset=utf-8',
//         dataType: 'json',
//         beforeSend: function () {
//             $('#btn_EsqueciSenha').attr('disabled', 'disabled');
//             $('#alert_EsqueciSenha').removeClass('d-none').html('<span class="alert alert-info py-2"><i class="fa fa-1x fa-spinner fa-spin"></i> Enviando...</span>');
//         },
//         success: function (returnValue) {
//             var jsonResult = JSON.parse(returnValue);
//             if (jsonResult.PRP_Status == true) {
//                 $('#btn_EsqueciSenha').removeAttr('disabled', 'disabled');
//                 $('#alert_EsqueciSenha').removeClass('d-none').html(jsonResult.PRP_Mensagem);
//             } else {
//                 $('#btn_EsqueciSenha').removeAttr('disabled', 'disabled');
//                 $('#alert_EsqueciSenha').removeClass('d-none').html('<p class="alert alert-warning py-2">'+jsonResult.PRP_Mensagem+'</p>');
//             }
//         }
//     });
// });

// /* --- AJAX Cadastre-se --- */
// $('#btn_Cadastrar').bind('click', function (event) {
//     event.preventDefault();
   
//     // Validar CPF
//         var cpf = $('#cadas_cpf').val();
//         cpf = cpf.replace('.', '');
//         cpf = cpf.replace('.', '');
//         cpf = cpf.replace('-', '');

//         if( cpf.length != 11 ||
//             cpf == '00000000000' ||
//             cpf == '11111111111' ||
//             cpf == '22222222222' ||
//             cpf == '33333333333' ||
//             cpf == '44444444444' ||
//             cpf == '55555555555' ||
//             cpf == '66666666666' ||
//             cpf == '77777777777' ||
//             cpf == '88888888888' ||
//             cpf == '99999999999' ){
//             $('#alert_cadastro').removeClass('d-none').html('<span class="alert alert-danger py-2">CPF inválido.</span>');
//             $('#cadas_cpf').addClass('border border-danger');
//             return false;
//         }
//         soma = 0;
//         for(i = 0; i < 9; i++){
//             soma += parseInt(cpf.charAt(i)) * (10 - i);
//         }   
//         resto = 11 - (soma % 11);
//         if(resto == 10 || resto == 11){
//             resto = 0;
//         }
//         if(resto != parseInt(cpf.charAt(9))){
//             $('#alert_cadastro').removeClass('d-none').html('<span class="alert alert-danger py-2">CPF inválido.</span>');
//             $('#cadas_cpf').addClass('border border-danger');
//             return false;
//         }
//         soma = 0;
//         for(i = 0; i < 10; i ++){
//             soma += parseInt(cpf.charAt(i)) * (11 - i);
//         }
//         resto = 11 - (soma % 11);
//         if(resto == 10 || resto == 11){
//             resto = 0;
//         }   
//         if(resto != parseInt(cpf.charAt(10))){
//             $('#alert_cadastro').removeClass('d-none').html('<span class="alert alert-danger py-2">CPF inválido.</span>');
//             $('#cadas_cpf').addClass('border border-danger');
//             return false;
//         }else{
//             $('#alert_cadastro').addClass('d-none');
//             $('#cadas_cpf').removeClass('border border-danger');
//             // return true;
//         }

//     // Valida Nome
//         if ($('#cadas_nome').val().length <= 3) {
//             $('#alert_cadastro').removeClass('d-none').html('<span class="alert alert-danger py-2">Nome incompleto.</span>');
//             $('#cadas_nome').addClass('border border-danger');
//             return false;
//         }else{
//             $('#alert_cadastro').addClass('d-none');
//             $('#cadas_nome').removeClass('border border-danger');
//             // return true;
//         }

//     // Valida E-mail
//         usuario = $('#cadas_email').val().substring(0, $('#cadas_email').val().indexOf('@'));
//         dominio = $('#cadas_email').val().substring($('#cadas_email').val().indexOf('@')+ 1, $('#cadas_email').val().length);
//         if ((usuario.length >=1) &&
//             (dominio.length >=3) && 
//             (usuario.search('@')==-1) && 
//             (dominio.search('@')==-1) &&
//             (usuario.search(' ')==-1) && 
//             (dominio.search(' ')==-1) &&
//             (dominio.search('.')!=-1) &&      
//             (dominio.indexOf('.') >=1)&& 
//             (dominio.lastIndexOf('.') < dominio.length - 1)) {
//             $('#alert_cadastro').addClass('d-none');
//             $('#cadas_email').removeClass('border border-danger');
//             // return true;
//         }else{
//             $('#alert_cadastro').removeClass('d-none').html('<span class="alert alert-danger py-2">E-mail inválido.</span>');
//             $('#cadas_email').addClass('border border-danger');
//             return false;
//         }

//     // Valida Celular
//         if($('#cadas_celular').val().length < 13){
//             $('#alert_cadastro').removeClass('d-none').html('<span class="alert alert-danger py-2">Celular inválido.</span>');
//             $('#cadas_celular').addClass('border border-danger');
//             return false;
//         }else{
//             $('#alert_cadastro').addClass('d-none');
//             $('#cadas_celular').removeClass('border border-danger');
//             // return true;
//         }

//     // Validar senha
//         if ($('#cadas_senha').val().length <= 3) {
//             $('#alert_cadastro').removeClass('d-none').html('<span class="alert alert-danger py-2">Senha não informada.</span>');
//             $('#cadas_senha').addClass('border border-danger');
//             return false;
//         } else {
//             $('#alert_cadastro').addClass('d-none');
//             $('#cadas_senha').removeClass('border border-danger');
//             // return true;
//         }

//     // Validar confirmação de senha
//         if ($('#cadas_senha').val() != $('#cadas_confSenha').val()){
//             $('#alert_cadastro').removeClass('d-none').html('<span class="alert alert-danger py-2">Repita a senha corretamente.</span>');
//             $('#cadas_confSenha').addClass('border border-danger');
//             return false;
//         }else{
//             $('#alert_cadastro').addClass('d-none');
//             $('#cadas_confSenha').removeClass('border border-danger');
//             // return true;
//         }

//     // Validar Regulamento
//         if ($('#regulamento:checked').length == false) {
//             // $(this).parents('form-login-cadastrar').submit();
//             $('#alert_cadastro').removeClass('d-none').html('<span class="alert alert-danger py-2">Aceite o regulamento para continuar.</span>');
//             return false;
//         }else{
//             $('#alert_cadastro').addClass('d-none');
//             $('#regulamento').removeClass('border border-danger');
//             // return true;
//         }

//     var parametros = {};
//     parametros.PRP_Nome = $('#cadas_nome').val();
//     parametros.PRP_Cpf = $('#cadas_cpf').val();
//     parametros.PRP_Email = $('#cadas_email').val();
//     parametros.PRP_Celular = $('#cadas_celular').val();
//     parametros.PRP_Senha = $('#cadas_senha').val();
//     // parametros.ativoReg = $('#regulamento').is(":checked");

//     $.ajax({
//         type: 'POST',
//         url: '/Login/MTD_Cadasto',
//         contentType: 'application/json; charset=utf-8',
//         dataType: 'json',
//         data: JSON.stringify(parametros),
//         beforeSend: function () {
//             $('#btn_Cadastro').attr('disabled', 'disabled');
//             $('#alert_cadastro').removeClass('d-none').html('<span class="alert alert-info text-center py-2"><i class="fa fa-1x fa-spinner fa-spin"></i> Processando...</span>');
//         },
//         success: function (returnValue) {
//             var jsonResult = JSON.parse(returnValue);
//             if (jsonResult === true) {
//                 $('#alert_cadastro').removeClass('d-none').html('<p class="alert alert-success text-center py-2">'+jsonResult.PRP_Mensagem+'</p>');
//             }
//             else{
//                 $('#alert_cadastro').removeClass('d-none').html('<p class="alert alert-danger text-center py-2">'+jsonResult.PRP_Mensagem+'</p>');
//                 $('#btn_Cadastro').removeAttr('disabled', 'disabled');
//             }
//         }
//     });
// });

// /* --- AJAX Contato --- */
// $('#btn_contato').bind('click', function (event) {
//     event.preventDefault();
    
//     // Valida Nome
//         if ($('#contato_nome').val().length <= 3) {
//             $('#alert_contato').removeClass('d-none').html('<span class="alert alert-danger py-2">Nome incompleto.</span>');
//             $('#contato_nome').addClass('border border-danger');
//             return false;
//         }else{
//             $('#alert_contato').addClass('d-none');
//             $('#contato_nome').removeClass('border border-danger');
//             // return true;
//         }

//     // Valida E-mail
//         usuario = $('#contato_email').val().substring(0, $('#contato_email').val().indexOf('@'));
//         dominio = $('#contato_email').val().substring($('#contato_email').val().indexOf('@')+ 1, $('#contato_email').val().length);
//         if ((usuario.length >=1) &&
//             (dominio.length >=3) && 
//             (usuario.search('@')==-1) && 
//             (dominio.search('@')==-1) &&
//             (usuario.search(' ')==-1) && 
//             (dominio.search(' ')==-1) &&
//             (dominio.search('.')!=-1) &&      
//             (dominio.indexOf('.') >=1)&& 
//             (dominio.lastIndexOf('.') < dominio.length - 1)) {
//             $('#alert_contato').addClass('d-none');
//             $('#contato_email').removeClass('border border-danger');
//             // return true;
//         }else{
//             $('#alert_contato').removeClass('d-none').html('<span class="alert alert-danger py-2">E-mail inválido.</span>');
//             $('#contato_email').addClass('border border-danger');
//             return false;
//         }

//     // Valida Celular
//         if($('#contato_celular').val().length < 13){
//             $('#alert_contato').removeClass('d-none').html('<span class="alert alert-danger py-2">Celular inválido.</span>');
//             $('#contato_celular').addClass('border border-danger');
//             return false;
//         }else{
//             $('#alert_contato').addClass('d-none');
//             $('#contato_celular').removeClass('border border-danger');
//             // return true;
//         }

//     // Validar mensagem / observação
//         if ($('#contato_mensagem').val().length <= 3) {
//             $('#alert_contato').removeClass('d-none').html('<span class="alert alert-danger py-2">Deixe sua mensagem.</span>');
//             $('#contato_mensagem').addClass('border border-danger');
//             return false;
//         }else{
//             $('#alert_contato').addClass('d-none');
//             $('#contato_mensagem').removeClass('border border-danger');
//             // return true;
//         }

//     var parametros = {};
//     parametros.PRP_Nome = $('#contato_nome').val();
//     parametros.PRP_Email = $('#contato_email').val();
//     parametros.PRP_Celular = $('#contato_celular').val();
//     parametros.PRP_Mensagem = $('#contato_mensagem').val();

//     $.ajax({
//         type: 'POST',
//         url: '/Login/MTD_Contato',
//         data: JSON.stringify(parametros),
//         contentType: 'application/json; charset=utf-8',
//         dataType: 'json',
//         beforeSend: function () {
//             $('#btn_contato').attr('disabled', 'disabled');
//             $('#alert_contato').removeClass('d-none').html('<span class="alert alert-info py-2"><i class="fa fa-1x fa-spinner fa-spin"></i> Enviando...</span>');
//         },
//         success: function (returnValue) {
//             var jsonResult = JSON.parse(returnValue);
//             if (jsonResult.PRP_Status === true) {
//                 $('#alert_contato').removeClass('d-none').html(jsonResult.PRP_Mensagem);
//                 $('#btn_contato').removeAttr('disabled', 'disabled');
//             }
//             else {
//                 $('#alert_contato').removeClass('d-none').html(jsonResult.PRP_Mensagem);
//                 $('#btn_contato').removeAttr('disabled', 'disabled');
//             }
//         }
//     });
// });