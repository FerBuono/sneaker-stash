const loader = $('#loader');

const link = $(location).attr('pathname').split('/').pop();

$(window).on("load", () => {
    setTimeout(() => {
        if(link !== 'index.html' && link !== '') {
            $('body').css('height', 'auto');
            $('body').css('overflow', 'auto');
        };
        loader.css('animation', 'hide-loader 1s');
        loader.css('transform', 'translateX(-70%')
        loader.css('opacity', '0');
        setTimeout(() => {
            loader.css('display', 'none');
        }, 300);
    }, 500);
});