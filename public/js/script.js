$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    items: 3,
    loop: true,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 5000,
    autoplayHoverPause: true,
    slideTransition: "linear",
  });

  $(window).scroll(() => {
    const pos = $(this).scrollTop();
    console.log(pos);
    if (pos >= 100) {
      $("#navbar").addClass("fixed-top");
      $("#navbar").css("opacity", "0.9");
    } else {
      $("#navbar").removeClass("fixed-top");
    }
  });
});

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}