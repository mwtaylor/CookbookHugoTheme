import {parse, formatDistanceToNow} from 'https://cdn.skypack.dev/date-fns';

$("div[data-format-distance-to-now='true']").each(function () {
    const dateString = $(this).text().trim();
    const date = parse(dateString, 'yyyy-MM-dd HH:mm:ss', new Date());
    $(this).text(formatDistanceToNow(date) + " ago");
});
