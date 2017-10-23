
$(document).ready(function(){
    $("#topo").load("conteudos/_header.html");
    $("#rodape").load("conteudos/_footer.html");
});

$(document).ready(function(){
    $("#content").load("conteudos/corpo-home.html");
    $("ul#menu li a").click(function(){
        var pagina = $(this).attr('href');
        $('#content').load('conteudos/'+pagina+'.html');
        return false;
    });
});

$(document).ready(function(){
    $("#content").load("conteudos/anjosdemons.html");
    $("ul#menu li a").click(function(){
        var pagina = $(this).attr('href');
        $('#content').load('conteudos/'+pagina+'.html');
        return false;
    });
});
