//loader header e footer
$(document).ready(function(){
    $("#topo").load("conteudos/_header.html");
    $("#rodape").load("conteudos/_footer.html");
});
// loader content das páginas
$(document).ready(function(){
    $("#content").load("conteudos/home.html");
    $("ul#menu li a").click(function(){
        var pagina = $(this).attr('href');
        $('#content').load('conteudos/'+pagina+'.html');
        return false;
    });
});

//$(document).ready(function(){
//    $("#content").load("conteudos/anjosdemons.html");
//    $("ul#menu li a").click(function(){
//        var pagina = $(this).attr('href');
//        $('#content').load('../conteudos/'+pagina+'.html');
//        return false;
//    });
//});

//Carrinho de Compras

var carrinhoDeCompra = (function ()
{
    // Propriedades e Métodos Privados
    var carrinho = [];

    //Construtor
    function Produto(nome, preco, cont)
    {
        this.nome = nome
        this.preco = preco
        this.cont = cont
    }

    //salvar carrinho na session
    function salvarCarrinho()
    {
        sessionStorage.setItem("carrinhoDeCompra", JSON.stringify(carrinho));
    }

    //carregar carrinho
    function carregarCarrrinho()
    {
        carrinho = JSON.parse(sessionStorage.getItem("carrinhoDeCompra"));
        if (carrinho === null)
        {
            carrinho = [];
        }
    }

    carregarCarrrinho();


    // Métodos e propriedades Publicos
    var obj = {};

    //Método adicionar para o carrinho
    obj.adicionarAoCarrinho = function (nome, preco, cont)
    {
        for (var i in carrinho) {
            if (carrinho[i].nome === nome){
                carrinho[i].cont += cont;
                salvarCarrinho();
                return;
            }
        }

        console.log("adicionarAoCarrinho:", nome, preco, cont);

        var item = new Produto(nome, preco, cont);
        carrinho.push(item);
        salvarCarrinho();
    };

    obj.setCountForItem = function (nome, cont) {
        for (var i in carrinho) {
            if (carrinho[i].nome === nome) {
                carrinho[i].cont = cont;
                break;
            }
        }
        salvarCarrinho();
    };

    //Remove um produto
    obj.removeProduto = function (nome) { 
        for (var i in carrinho) {
            if (carrinho[i].nome === nome) { // "3" === 3 false
                carrinho[i].cont--; // carrinho[i].cont --
                if (carrinho[i].cont === 0) {
                    carrinho.splice(i, 1);
                }
                break;
            }
        }
        salvarCarrinho();
    };

    //remove todos os produtos referente ao nome
    obj.removeTodosProdutos = function (nome) { 
        for (var i in carrinho) {
            if (carrinho[i].nome === nome) {
                carrinho.splice(i, 1);
                break;
            }
        }
        salvarCarrinho();
    };

    //limpa carrinho
    obj.limparCarrinho = function () {
        carrinho = [];
        salvarCarrinho();
    }

    //devolve a contagem total
    obj.contagemCarrinho = function () { 
        var totalCount = 0;
        for (var i in carrinho) {
            totalCount += carrinho[i].cont;
        }

        return totalCount;
    };

    //retorno do custo total
    obj.custoTotal = function () { 
        var totalCost = 0;
        for (var i in carrinho) {
            totalCost += carrinho[i].preco * carrinho[i].cont;
        }
        return totalCost.toFixed(2);
    };

    //conjunto de Produtos
    obj.listarProdutos = function () { 
        var cartCopy = [];
        console.log("Listing cart");
        console.log(carrinho);
        for (var i in carrinho) {
            console.log(i);
            var item = carrinho[i];
            var itemCopy = {};
            for (var p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = (item.preco * item.cont).toFixed(2);
            cartCopy.push(itemCopy);
        }
        return cartCopy;
    };

    // ----------------------------
    return obj;
})();


//Exibir o carrinho
$(".adicionar").click(function (event) {
    event.preventDefault();
    var nome = $(this).attr("data-name");
    var preco = Number($(this).attr("data-price"));

    carrinhoDeCompra.adicionarAoCarrinho(nome, preco, 1);
    exibirCarrinho();
});

$("#limparCarrinho").click(function (event) {
    carrinhoDeCompra.limparCarrinho();
    exibirCarrinho();
});

function exibirCarrinho() {
    var carrrinhoArray = carrinhoDeCompra.listarProdutos();
    console.log(carrrinhoArray);
    var output = "";

    for (var i in carrrinhoArray) {
        output += "<li style='list-style-type: none'>" +
            carrrinhoArray[i].nome +
            " <input style='width:50px' class='item-cont' type='number' data-name='" +
            carrrinhoArray[i].nome +
            "' value='" + carrrinhoArray[i].cont + "' >" +
            " x " + carrrinhoArray[i].preco +
            " = " + carrrinhoArray[i].total +
            " <button style='display: none' class='somar-item' data-name='" +
            carrrinhoArray[i].nome + "'>Adicionar +1</button>" +
            " <button style='display: none' class='subtrair-item' data-name='" +
            carrrinhoArray[i].nome + "'>Tirar um produto</button>" +
            " <button class='delete-item btn' data-name='" +
            carrrinhoArray[i].nome + "'>Remover Item</button>" +
            "</li><br>";
    }

    $("#show-cart").html(output);
    $("#count-cart").html(carrinhoDeCompra.contagemCarrinho());
    $("#total").html(carrinhoDeCompra.custoTotal());
}

$("#show-cart").on("click", ".delete-item", function (event) {
    var nome = $(this).attr("data-name");
    carrinhoDeCompra.removeTodosProdutos(nome);
    exibirCarrinho();
});

$("#show-cart").on("click", ".subtrair-item", function (event) {
    var nome = $(this).attr("data-name");
    carrinhoDeCompra.removeProduto(nome);
    exibirCarrinho();
});

$("#show-cart").on("click", ".somar-item", function (event) {
    var nome = $(this).attr("data-name");
    carrinhoDeCompra.adicionarAoCarrinho(nome, 0, 1);
    exibirCarrinho();
});

$("#show-cart").on("change", ".item-cont", function (event) {
    var nome = $(this).attr("data-name");
    var cont = Number($(this).val());
    carrinhoDeCompra.setCountForItem(nome, cont);
    exibirCarrinho();
});


exibirCarrinho();