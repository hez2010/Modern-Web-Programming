# Table Sorter Scripts
```javascript
function loadSorter() {
    $(`<style type="text/css">
table th[sort=asc]::after {
    padding-left: 10px;
    content: '↑';
}
table th[sort=desc]::after {
    padding-left: 10px;
    content: '↓';
}
</style>`).appendTo($('head'));
    $('table th').click(e => {
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
    });
}
let jQuery = document.createElement('script');
jQuery.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js";
jQuery.onload = loadSorter;
document.body.appendChild(jQuery);
```

# Website Examples
1. http://ascii.911cha.com/
2. https://www.jianshu.com/p/ac2c9e7b1d8f
3. https://docs.microsoft.com/zh-cn/dotnet/csharp/language-reference/operators/index
4. https://www.jianshu.com/p/36d736317c62
5. https://blog.csdn.net/wexin_37276427/article/details/81038240
6. ...