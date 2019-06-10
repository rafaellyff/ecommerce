// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//

//= require activestorage
//= require jquery
//= require jquery.turbolinks 
//= require rails-ujs
//= require bootstrap-sprockets
//= require jquery.mask
//= require_tree .

$( document ).on('turbolinks:load', function() {

  var mask = {
       money: function() {
         var el = this
         ,exec = function(v) {
           v = v.replace(/\D/g,"");
           v = new String(Number(v));
           var len = v.length;
           if (1== len)
             v = v.replace(/(\d)/,"0.0$1");
           else if (2 == len)
             v = v.replace(/(\d)/,"0.$1");
           else if (len > 2) {
             v = v.replace(/(\d{2})$/,'.$1');
           }
           return v;
         };
         setTimeout(function(){
           el.value = exec(el.value);
         },1);
       }
     }
   $(function(){
     $('.moeda').bind('keypress',mask.money)
   });
 });
 
 function adiciona_produto_carrinho(produto) {
   var carrinho = []
   var carrinho_log = JSON.parse(localStorage.getItem('carrinho'));
 
   if (carrinho_log != null) carrinho = carrinho_log
 
   carrinho.push(JSON.parse(produto));
   localStorage.setItem('carrinho', JSON.stringify(carrinho));
 }
 
 function remove_produto_carrinho(produto) {
   var answer = confirm("Confirmar remoção?")
   if (answer) {
     var carrinho = []
     var carrinho_log = JSON.parse(localStorage.getItem('carrinho'));
 
     if (carrinho_log != null) carrinho = carrinho_log
 
     produtos = carrinho.filter(prod => prod.id == produto);
     produtos.pop();
     carrinho = carrinho.filter(prod => prod.id != produto).concat(produtos);
     localStorage.setItem('carrinho', JSON.stringify(carrinho));
   }
   else {
       //some code
   }
   montar_carrinho();
 }
 
 function montar_carrinho() {
   $(".carrinho-body").empty();
   $(".carrinho-footer").empty();
   var carrinho_log = JSON.parse(localStorage.getItem('carrinho'));
 
   if (carrinho_log.length != 0)
     $(".carrinho-footer").append(`
       <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
       <button type="button" class="btn btn-primary" id="finalizar-compra">Finalizar Compra</button>
     `);
   else
     $(".carrinho-footer").append(`
       <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
     `);
 
   var preco_total = 0;
   var a = jQuery.unique(carrinho_log)
   
   var carrinho_filter = carrinho_log.reduce((x, y) => x.findIndex(e=>e.id==y.id)<0 ? [...x, y]: x, [])
   
   carrinho_filter.forEach(produto => {
     var qtd = carrinho_log.filter(prod => prod.id == produto.id).length;
     var produto_html = `
       <div class="col-12">
         <div class="carrinho-produto">
           <div class="carrinho-produto-body">
             <div class='carrinho-produto-img'>
               <img alt="image" class="img-responsive" src="/system/produtos/fotos/000/000/00`+produto.id+`/medium/`+ produto.foto_file_name +`" id="prod-`+produto.id+`">
             </div>
             <div class='carrinho-produto-info'>
               <h5 class="card-title">` + produto.nome + `</h5>
               <p class="card-text"><b>Descrição:</b> ` + produto.descricao + `</p>
               <p class="card-text"><b>Preço:</b> ` + produto.preco + `</p>
               <p class="card-text"><b>Quantidade:</b> ` + qtd + `</p>
               <a class="btn btn-primary" onclick="remove_produto_carrinho('`+ produto.id +`')" id="remover-do-carrinho">remover do carrinho</a>
             </div>
           </div>
         </div>
       </div>
       `;
       preco_total += parseFloat(produto.preco) * qtd;
       $(".carrinho-body").append(produto_html);
   });
 
   $(".carrinho-footer").append(`
     <div class='content-price-carrinho'>
       <span class='price-total'>Total: R$ ` + preco_total + `</span>
     </div>
     `);

    $("#finalizar-compra").click(function(){
      carrinho_log = JSON.parse(localStorage.getItem('carrinho'));
      var carrinho_filter = carrinho_log.reduce((x, y) => x.findIndex(e=>e.id==y.id)<0 ? [...x, y]: x, [])
      var compra_final = [];
      carrinho_filter.forEach(element => {
        qtd = carrinho_log.filter(el => el.id == element.id).length;
        compra_final.push({produto: element.id, qtde: qtd});
      });
      send_compra(compra_final);
    });
 }
 
 $(document).ready(function(){
   $("#open-carrinho").click(function(){
     montar_carrinho();
   });
 });
 
 function send_compra(dt) {
   $.ajax({
     url: "/compras/save_produtos_cliente",
     type: "POST",
     contentType: 'application/json',
     dataType: 'json',
     data: JSON.stringify(dt),
     success: function(data) {
      console.log('aqui');
      document.location.href = "/compras/finalizar_compra";
     },
     error: function(XMLHttpRequest, textStatus, errorThrown) {
      document.location.href = "/usuarios/sign_in";
     }  
   });
 }
 
 $(document).ready(function () {
   forma_pagamento();
   $( ".checkround" ).click(function() {
     forma_pagamento();
   }); 
 
   $(".cartao").mask("0000 0000 0000 0000");
   $(".validade").mask("00/00");
   $(".ccv").mask("000");
   $(".cep").mask("00.000-000");
   $(".contato").mask("(00) 00000-0000");
 
   //Initialize tooltips
   $('.nav-tabs > li a[title]').tooltip();
   
   //Wizard
   $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
 
     var $target = $(e.target);
 
     if ($target.parent().hasClass('disabled')) {
       return false;
     }
   });
 
   $(".next-step").click(function (e) {
 
     var $active = $('.wizard .nav-tabs li.active');
     $active.next().removeClass('disabled');
     nextTab($active);
 
   });
   $(".prev-step").click(function (e) {
 
     var $active = $('.wizard .nav-tabs li.active');
     prevTab($active);
 
   });
 });
 
 function nextTab(elem) {
   $(elem).next().find('a[data-toggle="tab"]').click();
 }
 function prevTab(elem) {
   $(elem).prev().find('a[data-toggle="tab"]').click();
 }
 
 function forma_pagamento(){
   if ($("#compra_forma_pagamento_cartão_de_crédito").is(":checked")) {
     $("#info-cartao").show();
     $("#info-boleto").hide();
   } else{
     limpar_campos();
     $("#info-cartao").hide();
     $("#info-boleto").show();
   }
 }
 
 function limpar_campos(){
   $("#compra_numero_cartao").val("");
   $("#compra_nome_titular").val("");
   $("#compra_data_validade").val("");
   $("#compra_ccv").val("");
 }
 

function lista_categorias(){
  var categorias = [];    
  
  $("input[name='categoria']:checked").each(function(){
    categorias.push($(this).val());
  });
  
  return categorias;
}


$(document).ready(function () {
  $("#filtrar").click(function (){
    var categorias =  lista_categorias();
    var ordenar = $("input[name='ordenar_por']:checked").val();

    $.ajax({
      method: "GET",
      url: "/produtos/filtrar_catalogo",
      data: { categorias: categorias, ordenar: ordenar}
    })
    .done(function(retorno){
      $("#lista_produtos").html( retorno );
    
    });
  });
});
