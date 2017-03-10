$(function () {
    /*********************************************************/
    /* START CURRENCIES DROP-DOWN LIST  */
    /********************************************************/
    $(".js--currencies,.nav__link--curr, .js--languages").click(function (event) {
        event.preventDefault();
        $(this).next('ul').toggle();
    });
    /*********************************************************/
    /* END CURRENCIES DROP-DOWN LIST  */
    /********************************************************/


    /*********************************************************/
    /* START SEARCH FORM  */
    /********************************************************/
    $(".js--search").click(function (event) {
        $(".js--searchForm").show("fast");
    });
    /*********************************************************/
    /* END SEARCH FORM  */
    /********************************************************/



    /*********************************************************/
    /* START ADAPTIVE HEADER  */
    /********************************************************/
    $('.header').append('<div class="hidMenu">');
    var hidM = $(".hidMenu");
    $('.hidMenu').append('<div class="hidFirstChild">');
    var hidMFirst = $(".hidFirstChild");

    $(".js-roll").click(function () {

        $(this).toggleClass("active")
        if ($(this).hasClass("active")) {
            hidM.show();
        }
        else {
            hidM.hide();
        }

    });
    // Hide menu if your target isn't "hamburger" or menu
    $(document).on("touchstart click", function (e) {
        var element = $(".hidMenu");
        var element2 = $(".js-roll");
        if (!element.is(e.target)
            && element.has(e.target).length === 0 && !element2.is(e.target)) {
            $(".hidMenu").hide();
            if ($(element2).hasClass("active")) {
                $(element2).removeClass("active")
            }

        }
    });

    function onResize() {
        var wiw = window.innerWidth;
        if (wiw > 1358) {
            $(".js-link,.js-sub").prependTo('.nav__item--hasSub');
            $(".languages,.currencies").prependTo('.header__col3');
            hidM.hide();
            $(".js-roll").removeClass("activ");
        }
        else {
            $(".js-link,.js-sub").appendTo(hidMFirst);
            $(".languages,.currencies").appendTo(hidM);

        }
    }
    onResize();
    $(window).resize(onResize);
    /*********************************************************/
    /* END ADAPTIVE HEADER  */
    /********************************************************/


    /*********************************************************/
    /* Start CUSTOM SELECT  */
    /********************************************************/
    

    initSelect();







    /*********************************************************/
    /* End CUSTOM SELECT  */
    /********************************************************/


    /*********************************************************/
    /* Start CUSTOM SELECT  */
    /********************************************************/

    initSearch();
    /*********************************************************/
    /* End CUSTOM SELECT  */
    /********************************************************/


    /*********************************************************/
    /* START EXPLANATIONS  */
    /********************************************************/
    $(".js-explanations").mouseenter(function () {
        $(this).next('div.explanations').fadeIn("fast");
    });

    $(".countList__text").mouseleave(function () {
        $(this).find('div.explanations').fadeOut("fast");
    });

    if (!device.desktop()) {
        $('div.explanations').addClass("withCloze");
        $('div.explanations').append('<i class="ex-cloze">');
        $(".ex-cloze").click(function () {
            $(this).parent('div.explanations').fadeOut("fast");
        });
    }
    /*********************************************************/
    /* END EXPLANATIONS  */
    /********************************************************/

    /*********************************************************/
    /* START FOUND RESULT  */
    /********************************************************/
    $(".settingsList input").click(function () {
        if ($(this).prop("checked")) {
            $(this).parent('.checkboxWrap').nextAll(".settingsList__popap").show();
        }
        else {
            $(this).parent('.checkboxWrap').nextAll(".settingsList__popap").hide();
        }
    });
    $(document).mouseup(function (e) {
        var element = $(".settingsList input");
        if (!element.is(e.target)
            && element.has(e.target).length === 0) {
            $(".settingsList__popap").hide();
        }
    });

    /*********************************************************/
    /* END FOUND RESULT  */
    /********************************************************/

    /*********************************************************/
    /* START CALENDAR  */
    /********************************************************/

    initDateInput();
    /*********************************************************/
    /* END CALENDAR  */
    /********************************************************/
    /* SCROLL TOP */
    /********************************************************/
    $("#up__btn").click(function () {
        $("body,html").animate({
            scrollTop: 0
        }, 500);
        return false;
    });


    function windowSize() {
        if ($(window).width() > '1360') {

            $(window).scroll(function () {
                if ($(this).scrollTop() > 70) {
                    $("#up__btn").show();
                } else {
                    $("#up__btn").hide();
                }
            });

        }
    }

    $(window).on('load resize', windowSize);

    /* END SCROLL TOP */
    /********************************************************/
    /* SHOW TOOLTIP */
    /********************************************************/

    

    $(document).on('mouseover', '.tooltip', function () {
        $(this).children('.tooltip__view').css('display', 'block');
    });
    $(document).on('mouseout', '.tooltip', function () {
        $(this).children('.tooltip__view').css('display', 'none');
    });

    $(document).on("touchstart", function (e) {
        var element = $(".tooltip");
        if (!element.is(e.target)
            && element.has(e.target).length === 0) {
            $(".tooltip__view").hide();

        }
    });

    /* END SHOW TOOLTIP */
    /********************************************************/

    /* SHOW FILTER */
    /********************************************************/
    $(document).on('click', '.other__info .variants', function () {
        $('.popap__window').css('display', 'flex');

        $(document).on('click', '.popap__window .close', function () {
            $('.popap__window').css('display', 'none');
        });
        $(document).on("touchstart click", function (e) {
            var element = $(".action__board");
            if (!element.is(e.target)
                && element.has(e.target).length === 0) {
                $(".popap__window").hide();

            }
        });
    });
    /* END SHOW FILTER */
    /********************************************************/
    //Drag and Drop
    //var source = document.getElementById('source'),
    //    target = document.getElementById('target');

    //source.addEventListener('dragstart', function (e) {
    //    this.classList.add('drag__start');
    //    e.dataTransfer.effectAllowed = "move";
    //    e.dataTransfer.setData("Text", document.getElementById("source").id);
    //}, false);
    //source.addEventListener('dragend', function (e) {
    //    this.classList.remove('drag__start');
    //}, false);

    //target.addEventListener('dragover', function (e) {
    //    if (e.preventDefault) e.preventDefault();
    //    return false;
    //}, false);

    //target.addEventListener('drop', function (e) {
    //    e.preventDefault();
    //    e.stopPropagation();
    //    var id = e.dataTransfer.getData("Text");
    //    var element = document.getElementById(id);
    //    this.appendChild(element);
    //}, false);
});
function initSelect() {
    $(".chosen-select").select2();

    $(".classic-select").select2({
        theme: "classic"
    }).on("select2:open", addShadow);

    $(".classic-select").select2({
        theme: "classic"
    }).on("select2:open", setNiceScroll);

    $(".nosearch-select").select2(
    {
        theme: "nosearch",
        minimumResultsForSearch: Infinity
    }).on("select2:open", addShadow);

    $(".nosearch-select").select2(
    {
        theme: "nosearch",
        minimumResultsForSearch: Infinity
    }).on("select2:open", setNiceScroll);

    $(".nosearchFull-select").select2(
    {
        theme: "nosearchFull",
        minimumResultsForSearch: Infinity
    }).on("select2:open", addShadow);


    $(".nosearchFull-select").select2(
    {
        theme: "nosearchFull",
        minimumResultsForSearch: Infinity
    }).on("select2:open", setNiceScroll)

    $(".time__select").select2(
    {
        theme: "nosearchFull",
        minimumResultsForSearch: Infinity
    }).on("select2:open", setNiceScroll)
};

function setNiceScroll() {
    $(".select2-results__options").niceScroll({
        cursorcolor: "#e5e5e5",
        cursoropacitymin: 1,
        cursorwidth: "7px",
        cursorborder: 0,
        hidecursordelay: 0,
        touchbehavior: true,
        autohidemode: false,
        grabcursorenabled: true,
    });
};

//Add shadow 
function addShadow() {
    $(".select2-results").addClass("shadowAfter");

    $(".select2-results__options").scroll(function () {

        var elementHeight = document.querySelector(".select2-results__options").scrollHeight;

        if ($(this).scrollTop() > 20
            && (elementHeight - $(this).scrollTop()) >= 200) {

            $(".select2-results").addClass("shadowBefore");
        }
        else {
            $(".select2-results").removeClass("shadowBefore");
        }
        if ((elementHeight - $(this).scrollTop()) == 200)
            $(".select2-results").removeClass("shadowAfter");
        else
            $(".select2-results").addClass("shadowAfter");
    })
};

function initSearch() {
    $('#search').tipuedrop();
};

function initDateInput() {
    $("#datepicker,#datepicker-1").datepicker({
        dateFormat: "dd.mm.yy"
    });
    $("#dp").datepicker({
        dateFormat: "dd.mm.yy",
        onSelect: function (dateText, inst) {
            console.log(dateText);
        }
    });

    $("#date__change").click(function () {
        $("#dp").datepicker("show");
    });
};

