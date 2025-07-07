const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true,
    multiplier: 1.2,
});

window.addEventListener("load", () => {
    scroll.update(); 
});


function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '10',
        opacity: 0,
        duration: 1,
        ease: Expo.easeInOut
    })
    tl.to(".headingAnimEle", {
        y: 0,
        duration: 2,
        ease: Expo.easeInOut,
        stagger: .1,
        delay: -1
    })
    tl.to(".headingAnimEle2", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1.5
    })
    tl.to(".bottomAnim", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 3.5,
        delay: -2.3
    })
    tl.from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.6,
        delay: -1.5

    })

}

var timeout;

function circleShape() {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function (dets) {
        this.clearTimeout(timeout);

        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;

        xscale = gsap.utils.clamp(.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(.8, 1.2, ydiff);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);
        timeout = setTimeout(function () {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX - 5}px,${dets.clientY - 5}px) scale(1,1)`;
        }, 100);
    })
}

const minicircle = document.querySelector("#minicircle");

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        minicircle.style.opacity = 1;
        minicircle.style.transform = `translate(${dets.clientX - 5}px,${dets.clientY - 5}px) scale(${xscale},${yscale})`;
    })
    window.addEventListener("mouseout", function () {
        minicircle.style.opacity = 0;
    });

}
circleMouseFollower();
firstPageAnim();
circleShape();

// img wala section 
document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.8),
            // duration: 2
        })
    })
    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5
        })
    })
})


const track = document.querySelector("#rollerlogo");
const clone = track.cloneNode(true);
track.parentElement.appendChild(clone);

gsap.to("#rollerlogo", {
    xPercent: -100,
    ease: "linear",
    duration: 40,
    repeat: -1,
});

const underlineLinks = document.querySelectorAll(".underline-hover");

underlineLinks.forEach(link => {
  const bar = link.querySelector(".underline-bar");

  link.addEventListener("mouseenter", () => {
    bar.style.transition = "transform 0.4s ease";
    bar.style.transform = "translateX(0)";
  });

  link.addEventListener("mouseleave", () => {
    bar.style.transition = "transform 0.4s ease";
    bar.style.transform = "translateX(100%)";

    setTimeout(() => {
      bar.style.transition = "none"; 
      bar.style.transform = "translateX(-100%)";
    }, 400); 
  });
});
