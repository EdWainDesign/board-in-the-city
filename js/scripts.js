jQuery(document).ready( function($) {
    'use strict';

    //////////////////////////////////////////
    //  Animate scrolling for local anchors
    //////////////////////////////////////////

    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        let href = $(this).attr('href');
        let header = $('#masthead').outerHeight();
        let offset = $(href).offset().top - header + 1;
        $('body').animate({ scrollTop: offset }, 600, 'easeOutExpo');
        $('.menu-toggle').click();
    });

    //////////////////////////////////////////
    //  Highlight menu on scroll (Scrollspy)
    //////////////////////////////////////////

    let sections = $('#masthead').find('.menu-item a').map((i,el) => {
        return $(el).attr('href');
    });

    let a = $(window).innerHeight();
    let b = $('#masthead').outerHeight();
    let threshold = ((a-b)/2) + b;

    $(window).on('scroll', function(e) {

        let st = $(window).scrollTop();
        let active = null;

        $.each(sections, (i,el) => {
            let os = $(el).offset().top;
            if ( os - st - threshold <= 0 ) {
                active = el;
            }
        });

        $('#masthead').find(`li a[href=${active}]`).closest('li')
        .siblings('.active').removeClass('active').end().addClass('active');
    });

    //////////////////////////////////////////
    //  Menu options auto-styles
    //////////////////////////////////////////

    function format(i,el) {


        let text = $(el).text();
        let indent = text.substr(0,1) == '>';
        let newText = $(el).text().replace('> ', '').replace(/\[/g, '<span class="option">').replace(/\]/g, '</span>');
        $(el).html(newText);

        // if ( indent ) { $(el).css('padding-left', '2rem'); }
        if ( indent ) { $(el).addClass('indent'); }

        $('.option').each((i,opt) => {
            let option = $(opt).text();
            switch ( true ) {
                case option.indexOf('V+') > -1:
                    $(opt).addClass('vegan'); break;
                case option.indexOf('DF') > -1:
                    $(opt).addClass('dairy-free'); break;
                case option.indexOf('GF') > -1:
                    $(opt).addClass('gluten-free'); break;
                case option.indexOf('V') > -1:
                    $(opt).addClass('vegetarian'); break;
                    break;
            }
        });
    }

    $('#menu .elementor-text-editor strong').each(format);
    $('#menu .tablepress tbody tr td:first-of-type').each(format);

    //////////////////////////////////////////
    //  'Game Finder' ajax script
    //////////////////////////////////////////

    $('.game').on('click', function(e) {

        let post_id = $(this).data('id');
        $(e.target).siblings('.active').removeClass('active').end().addClass('active');
        $('.active-game-container, .active-game').addClass('active loading').scrollTop(0);

        $.ajax({
            type: 'POST',
            url: bitc.ajaxurl,
            dataType: 'json',
            data: {
                'post_id': post_id,
                'action': 'get_game' //this is the name of the AJAX method called in WordPress
            }, success: function (result) {
                // $('.game-list .game').removeClass('active');
                // $('.game-list').find(`.game[data-id=${result.ID}]`).addClass('active');

                $('#game_finder [data-insert]').each((i,el) => {
                    let prop = $(el).data('insert');
                    let value = result[`post_${prop}`];
                    if ( Array.isArray(value) ) { value = value[0] ? value[0].name : null; }
                    if ( value ) { $(el).html(value).removeClass('hide'); }
                    else         { $(el).addClass('hide').html(''); }
                });

                $('.active-game-container, .active-game').removeClass('loading');
            },
            error: function () {
                console.error('error');
            }
        });
    });

    $('#game_finder .active-game-container .close').on('click', function(e) {
        $('#game_finder .game-list .active').removeClass('active');
        $('#game_finder .active-game').removeClass('active');
        setTimeout(() => {
            $('#game_finder').find('.active-game-title, .active-game-rating, .active-game-time, .active-game-players, .active-game-image, .active-game-content').html('');
        }, 500 );
    });

    //////////////////////////////////////////
    //  'Game Finder' search script
    //////////////////////////////////////////

    $('#game_finder .game-list-container input[type="search"]').on('keyup', function(e) {
        let value = e.target.value.toLowerCase();
        console.log(value);
        if ( value ) { $(e.target).removeClass('empty'); }
        else         { $(e.target).addClass('empty'); }
        $('#game_finder .game-list .game').addClass('hide');
        $('#game_finder .game-list .game').filter((i,el) => {
            return $(el).data('search').toLowerCase().indexOf(value) > -1;
        }).removeClass('hide');
    });

    $('#game_finder .game-list-container .clear').on('click', function(e) {
        $('#game_finder .game-list-container input').val('').trigger('keyup');
    });

    //////////////////////////////////////////
    //  Booking Form script
    //////////////////////////////////////////

    // TODO : Allow table selection. Diagram of rooms, with <select> for table selection.
    // TODO : Book a DM @ £8/hr. Day = 6hrs. Night = 6hrs. All day = 12hrs.

    let roomUpkeep = 1000;
    let avgBookingsPerWeek = 2;
    let avgCostPerBooking = roomUpkeep / (avgBookingsPerWeek * 52);
    let markupMultiplier = 5;
    let baseCost = Math.ceil(avgCostPerBooking) * markupMultiplier;
    let dmCostPerHour = 8;

    $('.wpcf7-form').find('p').contents().unwrap();
    $('.wpcf7-form :input').on('change', formChange);
    formChange();

    function formChange() {
        $('.wpcf7-form select').each((i,el) => {
            if ( $(el).val() ) { $(el).closest('.wpcf7-form-control-wrap').removeClass('empty'); }
            else               { $(el).closest('.wpcf7-form-control-wrap').addClass('empty'); }
        });

        if ( $('.wpcf7-form .private-room input').is(':checked') ) {
            $('.wpcf7-form .function-room-options').removeClass('hide');
        } else {
            $('.wpcf7-form .function-room-options').addClass('hide');
        }

        let roomCost    = baseCost;
        let partySize   = $('.party-size input').val() || 1;
        let bookingType = $('.booking-type select').val() || null;
        let sessionType = $('.session-type select').val() || null;
        let arrivalFood = $('.arrival-food select').val() || null;
        let bookDM      = $('.wpcf7-form .dm-required input').is(':checked');

        if ( bookingType === 'RPG Session' ) {
            $('.wpcf7-form .dm-required').removeClass('hide');
        } else {
            $('.wpcf7-form .dm-required').addClass('hide');
        }

        switch (true) {
            case partySize >= 0 && partySize <= 5 :
                roomCost *= 1.0; break;
            case partySize >= 6 && partySize <= 9 :
                roomCost *= 1.2; break;
            case partySize >= 10 :
                roomCost *= 1.4; break;
        }

        switch (bookingType) {
            case 'Party':       roomCost *= 0.9; break;
            case 'RPG Session': roomCost *= 1.0; break;
            case 'Tournament':  roomCost *= 0.7; break;
        }

        switch (sessionType) {
            case 'Day (6hrs)':      roomCost *= 0.8; break;
            case 'Evening (6hrs)':  roomCost *= 1.0; break;
            case 'All Day (12hrs)': roomCost *= 1.5; break;
        }

        switch (arrivalFood) {
            case 'None':             roomCost += 0; break;
            case '1 drink':          roomCost += (partySize * 2); break;
            case '1 drink + snacks': roomCost += (partySize * 4); break;
            case 'Buffet':           roomCost += (partySize * 8); break;
            case '1 drink + meal':   roomCost += (partySize * 12); break;
        }

        if ( bookDM ) {
            let numOfHours = sessionType === 'Both' ? 12 : 6;
            roomCost += dmCostPerHour * numOfHours;
        }

        let total = roomCost.toFixed(2);
        $('.total-estimate strong').text(`£${total}`);
    }
});
