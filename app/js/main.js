$(function () {
    // Scrolling Site Menu Behaviour
    $(window).scroll(function () {
        let $this = $(this),
            $menuTop = $(".navigation-block-wrapper");
        $mainBody = $("body");
        if ($this.scrollTop() > 100) {
            $menuTop.addClass("fixed-top-menu");
            $mainBody.addClass("body-on-scroll");
        } else {
            $menuTop.removeClass("fixed-top-menu");
            $mainBody.removeClass("body-on-scroll");
        }
    });

    // Mobile Menu Toggle
    let mobileMenuToggleBtn = $(".mobile-menu-toggle-btn");

    function toggleMobileMenu (e) {
        e.preventDefault();
        let $this = $(this);
        let mainParent = $this.parent().parent().parent();
        let mainMenuBody = mainParent.find(".main-menu-body-block")
        $this.toggleClass("active");
        mainMenuBody.toggleClass("open-menu");
    }

    mobileMenuToggleBtn.on("click", toggleMobileMenu);
});