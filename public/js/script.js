$(document).ready(
    function () {
        $('.owl-carousel').owlCarousel({
            items: 4,
            loop: true,
            margin: 30,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            slideTransition: 'linear',
        })

        $(window).scroll(() => {
            const pos = $(this).scrollTop();
            console.log(pos)
            if (pos >= 100) {
                $("#navbar").addClass("fixed-top");
                $("#navbar").css("opacity", "0.9");
            } else {
                $("#navbar").removeClass("fixed-top");
            }
        })
    }
);