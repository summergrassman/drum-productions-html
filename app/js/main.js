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

    // Audio player control

    let initialPlayerContainer = document.getElementById("player-container");
    function initPlayers(num) {

        for (let i = 0; i < num; i++) {
            (function() {
                // Variables
                // ----------------------------------------------------------
                // audio embed object
                let player = document.getElementById("audio-player-sample"),
                    isPlaying = false,
                    playBtn = document.getElementById("play-audio-btn");

                // Controls Listeners
                // ----------------------------------------------------------
                if (playBtn != null) {
                    playBtn.addEventListener("click", function() {
                        togglePlay();
                    });
                }

                // Controls & Sounds Methods
                // ----------------------------------------------------------
                function togglePlay() {
                    let innerPlayBtn = $("#play-audio-btn");
                    let decorPlayBtn = innerPlayBtn.find(".audio-btn-label");
                    console.log(decorPlayBtn);
                    if (player.paused === false) {
                        player.pause();
                        isPlaying = false;
                        jQuery(innerPlayBtn).removeClass("pause");
                        decorPlayBtn.removeClass("fa-pause");
                        decorPlayBtn.addClass("fa-play");
                    } else {
                        player.play();
                        jQuery(innerPlayBtn).addClass("pause");
                        decorPlayBtn.removeClass("fa-play");
                        decorPlayBtn.addClass("fa-pause");
                        isPlaying = true;
                    }
                }
            })();
        }
    }

    initPlayers($(initialPlayerContainer).length);
});