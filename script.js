function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
loco()

// FOR SCROLL ARROW IN PAGE 1
gsap.to(".page1 h5 i", {
    y: -8,
    repeat: -1,
    duration: 0.7,
    yoyo: true,

})

// TEXT ANIMATION ON PAGE 2
function clutter() {
    var clutter = "";

    document.querySelector(".clutter h1").textContent.split(" ").forEach(function (dets) {
        clutter += `<span> ${dets} </span>`

        document.querySelector(".clutter h1").innerHTML = clutter;
    })

    gsap.to(".clutter h1 span", {
        color: "#fff",
        stagger: 1,
        duration: 5,
        scrollTrigger: {
            trigger: ".clutter h1 span",
            scroller: "#main",
            start: "top bottom",
            end: "bottom 30%",
            scrub: 3,
            // markers: true
        },

    })

    gsap.to(".page2", {

    })
}
clutter()

gsap.to(".text", {
    transform: "translateY(-60%)",
    duration: 1.3,

    scrollTrigger: {
        trigger: '.text',
        scroller: "#main",
        // markers: true,
        start: '70% 20%',
        // end: "bottom 90%",
        scrub: 2,
    }
})

// PAGE 3 CANVAS ANIMATION
function canvas() {
    const canvas = document.querySelector(".page2 canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    });

    function files(index) {
        var data = `
  ./Images/Images/frames00007.png
  ./Images/Images/frames00010.png
  ./Images/Images/frames00013.png
  ./Images/Images/frames00016.png
  ./Images/Images/frames00019.png
  ./Images/Images/frames00022.png
  ./Images/Images/frames00025.png
  ./Images/Images/frames00028.png
  ./Images/Images/frames00031.png
  ./Images/Images/frames00034.png
  ./Images/Images/frames00037.png
  ./Images/Images/frames00040.png
  ./Images/Images/frames00043.png
  ./Images/Images/frames00046.png
  ./Images/frames00049.png
  ./Images/frames00052.png
  ./Images/frames00055.png
  ./Images/frames00058.png
  ./Images/frames00061.png
  ./Images/frames00064.png
  ./Images/frames00067.png
  ./Images/frames00070.png
  ./Images/frames00073.png
  ./Images/frames00076.png
  ./Images/frames00079.png
  ./Images/frames00082.png
  ./Images/frames00085.png
  ./Images/frames00088.png
  ./Images/frames00091.png
  ./Images/frames00094.png
  ./Images/frames00097.png
  ./Images/frames00100.png
  ./Images/frames00103.png
  ./Images/frames00106.png
  ./Images/frames00109.png
  ./Images/frames00112.png
  ./Images/frames00115.png
  ./Images/frames00118.png
  ./Images/frames00121.png
  ./Images/frames00124.png
  ./Images/frames00127.png
  ./Images/frames00130.png
  ./Images/frames00133.png
  ./Images/frames00136.png
  ./Images/frames00139.png
  ./Images/frames00142.png
  ./Images/frames00145.png
  ./Images/frames00148.png
  ./Images/frames00151.png
  ./Images/frames00154.png
  ./Images/frames00157.png
  ./Images/frames00160.png
  ./Images/frames00163.png
  ./Images/frames00166.png
  ./Images/frames00169.png
  ./Images/frames00172.png
  ./Images/frames00175.png
  ./Images/frames00178.png
  ./Images/frames00181.png
  ./Images/frames00184.png
  ./Images/frames00187.png
  ./Images/frames00190.png
  ./Images/frames00193.png
  ./Images/frames00196.png
  ./Images/frames00199.png
  ./Images/frames00202.png
 `;
        return data.split("\n")[index];
    }

    const frameCount = 67;

    const images = [];
    const imageSeq = {
        frame: 1,
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = files(i);
        images.push(img);
    }

    gsap.to(imageSeq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: `none`,
        scrollTrigger: {
            scrub: .5,
            trigger: `.page2`,
            start: `top top`,
            end: `250% top`,
            scroller: `#main`,
        },
        onUpdate: render,
    });

    images[1].onload = render;

    function render() {
        scaleImage(images[imageSeq.frame], context);
    }

    function scaleImage(img, ctx) {
        var canvas = ctx.canvas;
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;
        var ratio = Math.max(hRatio, vRatio);
        var centerShift_x = (canvas.width - img.width * ratio) / 2;
        var centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    }
    ScrollTrigger.create({

        trigger: ".page2",
        pin: true,
        scroller: `#main`,
        start: `top top`,
        end: `250% top`,
    });
}
canvas()

// PAGE 4 TEXT ANIMATION
function clutter2() {
    var clutter2 = "";

    document.querySelector(".page4 h1").textContent.split("").forEach(function (dets) {
        clutter2 += `<span>${dets}</span>`

        document.querySelector(".page4 h1").innerHTML = clutter2;
    })

    gsap.to(".page4 h1 span", {
        color: "#fff",
        stagger: 2,
        duration: 8,
        scrollTrigger: {
            trigger: ".page4 h1 span",
            scroller: "#main",
            start: "top bottom",
            end: "bottom 40%",
            scrub: 1,
            // markers: true
        },

    })
}
clutter2()

// PAGE 5 CANVAS ANIMATION
function canvas1() {
    const canvas = document.querySelector(".page5 canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    });

    function files(index) {
        var data = `
./Images/bridges00004.png
./Images/bridges00007.png
./Images/bridges00010.png
./Images/bridges00013.png
./Images/bridges00016.png
./Images/bridges00019.png
./Images/bridges00022.png
./Images/bridges00025.png
./Images/bridges00028.png
./Images/bridges00031.png
./Images/bridges00034.png
./Images/bridges00037.png
./Images/bridges00040.png
./Images/bridges00043.png
./Images/bridges00046.png
./Images/bridges00049.png
./Images/bridges00052.png
./Images/bridges00055.png
./Images/bridges00058.png
./Images/bridges00061.png
./Images/bridges00064.png
./Images/bridges00067.png
./Images/bridges00070.png
./Images/bridges00073.png
./Images/bridges00076.png
./Images/bridges00079.png
./Images/bridges00082.png
./Images/bridges00085.png
./Images/bridges00088.png
./Images/bridges00091.png
./Images/bridges00094.png
./Images/bridges00097.png
./Images/bridges00100.png
./Images/bridges00103.png
./Images/bridges00106.png
./Images/bridges00109.png
./Images/bridges00112.png
./Images/bridges00115.png
./Images/bridges00118.png
./Images/bridges00121.png
./Images/bridges00124.png
./Images/bridges00127.png
./Images/bridges00130.png
./Images/bridges00133.png
./Images/bridges00136.png
./Images/bridges00139.png
./Images/bridges00142.png
./Images/bridges00145.png
./Images/bridges00148.png
./Images/bridges00151.png
./Images/bridges00154.png
./Images/bridges00157.png
./Images/bridges00160.png
./Images/bridges00163.png
./Images/bridges00166.png
./Images/bridges00169.png
./Images/bridges00172.png
./Images/bridges00175.png
./Images/bridges00178.png
./Images/bridges00181.png
./Images/bridges00184.png
./Images/bridges00187.png
./Images/bridges00190.png
./Images/bridges00193.png
./Images/bridges00196.png
./Images/bridges00199.png
./Images/bridges00202.png
`;
        return data.split("\n")[index];
    }

    const frameCount = 67;

    const images = [];
    const imageSeq = {
        frame: 1,
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = files(i);
        images.push(img);
    }

    gsap.to(imageSeq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: `none`,
        scrollTrigger: {
            scrub: .5,
            trigger: `.page5`,
            start: `top top`,
            end: `250% top`,
            scroller: `#main`,
        },
        onUpdate: render,
    });

    images[1].onload = render;

    function render() {
        scaleImage(images[imageSeq.frame], context);
    }

    function scaleImage(img, ctx) {
        var canvas = ctx.canvas;
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;
        var ratio = Math.max(hRatio, vRatio);
        var centerShift_x = (canvas.width - img.width * ratio) / 2;
        var centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    }
    ScrollTrigger.create({

        trigger: ".page5",
        pin: true,
        scroller: `#main`,
        start: `top top`,
        end: `250% top`,
    });
}
canvas1()

// PAGE 6 TEXT ANIMATION
function clutter3() {
    var clutter2 = "";

    document.querySelector(".page6 h1").textContent.split(" ").forEach(function (dets) {
        clutter2 += `<span> ${dets} </span>`

        document.querySelector(".page6 h1").innerHTML = clutter2;
    })

    gsap.to(".page6 h1 span", {
        color: "#fff",
        stagger: 2,
        duration: 8,
        scrollTrigger: {
            trigger: ".page6 h1 span",
            scroller: "#main",
            start: "top bottom",
            end: "bottom 40%",
            scrub: 1,
            // markers: true
        },

    })
}
clutter3()

// PAGE 7 CANVAS ANIMATION
function canvas2() {
    const canvas = document.querySelector(".page7>canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    });

    function files(index) {
        var data = `

https://thisismagma.com/assets/home/lore/seq/1.webp?2
https://thisismagma.com/assets/home/lore/seq/2.webp?2
https://thisismagma.com/assets/home/lore/seq/3.webp?2
https://thisismagma.com/assets/home/lore/seq/4.webp?2
https://thisismagma.com/assets/home/lore/seq/5.webp?2
https://thisismagma.com/assets/home/lore/seq/6.webp?2
https://thisismagma.com/assets/home/lore/seq/7.webp?2
https://thisismagma.com/assets/home/lore/seq/8.webp?2
https://thisismagma.com/assets/home/lore/seq/9.webp?2
https://thisismagma.com/assets/home/lore/seq/10.webp?2
https://thisismagma.com/assets/home/lore/seq/11.webp?2
https://thisismagma.com/assets/home/lore/seq/12.webp?2
https://thisismagma.com/assets/home/lore/seq/13.webp?2
https://thisismagma.com/assets/home/lore/seq/14.webp?2
https://thisismagma.com/assets/home/lore/seq/15.webp?2
https://thisismagma.com/assets/home/lore/seq/16.webp?2
https://thisismagma.com/assets/home/lore/seq/17.webp?2
https://thisismagma.com/assets/home/lore/seq/18.webp?2
https://thisismagma.com/assets/home/lore/seq/19.webp?2
https://thisismagma.com/assets/home/lore/seq/20.webp?2
https://thisismagma.com/assets/home/lore/seq/21.webp?2
https://thisismagma.com/assets/home/lore/seq/22.webp?2
https://thisismagma.com/assets/home/lore/seq/23.webp?2
https://thisismagma.com/assets/home/lore/seq/24.webp?2
https://thisismagma.com/assets/home/lore/seq/25.webp?2
https://thisismagma.com/assets/home/lore/seq/26.webp?2
https://thisismagma.com/assets/home/lore/seq/27.webp?2
https://thisismagma.com/assets/home/lore/seq/28.webp?2
https://thisismagma.com/assets/home/lore/seq/29.webp?2
https://thisismagma.com/assets/home/lore/seq/30.webp?2
https://thisismagma.com/assets/home/lore/seq/31.webp?2
https://thisismagma.com/assets/home/lore/seq/32.webp?2
https://thisismagma.com/assets/home/lore/seq/33.webp?2
https://thisismagma.com/assets/home/lore/seq/34.webp?2
https://thisismagma.com/assets/home/lore/seq/35.webp?2
https://thisismagma.com/assets/home/lore/seq/36.webp?2
https://thisismagma.com/assets/home/lore/seq/37.webp?2
https://thisismagma.com/assets/home/lore/seq/38.webp?2
https://thisismagma.com/assets/home/lore/seq/39.webp?2
https://thisismagma.com/assets/home/lore/seq/40.webp?2
https://thisismagma.com/assets/home/lore/seq/41.webp?2
https://thisismagma.com/assets/home/lore/seq/42.webp?2
https://thisismagma.com/assets/home/lore/seq/43.webp?2
https://thisismagma.com/assets/home/lore/seq/44.webp?2
https://thisismagma.com/assets/home/lore/seq/45.webp?2
https://thisismagma.com/assets/home/lore/seq/46.webp?2
https://thisismagma.com/assets/home/lore/seq/47.webp?2
https://thisismagma.com/assets/home/lore/seq/48.webp?2
https://thisismagma.com/assets/home/lore/seq/49.webp?2
https://thisismagma.com/assets/home/lore/seq/50.webp?2
https://thisismagma.com/assets/home/lore/seq/51.webp?2
https://thisismagma.com/assets/home/lore/seq/52.webp?2
https://thisismagma.com/assets/home/lore/seq/53.webp?2
https://thisismagma.com/assets/home/lore/seq/54.webp?2
https://thisismagma.com/assets/home/lore/seq/55.webp?2
https://thisismagma.com/assets/home/lore/seq/56.webp?2
https://thisismagma.com/assets/home/lore/seq/57.webp?2
https://thisismagma.com/assets/home/lore/seq/58.webp?2
https://thisismagma.com/assets/home/lore/seq/59.webp?2
https://thisismagma.com/assets/home/lore/seq/60.webp?2
https://thisismagma.com/assets/home/lore/seq/61.webp?2
https://thisismagma.com/assets/home/lore/seq/62.webp?2
https://thisismagma.com/assets/home/lore/seq/63.webp?2
https://thisismagma.com/assets/home/lore/seq/64.webp?2
https://thisismagma.com/assets/home/lore/seq/65.webp?2
https://thisismagma.com/assets/home/lore/seq/66.webp?2
https://thisismagma.com/assets/home/lore/seq/67.webp?2
https://thisismagma.com/assets/home/lore/seq/68.webp?2
https://thisismagma.com/assets/home/lore/seq/69.webp?2
https://thisismagma.com/assets/home/lore/seq/70.webp?2
https://thisismagma.com/assets/home/lore/seq/71.webp?2
https://thisismagma.com/assets/home/lore/seq/72.webp?2
https://thisismagma.com/assets/home/lore/seq/73.webp?2
https://thisismagma.com/assets/home/lore/seq/74.webp?2
https://thisismagma.com/assets/home/lore/seq/75.webp?2
https://thisismagma.com/assets/home/lore/seq/76.webp?2
https://thisismagma.com/assets/home/lore/seq/77.webp?2
https://thisismagma.com/assets/home/lore/seq/78.webp?2
https://thisismagma.com/assets/home/lore/seq/79.webp?2
https://thisismagma.com/assets/home/lore/seq/80.webp?2
https://thisismagma.com/assets/home/lore/seq/81.webp?2
https://thisismagma.com/assets/home/lore/seq/82.webp?2
https://thisismagma.com/assets/home/lore/seq/83.webp?2
https://thisismagma.com/assets/home/lore/seq/84.webp?2
https://thisismagma.com/assets/home/lore/seq/85.webp?2
https://thisismagma.com/assets/home/lore/seq/86.webp?2
https://thisismagma.com/assets/home/lore/seq/87.webp?2
https://thisismagma.com/assets/home/lore/seq/88.webp?2
https://thisismagma.com/assets/home/lore/seq/89.webp?2
https://thisismagma.com/assets/home/lore/seq/90.webp?2
https://thisismagma.com/assets/home/lore/seq/91.webp?2
https://thisismagma.com/assets/home/lore/seq/92.webp?2
https://thisismagma.com/assets/home/lore/seq/93.webp?2
https://thisismagma.com/assets/home/lore/seq/94.webp?2
https://thisismagma.com/assets/home/lore/seq/95.webp?2
https://thisismagma.com/assets/home/lore/seq/96.webp?2
https://thisismagma.com/assets/home/lore/seq/97.webp?2
https://thisismagma.com/assets/home/lore/seq/98.webp?2
https://thisismagma.com/assets/home/lore/seq/99.webp?2
https://thisismagma.com/assets/home/lore/seq/100.webp?2
https://thisismagma.com/assets/home/lore/seq/101.webp?2
https://thisismagma.com/assets/home/lore/seq/102.webp?2
https://thisismagma.com/assets/home/lore/seq/103.webp?2
https://thisismagma.com/assets/home/lore/seq/104.webp?2
https://thisismagma.com/assets/home/lore/seq/105.webp?2
https://thisismagma.com/assets/home/lore/seq/106.webp?2
https://thisismagma.com/assets/home/lore/seq/107.webp?2
https://thisismagma.com/assets/home/lore/seq/108.webp?2
https://thisismagma.com/assets/home/lore/seq/109.webp?2
https://thisismagma.com/assets/home/lore/seq/110.webp?2
https://thisismagma.com/assets/home/lore/seq/111.webp?2
https://thisismagma.com/assets/home/lore/seq/112.webp?2
https://thisismagma.com/assets/home/lore/seq/113.webp?2
https://thisismagma.com/assets/home/lore/seq/114.webp?2
https://thisismagma.com/assets/home/lore/seq/115.webp?2
https://thisismagma.com/assets/home/lore/seq/116.webp?2
https://thisismagma.com/assets/home/lore/seq/117.webp?2
https://thisismagma.com/assets/home/lore/seq/118.webp?2
https://thisismagma.com/assets/home/lore/seq/119.webp?2
https://thisismagma.com/assets/home/lore/seq/120.webp?2
https://thisismagma.com/assets/home/lore/seq/121.webp?2
https://thisismagma.com/assets/home/lore/seq/122.webp?2
https://thisismagma.com/assets/home/lore/seq/123.webp?2
https://thisismagma.com/assets/home/lore/seq/124.webp?2
https://thisismagma.com/assets/home/lore/seq/125.webp?2
https://thisismagma.com/assets/home/lore/seq/126.webp?2
https://thisismagma.com/assets/home/lore/seq/127.webp?2
https://thisismagma.com/assets/home/lore/seq/128.webp?2
https://thisismagma.com/assets/home/lore/seq/129.webp?2
https://thisismagma.com/assets/home/lore/seq/130.webp?2
https://thisismagma.com/assets/home/lore/seq/131.webp?2
https://thisismagma.com/assets/home/lore/seq/132.webp?2
https://thisismagma.com/assets/home/lore/seq/133.webp?2
https://thisismagma.com/assets/home/lore/seq/134.webp?2
https://thisismagma.com/assets/home/lore/seq/135.webp?2
https://thisismagma.com/assets/home/lore/seq/136.webp?2

`;
        return data.split("\n")[index];
    }

    const frameCount = 136;

    const images = [];
    const imageSeq = {
        frame: 1,
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = files(i);
        images.push(img);
    }

    gsap.to(imageSeq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: `none`,
        scrollTrigger: {
            scrub: .5,
            trigger: `.page7`,
            start: `top top`,
            end: `250% top`,
            scroller: `#main`,
        },
        onUpdate: render,
    });

    images[1].onload = render;

    function render() {
        scaleImage(images[imageSeq.frame], context);
    }

    function scaleImage(img, ctx) {
        var canvas = ctx.canvas;
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;
        var ratio = Math.max(hRatio, vRatio);
        var centerShift_x = (canvas.width - img.width * ratio) / 2;
        var centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    }
    ScrollTrigger.create({

        trigger: ".page7",
        pin: true,
        scroller: `#main`,
        start: `top top`,
        end: `250% top`,
    });
}
canvas2()

// CIRCLE ANIMATIONS
var tl = gsap.timeline()
tl.to(".circle", {
    scale: 2.9,
    duration: 7,
    scrollTrigger: {
        trigger: '.circle',
        scroller: "#main",
        start: "50% 10%",
        end: "520% 20%",
        // markers: true,
        scrub: 1,

    },
    
})

tl.to(".circle2", {
    scale: 0.7,
    scrollTrigger: {
        trigger:'.circle2',
        scroller: "#main",
        start: "250% 10%",
        end: "580% 30%",
        scrub: 1,
        // markers: true     
    },
    opacity:1,
})

tl.to(".page7 canvas, .circle", {
    scrollTrigger: {
        trigger: '.page7 canvas, .circle',
        scroller: "#main",
        start: "540% 40%",
        end: "560% 35%",
        // markers: true,
        scrub: 1,
        // pin:true
        
    },
    opacity: 0,
})

// PAGE 8
tl.from(".page8>video", {
    
    scale: 2,
    opacity:0,
    
    scrollTrigger: {
        trigger: '.page8>video',
        scroller: "#main",
        start: "20% 70%",
        end: "60% 60%",
        // markers: true,
        scrub: 2,
        // pin:true,
        duration: 8,

    },

})

// H1 ANIMATION
function wordSplit() {
    var split = "";
    
    document.querySelector(".page8 .bottom h1").textContent.split("").forEach(function (dets) {
        split += `<span>${dets}</span>`

        document.querySelector(".page8 .bottom h1").innerHTML = split;
    })
    
    tl.from(".page8 h1", {
        rotation: "5deg",
        height: "50px",
        opacity: 0,
        stagger: 2,
        overflow: "hidden",
        scrollTrigger: {
            trigger: '.page8 h1',
            scroller: "#main",
            start: "top 70%",
            end: "bottom 70%",
            // markers: true,
            scrub: 1,
            duration: 7,
            // pin:true
    
        },
    
    })
    
}
wordSplit();

// BUTTON 
tl.from(".page8 button", {
    y: 0.3,
    duration: 5,
    opacity: 0,
    stagger: 0.2,
     
    scrollTrigger: {
        trigger: '.page8 button',
        scroller: "#main",
        start: "top 90%",
        end: "60% 60%",
        // markers: true,
        scrub: 1,

    },

})

// PAGE 9
tl.to(".page9", {
    backgroundColor:" #002594",
    // duration: 1,
    scrollTrigger: {
        trigger: '.page9',
        scroller: "#main",
        start: "30% 40%",
        end: "bottom bottom",
        // markers: true,
        scrub: 2,

    },
})

tl.from(".page9 .left p", {
    transform: "translateY(30%)",
    duration: 5,
    opacity: 0,
    stagger: 0.2,
     
    scrollTrigger: {
        trigger: '.page9 .left p',
        scroller: "#main",
        start: "top 90%",
        end: "60% 60%",
        // markers: true,
        scrub: 1,

    },
})

tl.from(".page9 .right img, .bottom-text", {
    transform: "translateY(10%)",
    duration: 2,
    opacity: 0,
    stagger: 1.6,
    y: 100,        
    scrollTrigger: {
        trigger: '.page9 .right img, .bottom-text',
        scroller: "#main",
        start: "top 90%",
        end: "100% 10%",
        // markers: true,
        scrub: 3,


    },
})

tl.to(".page10 .left .inner-1, .inner-2, .inner-3, .inner-4",{
    color: "#fff",
    // duration: 8,  
    stagger:4,
    scrollTrigger: {
        trigger: '.page10 .left .inner-1, .inner-2, .inner-3, .inner-4',
        scroller: "#main",
        start: "top 45%",
        end: "300% 45%",
        // markers: true,
        scrub: 2,


    },
})
tl.to(".page10 .left .inner-1, .inner-2, .inner-3, .inner-4",{
    color: "#ffffff42",
    // duration: 8,  
    stagger: 0.4,
    scrollTrigger: {
        trigger: '.page10 .left .inner-1, .inner-2, .inner-3, .inner-4',
        scroller: "#main",
        start: "bottom 35%",
        end: "400% 35%",
        // markers: true,
        scrub: 3,


    },
})

// PAGE 10 
// CANVAS ANIMATION
function canvas3() {
    const canvas = document.querySelector(".page10>.inner-page>canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    });

    function files(index) {
        var data = `

        https://thisismagma.com/assets/home/roadmap/seq/1.webp
        https://thisismagma.com/assets/home/roadmap/seq/2.webp
        https://thisismagma.com/assets/home/roadmap/seq/3.webp
        https://thisismagma.com/assets/home/roadmap/seq/4.webp
        https://thisismagma.com/assets/home/roadmap/seq/5.webp
        https://thisismagma.com/assets/home/roadmap/seq/6.webp
        https://thisismagma.com/assets/home/roadmap/seq/7.webp
        https://thisismagma.com/assets/home/roadmap/seq/8.webp
        https://thisismagma.com/assets/home/roadmap/seq/9.webp
        https://thisismagma.com/assets/home/roadmap/seq/10.webp
        https://thisismagma.com/assets/home/roadmap/seq/11.webp
        https://thisismagma.com/assets/home/roadmap/seq/12.webp
        https://thisismagma.com/assets/home/roadmap/seq/13.webp
        https://thisismagma.com/assets/home/roadmap/seq/14.webp
        https://thisismagma.com/assets/home/roadmap/seq/15.webp
        https://thisismagma.com/assets/home/roadmap/seq/16.webp
        https://thisismagma.com/assets/home/roadmap/seq/17.webp
        https://thisismagma.com/assets/home/roadmap/seq/18.webp
        https://thisismagma.com/assets/home/roadmap/seq/19.webp
        https://thisismagma.com/assets/home/roadmap/seq/20.webp
        https://thisismagma.com/assets/home/roadmap/seq/21.webp
        https://thisismagma.com/assets/home/roadmap/seq/22.webp
        https://thisismagma.com/assets/home/roadmap/seq/23.webp
        https://thisismagma.com/assets/home/roadmap/seq/24.webp
        https://thisismagma.com/assets/home/roadmap/seq/25.webp
        https://thisismagma.com/assets/home/roadmap/seq/26.webp
        https://thisismagma.com/assets/home/roadmap/seq/27.webp
        https://thisismagma.com/assets/home/roadmap/seq/28.webp
        https://thisismagma.com/assets/home/roadmap/seq/29.webp
        https://thisismagma.com/assets/home/roadmap/seq/30.webp
        https://thisismagma.com/assets/home/roadmap/seq/31.webp
        https://thisismagma.com/assets/home/roadmap/seq/32.webp
        https://thisismagma.com/assets/home/roadmap/seq/33.webp
        https://thisismagma.com/assets/home/roadmap/seq/34.webp
        https://thisismagma.com/assets/home/roadmap/seq/35.webp
        https://thisismagma.com/assets/home/roadmap/seq/36.webp
        https://thisismagma.com/assets/home/roadmap/seq/37.webp
        https://thisismagma.com/assets/home/roadmap/seq/38.webp
        https://thisismagma.com/assets/home/roadmap/seq/39.webp
        https://thisismagma.com/assets/home/roadmap/seq/40.webp
        https://thisismagma.com/assets/home/roadmap/seq/41.webp
        https://thisismagma.com/assets/home/roadmap/seq/42.webp
        https://thisismagma.com/assets/home/roadmap/seq/43.webp
        https://thisismagma.com/assets/home/roadmap/seq/44.webp
        https://thisismagma.com/assets/home/roadmap/seq/45.webp
        https://thisismagma.com/assets/home/roadmap/seq/46.webp
        https://thisismagma.com/assets/home/roadmap/seq/47.webp
        https://thisismagma.com/assets/home/roadmap/seq/48.webp
        https://thisismagma.com/assets/home/roadmap/seq/49.webp
        https://thisismagma.com/assets/home/roadmap/seq/50.webp
        https://thisismagma.com/assets/home/roadmap/seq/51.webp
        https://thisismagma.com/assets/home/roadmap/seq/52.webp
        https://thisismagma.com/assets/home/roadmap/seq/53.webp
        https://thisismagma.com/assets/home/roadmap/seq/54.webp
        https://thisismagma.com/assets/home/roadmap/seq/55.webp
        https://thisismagma.com/assets/home/roadmap/seq/56.webp
        https://thisismagma.com/assets/home/roadmap/seq/57.webp
        https://thisismagma.com/assets/home/roadmap/seq/58.webp
        https://thisismagma.com/assets/home/roadmap/seq/59.webp
        https://thisismagma.com/assets/home/roadmap/seq/60.webp
        https://thisismagma.com/assets/home/roadmap/seq/61.webp
        https://thisismagma.com/assets/home/roadmap/seq/62.webp
        https://thisismagma.com/assets/home/roadmap/seq/63.webp
        https://thisismagma.com/assets/home/roadmap/seq/64.webp
        https://thisismagma.com/assets/home/roadmap/seq/65.webp
        https://thisismagma.com/assets/home/roadmap/seq/66.webp
        https://thisismagma.com/assets/home/roadmap/seq/67.webp
        https://thisismagma.com/assets/home/roadmap/seq/68.webp
        https://thisismagma.com/assets/home/roadmap/seq/69.webp
        https://thisismagma.com/assets/home/roadmap/seq/70.webp
        https://thisismagma.com/assets/home/roadmap/seq/71.webp
        https://thisismagma.com/assets/home/roadmap/seq/72.webp
        https://thisismagma.com/assets/home/roadmap/seq/73.webp
        https://thisismagma.com/assets/home/roadmap/seq/74.webp
        https://thisismagma.com/assets/home/roadmap/seq/75.webp

`;
        return data.split("\n")[index];
    }

    const frameCount = 75;

    const images = [];
    const imageSeq = {
        frame: 0,
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = files(i);
        images.push(img);
    }

    gsap.to(imageSeq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: `none`,
        scrollTrigger: {
            scrub: .5,
            trigger: `.inner-page canvas`,
            start: `top 20%`,
            end: `250% 20%`,
            scroller: `#main`,
            // markers: true            
        },
        onUpdate: render,
    });

    images[1].onload = render;

    function render() {
        scaleImage(images[imageSeq.frame], context);
    }

    function scaleImage(img, ctx) {
        var canvas = ctx.canvas;
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;
        var ratio = Math.max(hRatio, vRatio);
        var centerShift_x = (canvas.width - img.width * ratio) / 2;
        var centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    }
    ScrollTrigger.create({

        trigger: ".inner-page canvas",
        pin: true,
        scroller: `#main`,
        start: `top 20%`,
        end: `250% 20%`,
        // markers: true
    });
}
canvas3()


// SCROLLING
// tl.to(".page10 .inner-page .left", {
//     // transform: "translateX(-150%)",
//     scrollTrigger:{
//         trigger: ".page10 .inner-page .left",
//         scroll: "body",
//         markers: true,
//         start: "20% 50%",
//         end: "100% 50%",
//         scrub: 1,
//         duration: 1,
//         // pin: true,
//     },
// })


// gsap.from(".circle", {
//     scale: 2.4,
//     duration: 6,
//     scrollTrigger: {
//         trigger: '.circle',
//         scroller: "#main",
//         start: "500% bottom",
//         end: "570% top",
//         markers: true,
//         scrub: 1

//     },
    
// })

