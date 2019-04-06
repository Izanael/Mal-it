$(function () {

    // Chekbox
    $('#checkAnime').click(function() {
        if( $(this).is(':not(:checked)') ){
            $(this).parent('.center').next('.container').children().children('#boxAnime').animate({width: "100%"});
        }
        else {
            $(this).parent('.center').next('.container').children().children('#boxAnime').animate({width: "50%"});
        }
    });

    $('#checkManga').click(function() {
        if( $(this).is(':not(:checked)') ){
            $(this).parent('.center').next('.container').children('.box').children('.boxManga').animate({width: "100%"});
        }
        else {
            $(this).parent('.center').next('.container').children('.box').children('.boxManga').animate({width: "50%"});
        }
    });

    // Chekox -> Box Hover
    $('.box').mouseover(function() {
        if( $(this).parent().parent().children('.center').children('#checkAnime').is(':not(:checked)')) {
            $(this).find('#buttonAnime').css({opacity: 0});
        }
        else {
            $(this).find('#buttonAnime').css({opacity: 1});
        }
    })
    $('.box').mouseover(function() {
        if( $(this).parent().parent().children('.center').children('#checkManga').is(':not(:checked)')) {
            $(this).find('#buttonManga').css({opacity: 0});
        }
        else {
            $(this).find('#buttonManga').css({opacity: 1});
        }
    })
})


    
