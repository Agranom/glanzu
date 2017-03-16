$(function () {
    /*********************************************************/
    /* START CURRENCIES DROP-DOWN LIST  */
    /********************************************************/
    $(document).on('click', ".js--currencies,.nav__link--curr, .js--languages", function (event) {
        event.preventDefault();
        $(this).parent().toggleClass('active');
        $(this).next('ul').toggle();

        //Hide if touch event wasn't at lists
        $(document).on("touchstart click", function (e) {
            var element = $(".js--currencies,.nav__link--curr, .js--languages");
            element.each(function () {
                if (!$(this).is(e.target)
                && $(this).has(e.target).length === 0) {
                    $(this).next('ul').hide();
                    $(this).parent().removeClass('active');
                }
            })

        });
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
            $(this).parent('.checkboxWrap').nextAll(".settingsList__popap").toggle();
        }

        hideTooltip(".settingsList input", ".settingsList__popap");
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



    //$(document).on('mouseover', '.tooltip', function () {
    //    $(this).children('.tooltip__view').css('display', 'block');
    //});
    //$(document).on('mouseout', '.tooltip', function () {
    //    $(this).children('.tooltip__view').css('display', 'none');
    //});
    //hideTooltip(".tooltip", ".tooltip__view");
    //$(document).on("touchstart", function (e) {
    //    var element = $(".tooltip");
    //    if (!element.is(e.target)
    //        && element.has(e.target).length === 0) {
    //        $(".tooltip__view").hide();

    //    }
    //});

    /* END SHOW TOOLTIP */
    /********************************************************/

    /* SHOW FILTER */
    /********************************************************/
    ininPopap();
    /* END SHOW FILTER */
    /********************************************************/
    /* DRAG AND DROP */
    /********************************************************/
    dragDrop();

    /* END DRAG AND DROP */
    /********************************************************/
    /* SHOW DESCRIPTION TOOLTIP */
    /********************************************************/
    $(document).on('click', '.order .question__mark', function () {
        $('.order .description__popap').toggle();
        hideTooltip('.order .description__popap', '.order .description__popap', '.order .question__mark');
    });
    $(document).on('click', '.description__popap .close', function () {
        $('.description__popap').hide();
    })

    /*END SHOW DESCRIPTION TOOLTIP */
    /********************************************************/

    /* SET MASK FOR INPUTS */
    /********************************************************/
    initInputMask();
    /* END SET MASK FOR INPUTS */
    /********************************************************/

});
/* DRAG AND DROP */
/********************************************************/
function dragDrop() {
    var sourceId;
    var source = document.querySelectorAll('.package'),
        target = document.querySelectorAll('.target');


    [].forEach.call(source, function (el) {
        el.addEventListener('dragstart', handlerDragStart, false);
        el.addEventListener('dragend', handlerDragEnd, false);
    });
    [].forEach.call(target, function (el) {
        el.addEventListener('dragenter', handlerDragEnter, false);
        el.addEventListener('dragleave', handlerDragLeave, false);
        el.addEventListener('dragover', handlerDragOver, false);
        el.addEventListener('drop', handlerDrop, false);
    });

    function handlerDragStart(e) {

        this.classList.add('drag__start');
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("Text", this.id);
        getSource(this.id);
    }
    function getSource(id) {
        sourceId = id;
    }
    function handlerDragEnd(e) {
        this.classList.remove('drag__start');
    }
    function handlerDragEnter(e) {

        getCurrentDay(this);
    }
    function handlerDragLeave(e) {
        this.classList.remove('drag__enter');
    }
    function handlerDragOver(e) {

        getCurrentDay(this);
        if (e.preventDefault) e.preventDefault();
        return false;

    }
    function handlerDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        var id = e.dataTransfer.getData("Text"),
            element = document.getElementById(id),
            currentDay,
            nextDay,
            nextTarget;
        //if excursion has 2 parts
        if (element.dataset.child) {
            currentDay = parseInt(this.dataset.day);
            nextDay = document.querySelector(".order__info[data-day='" + ++currentDay + "']");
            nextDay.appendChild(document.querySelector(".package[data-child-name='" + element.dataset.child + "']"));
        }
        this.appendChild(element);
        //Hide/show the delete icon
        isEmpty();
        this.classList.remove('drag__enter');
        setSameData();
    }

    function isEmpty() {
        var days = $('.order__info');
        days.each(function () {
            if ($(this).children(".package").length === 0)
                $(this).addClass("empty");
            else
                $(this).removeClass("empty");

        });
    }
    //If drag start and drag over occur in a current day - don't apply any css
    function getCurrentDay(currentElement) {
        var tagData;
        var sourceEl = document.getElementById(sourceId);

        tagData = sourceEl.dataset.day;
        if (tagData != currentElement.dataset.day) {
            currentElement.classList.add('drag__enter');
        }
    }
    function setSameData() {
        var dataFor = document.querySelectorAll('.package');
        [].forEach.call(dataFor, function (elem) {
            elem.dataset.day = elem.parentElement.dataset.day;
        });

    }
    setSameData();
}
/*END DRAG AND DROP */
/********************************************************/


function initSelect() {

    if (!device.mobile()) {
        $(".nosearchFull-select").select2({
            theme: "nosearchFull",
            minimumResultsForSearch: Infinity
        }).on("select2:open", setNiceScroll);

        $(".nosearch-select").select2({
            theme: "nosearch",
            minimumResultsForSearch: Infinity
        }).on("select2:open", setNiceScroll);

        $(".classic-select").select2({
            theme: "classic"
        }).on("select2:open", setNiceScroll);
    }
    else {
        $(".nosearchFull-select").select2({
            theme: "nosearchFull",
            minimumResultsForSearch: Infinity
        });

        $(".time__select").select2({
            theme: "nosearchFull",
            minimumResultsForSearch: Infinity
        });

        $(".classic-select").select2({
            theme: "classic"
        });
    }

    $(".chosen-select").select2();

    $(".classic-select").select2({
        theme: "classic"
    }).on("select2:open", addShadow);

    $(".nosearch-select").select2(
    {
        theme: "nosearch",
        minimumResultsForSearch: Infinity
    }).on("select2:open", addShadow);

    //$(".nosearch-select").select2(
    //{
    //    theme: "nosearch",
    //    minimumResultsForSearch: Infinity
    //}).on("select2:open", setNiceScroll);

    $(".nosearchFull-select").select2(
    {
        theme: "nosearchFull",
        minimumResultsForSearch: Infinity
    }).on("select2:open", addShadow);
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
    $("#datepicker,#datepicker-1,#datepicker-2").datepicker({
        dateFormat: "dd.mm.yy",
        showOtherMonths: true,
        beforeShow: function (input, inst) {
            inst.dpDiv.css({ marginTop: '5px' });
        }
    });
    $("#dp").datepicker({
        dateFormat: "dd.mm.yy",
        showOtherMonths: true,
        onSelect: function (dateText, inst) {
            console.log(dateText);
        },
        beforeShow: function (input, inst) {
            inst.dpDiv.css({ marginTop: '5px' });
        }
    });

    $("#date__change").click(function () {
        $("#dp").datepicker("show");
    });
};
//Initialization mask for time input
function initInputMask() {
    $(".destination__time").mask("99 : 99", { placeholder: " " });
};
//Initialization filter popap
function ininPopap() {
    $('.variants').magnificPopup({
        type: 'inline',
        mainClass: "popap__window",
        closeOnBgClick: true,
        closeBtnInside: true,
    });
}
//Hide tooltip if click was near that tooltip
function hideTooltip(element, elementToHide, element2) {

    $(document).on("touchstart click", function (e) {
        if (element2) {
            if (!$(element).is(e.target)
            && $(element).has(e.target).length === 0 && !$(element2).is(e.target)) {
                $(elementToHide).hide();
            }
        }
        else {
            if (!$(element).is(e.target)
            && $(element).has(e.target).length === 0) {
                $(elementToHide).hide();
            }
        }

    });
}