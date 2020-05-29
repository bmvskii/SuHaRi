document.addEventListener('DOMContentLoaded', () => {
    var controlit = $(".hoverme");
    var menuToggle = new TimelineMax({paused:true, reversed:true});
    menuToggle
        .add('hover2')
        .to('.top', .1, { transformOrigin: '50% 50%', y:"3.5", x:"8", scaleX:".4", rotation:"45deg"}, 'hover2')
        .to('.bottom', .1, { transformOrigin: '50% 50%', y:"-3.5", x:"8", scaleX:".4", rotation:"-45deg"}, 'hover2')

    controlit.hover(function () {
//menuToggle.restart()
        menuToggle.reversed() ? menuToggle.restart() : menuToggle.reverse();
    });

    var menuTogglecl = new TimelineMax({paused:true, reversed:true});
    menuTogglecl
        .add('click')
        .set('.topc',  {transformOrigin: '50% 50%', y:"3.5", x:"8", scaleX:".4", rotation:"45deg"})
        .set('.bottomc', {transformOrigin: '50% 50%', y:"-3.5", x:"8", scaleX:".4", rotation:"-45deg"})
        .set('.anim', {transformOrigin: '50% 50%', y:"-40px"})
        .set('.spoof', {transformOrigin: '50% 50%', x:"-4px", y:"-40.5px"})
        .to('.topc', .1, {y:"10", x:"0", scaleX:"1"}, 'click')
        .to('.bottomc', .1, {  y:"-10", x:"0", scaleX:"1"}, 'click')
        .to('.middlec', .1, { transformOrigin: '50% 50%', scaleX:"0"}, 'click')
        .to('.aside',.2,{x:"400"},'click')
        .to('.aside',.2,{css:{boxShadow:"0px 0px 120px rgba(0, 0, 0, 0.24);"}}, 'click')

    controlit.click(function () {
        menuTogglecl.reversed() ? menuTogglecl.restart() : menuTogglecl.reverse();
    });



});