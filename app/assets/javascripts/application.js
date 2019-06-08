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
//= require turbolinks
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

  if (carrinho_log != null)
    carrinho = carrinho_log

  carrinho.push(JSON.parse(produto));
  
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  console.log('aqui');
  console.log(carrinho);
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
      <button type="button" class="btn btn-primary">Finalizar Compra</button>
    `);
  else
    $(".carrinho-footer").append(`
      <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
    `);

  var preco_total = 0;
  carrinho_log.forEach(produto => {
    var qtd = carrinho_log.filter(prod => prod.id == produto.id).length;
    var produto_html = `
      <div class="col-12">
        <div class="carrinho-produto">
          <div class="carrinho-produto-body">
            <div class='carrinho-produto-img'>
              <img alt="image" class="img-responsive" src="https://images-americanas.b2w.io/produtos/01/00/sku/43816/4/43816428_1SZ.jpg">
            </div>
            <div class='carrinho-produto-info'>
              <h5 class="card-title">` + produto.nome + `</h5>
              <p class="card-text"><b>Descrição:</b> ` + produto.descricao + `</p>
              <p class="card-text"><b>Preço:</b> ` + produto.preco + `</p>
              <p class="card-text"><b>Quantidade:</b> ` + qtd + `</p>
              <a class="btn btn-primary" onclick="remove_produto_carrinho('`+ produto.id +`')">remover do carrinho</a>
            </div>
          </div>
        </div>
      </div>
    `;
    preco_total += parseFloat(produto.preco);
    $(".carrinho-body").append(produto_html);
  });

  $(".carrinho-body").append("<p>Total: R$ " + preco_total +"</p>");
}

$(document).ready(function(){
  $("#open-carrinho").click(function(){
    montar_carrinho();
  });
});



$(document).ready(function () {

  $( ".checkround" ).click(function() {
    if ($("#compra_forma_pagamento_cartão_de_crédito").is(":checked")) {
      $("#info-cartao").show();
      $("#info-boleto").hide();
    } else{
      $("#info-cartao").hide();
      $("#info-boleto").show();
    }
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