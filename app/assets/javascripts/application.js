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

$(document).ready(function(){

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

 function count_span_qtd(){
  var carrinho_log = JSON.parse(localStorage.getItem('carrinho'));
  $('.qtd-carrinho').empty();
  $('.qtd-carrinho').append(carrinho_log.length);
 }
 
 function adiciona_produto_carrinho(produto, qtd) {
  for (let i = 0; i < qtd; i++) {
    var carrinho = []
    var carrinho_log = JSON.parse(localStorage.getItem('carrinho'));
  
    if (carrinho_log != null) carrinho = carrinho_log
  
    carrinho.push(JSON.parse(produto));
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  $("#aviso").fadeIn(700, function(){
    window.setTimeout(function(){
      $('#aviso').fadeOut();
      }, 2000);
  });
  count_span_qtd();
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

 function aumentar_qtd_produto_carrinho(id) {
  var carrinho_log = JSON.parse(localStorage.getItem('carrinho'));
  var produto = carrinho_log.filter(el => el.id == id)[0];
  adiciona_produto_carrinho(JSON.stringify(produto),1);
  montar_carrinho();
 }

  function format_moeda_real(value){
    return parseInt(value).toLocaleString('pt-BR') + ',00';
  }
 
 function montar_carrinho() {
   $(".carrinho-body").empty();
   $(".carrinho-footer").empty();
   var carrinho_log = JSON.parse(localStorage.getItem('carrinho'));
 
   if (carrinho_log.length != 0)
     $(".carrinho-footer").append(`
       <button type="button" class="btn btn-danger" id="limpar-carrinho" data-dismiss="modal">Limpar Carrinho</button>
       <button type="button" class="btn btn-primary" id="finalizar-compra">Finalizar Compra</button>
     `);
   else
     $(".carrinho-footer").append(`
       <button type="button" class="btn btn-default" data-dismiss="modal">Ir as compras</button>
     `);
 
   var preco_total = 0;
   
   var carrinho_filter = carrinho_log.reduce((x, y) => x.findIndex(e=>e.id==y.id)<0 ? [...x, y]: x, [])
   
   carrinho_filter.forEach(produto => {
     var qtd = carrinho_log.filter(prod => prod.id == produto.id).length;
      if (produto.id < 9) {
      var id_imagem =  "0" + produto.id
     } else {
      var id_imagem = produto.id
     }
     var produto_html = `
       <div class="col-12">
         <div class="carrinho-produto">
           <div class="carrinho-produto-body">
             <div class='carrinho-produto-img'>
               <img alt="image" class="img-responsive" src="/system/produtos/fotos/000/000/0`+id_imagem+`/medium/`+ produto.foto_file_name +`" id="prod-`+produto.id+`">
             </div>
             <div class='carrinho-produto-info'>
               <h5 class="card-title">` + produto.nome + `</h5>
               <p class="card-text"><b>Descrição:</b> ` + produto.descricao + `</p>
               <p class="card-text"><b>Preço Unid.:</b> R$ ` + format_moeda_real(produto.preco) + `</p>
               <p class="card-text"><b>Quantidade:</b> ` + qtd + `</p>
               <a class="btn btn-danger" onclick="remove_produto_carrinho('`+ produto.id +`')" id="remover-do-carrinho"><i class="fa fa-trash"></i> Remover </a>
               <a class="btn btn-primary" onclick="aumentar_qtd_produto_carrinho('`+ produto.id +`')"><i class="fa fa-cart-plus"></i> Adicionar mais</a>
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
       <span class='price-total'>Total: R$ ` + format_moeda_real(preco_total) + `</span>
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

    $("#limpar-carrinho").click(function(){
      localStorage.setItem('carrinho', JSON.stringify([]));
      montar_carrinho();
    });
    count_span_qtd();
 }
 
 $(document).ready(function(){
  count_span_qtd();
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

$(document).ready(function () {
  $(".calcular_valor").keyup(function(){
    valor_total_item($(this).attr("id"));
    extrato_compra();
  });

  $("input:checkbox").change(function(){
    var id = $(this).attr("name").replace("remover_","");
    if ($(this).is(':checked')) {
      if ($("input:checkbox").length - $("input:checkbox:checked").length < 1 ){
        alert("Você não pode remover esse item, pois cada compra precisa de no mínimo 1 item");
        $(this).prop("checked", false);
      } else {
        remover_item_edit(id);
      }
    } else{
      add_item_edit(id);
    }
  })

  function valor_total_item(item_id){
    var qtde = $("input[name=quantidade_"+ item_id+"]").val();
    var valor = $("input[name=valor_"+ item_id+"]").val();
    var total_item = Number(qtde) * Number(valor);
    $("#total_item_"+item_id).text("R$ " + total_item);
  }

  function extrato_compra(){
    var total_compra = valor_geral_compra();
    $("#extrato_valor_compra").text("R$ "+ total_compra);
    $("#extrato_valor_total").text("R$ "+ (total_compra+50));
    $("#compra_valor_total").val(total_compra+50);
  }
});

function isFloatNumber(item,evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode==46)
  {
      var regex = new RegExp(/\./g)
      var count = $(item).val().match(regex).length;
      if (count > 1)
      {
          return false;
      }
  }
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
  }
  return true;
}

function valor_geral_compra(){
  var total_compra = 0;
  $(".total").each(function(){
     total_compra += Number($(this).text().replace("R$",""));
  });
  return total_compra
}

function isNumber(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
  }
  return true;
}

function remover_item_edit(id){
  var tirar_valor =  $("#total_item_"+id).text().replace("R$","");
  var total_anterior = $("#compra_valor_total").val();
  var total_compra = total_anterior - tirar_valor ;
  $("#extrato_valor_compra").text("R$ "+ (total_compra- 50));
  $("#extrato_valor_total").text("R$ "+ total_compra);
  $("#compra_valor_total").val(total_compra);
  $("#tr_"+id).css("background-color", "#ff9999");
}

function add_item_edit(id){
  var add_valor =  $("#total_item_"+id).text().replace("R$","");
  var total_anterior = $("#compra_valor_total").val();
  var total_compra = Number(total_anterior) + Number(add_valor);
  $("#extrato_valor_compra").text("R$ "+ (total_compra-50));
  $("#extrato_valor_total").text("R$ "+ total_compra);
  $("#compra_valor_total").val(total_compra);
  $("#tr_"+id).css("background-color", "white");
}