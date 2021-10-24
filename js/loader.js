const loader = $('#loader');

const link = window.location.pathname.split('/').pop();

$(window).on("load", () => {
    if(link !== 'index.html' && link !== '') {
        $('body').css('height', 'auto');
        $('body').css('overflow', 'auto');
    };
    loader.css('opacity', '0');
    setTimeout(() => {
        loader.css('display', 'none');
    }, 300);
});