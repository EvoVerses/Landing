CMNGSN = {
    app: null,
    uuid: null,

    init: function (app, uuid) {
        CMNGSN.app = app;
        CMNGSN.uuid = uuid;

        CMNGSN.visit();
        CMNGSN.enableCountdown();
        CMNGSN.enableSubscriber();
        CMNGSN.watchClicks();
    },

    visit: function () {
        var app = CMNGSN.app;
        var uuid = CMNGSN.uuid;
        var url = "/api/lead/visit/" + uuid;

        $.get(app + url, {});
    },

    subscribe: function (email) {
        if (!email) {
            return;
        }

        var app = CMNGSN.app;
        var uuid = CMNGSN.uuid;
        var url = "/api/lead/subscribe/" + uuid;
        var data = {email: email};

        $.post(app + url, data)
            .done(function () {
                alert("Thanks for you email!")
            })
            .error(function () {
                alert("There was a problem performing you request, please try again");
            });
    },

    click: function (href) {
        if (!href) return;

        var url = CMNGSN.app + "/api/lead/click/" + CMNGSN.uuid;
        $.post(url, {href: href});
    },

    enableCountdown: function () {
        var el = $("#countdown");
        if (!el.length) {
            return;
        }

        el.enableCountdown(el.data("until"), function (event) {
            $(this).find(".days").text(event.strftime('%D'));
            $(this).find(".hours").text(event.strftime('%H'));
            $(this).find(".minutes").text(event.strftime('%M'));
            $(this).find(".seconds").text(event.strftime('%S'));

            $(this).find(".text").text(event.strftime('%D days, %H hours, %M minutes and %S seconds'));
        });
    },

    enableSubscriber: function () {
        $('#subscriber').on('submit', function (e) {
            e.preventDefault();
            CMNGSN.subscribe($("#email").val());
        });
    },

    watchClicks: function () {
        $('a').on('click', function (e) {
            CMNGSN.click($(this).attr("href"));
        });
    }
};
