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
        }
        if (e.target.id == previousButtonID) {
            slideDeck.stop().animate({
                'left': moveDeck(-1)+'%'
            }, slideTime);
        }
        if (e.target.id == nextButtonID) {
            slideDeck.stop().animate({
                'left': moveDeck(+1)+'%'
            },slideTime);
        }         
        return false;
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