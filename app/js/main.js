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
                let player = document.getElementById("audio-player-sample"),
                    isPlaying = false,
                    playBtn = document.getElementById("play-audio-btn");

                if (playBtn != null) {
                    playBtn.addEventListener("click", function() {
                        togglePlay();
                    });
                }

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

    // Partners logo carousel
    const swiper = new Swiper('.swiper--partners-swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        slidesPerView: 5,

        // Navigation arrows
        navigation: {
            nextEl: '.control-partner-logo--next',
            prevEl: '.control-partner-logo--prev',
        }
    });

    // Video player control scripts
    let video = document.getElementById("video");
    let playerBtn = document.getElementById("player-button");
    let playBtnDecor = document.getElementById("play-pause");
    let videoOverlay = document.getElementById("video-overlay");
    let videoScreen = document.querySelector(".video-screen");

    playerBtn.addEventListener("click", () => {
        videoOverlay.remove();
        if (video.paused) {
            playBtnDecor.className = "fas fa-pause";
            video.play();
        } else {
            videoScreen.appendChild(videoOverlay);
            playBtnDecor.className = "fas fa-play";
            video.pause();
        }
    });

    // Tabs scripts
    let tabItem = $(".tab-item");

    function switchTab(e) {
        e.preventDefault();

        let $this = $(this);
        let tabTarget = $this.children("a").attr("href");

        // Manage Tab Item
        $this.siblings().removeClass("active");
        $this.addClass("active");

        // Manage Tab Content
        let $tabContainer = $this.parent().siblings(".tab-content");
        let $tabPanes = $tabContainer.children(".tab-pane");

        $tabPanes.removeClass("active");
        $tabContainer.find(tabTarget).addClass("active");

    }

    tabItem.on("click", switchTab);


    // Control Equipment Tabs from Tab Content
    let nextEquipmentTab = $(".btn-next-equipment-item");
    let prevEquipmentTab = $(".btn-prev-equipment-item");

    function activateNextTab(e) {
        e.preventDefault();
        let $this = $(this);
        let $tabList = $this.closest(".tab-content").siblings(".tab-list");

        // Find the active tab item (li element)
        let $activeTabItem = $tabList.find(".active").closest("li");

        // Get the next tab item
        let $nextTab = $activeTabItem.next("li");
        if ($nextTab.length) {
            $nextTab.find("a").trigger("click");
        }
    }

    function activatePrevTab(e) {
        e.preventDefault();
        let $this = $(this);
        let $tabList = $this.closest(".tab-content").siblings(".tab-list");

        // Find the active tab item (li element)
        let $activeTabItem = $tabList.find(".active").closest("li");

        // Get the previous tab item
        let $prevTab = $activeTabItem.prev("li");

        // Check if there's a previous tab, if so, trigger click, otherwise do nothing
        if ($prevTab.length) {
            $prevTab.find("a").trigger("click");
        } else {
            console.log("No previous tab to navigate to.");
        }
    }

    nextEquipmentTab.on("click", activateNextTab);
    prevEquipmentTab.on("click", activatePrevTab);

    // Working with FAQ sections scripts

    let faqTabItem = $(".tab-item--faq");
    function controlTabQuestionsMobileLabel(e) {
        e.preventDefault();

        let $this = $(this);
        let tabTarget = $this.children("a").attr("href");

        // Manage Tab Content
        let $tabContainer = $this.parent().siblings(".tab-content");
        let $mobileQuestionLabels = $tabContainer.children(".faq-question--mobile-only");
        $mobileQuestionLabels.removeClass("active");
        $tabContainer.find(tabTarget).prev().addClass("active");

    }

    faqTabItem.on("click", controlTabQuestionsMobileLabel);

    // Accordion scripts
    let accordionHead = $(".accordion-head");

    function showAccordionBody(e) {
        e.preventDefault();
        $this = $(this);
        let relatedAccordionBody = $this.next();
        let parentBlock = $this.parent();
        let accordionHeadCollection = parentBlock.children(".accordion-head");
        let accordionBodiesCollection = parentBlock.children(".accordion-body");

        accordionHeadCollection.removeClass("active");
        $this.addClass("active");

        accordionBodiesCollection.removeClass("active");
        relatedAccordionBody.addClass("active");
    }

    accordionHead.on("click", showAccordionBody);

    // Accordion FAQ script
    let faqAccordionHead = $(".accordion-head.faq-question--mobile-only");

    function handleFaqAccordion(e){
        e.preventDefault();
        $this = $(this);
        let relatedAccordionBody = $this.next();
        let currentId = relatedAccordionBody.attr("id") || "";
        let relatedAccordionTabId = currentId + "-tab";

        let tabItemsCollection = $this.parent().parent().find(".tab-list--faq");
        let activeTabItem = tabItemsCollection.find("#" + relatedAccordionTabId);

        tabItemsCollection.find(".tab-item").removeClass("active");
        activeTabItem.parent().addClass("active");

    }

    faqAccordionHead.on("click", handleFaqAccordion);

    // Modal Scripts
    let triggerModalButton = $(".button-trigger-modal");
    let closeModalButton = $(".button-close-modal");
    let modalBlock = $(".modal");
    let modalDialog = $(".modal-dialog");

    function openModal(e) {
        e.preventDefault();
        $(".modal-core-element").addClass("modal--show");
    }

    function closeModalItself(e) {
        e.preventDefault();
        if (!$(e.target).closest(modalDialog).length) {
            $(".modal-core-element").removeClass("modal--show");
        }
    }

    function closeModal(e) {
        e.preventDefault();
        $(".modal-core-element").removeClass("modal--show");
    }

    triggerModalButton.on("click", openModal);
    modalBlock.on("click", closeModalItself);
    closeModalButton.on("click", closeModal);
});