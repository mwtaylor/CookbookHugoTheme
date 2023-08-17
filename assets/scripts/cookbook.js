var bootstrap = require('bootstrap');

var datefns = require('date-fns')

$("div[data-format-distance-to-now='true']").each(function () {
    const dateString = $(this).text().trim();
    const date = datefns.parse(dateString, 'yyyy-MM-dd HH:mm:ss', new Date());
    $(this).text(datefns.formatDistanceToNow(date) + " ago");
});

module.exports = "cookbook theme";
