(function($) {
    "use strict";

    /* ---------------------------------------------- /*
     * Preloader 最新最全最好的Bootstrap模板：http://www.bootstrapmb.com
    /* ---------------------------------------------- */

    $(window).ready(function() {
        $('.mayabi-loader').fadeOut();
        $('#preloader').delay(200).fadeOut('slow');

    });
	
    $(document).ready(function() {
        /*----------------------------
        	Mobile Menu Active
        	------------------------------*/
        $("#navigation").slicknav({
            prependTo: ".responsive-menu-wrap"
        });

        /*----------------------------
        		about slider Active
        	------------------------------*/
        $(".about-img").owlCarousel({
            loop: true,
            autoplay: true,
            smartSpeed: 1000,
            dots: false,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 2
                }
            }
        });
        /*----------------------------
        		Skill Bar1 Active
        	------------------------------*/
        $('#skill-bar1').LineProgressbar({
            percentage: 90,
            fillBackgroundColor: '#f95759',
            backgroundColor: '#ffffff',
            height: '10px',
        });

        $('#skill-bar2').LineProgressbar({
            percentage: 70,
            fillBackgroundColor: '#f95759',
            backgroundColor: '#ffffff',
            height: '10px',
        });

        $('#skill-bar3').LineProgressbar({
            percentage: 95,
            fillBackgroundColor: '#f95759',
            backgroundColor: '#ffffff',
            height: '10px',
        });

        $('#skill-bar4').LineProgressbar({
            percentage: 80,
            fillBackgroundColor: '#f95759',
            backgroundColor: '#ffffff',
            height: '10px',
        });

        /*----------------------------
        		Counter Active
        	------------------------------*/
        $('.counter').counterUp({
            delay: 2,
            time: 1000
        });

        /*----------------------------
        		Testimonial Active
        	------------------------------*/
        $(".all-testimonial-wraper").owlCarousel({
            loop: true,
            autoplay: false,
            smartSpeed: 1000,
            dots: true,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        });

        /*----------------------------
        		Client Slider Active
        	------------------------------*/
        $(".all-client-slider").owlCarousel({
            loop: true,
            autoplay: false,
            smartSpeed: 1000,
            dots: false,
            nav: true,
            navText: ["<i class='fa fa-angle-left '></i>", "<i class='fa fa-angle-right '></i>"],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 4
                }
            }
        });

        /*----------------------------
        		wedget Slider Active
        	------------------------------*/
        $(".wedget-slider-all").owlCarousel({
            loop: true,
            autoplay: true,
            smartSpeed: 1000,
            dots: true,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        });

        /*----------------------------
        		scrolltop active
        	------------------------------*/
        $('body').materialScrollTop();
        /*----------------------------
        		popup active
        	------------------------------*/
        $(".video-view").magnificPopup({
            type: "iframe"
        });

        /*----------------------------
                isotop type 1 active
            ------------------------------*/
        $('.portfolio-menu-1 li').on('click', function() {
            $('.portfolio-menu-1 li.active').removeClass('active');
            $(this).addClass('active');
        });

        $('.container').imagesLoaded(function() {

            $('.portfolio-menu-1 li').on('click', function() {
                var filterValue = $(this).attr('data-filter');
                $folios1.isotope({
                    filter: filterValue
                });
            });
            var $folios1 = $('.typ1-all-folio').isotope({
                itemSelector: '.typ1-folios-item',
                percentPosition: true,
                layoutMode: 'fitRows',
                transitionDuration: '0.9s',
                // only opacity for reveal/hide transition
                hiddenStyle: {
                    opacity: 0
                },
                visibleStyle: {
                    opacity: 1
                },
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: '.typ1-folios-item'
                },
            });
        });
        /*----------------------------
        		   isotop type 2 active
        	------------------------------*/
        $('.container').imagesLoaded(function() {
            $('.portfolio-menu-1 li').on('click', function() {
                var filterValue = $(this).attr('data-filter');
                $folios2.isotope({
                    filter: filterValue
                });
            });
            var $folios2 = $('.typ2-all-folio').isotope({
                itemSelector: '.typ2-folios-item',
                percentPosition: true,
                layoutMode: 'fitRows',
                transitionDuration: '0.9s',
                // only opacity for reveal/hide transition
                hiddenStyle: {
                    opacity: 0
                },
                visibleStyle: {
                    opacity: 1
                },
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: '.typ2-folios-item'
                },
            });
        });
        /*----------------------------
        		   Isotop type 3 active
        	------------------------------*/
        $('.container').imagesLoaded(function() {

            $('.portfolio-menu-1 li').on('click', function() {
                var filterValue = $(this).attr('data-filter');
                $folios3.isotope({
                    filter: filterValue
                });
            });
            var $folios3 = $('.typ3-all-folio').isotope({
                itemSelector: '.typ3-folios-item',
                percentPosition: true,
                transitionDuration: '0.9s',
                // only opacity for reveal/hide transition
                hiddenStyle: {
                    opacity: 0
                },
                visibleStyle: {
                    opacity: 1
                },
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: '.typ3-folios-item'
                }
            });
        });
        /*----------------------------
        		NiceSelect Active
        	------------------------------*/
        $('select').niceSelect();
        /*----------------------------
        		Price Filter Active
        	------------------------------*/
        $("#price-range").slider({
            range: true,
            min: 0,
            max: 500,
            values: [120, 388],
            slide: function(event, ui) {
                $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });
        $("#amount").val("$" + $("#price-range").slider("values", 0) +
            " - $" + $("#price-range").slider("values", 1));
        /*----------------------------
        		single product slider active
        	------------------------------*/
        $('.product-big-img').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.product-big-img-thumb'
        });
        $('.product-big-img-thumb').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.product-big-img',
            dots: false,
            centerMode: true,
            focusOnSelect: true
        });

        /*----------------------------
        		WOW active
        	------------------------------*/
        new WOW().init();

    });

})(jQuery);