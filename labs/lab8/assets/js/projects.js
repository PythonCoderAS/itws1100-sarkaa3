$(document).ready(function() {
    $.ajax("./data/labs.json", {
        dataType: "json",
        success: function(data) {
            const halfPoint = Math.ceil(data.length / 2);
            const isLab8 = document.location.href.includes("labs/lab8");;
            for (let i = 0; i <data.length; i++){
                let selector = $("#first-col");
                if (i >= halfPoint){
                    selector = $("#second-col");
                }
                const item = data[i];
                let trueHref = item.href;
                if (isLab8){
                    trueHref = "../../" + item.href;
                }
                selector.append(`<li><a href="${trueHref}">${item.label}</a></li>`)
            }
        }
    })
});