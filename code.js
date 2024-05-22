(function () {
    "use strict";

    let interval;
    interval = setInterval(function () {
        const d = Array.from(
            document.querySelectorAll(
                "#WeekListGrid_DXMainTable tr.dxgvDataRow_TTOffice2010Dark",
            ),
        )
            .map((e) => e.children)
            .filter((c) => c[4].innerHTML != "In bewerking")
            .filter((c) => c[0].innerHTML == new Date().getFullYear())
            .map((c) => c[5].innerHTML)
            .reduce(
                (acc, curr) => ({
                    tot: acc.tot + parseFloat(curr.replace(",", ".")),
                    wks: acc.wks + 1,
                }),
                {
                    tot: 0,
                    wks: 0,
                },
            );
        const str =
            `You've worked an avg. of ${(d.tot / d.wks).toFixed(2)} hours a week.\n` +
            `So your current balance is ${(d.tot - 38 * d.wks).toFixed(2)} hours.\n` +
            `---\n` +
            `hrs. = ${d.tot.toFixed(2)}\n` +
            `wks. = ${d.wks}\n` +
            `avg. = ${(d.tot / d.wks).toFixed(2)} = ${d.tot.toFixed(2)}/${d.wks.toFixed(0)}\n` +
            `bal. = ${(d.tot - 38 * d.wks).toFixed(2)} = ${d.tot.toFixed(2)}-(38*${d.wks.toFixed(0)})`;

        console.log(str);

        if (d.tot > 1) {
            clearInterval(interval);
        } else {
            return;
        }

        const newDiv = document.createElement("pre");
        const newContent = document.createTextNode(str);
        newDiv.appendChild(newContent);

        const currentDiv = document.getElementById("WeekListMainGrid");
        const beforeDiv = document.querySelector(
            "#WeekListMainGrid div:first-child",
        );
        currentDiv.insertBefore(newDiv, beforeDiv);
    }, 100);
})();
