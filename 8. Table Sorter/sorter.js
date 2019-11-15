/*
    Author: Steven He
    School: Sun Yat-sen University
    Student Number: 17364025
    Date: 11/15/2019
*/

$(window).load(() => {
    const sort = e => {
        const target = $(e.target);
        const table = target.closest('table');
        const ths = table.find('th');
        const last = target.attr('sort');
        ths.removeAttr('sort');
        const [attr, result] = last === 'asc' ? ['desc', -1] : ['asc', 1];
        target.attr({ sort: attr });

        let tbody = table.children("tbody");
        const trs = tbody.find('tr');
        const index = target.index();
        trs.sort(function (a, b) {
            let textA = $(a).children("td").eq(index).text();
            let textB = $(b).children("td").eq(index).text();
            return textA === textB ? 0 : textA > textB ? result : -result;
        })
        trs.detach().appendTo(tbody);
    };

    $('table th').click(sort);
});