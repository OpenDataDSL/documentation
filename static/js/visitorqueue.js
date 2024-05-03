function vqTrackId() {
    return 'fc3243b6-c174-4cce-8a2a-99b8221faa22';
}

(function(d, e) {
    var el = d.createElement(e);
    el.sa = function(an, av) {
        this.setAttribute(an, av);
        return this;
    };
    el.sa('id', 'vq_tracking').sa('src', '//t.visitorqueue.com/p/tracking.min.js?id='+vqTrackId()).sa('async', 1).sa('data-id', vqTrackId());
    d.getElementsByTagName(e)[0].parentNode.appendChild(el);
})(document, 'script');

function vqTrackPc() {
    return 1;
}

(function(d, e) {
    var el = d.createElement(e);
    el.sa = function(an, av) {
        this.setAttribute(an, av);
        return this;
    };
    el.sa('id', 'vq_personalisation').sa('src', '//personalisation.visitorqueue.com/p/personalisation.min.js?id='+vqTrackId()).sa('async', 1).sa('data-id', vqTrackId());
    d.getElementsByTagName(e)[0].parentNode.appendChild(el);
})(document, 'script');
