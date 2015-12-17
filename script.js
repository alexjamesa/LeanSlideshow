$(document).ready(function () {
    
    // Setup timer (time units are ms)
    var interval = 5000; 
    var timer = setInterval(simulateClick, interval);  
    var slideTime = 800;

    // Create aliases for all objects we'll use
    var slideDeck=$('.slideshow ul');
    var slideshowContainer=$('.slideshow_container');
    var navigationButton=$('.slideshow_nav img');
    var previousButtonID='prev';
    var nextButtonID='next';
    
    var numberOfSlides=slideDeck.find('li').length;

    // Respond to next and prev button clicks
    navigationButton.click(function (e) {
        if (slideDeck.is(':animated')) {
            return false;
        }else if (e.target.id == previousButtonID) {
            moveDeck(-1);
            animateToSlide(true);     
        }else if (e.target.id == nextButtonID) {
            moveDeck(+1);
            animateToSlide(true);     
        }else{
           return false;
        }
    });

    // moveDeck returns the new left position of the deck: 0% for first slide, -100% for second, etc.
    var deckPosition=0;
    function moveDeck(shift){
        deckPosition+=shift;
        if (deckPosition<0){
            deckPosition=numberOfSlides-1;
        }else if (deckPosition>=numberOfSlides){
            deckPosition=0;
        }
        return deckPosition * -100;
    }

    function animateToSlide(animate){
        var slideWidth=slideDeck.width()/numberOfSlides;
        var leftValue=moveDeck(0)/100*slideWidth+'px';
        if (animate){
            slideDeck.stop().animate({'left': leftValue}, slideTime);
        }else{
            slideDeck.stop().css({'left': leftValue}, slideTime);
        }
    }

    $(window).on('resize', function(){
        animateToSlide(false);
    });

    // Pause slideshow if user mouseovers the slideshow
    slideshowContainer.mouseenter(function () {
            clearInterval(timer);
        }).mouseleave(function (){
            timer = setInterval(simulateClick, interval);
        });
});

function simulateClick() {
    $('#next').click();
}