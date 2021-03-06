/*!
 * Bootstrap v3.1.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if ("undefined" == typeof jQuery)
    throw new Error("Bootstrap's JavaScript requires jQuery");
+ function(e) {
    "use strict";
    function t() {
        var e = document.createElement("bootstrap"), t = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var n in t)
            if (void 0 !== e.style[n])
                return {
                    end: t[n]
                };
        return !1
    }
    e.fn.emulateTransitionEnd = function(t) {
        var n=!1, r = this;
        e(this).one(e.support.transition.end, function() {
            n=!0
        });
        var i = function() {
            n || e(r).trigger(e.support.transition.end)
        };
        return setTimeout(i, t), this
    }, e(function() {
        e.support.transition = t()
    })
}(jQuery), + function(e) {
    "use strict";
    var t = '[data-dismiss="alert"]', n = function(n) {
        e(n).on("click", t, this.close)
    };
    n.prototype.close = function(t) {
        function n() {
            o.trigger("closed.bs.alert").remove()
        }
        var r = e(this), i = r.attr("data-target");
        i || (i = r.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, ""));
        var o = e(i);
        t && t.preventDefault(), o.length || (o = r.hasClass("alert") ? r : r.parent()), o.trigger(t = e.Event("close.bs.alert")), t.isDefaultPrevented() || (o.removeClass("in"), e.support.transition && o.hasClass("fade") ? o.one(e.support.transition.end, n).emulateTransitionEnd(150) : n())
    };
    var r = e.fn.alert;
    e.fn.alert = function(t) {
        return this.each(function() {
            var r = e(this), i = r.data("bs.alert");
            i || r.data("bs.alert", i = new n(this)), "string" == typeof t && i[t].call(r)
        })
    }, e.fn.alert.Constructor = n, e.fn.alert.noConflict = function() {
        return e.fn.alert = r, this
    }, e(document).on("click.bs.alert.data-api", t, n.prototype.close)
}(jQuery), + function(e) {
    "use strict";
    var t = function(n, r) {
        this.$element = e(n), this.options = e.extend({}, t.DEFAULTS, r), this.isLoading=!1
    };
    t.DEFAULTS = {
        loadingText: "loading..."
    }, t.prototype.setState = function(t) {
        var n = "disabled", r = this.$element, i = r.is("input") ? "val": "html", o = r.data();
        t += "Text", o.resetText || r.data("resetText", r[i]()), r[i](o[t] || this.options[t]), setTimeout(e.proxy(function() {
            "loadingText" == t ? (this.isLoading=!0, r.addClass(n).attr(n, n)) : this.isLoading && (this.isLoading=!1, r.removeClass(n).removeAttr(n))
        }, this), 0)
    }, t.prototype.toggle = function() {
        var e=!0, t = this.$element.closest('[data-toggle="buttons"]');
        if (t.length) {
            var n = this.$element.find("input");
            "radio" == n.prop("type") && (n.prop("checked") && this.$element.hasClass("active") ? e=!1 : t.find(".active").removeClass("active")), e && n.prop("checked", !this.$element.hasClass("active")).trigger("change")
        }
        e && this.$element.toggleClass("active")
    };
    var n = e.fn.button;
    e.fn.button = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("bs.button"), o = "object" == typeof n && n;
            i || r.data("bs.button", i = new t(this, o)), "toggle" == n ? i.toggle() : n && i.setState(n)
        })
    }, e.fn.button.Constructor = t, e.fn.button.noConflict = function() {
        return e.fn.button = n, this
    }, e(document).on("click.bs.button.data-api", "[data-toggle^=button]", function(t) {
        var n = e(t.target);
        n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle"), t.preventDefault()
    })
}(jQuery), + function(e) {
    "use strict";
    var t = function(t, n) {
        this.$element = e(t), this.$indicators = this.$element.find(".carousel-indicators"), this.options = n, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this))
    };
    t.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    }, t.prototype.cycle = function(t) {
        return t || (this.paused=!1), this.interval && clearInterval(this.interval), this.options.interval&&!this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this
    }, t.prototype.getActiveIndex = function() {
        return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
    }, t.prototype.to = function(t) {
        var n = this, r = this.getActiveIndex();
        return t > this.$items.length-1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            n.to(t)
        }) : r == t ? this.pause().cycle() : this.slide(t > r ? "next" : "prev", e(this.$items[t]))
    }, t.prototype.pause = function(t) {
        return t || (this.paused=!0), this.$element.find(".next, .prev").length && e.support.transition && (this.$element.trigger(e.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, t.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, t.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, t.prototype.slide = function(t, n) {
        var r = this.$element.find(".item.active"), i = n || r[t](), o = this.interval, s = "next" == t ? "left": "right", a = "next" == t ? "first": "last", l = this;
        if (!i.length) {
            if (!this.options.wrap)
                return;
            i = this.$element.find(".item")[a]()
        }
        if (i.hasClass("active"))
            return this.sliding=!1;
        var c = e.Event("slide.bs.carousel", {
            relatedTarget: i[0],
            direction: s
        });
        return this.$element.trigger(c), c.isDefaultPrevented() ? void 0 : (this.sliding=!0, o && this.pause(), this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid.bs.carousel", function() {
            var t = e(l.$indicators.children()[l.getActiveIndex()]);
            t && t.addClass("active")
        })), e.support.transition && this.$element.hasClass("slide") ? (i.addClass(t), i[0].offsetWidth, r.addClass(s), i.addClass(s), r.one(e.support.transition.end, function() {
            i.removeClass([t, s].join(" ")).addClass("active"), r.removeClass(["active", s].join(" ")), l.sliding=!1, setTimeout(function() {
                l.$element.trigger("slid.bs.carousel")
            }, 0)
        }).emulateTransitionEnd(1e3 * r.css("transition-duration").slice(0, -1))) : (r.removeClass("active"), i.addClass("active"), this.sliding=!1, this.$element.trigger("slid.bs.carousel")), o && this.cycle(), this)
    };
    var n = e.fn.carousel;
    e.fn.carousel = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("bs.carousel"), o = e.extend({}, t.DEFAULTS, r.data(), "object" == typeof n && n), s = "string" == typeof n ? n: o.slide;
            i || r.data("bs.carousel", i = new t(this, o)), "number" == typeof n ? i.to(n) : s ? i[s]() : o.interval && i.pause().cycle()
        })
    }, e.fn.carousel.Constructor = t, e.fn.carousel.noConflict = function() {
        return e.fn.carousel = n, this
    }, e(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(t) {
        var n, r = e(this), i = e(r.attr("data-target") || (n = r.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "")), o = e.extend({}, i.data(), r.data()), s = r.attr("data-slide-to");
        s && (o.interval=!1), i.carousel(o), (s = r.attr("data-slide-to")) && i.data("bs.carousel").to(s), t.preventDefault()
    }), e(window).on("load", function() {
        e('[data-ride="carousel"]').each(function() {
            var t = e(this);
            t.carousel(t.data())
        })
    })
}(jQuery), + function(e) {
    "use strict";
    var t = function(n, r) {
        this.$element = e(n), this.options = e.extend({}, t.DEFAULTS, r), this.transitioning = null, this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle()
    };
    t.DEFAULTS = {
        toggle: !0
    }, t.prototype.dimension = function() {
        var e = this.$element.hasClass("width");
        return e ? "width" : "height"
    }, t.prototype.show = function() {
        if (!this.transitioning&&!this.$element.hasClass("in")) {
            var t = e.Event("show.bs.collapse");
            if (this.$element.trigger(t), !t.isDefaultPrevented()
                ) {
                var n = this.$parent && this.$parent.find("> .panel > .in");
                if (n && n.length) {
                    var r = n.data("bs.collapse");
                    if (r && r.transitioning)
                        return;
                    n.collapse("hide"), r || n.data("bs.collapse", null)
                }
                var i = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[i](0), this.transitioning = 1;
                var o = function() {
                    this.$element.removeClass("collapsing").addClass("collapse in")[i]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                };
                if (!e.support.transition)
                    return o.call(this);
                var s = e.camelCase(["scroll", i].join("-"));
                this.$element.one(e.support.transition.end, e.proxy(o, this)).emulateTransitionEnd(350)[i](this.$element[0][s])
            }
        }
    }, t.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var t = e.Event("hide.bs.collapse");
            if (this.$element.trigger(t), !t.isDefaultPrevented()
                ) {
                var n = this.dimension();
                this.$element[n](this.$element[n]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                var r = function() {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                return e.support.transition ? void this.$element[n](0).one(e.support.transition.end, e.proxy(r, this)).emulateTransitionEnd(350) : r.call(this)
            }
        }
    }, t.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide": "show"]()
    };
    var n = e.fn.collapse;
    e.fn.collapse = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("bs.collapse"), o = e.extend({}, t.DEFAULTS, r.data(), "object" == typeof n && n);
            !i && o.toggle && "show" == n && (n=!n), i || r.data("bs.collapse", i = new t(this, o)), "string" == typeof n && i[n]()
        })
    }, e.fn.collapse.Constructor = t, e.fn.collapse.noConflict = function() {
        return e.fn.collapse = n, this
    }, e(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(t) {
        var n, r = e(this), i = r.attr("data-target") || t.preventDefault() || (n = r.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""), o = e(i), s = o.data("bs.collapse"), a = s ? "toggle": r.data(), l = r.attr("data-parent"), c = l && e(l);
        s && s.transitioning || (c && c.find('[data-toggle=collapse][data-parent="' + l + '"]').not(r).addClass("collapsed"), r[o.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), o.collapse(a)
    })
}(jQuery), + function(e) {
    "use strict";
    function t(t) {
        e(r).remove(), e(i).each(function() {
            var r = n(e(this)), i = {
                relatedTarget: this
            };
            r.hasClass("open") && (r.trigger(t = e.Event("hide.bs.dropdown", i)), t.isDefaultPrevented() || r.removeClass("open").trigger("hidden.bs.dropdown", i))
        })
    }
    function n(t) {
        var n = t.attr("data-target");
        n || (n = t.attr("href"), n = n && /#[A-Za-z]/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
        var r = n && e(n);
        return r && r.length ? r : t.parent()
    }
    var r = ".dropdown-backdrop", i = "[data-toggle=dropdown]", o = function(t) {
        e(t).on("click.bs.dropdown", this.toggle)
    };
    o.prototype.toggle = function(r) {
        var i = e(this);
        if (!i.is(".disabled, :disabled")) {
            var o = n(i), s = o.hasClass("open");
            if (t(), !s) {
                "ontouchstart"in document.documentElement&&!o.closest(".navbar-nav").length && e('<div class="dropdown-backdrop"/>').insertAfter(e(this)).on("click", t);
                var a = {
                    relatedTarget: this
                };
                if (o.trigger(r = e.Event("show.bs.dropdown", a)), r.isDefaultPrevented()
                    )return;
                o.toggleClass("open").trigger("shown.bs.dropdown", a), i.focus()
            }
            return !1
        }
    }, o.prototype.keydown = function(t) {
        if (/(38|40|27)/.test(t.keyCode)) {
            var r = e(this);
            if (t.preventDefault(), t.stopPropagation()
                , !r.is(".disabled, :disabled")) {
                var o = n(r), s = o.hasClass("open");
                if (!s || s && 27 == t.keyCode)
                    return 27 == t.which && o.find(i).focus(), r.click();
                var a = " li:not(.divider):visible a", l = o.find("[role=menu]" + a + ", [role=listbox]" + a);
                if (l.length) {
                    var c = l.index(l.filter(":focus"));
                    38 == t.keyCode && c > 0 && c--, 40 == t.keyCode && c < l.length-1 && c++, ~c || (c = 0), l.eq(c).focus()
                }
            }
        }
    };
    var s = e.fn.dropdown;
    e.fn.dropdown = function(t) {
        return this.each(function() {
            var n = e(this), r = n.data("bs.dropdown");
            r || n.data("bs.dropdown", r = new o(this)), "string" == typeof t && r[t].call(n)
        })
    }, e.fn.dropdown.Constructor = o, e.fn.dropdown.noConflict = function() {
        return e.fn.dropdown = s, this
    }, e(document).on("click.bs.dropdown.data-api", t).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
        e.stopPropagation()
    }).on("click.bs.dropdown.data-api", i, o.prototype.toggle).on("keydown.bs.dropdown.data-api", i + ", [role=menu], [role=listbox]", o.prototype.keydown)
}(jQuery), + function(e) {
    "use strict";
    var t = function(t, n) {
        this.options = n, this.$element = e(t), this.$backdrop = this.isShown = null, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, e.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    t.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, t.prototype.toggle = function(e) {
        return this[this.isShown ? "hide": "show"](e)
    }, t.prototype.show = function(t) {
        var n = this, r = e.Event("show.bs.modal", {
            relatedTarget: t
        });
        this.$element.trigger(r), this.isShown || r.isDefaultPrevented() || (this.isShown=!0, this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', e.proxy(this.hide, this)), this.backdrop(function() {
            var r = e.support.transition && n.$element.hasClass("fade");
            n.$element.parent().length || n.$element.appendTo(document.body), n.$element.show().scrollTop(0), r && n.$element[0].offsetWidth, n.$element.addClass("in").attr("aria-hidden", !1), n.enforceFocus();
            var i = e.Event("shown.bs.modal", {
                relatedTarget: t
            });
            r ? n.$element.find(".modal-dialog").one(e.support.transition.end, function() {
                n.$element.focus().trigger(i)
            }).emulateTransitionEnd(300) : n.$element.focus().trigger(i)
        }))
    }, t.prototype.hide = function(t) {
        t && t.preventDefault(), t = e.Event("hide.bs.modal"), this.$element.trigger(t), this.isShown&&!t.isDefaultPrevented() && (this.isShown=!1, this.escape(), e(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), e.support.transition && this.$element.hasClass("fade") ? this.$element.one(e.support.transition.end, e.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    }, t.prototype.enforceFocus = function() {
        e(document).off("focusin.bs.modal").on("focusin.bs.modal", e.proxy(function(e) {
            this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.focus()
        }, this))
    }, t.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", e.proxy(function(e) {
            27 == e.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }, t.prototype.hideModal = function() {
        var e = this;
        this.$element.hide(), this.backdrop(function() {
            e.removeBackdrop(), e.$element.trigger("hidden.bs.modal")
        })
    }, t.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, t.prototype.backdrop = function(t) {
        var n = this.$element.hasClass("fade") ? "fade": "";
        if (this.isShown && this.options.backdrop) {
            var r = e.support.transition && n;
            if (this.$backdrop = e('<div class="modal-backdrop ' + n + '" />').appendTo(document.body), this.$element.on("click.dismiss.bs.modal", e.proxy(function(e) {
                e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
            }, this)), r && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !t)return;
            r ? this.$backdrop.one(e.support.transition.end, t).emulateTransitionEnd(150) : t()
        } else 
            !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, t).emulateTransitionEnd(150) : t()) : t && t()
    };
    var n = e.fn.modal;
    e.fn.modal = function(n, r) {
        return this.each(function() {
            var i = e(this), o = i.data("bs.modal"), s = e.extend({}, t.DEFAULTS, i.data(), "object" == typeof n && n);
            o || i.data("bs.modal", o = new t(this, s)), "string" == typeof n ? o[n](r) : s.show && o.show(r)
        })
    }, e.fn.modal.Constructor = t, e.fn.modal.noConflict = function() {
        return e.fn.modal = n, this
    }, e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(t) {
        var n = e(this), r = n.attr("href"), i = e(n.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")), o = i.data("bs.modal") ? "toggle": e.extend({
            remote: !/#/.test(r) && r
        }, i.data(), n.data());
        n.is("a") && t.preventDefault(), i.modal(o, this).one("hide", function() {
            n.is(":visible") && n.focus()
        })
    }), e(document).on("show.bs.modal", ".modal", function() {
        e(document.body).addClass("modal-open")
    }).on("hidden.bs.modal", ".modal", function() {
        e(document.body).removeClass("modal-open")
    })
}(jQuery), + function(e) {
    "use strict";
    var t = function(e, t) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", e, t)
    };
    t.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, t.prototype.init = function(t, n, r) {
        this.enabled=!0, this.type = t, this.$element = e(n), this.options = this.getOptions(r);
        for (var i = this.options.trigger.split(" "), o = i.length; o--;) {
            var s = i[o];
            if ("click" == s)
                this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this));
            else if ("manual" != s) {
                var a = "hover" == s ? "mouseenter": "focusin", l = "hover" == s ? "mouseleave": "focusout";
                this.$element.on(a + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, e.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = e.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, t.prototype.getDefaults = function() {
        return t.DEFAULTS
    }, t.prototype.getOptions = function(t) {
        return t = e.extend({}, this.getDefaults(), this.$element.data(), t), t.delay && "number" == typeof t.delay && (t.delay = {
            show: t.delay,
            hide: t.delay
        }), t
    }, t.prototype.getDelegateOptions = function() {
        var t = {}, n = this.getDefaults();
        return this._options && e.each(this._options, function(e, r) {
            n[e] != r && (t[e] = r)
        }), t
    }, t.prototype.enter = function(t) {
        var n = t instanceof this.constructor ? t: e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(n.timeout), n.hoverState = "in", n.options.delay && n.options.delay.show ? void(n.timeout = setTimeout(function() {
            "in" == n.hoverState && n.show()
        }, n.options.delay.show)) : n.show()
    }, t.prototype.leave = function(t) {
        var n = t instanceof this.constructor ? t: e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(n.timeout), n.hoverState = "out", n.options.delay && n.options.delay.hide ? void(n.timeout = setTimeout(function() {
            "out" == n.hoverState && n.hide()
        }, n.options.delay.hide)) : n.hide()
    }, t.prototype.show = function() {
        var t = e.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(t), t.isDefaultPrevented()
                )return;
            var n = this, r = this.tip();
            this.setContent(), this.options.animation && r.addClass("fade");
            var i = "function" == typeof this.options.placement ? this.options.placement.call(this, r[0], this.$element[0]): this.options.placement, o = /\s?auto?\s?/i, s = o.test(i);
            s && (i = i.replace(o, "") || "top"), r.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(i), this.options.container ? r.appendTo(this.options.container) : r.insertAfter(this.$element);
            var a = this.getPosition(), l = r[0].offsetWidth, c = r[0].offsetHeight;
            if (s) {
                var u = this.$element.parent(), p = i, f = document.documentElement.scrollTop || document.body.scrollTop, d = "body" == this.options.container ? window.innerWidth: u.outerWidth(), h = "body" == this.options.container ? window.innerHeight: u.outerHeight(), g = "body" == this.options.container ? 0: u.offset().left;
                i = "bottom" == i && a.top + a.height + c - f > h ? "top" : "top" == i && a.top - f - c < 0 ? "bottom" : "right" == i && a.right + l > d ? "left" : "left" == i && a.left - l < g ? "right" : i, r.removeClass(p).addClass(i)
            }
            var m = this.getCalculatedOffset(i, a, l, c);
            this.applyPlacement(m, i), this.hoverState = null;
            var v = function() {
                n.$element.trigger("shown.bs." + n.type)
            };
            e.support.transition && this.$tip.hasClass("fade") ? r.one(e.support.transition.end, v).emulateTransitionEnd(150) : v()
        }
    }, t.prototype.applyPlacement = function(t, n) {
        var r, i = this.tip(), o = i[0].offsetWidth, s = i[0].offsetHeight, a = parseInt(i.css("margin-top"), 10), l = parseInt(i.css("margin-left"), 10);
        isNaN(a) && (a = 0), isNaN(l) && (l = 0), t.top = t.top + a, t.left = t.left + l, e.offset.setOffset(i[0], e.extend({
            using: function(e) {
                i.css({
                    top: Math.round(e.top),
                    left: Math.round(e.left)
                })
            }
        }, t), 0), i.addClass("in");
        var c = i[0].offsetWidth, u = i[0].offsetHeight;
        if ("top" == n && u != s && (r=!0, t.top = t.top + s - u), /bottom|top/.test(n)
            ) {
            var p = 0;
            t.left < 0 && (p =- 2 * t.left, t.left = 0, i.offset(t), c = i[0].offsetWidth, u = i[0].offsetHeight), this.replaceArrow(p - o + c, c, "left")
        } else 
            this.replaceArrow(u - s, u, "top");
        r && i.offset(t)
    }, t.prototype.replaceArrow = function(e, t, n) {
        this.arrow().css(n, e ? 50 * (1 - e / t) + "%" : "")
    }, t.prototype.setContent = function() {
        var e = this.tip(), t = this.getTitle();
        e.find(".tooltip-inner")[this.options.html ? "html": "text"](t), e.removeClass("fade in top bottom left right")
    }, t.prototype.hide = function() {
        function t() {
            "in" != n.hoverState && r.detach(), n.$element.trigger("hidden.bs." + n.type)
        }
        var n = this, r = this.tip(), i = e.Event("hide.bs." + this.type);
        return this.$element.trigger(i), i.isDefaultPrevented() ? void 0 : (r.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? r.one(e.support.transition.end, t).emulateTransitionEnd(150) : t(), this.hoverState = null, this)
    }, t.prototype.fixTitle = function() {
        var e = this.$element;
        (e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").attr("title", "")
    }, t.prototype.hasContent = function() {
        return this.getTitle()
    }, t.prototype.getPosition = function() {
        var t = this.$element[0];
        return e.extend({}, "function" == typeof t.getBoundingClientRect ? t.getBoundingClientRect() : {
            width: t.offsetWidth,
            height: t.offsetHeight
        }, this.$element.offset())
    }, t.prototype.getCalculatedOffset = function(e, t, n, r) {
        return "bottom" == e ? {
            top: t.top + t.height,
            left: t.left + t.width / 2 - n / 2
        } : "top" == e ? {
            top: t.top - r,
            left: t.left + t.width / 2 - n / 2
        } : "left" == e ? {
            top: t.top + t.height / 2 - r / 2,
            left: t.left - n
        } : {
            top: t.top + t.height / 2 - r / 2,
            left: t.left + t.width
        }
    }, t.prototype.getTitle = function() {
        var e, t = this.$element, n = this.options;
        return e = t.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(t[0]) : n.title)
    }, t.prototype.tip = function() {
        return this.$tip = this.$tip || e(this.options.template)
    }, t.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, t.prototype.validate = function() {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, t.prototype.enable = function() {
        this.enabled=!0
    }, t.prototype.disable = function() {
        this.enabled=!1
    }, t.prototype.toggleEnabled = function() {
        this.enabled=!this.enabled
    }, t.prototype.toggle = function(t) {
        var n = t ? e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type): this;
        n.tip().hasClass("in") ? n.leave(n) : n.enter(n)
    }, t.prototype.destroy = function() {
        clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var n = e.fn.tooltip;
    e.fn.tooltip = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("bs.tooltip"), o = "object" == typeof n && n;
            (i || "destroy" != n) && (i || r.data("bs.tooltip", i = new t(this, o)), "string" == typeof n && i[n]())
        })
    }, e.fn.tooltip.Constructor = t, e.fn.tooltip.noConflict = function() {
        return e.fn.tooltip = n, this
    }
}(jQuery), + function(e) {
    "use strict";
    var t = function(e, t) {
        this.init("popover", e, t)
    };
    if (!e.fn.tooltip)
        throw new Error("Popover requires tooltip.js");
    t.DEFAULTS = e.extend({}, e.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype), t.prototype.constructor = t, t.prototype.getDefaults = function() {
        return t.DEFAULTS
    }, t.prototype.setContent = function() {
        var e = this.tip(), t = this.getTitle(), n = this.getContent();
        e.find(".popover-title")[this.options.html ? "html": "text"](t), e.find(".popover-content")[this.options.html ? "string" == typeof n ? "html": "append": "text"](n), e.removeClass("fade top bottom left right in"), e.find(".popover-title").html() || e.find(".popover-title").hide()
    }, t.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, t.prototype.getContent = function() {
        var e = this.$element, t = this.options;
        return e.attr("data-content") || ("function" == typeof t.content ? t.content.call(e[0]) : t.content)
    }, t.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, t.prototype.tip = function() {
        return this.$tip || (this.$tip = e(this.options.template)), this.$tip
    };
    var n = e.fn.popover;
    e.fn.popover = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("bs.popover"), o = "object" == typeof n && n;
            (i || "destroy" != n) && (i || r.data("bs.popover", i = new t(this, o)), "string" == typeof n && i[n]())
        })
    }, e.fn.popover.Constructor = t, e.fn.popover.noConflict = function() {
        return e.fn.popover = n, this
    }
}(jQuery), + function(e) {
    "use strict";
    function t(n, r) {
        var i, o = e.proxy(this.process, this);
        this.$element = e(e(n).is("body") ? window : n), this.$body = e("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", o), this.options = e.extend({}, t.DEFAULTS, r), this.selector = (this.options.target || (i = e(n).attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.offsets = e([]), this.targets = e([]), this.activeTarget = null, this.refresh(), this.process()
    }
    t.DEFAULTS = {
        offset: 10
    }, t.prototype.refresh = function() {
        var t = this.$element[0] == window ? "offset": "position";
        this.offsets = e([]), this.targets = e([]);
        var n = this;
        this.$body.find(this.selector).map(function() {
            var r = e(this), i = r.data("target") || r.attr("href"), o = /^#./.test(i) && e(i);
            return o && o.length && o.is(":visible") && [[o[t]().top + (!e.isWindow(n.$scrollElement.get(0)) && n.$scrollElement.scrollTop()), i]] || null
        }).sort(function(e, t) {
            return e[0] - t[0]
        }).each(function() {
            n.offsets.push(this[0]), n.targets.push(this[1])
        })
    }, t.prototype.process = function() {
        var e, t = this.$scrollElement.scrollTop() + this.options.offset, n = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, r = n - this.$scrollElement.height(), i = this.offsets, o = this.targets, s = this.activeTarget;
        if (t >= r)
            return s != (e = o.last()[0]) && this.activate(e);
        if (s && t <= i[0])
            return s != (e = o[0]) && this.activate(e);
        for (e = i.length; e--;)
            s != o[e] && t >= i[e] && (!i[e + 1] || t <= i[e + 1]) && this.activate(o[e])
    }, t.prototype.activate = function(t) {
        this.activeTarget = t, e(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        var n = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]', r = e(n).parents("li").addClass("active");
        r.parent(".dropdown-menu").length && (r = r.closest("li.dropdown").addClass("active")), r.trigger("activate.bs.scrollspy")
    };
    var n = e.fn.scrollspy;
    e.fn.scrollspy = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("bs.scrollspy"), o = "object" == typeof n && n;
            i || r.data("bs.scrollspy", i = new t(this, o)), "string" == typeof n && i[n]()
        })
    }, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.noConflict = function() {
        return e.fn.scrollspy = n, this
    }, e(window).on("load", function() {
        e('[data-spy="scroll"]').each(function() {
            var t = e(this);
            t.scrollspy(t.data())
        })
    })
}(jQuery), + function(e) {
    "use strict";
    var t = function(t) {
        this.element = e(t)
    };
    t.prototype.show = function() {
        var t = this.element, n = t.closest("ul:not(.dropdown-menu)"), r = t.data("target");
        if (r || (r = t.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, ""))
            , !t.parent("li").hasClass("active")) {
            var i = n.find(".active:last a")[0], o = e.Event("show.bs.tab", {
                relatedTarget: i
            });
            if (t.trigger(o), !o.isDefaultPrevented()
                ) {
                var s = e(r);
                this.activate(t.parent("li"), n), this.activate(s, s.parent(), function() {
                    t.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: i
                    })
                })
            }
        }
    }, t.prototype.activate = function(t, n, r) {
        function i() {
            o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), t.addClass("active"), s ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), r && r()
        }
        var o = n.find("> .active"), s = r && e.support.transition && o.hasClass("fade");
        s ? o.one(e.support.transition.end, i).emulateTransitionEnd(150) : i(), o.removeClass("in")
    };
    var n = e.fn.tab;
    e.fn.tab = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("bs.tab");
            i || r.data("bs.tab", i = new t(this)), "string" == typeof n && i[n]()
        })
    }, e.fn.tab.Constructor = t, e.fn.tab.noConflict = function() {
        return e.fn.tab = n, this
    }, e(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(t) {
        t.preventDefault(), e(this).tab("show")
    })
}(jQuery), + function(e) {
    "use strict";
    var t = function(n, r) {
        this.options = e.extend({}, t.DEFAULTS, r), this.$window = e(window).on("scroll.bs.affix.data-api", e.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", e.proxy(this.checkPositionWithEventLoop, this)), this.$element = e(n), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition()
    };
    t.RESET = "affix affix-top affix-bottom", t.DEFAULTS = {
        offset: 0
    }, t.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset)
            return this.pinnedOffset;
        this.$element.removeClass(t.RESET).addClass("affix");
        var e = this.$window.scrollTop(), n = this.$element.offset();
        return this.pinnedOffset = n.top - e
    }, t.prototype.checkPositionWithEventLoop = function() {
        setTimeout(e.proxy(this.checkPosition, this), 1)
    }, t.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var n = e(document).height(), r = this.$window.scrollTop(), i = this.$element.offset(), o = this.options.offset, s = o.top, a = o.bottom;
            "top" == this.affixed && (i.top += r), "object" != typeof o && (a = s = o), "function" == typeof s && (s = o.top(this.$element)), "function" == typeof a && (a = o.bottom(this.$element));
            var l = null != this.unpin && r + this.unpin <= i.top?!1 : null != a && i.top + this.$element.height() >= n - a ? "bottom" : null != s && s >= r ? "top" : !1;
            if (this.affixed !== l) {
                this.unpin && this.$element.css("top", "");
                var c = "affix" + (l ? "-" + l : ""), u = e.Event(c + ".bs.affix");
                this.$element.trigger(u), u.isDefaultPrevented() || (this.affixed = l, this.unpin = "bottom" == l ? this.getPinnedOffset() : null, this.$element.removeClass(t.RESET).addClass(c).trigger(e.Event(c.replace("affix", "affixed"))), "bottom" == l && this.$element.offset({
                    top: n - a - this.$element.height()
                }))
            }
        }
    };
    var n = e.fn.affix;
    e.fn.affix = function(n) {
        return this.each(function() {
            var r = e(this), i = r.data("bs.affix"), o = "object" == typeof n && n;
            i || r.data("bs.affix", i = new t(this, o)), "string" == typeof n && i[n]()
        })
    }, e.fn.affix.Constructor = t, e.fn.affix.noConflict = function() {
        return e.fn.affix = n, this
    }, e(window).on("load", function() {
        e('[data-spy="affix"]').each(function() {
            var t = e(this), n = t.data();
            n.offset = n.offset || {}, n.offsetBottom && (n.offset.bottom = n.offsetBottom), n.offsetTop && (n.offset.top = n.offsetTop), t.affix(n)
        })
    })
}(jQuery);

