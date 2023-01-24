(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
        }
    };
    function fullVHfix() {
        const fullScreens = document.querySelectorAll("[data-fullscreen]");
        if (fullScreens.length && isMobile.any()) {
            window.addEventListener("resize", fixHeight);
            function fixHeight() {
                let vh = .01 * window.innerHeight;
                document.documentElement.style.setProperty("--vh", `${vh}px`);
            }
            fixHeight();
        }
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    let catProducts = document.querySelectorAll("[data-product-choice]");
    if (catProducts.length > 0) for (let index = 0; index < catProducts.length; index++) {
        const catProduct = catProducts[index];
        const catProductValue = catProduct.querySelector("[data-product-value]");
        const catProductAvailabilityConst = catProductValue.innerHTML;
        let catProductAvailability = catProductValue.innerHTML;
        catProductAvailability = Number(catProductAvailability);
        if (isNaN(catProductAvailability) || 0 == catProductAvailability) {
            catProduct.classList.remove("_no-select");
            catProduct.classList.add("_not-available");
        }
        if (!isMobile.any()) if (0 !== catProductAvailability) catProduct.addEventListener("click", (function(event) {
            if (catProduct.classList.contains("_select")) {
                catProduct.addEventListener("mouseleave", (function(e) {
                    catProduct.classList.remove("_select");
                    catProduct.classList.add("_no-select");
                }), {
                    once: true
                });
                catProductValue.innerHTML = catProductAvailabilityConst;
                catProductAvailability = catProductValue.innerHTML;
                return catProductAvailability;
            } else if (catProductAvailability > 0) {
                catProductAvailability--;
                catProductValue.innerHTML = catProductAvailability;
                if (0 === catProductAvailability) {
                    catProduct.classList.remove("_no-select");
                    catProduct.classList.add("_not-available");
                    if (!catProduct.classList.contains("_select")) catProduct.addEventListener("mouseleave", (function(e) {
                        catProduct.classList.add("_select");
                    }), {
                        once: true
                    });
                    catProduct.addEventListener("mouseenter", (function(event) {
                        catProduct.addEventListener("click", (function(event) {
                            catProductValue.innerHTML = catProductAvailabilityConst;
                            catProductAvailability = catProductValue.innerHTML;
                            catProduct.classList.remove("_not-available");
                            catProduct.classList.add("_no-select");
                        }), {
                            once: true
                        });
                    }), {
                        once: true
                    });
                    event.preventDefault();
                    return;
                }
            }
            catProductLeave(event, catProduct);
            event.preventDefault();
        }));
        if (isMobile.any()) {
            const catProductReset = document.createElement("button");
            catProductReset.classList.add("_reset-chosen");
            let catProductResetChosen = 0;
            catProduct.append(catProductReset);
            if (0 !== catProductAvailability) catProduct.addEventListener("click", (function(event) {
                if (catProductAvailability > 0) {
                    catProductAvailability--;
                    catProductValue.innerHTML = catProductAvailability;
                    catProduct.classList.remove("_no-select");
                    catProduct.classList.add("_select");
                    catProductResetChosen++;
                    catProductReset.innerHTML = `<p>Сбросить ${catProductResetChosen}</p>`;
                    if (!catProductReset.classList.add("_active")) catProductReset.classList.add("_active");
                    catProductReset.addEventListener("click", (function(event) {
                        catProductReset.classList.remove("_active");
                        catProductResetChosen = 0;
                        catProduct.classList.remove("_select");
                        catProduct.classList.remove("_not-available");
                        catProduct.classList.add("_no-select");
                        catProductValue.innerHTML = catProductAvailabilityConst;
                        catProductAvailability = catProductValue.innerHTML;
                        event.stopPropagation();
                        event.preventDefault();
                        return;
                    }));
                    if (0 === catProductAvailability) {
                        catProduct.classList.add("_not-available");
                        event.preventDefault();
                        return;
                    }
                }
                event.preventDefault();
            }));
        }
    }
    function catProductLeave(event, catProduct) {
        if (event.target.closest("[data-product-select]")) if (catProduct.classList.contains("_no-select")) catProduct.addEventListener("mouseleave", (function(e) {
            catProduct.classList.remove("_no-select");
            catProduct.classList.add("_select");
        }), {
            once: true
        }); else if (catProduct.classList.contains("_select")) catProduct.addEventListener("mouseleave", (function(e) {
            catProduct.classList.remove("_select");
            catProduct.classList.add("_no-select");
        }), {
            once: true
        });
    }
    window["FLS"] = true;
    isWebp();
    fullVHfix();
})();