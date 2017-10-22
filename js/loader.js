//loader do conteúdo principal da página
$(document).ready(function(){
    $("#content").load("conteudos/corpo-home.html");
});
//loader do topo e rodapé da página
$(document).ready(function(){
    $("#topo").load("conteudos/_header.html");
    $("#rodape").load("conteudos/_footer.html");
});

//loader para o filtro de conteúdo dos itens
$("ul#na li a").click(function(){
    var page = $(this).attr("href");
    $("#content").load(page+".html");
});