var bootstrap = require('bootstrap');

var datefns = require('date-fns')

$("[data-format-distance-to-now='true']").each(function () {
    const dateString = $(this).text().trim();
    const date = datefns.parse(dateString, 'yyyy-MM-dd HH:mm:ss', new Date());
    $(this).text(datefns.formatDistanceToNow(date) + " ago");
});

require('./format-durations');

$("button[data-bs-toggle='tab']").bind("show.bs.tab", function () {
    const tabTarget = $(this).attr('data-bs-target');
    $(`[data-follow-tab-target='${tabTarget}']`).each(function () {
        $(this).show();
    });
});

$("button[data-bs-toggle='tab']").bind("hide.bs.tab", function () {
    const tabTarget = $(this).attr('data-bs-target');
    $(`[data-follow-tab-target='${tabTarget}']`).each(function () {
        $(this).hide();
    });
});

module.exports = "cookbook theme";
