/*
 Copyright (c) 2008 Yii Software LLC
 @license http://www.yiiframework.com/license/
 @author Qiang Xue <qiang.xue@gmail.com>
 @since 2.0
*/

(function (d) {
    function c(a, c) {
        this.config = d.extend({}, b, c);
        this.element = a;
        this.steps = a.find("fieldset");
        this.config.showLegend || this.element.addClass("sf-hide-legend");
        this.btnFinishTmp = this.config.finishBtn;
        this.btnPrevTmp = this.config.prevBtn;
        this.btnNextTmp = this.config.nextBtn;
        this.viewPort;
        this.navWrap;
        this.stepOffset = this.config.stepOffset;
        this.config.startStep >= this.steps.length && (this.config.startStep = this.steps.length - 1);
        this.stepActive = this.config.startStep;
        this.init();
        a.trigger("sf-loaded");
        return this
    }
    var b = {
        duration: 500,
        timingFunction: "swing",
        linkNav: !0,
        showNav: !0,
        showNavNumbers: !0,
        showButtons: !0,
        showLegend: !0,
        nextBtn: d('<a class="next-btn sf-right sf-btn" href="#">NEXT</a>'),
        prevBtn: d('<a class="prev-btn sf-left sf-btn" href="#">PREV</a>'),
        finishBtn: d('<input class="finish-btn sf-right sf-btn" type="button" value="FINISH"/>'),
        onNext: function (a, b) { },
        onPrev: function (a, b) { },
        onFinish: function (a, b) { },
        onSlideChanged: function (a, b, c) { },
        startStep: 0,
        stepOffset: 10,
        height: "first",
        theme: "sea",
        markPrevSteps: !1
    };
    c.prototype.init = function () {
        this.element.append(d("<div>").addClass("sf-viewport"));
        this.viewPort = d(".sf-viewport", this.element);
        this.element.wrap(d("<div>").addClass("sf-wizard").attr("id", this.element.attr("id") + "-box"));
        this.wizard = this.element.parent();
        this.wizard.parent().addClass("sf-" + this.config.theme);
        this.config.showNavNumbers || this.wizard.addClass("sf-nonumbers");
        d(this.viewPort).append(d("<div>").addClass("sf-fieldwrap clearfix"));
        this.fieldWrap = d(".sf-fieldwrap", this.element);
        this.element.append(d("<div>").addClass("sf-controls clearfix"));
        this.controls = d(".sf-controls", this.element);
        this.config.showButtons || this.controls.addClass("sf-hide-buttons");
        var a = this;
        !1 !== this.config.showNav && this.initNav();
        this.steps.each(function (b) {
            var c = d("<div>").addClass("sf-step sf-step-" + b);
            b == a.config.startStep ? c.addClass("sf-step-active") : c.addClass("sf-step-no-active");
            d(this).wrap(c).parent().appendTo(a.fieldWrap);
            d(this).append(d("<div>").addClass("sf-" + b));
            b == a.config.startStep &&
                (a.initBtnFinish(a.config.startStep), a.initBtnNext(a.config.startStep), a.initBtnPrev(a.config.startStep), 0 == a.config.startStep && a.element.find(".sf-btn-prev").hide(), a.config.startStep != a.steps.length - 1 ? a.element.find(".sf-btn-finish").hide() : a.element.find(".sf-btn-next").hide())
        });
        this.setProportion();
        d(window).resize(function () {
            a.careNav(a.stepActive, a.stepActive);
            a.setProportion()
        });
        a.element.on("click", ".next-btn", function (b, c) {
            var k = !1;
            !1 !== a.config.onNext(a.stepActive, a.wizard) && (k = a.goTo(d(".sf-controls .next-btn",
                a.element).data("step")));
            void 0 !== c && (c.ret = k);
            b.preventDefault()
        });
        a.element.on("click", ".prev-btn", function (b, c) {
            var k = !1;
            !1 !== a.config.onPrev(a.stepActive, a.wizard) && (k = a.goTo(d(".sf-controls .prev-btn", a.element).data("step")));
            void 0 !== c && (c.ret = k);
            b.preventDefault()
        });
        a.element.on("click", ".finish-btn", function (b, c) {
            var d = !1,
                m = jQuery.Event("sf-finish");
            a.element.trigger(m, [a.stepActive, a.stepActive, a.wizard]);
            !1 === a.config.onFinish(a.stepActive, a.wizard) || m.isDefaultPrevented() ? b.preventDefault() :
                d = !0;
            void 0 !== c && (c.ret = d)
        });
        a.element.on("keydown", ":input", function (b) {
            13 == (b.keyCode || b.which) && (a.next(), b.preventDefault())
        })
    };
    c.prototype.initNav = function () {
        var a = this,
            b = d("<div>").addClass("sf-nav-wrap clearfix"),
            c = d("<ul>").addClass("sf-nav clearfix");
        b.append(c);
        "bottom" == a.config.showNav ? this.element.after(b) : this.element.before(b);
        this.navWrap = d(".sf-nav-wrap", a.wizard);
        this.steps.each(function (b) {
            var c = d("<li>").addClass("sf-nav-step sf-nav-step-" + b).data("step", b);
            a.config.markPrevSteps &&
                b < a.config.startStep && c.addClass("sf-nav-prev-step");
            a.config.showNavNumbers ? c.addClass("sf-li-number") : c.addClass("sf-li-nonumber");
            d("<span>").addClass("sf-nav-subtext").html(d(this).find("legend").first().html()).appendTo(c);
            var e = d("<div>").addClass("sf-nav-number").appendTo(c);
            d("<span>").addClass("sf-nav-number-inner").html(b + 1).appendTo(e);
            d("<div>").appendTo(c);
            b == a.config.startStep && c.addClass("sf-active");
            !0 == a.config.linkNav && c.addClass("sf-nav-link");
            "left" == a.config.showNav && (d(".sf-nav-wrap",
                a.wizard).addClass("sf-nav-left"), a.element.addClass("sf-nav-on-left"));
            "right" == a.config.showNav && (d(".sf-nav-wrap", a.wizard).addClass("sf-nav-right"), a.element.addClass("sf-nav-on-right"));
            if ("top" == a.config.showNav || !0 === a.config.showNav) d(".sf-nav-wrap", a.wizard).addClass("sf-nav-top"), a.element.addClass("sf-nav-on-top");
            "bottom" == a.config.showNav && (d(".sf-nav-wrap", a.wizard).addClass("sf-nav-bottom"), a.element.addClass("sf-nav-on-bottom"));
            a.wizard.find(".sf-nav").append(c)
        });
        d(".sf-nav-step.sf-nav-link",
            a.wizard).on("click", function (b) {
                var c = d(this).data("step"),
                    e = a.stepActive;
                if (0 > a.stepActive - c)
                    for (var f = a.stepActive; f < c; f++)
                        if (!1 !== a.config.onNext(f)) e = f + 1;
                        else break;
                else
                    for (f = a.stepActive; f > c; f--)
                        if (!1 !== a.config.onPrev(f)) e = f - 1;
                        else break;
                a.goTo(e);
                b.preventDefault()
            });
        this.careNav(this.stepActive, this.stepActive)
    };
    c.prototype.setProportion = function () {
        this.stepWidth = this.viewPort.width();
        var a = this.stepWidth * this.steps.length,
            b = 0;
        if ("auto" == this.config.height && this.steps.length) {
            this.viewPort.height("auto");
            var c = d(this.steps[this.stepActive]).outerHeight(!0);
            this.viewPort.height(c)
        }
        "first" == this.config.height && this.steps.length && (d(this.steps[0]).height("auto"), b = d(this.steps[0]).height());
        !isNaN(parseInt(this.config.height)) && this.steps.length && (b = this.config.height);
        "tallest" == this.config.height && this.steps.length && this.steps.each(function (a) {
            d(this).height("auto");
            d(this).height() > b && (b = d(this).height())
        });
        var k = this;
        this.steps.each(function (a) {
            d(this).parent().css({
                width: k.stepWidth + "px",
                "float": "left",
                "margin-right": k.stepOffset + "px"
            });
            b && d(this).height(b)
        });
        this.fieldWrap.width(a + this.stepOffset * this.steps.length + "px");
        this.fieldWrap.css({
            "margin-left": "-" + (this.stepActive * this.stepWidth + this.stepOffset * this.stepActive) + "px"
        })
    };
    c.prototype.goTo = function (a) {
        var b = this,
            c = this.stepActive,
            k = c - a,
            m = jQuery.Event("sf-step-before");
        b.element.trigger(m, [c, a, b.wizard]);
        if (m.isDefaultPrevented()) return !1;
        b.config.markPrevSteps && d(".sf-nav-step", b.navWrap).each(function (b) {
            d(this).removeClass("sf-nav-prev-step");
            b < a && d(this).addClass("sf-nav-prev-step")
        });
        this.careNav(a, c);
        b.element.find(".sf-step").removeClass("sf-step-no-active").addClass("sf-step-active");
        m = "+=";
        0 > k && (m = "-=");
        k = Math.abs(k);
        this.fieldWrap.animate({
            "margin-left": m + (k * this.stepWidth + this.stepOffset * k)
        }, this.config.duration * k, this.config.timingFunction, function () {
            b.element.find(".sf-step").removeClass("sf-step-active").addClass("sf-step-no-active");
            b.element.find(".sf-step-" + a).removeClass("sf-step-no-active").addClass("sf-step-active");
            b.element.trigger("sf-step-after", [c, a, b.wizard]);
            b.config.onSlideChanged(c, a, this.wizard)
        });
        this.stepActive = a;
        d(".sf-nav-step", this.wizard).removeClass("sf-active");
        d(".sf-nav-step-" + a, this.wizard).addClass("sf-active");
        "auto" == this.config.height && this.steps.length && (k = d(this.steps[this.stepActive]).outerHeight(!0), this.viewPort.animate({
            height: k + "px"
        }, this.config.duration, this.config.timingFunction));
        a + 1 < this.steps.length ? this.btnNext.data("step", a + 1).fadeIn(100) : this.btnNext.fadeOut(0);
        a + 1 >= this.steps.length ? this.btnFinish.data("step",
            a - 1).fadeIn(100) : this.btnFinish.fadeOut(0);
        0 == a ? this.btnPrev.fadeOut(100) : this.btnPrev.data("step", a - 1).fadeIn(100);
        return !0
    };
    c.prototype.careNav = function (a, b) {
        var c = this;
        if (!1 !== c.config.showNav) {
            var k = c.navWrap.width(),
                m = [];
            if (c.navWrap.hasClass("sf-nav-top") || c.navWrap.hasClass("sf-nav-bottom")) {
                var s = 0,
                    u = 0;
                d(".sf-nav-step", c.navWrap).each(function (b) {
                    m[b] = d(this).outerWidth(!0);
                    u += m[b];
                    b < a && (s += m[b])
                });
                0 <= b - a && (s -= m[a - 1]);
                if (u > k) {
                    var k = u - k,
                        x = a - 1,
                        p = 0;
                    0 > b - a && (x = a + 1, p = -50);
                    s > k && (s = k, p = 0);
                    d(".sf-nav-step-" +
                        x, this.wizard).length ? d(".sf-nav", c.navWrap).animate({
                            left: "-" + (s + p) + "px"
                        }, this.config.duration) : 0 > x ? d(".sf-nav", c.navWrap).animate({
                            left: "0px"
                        }, this.config.duration) : d(".sf-nav", c.navWrap).animate({
                            left: "-" + s + "px"
                        }, this.config.duration)
                }
            } else {
                var q = 0;
                d(".sf-nav-step", c.navWrap).each(function (a) {
                    c.navWrap.css("width", "9999px");
                    a = d(this).css("float", "left").outerWidth(!0);
                    c.navWrap.css("width", "");
                    d(this).css("float", "");
                    q < a && (q = a)
                });
                q += 2;
                k = c.element.closest(".sf-wizard").width() - q;
                c.element.css({
                    width: k +
                        "px",
                    "float": ""
                });
                c.navWrap.hasClass("sf-nav-left") && c.element.css({
                    "margin-left": q + "px"
                });
                c.navWrap.css("width", q + "px")
            }
        }
    };
    c.prototype.refresh = function () {
        this.careNav(this.stepActive, this.stepActive);
        this.setProportion()
    };
    c.prototype.initBtnNext = function (a) {
        this.btnNext = this.btnNextTmp.clone(!0).addClass("sf-btn-next").data("step", a + 1);
        this.btnNext.appendTo(d(this.controls))
    };
    c.prototype.initBtnPrev = function (a) {
        this.btnPrev = this.btnPrevTmp.clone(!0).addClass("sf-btn-prev").data("step", a - 1);
        this.btnPrev.appendTo(d(this.controls))
    };
    c.prototype.initBtnFinish = function (a) {
        d(".sf-step-" + a).append(" ");
        this.btnFinish = this.btnFinishTmp.clone(!0).addClass("sf-btn-finish").data("step", a - 1);
        this.btnFinish.appendTo(d(this.controls))
    };
    c.prototype.next = function () {
        var a = {
            ret: !1
        };
        this.stepActive < this.steps.length - 1 ? d(".sf-controls .next-btn", this.element).trigger("click", [a]) : d(".sf-controls .finish-btn", this.element).trigger("click", [a]);
        return a.ret
    };
    c.prototype.prev = function () {
        var a = {
            ret: !1
        };
        d(".sf-controls .prev-btn", this.element).trigger("click", [a]);
        return a.ret
    };
    c.prototype.finish = function () {
        var a = {
            ret: !1
        };
        d(".sf-controls .finish-btn", this.element).trigger("click", [a]);
        return a.ret
    };
    d.fn.stepFormWizard = function (a) {
        return new c(this.first(), a)
    }
})(jQuery);
$(window).load(function () {
    
    $(".sf-wizard fieldset").mCustomScrollbar({
        theme: "dark-3",
        scrollButtons: {
            enable: !0
        }
    });
});

! function (d) {
    "function" == typeof define && define.amd ? define(["jquery"], d) : "object" == typeof exports ? module.exports = d : d(jQuery)
}(function (d) {
    function c(c) {
        var f = c || window.event,
            q = m.call(arguments, 1),
            k = 0,
            B = 0,
            h = 0,
            n = 0,
            v = 0,
            L = 0;
        if (c = d.event.fix(f), c.type = "mousewheel", "detail" in f && (h = -1 * f.detail), "wheelDelta" in f && (h = f.wheelDelta), "wheelDeltaY" in f && (h = f.wheelDeltaY), "wheelDeltaX" in f && (B = -1 * f.wheelDeltaX), "axis" in f && f.axis === f.HORIZONTAL_AXIS && (B = -1 * h, h = 0), k = 0 === h ? B : h, "deltaY" in f && (h = -1 * f.deltaY, k = h), "deltaX" in
            f && (B = f.deltaX, 0 === h && (k = -1 * B)), 0 !== h || 0 !== B) {
            if (1 === f.deltaMode) var s = d.data(this, "mousewheel-line-height"),
                k = k * s,
                h = h * s,
                B = B * s;
            else 2 === f.deltaMode && (s = d.data(this, "mousewheel-page-height"), k *= s, h *= s, B *= s);
            if (n = Math.max(Math.abs(h), Math.abs(B)), (!e || e > n) && (e = n, u.settings.adjustOldDeltas && "mousewheel" === f.type && 0 === n % 120 && (e /= 40)), u.settings.adjustOldDeltas && "mousewheel" === f.type && 0 === n % 120 && (k /= 40, B /= 40, h /= 40), k = Math[1 <= k ? "floor" : "ceil"](k / e), B = Math[1 <= B ? "floor" : "ceil"](B / e), h = Math[1 <= h ? "floor" : "ceil"](h /
                    e), u.settings.normalizeOffset && this.getBoundingClientRect) f = this.getBoundingClientRect(), v = c.clientX - f.left, L = c.clientY - f.top;
            return c.deltaX = B, c.deltaY = h, c.deltaFactor = e, c.offsetX = v, c.offsetY = L, c.deltaMode = 0, q.unshift(c, k, B, h), a && clearTimeout(a), a = setTimeout(b, 200), (d.event.dispatch || d.event.handle).apply(this, q)
        }
    }

    function b() {
        e = null
    }
    var a, e, f = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        k = "onwheel" in document || 9 <= document.documentMode ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        m = Array.prototype.slice;
    if (d.event.fixHooks)
        for (var s = f.length; s;) d.event.fixHooks[f[--s]] = d.event.mouseHooks;
    var u = d.event.special.mousewheel = {
        version: "3.1.11",
        setup: function () {
            if (this.addEventListener)
                for (var a = k.length; a;) this.addEventListener(k[--a], c, !1);
            else this.onmousewheel = c;
            d.data(this, "mousewheel-line-height", u.getLineHeight(this));
            d.data(this, "mousewheel-page-height", u.getPageHeight(this))
        },
        teardown: function () {
            if (this.removeEventListener)
                for (var a = k.length; a;) this.removeEventListener(k[--a],
                    c, !1);
            else this.onmousewheel = null;
            d.removeData(this, "mousewheel-line-height");
            d.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function (a) {
            a = d(a)["offsetParent" in d.fn ? "offsetParent" : "parent"]();
            return a.length || (a = d("body")), parseInt(a.css("fontSize"), 10)
        },
        getPageHeight: function (a) {
            return d(a).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    d.fn.extend({
        mousewheel: function (a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function (a) {
            return this.unbind("mousewheel",
                a)
        }
    })
});
(function (d, c, b) {
    (function (a) {
        a(jQuery)
    })(function (a) {
        var b = {
            setWidth: !1,
            setHeight: !1,
            setTop: 0,
            setLeft: 0,
            axis: "y",
            scrollbarPosition: "inside",
            scrollInertia: 950,
            autoDraggerLength: !0,
            autoHideScrollbar: !1,
            autoExpandScrollbar: !1,
            alwaysShowScrollbar: 0,
            snapAmount: null,
            snapOffset: 0,
            mouseWheel: {
                enable: !0,
                scrollAmount: "auto",
                axis: "y",
                preventDefault: !1,
                deltaFactor: "auto",
                normalizeDelta: !1,
                invert: !1,
                disableOver: ["select", "option", "keygen", "datalist", "textarea"]
            },
            scrollButtons: {
                enable: !1,
                scrollType: "stepless",
                scrollAmount: "auto"
            },
            keyboard: {
                enable: !0,
                scrollType: "stepless",
                scrollAmount: "auto"
            },
            contentTouchScroll: 25,
            advanced: {
                autoExpandHorizontalScroll: !1,
                autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                updateOnContentResize: !0,
                updateOnImageLoad: !0,
                updateOnSelectorChange: !1
            },
            theme: "light",
            callbacks: {
                onScrollStart: !1,
                onScroll: !1,
                onTotalScroll: !1,
                onTotalScrollBack: !1,
                whileScrolling: !1,
                onTotalScrollOffset: 0,
                onTotalScrollBackOffset: 0,
                alwaysTriggerOffsets: !0
            },
            live: !1,
            liveSelector: null
        },
            f = 0,
            k = {},
            m = function (a) {
                k[a] && (clearTimeout(k[a]), p._delete.call(null, k[a]))
            },
            s = d.attachEvent && !d.addEventListener ? 1 : 0,
            u = !1,
            x = {
                init: function (c) {
                    c = a.extend(!0, {}, b, c);
                    var d = p._selector.call(this);
                    if (c.live) {
                        var B = c.liveSelector || this.selector || ".mCustomScrollbar",
                            h = a(B);
                        if ("off" === c.live) {
                            m(B);
                            return
                        }
                        k[B] = setTimeout(function () {
                            h.mCustomScrollbar(c);
                            "once" === c.live && h.length && m(B)
                        }, 500)
                    } else m(B);
                    c.setWidth = c.set_width ? c.set_width : c.setWidth;
                    c.setHeight = c.set_height ? c.set_height : c.setHeight;
                    c.axis = c.horizontalScroll ? "x" : p._findAxis.call(null, c.axis);
                    c.scrollInertia = 17 > c.scrollInertia ? 17 : c.scrollInertia;
                    "object" !== typeof c.mouseWheel && !0 == c.mouseWheel && (c.mouseWheel = {
                        enable: !0,
                        scrollAmount: "auto",
                        axis: "y",
                        preventDefault: !1,
                        deltaFactor: "auto",
                        normalizeDelta: !1,
                        invert: !1
                    });
                    c.mouseWheel.scrollAmount = c.mouseWheelPixels ? c.mouseWheelPixels : c.mouseWheel.scrollAmount;
                    c.mouseWheel.normalizeDelta = c.advanced.normalizeMouseWheelDelta ? c.advanced.normalizeMouseWheelDelta : c.mouseWheel.normalizeDelta;
                    c.scrollButtons.scrollType = p._findScrollButtonsType.call(null, c.scrollButtons.scrollType);
                    p._theme.call(null, c);
                    return a(d).each(function () {
                        var b = a(this);
                        if (!b.data("mCS")) {
                            b.data("mCS", {
                                idx: ++f,
                                opt: c,
                                scrollRatio: {
                                    y: null,
                                    x: null
                                },
                                overflowed: null,
                                bindEvents: !1,
                                tweenRunning: !1,
                                sequential: {},
                                langDir: b.css("direction"),
                                cbOffsets: null,
                                trigger: null
                            });
                            var d = b.data("mCS").opt,
                                e = b.data("mcs-axis"),
                                h = b.data("mcs-scrollbar-position"),
                                k = b.data("mcs-theme");
                            e && (d.axis = e);
                            h && (d.scrollbarPosition = h);
                            k && (d.theme =
                                k, p._theme.call(null, d));
                            p._pluginMarkup.call(this);
                            x.update.call(null, b)
                        }
                    })
                },
                update: function (b) {
                    b = b || p._selector.call(this);
                    return a(b).each(function () {
                        var b = a(this);
                        if (b.data("mCS")) {
                            var c = b.data("mCS"),
                                d = c.opt,
                                e = a("#mCSB_" + c.idx + "_container"),
                                f = [a("#mCSB_" + c.idx + "_dragger_vertical"), a("#mCSB_" + c.idx + "_dragger_horizontal")];
                            e.length && (c.tweenRunning && p._stop.call(null, b), b.hasClass("mCS_disabled") && b.removeClass("mCS_disabled"), b.hasClass("mCS_destroyed") && b.removeClass("mCS_destroyed"), p._maxHeight.call(this),
                                p._expandContentHorizontally.call(this), "y" === d.axis || d.advanced.autoExpandHorizontalScroll || e.css("width", p._contentWidth(e.children())), c.overflowed = p._overflowed.call(this), p._scrollbarVisibility.call(this), d.autoDraggerLength && p._setDraggerLength.call(this), p._scrollRatio.call(this), p._bindEvents.call(this), e = [Math.abs(e[0].offsetTop), Math.abs(e[0].offsetLeft)], "x" !== d.axis && (c.overflowed[0] ? f[0].height() > f[0].parent().height() ? p._resetContentPosition.call(this) : p._scrollTo.call(this, b, e[0].toString(), {
                                    dir: "y",
                                    dur: 0,
                                    overwrite: "none"
                                }) : (p._resetContentPosition.call(this), "y" === d.axis ? p._unbindEvents.call(this) : "yx" === d.axis && c.overflowed[1] && p._scrollTo.call(this, b, e[1].toString(), {
                                    dir: "x",
                                    dur: 0,
                                    overwrite: "none"
                                }))), "y" !== d.axis && (c.overflowed[1] ? f[1].width() > f[1].parent().width() ? p._resetContentPosition.call(this) : p._scrollTo.call(this, b, e[1].toString(), {
                                    dir: "x",
                                    dur: 0,
                                    overwrite: "none"
                                }) : (p._resetContentPosition.call(this), "x" === d.axis ? p._unbindEvents.call(this) : "yx" === d.axis && c.overflowed[0] &&
                                    p._scrollTo.call(this, b, e[0].toString(), {
                                        dir: "y",
                                        dur: 0,
                                        overwrite: "none"
                                    }))), p._autoUpdate.call(this))
                        }
                    })
                },
                scrollTo: function (b, c) {
                    if ("undefined" != typeof b && null != b) {
                        var d = p._selector.call(this);
                        return a(d).each(function () {
                            var d = a(this);
                            if (d.data("mCS")) {
                                var e = d.data("mCS"),
                                    f = e.opt,
                                    k = a.extend(!0, {}, {
                                        trigger: "external",
                                        scrollInertia: f.scrollInertia,
                                        scrollEasing: "mcsEaseInOut",
                                        moveDragger: !1,
                                        callbacks: !0,
                                        onStart: !0,
                                        onUpdate: !0,
                                        onComplete: !0
                                    }, c),
                                    m = p._arr.call(this, b),
                                    B = 17 > k.scrollInertia ? 17 : k.scrollInertia;
                                m[0] = p._to.call(this, m[0], "y");
                                m[1] = p._to.call(this, m[1], "x");
                                k.moveDragger && (m[0] *= e.scrollRatio.y, m[1] *= e.scrollRatio.x);
                                k.dur = B;
                                setTimeout(function () {
                                    null !== m[0] && "undefined" !== typeof m[0] && "x" !== f.axis && e.overflowed[0] && (k.dir = "y", k.overwrite = "all", p._scrollTo.call(this, d, m[0].toString(), k));
                                    null !== m[1] && "undefined" !== typeof m[1] && "y" !== f.axis && e.overflowed[1] && (k.dir = "x", k.overwrite = "none", p._scrollTo.call(this, d, m[1].toString(), k))
                                }, 60)
                            }
                        })
                    }
                },
                stop: function () {
                    var b = p._selector.call(this);
                    return a(b).each(function () {
                        var b =
                            a(this);
                        b.data("mCS") && p._stop.call(null, b)
                    })
                },
                disable: function (b) {
                    var c = p._selector.call(this);
                    return a(c).each(function () {
                        var c = a(this);
                        c.data("mCS") && (c.data("mCS"), p._autoUpdate.call(this, "remove"), p._unbindEvents.call(this), b && p._resetContentPosition.call(this), p._scrollbarVisibility.call(this, !0), c.addClass("mCS_disabled"))
                    })
                },
                destroy: function () {
                    var b = p._selector.call(this);
                    return a(b).each(function () {
                        var c = a(this);
                        if (c.data("mCS")) {
                            var d = c.data("mCS"),
                                e = d.opt,
                                f = a("#mCSB_" + d.idx),
                                k = a("#mCSB_" +
                                    d.idx + "_container"),
                                L = a(".mCSB_" + d.idx + "_scrollbar");
                            e.live && m(b);
                            p._autoUpdate.call(this, "remove");
                            p._unbindEvents.call(this);
                            p._resetContentPosition.call(this);
                            c.removeData("mCS");
                            p._delete.call(null, this.mcs);
                            L.remove();
                            f.replaceWith(k.contents());
                            c.removeClass("mCustomScrollbar _mCS_" + d.idx + " mCS-autoHide mCS-dir-rtl mCS_no_scrollbar mCS_disabled").addClass("mCS_destroyed")
                        }
                    })
                }
            },
            p = {
                _selector: function () {
                    return "object" !== typeof a(this) || 1 > a(this).length ? ".mCustomScrollbar" : this
                },
                _theme: function (b) {
                    b.autoDraggerLength = -1 < a.inArray(b.theme, ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"]) ? !1 : b.autoDraggerLength;
                    b.autoExpandScrollbar = -1 < a.inArray(b.theme, "rounded-dots rounded-dots-dark 3d 3d-dark 3d-thick 3d-thick-dark inset inset-dark inset-2 inset-2-dark inset-3 inset-3-dark".split(" ")) ? !1 : b.autoExpandScrollbar;
                    b.scrollButtons.enable = -1 < a.inArray(b.theme, ["minimal", "minimal-dark"]) ? !1 : b.scrollButtons.enable;
                    b.autoHideScrollbar = -1 < a.inArray(b.theme, ["minimal", "minimal-dark"]) ? !0 : b.autoHideScrollbar;
                    b.scrollbarPosition = -1 < a.inArray(b.theme, ["minimal", "minimal-dark"]) ? "outside" : b.scrollbarPosition
                },
                _findAxis: function (a) {
                    return "yx" === a || "xy" === a || "auto" === a ? "yx" : "x" === a || "horizontal" === a ? "x" : "y"
                },
                _findScrollButtonsType: function (a) {
                    return "stepped" === a || "pixels" === a || "step" === a || "click" === a ? "stepped" : "stepless"
                },
                _pluginMarkup: function () {
                    var b = a(this),
                        c = b.data("mCS"),
                        d = c.opt,
                        e = d.autoExpandScrollbar ? " mCSB_scrollTools_onDrag_expand" : "",
                        e = ["<div id='mCSB_" + c.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" +
                            c.idx + "_scrollbar mCS-" + d.theme + " mCSB_scrollTools_vertical" + e + "'><div class='mCSB_draggerContainer'><div id='mCSB_" + c.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + c.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + c.idx + "_scrollbar mCS-" + d.theme + " mCSB_scrollTools_horizontal" + e + "'><div class='mCSB_draggerContainer'><div id='mCSB_" +
                            c.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"
                        ],
                        f = "yx" === d.axis ? "mCSB_vertical_horizontal" : "x" === d.axis ? "mCSB_horizontal" : "mCSB_vertical",
                        e = "yx" === d.axis ? e[0] + e[1] : "x" === d.axis ? e[1] : e[0],
                        k = "yx" === d.axis ? "<div id='mCSB_" + c.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
                        m = d.autoHideScrollbar ? " mCS-autoHide" : "",
                        s = "x" !== d.axis && "rtl" === c.langDir ?
                        " mCS-dir-rtl" : "";
                    d.setWidth && b.css("width", d.setWidth);
                    d.setHeight && b.css("height", d.setHeight);
                    d.setLeft = "y" !== d.axis && "rtl" === c.langDir ? "989999px" : d.setLeft;
                    b.addClass("mCustomScrollbar _mCS_" + c.idx + m + s).wrapInner("<div id='mCSB_" + c.idx + "' class='mCustomScrollBox mCS-" + d.theme + " " + f + "'><div id='mCSB_" + c.idx + "_container' class='mCSB_container' style='position:relative; top:" + d.setTop + "; left:" + d.setLeft + ";' dir=" + c.langDir + " /></div>");
                    f = a("#mCSB_" + c.idx);
                    m = a("#mCSB_" + c.idx + "_container");
                    "y" ===
                    d.axis || d.advanced.autoExpandHorizontalScroll || m.css("width", p._contentWidth(m.children()));
                    "outside" === d.scrollbarPosition ? ("static" === b.css("position") && b.css("position", "relative"), b.css("overflow", "visible"), f.addClass("mCSB_outside").after(e)) : (f.addClass("mCSB_inside").append(e), m.wrap(k));
                    p._scrollButtons.call(this);
                    b = [a("#mCSB_" + c.idx + "_dragger_vertical"), a("#mCSB_" + c.idx + "_dragger_horizontal")];
                    b[0].css("min-height", b[0].height());
                    b[1].css("min-width", b[1].width())
                },
                _contentWidth: function (b) {
                    return Math.max.apply(Math,
                        b.map(function () {
                            return a(this).outerWidth(!0)
                        }).get())
                },
                _expandContentHorizontally: function () {
                    var b = a(this).data("mCS"),
                        c = b.opt,
                        b = a("#mCSB_" + b.idx + "_container");
                    c.advanced.autoExpandHorizontalScroll && "y" !== c.axis && b.css({
                        position: "absolute",
                        width: "auto"
                    }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                        width: Math.ceil(b[0].getBoundingClientRect().right + 0.4) - Math.floor(b[0].getBoundingClientRect().left),
                        position: "relative"
                    }).unwrap()
                },
                _scrollButtons: function () {
                    var b =
                        a(this).data("mCS"),
                        c = b.opt,
                        b = a(".mCSB_" + b.idx + "_scrollbar:first"),
                        d = ["<a href='#' class='mCSB_buttonUp' oncontextmenu='return false;' />", "<a href='#' class='mCSB_buttonDown' oncontextmenu='return false;' />", "<a href='#' class='mCSB_buttonLeft' oncontextmenu='return false;' />", "<a href='#' class='mCSB_buttonRight' oncontextmenu='return false;' />"],
                        d = ["x" === c.axis ? d[2] : d[0], "x" === c.axis ? d[3] : d[1], d[2], d[3]];
                    c.scrollButtons.enable && b.prepend(d[0]).append(d[1]).next(".mCSB_scrollTools").prepend(d[2]).append(d[3])
                },
                _maxHeight: function () {
                    var b = a(this),
                        c = b.data("mCS"),
                        c = a("#mCSB_" + c.idx),
                        d = b.css("max-height"),
                        e = -1 !== d.indexOf("%"),
                        f = b.css("box-sizing");
                    "none" !== d && (d = e ? b.parent().height() * parseInt(d) / 100 : parseInt(d), "border-box" === f && (d -= b.innerHeight() - b.height() + (b.outerHeight() - b.innerHeight())), c.css("max-height", Math.round(d)))
                },
                _setDraggerLength: function () {
                    var b = a(this).data("mCS"),
                        c = a("#mCSB_" + b.idx),
                        d = a("#mCSB_" + b.idx + "_container"),
                        b = [a("#mCSB_" + b.idx + "_dragger_vertical"), a("#mCSB_" + b.idx + "_dragger_horizontal")],
                        c = [c.height() / d.outerHeight(!1), c.width() / d.outerWidth(!1)],
                        c = [parseInt(b[0].css("min-height")), Math.round(c[0] * b[0].parent().height()), parseInt(b[1].css("min-width")), Math.round(c[1] * b[1].parent().width())],
                        d = s && c[3] < c[2] ? c[2] : c[3];
                    b[0].css({
                        height: s && c[1] < c[0] ? c[0] : c[1],
                        "max-height": b[0].parent().height() - 10
                    }).find(".mCSB_dragger_bar").css({
                        "line-height": c[0] + "px"
                    });
                    b[1].css({
                        width: d,
                        "max-width": b[1].parent().width() - 10
                    })
                },
                _scrollRatio: function () {
                    var b = a(this).data("mCS"),
                        c = a("#mCSB_" + b.idx),
                        d =
                        a("#mCSB_" + b.idx + "_container"),
                        e = [a("#mCSB_" + b.idx + "_dragger_vertical"), a("#mCSB_" + b.idx + "_dragger_horizontal")],
                        c = [d.outerHeight(!1) - c.height(), d.outerWidth(!1) - c.width()],
                        e = [c[0] / (e[0].parent().height() - e[0].height()), c[1] / (e[1].parent().width() - e[1].width())];
                    b.scrollRatio = {
                        y: e[0],
                        x: e[1]
                    }
                },
                _onDragClasses: function (a, b, c) {
                    c = c ? "mCSB_dragger_onDrag_expanded" : "";
                    var d = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag"],
                        e = a.closest(".mCSB_scrollTools");
                    "active" === b ? (a.toggleClass(d[0] + " " + c), e.toggleClass(d[1]),
                        a[0]._draggable = a[0]._draggable ? 0 : 1) : a[0]._draggable || ("hide" === b ? (a.removeClass(d[0]), e.removeClass(d[1])) : (a.addClass(d[0]), e.addClass(d[1])))
                },
                _overflowed: function () {
                    var b = a(this).data("mCS"),
                        c = a("#mCSB_" + b.idx),
                        d = a("#mCSB_" + b.idx + "_container"),
                        e = null == b.overflowed ? d.height() : d.outerHeight(!1),
                        b = null == b.overflowed ? d.width() : d.outerWidth(!1);
                    return [e > c.height(), b > c.width()]
                },
                _resetContentPosition: function () {
                    var b = a(this),
                        c = b.data("mCS"),
                        d = c.opt,
                        e = a("#mCSB_" + c.idx),
                        f = a("#mCSB_" + c.idx + "_container"),
                        k = [a("#mCSB_" + c.idx + "_dragger_vertical"), a("#mCSB_" + c.idx + "_dragger_horizontal")];
                    p._stop(b);
                    ("x" !== d.axis && !c.overflowed[0] || "y" === d.axis && c.overflowed[0]) && k[0].add(f).css("top", 0);
                    if ("y" !== d.axis && !c.overflowed[1] || "x" === d.axis && c.overflowed[1]) b = dx = 0, "rtl" === c.langDir && (b = e.width() - f.outerWidth(!1), dx = Math.abs(b / c.scrollRatio.x)), f.css("left", b), k[1].css("left", dx)
                },
                _bindEvents: function () {
                    var b = a(this),
                        c = b.data("mCS"),
                        d = c.opt;
                    if (!c.bindEvents) {
                        p._draggable.call(this);
                        d.contentTouchScroll && p._contentDraggable.call(this);
                        if (d.mouseWheel.enable) {
                            var e = function () {
                                f = setTimeout(function () {
                                    a.event.special.mousewheel ? (clearTimeout(f), p._mousewheel.call(b[0])) : e()
                                }, 1E3)
                            },
                                f;
                            e()
                        }
                        p._draggerRail.call(this);
                        p._wrapperScroll.call(this);
                       // d.advanced.autoScrollOnFocus && p._focus.call(this);
                        d.scrollButtons.enable && p._buttons.call(this);
                        //d.keyboard.enable && p._keyboard.call(this);
                        c.bindEvents = !0
                    }
                },
                _unbindEvents: function () {
                    var b = a(this),
                        d = b.data("mCS"),
                        e = "mCS_" + d.idx,
                        h = ".mCSB_" + d.idx + "_scrollbar",
                        h = a("#mCSB_" + d.idx + ",#mCSB_" + d.idx + "_container,#mCSB_" +
                            d.idx + "_container_wrapper," + h + " .mCSB_draggerContainer,#mCSB_" + d.idx + "_dragger_vertical,#mCSB_" + d.idx + "_dragger_horizontal," + h + ">a"),
                        f = a("#mCSB_" + d.idx + "_container");
                    d.bindEvents && (a(c).unbind("." + e), h.each(function () {
                        a(this).unbind("." + e)
                    }), clearTimeout(b[0]._focusTimeout), p._delete.call(null, b[0]._focusTimeout), clearTimeout(d.sequential.step), p._delete.call(null, d.sequential.step), clearTimeout(f[0].onCompleteTimeout), p._delete.call(null, f[0].onCompleteTimeout), d.bindEvents = !1)
                },
                _scrollbarVisibility: function (b) {
                    var c =
                        a(this),
                        d = c.data("mCS"),
                        e = d.opt,
                        f = a("#mCSB_" + d.idx + "_container_wrapper"),
                        f = f.length ? f : a("#mCSB_" + d.idx + "_container"),
                        k = [a("#mCSB_" + d.idx + "_scrollbar_vertical"), a("#mCSB_" + d.idx + "_scrollbar_horizontal")],
                        m = [k[0].find(".mCSB_dragger"), k[1].find(".mCSB_dragger")];
                    "x" !== e.axis && (d.overflowed[0] && !b ? (k[0].add(m[0]).add(k[0].children("a")).css("display", "block"), f.removeClass("mCS_no_scrollbar_y mCS_y_hidden")) : (e.alwaysShowScrollbar ? (2 !== e.alwaysShowScrollbar && m[0].add(k[0].children("a")).css("display",
                        "none"), f.removeClass("mCS_y_hidden")) : (k[0].css("display", "none"), f.addClass("mCS_y_hidden")), f.addClass("mCS_no_scrollbar_y")));
                    "y" !== e.axis && (d.overflowed[1] && !b ? (k[1].add(m[1]).add(k[1].children("a")).css("display", "block"), f.removeClass("mCS_no_scrollbar_x mCS_x_hidden")) : (e.alwaysShowScrollbar ? (2 !== e.alwaysShowScrollbar && m[1].add(k[1].children("a")).css("display", "none"), f.removeClass("mCS_x_hidden")) : (k[1].css("display", "none"), f.addClass("mCS_x_hidden")), f.addClass("mCS_no_scrollbar_x")));
                    d.overflowed[0] || d.overflowed[1] ? c.removeClass("mCS_no_scrollbar") : c.addClass("mCS_no_scrollbar")
                },
                _coordinates: function (a) {
                    switch (a.type) {
                        case "pointerdown":
                        case "MSPointerDown":
                        case "pointermove":
                        case "MSPointerMove":
                        case "pointerup":
                        case "MSPointerUp":
                            return [a.originalEvent.pageY, a.originalEvent.pageX];
                        case "touchstart":
                        case "touchmove":
                        case "touchend":
                            return a = a.originalEvent.touches[0] || a.originalEvent.changedTouches[0], [a.pageY, a.pageX];
                        default:
                            return [a.pageY, a.pageX]
                    }
                },
                _draggable: function () {
                    function b(a) {
                        var c =
                            N.find("iframe");
                        c.length && c.css("pointer-events", a ? "auto" : "none")
                    }

                    function d(a, b, c, k) {
                        N[0].idleTimer = 233 > f.scrollInertia ? 250 : 0;
                        if (y.attr("id") === m[1]) {
                            var r = "x";
                            a = (y[0].offsetLeft - b + k) * h.scrollRatio.x
                        } else r = "y", a = (y[0].offsetTop - a + c) * h.scrollRatio.y;
                        p._scrollTo(e, a.toString(), {
                            dir: r,
                            drag: !0
                        })
                    }
                    var e = a(this),
                        h = e.data("mCS"),
                        f = h.opt,
                        k = "mCS_" + h.idx,
                        m = ["mCSB_" + h.idx + "_dragger_vertical", "mCSB_" + h.idx + "_dragger_horizontal"],
                        N = a("#mCSB_" + h.idx + "_container"),
                        A = a("#" + m[0] + ",#" + m[1]),
                        y, r, J;
                    A.bind("mousedown." +
                        k + " touchstart." + k + " pointerdown." + k + " MSPointerDown." + k,
                        function (d) {
                            d.stopImmediatePropagation();
                            d.preventDefault();
                            if (p._mouseBtnLeft(d)) {
                                u = !0;
                                s && (c.onselectstart = function () {
                                    return !1
                                });
                                b(!1);
                                p._stop(e);
                                y = a(this);
                                var h = y.offset(),
                                    k = p._coordinates(d)[0] - h.top;
                                d = p._coordinates(d)[1] - h.left;
                                var v = y.height() + h.top,
                                    h = y.width() + h.left;
                                k < v && 0 < k && d < h && 0 < d && (r = k, J = d);
                                p._onDragClasses(y, "active", f.autoExpandScrollbar)
                            }
                        }).bind("touchmove." + k, function (a) {
                            a.stopImmediatePropagation();
                            a.preventDefault();
                            var b =
                                y.offset(),
                                c = p._coordinates(a)[0] - b.top;
                            a = p._coordinates(a)[1] - b.left;
                            d(r, J, c, a)
                        });
                    a(c).bind("mousemove." + k + " pointermove." + k + " MSPointerMove." + k, function (a) {
                        if (y) {
                            var b = y.offset(),
                                c = p._coordinates(a)[0] - b.top;
                            a = p._coordinates(a)[1] - b.left;
                            r !== c && d(r, J, c, a)
                        }
                    }).add(A).bind("mouseup." + k + " touchend." + k + " pointerup." + k + " MSPointerUp." + k, function (a) {
                        y && (p._onDragClasses(y, "active", f.autoExpandScrollbar), y = null);
                        u = !1;
                        s && (c.onselectstart = null);
                        b(!0)
                    })
                },
                _contentDraggable: function () {
                    function b(a, c) {
                        var d = [1.5 * c, 2 * c, c / 1.5, c / 2];
                        return 90 < a ? 4 < c ? d[0] : d[3] : 60 < a ? 3 < c ? d[3] : d[2] : 30 < a ? 8 < c ? d[1] : 6 < c ? d[0] : 4 < c ? c : d[2] : 8 < c ? c : d[3]
                    }

                    function c(a, b, e, h, f, n) {
                        a && p._scrollTo(d, a.toString(), {
                            dur: b,
                            scrollEasing: e,
                            dir: h,
                            overwrite: f,
                            drag: n
                        })
                    }
                    var d = a(this),
                        e = d.data("mCS"),
                        f = e.opt,
                        k = "mCS_" + e.idx,
                        m = a("#mCSB_" + e.idx),
                        s = a("#mCSB_" + e.idx + "_container"),
                        A = [a("#mCSB_" + e.idx + "_dragger_vertical"), a("#mCSB_" + e.idx + "_dragger_horizontal")],
                        y, r, J, D, P = [],
                        x = [],
                        w, z, H, K, O, I, S, da = "yx" === f.axis ? "none" : "all";
                    s.bind("touchstart." + k + " pointerdown." +
                        k + " MSPointerDown." + k,
                        function (a) {
                            if (p._pointerTouch(a) && !u) {
                                var b = s.offset();
                                y = p._coordinates(a)[0] - b.top;
                                r = p._coordinates(a)[1] - b.left
                            }
                        }).bind("touchmove." + k + " pointermove." + k + " MSPointerMove." + k, function (a) {
                            if (p._pointerTouch(a) && !u) {
                                a.stopImmediatePropagation();
                                z = p._getTime();
                                var b = m.offset(),
                                    d = p._coordinates(a)[0] - b.top,
                                    b = p._coordinates(a)[1] - b.left;
                                P.push(d);
                                x.push(b);
                                if (e.overflowed[0]) var k = A[0].parent().height() - A[0].height(),
                                    k = 0 < y - d && d - y > -(k * e.scrollRatio.y);
                                if (e.overflowed[1]) var q = A[1].parent().width() -
                                    A[1].width(),
                                    q = 0 < r - b && b - r > -(q * e.scrollRatio.x);
                                (k || q) && a.preventDefault();
                                I = "yx" === f.axis ? [y - d, r - b] : "x" === f.axis ? [null, r - b] : [y - d, null];
                                s[0].idleTimer = 250;
                                e.overflowed[0] && c(I[0], 0, "mcsLinearOut", "y", "all", !0);
                                e.overflowed[1] && c(I[1], 0, "mcsLinearOut", "x", da, !0)
                            }
                        });
                    m.bind("touchstart." + k + " pointerdown." + k + " MSPointerDown." + k, function (a) {
                        if (p._pointerTouch(a) && !u) {
                            a.stopImmediatePropagation();
                            p._stop(d);
                            w = p._getTime();
                            var b = m.offset();
                            J = p._coordinates(a)[0] - b.top;
                            D = p._coordinates(a)[1] - b.left;
                            P = [];
                            x = []
                        }
                    }).bind("touchend." + k + " pointerup." + k + " MSPointerUp." + k, function (a) {
                        if (p._pointerTouch(a) && !u) {
                            a.stopImmediatePropagation();
                            H = p._getTime();
                            var d = m.offset(),
                                k = p._coordinates(a)[0] - d.top,
                                d = p._coordinates(a)[1] - d.left;
                            if (!(30 < H - z)) {
                                O = 1E3 / (H - w);
                                var r = (a = 2.5 > O) ? [P[P.length - 2], x[x.length - 2]] : [0, 0];
                                K = a ? [k - r[0], d - r[1]] : [k - J, d - D];
                                k = [Math.abs(K[0]), Math.abs(K[1])];
                                O = a ? [Math.abs(K[0] / 4), Math.abs(K[1] / 4)] : [O, O];
                                a = [Math.abs(s[0].offsetTop) - K[0] * b(k[0] / O[0], O[0]), Math.abs(s[0].offsetLeft) - K[1] * b(k[1] / O[1], O[1])];
                                I = "yx" === f.axis ? [a[0], a[1]] : "x" === f.axis ? [null, a[1]] : [a[0], null];
                                S = [4 * k[0] + f.scrollInertia, 4 * k[1] + f.scrollInertia];
                                a = parseInt(f.contentTouchScroll) || 0;
                                I[0] = k[0] > a ? I[0] : 0;
                                I[1] = k[1] > a ? I[1] : 0;
                                e.overflowed[0] && c(I[0], S[0], "mcsEaseOut", "y", da, !1);
                                e.overflowed[1] && c(I[1], S[1], "mcsEaseOut", "x", da, !1)
                            }
                        }
                    })
                },
                _mousewheel: function () {
                    var b = a(this),
                        c = b.data("mCS");
                    if (c) {
                        var d = c.opt,
                            e = "mCS_" + c.idx,
                            f = a("#mCSB_" + c.idx),
                            k = [a("#mCSB_" + c.idx + "_dragger_vertical"), a("#mCSB_" + c.idx + "_dragger_horizontal")];
                        f.bind("mousewheel." +
                            e,
                            function (e, h) {
                                p._stop(b);
                                if (!p._disableMousewheel(b, e.target)) {
                                    var m = "auto" !== d.mouseWheel.deltaFactor ? parseInt(d.mouseWheel.deltaFactor) : s && 100 > e.deltaFactor ? 100 : 40 > e.deltaFactor ? 40 : e.deltaFactor || 100;
                                    if ("x" === d.axis || "x" === d.mouseWheel.axis) var y = "x",
                                        m = [Math.round(m * c.scrollRatio.x), parseInt(d.mouseWheel.scrollAmount)],
                                        m = "auto" !== d.mouseWheel.scrollAmount ? m[1] : m[0] >= f.width() ? 0.9 * f.width() : m[0],
                                        r = Math.abs(a("#mCSB_" + c.idx + "_container")[0].offsetLeft),
                                        J = k[1][0].offsetLeft,
                                        D = k[1].parent().width() -
                                        k[1].width(),
                                        u = e.deltaX || e.deltaY || h;
                                    else y = "y", m = [Math.round(m * c.scrollRatio.y), parseInt(d.mouseWheel.scrollAmount)], m = "auto" !== d.mouseWheel.scrollAmount ? m[1] : m[0] >= f.height() ? 0.9 * f.height() : m[0], r = Math.abs(a("#mCSB_" + c.idx + "_container")[0].offsetTop), J = k[0][0].offsetTop, D = k[0].parent().height() - k[0].height(), u = e.deltaY || h;
                                    if (("y" !== y || c.overflowed[0]) && ("x" !== y || c.overflowed[1])) {
                                        d.mouseWheel.invert && (u = -u);
                                        d.mouseWheel.normalizeDelta && (u = 0 > u ? -1 : 1);
                                        if (0 < u && 0 !== J || 0 > u && J !== D || d.mouseWheel.preventDefault) e.stopImmediatePropagation(),
                                            e.preventDefault();
                                        p._scrollTo(b, (r - u * m).toString(), {
                                            dir: y
                                        })
                                    }
                                }
                            })
                    }
                },
                _disableMousewheel: function (b, c) {
                    var d = c.nodeName.toLowerCase(),
                        e = b.data("mCS").opt.mouseWheel.disableOver,
                        f = ["select", "textarea"];
                    return -1 < a.inArray(d, e) && !(-1 < a.inArray(d, f) && !a(c).is(":focus"))
                },
                _draggerRail: function () {
                    var b = a(this),
                        c = b.data("mCS"),
                        d = "mCS_" + c.idx,
                        e = a("#mCSB_" + c.idx + "_container"),
                        f = e.parent();
                    a(".mCSB_" + c.idx + "_scrollbar .mCSB_draggerContainer").bind("touchstart." + d + " pointerdown." + d + " MSPointerDown." + d, function (a) {
                        u = !0
                    }).bind("touchend." + d + " pointerup." + d + " MSPointerUp." + d, function (a) {
                        u = !1
                    }).bind("click." + d, function (d) {
                        if (a(d.target).hasClass("mCSB_draggerContainer") || a(d.target).hasClass("mCSB_draggerRail")) {
                            p._stop(b);
                            var k = a(this),
                                m = k.find(".mCSB_dragger");
                            if (0 < k.parent(".mCSB_scrollTools_horizontal").length) {
                                if (!c.overflowed[1]) return;
                                k = "x";
                                d = d.pageX > m.offset().left ? -1 : 1;
                                d = Math.abs(e[0].offsetLeft) - 0.9 * d * f.width()
                            } else {
                                if (!c.overflowed[0]) return;
                                k = "y";
                                d = d.pageY > m.offset().top ? -1 : 1;
                                d = Math.abs(e[0].offsetTop) -
                                    0.9 * d * f.height()
                            }
                            p._scrollTo(b, d.toString(), {
                                dir: k,
                                scrollEasing: "mcsEaseInOut"
                            })
                        }
                    })
                },
                //_focus: function () {
                //    var b = a(this),
                //        d = b.data("mCS"),
                //        e = d.opt,
                //        h = "mCS_" + d.idx,
                //        f = a("#mCSB_" + d.idx + "_container"),
                //        k = f.parent();
                //    f.bind("focusin." + h, function (d) {
                //        var h = a(c.activeElement);
                //        d = f.find(".mCustomScrollBox").length;
                //        h.is(e.advanced.autoScrollOnFocus) && (p._stop(b), clearTimeout(b[0]._focusTimeout), b[0]._focusTimer = d ? 17 * d : 0, b[0]._focusTimeout = setTimeout(function () {
                //            var a = [h.offset().top - f.offset().top, h.offset().left - f.offset().left],
                //                c = [f[0].offsetTop, f[0].offsetLeft],
                //                c = [0 <= c[0] + a[0] && c[0] + a[0] < k.height() - h.outerHeight(!1), 0 <= c[1] + a[1] && c[0] + a[1] < k.width() - h.outerWidth(!1)],
                //                d = "yx" !== e.axis || c[0] || c[1] ? "all" : "none";
                //            "x" === e.axis || c[0] || p._scrollTo(b, a[0].toString(), {
                //                dir: "y",
                //                scrollEasing: "mcsEaseInOut",
                //                overwrite: d,
                //                dur: 0
                //            });
                //            "y" === e.axis || c[1] || p._scrollTo(b, a[1].toString(), {
                //                dir: "x",
                //                scrollEasing: "mcsEaseInOut",
                //                overwrite: d,
                //                dur: 0
                //            })
                //        }, b[0]._focusTimer))
                //    })
                //},
                _wrapperScroll: function () {
                    var b = a(this).data("mCS"),
                        c = "mCS_" + b.idx,
                        d = a("#mCSB_" +
                            b.idx + "_container").parent();
                    d.bind("scroll." + c, function (a) {
                        d.scrollTop(0).scrollLeft(0)
                    })
                },
                _buttons: function () {
                    var b = a(this),
                        c = b.data("mCS"),
                        d = c.opt,
                        e = c.sequential,
                        f = "mCS_" + c.idx;
                    a("#mCSB_" + c.idx + "_container");
                    a(".mCSB_" + c.idx + "_scrollbar>a").bind("mousedown." + f + " touchstart." + f + " pointerdown." + f + " MSPointerDown." + f + " mouseup." + f + " touchend." + f + " pointerup." + f + " MSPointerUp." + f + " mouseout." + f + " pointerout." + f + " MSPointerOut." + f + " click." + f, function (f) {
                        function n(a, c) {
                            e.scrollAmount = d.snapAmount ||
                                d.scrollButtons.scrollAmount;
                            p._sequentialScroll.call(this, b, a, c)
                        }
                        f.preventDefault();
                        if (p._mouseBtnLeft(f)) {
                            var k = a(this).attr("class");
                            e.type = d.scrollButtons.scrollType;
                            switch (f.type) {
                                case "mousedown":
                                case "touchstart":
                                case "pointerdown":
                                case "MSPointerDown":
                                    if ("stepped" === e.type) break;
                                    u = !0;
                                    c.tweenRunning = !1;
                                    n("on", k);
                                    break;
                                case "mouseup":
                                case "touchend":
                                case "pointerup":
                                case "MSPointerUp":
                                case "mouseout":
                                case "pointerout":
                                case "MSPointerOut":
                                    if ("stepped" === e.type) break;
                                    u = !1;
                                    e.dir && n("off", k);
                                    break;
                                case "click":
                                    if ("stepped" !== e.type || c.tweenRunning) break;
                                    n("on", k)
                            }
                        }
                    })
                },
                _keyboard: function () {
                    var b = a(this),
                        d = b.data("mCS"),
                        e = d.opt,
                        h = d.sequential,
                        f = "mCS_" + d.idx,
                        k = a("#mCSB_" + d.idx),
                        m = a("#mCSB_" + d.idx + "_container"),
                        s = m.parent();
                    k.attr("tabindex", "0").bind("blur." + f + " keydown." + f + " keyup." + f, function (f) {
                        function n(a, c) {
                            h.type = e.keyboard.scrollType;
                            h.scrollAmount = e.snapAmount || e.keyboard.scrollAmount;
                            "stepped" === h.type && d.tweenRunning || p._sequentialScroll.call(this, b, a, c)
                        }
                        switch (f.type) {
                            case "blur":
                                d.tweenRunning &&
                                    h.dir && n("off", null);
                                break;
                            case "keydown":
                            case "keyup":
                                var k = f.keyCode ? f.keyCode : f.which,
                                    v = "on";
                                if ("x" !== e.axis && (38 === k || 40 === k) || "y" !== e.axis && (37 === k || 39 === k)) {
                                    if ((38 === k || 40 === k) && !d.overflowed[0] || (37 === k || 39 === k) && !d.overflowed[1]) break;
                                    "keyup" === f.type && (v = "off");
                                    a(c.activeElement).is("input,textarea,select,datalist,keygen,[contenteditable='true']") || (f.preventDefault(), f.stopImmediatePropagation(), n(v, k))
                                } else if (33 === k || 34 === k) {
                                    if (d.overflowed[0] || d.overflowed[1]) f.preventDefault(), f.stopImmediatePropagation();
                                    "keyup" === f.type && (p._stop(b), k = 34 === k ? -1 : 1, "x" === e.axis || "yx" === e.axis && d.overflowed[1] && !d.overflowed[0] ? (f = "x", k = Math.abs(m[0].offsetLeft) - 0.9 * k * s.width()) : (f = "y", k = Math.abs(m[0].offsetTop) - 0.9 * k * s.height()), p._scrollTo(b, k.toString(), {
                                        dir: f,
                                        scrollEasing: "mcsEaseInOut"
                                    }))
                                } else if ((35 === k || 36 === k) && !a(c.activeElement).is("input,textarea,select,datalist,keygen,[contenteditable='true']")) {
                                    if (d.overflowed[0] || d.overflowed[1]) f.preventDefault(), f.stopImmediatePropagation();
                                    "keyup" === f.type && ("x" ===
                                        e.axis || "yx" === e.axis && d.overflowed[1] && !d.overflowed[0] ? (f = "x", k = 35 === k ? Math.abs(s.width() - m.outerWidth(!1)) : 0) : (f = "y", k = 35 === k ? Math.abs(s.height() - m.outerHeight(!1)) : 0), p._scrollTo(b, k.toString(), {
                                            dir: f,
                                            scrollEasing: "mcsEaseInOut"
                                        }))
                                }
                        }
                    })
                },
                _sequentialScroll: function (b, c, d) {
                    function e(a) {
                        var c = "stepped" !== m.type,
                            d = a ? c ? k.scrollInertia / 1.5 : k.scrollInertia : 1E3 / 60,
                            t = a ? c ? 7.5 : 40 : 2.5,
                            u = [Math.abs(s[0].offsetTop), Math.abs(s[0].offsetLeft)],
                            B = [10 < f.scrollRatio.y ? 10 : f.scrollRatio.y, 10 < f.scrollRatio.x ? 10 : f.scrollRatio.x],
                            t = "x" === m.dir[0] ? u[1] + m.dir[1] * B[1] * t : u[0] + m.dir[1] * B[0] * t,
                            B = "x" === m.dir[0] ? u[1] + m.dir[1] * parseInt(m.scrollAmount) : u[0] + m.dir[1] * parseInt(m.scrollAmount),
                            t = "auto" !== m.scrollAmount ? B : t;
                        a && 17 > d && (t = "x" === m.dir[0] ? u[1] : u[0]);
                        p._scrollTo(b, t.toString(), {
                            dir: m.dir[0],
                            scrollEasing: a ? c ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear",
                            dur: d,
                            onComplete: a ? !0 : !1
                        });
                        a ? m.dir = !1 : (clearTimeout(m.step), m.step = setTimeout(function () {
                            e()
                        }, d))
                    }
                    var f = b.data("mCS"),
                        k = f.opt,
                        m = f.sequential,
                        s = a("#mCSB_" + f.idx + "_container"),
                        u = "stepped" ===
                        m.type ? !0 : !1;
                    switch (c) {
                        case "on":
                            m.dir = ["mCSB_buttonRight" === d || "mCSB_buttonLeft" === d || 39 === d || 37 === d ? "x" : "y", "mCSB_buttonUp" === d || "mCSB_buttonLeft" === d || 38 === d || 37 === d ? -1 : 1];
                            p._stop(b);
                            if (p._isNumeric(d) && "stepped" === m.type) break;
                            e(u);
                            break;
                        case "off":
                            clearTimeout(m.step), p._stop(b), (u || f.tweenRunning && m.dir) && e(!0)
                    }
                },
                _arr: function (b) {
                    var c = a(this).data("mCS").opt,
                        d = [];
                    "function" === typeof b && (b = b());
                    b instanceof Array ? d = 1 < b.length ? [b[0], b[1]] : "x" === c.axis ? [null, b[0]] : [b[0], null] : (d[0] = b.y ? b.y : b.x ||
                        "x" === c.axis ? null : b, d[1] = b.x ? b.x : b.y || "y" === c.axis ? null : b);
                    "function" === typeof d[0] && (d[0] = d[0]());
                    "function" === typeof d[1] && (d[1] = d[1]());
                    return d
                },
                _to: function (b, c) {
                    if (null != b && "undefined" != typeof b) {
                        var d = a(this),
                            e = d.data("mCS"),
                            f = e.opt,
                            e = a("#mCSB_" + e.idx + "_container"),
                            k = e.parent(),
                            m = typeof b;
                        c || (c = "x" === f.axis ? "x" : "y");
                        var s = "x" === c ? e.outerWidth(!1) : e.outerHeight(!1),
                            f = "x" === c ? e.offset().left : e.offset().top,
                            u = "x" === c ? e[0].offsetLeft : e[0].offsetTop,
                            y = "x" === c ? "left" : "top";
                        switch (m) {
                            case "function":
                                return b();
                            case "object":
                                if (b.nodeType) var r = "x" === c ? a(b).offset().left : a(b).offset().top;
                                else if (b.jquery) {
                                    if (!b.length) break;
                                    r = "x" === c ? b.offset().left : b.offset().top
                                }
                                return r - f;
                            case "string":
                            case "number":
                                if (p._isNumeric.call(null, b)) return Math.abs(b);
                                if (-1 !== b.indexOf("%")) return Math.abs(s * parseInt(b) / 100);
                                if (-1 !== b.indexOf("-=")) return Math.abs(u - parseInt(b.split("-=")[1]));
                                if (-1 !== b.indexOf("+=")) return d = u + parseInt(b.split("+=")[1]), 0 <= d ? 0 : Math.abs(d);
                                if (-1 !== b.indexOf("px") && p._isNumeric.call(null,
                                        b.split("px")[0])) return Math.abs(b.split("px")[0]);
                                if ("top" === b || "left" === b) return 0;
                                if ("bottom" === b) return Math.abs(k.height() - e.outerHeight(!1));
                                if ("right" === b) return Math.abs(k.width() - e.outerWidth(!1));
                                if ("first" === b || "last" === b) return d = e.find(":" + b), r = "x" === c ? a(d).offset().left : a(d).offset().top, r - f;
                                if (a(b).length) return r = "x" === c ? a(b).offset().left : a(b).offset().top, r - f;
                                e.css(y, b);
                                x.update.call(null, d[0])
                        }
                    }
                },
                _autoUpdate: function (b) {
                    function c() {
                        clearTimeout(y[0].autoUpdate);
                        y[0].autoUpdate =
                            setTimeout(function () {
                                if (u.advanced.updateOnSelectorChange && (G = f(), G !== P)) {
                                    k();
                                    P = G;
                                    return
                                }
                                u.advanced.updateOnContentResize && (z = [y.outerHeight(!1), y.outerWidth(!1), r.height(), r.width(), D()[0], D()[1]], z[0] !== w[0] || z[1] !== w[1] || z[2] !== w[2] || z[3] !== w[3] || z[4] !== w[4] || z[5] !== w[5]) && (k(), w = z);
                                u.advanced.updateOnImageLoad && (K = d(), K !== H && (y.find("img").each(function () {
                                    e(this.src)
                                }), H = K));
                                (u.advanced.updateOnSelectorChange || u.advanced.updateOnContentResize || u.advanced.updateOnImageLoad) && c()
                            }, 60)
                    }

                    function d() {
                        var a =
                            0;
                        u.advanced.updateOnImageLoad && (a = y.find("img").length);
                        return a
                    }

                    function e(a) {
                        var b = new Image;
                        b.onload = function (a, b) {
                            return function () {
                                return b.apply(a, arguments)
                            }
                        }(b, function () {
                            this.onload = null;
                            k()
                        });
                        b.src = a
                    }

                    function f() {
                        !0 === u.advanced.updateOnSelectorChange && (u.advanced.updateOnSelectorChange = "*");
                        var b = 0,
                            c = y.find(u.advanced.updateOnSelectorChange);
                        u.advanced.updateOnSelectorChange && 0 < c.length && c.each(function () {
                            b += a(this).height() + a(this).width()
                        });
                        return b
                    }

                    function k() {
                        clearTimeout(y[0].autoUpdate);
                        x.update.call(null, m[0])
                    }
                    var m = a(this),
                        s = m.data("mCS"),
                        u = s.opt,
                        y = a("#mCSB_" + s.idx + "_container");
                    if (b) clearTimeout(y[0].autoUpdate), p._delete.call(null, y[0].autoUpdate);
                    else {
                        var r = y.parent(),
                            J = [a("#mCSB_" + s.idx + "_scrollbar_vertical"), a("#mCSB_" + s.idx + "_scrollbar_horizontal")],
                            D = function () {
                                return [J[0].is(":visible") ? J[0].outerHeight(!0) : 0, J[1].is(":visible") ? J[1].outerWidth(!0) : 0]
                            },
                            P = f(),
                            G, w = [y.outerHeight(!1), y.outerWidth(!1), r.height(), r.width(), D()[0], D()[1]],
                            z, H = d(),
                            K;
                        c()
                    }
                },
                _snapAmount: function (a,
                    b, c) {
                    return Math.round(a / b) * b - c
                },
                _stop: function (b) {
                    b = b.data("mCS");
                    a("#mCSB_" + b.idx + "_container,#mCSB_" + b.idx + "_container_wrapper,#mCSB_" + b.idx + "_dragger_vertical,#mCSB_" + b.idx + "_dragger_horizontal").each(function () {
                        p._stopTween.call(this)
                    })
                },
                _scrollTo: function (b, c, d) {
                    function e(a) {
                        return k && m.callbacks[a] && "function" === typeof m.callbacks[a]
                    }

                    function f() {
                        var a = [y[0].offsetTop, y[0].offsetLeft],
                            c = [D[0].offsetTop, D[0].offsetLeft],
                            e = [y.outerHeight(!1), y.outerWidth(!1)],
                            h = [u.height(), u.width()];
                        b[0].mcs = {
                            content: y,
                            top: a[0],
                            left: a[1],
                            draggerTop: c[0],
                            draggerLeft: c[1],
                            topPct: Math.round(100 * Math.abs(a[0]) / (Math.abs(e[0]) - h[0])),
                            leftPct: Math.round(100 * Math.abs(a[1]) / (Math.abs(e[1]) - h[1])),
                            direction: d.dir
                        }
                    }
                    var k = b.data("mCS"),
                        m = k.opt;
                    d = a.extend({
                        trigger: "internal",
                        dir: "y",
                        scrollEasing: "mcsEaseOut",
                        drag: !1,
                        dur: m.scrollInertia,
                        overwrite: "all",
                        callbacks: !0,
                        onStart: !0,
                        onUpdate: !0,
                        onComplete: !0
                    }, d);
                    var s = [d.dur, d.drag ? 0 : d.dur],
                        u = a("#mCSB_" + k.idx),
                        y = a("#mCSB_" + k.idx + "_container"),
                        r = m.callbacks.onTotalScrollOffset ?
                        p._arr.call(b, m.callbacks.onTotalScrollOffset) : [0, 0],
                        J = m.callbacks.onTotalScrollBackOffset ? p._arr.call(b, m.callbacks.onTotalScrollBackOffset) : [0, 0];
                    k.trigger = d.trigger;
                    m.snapAmount && (c = p._snapAmount(c, m.snapAmount, m.snapOffset));
                    switch (d.dir) {
                        case "x":
                            var D = a("#mCSB_" + k.idx + "_dragger_horizontal"),
                                x = "left",
                                G = y[0].offsetLeft,
                                w = [u.width() - y.outerWidth(!1), D.parent().width() - D.width()],
                                z = [c, c / k.scrollRatio.x],
                                H = r[1],
                                K = J[1],
                                O = 0 < H ? H / k.scrollRatio.x : 0,
                                I = 0 < K ? K / k.scrollRatio.x : 0;
                            break;
                        case "y":
                            D = a("#mCSB_" +
                                k.idx + "_dragger_vertical"), x = "top", G = y[0].offsetTop, w = [u.height() - y.outerHeight(!1), D.parent().height() - D.height()], z = [c, c / k.scrollRatio.y], H = r[0], K = J[0], O = 0 < H ? H / k.scrollRatio.y : 0, I = 0 < K ? K / k.scrollRatio.y : 0
                    }
                    0 > z[1] ? z = [0, 0] : z[1] >= w[1] ? z = [w[0], w[1]] : z[0] = -z[0];
                    clearTimeout(y[0].onCompleteTimeout);
                    if (k.tweenRunning || !(0 === G && 0 <= z[0] || G === w[0] && z[0] <= w[0])) p._tweenTo.call(null, D[0], x, Math.round(z[1]), s[1], d.scrollEasing), p._tweenTo.call(null, y[0], x, Math.round(z[0]), s[0], d.scrollEasing, d.overwrite, {
                        onStart: function () {
                            d.callbacks &&
                                d.onStart && !k.tweenRunning && (e("onScrollStart") && (f(), m.callbacks.onScrollStart.call(b[0])), k.tweenRunning = !0, p._onDragClasses(D), k.cbOffsets = [m.callbacks.alwaysTriggerOffsets || G >= w[0] + H, m.callbacks.alwaysTriggerOffsets || G <= -K])
                        },
                        onUpdate: function () {
                            d.callbacks && d.onUpdate && e("whileScrolling") && (f(), m.callbacks.whileScrolling.call(b[0]))
                        },
                        onComplete: function () {
                            d.callbacks && d.onComplete && ("yx" === m.axis && clearTimeout(y[0].onCompleteTimeout), y[0].onCompleteTimeout = setTimeout(function () {
                                e("onScroll") &&
                                    (f(), m.callbacks.onScroll.call(b[0]));
                                e("onTotalScroll") && z[1] >= w[1] - O && k.cbOffsets[0] && (f(), m.callbacks.onTotalScroll.call(b[0]));
                                e("onTotalScrollBack") && z[1] <= I && k.cbOffsets[1] && (f(), m.callbacks.onTotalScrollBack.call(b[0]));
                                k.tweenRunning = !1;
                                y[0].idleTimer = 0;
                                p._onDragClasses(D, "hide")
                            }, y[0].idleTimer || 0))
                        }
                    })
                },
                _tweenTo: function (a, b, c, e, f, k, m) {
                    function s() {
                        a._mcsstop || (w || r.call(), w = p._getTime() - x, u(), w >= a._mcstime && (a._mcstime = w > a._mcstime ? w + G - (w - a._mcstime) : w + G - 1, a._mcstime < w + 1 && (a._mcstime = w +
                            1)), a._mcstime < e ? a._mcsid = _request(s) : D.call())
                    }

                    function u() {
                        0 < e ? (a._mcscurrVal = y(a._mcstime, z, K, e, f), H[b] = Math.round(a._mcscurrVal) + "px") : H[b] = c + "px";
                        J.call()
                    }

                    function y(a, b, c, d, e) {
                        switch (e) {
                            case "linear":
                            case "mcsLinear":
                                return c * a / d + b;
                            case "mcsLinearOut":
                                return a /= d, a--, c * Math.sqrt(1 - a * a) + b;
                            case "easeInOutSmooth":
                                a /= d / 2;
                                if (1 > a) return c / 2 * a * a + b;
                                a--;
                                return -c / 2 * (a * (a - 2) - 1) + b;
                            case "easeInOutStrong":
                                a /= d / 2;
                                if (1 > a) return c / 2 * Math.pow(2, 10 * (a - 1)) + b;
                                a--;
                                return c / 2 * (-Math.pow(2, -10 * a) + 2) + b;
                            case "easeInOut":
                            case "mcsEaseInOut":
                                a /=
                                    d / 2;
                                if (1 > a) return c / 2 * a * a * a + b;
                                a -= 2;
                                return c / 2 * (a * a * a + 2) + b;
                            case "easeOutSmooth":
                                return a /= d, a--, -c * (a * a * a * a - 1) + b;
                            case "easeOutStrong":
                                return c * (-Math.pow(2, -10 * a / d) + 1) + b;
                            default:
                                return d = (a /= d) * a, e = d * a, b + c * (0.499999999999997 * e * d + -2.5 * d * d + 5.5 * e + -6.5 * d + 4 * a)
                        }
                    }
                    m = m || {};
                    var r = m.onStart || function () { },
                        J = m.onUpdate || function () { },
                        D = m.onComplete || function () { },
                        x = p._getTime(),
                        G, w = 0,
                        z = a.offsetTop,
                        H = a.style;
                    "left" === b && (z = a.offsetLeft);
                    var K = c - z;
                    a._mcsstop = 0;
                    "none" !== k && null != a._mcsid && (d.requestAnimationFrame ? d.cancelAnimationFrame(a._mcsid) :
                        clearTimeout(a._mcsid), a._mcsid = null);
                    (function () {
                        G = 1E3 / 60;
                        a._mcstime = w + G;
                        _request = d.requestAnimationFrame ? d.requestAnimationFrame : function (a) {
                            u();
                            return setTimeout(a, 0.01)
                        };
                        a._mcsid = _request(s)
                    })()
                },
                _getTime: function () {
                    return d.performance && d.performance.now ? d.performance.now() : d.performance && d.performance.webkitNow ? d.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
                },
                _stopTween: function () {
                    null != this._mcsid && (d.requestAnimationFrame ? d.cancelAnimationFrame(this._mcsid) : clearTimeout(this._mcsid),
                        this._mcsid = null, this._mcsstop = 1)
                },
                _delete: function (a) {
                    delete a
                },
                _mouseBtnLeft: function (a) {
                    return !(a.which && 1 !== a.which)
                },
                _pointerTouch: function (a) {
                    a = a.originalEvent.pointerType;
                    return !(a && "touch" !== a && 2 !== a)
                },
                _isNumeric: function (a) {
                    return !isNaN(parseFloat(a)) && isFinite(a)
                }
            };
        a.fn.mCustomScrollbar = function (b) {
            if (x[b]) return x[b].apply(this, Array.prototype.slice.call(arguments, 1));
            if ("object" !== typeof b && b) a.error("Method " + b + " does not exist");
            else return x.init.apply(this, arguments)
        };
        a.mCustomScrollbar =
            function (b) {
                if (x[b]) return x[b].apply(this, Array.prototype.slice.call(arguments, 1));
                if ("object" !== typeof b && b) a.error("Method " + b + " does not exist");
                else return x.init.apply(this, arguments)
            };
        a.mCustomScrollbar.defaults = b;
        d.mCustomScrollbar = !0;
        a(d).load(function () {
            a(".mCustomScrollbar").mCustomScrollbar()
        })
    })
})(window, document);