$(".open").on("click", function(){
    $(".popup, .popup-content").addClass("active");
    });

$(".close, .popup").on("click", function(){
    $(".popup, .popup-content").removeClass("active");
    });


$(".open-2").on("click", function(){
    $(".popup-2, .popup-content-2").addClass("active");
    });

$(".close-2, .popup-2").on("click", function(){
    $(".popup-2, .popup-content-2").removeClass("active");
    });    