/*! angular-google-maps 2.3.3 2016-05-13
 *  AngularJS directives for Google Maps
 *  git: https://github.com/angular-ui/angular-google-maps.git
 */

! function(a, b, c) {
    "use strict";
    (function() {
        b.module("uiGmapgoogle-maps.providers", ["nemLogging"]), b.module("uiGmapgoogle-maps.wrapped", []), b.module("uiGmapgoogle-maps.extensions", ["uiGmapgoogle-maps.wrapped", "uiGmapgoogle-maps.providers"]), b.module("uiGmapgoogle-maps.directives.api.utils", ["uiGmapgoogle-maps.extensions"]), b.module("uiGmapgoogle-maps.directives.api.managers", []), b.module("uiGmapgoogle-maps.directives.api.options", ["uiGmapgoogle-maps.directives.api.utils"]), b.module("uiGmapgoogle-maps.directives.api.options.builders", []), b.module("uiGmapgoogle-maps.directives.api.models.child", ["uiGmapgoogle-maps.directives.api.utils", "uiGmapgoogle-maps.directives.api.options", "uiGmapgoogle-maps.directives.api.options.builders"]), b.module("uiGmapgoogle-maps.directives.api.models.parent", ["uiGmapgoogle-maps.directives.api.managers", "uiGmapgoogle-maps.directives.api.models.child", "uiGmapgoogle-maps.providers"]), b.module("uiGmapgoogle-maps.directives.api", ["uiGmapgoogle-maps.directives.api.models.parent"]), b.module("uiGmapgoogle-maps", ["uiGmapgoogle-maps.directives.api", "uiGmapgoogle-maps.providers"])
    }).call(this),
        function() {
            b.module("uiGmapgoogle-maps.providers").factory("uiGmapMapScriptLoader", ["$q", "uiGmapuuid", function(c, d) {
                var e, f, g, h, i;
                return h = void 0, i = void 0, e = function(a) {
                    return a.china ? "http://maps.google.cn/maps/api/js?" : "auto" === a.transport ? "//maps.googleapis.com/maps/api/js?" : a.transport + "://maps.googleapis.com/maps/api/js?"
                }, f = function(a) {
                    var b, c, f, g;
                    return b = ["transport", "isGoogleMapsForWork", "china", "preventLoad"], a.isGoogleMapsForWork && b.push("key"), c = _.map(_.omit(a, b), function(a, b) {
                        return b + "=" + a
                    }), h && (g = document.getElementById(h), g.parentNode.removeChild(g)), c = c.join("&"), f = document.createElement("script"), f.id = h = "ui_gmap_map_load_" + d.generate(), f.type = "text/javascript", f.src = e(a) + c, document.body.appendChild(f)
                }, g = function() {
                    return b.isDefined(a.google) && b.isDefined(a.google.maps)
                }, {
                    load: function(b) {
                        var d, e;
                        return d = c.defer(), g() ? (d.resolve(a.google.maps), d.promise) : (e = b.callback = "onGoogleMapsReady" + Math.round(1e3 * Math.random()), a[e] = function() {
                            a[e] = null, d.resolve(a.google.maps)
                        }, a.navigator.connection && a.Connection && a.navigator.connection.type === a.Connection.NONE && !b.preventLoad ? document.addEventListener("online", function() {
                            return g() ? void 0 : f(b)
                        }) : b.preventLoad || f(b), i = b, i.randomizedFunctionName = e, d.promise)
                    },
                    manualLoad: function() {
                        var b;
                        return b = i, g() ? a[b.randomizedFunctionName] ? a[b.randomizedFunctionName]() : void 0 : f(b)
                    }
                }
            }]).provider("uiGmapGoogleMapApi", function() {
                return this.options = {
                    transport: "https",
                    isGoogleMapsForWork: !1,
                    china: !1,
                    v: "3",
                    libraries: "",
                    language: "en",
                    preventLoad: !1
                }, this.configure = function(a) {
                    b.extend(this.options, a)
                }, this.$get = ["uiGmapMapScriptLoader", function(a) {
                    return function(b) {
                        return b.load(a.options)
                    }
                }(this)], this
            }).service("uiGmapGoogleMapApiManualLoader", ["uiGmapMapScriptLoader", function(a) {
                return {
                    load: function() {
                        a.manualLoad()
                    }
                }
            }])
        }.call(this),
        function() {
            var c = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                d = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var d in b) e.call(b, d) && (a[d] = b[d]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                e = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.extensions").service("uiGmapExtendGWin", function() {
                return {
                    init: _.once(function() {
                        var b;
                        if (google || ("undefined" != typeof google && null !== google ? google.maps : void 0) || null != google.maps.InfoWindow) return google.maps.InfoWindow.prototype._open = google.maps.InfoWindow.prototype.open, google.maps.InfoWindow.prototype._close = google.maps.InfoWindow.prototype.close, google.maps.InfoWindow.prototype._isOpen = !1, google.maps.InfoWindow.prototype.open = function(a, b, c) {
                            null == c && (this._isOpen = !0, this._open(a, b, !0))
                        }, google.maps.InfoWindow.prototype.close = function(a) {
                            null == a && (this._isOpen = !1, this._close(!0))
                        }, google.maps.InfoWindow.prototype.isOpen = function(a) {
                            return null == a && (a = void 0), null == a ? this._isOpen : this._isOpen = a
                        }, a.InfoBox && (a.InfoBox.prototype._open = a.InfoBox.prototype.open, a.InfoBox.prototype._close = a.InfoBox.prototype.close, a.InfoBox.prototype._isOpen = !1, a.InfoBox.prototype.open = function(a, b) {
                            this._isOpen = !0, this._open(a, b)
                        }, a.InfoBox.prototype.close = function() {
                            this._isOpen = !1, this._close()
                        }, a.InfoBox.prototype.isOpen = function(a) {
                            return null == a && (a = void 0), null == a ? this._isOpen : this._isOpen = a
                        }, b = function(b) {
                            function e(b) {
                                this.getOrigCloseBoxImg_ = c(this.getOrigCloseBoxImg_, this), this.getCloseBoxDiv_ = c(this.getCloseBoxDiv_, this);
                                var d;
                                d = new a.InfoBox(b), _.extend(this, d), null != b.closeBoxDiv && (this.closeBoxDiv_ = b.closeBoxDiv)
                            }
                            return d(e, b), e.prototype.getCloseBoxDiv_ = function() {
                                return this.closeBoxDiv_
                            }, e.prototype.getCloseBoxImg_ = function() {
                                var a, b;
                                return a = this.getCloseBoxDiv_(), b = this.getOrigCloseBoxImg_(), a || b
                            }, e.prototype.getOrigCloseBoxImg_ = function() {
                                var a;
                                return a = "", "" !== this.closeBoxURL_ && (a = "<img", a += " src='" + this.closeBoxURL_ + "'", a += " align=right", a += " style='", a += " position: relative;", a += " cursor: pointer;", a += " margin: " + this.closeBoxMargin_ + ";", a += "'>"), a
                            }, e
                        }(a.InfoBox), a.uiGmapInfoBox = b), a.MarkerLabel_ ? a.MarkerLabel_.prototype.setContent = function() {
                            var a;
                            a = this.marker_.get("labelContent"), a && !_.isEqual(this.oldContent, a) && ("undefined" == typeof(null != a ? a.nodeType : void 0) ? (this.labelDiv_.innerHTML = a, this.eventDiv_.innerHTML = this.labelDiv_.innerHTML, this.oldContent = a) : (this.labelDiv_.innerHTML = "", this.labelDiv_.appendChild(a), a = a.cloneNode(!0), this.labelDiv_.innerHTML = "", this.eventDiv_.appendChild(a), this.oldContent = a))
                        } : void 0
                    })
                }
            })
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.extensions").service("uiGmapLodash", function() {
                var a, b, c, d, e, f, g, h;
                return f = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g, e = /\\(\\)?/g, c = function(a) {
                    var b, c, d;
                    return c = a.missingName, d = a.swapName, b = a.isProto, null == _[c] && (_[c] = _[d], b) ? _.prototype[c] = _[d] : void 0
                }, [{
                    missingName: "contains",
                    swapName: "includes",
                    isProto: !0
                }, {
                    missingName: "includes",
                    swapName: "contains",
                    isProto: !0
                }, {
                    missingName: "object",
                    swapName: "zipObject"
                }, {
                    missingName: "zipObject",
                    swapName: "object"
                }, {
                    missingName: "all",
                    swapName: "every"
                }, {
                    missingName: "every",
                    swapName: "all"
                }, {
                    missingName: "any",
                    swapName: "some"
                }, {
                    missingName: "some",
                    swapName: "any"
                }, {
                    missingName: "first",
                    swapName: "head"
                }, {
                    missingName: "head",
                    swapName: "first"
                }].forEach(function(a) {
                    return c(a)
                }), null == _.get && (g = function(a) {
                    return _.isObject(a) ? a : Object(a)
                }, b = function(a) {
                    return null === a ? "" : a + ""
                }, h = function(a) {
                    var c;
                    return _.isArray(a) ? a : (c = [], b(a).replace(f, function(a, b, d, f) {
                        c.push(d ? f.replace(e, "$1") : b || a)
                    }), c)
                }, a = function(a, b, c) {
                    var d, e;
                    if (null !== a) {
                        void 0 !== c && c in g(a) && (b = [c]), d = 0, e = b.length;
                        for (; !_.isUndefined(a) && e > d;) a = a[b[d++]];
                        return d && d === e ? a : void 0
                    }
                }, d = function(b, c, d) {
                    var e;
                    return e = null === b ? void 0 : a(b, h(c), c + ""), void 0 === e ? d : e
                }, _.get = d), this.intersectionObjects = function(a, b, c) {
                    var d;
                    return null == c && (c = void 0), d = _.map(a, function(a) {
                        return _.find(b, function(b) {
                            return null != c ? c(a, b) : _.isEqual(a, b)
                        })
                    }), _.filter(d, function(a) {
                        return null != a
                    })
                }, this.containsObject = _.includeObject = function(a, b, c) {
                    return null == c && (c = void 0), null === a ? !1 : _.some(a, function(a) {
                        return null != c ? c(a, b) : _.isEqual(a, b)
                    })
                }, this.differenceObjects = function(a, b, c) {
                    return null == c && (c = void 0), _.filter(a, function(a) {
                        return function(d) {
                            return !a.containsObject(b, d, c)
                        }
                    }(this))
                }, this.withoutObjects = this.differenceObjects, this.indexOfObject = function(a, b, c, d) {
                    var e, f;
                    if (null == a) return -1;
                    if (e = 0, f = a.length, d) {
                        if ("number" != typeof d) return e = _.sortedIndex(a, b), a[e] === b ? e : -1;
                        e = 0 > d ? Math.max(0, f + d) : d
                    }
                    for (; f > e;) {
                        if (null != c) {
                            if (c(a[e], b)) return e
                        } else if (_.isEqual(a[e], b)) return e;
                        e++
                    }
                    return -1
                }, this.isNullOrUndefined = function(a) {
                    return _.isNull(a || _.isUndefined(a))
                }, this
            })
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.extensions").factory("uiGmapString", function() {
                return function(a) {
                    return this.contains = function(b, c) {
                        return -1 !== a.indexOf(b, c)
                    }, this
                }
            })
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmap_sync", [function() {
                return {
                    fakePromise: function() {
                        var a;
                        return a = void 0, {
                            then: function(b) {
                                return a = b
                            },
                            resolve: function() {
                                return a.apply(void 0, arguments)
                            }
                        }
                    }
                }
            }]).service("uiGmap_async", ["$timeout", "uiGmapPromise", "uiGmapLogger", "$q", "uiGmapDataStructures", "uiGmapGmapUtil", function(a, c, d, e, f, g) {
                var h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A;
                return z = c.promiseTypes, s = c.isInProgress, y = c.promiseStatus, h = c.ExposedPromise, j = c.SniffedPromise, t = function(a, b) {
                    var c;
                    return c = a.promise(), c.promiseType = a.promiseType, c.$$state && d.debug("promiseType: " + c.promiseType + ", state: " + y(c.$$state.status)), c.cancelCb = b, c
                }, o = function(a, b) {
                    return a.promiseType === z.create && b.promiseType !== z["delete"] && b.promiseType !== z.init ? (d.debug("lastPromise.promiseType " + b.promiseType + ", newPromiseType: " + a.promiseType + ", SKIPPED MUST COME AFTER DELETE ONLY"), !0) : !1
                }, x = function(a, b, c) {
                    var e;
                    return b.promiseType === z["delete"] && c.promiseType !== z["delete"] && null != c.cancelCb && _.isFunction(c.cancelCb) && s(c) && (d.debug("promiseType: " + b.promiseType + ", CANCELING LAST PROMISE type: " + c.promiseType), c.cancelCb("cancel safe"), e = a.peek(), null != e && s(e)) ? e.hasOwnProperty("cancelCb") && _.isFunction(e.cancelCb) ? (d.debug("promiseType: " + e.promiseType + ", CANCELING FIRST PROMISE type: " + e.promiseType), e.cancelCb("cancel safe")) : d.warn("first promise was not cancelable") : void 0
                }, i = function(a, b, c) {
                    var d, e;
                    if (a.existingPieces) {
                        if (d = _.last(a.existingPieces._content), o(b, d)) return;
                        return x(a.existingPieces, b, d), e = h(d["finally"](function() {
                            return t(b, c)
                        })), e.cancelCb = c, e.promiseType = b.promiseType, a.existingPieces.enqueue(e), d["finally"](function() {
                            return a.existingPieces.dequeue()
                        })
                    }
                    return a.existingPieces = new f.Queue, a.existingPieces.enqueue(t(b, c))
                }, v = function(a, b, c, e, f) {
                    var g;
                    return null == c && (c = ""), g = function(a) {
                        return d.debug(a + ": " + a), null != e && _.isFunction(e) ? e(a) : void 0
                    }, i(a, j(f, b), g)
                }, m = 80, q = {
                    value: null
                }, A = function(a, b, c) {
                    var d, e;
                    try {
                        return a.apply(b, c)
                    } catch (e) {
                        return d = e, q.value = d, q
                    }
                }, u = function(a, b, c, e) {
                    var f, g;
                    return g = A(a, b, e), g === q && (f = "error within chunking iterator: " + q.value, d.error(f), c.reject(f)), "cancel safe" !== g
                }, k = function(a, b, c) {
                    var d, e;
                    return d = a === b, e = b[c], d ? e : a[e]
                }, l = ["length", "forEach", "map"], r = function(a, c, d, e) {
                    var f, g, h;
                    if (b.isArray(a)) f = a;
                    else if (c) f = c;
                    else {
                        f = [];
                        for (g in a) h = a[g], a.hasOwnProperty(g) && !_.includes(l, g) && f.push(g)
                    }
                    return null == e && (e = d), b.isArray(f) && !(null != f ? f.length : void 0) && e !== d ? d() : e(f, c)
                }, n = function(c, d, e, f, g, h, i, j) {
                    return r(c, j, function(j, l) {
                        var m, o, p, q;
                        for (m = d && d < j.length ? d : j.length, o = i, p = !0; p && m-- && o < (j ? j.length : o + 1);) q = k(c, j, o), p = b.isFunction(q) ? !0 : u(f, void 0, h, [q, o]), ++o;
                        if (j) {
                            if (!(p && o < j.length)) return h.resolve();
                            if (i = o, d) return null != g && _.isFunction(g) && u(g, void 0, h, []), a(function() {
                                return n(c, d, e, f, g, h, i, l)
                            }, e, !1)
                        }
                    })
                }, p = function(a, b, e, f, g, h, i) {
                    var j, k, l;
                    return null == e && (e = m), null == g && (g = 0), null == h && (h = 1), l = void 0, k = c.defer(), l = k.promise, h ? r(a, i, function() {
                        return k.resolve(), l
                    }, function(c, d) {
                        return n(a, e, h, b, f, k, g, d), l
                    }) : (j = "pause (delay) must be set from _async!", d.error(j), k.reject(j), l)
                }, w = function(a, b, d, e, f, g, h) {
                    var i;
                    return i = [], r(a, h, function() {
                        return c.resolve(i)
                    }, function(c, h) {
                        return p(a, function(a) {
                            return i.push(b(a))
                        }, d, e, f, g, h).then(function() {
                            return i
                        })
                    })
                }, {
                    each: p,
                    map: w,
                    managePromiseQueue: v,
                    promiseLock: v,
                    defaultChunkSize: m,
                    getArrayAndKeys: r,
                    chunkSizeFrom: function(a, b) {
                        return null == b && (b = void 0), _.isNumber(a) && (b = a), (g.isFalse(a) || a === !1) && (b = !1), b
                    }
                }
            }])
        }.call(this),
        function() {
            var a = [].indexOf || function(a) {
                for (var b = 0, c = this.length; c > b; b++)
                    if (b in this && this[b] === a) return b;
                return -1
            };
            b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapBaseObject", function() {
                var b, c;
                return c = ["extended", "included"], b = function() {
                    function b() {}
                    return b.extend = function(b) {
                        var d, e, f;
                        for (d in b) f = b[d], a.call(c, d) < 0 && (this[d] = f);
                        return null != (e = b.extended) && e.apply(this), this
                    }, b.include = function(b) {
                        var d, e, f;
                        for (d in b) f = b[d], a.call(c, d) < 0 && (this.prototype[d] = f);
                        return null != (e = b.included) && e.apply(this), this
                    }, b
                }()
            })
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapChildEvents", function() {
                return {
                    onChildCreation: function(a) {}
                }
            })
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapCtrlHandle", ["$q", function(a) {
                var b;
                return b = {
                    handle: function(c, d) {
                        return c.$on("$destroy", function() {
                            return b.handle(c)
                        }), c.deferred = a.defer(), {
                            getScope: function() {
                                return c
                            }
                        }
                    },
                    mapPromise: function(a, b) {
                        var c;
                        return c = b.getScope(), c.deferred.promise.then(function(b) {
                            return a.map = b
                        }), c.deferred.promise
                    }
                }
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapEventsHelper", ["uiGmapLogger", function(a) {
                var c, d;
                return d = function(a) {
                    return b.isDefined(a.events) && null != a.events && b.isObject(a.events)
                }, c = function(a, b) {
                    return d(a) ? a : d(b) ? b : void 0
                }, {
                    setEvents: function(a, d, e, f) {
                        var g;
                        return g = c(d, e), null != g ? _.compact(_.map(g.events, function(c, h) {
                            var i;
                            return f && (i = _(f).includes(h)), g.events.hasOwnProperty(h) && b.isFunction(g.events[h]) && !i ? google.maps.event.addListener(a, h, function() {
                                return d.$evalAsync || (d.$evalAsync = function() {}), d.$evalAsync(c.apply(d, [a, h, e, arguments]))
                            }) : void 0
                        })) : void 0
                    },
                    removeEvents: function(a) {
                        var b, c;
                        if (a)
                            for (b in a) c = a[b], c && a.hasOwnProperty(b) && google.maps.event.removeListener(c)
                    }
                }
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapFitHelper", ["uiGmapLogger", "$timeout", function(a, b) {
                return {
                    fit: function(a, c) {
                        var d, e, f, g, h;
                        if (c && (null != a ? a.length : void 0)) {
                            d = new google.maps.LatLngBounds, e = !1;
                            for (f in a) g = a[f], g && (e || (e = !0), h = _.isFunction(g.getPosition) ? g.getPosition() : g), d.extend(h);
                            if (e) return b(function() {
                                return c.fitBounds(d)
                            })
                        }
                    }
                }
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapGmapUtil", ["uiGmapLogger", "$compile", function(a, c) {
                var d, e, f, g, h, i;
                return e = function(a, b, c) {
                    return a === b || -1 !== c.indexOf(a)
                }, d = function(a) {
                    return e(a, !1, ["false", "FALSE", 0, "n", "N", "no", "NO"])
                }, g = function(a) {
                    return Array.isArray(a) && 2 === a.length ? a[1] : b.isDefined(a.type) && "Point" === a.type ? a.coordinates[1] : a.latitude
                }, h = function(a) {
                    return Array.isArray(a) && 2 === a.length ? a[0] : b.isDefined(a.type) && "Point" === a.type ? a.coordinates[0] : a.longitude
                }, f = function(a) {
                    return a ? a instanceof google.maps.LatLng ? a : Array.isArray(a) && 2 === a.length ? new google.maps.LatLng(a[1], a[0]) : b.isDefined(a.type) && "Point" === a.type ? new google.maps.LatLng(a.coordinates[1], a.coordinates[0]) : new google.maps.LatLng(a.latitude, a.longitude) : void 0
                }, i = function(a) {
                    if (b.isUndefined(a)) return !1;
                    if (_.isArray(a)) {
                        if (2 === a.length) return !0
                    } else if (null != a && (null != a ? a.type : void 0) && "Point" === a.type && _.isArray(a.coordinates) && 2 === a.coordinates.length) return !0;
                    return !(!a || !b.isDefined((null != a ? a.latitude : void 0) && b.isDefined(null != a ? a.longitude : void 0)))
                }, {
                    setCoordsFromEvent: function(a, c) {
                        return a ? (Array.isArray(a) && 2 === a.length ? (a[1] = c.lat(), a[0] = c.lng()) : b.isDefined(a.type) && "Point" === a.type ? (a.coordinates[1] = c.lat(), a.coordinates[0] = c.lng()) : (a.latitude = c.lat(), a.longitude = c.lng()), a) : void 0
                    },
                    getLabelPositionPoint: function(a) {
                        var b, c;
                        if (void 0 !== a) return a = /^([-\d\.]+)\s([-\d\.]+)$/.exec(a), b = parseFloat(a[1]), c = parseFloat(a[2]), null != b && null != c ? new google.maps.Point(b, c) : void 0
                    },
                    createWindowOptions: function(d, e, g, h) {
                        var i;
                        return null != g && null != h && null != c ? (i = b.extend({}, h, {
                            content: this.buildContent(e, h, g),
                            position: null != h.position ? h.position : b.isObject(d) ? d.getPosition() : f(e.coords)
                        }), null != d && null == (null != i ? i.pixelOffset : void 0) && (null == i.boxClass || (i.pixelOffset = {
                            height: 0,
                            width: -2
                        })), i) : h ? h : (a.error("infoWindow defaults not defined"), g ? void 0 : a.error("infoWindow content not defined"))
                    },
                    buildContent: function(a, b, d) {
                        var e, f;
                        return null != b.content ? f = b.content : null != c ? (d = d.replace(/^\s+|\s+$/g, ""), e = "" === d ? "" : c(d)(a), e.length > 0 && (f = e[0])) : f = d, f
                    },
                    defaultDelay: 50,
                    isTrue: function(a) {
                        return e(a, !0, ["true", "TRUE", 1, "y", "Y", "yes", "YES"])
                    },
                    isFalse: d,
                    isFalsy: function(a) {
                        return e(a, !1, [void 0, null]) || d(a)
                    },
                    getCoords: f,
                    validateCoords: i,
                    equalCoords: function(a, b) {
                        return g(a) === g(b) && h(a) === h(b)
                    },
                    validatePath: function(a) {
                        var c, d, e, f;
                        if (d = 0, b.isUndefined(a.type)) {
                            if (!Array.isArray(a) || a.length < 2) return !1;
                            for (; d < a.length;) {
                                if (!(b.isDefined(a[d].latitude) && b.isDefined(a[d].longitude) || "function" == typeof a[d].lat && "function" == typeof a[d].lng)) return !1;
                                d++
                            }
                            return !0
                        }
                        if (b.isUndefined(a.coordinates)) return !1;
                        if ("Polygon" === a.type) {
                            if (a.coordinates[0].length < 4) return !1;
                            c = a.coordinates[0]
                        } else if ("MultiPolygon" === a.type) {
                            if (f = {
                                    max: 0,
                                    index: 0
                                }, _.forEach(a.coordinates, function(a, b) {
                                    return a[0].length > this.max ? (this.max = a[0].length, this.index = b) : void 0
                                }, f), e = a.coordinates[f.index], c = e[0], c.length < 4) return !1
                        } else {
                            if ("LineString" !== a.type) return !1;
                            if (a.coordinates.length < 2) return !1;
                            c = a.coordinates
                        }
                        for (; d < c.length;) {
                            if (2 !== c[d].length) return !1;
                            d++
                        }
                        return !0
                    },
                    convertPathPoints: function(a) {
                        var c, d, e, f, g;
                        if (d = 0, f = new google.maps.MVCArray, b.isUndefined(a.type))
                            for (; d < a.length;) b.isDefined(a[d].latitude) && b.isDefined(a[d].longitude) ? e = new google.maps.LatLng(a[d].latitude, a[d].longitude) : "function" == typeof a[d].lat && "function" == typeof a[d].lng && (e = a[d]), f.push(e), d++;
                        else
                            for ("Polygon" === a.type ? c = a.coordinates[0] : "MultiPolygon" === a.type ? (g = {
                                    max: 0,
                                    index: 0
                                }, _.forEach(a.coordinates, function(a, b) {
                                    return a[0].length > this.max ? (this.max = a[0].length, this.index = b) : void 0
                                }, g), c = a.coordinates[g.index][0]) : "LineString" === a.type && (c = a.coordinates); d < c.length;) f.push(new google.maps.LatLng(c[d][1], c[d][0])), d++;
                        return f
                    },
                    getPath: function(a, b) {
                        var c;
                        return null != b && _.isString(b) ? (c = a, _.each(b.split("."), function(a) {
                            return c ? c = c[a] : void 0
                        }), c) : b
                    },
                    validateBoundPoints: function(a) {
                        return !(b.isUndefined(a.sw.latitude) || b.isUndefined(a.sw.longitude) || b.isUndefined(a.ne.latitude) || b.isUndefined(a.ne.longitude))
                    },
                    convertBoundPoints: function(a) {
                        var b;
                        return b = new google.maps.LatLngBounds(new google.maps.LatLng(a.sw.latitude, a.sw.longitude), new google.maps.LatLng(a.ne.latitude, a.ne.longitude))
                    },
                    fitMapBounds: function(a, b) {
                        return a.fitBounds(b)
                    }
                }
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapIsReady", ["$q", "$timeout", function(a, b) {
                var c, d, e, f;
                return d = 0, f = [], e = function() {
                    return a.all(f)
                }, c = function(a, f, g) {
                    return b(function() {
                        return 0 >= g ? void a.reject("Your maps are not found we have checked the maximum amount of times. :)") : void(d !== f ? c(a, f, g - 1) : a.resolve(e()))
                    }, 100)
                }, {
                    spawn: function() {
                        var b;
                        return b = a.defer(), f.push(b.promise), d += 1, {
                            instance: d,
                            deferred: b
                        }
                    },
                    promises: e,
                    instances: function() {
                        return d
                    },
                    promise: function(b, d) {
                        var e;
                        return null == b && (b = 1), null == d && (d = 50), e = a.defer(), c(e, b, d), e.promise
                    },
                    reset: function() {
                        d = 0, f.length = 0
                    },
                    decrement: function() {
                        d > 0 && (d -= 1), f.length && (f.length -= 1)
                    }
                }
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var e in b) c.call(b, e) && (a[e] = b[e]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                },
                c = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapLinked", ["uiGmapBaseObject", function(b) {
                var c;
                return c = function(b) {
                    function c(a, b, c, d) {
                        this.scope = a, this.element = b, this.attrs = c, this.ctrls = d
                    }
                    return a(c, b), c
                }(b)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapLogger", ["nemSimpleLogger", function(a) {
                return a.spawn()
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapModelKey", ["uiGmapBaseObject", "uiGmapGmapUtil", function(d, e) {
                return function(d) {
                    function f(b, c) {
                        this.scope = b, this["interface"] = null != c ? c : {
                            scopeKeys: []
                        }, this.modelsLength = a(this.modelsLength, this), this.updateChild = a(this.updateChild, this), this.destroy = a(this.destroy, this), this.setChildScope = a(this.setChildScope, this), this.getChanges = a(this.getChanges, this), this.getProp = a(this.getProp, this), this.setIdKey = a(this.setIdKey, this), this.modelKeyComparison = a(this.modelKeyComparison, this), f.__super__.constructor.call(this), this.defaultIdKey = "id", this.idKey = void 0
                    }
                    return c(f, d), f.prototype.evalModelHandle = function(a, b) {
                        return null != a && null != b ? "self" === b ? a : (_.isFunction(b) && (b = b()), e.getPath(a, b)) : void 0
                    }, f.prototype.modelKeyComparison = function(a, b) {
                        var c, d, f, g, h, i;
                        if (f = this["interface"].scopeKeys.indexOf("coords") >= 0, (f && null != this.scope.coords || !f) && (h = this.scope), null == h) throw "No scope set!";
                        return f && (c = this.scopeOrModelVal("coords", h, a), d = this.scopeOrModelVal("coords", h, b), g = e.equalCoords(c, d), !g) ? g : (i = _.without(this["interface"].scopeKeys, "coords"), g = _.every(i, function(c) {
                            return function(d) {
                                return c.scopeOrModelVal(h[d], h, a) === c.scopeOrModelVal(h[d], h, b)
                            }
                        }(this)))
                    }, f.prototype.setIdKey = function(a) {
                        return this.idKey = null != a.idKey ? a.idKey : this.defaultIdKey
                    }, f.prototype.setVal = function(a, b, c) {
                        return this.modelOrKey(a, b = c), a
                    }, f.prototype.modelOrKey = function(a, b) {
                        return null != b ? "self" !== b ? e.getPath(a, b) : a : void 0
                    }, f.prototype.getProp = function(a, b, c) {
                        return this.scopeOrModelVal(a, b, c)
                    }, f.prototype.getChanges = function(a, b, c) {
                        var d, e, f;
                        c && (b = _.pick(b, c), a = _.pick(a, c)), e = {}, f = {}, d = {};
                        for (f in a) b && b[f] === a[f] || (_.isArray(a[f]) ? e[f] = a[f] : _.isObject(a[f]) ? (d = this.getChanges(a[f], b ? b[f] : null), _.isEmpty(d) || (e[f] = d)) : e[f] = a[f]);
                        return e
                    }, f.prototype.scopeOrModelVal = function(a, b, c, d) {
                        var e, f, g, h;
                        return null == d && (d = !1), e = function(a, b, c) {
                            return null == c && (c = !1), c ? {
                                isScope: a,
                                value: b
                            } : b
                        }, h = _.get(b, a), _.isFunction(h) ? e(!0, h(c), d) : _.isObject(h) ? e(!0, h, d) : _.isString(h) ? (f = h, g = f ? "self" === f ? c : _.get(c, f) : _.get(c, a), _.isFunction(g) ? e(!1, g(), d) : e(!1, g, d)) : e(!0, h, d)
                    }, f.prototype.setChildScope = function(a, b, c) {
                        var d, e, f, g;
                        for (e in a) f = a[e], d = this.scopeOrModelVal(f, b, c, !0), null != (null != d ? d.value : void 0) && (g = d.value, g !== b[f] && (b[f] = g));
                        return b.model = c
                    }, f.prototype.onDestroy = function(a) {}, f.prototype.destroy = function(a) {
                        var b;
                        return null == a && (a = !1), null == this.scope || (null != (b = this.scope) ? b.$$destroyed : void 0) || !this.needToManualDestroy && !a ? this.clean() : this.scope.$destroy()
                    }, f.prototype.updateChild = function(a, b) {
                        return null == b[this.idKey] ? void this.$log.error("Model has no id to assign a child to. This is required for performance. Please assign id, or redirect id to a different key.") : a.updateModel(b)
                    }, f.prototype.modelsLength = function(a) {
                        var c, d;
                        return null == a && (a = void 0), c = 0, d = a ? a : this.scope.models, null == d ? c : c = b.isArray(d) || null != d.length ? d.length : Object.keys(d).length
                    }, f
                }(d)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapModelsWatcher", ["uiGmapLogger", "uiGmap_async", "$q", "uiGmapPromise", function(a, b, c, d) {
                return {
                    didQueueInitPromise: function(a, c) {
                        return 0 === c.models.length ? (b.promiseLock(a, d.promiseTypes.init, null, null, function() {
                            return d.resolve()
                        }), !0) : !1
                    },
                    figureOutState: function(b, c, d, e, f) {
                        var g, h, i, j, k;
                        return g = [], i = {}, j = [], k = [], c.models.forEach(function(f) {
                            var h;
                            return null == f[b] ? a.error(" id missing for model #{m.toString()},\ncan not use do comparison/insertion") : (i[f[b]] = {}, null == d.get(f[b]) ? g.push(f) : (h = d.get(f[b]), e(f, h.clonedModel, c) ? void 0 : k.push({
                                model: f,
                                child: h
                            })))
                        }), h = d.values(), h.forEach(function(c) {
                            var d;
                            return null == c ? void a.error("child undefined in ModelsWatcher.") : null == c.model ? void a.error("child.model undefined in ModelsWatcher.") : (d = c.model[b], null == i[d] ? j.push(c) : void 0)
                        }), {
                            adds: g,
                            removals: j,
                            updates: k
                        }
                    }
                }
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapPromise", ["$q", "$timeout", "uiGmapLogger", function(a, b, c) {
                var d, e, f, g, h, i, j, k, l, m, n;
                return l = {
                    create: "create",
                    update: "update",
                    "delete": "delete",
                    init: "init"
                }, k = {
                    IN_PROGRESS: 0,
                    RESOLVED: 1,
                    REJECTED: 2
                }, n = function() {
                    var a;
                    return a = {}, a["" + k.IN_PROGRESS] = "in-progress", a["" + k.RESOLVED] = "resolved", a["" + k.REJECTED] = "rejected", a
                }(), g = function(a) {
                    return a.$$state ? a.$$state.status === k.IN_PROGRESS : a.hasOwnProperty("$$v") ? void 0 : !0
                }, h = function(a) {
                    return a.$$state ? a.$$state.status === k.RESOLVED : a.hasOwnProperty("$$v") ? !0 : void 0
                }, j = function(a) {
                    return n[a] || "done w error"
                }, d = function(b) {
                    var c, d, e;
                    return c = a.defer(), d = a.all([b, c.promise]), e = a.defer(), b.then(c.resolve, function() {}, function(a) {
                        return c.notify(a), e.notify(a)
                    }), d.then(function(a) {
                        return e.resolve(a[0] || a[1])
                    }, function(a) {
                        return e.reject(a)
                    }), e.promise.cancel = function(a) {
                        return null == a && (a = "canceled"), c.reject(a)
                    }, e.promise.notify = function(a) {
                        return null == a && (a = "cancel safe"), e.notify(a), b.hasOwnProperty("notify") ? b.notify(a) : void 0
                    }, null != b.promiseType && (e.promise.promiseType = b.promiseType), e.promise
                }, e = function(a, b) {
                    return {
                        promise: a,
                        promiseType: b
                    }
                }, f = function() {
                    return a.defer()
                }, m = function() {
                    var b;
                    return b = a.defer(), b.resolve.apply(void 0, arguments), b.promise
                }, i = function(d) {
                    var e;
                    return _.isFunction(d) ? (e = a.defer(), b(function() {
                        var a;
                        return a = d(), e.resolve(a)
                    }), e.promise) : void c.error("uiGmapPromise.promise() only accepts functions")
                }, {
                    defer: f,
                    promise: i,
                    resolve: m,
                    promiseTypes: l,
                    isInProgress: g,
                    isResolved: h,
                    promiseStatus: j,
                    ExposedPromise: d,
                    SniffedPromise: e
                }
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            };
            b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapPropMap", function() {
                var b;
                return b = function() {
                    function b() {
                        this.removeAll = a(this.removeAll, this), this.slice = a(this.slice, this), this.push = a(this.push, this), this.keys = a(this.keys, this), this.values = a(this.values, this), this.remove = a(this.remove, this), this.put = a(this.put, this), this.stateChanged = a(this.stateChanged, this), this.get = a(this.get, this), this.length = 0, this.dict = {}, this.didValsStateChange = !1, this.didKeysStateChange = !1, this.allVals = [], this.allKeys = []
                    }
                    return b.prototype.get = function(a) {
                        return this.dict[a]
                    }, b.prototype.stateChanged = function() {
                        return this.didValsStateChange = !0, this.didKeysStateChange = !0
                    }, b.prototype.put = function(a, b) {
                        return null == this.get(a) && this.length++, this.stateChanged(), this.dict[a] = b
                    }, b.prototype.remove = function(a, b) {
                        var c;
                        return null == b && (b = !1), !b || this.get(a) ? (c = this.dict[a], delete this.dict[a], this.length--, this.stateChanged(), c) : void 0
                    }, b.prototype.valuesOrKeys = function(a) {
                        var b, c;
                        return null == a && (a = "Keys"), this["did" + a + "StateChange"] ? (c = [], b = [], _.each(this.dict, function(a, d) {
                            return c.push(a), b.push(d)
                        }), this.didKeysStateChange = !1, this.didValsStateChange = !1, this.allVals = c, this.allKeys = b, this["all" + a]) : this["all" + a]
                    }, b.prototype.values = function() {
                        return this.valuesOrKeys("Vals")
                    }, b.prototype.keys = function() {
                        return this.valuesOrKeys()
                    }, b.prototype.push = function(a, b) {
                        return null == b && (b = "key"), this.put(a[b], a)
                    }, b.prototype.slice = function() {
                        return this.keys().map(function(a) {
                            return function(b) {
                                return a.remove(b)
                            }
                        }(this))
                    }, b.prototype.removeAll = function() {
                        return this.slice()
                    }, b.prototype.each = function(a) {
                        return _.each(this.dict, function(b, c) {
                            return a(b)
                        })
                    }, b.prototype.map = function(a) {
                        return _.map(this.dict, function(b, c) {
                            return a(b)
                        })
                    }, b
                }()
            })
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapPropertyAction", ["uiGmapLogger", function(a) {
                var b;
                return b = function(a) {
                    return this.setIfChange = function(b) {
                        return function(c, d) {
                            return _.isEqual(d, c) ? void 0 : a(b, c)
                        }
                    }, this.sic = this.setIfChange, this
                }
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            };
            b.module("uiGmapgoogle-maps.directives.api.managers").factory("uiGmapClustererMarkerManager", ["uiGmapLogger", "uiGmapFitHelper", "uiGmapPropMap", "uiGmapEventsHelper", function(c, d, e, f) {
                var g;
                return g = function() {
                    function g(b, d, f, h) {
                        null == d && (d = {}), this.opt_options = null != f ? f : {}, this.opt_events = h, this.checkSync = a(this.checkSync, this), this.getGMarkers = a(this.getGMarkers, this), this.fit = a(this.fit, this), this.destroy = a(this.destroy, this), this.attachEvents = a(this.attachEvents, this), this.clear = a(this.clear, this), this.draw = a(this.draw, this), this.removeMany = a(this.removeMany, this), this.remove = a(this.remove, this), this.addMany = a(this.addMany, this), this.update = a(this.update, this), this.add = a(this.add, this), this.type = g.type, this.clusterer = new NgMapMarkerClusterer(b, d, this.opt_options), this.propMapGMarkers = new e, this.attachEvents(this.opt_events, "opt_events"), this.clusterer.setIgnoreHidden(!0), this.noDrawOnSingleAddRemoves = !0, c.info(this)
                    }
                    return g.type = "ClustererMarkerManager", g.prototype.checkKey = function(a) {
                        var b;
                        return null == a.key ? (b = "gMarker.key undefined and it is REQUIRED!!", c.error(b)) : void 0
                    }, g.prototype.add = function(a) {
                        return this.checkKey(a), this.clusterer.addMarker(a, this.noDrawOnSingleAddRemoves), this.propMapGMarkers.put(a.key, a), this.checkSync()
                    }, g.prototype.update = function(a) {
                        return this.remove(a), this.add(a)
                    }, g.prototype.addMany = function(a) {
                        return a.forEach(function(a) {
                            return function(b) {
                                return a.add(b)
                            }
                        }(this))
                    }, g.prototype.remove = function(a) {
                        var b;
                        return this.checkKey(a), b = this.propMapGMarkers.get(a.key), b && (this.clusterer.removeMarker(a, this.noDrawOnSingleAddRemoves), this.propMapGMarkers.remove(a.key)), this.checkSync()
                    }, g.prototype.removeMany = function(a) {
                        return a.forEach(function(a) {
                            return function(b) {
                                return a.remove(b)
                            }
                        }(this))
                    }, g.prototype.draw = function() {
                        return this.clusterer.repaint()
                    }, g.prototype.clear = function() {
                        return this.removeMany(this.getGMarkers()), this.clusterer.repaint()
                    }, g.prototype.attachEvents = function(a, d) {
                        var e, f, g;
                        if (this.listeners = [], b.isDefined(a) && null != a && b.isObject(a)) {
                            g = [];
                            for (f in a) e = a[f], a.hasOwnProperty(f) && b.isFunction(a[f]) ? (c.info(d + ": Attaching event: " + f + " to clusterer"), g.push(this.listeners.push(google.maps.event.addListener(this.clusterer, f, a[f])))) : g.push(void 0);
                            return g
                        }
                    }, g.prototype.clearEvents = function() {
                        return f.removeEvents(this.listeners), this.listeners = []
                    }, g.prototype.destroy = function() {
                        return this.clearEvents(), this.clear()
                    }, g.prototype.fit = function() {
                        return d.fit(this.getGMarkers(), this.clusterer.getMap())
                    }, g.prototype.getGMarkers = function() {
                        return this.clusterer.getMarkers().values()
                    }, g.prototype.checkSync = function() {}, g
                }()
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.managers").service("uiGmapGoogleMapObjectManager", [function() {
                var a, c;
                return a = [], c = [], {
                    createMapInstance: function(d, e) {
                        var f;
                        return f = null, 0 === a.length ? (f = new google.maps.Map(d, e), c.push(f)) : (f = a.pop(), b.element(d).append(f.getDiv()), f.setOptions(e), c.push(f)), f
                    },
                    recycleMapInstance: function(b) {
                        var d;
                        if (d = c.indexOf(b), 0 > d) throw new Error("Expected map instance to be a previously used instance");
                        return c.splice(d, 1), a.push(b)
                    }
                }
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            };
            b.module("uiGmapgoogle-maps.directives.api.managers").factory("uiGmapMarkerManager", ["uiGmapLogger", "uiGmapFitHelper", "uiGmapPropMap", function(b, c, d) {
                var e;
                return e = function() {
                    function e(c, f, g) {
                        this.getGMarkers = a(this.getGMarkers, this), this.fit = a(this.fit, this), this.handleOptDraw = a(this.handleOptDraw, this), this.clear = a(this.clear, this), this.destroy = a(this.destroy, this), this.draw = a(this.draw, this), this.removeMany = a(this.removeMany, this), this.remove = a(this.remove, this), this.addMany = a(this.addMany, this), this.update = a(this.update, this), this.add = a(this.add, this), this.type = e.type, this.gMap = c, this.gMarkers = new d, this.$log = b, this.$log.info(this)
                    }
                    return e.type = "MarkerManager", e.prototype.add = function(a, c) {
                        var d, e;
                        if (null == c && (c = !0), null == a.key) throw e = "gMarker.key undefined and it is REQUIRED!!", b.error(e), e;
                        return d = this.gMarkers.get(a.key), d ? void 0 : (this.handleOptDraw(a, c, !0), this.gMarkers.put(a.key, a))
                    }, e.prototype.update = function(a, b) {
                        return null == b && (b = !0), this.remove(a, b), this.add(a, b)
                    }, e.prototype.addMany = function(a) {
                        return a.forEach(function(a) {
                            return function(b) {
                                return a.add(b)
                            }
                        }(this))
                    }, e.prototype.remove = function(a, b) {
                        return null == b && (b = !0), this.handleOptDraw(a, b, !1), this.gMarkers.get(a.key) ? this.gMarkers.remove(a.key) : void 0
                    }, e.prototype.removeMany = function(a) {
                        return a.forEach(function(a) {
                            return function(b) {
                                return a.remove(b)
                            }
                        }(this))
                    }, e.prototype.draw = function() {
                        var a;
                        return a = [], this.gMarkers.each(function(b) {
                            return function(c) {
                                return c.isDrawn ? void 0 : c.doAdd ? (c.setMap(b.gMap), c.isDrawn = !0) : a.push(c)
                            }
                        }(this)), a.forEach(function(a) {
                            return function(b) {
                                return b.isDrawn = !1, a.remove(b, !0);
                            }
                        }(this))
                    }, e.prototype.destroy = function() {
                        return this.clear()
                    }, e.prototype.clear = function() {
                        return this.gMarkers.each(function(a) {
                            return a.setMap(null)
                        }), delete this.gMarkers, this.gMarkers = new d
                    }, e.prototype.handleOptDraw = function(a, b, c) {
                        return b === !0 ? (c ? a.setMap(this.gMap) : a.setMap(null), a.isDrawn = !0) : (a.isDrawn = !1, a.doAdd = c)
                    }, e.prototype.fit = function() {
                        return c.fit(this.getGMarkers(), this.gMap)
                    }, e.prototype.getGMarkers = function() {
                        return this.gMarkers.values()
                    }, e
                }()
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            };
            b.module("uiGmapgoogle-maps.directives.api.managers").factory("uiGmapSpiderfierMarkerManager", ["uiGmapLogger", "uiGmapFitHelper", "uiGmapPropMap", "uiGmapMarkerSpiderfier", function(c, d, e, f) {
                var g;
                return g = function() {
                    function g(b, d, h, i, j) {
                        null == d && (d = {}), this.opt_options = null != h ? h : {}, this.opt_events = i, this.scope = j, this.checkSync = a(this.checkSync, this), this.isSpiderfied = a(this.isSpiderfied, this), this.getGMarkers = a(this.getGMarkers, this), this.fit = a(this.fit, this), this.destroy = a(this.destroy, this), this.attachEvents = a(this.attachEvents, this), this.clear = a(this.clear, this), this.draw = a(this.draw, this), this.removeMany = a(this.removeMany, this), this.remove = a(this.remove, this), this.addMany = a(this.addMany, this), this.update = a(this.update, this), this.add = a(this.add, this), this.type = g.type, this.markerSpiderfier = new f(b, this.opt_options), this.propMapGMarkers = new e, this.attachEvents(this.opt_events, "opt_events"), this.noDrawOnSingleAddRemoves = !0, c.info(this)
                    }
                    return g.type = "SpiderfierMarkerManager", g.prototype.checkKey = function(a) {
                        var b;
                        return null == a.key ? (b = "gMarker.key undefined and it is REQUIRED!!", c.error(b)) : void 0
                    }, g.prototype.add = function(a) {
                        return a.setMap(this.markerSpiderfier.map), this.checkKey(a), this.markerSpiderfier.addMarker(a, this.noDrawOnSingleAddRemoves), this.propMapGMarkers.put(a.key, a), this.checkSync()
                    }, g.prototype.update = function(a) {
                        return this.remove(a), this.add(a)
                    }, g.prototype.addMany = function(a) {
                        return a.forEach(function(a) {
                            return function(b) {
                                return a.add(b)
                            }
                        }(this))
                    }, g.prototype.remove = function(a) {
                        var b;
                        return this.checkKey(a), b = this.propMapGMarkers.get(a.key), b && (a.setMap(null), this.markerSpiderfier.removeMarker(a, this.noDrawOnSingleAddRemoves), this.propMapGMarkers.remove(a.key)), this.checkSync()
                    }, g.prototype.removeMany = function(a) {
                        return a.forEach(function(a) {
                            return function(b) {
                                return a.remove(b)
                            }
                        }(this))
                    }, g.prototype.draw = function() {}, g.prototype.clear = function() {
                        return this.removeMany(this.getGMarkers())
                    }, g.prototype.attachEvents = function(a, d) {
                        return b.isDefined(a) && null != a && b.isObject(a) ? _.each(a, function(e) {
                            return function(f, g) {
                                return a.hasOwnProperty(g) && b.isFunction(a[g]) ? (c.info(d + ": Attaching event: " + g + " to markerSpiderfier"), e.markerSpiderfier.addListener(g, function() {
                                    return "spiderfy" === g || "unspiderfy" === g ? e.scope.$evalAsync(a[g].apply(a, arguments)) : e.scope.$evalAsync(a[g].apply(a, [arguments[0], g, arguments[0].model, arguments]))
                                })) : void 0
                            }
                        }(this)) : void 0
                    }, g.prototype.clearEvents = function(a, d) {
                        var e, f;
                        if (b.isDefined(a) && null != a && b.isObject(a))
                            for (f in a) e = a[f], a.hasOwnProperty(f) && b.isFunction(a[f]) && (c.info(d + ": Clearing event: " + f + " to markerSpiderfier"), this.markerSpiderfier.clearListeners(f))
                    }, g.prototype.destroy = function() {
                        return this.clearEvents(this.opt_events, "opt_events"), this.clear()
                    }, g.prototype.fit = function() {
                        return d.fit(this.getGMarkers(), this.markerSpiderfier.map)
                    }, g.prototype.getGMarkers = function() {
                        return this.markerSpiderfier.getMarkers()
                    }, g.prototype.isSpiderfied = function() {
                        return _.find(this.getGMarkers(), function(a) {
                            return null != (null != a ? a._omsData : void 0)
                        })
                    }, g.prototype.checkSync = function() {}, g
                }()
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").factory("uiGmapadd-events", ["$timeout", function(a) {
                var c, d;
                return c = function(b, c, d) {
                    return google.maps.event.addListener(b, c, function() {
                        return d.apply(this, arguments), a(function() {}, !0)
                    })
                }, d = function(a, d, e) {
                    var f;
                    return e ? c(a, d, e) : (f = [], b.forEach(d, function(b, d) {
                        return f.push(c(a, d, b))
                    }), function() {
                        return b.forEach(f, function(a) {
                            return google.maps.event.removeListener(a)
                        }), f = null
                    })
                }
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").factory("uiGmaparray-sync", ["uiGmapadd-events", function(a) {
                return function(c, d, e, f) {
                    var g, h, i, j, k, l, m, n, o;
                    return j = !1, n = d.$eval(e), d["static"] || (k = {
                            set_at: function(a) {
                                var b;
                                if (!j && (b = c.getAt(a))) return b.lng && b.lat ? (n[a].latitude = b.lat(), n[a].longitude = b.lng()) : n[a] = b
                            },
                            insert_at: function(a) {
                                var b;
                                if (!j && (b = c.getAt(a))) return b.lng && b.lat ? n.splice(a, 0, {
                                    latitude: b.lat(),
                                    longitude: b.lng()
                                }) : n.splice(a, 0, b)
                            },
                            remove_at: function(a) {
                                return j ? void 0 : n.splice(a, 1)
                            }
                        }, "Polygon" === n.type ? g = n.coordinates[0] : "LineString" === n.type && (g = n.coordinates), h = {
                            set_at: function(a) {
                                var b;
                                if (!j && (b = c.getAt(a), b && b.lng && b.lat)) return g[a][1] = b.lat(), g[a][0] = b.lng()
                            },
                            insert_at: function(a) {
                                var b;
                                if (!j && (b = c.getAt(a), b && b.lng && b.lat)) return g.splice(a, 0, [b.lng(), b.lat()])
                            },
                            remove_at: function(a) {
                                return j ? void 0 : g.splice(a, 1)
                            }
                        }, m = a(c, b.isUndefined(n.type) ? k : h)), l = function(a) {
                            var b, d, e, g, h, i, k, l;
                            if (j = !0, i = c, b = !1, a) {
                                for (d = 0, k = i.getLength(), g = a.length, e = Math.min(k, g), h = void 0; e > d;) l = i.getAt(d), h = a[d], "function" == typeof h.equals ? h.equals(l) || (i.setAt(d, h), b = !0) : l.lat() === h.latitude && l.lng() === h.longitude || (i.setAt(d, new google.maps.LatLng(h.latitude, h.longitude)), b = !0), d++;
                                for (; g > d;) h = a[d], "function" == typeof h.lat && "function" == typeof h.lng ? i.push(h) : i.push(new google.maps.LatLng(h.latitude, h.longitude)), b = !0, d++;
                                for (; k > d;) i.pop(), b = !0, d++
                            }
                            return j = !1, b ? f(i) : void 0
                        }, i = function(a) {
                            var b, d, e, g, h, i, k, l, m;
                            if (j = !0, k = c, d = !1, a) {
                                for ("Polygon" === n.type ? b = a.coordinates[0] : "LineString" === n.type && (b = a.coordinates), e = 0, l = k.getLength(), h = b.length, g = Math.min(l, h), i = void 0; g > e;) m = k.getAt(e), i = b[e], m.lat() === i[1] && m.lng() === i[0] || (k.setAt(e, new google.maps.LatLng(i[1], i[0])), d = !0), e++;
                                for (; h > e;) i = b[e], k.push(new google.maps.LatLng(i[1], i[0])), d = !0, e++;
                                for (; l > e;) k.pop(), d = !0, e++
                            }
                            return j = !1, d ? f(k) : void 0
                        }, d["static"] || (o = b.isUndefined(n.type) ? d.$watchCollection(e, l) : d.$watch(e, i, !0)),
                        function() {
                            return m && (m(), m = null), o ? (o(), o = null) : void 0
                        }
                }
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapChromeFixes", ["$timeout", function(a) {
                return {
                    maybeRepaint: function(b) {
                        return b ? (b.style.opacity = .9, a(function() {
                            return b.style.opacity = 1
                        })) : void 0
                    }
                }
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").service("uiGmapObjectIterators", function() {
                var a, b, c, d;
                return a = ["length", "forEach", "map"], b = [], c = function(b) {
                    return b.forEach = function(c) {
                        return _.each(_.omit(b, a), function(a) {
                            return _.isFunction(a) ? void 0 : c(a)
                        })
                    }, b
                }, b.push(c), d = function(b) {
                    return b.map = function(c) {
                        return _.map(_.omit(b, a), function(a) {
                            return _.isFunction(a) ? void 0 : c(a)
                        })
                    }, b
                }, b.push(d), {
                    slapMap: d,
                    slapForEach: c,
                    slapAll: function(a) {
                        return b.forEach(function(b) {
                            return b(a)
                        }), a
                    }
                }
            })
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.options.builders").service("uiGmapCommonOptionsBuilder", ["uiGmapBaseObject", "uiGmapLogger", "uiGmapModelKey", function(d, e, f) {
                var g;
                return g = function(d) {
                    function f() {
                        return this.watchProps = a(this.watchProps, this), this.buildOpts = a(this.buildOpts, this), f.__super__.constructor.apply(this, arguments)
                    }
                    return c(f, d), f.prototype.props = ["clickable", "draggable", "editable", "visible", {
                        prop: "stroke",
                        isColl: !0
                    }], f.prototype.getCorrectModel = function(a) {
                        return b.isDefined(null != a ? a.model : void 0) ? a.model : a
                    }, f.prototype.buildOpts = function(a, c, d) {
                        var f, g, h;
                        return null == a && (a = {}), null == d && (d = {}), this.scope ? this.gMap ? (f = this.getCorrectModel(this.scope), h = this.scopeOrModelVal("stroke", this.scope, f), g = b.extend(a, this.DEFAULTS, {
                            map: this.gMap,
                            strokeColor: null != h ? h.color : void 0,
                            strokeOpacity: null != h ? h.opacity : void 0,
                            strokeWeight: null != h ? h.weight : void 0
                        }), b.forEach(b.extend(d, {
                            clickable: !0,
                            draggable: !1,
                            editable: !1,
                            "static": !1,
                            fit: !1,
                            visible: !0,
                            zIndex: 0,
                            icons: []
                        }), function(a) {
                            return function(d, e) {
                                var h;
                                return h = c ? c[e] : a.scopeOrModelVal(e, a.scope, f), b.isUndefined(h) ? g[e] = d : g[e] = f[e]
                            }
                        }(this)), g["static"] && (g.editable = !1), g) : void e.error("this.map not defined in CommonOptionsBuilder can not buildOpts") : void e.error("this.scope not defined in CommonOptionsBuilder can not buildOpts")
                    }, f.prototype.watchProps = function(a) {
                        return null == a && (a = this.props), a.forEach(function(a) {
                            return function(b) {
                                return null != a.attrs[b] || null != a.attrs[null != b ? b.prop : void 0] ? (null != b ? b.isColl : void 0) ? a.scope.$watchCollection(b.prop, a.setMyOptions) : a.scope.$watch(b, a.setMyOptions) : void 0
                            }
                        }(this))
                    }, f
                }(f)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var e in b) c.call(b, e) && (a[e] = b[e]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                },
                c = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.options.builders").factory("uiGmapPolylineOptionsBuilder", ["uiGmapCommonOptionsBuilder", function(b) {
                var c;
                return c = function(b) {
                    function c() {
                        return c.__super__.constructor.apply(this, arguments)
                    }
                    return a(c, b), c.prototype.buildOpts = function(a, b) {
                        return c.__super__.buildOpts.call(this, {
                            path: a
                        }, b, {
                            geodesic: !1
                        })
                    }, c
                }(b)
            }]).factory("uiGmapShapeOptionsBuilder", ["uiGmapCommonOptionsBuilder", function(c) {
                var d;
                return d = function(c) {
                    function d() {
                        return d.__super__.constructor.apply(this, arguments)
                    }
                    return a(d, c), d.prototype.buildOpts = function(a, c, e) {
                        var f, g;
                        return g = this.getCorrectModel(this.scope), f = c ? c.fill : this.scopeOrModelVal("fill", this.scope, g), a = b.extend(a, {
                            fillColor: null != f ? f.color : void 0,
                            fillOpacity: null != f ? f.opacity : void 0
                        }), d.__super__.buildOpts.call(this, a, c, e)
                    }, d
                }(c)
            }]).factory("uiGmapPolygonOptionsBuilder", ["uiGmapShapeOptionsBuilder", function(b) {
                var c;
                return c = function(b) {
                    function c() {
                        return c.__super__.constructor.apply(this, arguments)
                    }
                    return a(c, b), c.prototype.buildOpts = function(a, b) {
                        return c.__super__.buildOpts.call(this, {
                            path: a
                        }, b, {
                            geodesic: !1
                        })
                    }, c
                }(b)
            }]).factory("uiGmapRectangleOptionsBuilder", ["uiGmapShapeOptionsBuilder", function(b) {
                var c;
                return c = function(b) {
                    function c() {
                        return c.__super__.constructor.apply(this, arguments)
                    }
                    return a(c, b), c.prototype.buildOpts = function(a, b) {
                        return c.__super__.buildOpts.call(this, {
                            bounds: a
                        }, b)
                    }, c
                }(b)
            }]).factory("uiGmapCircleOptionsBuilder", ["uiGmapShapeOptionsBuilder", function(b) {
                var c;
                return c = function(b) {
                    function c() {
                        return c.__super__.constructor.apply(this, arguments)
                    }
                    return a(c, b), c.prototype.buildOpts = function(a, b, d) {
                        return c.__super__.buildOpts.call(this, {
                            center: a,
                            radius: b
                        }, d)
                    }, c
                }(b)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.options").service("uiGmapMarkerOptions", ["uiGmapLogger", "uiGmapGmapUtil", function(a, c) {
                return _.extend(c, {
                    createOptions: function(a, d, e, f) {
                        var g;
                        return null == e && (e = {}), g = b.extend({}, e, {
                            position: null != e.position ? e.position : c.getCoords(a),
                            visible: null != e.visible ? e.visible : c.validateCoords(a)
                        }), null == e.icon && null == d || (g = b.extend(g, {
                            icon: null != e.icon ? e.icon : d
                        })), null != f && (g.map = f), g
                    },
                    isLabel: function(a) {
                        return null == a ? !1 : null != a.labelContent || null != a.labelAnchor || null != a.labelClass || null != a.labelStyle || null != a.labelVisible
                    }
                })
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapBasePolyChildModel", ["uiGmapLogger", "$timeout", "uiGmaparray-sync", "uiGmapGmapUtil", "uiGmapEventsHelper", function(d, e, f, g, h) {
                return function(d, e) {
                    var i;
                    return i = function(d) {
                        function i(c) {
                            var d, g, i;
                            this.scope = c.scope, this.attrs = c.attrs, this.gMap = c.gMap, this.defaults = c.defaults, this.model = c.model, g = c.gObjectChangeCb, this.isScopeModel = null != (i = c.isScopeModel) ? i : !1, this.clean = a(this.clean, this), this.isScopeModel && (this.clonedModel = _.clone(this.model, !0)), this.isDragging = !1, this.internalEvents = {
                                dragend: function(a) {
                                    return function() {
                                        return _.defer(function() {
                                            return a.isDragging = !1
                                        })
                                    }
                                }(this),
                                dragstart: function(a) {
                                    return function() {
                                        return a.isDragging = !0
                                    }
                                }(this)
                            }, d = function(a) {
                                return function() {
                                    var c;
                                    if (!a.isDragging) return a.pathPoints = a.convertPathPoints(a.scope.path), null != a.gObject && a.clean(), null != a.scope.model && (c = a.scope), a.pathPoints.length > 0 && (a.gObject = e(a.buildOpts(a.pathPoints, c))), a.gObject ? (f(a.gObject.getPath(), a.scope, "path", function(b) {
                                        return a.pathPoints = b, null != g ? g() : void 0
                                    }), b.isDefined(a.scope.events) && b.isObject(a.scope.events) && (a.listeners = a.model ? h.setEvents(a.gObject, a.scope, a.model) : h.setEvents(a.gObject, a.scope, a.scope)), a.internalListeners = a.model ? h.setEvents(a.gObject, {
                                        events: a.internalEvents
                                    }, a.model) : h.setEvents(a.gObject, {
                                        events: a.internalEvents
                                    }, a.scope)) : void 0
                                }
                            }(this), d(), this.scope.$watch("path", function(a) {
                                return function(b, c) {
                                    return _.isEqual(b, c) && a.gObject ? void 0 : d()
                                }
                            }(this), !0), !this.scope["static"] && b.isDefined(this.scope.editable) && this.scope.$watch("editable", function(a) {
                                return function(b, c) {
                                    var d;
                                    return b !== c ? (b = !a.isFalse(b), null != (d = a.gObject) ? d.setEditable(b) : void 0) : void 0
                                }
                            }(this), !0), b.isDefined(this.scope.draggable) && this.scope.$watch("draggable", function(a) {
                                return function(b, c) {
                                    var d;
                                    return b !== c ? (b = !a.isFalse(b), null != (d = a.gObject) ? d.setDraggable(b) : void 0) : void 0
                                }
                            }(this), !0), b.isDefined(this.scope.visible) && this.scope.$watch("visible", function(a) {
                                return function(b, c) {
                                    var d;
                                    return b !== c && (b = !a.isFalse(b)), null != (d = a.gObject) ? d.setVisible(b) : void 0
                                }
                            }(this), !0), b.isDefined(this.scope.geodesic) && this.scope.$watch("geodesic", function(a) {
                                return function(b, c) {
                                    var d;
                                    return b !== c ? (b = !a.isFalse(b), null != (d = a.gObject) ? d.setOptions(a.buildOpts(a.gObject.getPath())) : void 0) : void 0
                                }
                            }(this), !0), b.isDefined(this.scope.stroke) && b.isDefined(this.scope.stroke.weight) && this.scope.$watch("stroke.weight", function(a) {
                                return function(b, c) {
                                    var d;
                                    return b !== c && null != (d = a.gObject) ? d.setOptions(a.buildOpts(a.gObject.getPath())) : void 0
                                }
                            }(this), !0), b.isDefined(this.scope.stroke) && b.isDefined(this.scope.stroke.color) && this.scope.$watch("stroke.color", function(a) {
                                return function(b, c) {
                                    var d;
                                    return b !== c && null != (d = a.gObject) ? d.setOptions(a.buildOpts(a.gObject.getPath())) : void 0
                                }
                            }(this), !0), b.isDefined(this.scope.stroke) && b.isDefined(this.scope.stroke.opacity) && this.scope.$watch("stroke.opacity", function(a) {
                                return function(b, c) {
                                    var d;
                                    return b !== c && null != (d = a.gObject) ? d.setOptions(a.buildOpts(a.gObject.getPath())) : void 0
                                }
                            }(this), !0), b.isDefined(this.scope.icons) && this.scope.$watch("icons", function(a) {
                                return function(b, c) {
                                    var d;
                                    return b !== c && null != (d = a.gObject) ? d.setOptions(a.buildOpts(a.gObject.getPath())) : void 0
                                }
                            }(this), !0), this.scope.$on("$destroy", function(a) {
                                return function() {
                                    return a.clean(), a.scope = null
                                }
                            }(this)), b.isDefined(this.scope.fill) && b.isDefined(this.scope.fill.color) && this.scope.$watch("fill.color", function(a) {
                                return function(b, c) {
                                    return b !== c ? a.gObject.setOptions(a.buildOpts(a.gObject.getPath())) : void 0
                                }
                            }(this)), b.isDefined(this.scope.fill) && b.isDefined(this.scope.fill.opacity) && this.scope.$watch("fill.opacity", function(a) {
                                return function(b, c) {
                                    return b !== c ? a.gObject.setOptions(a.buildOpts(a.gObject.getPath())) : void 0
                                }
                            }(this)), b.isDefined(this.scope.zIndex) && this.scope.$watch("zIndex", function(a) {
                                return function(b, c) {
                                    return b !== c ? a.gObject.setOptions(a.buildOpts(a.gObject.getPath())) : void 0
                                }
                            }(this))
                        }
                        return c(i, d), i.include(g), i.prototype.clean = function() {
                            var a;
                            return h.removeEvents(this.listeners), h.removeEvents(this.internalListeners), null != (a = this.gObject) && a.setMap(null), this.gObject = null
                        }, i
                    }(d)
                }
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api.models.child").factory("uiGmapDrawFreeHandChildModel", ["uiGmapLogger", "$q", function(a, b) {
                var c, d;
                return c = function(a, b, c) {
                    var d, e;
                    e = new google.maps.Polyline({
                        map: a,
                        clickable: !1
                    }), d = google.maps.event.addListener(a, "mousemove", function(a) {
                        return e.getPath().push(a.latLng)
                    }), google.maps.event.addListenerOnce(a, "mouseup", function(f) {
                        var g;
                        return google.maps.event.removeListener(d), g = e.getPath(), e.setMap(null), b.push(new google.maps.Polygon({
                            map: a,
                            path: g
                        })), e = null, google.maps.event.clearListeners(a.getDiv(), "mousedown"), c()
                    })
                }, d = function(d, e) {
                    var f, g;
                    return this.map = d, f = function(b) {
                        return function() {
                            var c;
                            return c = {
                                draggable: !1,
                                disableDefaultUI: !0,
                                scrollwheel: !1,
                                disableDoubleClickZoom: !1
                            }, a.info("disabling map move"), b.map.setOptions(c)
                        }
                    }(this), g = function(a) {
                        return function() {
                            var b, c;
                            return b = {
                                draggable: !0,
                                disableDefaultUI: !1,
                                scrollwheel: !0,
                                disableDoubleClickZoom: !0
                            }, null != (c = a.deferred) && c.resolve(), _.defer(function() {
                                return a.map.setOptions(_.extend(b, e.options))
                            })
                        }
                    }(this), this.engage = function(d) {
                        return function(e) {
                            return d.polys = e, d.deferred = b.defer(), f(), a.info("DrawFreeHandChildModel is engaged (drawing)."), google.maps.event.addDomListener(d.map.getDiv(), "mousedown", function(a) {
                                return c(d.map, d.polys, g)
                            }), d.deferred.promise
                        }
                    }(this), this
                }
            }])
        }.call(this),
        function() {
            var c = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                d = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var d in b) e.call(b, d) && (a[d] = b[d]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                e = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.child").factory("uiGmapMarkerChildModel", ["uiGmapModelKey", "uiGmapGmapUtil", "uiGmapLogger", "uiGmapEventsHelper", "uiGmapPropertyAction", "uiGmapMarkerOptions", "uiGmapIMarker", "uiGmapMarkerManager", "uiGmapPromise", function(e, f, g, h, i, j, k, l, m) {
                var n;
                return n = function(e) {
                    function n(a) {
                        this.internalEvents = c(this.internalEvents, this), this.setLabelOptions = c(this.setLabelOptions, this), this.setOptions = c(this.setOptions, this), this.setIcon = c(this.setIcon, this), this.setCoords = c(this.setCoords, this), this.isNotValid = c(this.isNotValid, this), this.maybeSetScopeValue = c(this.maybeSetScopeValue, this), this.createMarker = c(this.createMarker, this), this.setMyScope = c(this.setMyScope, this), this.updateModel = c(this.updateModel, this), this.handleModelChanges = c(this.handleModelChanges, this), this.destroy = c(this.destroy, this);
                        var b, d, e, f, h, j, k;
                        k = a.scope, this.model = a.model, this.keys = a.keys, this.gMap = a.gMap, this.defaults = null != (d = a.defaults) ? d : {}, this.doClick = a.doClick, this.gManager = a.gManager, this.doDrawSelf = null != (e = a.doDrawSelf) ? e : !0, this.trackModel = null != (f = a.trackModel) ? f : !0, this.needRedraw = null != (h = a.needRedraw) ? h : !1, this.isScopeModel = null != (j = a.isScopeModel) ? j : !1, this.isScopeModel && (this.clonedModel = _.clone(this.model, !0)), this.deferred = m.defer(), _.each(this.keys, function(a) {
                            return function(b, c) {
                                var d;
                                return d = a.keys[c], null != d && !_.isFunction(d) && _.isString(d) ? a[c + "Key"] = d : void 0
                            }
                        }(this)), this.idKey = this.idKeyKey || "id", null != this.model[this.idKey] && (this.id = this.model[this.idKey]), n.__super__.constructor.call(this, k), this.scope.getGMarker = function(a) {
                            return function() {
                                return a.gObject
                            }
                        }(this), this.firstTime = !0, this.trackModel ? (this.scope.model = this.model, this.scope.$watch("model", function(a) {
                            return function(b, c) {
                                return b !== c ? a.handleModelChanges(b, c) : void 0
                            }
                        }(this), !0)) : (b = new i(function(a) {
                            return function(b) {
                                return _.isFunction(b) && (b = "all"), a.firstTime ? void 0 : a.setMyScope(b, k)
                            }
                        }(this), !1), _.each(this.keys, function(a, c) {
                            return k.$watch(c, b.sic(c), !0)
                        })), this.scope.$on("$destroy", function(a) {
                            return function() {
                                return o(a)
                            }
                        }(this)), this.createMarker(this.model), g.info(this)
                    }
                    var o;
                    return d(n, e), n.include(f), n.include(h), n.include(j), o = function(a) {
                        return null != (null != a ? a.gObject : void 0) && (a.removeEvents(a.externalListeners), a.removeEvents(a.internalListeners), null != a ? a.gObject : void 0) ? (a.removeFromManager && a.gManager.remove(a.gObject), a.gObject.setMap(null), a.gObject = null) : void 0
                    }, n.prototype.destroy = function(a) {
                        return null == a && (a = !0), this.removeFromManager = a, this.scope.$destroy()
                    }, n.prototype.handleModelChanges = function(a, b) {
                        var c, d, e;
                        return c = this.getChanges(a, b, k.keys), this.firstTime ? void 0 : (d = 0, e = _.keys(c).length, _.each(c, function(c) {
                            return function(f, g) {
                                var h;
                                return d += 1, h = e === d, c.setMyScope(g, a, b, !1, !0, h), c.needRedraw = !0
                            }
                        }(this)))
                    }, n.prototype.updateModel = function(a) {
                        return this.isScopeModel && (this.clonedModel = _.clone(a, !0)), this.setMyScope("all", a, this.model)
                    }, n.prototype.renderGMarker = function(b, c) {
                        var d, e, f;
                        if (null == b && (b = !0), d = this.getProp("coords", this.scope, this.model), null != (null != (f = this.gManager) ? f.isSpiderfied : void 0) && (e = this.gManager.isSpiderfied()), null != d) {
                            if (!this.validateCoords(d)) return void g.debug("MarkerChild does not have coords yet. They may be defined later.");
                            if (null != c && c(), b && this.gObject && this.gManager.add(this.gObject), e) return this.gManager.markerSpiderfier.spiderListener(this.gObject, a.event)
                        } else if (b && this.gObject) return this.gManager.remove(this.gObject)
                    }, n.prototype.setMyScope = function(a, b, c, d, e) {
                        var f;
                        switch (null == c && (c = void 0), null == d && (d = !1), null == e && (e = !0), null == b ? b = this.model : this.model = b, this.gObject || (this.setOptions(this.scope, e), f = !0), a) {
                            case "all":
                                return _.each(this.keys, function(a) {
                                    return function(f, g) {
                                        return a.setMyScope(g, b, c, d, e)
                                    }
                                }(this));
                            case "icon":
                                return this.maybeSetScopeValue({
                                    gSetter: this.setIcon,
                                    doDraw: e
                                });
                            case "coords":
                                return this.maybeSetScopeValue({
                                    gSetter: this.setCoords,
                                    doDraw: e
                                });
                            case "options":
                                if (!f) return this.createMarker(b, c, d, e)
                        }
                    }, n.prototype.createMarker = function(a, b, c, d) {
                        return null == b && (b = void 0), null == c && (c = !1), null == d && (d = !0), this.maybeSetScopeValue({
                            gSetter: this.setOptions,
                            doDraw: d
                        }), this.firstTime = !1
                    }, n.prototype.maybeSetScopeValue = function(a) {
                        var b, c, d;
                        return c = a.gSetter, b = null != (d = a.doDraw) ? d : !0, null != c && c(this.scope, b), this.doDrawSelf && b ? this.gManager.draw() : void 0
                    }, n.prototype.isNotValid = function(a, b) {
                        var c, d;
                        return null == b && (b = !0), d = b ? void 0 === this.gObject : !1, c = this.trackModel ? !1 : a.$id !== this.scope.$id, c || d
                    }, n.prototype.setCoords = function(a, b) {
                        return null == b && (b = !0), this.isNotValid(a) || null == this.gObject ? void 0 : this.renderGMarker(b, function(b) {
                            return function() {
                                var c, d, e;
                                return d = b.getProp("coords", a, b.model), c = b.getCoords(d), e = b.gObject.getPosition(), null == e || null == c || c.lng() !== e.lng() || c.lat() !== e.lat() ? (b.gObject.setPosition(c), b.gObject.setVisible(b.validateCoords(d))) : void 0
                            }
                        }(this))
                    }, n.prototype.setIcon = function(a, b) {
                        return null == b && (b = !0), this.isNotValid(a) || null == this.gObject ? void 0 : this.renderGMarker(b, function(b) {
                            return function() {
                                var c, d, e;
                                return e = b.gObject.getIcon(), d = b.getProp("icon", a, b.model), e !== d ? (b.gObject.setIcon(d), c = b.getProp("coords", a, b.model), b.gObject.setPosition(b.getCoords(c)), b.gObject.setVisible(b.validateCoords(c))) : void 0
                            }
                        }(this))
                    }, n.prototype.setOptions = function(a, b) {
                        var c;
                        if (null == b && (b = !0), !this.isNotValid(a, !1)) {
                            if (this.renderGMarker(b, function(b) {
                                    return function() {
                                        var c, d, e;
                                        return d = b.getProp("coords", a, b.model), e = b.getProp("icon", a, b.model), c = b.getProp("options", a, b.model), b.opts = b.createOptions(d, e, c), b.isLabel(b.gObject) !== b.isLabel(b.opts) && null != b.gObject && (b.gManager.remove(b.gObject), b.gObject = void 0), null != b.gObject && b.gObject.setOptions(b.setLabelOptions(b.opts)), b.gObject || (b.isLabel(b.opts) ? b.gObject = new MarkerWithLabel(b.setLabelOptions(b.opts)) : b.opts.content ? (b.gObject = new RichMarker(b.opts), b.gObject.getIcon = b.gObject.getContent, b.gObject.setIcon = b.gObject.setContent) : b.gObject = new google.maps.Marker(b.opts), _.extend(b.gObject, {
                                            model: b.model
                                        })), b.externalListeners && b.removeEvents(b.externalListeners), b.internalListeners && b.removeEvents(b.internalListeners), b.externalListeners = b.setEvents(b.gObject, b.scope, b.model, ["dragend"]), b.internalListeners = b.setEvents(b.gObject, {
                                            events: b.internalEvents(),
                                            $evalAsync: function() {}
                                        }, b.model), null != b.id ? b.gObject.key = b.id : void 0
                                    }
                                }(this)), this.gObject && (this.gObject.getMap() || this.gManager.type !== l.type)) this.deferred.resolve(this.gObject);
                            else {
                                if (!this.gObject) return this.deferred.reject("gObject is null");
                                (null != (c = this.gObject) ? c.getMap() : 0) && this.gManager.type === l.type || (g.debug("gObject has no map yet"), this.deferred.resolve(this.gObject))
                            }
                            return this.model[this.fitKey] ? this.gManager.fit() : void 0
                        }
                    }, n.prototype.setLabelOptions = function(a) {
                        return a.labelAnchor && (a.labelAnchor = this.getLabelPositionPoint(a.labelAnchor)), a
                    }, n.prototype.internalEvents = function() {
                        return {
                            dragend: function(a) {
                                return function(b, c, d, e) {
                                    var f, g, h;
                                    return g = a.trackModel ? a.scope.model : a.model, h = a.setCoordsFromEvent(a.modelOrKey(g, a.coordsKey), a.gObject.getPosition()), g = a.setVal(d, a.coordsKey, h), f = a.scope.events, null != (null != f ? f.dragend : void 0) && f.dragend(b, c, g, e), a.scope.$apply()
                                }
                            }(this),
                            click: function(a) {
                                return function(c, d, e, f) {
                                    var g;
                                    return g = a.getProp("click", a.scope, a.model), a.doClick && b.isFunction(g) ? a.scope.$evalAsync(g(c, d, a.model, f)) : void 0
                                }
                            }(this)
                        }
                    }, n
                }(e)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var e in b) c.call(b, e) && (a[e] = b[e]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                },
                c = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolygonChildModel", ["uiGmapBasePolyChildModel", "uiGmapPolygonOptionsBuilder", function(b, c) {
                var d, e, f;
                return f = function(a) {
                    return new google.maps.Polygon(a)
                }, e = new b(c, f), d = function(b) {
                    function c() {
                        return c.__super__.constructor.apply(this, arguments)
                    }
                    return a(c, b), c
                }(e)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var e in b) c.call(b, e) && (a[e] = b[e]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                },
                c = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolylineChildModel", ["uiGmapBasePolyChildModel", "uiGmapPolylineOptionsBuilder", function(b, c) {
                var d, e, f;
                return f = function(a) {
                    return new google.maps.Polyline(a)
                }, e = b(c, f), d = function(b) {
                    function c() {
                        return c.__super__.constructor.apply(this, arguments)
                    }
                    return a(c, b), c
                }(e)
            }])
        }.call(this),
        function() {
            var c = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                d = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var d in b) e.call(b, d) && (a[d] = b[d]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                e = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.child").factory("uiGmapWindowChildModel", ["uiGmapBaseObject", "uiGmapGmapUtil", "uiGmapLogger", "$compile", "$http", "$templateCache", "uiGmapChromeFixes", "uiGmapEventsHelper", function(e, f, g, h, i, j, k, l) {
                var m;
                return m = function(e) {
                    function m(a) {
                        this.updateModel = c(this.updateModel, this), this.destroy = c(this.destroy, this), this.remove = c(this.remove, this), this.getLatestPosition = c(this.getLatestPosition, this), this.hideWindow = c(this.hideWindow, this), this.showWindow = c(this.showWindow, this), this.handleClick = c(this.handleClick, this), this.watchOptions = c(this.watchOptions, this), this.watchCoords = c(this.watchCoords, this), this.createGWin = c(this.createGWin, this), this.watchElement = c(this.watchElement, this), this.watchAndDoShow = c(this.watchAndDoShow, this), this.doShow = c(this.doShow, this);
                        var b, d, e, f, h;
                        this.model = null != (d = a.model) ? d : {}, this.scope = a.scope, this.opts = a.opts, this.isIconVisibleOnClick = a.isIconVisibleOnClick, this.gMap = a.gMap, this.markerScope = a.markerScope, this.element = a.element, this.needToManualDestroy = null != (e = a.needToManualDestroy) ? e : !1, this.markerIsVisibleAfterWindowClose = null != (f = a.markerIsVisibleAfterWindowClose) ? f : !0, this.isScopeModel = null != (h = a.isScopeModel) ? h : !1, this.isScopeModel && (this.clonedModel = _.clone(this.model, !0)), this.getGmarker = function() {
                            var a, b;
                            return null != (null != (a = this.markerScope) ? a.getGMarker : void 0) && null != (b = this.markerScope) ? b.getGMarker() : void 0
                        }, this.listeners = [], this.createGWin(), b = this.getGmarker(), null != b && b.setClickable(!0), this.watchElement(), this.watchOptions(), this.watchCoords(), this.watchAndDoShow(), this.scope.$on("$destroy", function(a) {
                            return function() {
                                return a.destroy()
                            }
                        }(this)), g.info(this)
                    }
                    return d(m, e), m.include(f), m.include(l), m.prototype.doShow = function(a) {
                        return this.scope.show === !0 || a ? this.showWindow() : this.hideWindow()
                    }, m.prototype.watchAndDoShow = function() {
                        return null != this.model.show && (this.scope.show = this.model.show), this.scope.$watch("show", this.doShow, !0), this.doShow()
                    }, m.prototype.watchElement = function() {
                        return this.scope.$watch(function(a) {
                            return function() {
                                var b, c;
                                if (a.element || a.html) return a.html !== a.element.html() && a.gObject ? (null != (b = a.opts) && (b.content = void 0), c = a.gObject.isOpen(), a.remove(), a.createGWin(c)) : void 0
                            }
                        }(this))
                    }, m.prototype.createGWin = function(b) {
                        var c, d, e, f, g;
                        return null == b && (b = !1), e = this.getGmarker(), d = {}, null != this.opts && (this.scope.coords && (this.opts.position = this.getCoords(this.scope.coords)), d = this.opts), this.element && (this.html = _.isObject(this.element) ? this.element.html() : this.element), c = this.scope.options ? this.scope.options : d, this.opts = this.createWindowOptions(e, this.markerScope || this.scope, this.html, c), null != this.opts ? (this.gObject || (this.opts.boxClass && a.InfoBox && "function" == typeof a.InfoBox ? this.gObject = new a.InfoBox(this.opts) : this.gObject = new google.maps.InfoWindow(this.opts), this.listeners.push(google.maps.event.addListener(this.gObject, "domready", function() {
                            return k.maybeRepaint(this.content)
                        })), this.listeners.push(google.maps.event.addListener(this.gObject, "closeclick", function(a) {
                            return function() {
                                return e && (e.setAnimation(a.oldMarkerAnimation), a.markerIsVisibleAfterWindowClose && _.delay(function() {
                                    return e.setVisible(!1), e.setVisible(a.markerIsVisibleAfterWindowClose)
                                }, 250)), a.gObject.close(), a.model.show = !1, null != a.scope.closeClick ? a.scope.$evalAsync(a.scope.closeClick()) : a.scope.$evalAsync()
                            }
                        }(this)))), this.gObject.setContent(this.opts.content), this.handleClick((null != (f = this.scope) && null != (g = f.options) ? g.forceClick : void 0) || b), this.doShow(this.gObject.isOpen())) : void 0
                    }, m.prototype.watchCoords = function() {
                        var a;
                        return a = null != this.markerScope ? this.markerScope : this.scope, a.$watch("coords", function(a) {
                            return function(b, c) {
                                var d;
                                if (b !== c) {
                                    if (null == b) a.hideWindow();
                                    else if (!a.validateCoords(b)) return void g.error("WindowChildMarker cannot render marker as scope.coords as no position on marker: " + JSON.stringify(a.model));
                                    if (d = a.getCoords(b), a.doShow(), a.gObject.setPosition(d), a.opts) return a.opts.position = d
                                }
                            }
                        }(this), !0)
                    }, m.prototype.watchOptions = function() {
                        return this.scope.$watch("options", function(a) {
                            return function(b, c) {
                                if (b !== c && (a.opts = b, null != a.gObject)) {
                                    if (a.gObject.setOptions(a.opts), null != a.opts.visible && a.opts.visible) return a.showWindow();
                                    if (null != a.opts.visible) return a.hideWindow()
                                }
                            }
                        }(this), !0)
                    }, m.prototype.handleClick = function(a) {
                        var b, c;
                        if (null != this.gObject) return c = this.getGmarker(), b = function(a) {
                            return function() {
                                return null == a.gObject && a.createGWin(), a.showWindow(), null != c ? (a.initialMarkerVisibility = c.getVisible(), a.oldMarkerAnimation = c.getAnimation(), c.setVisible(a.isIconVisibleOnClick)) : void 0
                            }
                        }(this), a && b(), c ? this.listeners = this.listeners.concat(this.setEvents(c, {
                            events: {
                                click: b
                            }
                        }, this.model)) : void 0
                    }, m.prototype.showWindow = function() {
                        var a, c, d;
                        if (null != this.gObject) return d = null, c = function(a) {
                            return function() {
                                var b, c, d;
                                if (!a.gObject.isOpen()) {
                                    if (c = a.getGmarker(), null != a.gObject && null != a.gObject.getPosition && (d = a.gObject.getPosition()), c && (d = c.getPosition()), !d) return;
                                    if (a.gObject.open(a.gMap, c), b = a.gObject.isOpen(), a.model.show !== b) return a.model.show = b
                                }
                            }
                        }(this), this.scope.templateUrl ? i.get(this.scope.templateUrl, {
                            cache: j
                        }).then(function(a) {
                            return function(e) {
                                var f;
                                return d = a.scope.$new(), b.isDefined(a.scope.templateParameter) && (d.parameter = a.scope.templateParameter), f = h(e.data)(d), a.gObject.setContent(f[0]), c()
                            }
                        }(this)) : this.scope.template ? (d = this.scope.$new(), b.isDefined(this.scope.templateParameter) && (d.parameter = this.scope.templateParameter), a = h(this.scope.template)(d), this.gObject.setContent(a[0]), c()) : c(), this.scope.$on("destroy", function() {
                            return d.$destroy()
                        })
                    }, m.prototype.hideWindow = function() {
                        return null != this.gObject && this.gObject.isOpen() ? this.gObject.close() : void 0
                    }, m.prototype.getLatestPosition = function(a) {
                        var b;
                        return b = this.getGmarker(), null == this.gObject || null == b || a ? a ? this.gObject.setPosition(a) : void 0 : this.gObject.setPosition(b.getPosition())
                    }, m.prototype.remove = function() {
                        return this.hideWindow(), this.removeEvents(this.listeners), this.listeners.length = 0, delete this.gObject,
                            delete this.opts
                    }, m.prototype.destroy = function(a) {
                        var b;
                        return null == a && (a = !1), this.remove(), null == this.scope || (null != (b = this.scope) ? b.$$destroyed : void 0) || !this.needToManualDestroy && !a ? void 0 : this.scope.$destroy()
                    }, m.prototype.updateModel = function(a) {
                        return this.isScopeModel && (this.clonedModel = _.clone(a, !0)), _.extend(this.model, this.clonedModel || a)
                    }, m
                }(e)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapBasePolysParentModel", ["$timeout", "uiGmapLogger", "uiGmapModelKey", "uiGmapModelsWatcher", "uiGmapPropMap", "uiGmap_async", "uiGmapPromise", "uiGmapFitHelper", function(d, e, f, g, h, i, j, k) {
                return function(d, l, m) {
                    var n;
                    return n = function(f) {
                        function n(b, c, f, g, i) {
                            this.element = c, this.attrs = f, this.gMap = g, this.defaults = i, this.maybeFit = a(this.maybeFit, this), this.createChild = a(this.createChild, this), this.pieceMeal = a(this.pieceMeal, this), this.createAllNew = a(this.createAllNew, this), this.watchIdKey = a(this.watchIdKey, this), this.createChildScopes = a(this.createChildScopes, this), this.watchDestroy = a(this.watchDestroy, this), this.onDestroy = a(this.onDestroy, this), this.rebuildAll = a(this.rebuildAll, this), this.doINeedToWipe = a(this.doINeedToWipe, this), this.watchModels = a(this.watchModels, this), n.__super__.constructor.call(this, b), this["interface"] = d, this.$log = e, this.plurals = new h, _.each(d.scopeKeys, function(a) {
                                return function(b) {
                                    return a[b + "Key"] = void 0
                                }
                            }(this)), this.models = void 0, this.firstTime = !0, this.$log.info(this), this.createChildScopes()
                        }
                        return c(n, f), n.include(g), n.prototype.watchModels = function(a) {
                            return a.$watch("models", function(b) {
                                return function(c, d) {
                                    return c !== d ? b.doINeedToWipe(c) || a.doRebuildAll ? b.rebuildAll(a, !0, !0) : b.createChildScopes(!1) : void 0
                                }
                            }(this), !0)
                        }, n.prototype.doINeedToWipe = function(a) {
                            var b;
                            return b = null != a ? 0 === a.length : !0, this.plurals.length > 0 && b
                        }, n.prototype.rebuildAll = function(a, b, c) {
                            return this.onDestroy(c).then(function(a) {
                                return function() {
                                    return b ? a.createChildScopes() : void 0
                                }
                            }(this))
                        }, n.prototype.onDestroy = function() {
                            return n.__super__.onDestroy.call(this, this.scope), i.promiseLock(this, j.promiseTypes["delete"], void 0, void 0, function(a) {
                                return function() {
                                    return i.each(a.plurals.values(), function(a) {
                                        return a.destroy(!0)
                                    }, i.chunkSizeFrom(a.scope.cleanchunk, !1)).then(function() {
                                        var b;
                                        return null != (b = a.plurals) ? b.removeAll() : void 0
                                    })
                                }
                            }(this))
                        }, n.prototype.watchDestroy = function(a) {
                            return a.$on("$destroy", function(b) {
                                return function() {
                                    return b.rebuildAll(a, !1, !0)
                                }
                            }(this))
                        }, n.prototype.createChildScopes = function(a) {
                            return null == a && (a = !0), b.isUndefined(this.scope.models) ? void this.$log.error("No models to create " + m + "s from! I Need direct models!") : null != this.gMap && null != this.scope.models ? (this.watchIdKey(this.scope), a ? this.createAllNew(this.scope, !1) : this.pieceMeal(this.scope, !1)) : void 0
                        }, n.prototype.watchIdKey = function(a) {
                            return this.setIdKey(a), a.$watch("idKey", function(b) {
                                return function(c, d) {
                                    return c !== d && null == c ? (b.idKey = c, b.rebuildAll(a, !0, !0)) : void 0
                                }
                            }(this))
                        }, n.prototype.createAllNew = function(a, b) {
                            var c;
                            return null == b && (b = !1), this.models = a.models, this.firstTime && (this.watchModels(a), this.watchDestroy(a)), this.didQueueInitPromise(this, a) ? void 0 : (c = null, i.promiseLock(this, j.promiseTypes.create, "createAllNew", function(a) {
                                return c = a
                            }, function(b) {
                                return function() {
                                    return i.map(a.models, function(a) {
                                        var d;
                                        return d = b.createChild(a, b.gMap), c && (e.debug("createNew should fall through safely"), d.isEnabled = !1), d.pathPoints.getArray()
                                    }, i.chunkSizeFrom(a.chunk)).then(function(a) {
                                        return b.maybeFit(a), b.firstTime = !1
                                    })
                                }
                            }(this)))
                        }, n.prototype.pieceMeal = function(a, b) {
                            var c, d;
                            return null == b && (b = !0), a.$$destroyed ? void 0 : (c = null, d = null, this.models = a.models, null != a && this.modelsLength() && this.plurals.length ? i.promiseLock(this, j.promiseTypes.update, "pieceMeal", function(a) {
                                return c = a
                            }, function(b) {
                                return function() {
                                    return j.promise(function() {
                                        return b.figureOutState(b.idKey, a, b.plurals, b.modelKeyComparison)
                                    }).then(function(e) {
                                        return d = e, d.updates.length && i.each(d.updates, function(a) {
                                            return _.extend(a.child.scope, a.model), a.child.model = a.model
                                        }), i.each(d.removals, function(a) {
                                            return null != a ? (a.destroy(), b.plurals.remove(a.model[b.idKey]), c) : void 0
                                        }, i.chunkSizeFrom(a.chunk))
                                    }).then(function() {
                                        return i.each(d.adds, function(a) {
                                            return c && e.debug("pieceMeal should fall through safely"), b.createChild(a, b.gMap), c
                                        }, i.chunkSizeFrom(a.chunk)).then(function() {
                                            return b.maybeFit()
                                        })
                                    })
                                }
                            }(this)) : (this.inProgress = !1, this.rebuildAll(this.scope, !0, !0)))
                        }, n.prototype.createChild = function(a, b) {
                            var c, e;
                            return e = this.scope.$new(!1), this.setChildScope(d.scopeKeys, e, a), e.$watch("model", function(a) {
                                return function(b, c) {
                                    return b !== c ? a.setChildScope(e, b) : void 0
                                }
                            }(this), !0), e["static"] = this.scope["static"], c = new l({
                                isScopeModel: !0,
                                scope: e,
                                attrs: this.attrs,
                                gMap: b,
                                defaults: this.defaults,
                                model: a,
                                gObjectChangeCb: function(a) {
                                    return function() {
                                        return a.maybeFit()
                                    }
                                }(this)
                            }), null == a[this.idKey] ? void this.$log.error(m + " model has no id to assign a child to.\nThis is required for performance. Please assign id,\nor redirect id to a different key.") : (this.plurals.put(a[this.idKey], c), c)
                        }, n.prototype.maybeFit = function(a) {
                            return null == a && (a = this.plurals.map(function(a) {
                                return a.pathPoints
                            })), this.scope.fit ? (a = _.flatten(a), k.fit(a, this.gMap)) : void 0
                        }, n
                    }(f)
                }
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var e in b) c.call(b, e) && (a[e] = b[e]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                },
                c = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapCircleParentModel", ["uiGmapLogger", "$timeout", "uiGmapGmapUtil", "uiGmapEventsHelper", "uiGmapCircleOptionsBuilder", function(c, d, e, f, g) {
                var h, i;
                return i = function(a, b) {
                    return a.settingFromDirective = !0, b(), d(function() {
                        return a.settingFromDirective = !1
                    })
                }, h = function(d) {
                    function g(a, d, f, g, h) {
                        var j, k, l;
                        this.attrs = f, this.gMap = g, this.DEFAULTS = h, this.scope = a, l = null, j = function(a) {
                            return function() {
                                return l = null, null != a.listeners ? (a.removeEvents(a.listeners), a.listeners = void 0) : void 0
                            }
                        }(this), k = new google.maps.Circle(this.buildOpts(e.getCoords(a.center), a.radius)), this.setMyOptions = function(b) {
                            return function(c, d) {
                                return a.settingFromDirective ? void 0 : !_.isEqual(c, d) || c !== d || (null != c && null != d ? c.coordinates !== d.coordinates : 0) ? k.setOptions(b.buildOpts(e.getCoords(a.center), a.radius)) : void 0
                            }
                        }(this), this.props = this.props.concat([{
                            prop: "center",
                            isColl: !0
                        }, {
                            prop: "fill",
                            isColl: !0
                        }, "radius", "zIndex"]), this.watchProps(), null != this.scope.control && (this.scope.control.getCircle = function() {
                            return k
                        }), j(), this.listeners = this.setEvents(k, a, a, ["radius_changed"]) || [], this.listeners.push(google.maps.event.addListener(k, "radius_changed", function() {
                            var c, d;
                            return c = k.getRadius(), c !== l ? (l = c, d = function() {
                                return i(a, function() {
                                    var b, d;
                                    return c !== a.radius && (a.radius = c), (null != (b = a.events) ? b.radius_changed : void 0) && _.isFunction(null != (d = a.events) ? d.radius_changed : void 0) ? a.events.radius_changed(k, "radius_changed", a, arguments) : void 0
                                })
                            }, b.mock ? d() : a.$evalAsync(function() {
                                return d()
                            })) : void 0
                        })), this.listeners.push(google.maps.event.addListener(k, "center_changed", function() {
                            return a.$evalAsync(function() {
                                return i(a, function() {
                                    return b.isDefined(a.center.type) ? (a.center.coordinates[1] = k.getCenter().lat(), a.center.coordinates[0] = k.getCenter().lng()) : (a.center.latitude = k.getCenter().lat(), a.center.longitude = k.getCenter().lng())
                                })
                            })
                        })), a.$on("$destroy", function() {
                            return j(), k.setMap(null)
                        }), c.info(this)
                    }
                    return a(g, d), g.include(e), g.include(f), g
                }(g)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var e in b) c.call(b, e) && (a[e] = b[e]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                },
                c = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapDrawingManagerParentModel", ["uiGmapLogger", "$timeout", "uiGmapBaseObject", "uiGmapEventsHelper", function(b, c, d, e) {
                var f;
                return f = function(b) {
                    function c(a, b, c, d) {
                        var e, f;
                        this.scope = a, this.attrs = c, this.map = d, e = new google.maps.drawing.DrawingManager(this.scope.options), e.setMap(this.map), f = void 0, null != this.scope.control && (this.scope.control.getDrawingManager = function() {
                            return e
                        }), !this.scope["static"] && this.scope.options && this.scope.$watch("options", function(a) {
                            return null != e ? e.setOptions(a) : void 0
                        }, !0), null != this.scope.events && (f = this.setEvents(e, this.scope, this.scope), this.scope.$watch("events", function(a) {
                            return function(b, c) {
                                return _.isEqual(b, c) ? void 0 : (null != f && a.removeEvents(f), f = a.setEvents(e, a.scope, a.scope))
                            }
                        }(this))), this.scope.$on("$destroy", function(a) {
                            return function() {
                                return null != f && a.removeEvents(f), e.setMap(null), e = null
                            }
                        }(this))
                    }
                    return a(c, b), c.include(e), c
                }(d)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapIMarkerParentModel", ["uiGmapModelKey", "uiGmapLogger", function(d, e) {
                var f;
                return f = function(d) {
                    function f(c, d, g, h) {
                        if (this.scope = c, this.element = d, this.attrs = g, this.map = h, this.onWatch = a(this.onWatch, this), this.watch = a(this.watch, this), this.validateScope = a(this.validateScope, this), f.__super__.constructor.call(this, this.scope), this.$log = e, !this.validateScope(this.scope)) throw new String("Unable to construct IMarkerParentModel due to invalid scope");
                        this.doClick = b.isDefined(this.attrs.click), null != this.scope.options && (this.DEFAULTS = this.scope.options), this.watch("coords", this.scope), this.watch("icon", this.scope), this.watch("options", this.scope), this.scope.$on("$destroy", function(a) {
                            return function() {
                                return a.onDestroy(a.scope)
                            }
                        }(this))
                    }
                    return c(f, d), f.prototype.DEFAULTS = {}, f.prototype.validateScope = function(a) {
                        var b;
                        return null == a ? (this.$log.error(this.constructor.name + ": invalid scope used"), !1) : (b = null != a.coords, b ? b : (this.$log.error(this.constructor.name + ": no valid coords attribute found"), !1))
                    }, f.prototype.watch = function(a, b, c) {
                        return null == c && (c = !0), b.$watch(a, function(c) {
                            return function(d, e) {
                                return _.isEqual(d, e) ? void 0 : c.onWatch(a, b, d, e)
                            }
                        }(this), c)
                    }, f.prototype.onWatch = function(a, b, c, d) {}, f
                }(d)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var e in b) c.call(b, e) && (a[e] = b[e]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                },
                c = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapIWindowParentModel", ["uiGmapModelKey", "uiGmapGmapUtil", "uiGmapLogger", function(b, c, d) {
                var e;
                return e = function(b) {
                    function e(a, b, c, f, g, h, i, j) {
                        e.__super__.constructor.call(this, a), this.$log = d, this.$timeout = g, this.$compile = h, this.$http = i, this.$templateCache = j, this.DEFAULTS = {}, null != a.options && (this.DEFAULTS = a.options)
                    }
                    return a(e, b), e.include(c), e.prototype.getItem = function(a, b, c) {
                        return "models" === b ? a[b][c] : a[b].get(c)
                    }, e
                }(b)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapLayerParentModel", ["uiGmapBaseObject", "uiGmapLogger", "$timeout", function(d, e, f) {
                var g;
                return g = function(d) {
                    function f(c, d, f, g, h, i) {
                        return this.scope = c, this.element = d, this.attrs = f, this.gMap = g, this.onLayerCreated = null != h ? h : void 0, this.$log = null != i ? i : e, this.createGoogleLayer = a(this.createGoogleLayer, this), null == this.attrs.type ? void this.$log.info("type attribute for the layer directive is mandatory. Layer creation aborted!!") : (this.createGoogleLayer(), this.doShow = !0, b.isDefined(this.attrs.show) && (this.doShow = this.scope.show), this.doShow && null != this.gMap && this.gObject.setMap(this.gMap), this.scope.$watch("show", function(a) {
                            return function(b, c) {
                                return b !== c ? (a.doShow = b, b ? a.gObject.setMap(a.gMap) : a.gObject.setMap(null)) : void 0
                            }
                        }(this), !0), this.scope.$watch("options", function(a) {
                            return function(b, c) {
                                return b !== c && a.doShow ? a.gObject.setOptions(b) : void 0
                            }
                        }(this), !0), void this.scope.$on("$destroy", function(a) {
                            return function() {
                                return a.gObject.setMap(null)
                            }
                        }(this)))
                    }
                    return c(f, d), f.prototype.createGoogleLayer = function() {
                        var a;
                        return null == this.attrs.options ? this.gObject = void 0 === this.attrs.namespace ? new google.maps[this.attrs.type] : new google.maps[this.attrs.namespace][this.attrs.type] : this.gObject = void 0 === this.attrs.namespace ? new google.maps[this.attrs.type](this.scope.options) : new google.maps[this.attrs.namespace][this.attrs.type](this.scope.options), null != this.gObject && this.doShow && this.gObject.setMap(this.gMap), null != this.gObject && null != this.onLayerCreated && "function" == typeof(a = this.onLayerCreated(this.scope, this.gObject)) ? a(this.gObject) : void 0
                    }, f
                }(d)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapMapTypeParentModel", ["uiGmapBaseObject", "uiGmapLogger", function(d, e) {
                var f;
                return f = function(d) {
                    function f(c, d, f, g, h) {
                        return this.scope = c, this.element = d, this.attrs = f, this.gMap = g, this.$log = null != h ? h : e, this.hideOverlay = a(this.hideOverlay, this), this.showOverlay = a(this.showOverlay, this), this.refreshMapType = a(this.refreshMapType, this), this.createMapType = a(this.createMapType, this), null == this.attrs.options ? void this.$log.info("options attribute for the map-type directive is mandatory. Map type creation aborted!!") : (this.id = this.gMap.overlayMapTypesCount = this.gMap.overlayMapTypesCount + 1 || 0, this.doShow = !0, this.createMapType(), b.isDefined(this.attrs.show) && (this.doShow = this.scope.show), this.doShow && null != this.gMap && this.showOverlay(), this.scope.$watch("show", function(a) {
                            return function(b, c) {
                                return b !== c ? (a.doShow = b, b ? a.showOverlay() : a.hideOverlay()) : void 0
                            }
                        }(this), !0), this.scope.$watchCollection("options", function(a) {
                            return function(b, c) {
                                var d, e;
                                return !_.isEqual(b, c) && (e = ["tileSize", "maxZoom", "minZoom", "name", "alt"], d = _.some(e, function(a) {
                                    return !c || !b || !_.isEqual(b[a], c[a])
                                })) ? a.refreshMapType() : void 0
                            }
                        }(this)), b.isDefined(this.attrs.refresh) && this.scope.$watch("refresh", function(a) {
                            return function(b, c) {
                                return _.isEqual(b, c) ? void 0 : a.refreshMapType()
                            }
                        }(this), !0), void this.scope.$on("$destroy", function(a) {
                            return function() {
                                return a.hideOverlay(), a.mapType = null
                            }
                        }(this)))
                    }
                    return c(f, d), f.prototype.createMapType = function() {
                        if (null != this.scope.options.getTile) this.mapType = this.scope.options;
                        else {
                            if (null == this.scope.options.getTileUrl) return void this.$log.info("options should provide either getTile or getTileUrl methods. Map type creation aborted!!");
                            this.mapType = new google.maps.ImageMapType(this.scope.options)
                        }
                        return this.attrs.id && this.scope.id && (this.gMap.mapTypes.set(this.scope.id, this.mapType), b.isDefined(this.attrs.show) || (this.doShow = !1)), this.mapType.layerId = this.id
                    }, f.prototype.refreshMapType = function() {
                        return this.hideOverlay(), this.mapType = null, this.createMapType(), this.doShow && null != this.gMap ? this.showOverlay() : void 0
                    }, f.prototype.showOverlay = function() {
                        return this.gMap.overlayMapTypes.push(this.mapType)
                    }, f.prototype.hideOverlay = function() {
                        var a;
                        return a = !1, this.gMap.overlayMapTypes.forEach(function(b) {
                            return function(c, d) {
                                a || c.layerId !== b.id || (a = !0, b.gMap.overlayMapTypes.removeAt(d))
                            }
                        }(this))
                    }, f
                }(d)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapMarkersParentModel", ["uiGmapIMarkerParentModel", "uiGmapModelsWatcher", "uiGmapPropMap", "uiGmapMarkerChildModel", "uiGmap_async", "uiGmapClustererMarkerManager", "uiGmapMarkerManager", "$timeout", "uiGmapIMarker", "uiGmapPromise", "uiGmapGmapUtil", "uiGmapLogger", "uiGmapSpiderfierMarkerManager", function(d, e, f, g, h, i, j, k, l, m, n, o, p) {
                var q, r;
                return r = function(a, b) {
                    return b.plurals = new f, b.scope.plurals = b.plurals, b
                }, q = function(d) {
                    function k(b, c, d, e) {
                        this.maybeExecMappedEvent = a(this.maybeExecMappedEvent, this), this.onDestroy = a(this.onDestroy, this), this.newChildMarker = a(this.newChildMarker, this), this.pieceMeal = a(this.pieceMeal, this), this.rebuildAll = a(this.rebuildAll, this), this.createAllNew = a(this.createAllNew, this), this.bindToTypeEvents = a(this.bindToTypeEvents, this), this.createChildScopes = a(this.createChildScopes, this), this.validateScope = a(this.validateScope, this), this.onWatch = a(this.onWatch, this), k.__super__.constructor.call(this, b, c, d, e), this["interface"] = l, r(new f, this), this.scope.pluralsUpdate = {
                            updateCtr: 0
                        }, this.$log.info(this), this.doRebuildAll = null != this.scope.doRebuildAll ? this.scope.doRebuildAll : !1, this.setIdKey(this.scope), this.scope.$watch("doRebuildAll", function(a) {
                            return function(b, c) {
                                return b !== c ? a.doRebuildAll = b : void 0
                            }
                        }(this)), this.modelsLength() || (this.modelsRendered = !1), this.scope.$watch("models", function(a) {
                            return function(b, c) {
                                if (!_.isEqual(b, c) || !a.modelsRendered) {
                                    if (0 === b.length && 0 === c.length) return;
                                    return a.modelsRendered = !0, a.onWatch("models", a.scope, b, c)
                                }
                            }
                        }(this), !this.isTrue(d.modelsbyref)), this.watch("doCluster", this.scope), this.watch("type", this.scope), this.watch("clusterOptions", this.scope), this.watch("clusterEvents", this.scope), this.watch("typeOptions", this.scope), this.watch("typeEvents", this.scope), this.watch("fit", this.scope), this.watch("idKey", this.scope), this.gManager = void 0, this.createAllNew(this.scope)
                    }
                    return c(k, d), k.include(n), k.include(e), k.prototype.onWatch = function(a, b, c, d) {
                        return "idKey" === a && c !== d && (this.idKey = c), this.doRebuildAll || "doCluster" === a || "type" === a ? this.rebuildAll(b) : this.pieceMeal(b)
                    }, k.prototype.validateScope = function(a) {
                        var c;
                        return c = b.isUndefined(a.models) || void 0 === a.models, c && this.$log.error(this.constructor.name + ": no valid models attribute found"), k.__super__.validateScope.call(this, a) || c
                    }, k.prototype.createChildScopes = function(a) {
                        return null != this.gMap && null != this.scope.models ? a ? this.createAllNew(this.scope, !1) : this.pieceMeal(this.scope, !1) : void 0
                    }, k.prototype.bindToTypeEvents = function(a, c) {
                        var d, e;
                        return null == c && (c = ["click", "mouseout", "mouseover"]), e = this, this.origTypeEvents ? b.extend(a, this.origTypeEvents) : (this.origTypeEvents = {}, _.each(c, function(b) {
                            return function(c) {
                                return b.origTypeEvents[c] = null != a ? a[c] : void 0
                            }
                        }(this))), d = {}, _.each(c, function(a) {
                            return d[a] = function(b) {
                                return e.maybeExecMappedEvent(b, a)
                            }
                        }), b.extend(a, d)
                    }, k.prototype.createAllNew = function(a) {
                        var b, c, d, e;
                        return null != this.gManager && (this.gManager instanceof p && (b = this.gManager.isSpiderfied()), this.gManager.clear(), delete this.gManager), d = a.typeEvents || a.clusterEvents, e = a.typeOptions || a.clusterOptions, a.doCluster || "cluster" === a.type ? (null != d && this.bindToTypeEvents(d), this.gManager = new i(this.map, void 0, e, d)) : "spider" === a.type ? (null != d && this.bindToTypeEvents(d, ["spiderfy", "unspiderfy"]), this.gManager = new p(this.map, void 0, e, d, this.scope), b && this.gManager.spiderfy()) : this.gManager = new j(this.map), this.didQueueInitPromise(this, a) ? void 0 : (c = null, h.promiseLock(this, m.promiseTypes.create, "createAllNew", function(a) {
                            return c = a
                        }, function(b) {
                            return function() {
                                return h.each(a.models, function(d) {
                                    return b.newChildMarker(d, a), c
                                }, h.chunkSizeFrom(a.chunk)).then(function() {
                                    return b.modelsRendered = !0, a.fit && b.gManager.fit(), b.gManager.draw(), b.scope.pluralsUpdate.updateCtr += 1
                                }, h.chunkSizeFrom(a.chunk))
                            }
                        }(this)))
                    }, k.prototype.rebuildAll = function(a) {
                        var b;
                        if (a.doRebuild || void 0 === a.doRebuild) return (null != (b = this.scope.plurals) ? b.length : void 0) ? this.onDestroy(a).then(function(b) {
                            return function() {
                                return b.createAllNew(a)
                            }
                        }(this)) : this.createAllNew(a)
                    }, k.prototype.pieceMeal = function(a) {
                        var b, c;
                        if (!a.$$destroyed) return b = null, c = null, this.modelsLength() && this.scope.plurals.length ? h.promiseLock(this, m.promiseTypes.update, "pieceMeal", function(a) {
                            return b = a
                        }, function(d) {
                            return function() {
                                return m.promise(function() {
                                    return d.figureOutState(d.idKey, a, d.scope.plurals, d.modelKeyComparison)
                                }).then(function(e) {
                                    return c = e, h.each(c.removals, function(a) {
                                        return null != a ? (null != a.destroy && a.destroy(), d.scope.plurals.remove(a.id), b) : void 0
                                    }, h.chunkSizeFrom(a.chunk))
                                }).then(function() {
                                    return h.each(c.adds, function(c) {
                                        return d.newChildMarker(c, a), b
                                    }, h.chunkSizeFrom(a.chunk))
                                }).then(function() {
                                    return h.each(c.updates, function(a) {
                                        return d.updateChild(a.child, a.model), b
                                    }, h.chunkSizeFrom(a.chunk))
                                }).then(function() {
                                    return (c.adds.length > 0 || c.removals.length > 0 || c.updates.length > 0) && (a.plurals = d.scope.plurals, a.fit && d.gManager.fit(), d.gManager.draw()), d.scope.pluralsUpdate.updateCtr += 1
                                })
                            }
                        }(this)) : (this.inProgress = !1, this.rebuildAll(a))
                    }, k.prototype.newChildMarker = function(a, b) {
                        var c, d, e;
                        if (!a) throw "model undefined";
                        return null == a[this.idKey] ? void this.$log.error("Marker model has no id to assign a child to. This is required for performance. Please assign id, or redirect id to a different key.") : (this.$log.info("child", c, "markers", this.scope.markerModels), d = b.$new(!1), d.events = b.events, e = {}, l.scopeKeys.forEach(function(a) {
                            return e[a] = b[a]
                        }), c = new g({
                            scope: d,
                            model: a,
                            keys: e,
                            gMap: this.map,
                            defaults: this.DEFAULTS,
                            doClick: this.doClick,
                            gManager: this.gManager,
                            doDrawSelf: !1,
                            isScopeModel: !0
                        }), this.scope.plurals.put(a[this.idKey], c), c)
                    }, k.prototype.onDestroy = function(a) {
                        return k.__super__.onDestroy.call(this, a), h.promiseLock(this, m.promiseTypes["delete"], void 0, void 0, function(a) {
                            return function() {
                                return h.each(a.scope.plurals.values(), function(a) {
                                    return null != a ? a.destroy(!1) : void 0
                                }, h.chunkSizeFrom(a.scope.cleanchunk, !1)).then(function() {
                                    return null != a.gManager && a.gManager.destroy(), a.plurals.removeAll(), a.plurals !== a.scope.plurals && console.error("plurals out of sync for MarkersParentModel"), a.scope.pluralsUpdate.updateCtr += 1
                                })
                            }
                        }(this))
                    }, k.prototype.maybeExecMappedEvent = function(a, b) {
                        var c, d;
                        if (!this.scope.$$destroyed) return d = this.scope.typeEvents || this.scope.clusterEvents, _.isFunction(null != d ? d[b] : void 0) && (c = this.mapTypeToPlurals(a), this.origTypeEvents[b]) ? this.origTypeEvents[b](c.group, c.mapped) : void 0
                    }, k.prototype.mapTypeToPlurals = function(a) {
                        var b, c, d;
                        return _.isArray(a) ? b = a : _.isFunction(a.getMarkers) && (b = a.getMarkers()), null == b ? void o.error("Unable to map event as we cannot find the array group to map") : (c = (null != (d = this.scope.plurals.values()) ? d.length : void 0) ? b.map(function(a) {
                            return function(b) {
                                return a.scope.plurals.get(b.key).model
                            }
                        }(this)) : [], {
                            cluster: a,
                            mapped: c,
                            group: a
                        })
                    }, k.prototype.getItem = function(a, b, c) {
                        return "models" === b ? a[b][c] : a[b].get(c)
                    }, k
                }(d)
            }])
        }.call(this),
        function() {
            ["Polygon", "Polyline"].forEach(function(a) {
                return b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmap" + a + "sParentModel", ["uiGmapBasePolysParentModel", "uiGmap" + a + "ChildModel", "uiGmapI" + a, function(b, c, d) {
                    return b(d, c, a)
                }])
            })
        }.call(this),
        function() {
            var a = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var e in b) c.call(b, e) && (a[e] = b[e]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                },
                c = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapRectangleParentModel", ["uiGmapLogger", "uiGmapGmapUtil", "uiGmapEventsHelper", "uiGmapRectangleOptionsBuilder", function(b, c, d, e) {
                var f;
                return f = function(e) {
                    function f(a, c, d, e, f) {
                        var g, h, i, j, k, l, m, n, o, p, q;
                        this.scope = a, this.attrs = d, this.gMap = e, this.DEFAULTS = f, g = void 0, j = !1, o = [], n = void 0, k = function(a) {
                            return function() {
                                return a.isTrue(a.attrs.fit) ? a.fitMapBounds(a.gMap, g) : void 0
                            }
                        }(this), i = function(a) {
                            return function() {
                                var c, d, e;
                                return null != a.scope.bounds && null != (null != (c = a.scope.bounds) ? c.sw : void 0) && null != (null != (d = a.scope.bounds) ? d.ne : void 0) && a.validateBoundPoints(a.scope.bounds) ? (g = a.convertBoundPoints(a.scope.bounds), b.info("new new bounds created: " + JSON.stringify(g))) : null != a.scope.bounds.getNorthEast && null != a.scope.bounds.getSouthWest ? g = a.scope.bounds : null != a.scope.bounds ? b.error("Invalid bounds for newValue: " + JSON.stringify(null != (e = a.scope) ? e.bounds : void 0)) : void 0
                            }
                        }(this), i(), l = new google.maps.Rectangle(this.buildOpts(g)), b.info("gObject (rectangle) created: " + l), p = !1, q = function(a) {
                            return function() {
                                var b, c, d;
                                return b = l.getBounds(), c = b.getNorthEast(), d = b.getSouthWest(), p ? void 0 : a.scope.$evalAsync(function(a) {
                                    return null != a.bounds && null != a.bounds.sw && null != a.bounds.ne && (a.bounds.ne = {
                                        latitude: c.lat(),
                                        longitude: c.lng()
                                    }, a.bounds.sw = {
                                        latitude: d.lat(),
                                        longitude: d.lng()
                                    }), null != a.bounds.getNorthEast && null != a.bounds.getSouthWest ? a.bounds = b : void 0
                                })
                            }
                        }(this), m = function(a) {
                            return function() {
                                return k(), a.removeEvents(o), o.push(google.maps.event.addListener(l, "dragstart", function() {
                                    return j = !0
                                })), o.push(google.maps.event.addListener(l, "dragend", function() {
                                    return j = !1, q()
                                })), o.push(google.maps.event.addListener(l, "bounds_changed", function() {
                                    return j ? void 0 : q()
                                }))
                            }
                        }(this), h = function(a) {
                            return function() {
                                return a.removeEvents(o), null != n && a.removeEvents(n), l.setMap(null)
                            }
                        }(this), null != g && m(), this.scope.$watch("bounds", function(a, b) {
                            var c;
                            if (!(_.isEqual(a, b) && null != g || j)) return p = !0, null == a ? void h() : (null == g ? c = !0 : k(), i(), l.setBounds(g), p = !1, c && null != g ? m() : void 0)
                        }, !0), this.setMyOptions = function(a) {
                            return function(b, c) {
                                return _.isEqual(b, c) || null == g || null == b ? void 0 : l.setOptions(a.buildOpts(g))
                            }
                        }(this), this.props.push("bounds"), this.watchProps(this.props), null != this.attrs.events && (n = this.setEvents(l, this.scope, this.scope), this.scope.$watch("events", function(a) {
                            return function(b, c) {
                                return _.isEqual(b, c) ? void 0 : (null != n && a.removeEvents(n), n = a.setEvents(l, a.scope, a.scope))
                            }
                        }(this))), this.scope.$on("$destroy", function() {
                            return h()
                        }), b.info(this)
                    }
                    return a(f, e), f.include(c), f.include(d), f
                }(e)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapSearchBoxParentModel", ["uiGmapBaseObject", "uiGmapLogger", "uiGmapEventsHelper", function(d, e, f) {
                var g;
                return g = function(d) {
                    function g(c, d, f, g, h, i, j) {
                        var k;
                        return this.scope = c, this.element = d, this.attrs = f, this.gMap = g, this.ctrlPosition = h, this.template = i, this.$log = null != j ? j : e, this.setVisibility = a(this.setVisibility, this), this.getBounds = a(this.getBounds, this), this.setBounds = a(this.setBounds, this), this.createSearchBox = a(this.createSearchBox, this), this.addToParentDiv = a(this.addToParentDiv, this), this.addAsMapControl = a(this.addAsMapControl, this), this.init = a(this.init, this), null == this.attrs.template ? void this.$log.error("template attribute for the search-box directive is mandatory. Places Search Box creation aborted!!") : (b.isUndefined(this.scope.options) && (this.scope.options = {}, this.scope.options.visible = !0), b.isUndefined(this.scope.options.visible) && (this.scope.options.visible = !0), b.isUndefined(this.scope.options.autocomplete) && (this.scope.options.autocomplete = !1), this.visible = this.scope.options.visible, this.autocomplete = this.scope.options.autocomplete, k = b.element("<div></div>"), k.append(this.template), this.input = k.find("input")[0], void this.init())
                    }
                    return c(g, d), g.include(f), g.prototype.init = function() {
                        return this.createSearchBox(), this.scope.$watch("options", function(a) {
                            return function(c, d) {
                                return b.isObject(c) && (null != c.bounds && a.setBounds(c.bounds), null != c.visible && a.visible !== c.visible) ? a.setVisibility(c.visible) : void 0
                            }
                        }(this), !0), null != this.attrs.parentdiv ? this.addToParentDiv() : this.addAsMapControl(), this.visible || this.setVisibility(this.visible), this.autocomplete ? this.listener = google.maps.event.addListener(this.gObject, "place_changed", function(a) {
                            return function() {
                                return a.places = a.gObject.getPlace()
                            }
                        }(this)) : this.listener = google.maps.event.addListener(this.gObject, "places_changed", function(a) {
                            return function() {
                                return a.places = a.gObject.getPlaces()
                            }
                        }(this)), this.listeners = this.setEvents(this.gObject, this.scope, this.scope), this.$log.info(this), this.scope.$on("$stateChangeSuccess", function(a) {
                            return function() {
                                return null != a.attrs.parentdiv ? a.addToParentDiv() : void 0
                            }
                        }(this)), this.scope.$on("$destroy", function(a) {
                            return function() {
                                return a.gObject = null
                            }
                        }(this))
                    }, g.prototype.addAsMapControl = function() {
                        return this.gMap.controls[google.maps.ControlPosition[this.ctrlPosition]].push(this.input)
                    }, g.prototype.addToParentDiv = function() {
                        var a;
                        return this.parentDiv = b.element(document.getElementById(this.scope.parentdiv)), (null != (a = this.parentDiv) ? a.length : void 0) ? this.parentDiv.append(this.input) : void 0
                    }, g.prototype.createSearchBox = function() {
                        return this.autocomplete ? this.gObject = new google.maps.places.Autocomplete(this.input, this.scope.options) : this.gObject = new google.maps.places.SearchBox(this.input, this.scope.options)
                    }, g.prototype.setBounds = function(a) {
                        if (b.isUndefined(a.isEmpty)) this.$log.error("Error: SearchBoxParentModel setBounds. Bounds not an instance of LatLngBounds.");
                        else if (a.isEmpty() === !1 && null != this.gObject) return this.gObject.setBounds(a)
                    }, g.prototype.getBounds = function() {
                        return this.gObject.getBounds()
                    }, g.prototype.setVisibility = function(a) {
                        return null != this.attrs.parentdiv ? a === !1 ? this.parentDiv.addClass("ng-hide") : this.parentDiv.removeClass("ng-hide") : a === !1 ? this.gMap.controls[google.maps.ControlPosition[this.ctrlPosition]].clear() : this.gMap.controls[google.maps.ControlPosition[this.ctrlPosition]].push(this.input), this.visible = a
                    }, g
                }(d)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api.models.parent").factory("uiGmapWindowsParentModel", ["uiGmapIWindowParentModel", "uiGmapModelsWatcher", "uiGmapPropMap", "uiGmapWindowChildModel", "uiGmapLinked", "uiGmap_async", "uiGmapLogger", "$timeout", "$compile", "$http", "$templateCache", "$interpolate", "uiGmapPromise", "uiGmapIWindow", "uiGmapGmapUtil", function(d, e, f, g, h, i, j, k, l, m, n, o, p, q, r) {
                var s;
                return s = function(d) {
                    function s(b, c, d, e, g, i) {
                        this.gMap = g, this.markersScope = i, this.modelKeyComparison = a(this.modelKeyComparison, this), this.interpolateContent = a(this.interpolateContent, this), this.setChildScope = a(this.setChildScope, this), this.createWindow = a(this.createWindow, this), this.setContentKeys = a(this.setContentKeys, this), this.pieceMeal = a(this.pieceMeal, this), this.createAllNew = a(this.createAllNew, this), this.watchIdKey = a(this.watchIdKey, this), this.createChildScopes = a(this.createChildScopes, this), this.watchOurScope = a(this.watchOurScope, this), this.watchDestroy = a(this.watchDestroy, this), this.onDestroy = a(this.onDestroy, this), this.rebuildAll = a(this.rebuildAll, this), this.doINeedToWipe = a(this.doINeedToWipe, this), this.watchModels = a(this.watchModels, this), this.go = a(this.go, this), s.__super__.constructor.call(this, b, c, d, e, k, l, m, n), this["interface"] = q, this.plurals = new f, _.each(q.scopeKeys, function(a) {
                            return function(b) {
                                return a[b + "Key"] = void 0
                            }
                        }(this)), this.linked = new h(b, c, d, e), this.contentKeys = void 0, this.isIconVisibleOnClick = void 0, this.firstTime = !0, this.firstWatchModels = !0, this.$log.info(self), this.parentScope = void 0, this.go(b)
                    }
                    return c(s, d), s.include(e), s.prototype.go = function(a) {
                        return this.watchOurScope(a), this.doRebuildAll = null != this.scope.doRebuildAll ? this.scope.doRebuildAll : !1, a.$watch("doRebuildAll", function(a) {
                            return function(b, c) {
                                return b !== c ? a.doRebuildAll = b : void 0
                            }
                        }(this)), this.createChildScopes()
                    }, s.prototype.watchModels = function(a) {
                        var b;
                        return b = null != this.markersScope ? "pluralsUpdate" : "models",
                            a.$watch(b, function(b) {
                                return function(c, d) {
                                    var e;
                                    return !_.isEqual(c, d) || b.firstWatchModels ? (b.firstWatchModels = !1, b.doRebuildAll || b.doINeedToWipe(a.models) ? b.rebuildAll(a, !0, !0) : (e = 0 === b.plurals.length, null != b.existingPieces ? _.last(b.existingPieces._content).then(function() {
                                        return b.createChildScopes(e)
                                    }) : b.createChildScopes(e))) : void 0
                                }
                            }(this), !0)
                    }, s.prototype.doINeedToWipe = function(a) {
                        var b;
                        return b = null != a ? 0 === a.length : !0, this.plurals.length > 0 && b
                    }, s.prototype.rebuildAll = function(a, b, c) {
                        return this.onDestroy(c).then(function(a) {
                            return function() {
                                return b ? a.createChildScopes() : void 0
                            }
                        }(this))
                    }, s.prototype.onDestroy = function(a) {
                        return s.__super__.onDestroy.call(this, this.scope), i.promiseLock(this, p.promiseTypes["delete"], void 0, void 0, function(a) {
                            return function() {
                                return i.each(a.plurals.values(), function(a) {
                                    return a.destroy(!0)
                                }, i.chunkSizeFrom(a.scope.cleanchunk, !1)).then(function() {
                                    var b;
                                    return null != (b = a.plurals) ? b.removeAll() : void 0
                                })
                            }
                        }(this))
                    }, s.prototype.watchDestroy = function(a) {
                        return a.$on("$destroy", function(b) {
                            return function() {
                                return b.firstWatchModels = !0, b.firstTime = !0, b.rebuildAll(a, !1, !0)
                            }
                        }(this))
                    }, s.prototype.watchOurScope = function(a) {
                        return _.each(q.scopeKeys, function(b) {
                            return function(c) {
                                var d;
                                return d = c + "Key", b[d] = "function" == typeof a[c] ? a[c]() : a[c]
                            }
                        }(this))
                    }, s.prototype.createChildScopes = function(a) {
                        var c, d, e;
                        return null == a && (a = !0), this.isIconVisibleOnClick = !0, b.isDefined(this.linked.attrs.isiconvisibleonclick) && (this.isIconVisibleOnClick = this.linked.scope.isIconVisibleOnClick), c = b.isUndefined(this.linked.scope.models), !c || void 0 !== this.markersScope && void 0 !== (null != (d = this.markersScope) ? d.plurals : void 0) && void 0 !== (null != (e = this.markersScope) ? e.models : void 0) ? null != this.gMap ? null != this.linked.scope.models ? (this.watchIdKey(this.linked.scope), a ? this.createAllNew(this.linked.scope, !1) : this.pieceMeal(this.linked.scope, !1)) : (this.parentScope = this.markersScope, this.watchIdKey(this.parentScope), a ? this.createAllNew(this.markersScope, !0, "plurals", !1) : this.pieceMeal(this.markersScope, !0, "plurals", !1)) : void 0 : void this.$log.error("No models to create windows from! Need direct models or models derived from markers!")
                    }, s.prototype.watchIdKey = function(a) {
                        return this.setIdKey(a), a.$watch("idKey", function(b) {
                            return function(c, d) {
                                return c !== d && null == c ? (b.idKey = c, b.rebuildAll(a, !0, !0)) : void 0
                            }
                        }(this))
                    }, s.prototype.createAllNew = function(a, b, c, d) {
                        var e;
                        return null == c && (c = "models"), null == d && (d = !1), this.firstTime && (this.watchModels(a), this.watchDestroy(a)), this.setContentKeys(a.models), this.didQueueInitPromise(this, a) ? void 0 : (e = null, i.promiseLock(this, p.promiseTypes.create, "createAllNew", function(a) {
                            return e = a
                        }, function(d) {
                            return function() {
                                return i.each(a.models, function(f) {
                                    var g, h;
                                    return g = b && null != (h = d.getItem(a, c, f[d.idKey])) ? h.gObject : void 0, e || (!g && d.markersScope && j.error("Unable to get gMarker from markersScope!"), d.createWindow(f, g, d.gMap)), e
                                }, i.chunkSizeFrom(a.chunk)).then(function() {
                                    return d.firstTime = !1
                                })
                            }
                        }(this)))
                    }, s.prototype.pieceMeal = function(a, b, c, d) {
                        var e, f;
                        return null == c && (c = "models"), null == d && (d = !0), a.$$destroyed ? void 0 : (e = null, f = null, null != a && this.modelsLength() && this.plurals.length ? i.promiseLock(this, p.promiseTypes.update, "pieceMeal", function(a) {
                            return e = a
                        }, function(b) {
                            return function() {
                                return p.promise(function() {
                                    return b.figureOutState(b.idKey, a, b.plurals, b.modelKeyComparison)
                                }).then(function(c) {
                                    return f = c, i.each(f.removals, function(a) {
                                        return null != a ? (b.plurals.remove(a.id), null != a.destroy && a.destroy(!0), e) : void 0
                                    }, i.chunkSizeFrom(a.chunk))
                                }).then(function() {
                                    return i.each(f.adds, function(d) {
                                        var f, g;
                                        if (f = null != (g = b.getItem(a, c, d[b.idKey])) ? g.gObject : void 0, !f) throw "Gmarker undefined";
                                        return b.createWindow(d, f, b.gMap), e
                                    })
                                }).then(function() {
                                    return i.each(f.updates, function(a) {
                                        return b.updateChild(a.child, a.model), e
                                    }, i.chunkSizeFrom(a.chunk))
                                })
                            }
                        }(this)) : (j.debug("pieceMeal: rebuildAll"), this.rebuildAll(this.scope, !0, !0)))
                    }, s.prototype.setContentKeys = function(a) {
                        return this.modelsLength(a) ? this.contentKeys = Object.keys(a[0]) : void 0
                    }, s.prototype.createWindow = function(a, b, c) {
                        var d, e, f, h, i, j;
                        return e = this.linked.scope.$new(!1), this.setChildScope(e, a), e.$watch("model", function(a) {
                            return function(b, c) {
                                return b !== c ? a.setChildScope(e, b) : void 0
                            }
                        }(this), !0), f = {
                            html: function(b) {
                                return function() {
                                    return b.interpolateContent(b.linked.element.html(), a)
                                }
                            }(this)
                        }, this.DEFAULTS = this.scopeOrModelVal(this.optionsKey, this.scope, a) || {}, h = this.createWindowOptions(b, e, f.html(), this.DEFAULTS), d = new g({
                            model: a,
                            scope: e,
                            opts: h,
                            isIconVisibleOnClick: this.isIconVisibleOnClick,
                            gMap: c,
                            markerScope: null != (i = this.markersScope) && null != (j = i.plurals.get(a[this.idKey])) ? j.scope : void 0,
                            element: f,
                            needToManualDestroy: !1,
                            markerIsVisibleAfterWindowClose: !0,
                            isScopeModel: !0
                        }), null == a[this.idKey] ? void this.$log.error("Window model has no id to assign a child to. This is required for performance. Please assign id, or redirect id to a different key.") : (this.plurals.put(a[this.idKey], d), d)
                    }, s.prototype.setChildScope = function(a, b) {
                        return _.each(q.scopeKeys, function(c) {
                            return function(d) {
                                var e, f;
                                return e = d + "Key", f = "self" === c[e] ? b : b[c[e]], f !== a[d] ? a[d] = f : void 0
                            }
                        }(this)), a.model = b
                    }, s.prototype.interpolateContent = function(a, b) {
                        var c, d, e, f, g, h;
                        if (void 0 !== this.contentKeys && 0 !== this.contentKeys.length) {
                            for (c = o(a), e = {}, h = this.contentKeys, d = 0, g = h.length; g > d; d++) f = h[d], e[f] = b[f];
                            return c(e)
                        }
                    }, s.prototype.modelKeyComparison = function(a, b) {
                        var c, d;
                        if (d = null != this.scope.coords ? this.scope : this.parentScope, null == d) throw "No scope or parentScope set!";
                        return (c = r.equalCoords(this.evalModelHandle(a, d.coords), this.evalModelHandle(b, d.coords))) ? c = _.every(_.without(this["interface"].scopeKeys, "coords"), function(c) {
                            return function(e) {
                                return c.evalModelHandle(a, d[e]) === c.evalModelHandle(b, d[e])
                            }
                        }(this)) : c
                    }, s
                }(d)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapCircle", ["uiGmapICircle", "uiGmapCircleParentModel", function(a, b) {
                return _.extend(a, {
                    link: function(a, c, d, e) {
                        return e.getScope().deferred.promise.then(function(e) {
                            return new b(a, c, d, e)
                        })
                    }
                })
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapControl", ["uiGmapIControl", "$http", "$templateCache", "$compile", "$controller", "uiGmapGoogleMapApi", function(d, e, f, g, h, i) {
                var j;
                return j = function(j) {
                    function k() {
                        this.link = a(this.link, this), k.__super__.constructor.call(this)
                    }
                    return c(k, j), k.prototype.transclude = !0, k.prototype.link = function(a, c, j, k, l) {
                        return i.then(function(c) {
                            return function(i) {
                                var j, m, n, o;
                                return o = l(), j = l().length > 0, !j && b.isUndefined(a.template) ? void c.$log.error("mapControl: could not find a valid template property or elements for transclusion") : (m = b.isDefined(a.index && !isNaN(parseInt(a.index))) ? parseInt(a.index) : void 0, n = b.isDefined(a.position) ? a.position.toUpperCase().replace(/-/g, "_") : "TOP_CENTER", i.ControlPosition[n] ? d.mapPromise(a, k).then(function(d) {
                                    var i, k, o;
                                    return i = void 0, k = b.element("<div></div>"), o = function(a, b, c) {
                                        return c && (b[0].index = c), a.controls[google.maps.ControlPosition[n]].push(b[0])
                                    }, j ? l(function(a) {
                                        return k.append(a), o(d, k, m)
                                    }) : e.get(a.template, {
                                        cache: f
                                    }).success(function(c) {
                                        var d, e;
                                        return e = a.$new(), k.append(c), b.isDefined(a.controller) && (d = h(a.controller, {
                                            $scope: e
                                        }), k.children().data("$ngControllerController", d)), i = g(k.children())(e)
                                    }).error(function(a) {
                                        return c.$log.error("mapControl: template could not be found")
                                    }).then(function() {
                                        return o(d, i, m)
                                    })
                                }) : void c.$log.error("mapControl: invalid position property"))
                            }
                        }(this))
                    }, k
                }(d)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api").service("uiGmapDragZoom", ["uiGmapCtrlHandle", "uiGmapPropertyAction", function(a, b) {
                return {
                    restrict: "EMA",
                    transclude: !0,
                    template: '<div class="angular-google-map-dragzoom" ng-transclude style="display: none"></div>',
                    require: "^uiGmapGoogleMap",
                    scope: {
                        keyboardkey: "=",
                        options: "=",
                        spec: "="
                    },
                    controller: ["$scope", "$element", function(b, c) {
                        return b.ctrlType = "uiGmapDragZoom", _.extend(this, a.handle(b, c))
                    }],
                    link: function(c, d, e, f) {
                        return a.mapPromise(c, f).then(function(a) {
                            var d, e, f;
                            return d = function(b) {
                                return a.enableKeyDragZoom(b)
                            }, e = new b(function(a, b) {
                                return b ? d({
                                    key: b
                                }) : d()
                            }), f = new b(function(a, b) {
                                return b ? d(b) : void 0
                            }), c.$watch("keyboardkey", e.sic("keyboardkey")), e.sic(c.keyboardkey), c.$watch("options", f.sic("options")), f.sic(c.options)
                        })
                    }
                }
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapDrawingManager", ["uiGmapIDrawingManager", "uiGmapDrawingManagerParentModel", function(a, b) {
                return _.extend(a, {
                    link: function(a, c, d, e) {
                        return e.getScope().deferred.promise.then(function(e) {
                            return new b(a, c, d, e)
                        })
                    }
                })
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapApiFreeDrawPolygons", ["uiGmapLogger", "uiGmapBaseObject", "uiGmapCtrlHandle", "uiGmapDrawFreeHandChildModel", "uiGmapLodash", function(b, d, e, f, g) {
                var h;
                return h = function(d) {
                    function h() {
                        return this.link = a(this.link, this), h.__super__.constructor.apply(this, arguments)
                    }
                    return c(h, d), h.include(e), h.prototype.restrict = "EMA", h.prototype.replace = !0, h.prototype.require = "^uiGmapGoogleMap", h.prototype.scope = {
                        polygons: "=",
                        draw: "="
                    }, h.prototype.link = function(a, c, d, e) {
                        return this.mapPromise(a, e).then(function(c) {
                            return function(c) {
                                var d, h;
                                return a.polygons ? _.isArray(a.polygons) ? (d = new f(c, e.getScope()), h = void 0, a.draw = function() {
                                    return "function" == typeof h && h(), d.engage(a.polygons).then(function() {
                                        var b;
                                        return b = !0, h = a.$watchCollection("polygons", function(a, c) {
                                            var d;
                                            return b || a === c ? void(b = !1) : (d = g.differenceObjects(c, a), d.forEach(function(a) {
                                                return a.setMap(null)
                                            }))
                                        })
                                    })
                                }) : b.error("Free Draw Polygons must be of type Array!") : b.error("No polygons to bind to!")
                            }
                        }(this))
                    }, h
                }(d)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api").service("uiGmapICircle", [function() {
                var a;
                return a = {}, {
                    restrict: "EA",
                    replace: !0,
                    require: "^uiGmapGoogleMap",
                    scope: {
                        center: "=center",
                        radius: "=radius",
                        stroke: "=stroke",
                        fill: "=fill",
                        clickable: "=",
                        draggable: "=",
                        editable: "=",
                        geodesic: "=",
                        icons: "=icons",
                        visible: "=",
                        events: "=",
                        control: "=",
                        zIndex: "=zindex"
                    }
                }
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var e in b) c.call(b, e) && (a[e] = b[e]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                },
                c = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapIControl", ["uiGmapBaseObject", "uiGmapLogger", "uiGmapCtrlHandle", function(b, c, d) {
                var e;
                return e = function(b) {
                    function e() {
                        this.restrict = "EA", this.replace = !0, this.require = "^uiGmapGoogleMap", this.scope = {
                            template: "@template",
                            position: "@position",
                            controller: "@controller",
                            index: "@index"
                        }, this.$log = c
                    }
                    return a(e, b), e.extend(d), e.prototype.link = function(a, b, c, d) {
                        throw new Exception("Not implemented!!")
                    }, e
                }(b)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api").service("uiGmapIDrawingManager", [function() {
                return {
                    restrict: "EA",
                    replace: !0,
                    require: "^uiGmapGoogleMap",
                    scope: {
                        "static": "@",
                        control: "=",
                        options: "=",
                        events: "="
                    }
                }
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var e in b) c.call(b, e) && (a[e] = b[e]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                },
                c = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapIMarker", ["uiGmapBaseObject", "uiGmapCtrlHandle", function(b, c) {
                var d;
                return d = function(b) {
                    function d() {
                        this.restrict = "EMA", this.require = "^uiGmapGoogleMap", this.priority = -1, this.transclude = !0, this.replace = !0, this.scope = _.extend(this.scope || {}, d.scope)
                    }
                    return a(d, b), d.scope = {
                        coords: "=coords",
                        icon: "=icon",
                        click: "&click",
                        options: "=options",
                        events: "=events",
                        fit: "=fit",
                        idKey: "=idkey",
                        control: "=control"
                    }, d.scopeKeys = _.keys(d.scope), d.keys = d.scopeKeys, d.extend(c), d
                }(b)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var e in b) c.call(b, e) && (a[e] = b[e]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                },
                c = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapIPolygon", ["uiGmapGmapUtil", "uiGmapBaseObject", "uiGmapLogger", "uiGmapCtrlHandle", function(b, c, d, e) {
                var f;
                return f = function(c) {
                    function f() {}
                    return a(f, c), f.scope = {
                        path: "=path",
                        stroke: "=stroke",
                        clickable: "=",
                        draggable: "=",
                        editable: "=",
                        geodesic: "=",
                        fill: "=",
                        icons: "=icons",
                        visible: "=",
                        "static": "=",
                        events: "=",
                        zIndex: "=zindex",
                        fit: "=",
                        control: "=control"
                    }, f.scopeKeys = _.keys(f.scope), f.include(b), f.extend(e), f.prototype.restrict = "EMA", f.prototype.replace = !0, f.prototype.require = "^uiGmapGoogleMap", f.prototype.scope = f.scope, f.prototype.DEFAULTS = {}, f.prototype.$log = d, f
                }(c)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var e in b) c.call(b, e) && (a[e] = b[e]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                },
                c = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapIPolyline", ["uiGmapGmapUtil", "uiGmapBaseObject", "uiGmapLogger", "uiGmapCtrlHandle", function(b, c, d, e) {
                var f;
                return f = function(c) {
                    function f() {}
                    return a(f, c), f.scope = {
                        path: "=",
                        stroke: "=",
                        clickable: "=",
                        draggable: "=",
                        editable: "=",
                        geodesic: "=",
                        icons: "=",
                        visible: "=",
                        "static": "=",
                        fit: "=",
                        events: "=",
                        zIndex: "=zindex"
                    }, f.scopeKeys = _.keys(f.scope), f.include(b), f.extend(e), f.prototype.restrict = "EMA", f.prototype.replace = !0, f.prototype.require = "^uiGmapGoogleMap", f.prototype.scope = f.scope, f.prototype.DEFAULTS = {}, f.prototype.$log = d, f
                }(c)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api").service("uiGmapIRectangle", [function() {
                var a;
                return a = {}, {
                    restrict: "EMA",
                    require: "^uiGmapGoogleMap",
                    replace: !0,
                    scope: {
                        bounds: "=",
                        stroke: "=",
                        clickable: "=",
                        draggable: "=",
                        editable: "=",
                        fill: "=",
                        visible: "=",
                        events: "="
                    }
                }
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var e in b) c.call(b, e) && (a[e] = b[e]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                },
                c = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapIWindow", ["uiGmapBaseObject", "uiGmapChildEvents", "uiGmapCtrlHandle", function(b, c, d) {
                var e;
                return e = function(b) {
                    function e() {
                        this.restrict = "EMA", this.template = void 0, this.transclude = !0, this.priority = -100, this.require = "^uiGmapGoogleMap", this.replace = !0, this.scope = _.extend(this.scope || {}, e.scope)
                    }
                    return a(e, b), e.scope = {
                        coords: "=coords",
                        template: "=template",
                        templateUrl: "=templateurl",
                        templateParameter: "=templateparameter",
                        isIconVisibleOnClick: "=isiconvisibleonclick",
                        closeClick: "&closeclick",
                        options: "=options",
                        control: "=control",
                        show: "=show"
                    }, e.scopeKeys = _.keys(e.scope), e.include(c), e.extend(d), e
                }(b)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapMap", ["$timeout", "$q", "$log", "uiGmapGmapUtil", "uiGmapBaseObject", "uiGmapCtrlHandle", "uiGmapIsReady", "uiGmapuuid", "uiGmapExtendGWin", "uiGmapExtendMarkerClusterer", "uiGmapGoogleMapsUtilV3", "uiGmapGoogleMapApi", "uiGmapEventsHelper", "uiGmapGoogleMapObjectManager", function(d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
                var r, s, t;
                return r = void 0, t = [n, l, m], s = function(e) {
                    function h() {
                        this.link = a(this.link, this);
                        var b;
                        b = function(a) {
                            var b, c;
                            return c = void 0, a.$on("$destroy", function() {
                                return j.decrement()
                            }), b = i.handle(a), a.ctrlType = "Map", a.deferred.promise.then(function() {
                                return t.forEach(function(a) {
                                    return a.init()
                                })
                            }), b.getMap = function() {
                                return a.map
                            }, c = _.extend(this, b)
                        }, this.controller = ["$scope", b]
                    }
                    return c(h, e), h.include(g), h.prototype.restrict = "EMA", h.prototype.transclude = !0, h.prototype.replace = !1, h.prototype.template = '<div class="angular-google-map"><div class="angular-google-map-container">\n</div><div ng-transclude style="display: none"></div></div>', h.prototype.scope = {
                        center: "=",
                        zoom: "=",
                        dragging: "=",
                        control: "=",
                        options: "=",
                        events: "=",
                        eventOpts: "=",
                        styles: "=",
                        bounds: "=",
                        update: "="
                    }, h.prototype.link = function(a, c, e) {
                        var g;
                        return g = [], a.$on("$destroy", function() {
                            return p.removeEvents(g), "true" === e.recycleMapInstance && a.map ? (q.recycleMapInstance(a.map), a.map = null) : void 0
                        }), a.idleAndZoomChanged = !1, o.then(function(h) {
                            return function(i) {
                                var l, m, n, o, s, t, u, v, w, x, y, z, A, B, C, D, E;
                                if (r = {
                                        mapTypeId: i.MapTypeId.ROADMAP
                                    }, B = j.spawn(), z = function() {
                                        return B.deferred.resolve({
                                            instance: B.instance,
                                            map: l
                                        })
                                    }, !b.isDefined(a.center) && !b.isDefined(a.bounds)) return void f.error("angular-google-maps: a center or bounds property is required");
                                if (b.isDefined(a.center) || (a.center = new google.maps.LatLngBounds(h.getCoords(a.bounds.southwest), h.getCoords(a.bounds.northeast)).getCenter()), b.isDefined(a.zoom) || (a.zoom = 10), s = b.element(c), s.addClass("angular-google-map"), x = {
                                        options: {}
                                    }, e.options && (x.options = a.options), e.styles && (x.styles = a.styles), e.type && (C = e.type.toUpperCase(), google.maps.MapTypeId.hasOwnProperty(C) ? x.mapTypeId = google.maps.MapTypeId[e.type.toUpperCase()] : f.error("angular-google-maps: invalid map type '" + e.type + "'")), v = b.extend({}, r, x, {
                                        center: h.getCoords(a.center),
                                        zoom: a.zoom,
                                        bounds: a.bounds
                                    }), l = "true" === e.recycleMapInstance ? q.createMapInstance(s.find("div")[1], v) : new google.maps.Map(s.find("div")[1], v), l.uiGmap_id = k.generate(), o = !1, g.push(google.maps.event.addListenerOnce(l, "idle", function() {
                                        return a.deferred.resolve(l), z()
                                    })), n = e.events && null != (null != (y = a.events) ? y.blacklist : void 0) ? a.events.blacklist : [], _.isString(n) && (n = [n]), w = function(b, c, d) {
                                        return _.includes(n, b) ? void 0 : (d && d(), g.push(google.maps.event.addListener(l, b, function() {
                                            var b;
                                            return (null != (b = a.update) ? b.lazy : void 0) ? void 0 : c()
                                        })))
                                    }, _.includes(n, "all") || (w("dragstart", function() {
                                        return o = !0, a.$evalAsync(function(a) {
                                            return null != a.dragging ? a.dragging = o : void 0
                                        })
                                    }), w("dragend", function() {
                                        return o = !1, a.$evalAsync(function(a) {
                                            return null != a.dragging ? a.dragging = o : void 0
                                        })
                                    }), D = function(b, c) {
                                        return null == b && (b = l.center), null == c && (c = a), _.includes(n, "center") && (c.center.latitude !== b.lat() && (c.center.latitude = b.lat()), c.center.longitude !== b.lng()) ? c.center.longitude = b.lng() : void 0
                                    }, A = !1, w("idle", function() {
                                        var b, c, d;
                                        return b = l.getBounds(), c = b.getNorthEast(), d = b.getSouthWest(), A = !0, a.$evalAsync(function(b) {
                                            return D(), _.isUndefined(b.bounds) || _.includes(n, "bounds") || (b.bounds.northeast = {
                                                latitude: c.lat(),
                                                longitude: c.lng()
                                            }, b.bounds.southwest = {
                                                latitude: d.lat(),
                                                longitude: d.lng()
                                            }), _.includes(n, "zoom") || (b.zoom = l.zoom, a.idleAndZoomChanged = !a.idleAndZoomChanged), A = !1
                                        })
                                    })), b.isDefined(a.events) && null !== a.events && b.isObject(a.events)) {
                                    u = function(b) {
                                        return function() {
                                            return a.events[b].apply(a, [l, b, arguments])
                                        }
                                    }, m = [];
                                    for (t in a.events) a.events.hasOwnProperty(t) && b.isFunction(a.events[t]) && m.push(google.maps.event.addListener(l, t, u(t)));
                                    g.concat(m)
                                }
                                return l.getOptions = function() {
                                    return v
                                }, a.map = l, null != e.control && null != a.control && (a.control.refresh = function(a) {
                                    var b, c, d;
                                    if (null != l) return null != ("undefined" != typeof google && null !== google && null != (c = google.maps) && null != (d = c.event) ? d.trigger : void 0) && null != l && google.maps.event.trigger(l, "resize"), null != (null != a ? a.latitude : void 0) && null != (null != a ? a.longitude : void 0) ? (b = h.getCoords(a), h.isTrue(e.pan) ? l.panTo(b) : l.setCenter(b)) : void 0
                                }, a.control.getGMap = function() {
                                    return l
                                }, a.control.getMapOptions = function() {
                                    return v
                                }, a.control.getCustomEventListeners = function() {
                                    return m
                                }, a.control.removeEvents = function(a) {
                                    return p.removeEvents(a)
                                }), a.$watch("center", function(b, c) {
                                    var d;
                                    if (b !== c && !A && (d = h.getCoords(a.center), d.lat() !== l.center.lat() || d.lng() !== l.center.lng())) return o ? void 0 : (h.validateCoords(b) || f.error("Invalid center for newValue: " + JSON.stringify(b)), h.isTrue(e.pan) && a.zoom === l.zoom ? l.panTo(d) : l.setCenter(d))
                                }, !0), E = null, a.$watch("zoom", function(b, c) {
                                    var e, f;
                                    if (null != b && !_.isEqual(b, c) && (null != l ? l.getZoom() : void 0) !== (null != a ? a.zoom : void 0) && !A) return null != E && d.cancel(E), E = d(function() {
                                        return l.setZoom(b)
                                    }, (null != (e = a.eventOpts) && null != (f = e.debounce) ? f.zoomMs : void 0) + 20, !1)
                                }), a.$watch("bounds", function(a, b) {
                                    var c, d, e, g, h, i, j;
                                    if (a !== b) return null == (null != a && null != (e = a.northeast) ? e.latitude : void 0) || null == (null != a && null != (g = a.northeast) ? g.longitude : void 0) || null == (null != a && null != (h = a.southwest) ? h.latitude : void 0) || null == (null != a && null != (i = a.southwest) ? i.longitude : void 0) ? void f.error("Invalid map bounds for new value: " + JSON.stringify(a)) : (d = new google.maps.LatLng(a.northeast.latitude, a.northeast.longitude), j = new google.maps.LatLng(a.southwest.latitude, a.southwest.longitude), c = new google.maps.LatLngBounds(j, d), l.fitBounds(c))
                                }), ["options", "styles"].forEach(function(b) {
                                    return a.$watch(b, function(a, c) {
                                        return _.isEqual(a, c) ? void 0 : ("options" === b ? x.options = a : x.options[b] = a, null != l ? l.setOptions(x) : void 0)
                                    }, !0)
                                })
                            }
                        }(this))
                    }, h
                }(h)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var e in b) c.call(b, e) && (a[e] = b[e]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                },
                c = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapMarker", ["uiGmapIMarker", "uiGmapMarkerChildModel", "uiGmapMarkerManager", "uiGmapLogger", function(b, c, d, e) {
                var f;
                return f = function(f) {
                    function g() {
                        g.__super__.constructor.call(this), this.template = '<span class="angular-google-map-marker" ng-transclude></span>', e.info(this)
                    }
                    return a(g, f), g.prototype.controller = ["$scope", "$element", function(a, c) {
                        return a.ctrlType = "Marker", _.extend(this, b.handle(a, c))
                    }], g.prototype.link = function(a, e, f, g) {
                        var h;
                        return h = b.mapPromise(a, g), h.then(function(e) {
                            var f, g, h;
                            return f = new d(e), g = _.object(b.keys, b.keys), h = new c({
                                scope: a,
                                model: a,
                                keys: g,
                                gMap: e,
                                doClick: !0,
                                gManager: f,
                                doDrawSelf: !1,
                                trackModel: !1
                            }), h.deferred.promise.then(function(b) {
                                return a.deferred.resolve(b)
                            }), null != a.control ? a.control.getGMarkers = f.getGMarkers : void 0
                        }), a.$on("$destroy", function() {
                            var a;
                            return "undefined" != typeof a && null !== a && a.clear(), a = null
                        })
                    }, g
                }(b)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    function d() {
                        this.constructor = a
                    }
                    for (var e in b) c.call(b, e) && (a[e] = b[e]);
                    return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
                },
                c = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapMarkers", ["uiGmapIMarker", "uiGmapPlural", "uiGmapMarkersParentModel", "uiGmap_sync", "uiGmapLogger", function(b, c, d, e, f) {
                var g;
                return g = function(e) {
                    function g() {
                        g.__super__.constructor.call(this), this.template = '<span class="angular-google-map-markers" ng-transclude></span>', c.extend(this, {
                            doCluster: "=?docluster",
                            clusterOptions: "=clusteroptions",
                            clusterEvents: "=clusterevents",
                            modelsByRef: "=modelsbyref",
                            type: "=?type",
                            typeOptions: "=?typeoptions",
                            typeEvents: "=?typeevents"
                        }), f.info(this)
                    }
                    return a(g, e), g.prototype.controller = ["$scope", "$element", function(a, c) {
                        return a.ctrlType = "Markers", _.extend(this, b.handle(a, c))
                    }], g.prototype.link = function(a, e, f, g) {
                        var h, i;
                        return h = void 0, i = function() {
                            return a.deferred.resolve()
                        }, b.mapPromise(a, g).then(function(b) {
                            var j;
                            return j = g.getScope(), j.$watch("idleAndZoomChanged", function() {
                                return _.defer(h.gManager.draw)
                            }), h = new d(a, e, f, b), c.link(a, h), null != a.control && (a.control.getGMarkers = function() {
                                var a;
                                return null != (a = h.gManager) ? a.getGMarkers() : void 0
                            }, a.control.getChildMarkers = function() {
                                return h.plurals
                            }), _.last(h.existingPieces._content).then(function() {
                                return i()
                            })
                        })
                    }, g
                }(b)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api").service("uiGmapPlural", [function() {
                var a;
                return a = function(a, b) {
                    return null != a.control ? (a.control.updateModels = function(c) {
                        return a.models = c, b.createChildScopes(!1)
                    }, a.control.newModels = function(c) {
                        return a.models = c, b.rebuildAll(a, !0, !0)
                    }, a.control.clean = function() {
                        return b.rebuildAll(a, !1, !0)
                    }, a.control.getPlurals = function() {
                        return b.plurals
                    }, a.control.getManager = function() {
                        return b.gManager
                    }, a.control.hasManager = function() {
                        return null != b.gManager == !0
                    }, a.control.managerDraw = function() {
                        var b;
                        return a.control.hasManager() && null != (b = a.control.getManager()) ? b.draw() : void 0
                    }) : void 0
                }, {
                    extend: function(a, b) {
                        return _.extend(a.scope || {}, b || {}, {
                            idKey: "=idkey",
                            doRebuildAll: "=dorebuildall",
                            models: "=models",
                            chunk: "=chunk",
                            cleanchunk: "=cleanchunk",
                            control: "=control"
                        })
                    },
                    link: function(b, c) {
                        return a(b, c)
                    }
                }
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolygon", ["uiGmapIPolygon", "$timeout", "uiGmapPolygonChildModel", function(b, d, e) {
                var f;
                return f = function(d) {
                    function f() {
                        return this.link = a(this.link, this), f.__super__.constructor.apply(this, arguments)
                    }
                    return c(f, d), f.prototype.link = function(a, c, d, f) {
                        var g, h;
                        return g = [], h = b.mapPromise(a, f), null != a.control && (a.control.getInstance = this, a.control.polygons = g, a.control.promise = h), h.then(function(b) {
                            return function(c) {
                                return g.push(new e({
                                    scope: a,
                                    attrs: d,
                                    gMap: c,
                                    defaults: b.DEFAULTS
                                }))
                            }
                        }(this))
                    }, f
                }(b)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolygons", ["uiGmapIPolygon", "$timeout", "uiGmapPolygonsParentModel", "uiGmapPlural", function(d, e, f, g) {
                var h;
                return h = function(d) {
                    function e() {
                        this.link = a(this.link, this), e.__super__.constructor.call(this), g.extend(this), this.$log.info(this)
                    }
                    return c(e, d), e.prototype.link = function(a, c, d, e) {
                        return e.getScope().deferred.promise.then(function(e) {
                            return function(h) {
                                return (b.isUndefined(a.path) || null === a.path) && e.$log.warn("polygons: no valid path attribute found"), a.models || e.$log.warn("polygons: no models found to create from"), g.link(a, new f(a, c, d, h, e.DEFAULTS))
                            }
                        }(this))
                    }, e
                }(d)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolyline", ["uiGmapIPolyline", "$timeout", "uiGmapPolylineChildModel", function(d, e, f) {
                var g;
                return g = function(e) {
                    function g() {
                        return this.link = a(this.link, this), g.__super__.constructor.apply(this, arguments)
                    }
                    return c(g, e), g.prototype.link = function(a, c, e, g) {
                        return d.mapPromise(a, g).then(function(c) {
                            return function(d) {
                                return !b.isUndefined(a.path) && null !== a.path && c.validatePath(a.path) || c.$log.warn("polyline: no valid path attribute found"), new f({
                                    scope: a,
                                    attrs: e,
                                    gMap: d,
                                    defaults: c.DEFAULTS
                                })
                            }
                        }(this))
                    }, g
                }(d)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapPolylines", ["uiGmapIPolyline", "$timeout", "uiGmapPolylinesParentModel", "uiGmapPlural", function(d, e, f, g) {
                var h;
                return h = function(d) {
                    function e() {
                        this.link = a(this.link, this), e.__super__.constructor.call(this), g.extend(this), this.$log.info(this)
                    }
                    return c(e, d), e.prototype.link = function(a, c, d, e) {
                        return e.getScope().deferred.promise.then(function(e) {
                            return function(h) {
                                return (b.isUndefined(a.path) || null === a.path) && e.$log.warn("polylines: no valid path attribute found"), a.models || e.$log.warn("polylines: no models found to create from"), g.link(a, new f(a, c, d, h, e.DEFAULTS))
                            }
                        }(this))
                    }, e
                }(d)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapRectangle", ["uiGmapLogger", "uiGmapGmapUtil", "uiGmapIRectangle", "uiGmapRectangleParentModel", function(a, b, c, d) {
                return _.extend(c, {
                    link: function(a, b, c, e) {
                        return e.getScope().deferred.promise.then(function(e) {
                            return new d(a, b, c, e)
                        })
                    }
                })
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapWindow", ["uiGmapIWindow", "uiGmapGmapUtil", "uiGmapWindowChildModel", "uiGmapLodash", "uiGmapLogger", function(d, e, f, g, h) {
                var i;
                return i = function(i) {
                    function j() {
                        this.link = a(this.link, this), j.__super__.constructor.call(this), this.require = ["^uiGmapGoogleMap", "^?uiGmapMarker"], this.template = '<span class="angular-google-maps-window" ng-transclude></span>', h.debug(this), this.childWindows = []
                    }
                    return c(j, i), j.include(e), j.prototype.link = function(a, c, e, f) {
                        var g, h;
                        return g = f.length > 1 && null != f[1] ? f[1] : void 0, h = null != g ? g.getScope() : void 0, this.mapPromise = d.mapPromise(a, f[0]), this.mapPromise.then(function(d) {
                            return function(f) {
                                var i;
                                return i = !0, b.isDefined(e.isiconvisibleonclick) && (i = a.isIconVisibleOnClick), g ? h.deferred.promise.then(function(b) {
                                    return d.init(a, c, i, f, h)
                                }) : void d.init(a, c, i, f)
                            }
                        }(this))
                    }, j.prototype.init = function(a, b, c, d, e) {
                        var h, i, j, k, l;
                        return i = null != a.options ? a.options : {}, k = null != a && this.validateCoords(a.coords), null != (null != e ? e.getGMarker : void 0) && (j = e.getGMarker()), l = k ? this.createWindowOptions(j, a, b.html(), i) : i, null != d && (h = new f({
                            scope: a,
                            opts: l,
                            isIconVisibleOnClick: c,
                            gMap: d,
                            markerScope: e,
                            element: b
                        }), this.childWindows.push(h), a.$on("$destroy", function(a) {
                            return function() {
                                return a.childWindows = g.withoutObjects(a.childWindows, [h], function(a, b) {
                                    return a.scope.$id === b.scope.$id
                                }), a.childWindows.length = 0
                            }
                        }(this))), null != a.control && (a.control.getGWindows = function(a) {
                            return function() {
                                return a.childWindows.map(function(a) {
                                    return a.gObject
                                })
                            }
                        }(this), a.control.getChildWindows = function(a) {
                            return function() {
                                return a.childWindows
                            }
                        }(this), a.control.getPlurals = a.control.getChildWindows, a.control.showWindow = function(a) {
                            return function() {
                                return a.childWindows.map(function(a) {
                                    return a.showWindow()
                                })
                            }
                        }(this), a.control.hideWindow = function(a) {
                            return function() {
                                return a.childWindows.map(function(a) {
                                    return a.hideWindow()
                                })
                            }
                        }(this)), null != this.onChildCreation && null != h ? this.onChildCreation(h) : void 0
                    }, j
                }(d)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                c = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var e in b) d.call(b, e) && (a[e] = b[e]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                d = {}.hasOwnProperty;
            b.module("uiGmapgoogle-maps.directives.api").factory("uiGmapWindows", ["uiGmapIWindow", "uiGmapPlural", "uiGmapWindowsParentModel", "uiGmapPromise", "uiGmapLogger", function(b, d, e, f, g) {
                var h;
                return h = function(b) {
                    function h() {
                        this.link = a(this.link, this), h.__super__.constructor.call(this), this.require = ["^uiGmapGoogleMap", "^?uiGmapMarkers"], this.template = '<span class="angular-google-maps-windows" ng-transclude></span>', d.extend(this), g.debug(this)
                    }
                    return c(h, b), h.prototype.link = function(a, b, c, d) {
                        var e, g, h;
                        return e = d[0].getScope(), g = d.length > 1 && null != d[1] ? d[1] : void 0, h = null != g ? g.getScope() : void 0, e.deferred.promise.then(function(e) {
                            return function(g) {
                                var i, j;
                                return i = (null != h && null != (j = h.deferred) ? j.promise : void 0) || f.resolve(), i.then(function() {
                                    var f, i;
                                    return f = null != (i = e.parentModel) ? i.existingPieces : void 0, f ? f.then(function() {
                                        return e.init(a, b, c, d, g, h)
                                    }) : e.init(a, b, c, d, g, h)
                                })
                            }
                        }(this))
                    }, h.prototype.init = function(a, b, c, f, g, h) {
                        var i;
                        return i = new e(a, b, c, f, g, h), d.link(a, i), null != a.control ? (a.control.getGWindows = function() {
                            return i.plurals.map(function(a) {
                                return a.gObject
                            })
                        }, a.control.getChildWindows = function() {
                            return i.plurals
                        }) : void 0
                    }, h
                }(b)
            }]);
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapGoogleMap", ["uiGmapMap", function(a) {
                return new a
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapMarker", ["$timeout", "uiGmapMarker", function(a, b) {
                return new b(a)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapMarkers", ["$timeout", "uiGmapMarkers", function(a, b) {
                return new b(a)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapPolygon", ["uiGmapPolygon", function(a) {
                return new a
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapCircle", ["uiGmapCircle", function(a) {
                return a
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapPolyline", ["uiGmapPolyline", function(a) {
                return new a
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapPolylines", ["uiGmapPolylines", function(a) {
                return new a
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapRectangle", ["uiGmapLogger", "uiGmapRectangle", function(a, b) {
                return b
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapWindow", ["$timeout", "$compile", "$http", "$templateCache", "uiGmapWindow", function(a, b, c, d, e) {
                return new e(a, b, c, d)
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapWindows", ["$timeout", "$compile", "$http", "$templateCache", "$interpolate", "uiGmapWindows", function(a, b, c, d, e, f) {
                return new f(a, b, c, d, e)
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            };
            b.module("uiGmapgoogle-maps").directive("uiGmapLayer", ["$timeout", "uiGmapLogger", "uiGmapLayerParentModel", function(b, c, d) {
                var e;
                return new(e = function() {
                    function b() {
                        this.link = a(this.link, this), this.$log = c, this.restrict = "EMA", this.require = "^uiGmapGoogleMap", this.priority = -1, this.transclude = !0, this.template = "<span class='angular-google-map-layer' ng-transclude></span>", this.replace = !0, this.scope = {
                            show: "=show",
                            type: "=type",
                            namespace: "=namespace",
                            options: "=options",
                            onCreated: "&oncreated"
                        }
                    }
                    return b.prototype.link = function(a, b, c, e) {
                        return e.getScope().deferred.promise.then(function(e) {
                            return function(e) {
                                return null != a.onCreated ? new d(a, b, c, e, a.onCreated) : new d(a, b, c, e)
                            }
                        }(this))
                    }, b
                }())
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapMapControl", ["uiGmapControl", function(a) {
                return new a
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapDragZoom", ["uiGmapDragZoom", function(a) {
                return a
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapDrawingManager", ["uiGmapDrawingManager", function(a) {
                return a
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapFreeDrawPolygons", ["uiGmapApiFreeDrawPolygons", function(a) {
                return new a
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            };
            b.module("uiGmapgoogle-maps").directive("uiGmapMapType", ["$timeout", "uiGmapLogger", "uiGmapMapTypeParentModel", function(b, c, d) {
                var e;
                return new(e = function() {
                    function b() {
                        this.link = a(this.link, this), this.$log = c, this.restrict = "EMA", this.require = "^uiGmapGoogleMap", this.priority = -1, this.transclude = !0, this.template = '<span class="angular-google-map-layer" ng-transclude></span>', this.replace = !0, this.scope = {
                            show: "=show",
                            options: "=options",
                            refresh: "=refresh",
                            id: "@"
                        }
                    }
                    return b.prototype.link = function(a, b, c, e) {
                        return e.getScope().deferred.promise.then(function(e) {
                            return function(e) {
                                return new d(a, b, c, e)
                            }
                        }(this))
                    }, b
                }())
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapPolygons", ["uiGmapPolygons", function(a) {
                return new a
            }])
        }.call(this),
        function() {
            var a = function(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            };
            b.module("uiGmapgoogle-maps").directive("uiGmapSearchBox", ["uiGmapGoogleMapApi", "uiGmapLogger", "uiGmapSearchBoxParentModel", "$http", "$templateCache", "$compile", function(c, d, e, f, g, h) {
                var i;
                return new(i = function() {
                    function i() {
                        this.link = a(this.link, this), this.$log = d, this.restrict = "EMA", this.require = "^uiGmapGoogleMap", this.priority = -1, this.transclude = !0, this.template = "<span class='angular-google-map-search' ng-transclude></span>", this.replace = !0, this.scope = {
                            template: "=template",
                            events: "=events",
                            position: "=?position",
                            options: "=?options",
                            parentdiv: "=?parentdiv",
                            ngModel: "=?"
                        }
                    }
                    return i.prototype.require = "ngModel", i.prototype.link = function(a, d, i, j) {
                        return c.then(function(c) {
                            return function(k) {
                                return null == a.template && (g.put("uigmap-searchbox-default.tpl.html", '<input type="text">'), a.template = "uigmap-searchbox-default.tpl.html"), f.get(a.template, {
                                    cache: g
                                }).success(function(f) {
                                    return b.isUndefined(a.events) ? void c.$log.error("searchBox: the events property is required") : j.getScope().deferred.promise.then(function(g) {
                                        var j;
                                        return j = b.isDefined(a.position) ? a.position.toUpperCase().replace(/-/g, "_") : "TOP_LEFT", k.ControlPosition[j] ? new e(a, d, i, g, j, h(f)(a)) : void c.$log.error("searchBox: invalid position property")
                                    })
                                })
                            }
                        }(this))
                    }, i
                }())
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapShow", ["$animate", "uiGmapLogger", function(a, c) {
                return {
                    scope: {
                        uiGmapShow: "=",
                        uiGmapAfterShow: "&",
                        uiGmapAfterHide: "&"
                    },
                    link: function(d, e) {
                        var f, g, h;
                        return f = function(b, c) {
                            return a[b](e, "ng-hide").then(function() {
                                return c()
                            })
                        }, g = function(b, c) {
                            return a[b](e, "ng-hide", c)
                        }, h = function(a, d) {
                            return b.version.major > 1 ? c.error("uiGmapShow is not supported for Angular Major greater than 1.\nYour Major is " + b.version.major + '"') : 1 === b.version.major && b.version.minor < 3 ? g(a, d) : f(a, d)
                        }, d.$watch("uiGmapShow", function(a) {
                            return a && h("removeClass", d.uiGmapAfterShow), a ? void 0 : h("addClass", d.uiGmapAfterHide)
                        })
                    }
                }
            }])
        }.call(this),
        function() {
            b.module("uiGmapgoogle-maps").directive("uiGmapStreetViewPanorama", ["uiGmapGoogleMapApi", "uiGmapLogger", "uiGmapGmapUtil", "uiGmapEventsHelper", function(a, c, d, e) {
                var f;
                return f = "uiGmapStreetViewPanorama", {
                    restrict: "EMA",
                    template: '<div class="angular-google-map-street-view-panorama"></div>',
                    replace: !0,
                    scope: {
                        focalcoord: "=",
                        radius: "=?",
                        events: "=?",
                        options: "=?",
                        control: "=?",
                        povoptions: "=?",
                        imagestatus: "="
                    },
                    link: function(g, h, i) {
                        return a.then(function(a) {
                            return function(a) {
                                var i, j, k, l, m, n, o, p, q, r;
                                return p = void 0, r = void 0, k = !1, n = void 0, o = null, q = null, i = function() {
                                    return e.removeEvents(n), null != p && (p.unbind("position"), p.setVisible(!1)), null != r ? (null != (null != r ? r.setVisible : void 0) && r.setVisible(!1), r = void 0) : void 0
                                }, m = function(a, c) {
                                    var d;
                                    return d = google.maps.geometry.spherical.computeHeading(a, c), k = !0, g.radius = g.radius || 50, q = b.extend({
                                        heading: d,
                                        zoom: 1,
                                        pitch: 0
                                    }, g.povoptions || {}), o = o = b.extend({
                                        navigationControl: !1,
                                        addressControl: !1,
                                        linksControl: !1,
                                        position: a,
                                        pov: q,
                                        visible: !0
                                    }, g.options || {}), k = !1
                                }, j = function() {
                                    var a;
                                    return g.focalcoord ? g.radius ? (i(), null == r && (r = new google.maps.StreetViewService), g.events && (n = e.setEvents(r, g, g)), a = d.getCoords(g.focalcoord), r.getPanoramaByLocation(a, g.radius, function(b, c) {
                                        var d, e, f;
                                        return null != g.imagestatus && (g.imagestatus = c), null != (null != (f = g.events) ? f.image_status_changed : void 0) && g.events.image_status_changed(r, "image_status_changed", g, c), "OK" === c ? (e = b.location.latLng, m(e, a), d = h[0], p = new google.maps.StreetViewPanorama(d, o)) : void 0
                                    })) : void c.error(f + ": needs a radius to set the camera view from its focal target.") : void c.error(f + ": focalCoord needs to be defined")
                                }, null != g.control && (g.control.getOptions = function() {
                                    return o
                                }, g.control.getPovOptions = function() {
                                    return q
                                }, g.control.getGObject = function() {
                                    return r
                                }, g.control.getGPano = function() {
                                    return p
                                }), g.$watch("options", function(a, b) {
                                    return a === b || a === o || k ? void 0 : j()
                                }), l = !0, g.$watch("focalcoord", function(a, b) {
                                    return a === b && !l || null == a ? void 0 : (l = !1, j())
                                }), g.$on("$destroy", function() {
                                    return i()
                                })
                            }
                        }(this))
                    }
                }
            }])
        }.call(this), b.module("uiGmapgoogle-maps.wrapped").service("uiGmapuuid", function() {
            function a() {}
            return a.generate = function() {
                var b = a._gri,
                    c = a._ha;
                return c(b(32), 8) + "-" + c(b(16), 4) + "-" + c(16384 | b(12), 4) + "-" + c(32768 | b(14), 4) + "-" + c(b(48), 12)
            }, a._gri = function(a) {
                return 0 > a ? NaN : 30 >= a ? 0 | Math.random() * (1 << a) : 53 >= a ? (0 | 1073741824 * Math.random()) + 1073741824 * (0 | Math.random() * (1 << a - 30)) : NaN
            }, a._ha = function(a, b) {
                for (var c = a.toString(16), d = b - c.length, e = "0"; d > 0; d >>>= 1, e += e) 1 & d && (c = e + c);
                return c
            }, a
        }), b.module("uiGmapgoogle-maps.wrapped").service("uiGmapGoogleMapsUtilV3", function() {
            return {
                init: _.once(function() {
                    + function() {
                        function b(a, c) {
                            a.getMarkerClusterer().extend(b, google.maps.OverlayView), this.cluster_ = a, this.className_ = a.getMarkerClusterer().getClusterClass(), this.styles_ = c, this.center_ = null, this.div_ = null, this.sums_ = null, this.visible_ = !1, this.setMap(a.getMap())
                        }

                        function d(a) {
                            this.markerClusterer_ = a, this.map_ = a.getMap(), this.gridSize_ = a.getGridSize(), this.minClusterSize_ = a.getMinimumClusterSize(), this.averageCenter_ = a.getAverageCenter(), this.hideLabel_ = a.getHideLabel(), this.markers_ = [], this.center_ = null, this.bounds_ = null, this.clusterIcon_ = new b(this, a.getStyles())
                        }

                        function e(a, b, c) {
                            this.extend(e, google.maps.OverlayView), b = b || [], c = c || {}, this.markers_ = [], this.clusters_ = [], this.listeners_ = [], this.activeMap_ = null, this.ready_ = !1, this.gridSize_ = c.gridSize || 60, this.minClusterSize_ = c.minimumClusterSize || 2, this.maxZoom_ = c.maxZoom || null, this.styles_ = c.styles || [], this.title_ = c.title || "", this.zoomOnClick_ = !0, void 0 !== c.zoomOnClick && (this.zoomOnClick_ = c.zoomOnClick), this.averageCenter_ = !1, void 0 !== c.averageCenter && (this.averageCenter_ = c.averageCenter), this.ignoreHidden_ = !1, void 0 !== c.ignoreHidden && (this.ignoreHidden_ = c.ignoreHidden), this.enableRetinaIcons_ = !1, void 0 !== c.enableRetinaIcons && (this.enableRetinaIcons_ = c.enableRetinaIcons), this.hideLabel_ = !1, void 0 !== c.hideLabel && (this.hideLabel_ = c.hideLabel), this.imagePath_ = c.imagePath || e.IMAGE_PATH, this.imageExtension_ = c.imageExtension || e.IMAGE_EXTENSION, this.imageSizes_ = c.imageSizes || e.IMAGE_SIZES, this.calculator_ = c.calculator || e.CALCULATOR, this.batchSize_ = c.batchSize || e.BATCH_SIZE, this.batchSizeIE_ = c.batchSizeIE || e.BATCH_SIZE_IE, this.clusterClass_ = c.clusterClass || "cluster", -1 !== navigator.userAgent.toLowerCase().indexOf("msie") && (this.batchSize_ = this.batchSizeIE_), this.setupStyles_(), this.addMarkers(b, !0), this.setMap(a)
                        }

                        function f(a) {
                            a = a || {}, google.maps.OverlayView.apply(this, arguments), this.content_ = a.content || "", this.disableAutoPan_ = a.disableAutoPan || !1, this.maxWidth_ = a.maxWidth || 0, this.pixelOffset_ = a.pixelOffset || new google.maps.Size(0, 0), this.position_ = a.position || new google.maps.LatLng(0, 0), this.zIndex_ = a.zIndex || null, this.boxClass_ = a.boxClass || "infoBox", this.boxStyle_ = a.boxStyle || {}, this.closeBoxMargin_ = a.closeBoxMargin || "2px", this.closeBoxURL_ = a.closeBoxURL || "http://www.google.com/intl/en_us/mapfiles/close.gif", "" === a.closeBoxURL && (this.closeBoxURL_ = ""), this.infoBoxClearance_ = a.infoBoxClearance || new google.maps.Size(1, 1), "undefined" == typeof a.visible && ("undefined" == typeof a.isHidden ? a.visible = !0 : a.visible = !a.isHidden), this.isHidden_ = !a.visible, this.alignBottom_ = a.alignBottom || !1, this.pane_ = a.pane || "floatPane", this.enableEventPropagation_ = a.enableEventPropagation || !1, this.div_ = null, this.closeListener_ = null, this.moveListener_ = null, this.contextListener_ = null, this.eventListeners_ = null, this.fixedWidthSet_ = null
                        }

                        function g(a, b) {
                            function c() {}
                            c.prototype = b.prototype, a.superClass_ = b.prototype, a.prototype = new c, a.prototype.constructor = a
                        }

                        function h(a, b, c) {
                            this.marker_ = a, this.handCursorURL_ = a.handCursorURL, this.labelDiv_ = document.createElement("div"), this.labelDiv_.style.cssText = "position: absolute; overflow: hidden;", this.eventDiv_ = document.createElement("div"), this.eventDiv_.style.cssText = this.labelDiv_.style.cssText, this.eventDiv_.setAttribute("onselectstart", "return false;"), this.eventDiv_.setAttribute("ondragstart", "return false;"), this.crossDiv_ = h.getSharedCross(b)
                        }

                        function i(a) {
                            a = a || {}, a.labelContent = a.labelContent || "", a.labelAnchor = a.labelAnchor || new google.maps.Point(0, 0), a.labelClass = a.labelClass || "markerLabels", a.labelStyle = a.labelStyle || {}, a.labelInBackground = a.labelInBackground || !1, "undefined" == typeof a.labelVisible && (a.labelVisible = !0), "undefined" == typeof a.raiseOnDrag && (a.raiseOnDrag = !0), "undefined" == typeof a.clickable && (a.clickable = !0), "undefined" == typeof a.draggable && (a.draggable = !1), "undefined" == typeof a.optimized && (a.optimized = !1), a.crossImage = a.crossImage || "http" + ("https:" === document.location.protocol ? "s" : "") + "://maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png", a.handCursor = a.handCursor || "http" + ("https:" === document.location.protocol ? "s" : "") + "://maps.gstatic.com/intl/en_us/mapfiles/closedhand_8_8.cur", a.optimized = !1, this.label = new h(this, a.crossImage, a.handCursor), google.maps.Marker.apply(this, arguments)
                        }

                        function j(a) {
                            var b = a || {};
                            this.ready_ = !1, this.dragging_ = !1, a.visible == c && (a.visible = !0), a.shadow == c && (a.shadow = "7px -3px 5px rgba(88,88,88,0.7)"), a.anchor == c && (a.anchor = k.BOTTOM), this.setValues(b)
                        }
                        b.prototype.onAdd = function() {
                                var a, b, c = this;
                                this.div_ = document.createElement("div"), this.div_.className = this.className_, this.visible_ && this.show(), this.getPanes().overlayMouseTarget.appendChild(this.div_), this.boundsChangedListener_ = google.maps.event.addListener(this.getMap(), "bounds_changed", function() {
                                    b = a
                                }), google.maps.event.addDomListener(this.div_, "mousedown", function() {
                                    a = !0, b = !1
                                }), google.maps.event.addDomListener(this.div_, "click", function(d) {
                                    if (a = !1, !b) {
                                        var e, f, g = c.cluster_.getMarkerClusterer();
                                        google.maps.event.trigger(g, "click", c.cluster_), google.maps.event.trigger(g, "clusterclick", c.cluster_), g.getZoomOnClick() && (f = g.getMaxZoom(), e = c.cluster_.getBounds(), g.getMap().fitBounds(e), setTimeout(function() {
                                            g.getMap().fitBounds(e), null !== f && g.getMap().getZoom() > f && g.getMap().setZoom(f + 1)
                                        }, 100)), d.cancelBubble = !0, d.stopPropagation && d.stopPropagation()
                                    }
                                }), google.maps.event.addDomListener(this.div_, "mouseover", function() {
                                    var a = c.cluster_.getMarkerClusterer();
                                    google.maps.event.trigger(a, "mouseover", c.cluster_)
                                }), google.maps.event.addDomListener(this.div_, "mouseout", function() {
                                    var a = c.cluster_.getMarkerClusterer();
                                    google.maps.event.trigger(a, "mouseout", c.cluster_)
                                })
                            }, b.prototype.onRemove = function() {
                                this.div_ && this.div_.parentNode && (this.hide(), google.maps.event.removeListener(this.boundsChangedListener_), google.maps.event.clearInstanceListeners(this.div_), this.div_.parentNode.removeChild(this.div_), this.div_ = null)
                            }, b.prototype.draw = function() {
                                if (this.visible_) {
                                    var a = this.getPosFromLatLng_(this.center_);
                                    this.div_.style.top = a.y + "px", this.div_.style.left = a.x + "px"
                                }
                            }, b.prototype.hide = function() {
                                this.div_ && (this.div_.style.display = "none"), this.visible_ = !1
                            }, b.prototype.show = function() {
                                if (this.div_) {
                                    var a = "",
                                        b = this.backgroundPosition_.split(" "),
                                        c = parseInt(b[0].trim(), 10),
                                        d = parseInt(b[1].trim(), 10),
                                        e = this.getPosFromLatLng_(this.center_);
                                    this.div_.style.cssText = this.createCss(e), a = "<img src='" + this.url_ + "' style='position: absolute; top: " + d + "px; left: " + c + "px; ", a += this.cluster_.getMarkerClusterer().enableRetinaIcons_ ? "width: " + this.width_ + "px;height: " + this.height_ + "px;" : "clip: rect(" + -1 * d + "px, " + (-1 * c + this.width_) + "px, " + (-1 * d + this.height_) + "px, " + -1 * c + "px);", a += "'>", this.div_.innerHTML = a + "<div style='position: absolute;top: " + this.anchorText_[0] + "px;left: " + this.anchorText_[1] + "px;color: " + this.textColor_ + ";font-size: " + this.textSize_ + "px;font-family: " + this.fontFamily_ + ";font-weight: " + this.fontWeight_ + ";font-style: " + this.fontStyle_ + ";text-decoration: " + this.textDecoration_ + ";text-align: center;width: " + this.width_ + "px;line-height:" + this.height_ + "px;'>" + (this.cluster_.hideLabel_ ? " " : this.sums_.text) + "</div>", this.div_.title = "undefined" == typeof this.sums_.title || "" === this.sums_.title ? this.cluster_.getMarkerClusterer().getTitle() : this.sums_.title, this.div_.style.display = ""
                                }
                                this.visible_ = !0
                            }, b.prototype.useStyle = function(a) {
                                this.sums_ = a;
                                var b = Math.max(0, a.index - 1);
                                b = Math.min(this.styles_.length - 1, b);
                                var c = this.styles_[b];
                                this.url_ = c.url, this.height_ = c.height, this.width_ = c.width, this.anchorText_ = c.anchorText || [0, 0], this.anchorIcon_ = c.anchorIcon || [parseInt(this.height_ / 2, 10), parseInt(this.width_ / 2, 10)], this.textColor_ = c.textColor || "black", this.textSize_ = c.textSize || 11, this.textDecoration_ = c.textDecoration || "none", this.fontWeight_ = c.fontWeight || "bold", this.fontStyle_ = c.fontStyle || "normal", this.fontFamily_ = c.fontFamily || "Arial,sans-serif", this.backgroundPosition_ = c.backgroundPosition || "0 0"
                            }, b.prototype.setCenter = function(a) {
                                this.center_ = a
                            }, b.prototype.createCss = function(a) {
                                var b = [];
                                return b.push("cursor: pointer;"), b.push("position: absolute; top: " + a.y + "px; left: " + a.x + "px;"), b.push("width: " + this.width_ + "px; height: " + this.height_ + "px;"), b.join("")
                            }, b.prototype.getPosFromLatLng_ = function(a) {
                                var b = this.getProjection().fromLatLngToDivPixel(a);
                                return b.x -= this.anchorIcon_[1], b.y -= this.anchorIcon_[0], b.x = parseInt(b.x, 10), b.y = parseInt(b.y, 10), b
                            }, d.prototype.getSize = function() {
                                return this.markers_.length
                            }, d.prototype.getMarkers = function() {
                                return this.markers_
                            }, d.prototype.getCenter = function() {
                                return this.center_
                            }, d.prototype.getMap = function() {
                                return this.map_
                            }, d.prototype.getMarkerClusterer = function() {
                                return this.markerClusterer_
                            }, d.prototype.getBounds = function() {
                                var a, b = new google.maps.LatLngBounds(this.center_, this.center_),
                                    c = this.getMarkers();
                                for (a = 0; a < c.length; a++) b.extend(c[a].getPosition());
                                return b
                            }, d.prototype.remove = function() {
                                this.clusterIcon_.setMap(null), this.markers_ = [], delete this.markers_
                            }, d.prototype.addMarker = function(a) {
                                var b, c, d;
                                if (this.isMarkerAlreadyAdded_(a)) return !1;
                                if (this.center_) {
                                    if (this.averageCenter_) {
                                        var e = this.markers_.length + 1,
                                            f = (this.center_.lat() * (e - 1) + a.getPosition().lat()) / e,
                                            g = (this.center_.lng() * (e - 1) + a.getPosition().lng()) / e;
                                        this.center_ = new google.maps.LatLng(f, g), this.calculateBounds_()
                                    }
                                } else this.center_ = a.getPosition(), this.calculateBounds_();
                                if (a.isAdded = !0, this.markers_.push(a), c = this.markers_.length, d = this.markerClusterer_.getMaxZoom(), null !== d && this.map_.getZoom() > d) a.getMap() !== this.map_ && a.setMap(this.map_);
                                else if (c < this.minClusterSize_) a.getMap() !== this.map_ && a.setMap(this.map_);
                                else if (c === this.minClusterSize_)
                                    for (b = 0; c > b; b++) this.markers_[b].setMap(null);
                                else a.setMap(null);
                                return !0
                            }, d.prototype.isMarkerInClusterBounds = function(a) {
                                return this.bounds_.contains(a.getPosition())
                            }, d.prototype.calculateBounds_ = function() {
                                var a = new google.maps.LatLngBounds(this.center_, this.center_);
                                this.bounds_ = this.markerClusterer_.getExtendedBounds(a)
                            }, d.prototype.updateIcon_ = function() {
                                var a = this.markers_.length,
                                    b = this.markerClusterer_.getMaxZoom();
                                if (null !== b && this.map_.getZoom() > b) return void this.clusterIcon_.hide();
                                if (a < this.minClusterSize_) return void this.clusterIcon_.hide();
                                var c = this.markerClusterer_.getStyles().length,
                                    d = this.markerClusterer_.getCalculator()(this.markers_, c);
                                this.clusterIcon_.setCenter(this.center_), this.clusterIcon_.useStyle(d), this.clusterIcon_.show()
                            }, d.prototype.isMarkerAlreadyAdded_ = function(a) {
                                for (var b = 0, c = this.markers_.length; c > b; b++)
                                    if (a === this.markers_[b]) return !0;
                                return !1
                            }, e.prototype.onAdd = function() {
                                var a = this;
                                this.activeMap_ = this.getMap(), this.ready_ = !0, this.repaint(), this.listeners_ = [google.maps.event.addListener(this.getMap(), "zoom_changed", function() {
                                    a.resetViewport_(!1), (this.getZoom() === (this.get("minZoom") || 0) || this.getZoom() === this.get("maxZoom")) && google.maps.event.trigger(this, "idle")
                                }), google.maps.event.addListener(this.getMap(), "idle", function() {
                                    a.redraw_()
                                })]
                            }, e.prototype.onRemove = function() {
                                var a;
                                for (a = 0; a < this.markers_.length; a++) this.markers_[a].getMap() !== this.activeMap_ && this.markers_[a].setMap(this.activeMap_);
                                for (a = 0; a < this.clusters_.length; a++) this.clusters_[a].remove();
                                for (this.clusters_ = [], a = 0; a < this.listeners_.length; a++) google.maps.event.removeListener(this.listeners_[a]);
                                this.listeners_ = [], this.activeMap_ = null, this.ready_ = !1
                            }, e.prototype.draw = function() {}, e.prototype.setupStyles_ = function() {
                                var a, b;
                                if (!(this.styles_.length > 0))
                                    for (a = 0; a < this.imageSizes_.length; a++) b = this.imageSizes_[a], this.styles_.push({
                                        url: this.imagePath_ + (a + 1) + "." + this.imageExtension_,
                                        height: b,
                                        width: b
                                    })
                            }, e.prototype.fitMapToMarkers = function() {
                                var a, b = this.getMarkers(),
                                    c = new google.maps.LatLngBounds;
                                for (a = 0; a < b.length; a++) c.extend(b[a].getPosition());
                                this.getMap().fitBounds(c)
                            }, e.prototype.getGridSize = function() {
                                return this.gridSize_
                            }, e.prototype.setGridSize = function(a) {
                                this.gridSize_ = a
                            }, e.prototype.getMinimumClusterSize = function() {
                                return this.minClusterSize_
                            }, e.prototype.setMinimumClusterSize = function(a) {
                                this.minClusterSize_ = a
                            }, e.prototype.getMaxZoom = function() {
                                return this.maxZoom_
                            }, e.prototype.setMaxZoom = function(a) {
                                this.maxZoom_ = a
                            }, e.prototype.getStyles = function() {
                                return this.styles_
                            }, e.prototype.setStyles = function(a) {
                                this.styles_ = a
                            }, e.prototype.getTitle = function() {
                                return this.title_
                            }, e.prototype.setTitle = function(a) {
                                this.title_ = a
                            }, e.prototype.getZoomOnClick = function() {
                                return this.zoomOnClick_
                            }, e.prototype.setZoomOnClick = function(a) {
                                this.zoomOnClick_ = a
                            }, e.prototype.getAverageCenter = function() {
                                return this.averageCenter_
                            }, e.prototype.setAverageCenter = function(a) {
                                this.averageCenter_ = a
                            }, e.prototype.getIgnoreHidden = function() {
                                return this.ignoreHidden_
                            }, e.prototype.setIgnoreHidden = function(a) {
                                this.ignoreHidden_ = a
                            }, e.prototype.getEnableRetinaIcons = function() {
                                return this.enableRetinaIcons_
                            }, e.prototype.setEnableRetinaIcons = function(a) {
                                this.enableRetinaIcons_ = a
                            }, e.prototype.getImageExtension = function() {
                                return this.imageExtension_
                            }, e.prototype.setImageExtension = function(a) {
                                this.imageExtension_ = a
                            }, e.prototype.getImagePath = function() {
                                return this.imagePath_
                            }, e.prototype.setImagePath = function(a) {
                                this.imagePath_ = a
                            }, e.prototype.getImageSizes = function() {
                                return this.imageSizes_
                            }, e.prototype.setImageSizes = function(a) {
                                this.imageSizes_ = a
                            }, e.prototype.getCalculator = function() {
                                return this.calculator_
                            }, e.prototype.setCalculator = function(a) {
                                this.calculator_ = a
                            }, e.prototype.setHideLabel = function(a) {
                                this.hideLabel_ = a
                            }, e.prototype.getHideLabel = function() {
                                return this.hideLabel_
                            }, e.prototype.getBatchSizeIE = function() {
                                return this.batchSizeIE_
                            }, e.prototype.setBatchSizeIE = function(a) {
                                this.batchSizeIE_ = a
                            }, e.prototype.getClusterClass = function() {
                                return this.clusterClass_
                            }, e.prototype.setClusterClass = function(a) {
                                this.clusterClass_ = a
                            }, e.prototype.getMarkers = function() {
                                return this.markers_
                            }, e.prototype.getTotalMarkers = function() {
                                return this.markers_.length
                            }, e.prototype.getClusters = function() {
                                return this.clusters_
                            }, e.prototype.getTotalClusters = function() {
                                return this.clusters_.length
                            }, e.prototype.addMarker = function(a, b) {
                                this.pushMarkerTo_(a), b || this.redraw_()
                            }, e.prototype.addMarkers = function(a, b) {
                                var c;
                                for (c in a) a.hasOwnProperty(c) && this.pushMarkerTo_(a[c]);
                                b || this.redraw_()
                            }, e.prototype.pushMarkerTo_ = function(a) {
                                if (a.getDraggable()) {
                                    var b = this;
                                    google.maps.event.addListener(a, "dragend", function() {
                                        b.ready_ && (this.isAdded = !1, b.repaint())
                                    })
                                }
                                a.isAdded = !1, this.markers_.push(a)
                            }, e.prototype.removeMarker = function(a, b, c) {
                                var d = !c,
                                    e = this.removeMarker_(a, d);
                                return !b && e && this.repaint(), e
                            }, e.prototype.removeMarkers = function(a, b, c) {
                                var d, e, f = !1,
                                    g = !c;
                                for (d = 0; d < a.length; d++) e = this.removeMarker_(a[d], g), f = f || e;
                                return !b && f && this.repaint(), f
                            }, e.prototype.removeMarker_ = function(a, b) {
                                var c, d = -1;
                                if (this.markers_.indexOf) d = this.markers_.indexOf(a);
                                else
                                    for (c = 0; c < this.markers_.length; c++)
                                        if (a === this.markers_[c]) {
                                            d = c;
                                            break
                                        } return -1 === d ? !1 : (b && a.setMap(null), this.markers_.splice(d, 1), !0)
                            }, e.prototype.clearMarkers = function() {
                                this.resetViewport_(!0), this.markers_ = []
                            }, e.prototype.repaint = function() {
                                var a = this.clusters_.slice();
                                this.clusters_ = [], this.resetViewport_(!1), this.redraw_(), setTimeout(function() {
                                    var b;
                                    for (b = 0; b < a.length; b++) a[b].remove()
                                }, 0)
                            }, e.prototype.getExtendedBounds = function(a) {
                                var b = this.getProjection(),
                                    c = new google.maps.LatLng(a.getNorthEast().lat(), a.getNorthEast().lng()),
                                    d = new google.maps.LatLng(a.getSouthWest().lat(), a.getSouthWest().lng()),
                                    e = b.fromLatLngToDivPixel(c);
                                e.x += this.gridSize_, e.y -= this.gridSize_;
                                var f = b.fromLatLngToDivPixel(d);
                                f.x -= this.gridSize_, f.y += this.gridSize_;
                                var g = b.fromDivPixelToLatLng(e),
                                    h = b.fromDivPixelToLatLng(f);
                                return a.extend(g), a.extend(h), a
                            }, e.prototype.redraw_ = function() {
                                this.createClusters_(0)
                            }, e.prototype.resetViewport_ = function(a) {
                                var b, c;
                                for (b = 0; b < this.clusters_.length; b++) this.clusters_[b].remove();
                                for (this.clusters_ = [], b = 0; b < this.markers_.length; b++) c = this.markers_[b], c.isAdded = !1, a && c.setMap(null)
                            }, e.prototype.distanceBetweenPoints_ = function(a, b) {
                                var c = 6371,
                                    d = (b.lat() - a.lat()) * Math.PI / 180,
                                    e = (b.lng() - a.lng()) * Math.PI / 180,
                                    f = Math.sin(d / 2) * Math.sin(d / 2) + Math.cos(a.lat() * Math.PI / 180) * Math.cos(b.lat() * Math.PI / 180) * Math.sin(e / 2) * Math.sin(e / 2),
                                    g = 2 * Math.atan2(Math.sqrt(f), Math.sqrt(1 - f)),
                                    h = c * g;
                                return h
                            }, e.prototype.isMarkerInBounds_ = function(a, b) {
                                return b.contains(a.getPosition())
                            }, e.prototype.addToClosestCluster_ = function(a) {
                                var b, c, e, f, g = 4e4,
                                    h = null;
                                for (b = 0; b < this.clusters_.length; b++) e = this.clusters_[b], f = e.getCenter(), f && (c = this.distanceBetweenPoints_(f, a.getPosition()), g > c && (g = c, h = e));
                                h && h.isMarkerInClusterBounds(a) ? h.addMarker(a) : (e = new d(this), e.addMarker(a), this.clusters_.push(e))
                            }, e.prototype.createClusters_ = function(a) {
                                var b, c, d, e = this;
                                if (this.ready_) {
                                    0 === a && (google.maps.event.trigger(this, "clusteringbegin", this), "undefined" != typeof this.timerRefStatic && (clearTimeout(this.timerRefStatic), delete this.timerRefStatic)), d = this.getMap().getZoom() > 3 ? new google.maps.LatLngBounds(this.getMap().getBounds().getSouthWest(), this.getMap().getBounds().getNorthEast()) : new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472, -178.48388434375), new google.maps.LatLng(-85.08136444384544, 178.00048865625));
                                    var f = this.getExtendedBounds(d),
                                        g = Math.min(a + this.batchSize_, this.markers_.length);
                                    for (b = a; g > b; b++) c = this.markers_[b], !c.isAdded && this.isMarkerInBounds_(c, f) && (!this.ignoreHidden_ || this.ignoreHidden_ && c.getVisible()) && this.addToClosestCluster_(c);
                                    if (g < this.markers_.length) this.timerRefStatic = setTimeout(function() {
                                        e.createClusters_(g)
                                    }, 0);
                                    else
                                        for (delete this.timerRefStatic, google.maps.event.trigger(this, "clusteringend", this), b = 0; b < this.clusters_.length; b++) this.clusters_[b].updateIcon_()
                                }
                            }, e.prototype.extend = function(a, b) {
                                return function(a) {
                                    var b;
                                    for (b in a.prototype) this.prototype[b] = a.prototype[b];
                                    return this
                                }.apply(a, [b])
                            }, e.CALCULATOR = function(a, b) {
                                for (var c = 0, d = "", e = a.length.toString(), f = e; 0 !== f;) f = parseInt(f / 10, 10), c++;
                                return c = Math.min(c, b), {
                                    text: e,
                                    index: c,
                                    title: d
                                }
                            }, e.BATCH_SIZE = 2e3, e.BATCH_SIZE_IE = 500, e.IMAGE_PATH = "//cdn.rawgit.com/mahnunchik/markerclustererplus/master/images/m", e.IMAGE_EXTENSION = "png", e.IMAGE_SIZES = [53, 56, 66, 78, 90], "function" != typeof String.prototype.trim && (String.prototype.trim = function() {
                                return this.replace(/^\s+|\s+$/g, "")
                            }), f.prototype = new google.maps.OverlayView, f.prototype.createInfoBoxDiv_ = function() {
                                var a, b, c, d = this,
                                    e = function(a) {
                                        a.cancelBubble = !0, a.stopPropagation && a.stopPropagation()
                                    },
                                    f = function(a) {
                                        a.returnValue = !1, a.preventDefault && a.preventDefault(), d.enableEventPropagation_ || e(a)
                                    };
                                if (!this.div_) {
                                    if (this.div_ = document.createElement("div"), this.setBoxStyle_(), "undefined" == typeof this.content_.nodeType ? this.div_.innerHTML = this.getCloseBoxImg_() + this.content_ : (this.div_.innerHTML = this.getCloseBoxImg_(), this.div_.appendChild(this.content_)), this.getPanes()[this.pane_].appendChild(this.div_), this.addClickHandler_(), this.div_.style.width ? this.fixedWidthSet_ = !0 : 0 !== this.maxWidth_ && this.div_.offsetWidth > this.maxWidth_ ? (this.div_.style.width = this.maxWidth_, this.div_.style.overflow = "auto", this.fixedWidthSet_ = !0) : (c = this.getBoxWidths_(), this.div_.style.width = this.div_.offsetWidth - c.left - c.right + "px", this.fixedWidthSet_ = !1), this.panBox_(this.disableAutoPan_), !this.enableEventPropagation_) {
                                        for (this.eventListeners_ = [], b = ["mousedown", "mouseover", "mouseout", "mouseup", "click", "dblclick", "touchstart", "touchend", "touchmove"], a = 0; a < b.length; a++) this.eventListeners_.push(google.maps.event.addDomListener(this.div_, b[a], e));
                                        this.eventListeners_.push(google.maps.event.addDomListener(this.div_, "mouseover", function(a) {
                                            this.style.cursor = "default"
                                        }))
                                    }
                                    this.contextListener_ = google.maps.event.addDomListener(this.div_, "contextmenu", f), google.maps.event.trigger(this, "domready")
                                }
                            }, f.prototype.getCloseBoxImg_ = function() {
                                var a = "";
                                return "" !== this.closeBoxURL_ && (a = "<img", a += " src='" + this.closeBoxURL_ + "'", a += " align=right", a += " style='", a += " position: relative;", a += " cursor: pointer;", a += " margin: " + this.closeBoxMargin_ + ";", a += "'>"), a
                            }, f.prototype.addClickHandler_ = function() {
                                var a;
                                "" !== this.closeBoxURL_ ? (a = this.div_.firstChild, this.closeListener_ = google.maps.event.addDomListener(a, "click", this.getCloseClickHandler_())) : this.closeListener_ = null
                            }, f.prototype.getCloseClickHandler_ = function() {
                                var a = this;
                                return function(b) {
                                    b.cancelBubble = !0, b.stopPropagation && b.stopPropagation(), google.maps.event.trigger(a, "closeclick"), a.close()
                                }
                            }, f.prototype.panBox_ = function(a) {
                                var b, c, d = 0,
                                    e = 0;
                                if (!a && (b = this.getMap(), b instanceof google.maps.Map)) {
                                    b.getBounds().contains(this.position_) || b.setCenter(this.position_), c = b.getBounds();
                                    var f = b.getDiv(),
                                        g = f.offsetWidth,
                                        h = f.offsetHeight,
                                        i = this.pixelOffset_.width,
                                        j = this.pixelOffset_.height,
                                        k = this.div_.offsetWidth,
                                        l = this.div_.offsetHeight,
                                        m = this.infoBoxClearance_.width,
                                        n = this.infoBoxClearance_.height,
                                        o = this.getProjection().fromLatLngToContainerPixel(this.position_);
                                    if (o.x < -i + m ? d = o.x + i - m : o.x + k + i + m > g && (d = o.x + k + i + m - g), this.alignBottom_ ? o.y < -j + n + l ? e = o.y + j - n - l : o.y + j + n > h && (e = o.y + j + n - h) : o.y < -j + n ? e = o.y + j - n : o.y + l + j + n > h && (e = o.y + l + j + n - h), 0 !== d || 0 !== e) {
                                        b.getCenter();
                                        b.panBy(d, e)
                                    }
                                }
                            }, f.prototype.setBoxStyle_ = function() {
                                var a, b;
                                if (this.div_) {
                                    this.div_.className = this.boxClass_, this.div_.style.cssText = "", b = this.boxStyle_;
                                    for (a in b) b.hasOwnProperty(a) && (this.div_.style[a] = b[a]);
                                    this.div_.style.WebkitTransform = "translateZ(0)", "undefined" != typeof this.div_.style.opacity && "" !== this.div_.style.opacity && (this.div_.style.MsFilter = '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + 100 * this.div_.style.opacity + ')"', this.div_.style.filter = "alpha(opacity=" + 100 * this.div_.style.opacity + ")"), this.div_.style.position = "absolute", this.div_.style.visibility = "hidden", null !== this.zIndex_ && (this.div_.style.zIndex = this.zIndex_)
                                }
                            }, f.prototype.getBoxWidths_ = function() {
                                var a, b = {
                                        top: 0,
                                        bottom: 0,
                                        left: 0,
                                        right: 0
                                    },
                                    c = this.div_;
                                return document.defaultView && document.defaultView.getComputedStyle ? (a = c.ownerDocument.defaultView.getComputedStyle(c, ""), a && (b.top = parseInt(a.borderTopWidth, 10) || 0, b.bottom = parseInt(a.borderBottomWidth, 10) || 0, b.left = parseInt(a.borderLeftWidth, 10) || 0, b.right = parseInt(a.borderRightWidth, 10) || 0)) : document.documentElement.currentStyle && c.currentStyle && (b.top = parseInt(c.currentStyle.borderTopWidth, 10) || 0, b.bottom = parseInt(c.currentStyle.borderBottomWidth, 10) || 0, b.left = parseInt(c.currentStyle.borderLeftWidth, 10) || 0, b.right = parseInt(c.currentStyle.borderRightWidth, 10) || 0), b
                            }, f.prototype.onRemove = function() {
                                this.div_ && (this.div_.parentNode.removeChild(this.div_), this.div_ = null)
                            }, f.prototype.draw = function() {
                                this.createInfoBoxDiv_();
                                var a = this.getProjection().fromLatLngToDivPixel(this.position_);
                                this.div_.style.left = a.x + this.pixelOffset_.width + "px", this.alignBottom_ ? this.div_.style.bottom = -(a.y + this.pixelOffset_.height) + "px" : this.div_.style.top = a.y + this.pixelOffset_.height + "px", this.isHidden_ ? this.div_.style.visibility = "hidden" : this.div_.style.visibility = "visible"
                            }, f.prototype.setOptions = function(a) {
                                "undefined" != typeof a.boxClass && (this.boxClass_ = a.boxClass, this.setBoxStyle_()), "undefined" != typeof a.boxStyle && (this.boxStyle_ = a.boxStyle, this.setBoxStyle_()), "undefined" != typeof a.content && this.setContent(a.content), "undefined" != typeof a.disableAutoPan && (this.disableAutoPan_ = a.disableAutoPan), "undefined" != typeof a.maxWidth && (this.maxWidth_ = a.maxWidth), "undefined" != typeof a.pixelOffset && (this.pixelOffset_ = a.pixelOffset), "undefined" != typeof a.alignBottom && (this.alignBottom_ = a.alignBottom), "undefined" != typeof a.position && this.setPosition(a.position), "undefined" != typeof a.zIndex && this.setZIndex(a.zIndex), "undefined" != typeof a.closeBoxMargin && (this.closeBoxMargin_ = a.closeBoxMargin), "undefined" != typeof a.closeBoxURL && (this.closeBoxURL_ = a.closeBoxURL), "undefined" != typeof a.infoBoxClearance && (this.infoBoxClearance_ = a.infoBoxClearance), "undefined" != typeof a.isHidden && (this.isHidden_ = a.isHidden), "undefined" != typeof a.visible && (this.isHidden_ = !a.visible), "undefined" != typeof a.enableEventPropagation && (this.enableEventPropagation_ = a.enableEventPropagation), this.div_ && this.draw();
                            }, f.prototype.setContent = function(a) {
                                this.content_ = a, this.div_ && (this.closeListener_ && (google.maps.event.removeListener(this.closeListener_), this.closeListener_ = null), this.fixedWidthSet_ || (this.div_.style.width = ""), "undefined" == typeof a.nodeType ? this.div_.innerHTML = this.getCloseBoxImg_() + a : (this.div_.innerHTML = this.getCloseBoxImg_(), this.div_.appendChild(a)), this.fixedWidthSet_ || (this.div_.style.width = this.div_.offsetWidth + "px", "undefined" == typeof a.nodeType ? this.div_.innerHTML = this.getCloseBoxImg_() + a : (this.div_.innerHTML = this.getCloseBoxImg_(), this.div_.appendChild(a))), this.addClickHandler_()), google.maps.event.trigger(this, "content_changed")
                            }, f.prototype.setPosition = function(a) {
                                this.position_ = a, this.div_ && this.draw(), google.maps.event.trigger(this, "position_changed")
                            }, f.prototype.setZIndex = function(a) {
                                this.zIndex_ = a, this.div_ && (this.div_.style.zIndex = a), google.maps.event.trigger(this, "zindex_changed")
                            }, f.prototype.setVisible = function(a) {
                                this.isHidden_ = !a, this.div_ && (this.div_.style.visibility = this.isHidden_ ? "hidden" : "visible")
                            }, f.prototype.getContent = function() {
                                return this.content_
                            }, f.prototype.getPosition = function() {
                                return this.position_
                            }, f.prototype.getZIndex = function() {
                                return this.zIndex_
                            }, f.prototype.getVisible = function() {
                                var a;
                                return a = "undefined" == typeof this.getMap() || null === this.getMap() ? !1 : !this.isHidden_
                            }, f.prototype.show = function() {
                                this.isHidden_ = !1, this.div_ && (this.div_.style.visibility = "visible")
                            }, f.prototype.hide = function() {
                                this.isHidden_ = !0, this.div_ && (this.div_.style.visibility = "hidden")
                            }, f.prototype.open = function(a, b) {
                                var c = this;
                                b && (this.position_ = b.getPosition(), this.moveListener_ = google.maps.event.addListener(b, "position_changed", function() {
                                    c.setPosition(this.getPosition())
                                })), this.setMap(a), this.div_ && this.panBox_()
                            }, f.prototype.close = function() {
                                var a;
                                if (this.closeListener_ && (google.maps.event.removeListener(this.closeListener_), this.closeListener_ = null), this.eventListeners_) {
                                    for (a = 0; a < this.eventListeners_.length; a++) google.maps.event.removeListener(this.eventListeners_[a]);
                                    this.eventListeners_ = null
                                }
                                this.moveListener_ && (google.maps.event.removeListener(this.moveListener_), this.moveListener_ = null), this.contextListener_ && (google.maps.event.removeListener(this.contextListener_), this.contextListener_ = null), this.setMap(null)
                            },
                            function() {
                                function b(a, b) {
                                    var c = this,
                                        d = new google.maps.OverlayView;
                                    d.onAdd = function() {
                                        c.init_(a, b)
                                    }, d.draw = function() {}, d.onRemove = function() {}, d.setMap(a), this.prjov_ = d
                                }
                                var c = function(a) {
                                        var b;
                                        switch (a) {
                                            case "thin":
                                                b = "2px";
                                                break;
                                            case "medium":
                                                b = "4px";
                                                break;
                                            case "thick":
                                                b = "6px";
                                                break;
                                            default:
                                                b = a
                                        }
                                        return b
                                    },
                                    d = function(a) {
                                        var b, d = {};
                                        if (document.defaultView && document.defaultView.getComputedStyle) {
                                            if (b = a.ownerDocument.defaultView.getComputedStyle(a, "")) return d.top = parseInt(b.borderTopWidth, 10) || 0, d.bottom = parseInt(b.borderBottomWidth, 10) || 0, d.left = parseInt(b.borderLeftWidth, 10) || 0, d.right = parseInt(b.borderRightWidth, 10) || 0, d
                                        } else if (document.documentElement.currentStyle && a.currentStyle) return d.top = parseInt(c(a.currentStyle.borderTopWidth), 10) || 0, d.bottom = parseInt(c(a.currentStyle.borderBottomWidth), 10) || 0, d.left = parseInt(c(a.currentStyle.borderLeftWidth), 10) || 0, d.right = parseInt(c(a.currentStyle.borderRightWidth), 10) || 0, d;
                                        return d.top = parseInt(a.style["border-top-width"], 10) || 0, d.bottom = parseInt(a.style["border-bottom-width"], 10) || 0, d.left = parseInt(a.style["border-left-width"], 10) || 0, d.right = parseInt(a.style["border-right-width"], 10) || 0, d
                                    },
                                    e = {
                                        x: 0,
                                        y: 0
                                    },
                                    f = function(a) {
                                        e.x = "undefined" != typeof document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft, e.y = "undefined" != typeof document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop
                                    };
                                f();
                                var g = function(b) {
                                        var c = 0,
                                            d = 0;
                                        return b = b || a.event, "undefined" != typeof b.pageX ? (c = b.pageX, d = b.pageY) : "undefined" != typeof b.clientX && (c = b.clientX + e.x, d = b.clientY + e.y), {
                                            left: c,
                                            top: d
                                        }
                                    },
                                    h = function(b) {
                                        for (var c = b.offsetLeft, d = b.offsetTop, e = b.offsetParent; null !== e;) {
                                            e !== document.body && e !== document.documentElement && (c -= e.scrollLeft, d -= e.scrollTop);
                                            var f = e,
                                                g = f.offsetLeft,
                                                h = f.offsetTop;
                                            if (!g && !h && a.getComputedStyle) {
                                                var i = document.defaultView.getComputedStyle(f, null).MozTransform || document.defaultView.getComputedStyle(f, null).WebkitTransform;
                                                if (i && "string" == typeof i) {
                                                    var j = i.split(",");
                                                    g += parseInt(j[4], 10) || 0, h += parseInt(j[5], 10) || 0
                                                }
                                            }
                                            c += g, d += h, e = e.offsetParent
                                        }
                                        return {
                                            left: c,
                                            top: d
                                        }
                                    },
                                    i = function(a, b) {
                                        if (a && b)
                                            for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
                                        return a
                                    },
                                    j = function(a, b) {
                                        "undefined" != typeof b && (a.style.opacity = b), "undefined" != typeof a.style.opacity && "" !== a.style.opacity && (a.style.filter = "alpha(opacity=" + 100 * a.style.opacity + ")")
                                    };
                                b.prototype.init_ = function(b, c) {
                                    var e, g = this;
                                    for (this.map_ = b, c = c || {}, this.key_ = c.key || "shift", this.key_ = this.key_.toLowerCase(), this.borderWidths_ = d(this.map_.getDiv()), this.veilDiv_ = [], e = 0; 4 > e; e++) this.veilDiv_[e] = document.createElement("div"), this.veilDiv_[e].onselectstart = function() {
                                        return !1
                                    }, i(this.veilDiv_[e].style, {
                                        backgroundColor: "gray",
                                        opacity: .25,
                                        cursor: "crosshair"
                                    }), i(this.veilDiv_[e].style, c.paneStyle), i(this.veilDiv_[e].style, c.veilStyle), i(this.veilDiv_[e].style, {
                                        position: "absolute",
                                        overflow: "hidden",
                                        display: "none"
                                    }), "shift" === this.key_ && (this.veilDiv_[e].style.MozUserSelect = "none"), j(this.veilDiv_[e]), "transparent" === this.veilDiv_[e].style.backgroundColor && (this.veilDiv_[e].style.backgroundColor = "white", j(this.veilDiv_[e], 0)), this.map_.getDiv().appendChild(this.veilDiv_[e]);
                                    this.noZoom_ = c.noZoom || !1, this.visualEnabled_ = c.visualEnabled || !1, this.visualClass_ = c.visualClass || "", this.visualPosition_ = c.visualPosition || google.maps.ControlPosition.LEFT_TOP, this.visualPositionOffset_ = c.visualPositionOffset || new google.maps.Size(35, 0), this.visualPositionIndex_ = c.visualPositionIndex || null, this.visualSprite_ = c.visualSprite || "http" + ("https:" === document.location.protocol ? "s" : "") + "://maps.gstatic.com/mapfiles/ftr/controls/dragzoom_btn.png", this.visualSize_ = c.visualSize || new google.maps.Size(20, 20), this.visualTips_ = c.visualTips || {}, this.visualTips_.off = this.visualTips_.off || "Turn on drag zoom mode", this.visualTips_.on = this.visualTips_.on || "Turn off drag zoom mode", this.boxDiv_ = document.createElement("div"), i(this.boxDiv_.style, {
                                        border: "4px solid #736AFF"
                                    }), i(this.boxDiv_.style, c.boxStyle), i(this.boxDiv_.style, {
                                        position: "absolute",
                                        display: "none"
                                    }), j(this.boxDiv_), this.map_.getDiv().appendChild(this.boxDiv_), this.boxBorderWidths_ = d(this.boxDiv_), this.listeners_ = [google.maps.event.addDomListener(document, "keydown", function(a) {
                                        g.onKeyDown_(a)
                                    }), google.maps.event.addDomListener(document, "keyup", function(a) {
                                        g.onKeyUp_(a)
                                    }), google.maps.event.addDomListener(this.veilDiv_[0], "mousedown", function(a) {
                                        g.onMouseDown_(a)
                                    }), google.maps.event.addDomListener(this.veilDiv_[1], "mousedown", function(a) {
                                        g.onMouseDown_(a)
                                    }), google.maps.event.addDomListener(this.veilDiv_[2], "mousedown", function(a) {
                                        g.onMouseDown_(a)
                                    }), google.maps.event.addDomListener(this.veilDiv_[3], "mousedown", function(a) {
                                        g.onMouseDown_(a)
                                    }), google.maps.event.addDomListener(document, "mousedown", function(a) {
                                        g.onMouseDownDocument_(a)
                                    }), google.maps.event.addDomListener(document, "mousemove", function(a) {
                                        g.onMouseMove_(a)
                                    }), google.maps.event.addDomListener(document, "mouseup", function(a) {
                                        g.onMouseUp_(a)
                                    }), google.maps.event.addDomListener(a, "scroll", f)], this.hotKeyDown_ = !1, this.mouseDown_ = !1, this.dragging_ = !1, this.startPt_ = null, this.endPt_ = null, this.mapWidth_ = null, this.mapHeight_ = null, this.mousePosn_ = null, this.mapPosn_ = null, this.visualEnabled_ && (this.buttonDiv_ = this.initControl_(this.visualPositionOffset_), null !== this.visualPositionIndex_ && (this.buttonDiv_.index = this.visualPositionIndex_), this.map_.controls[this.visualPosition_].push(this.buttonDiv_), this.controlIndex_ = this.map_.controls[this.visualPosition_].length - 1)
                                }, b.prototype.initControl_ = function(a) {
                                    var b, c, d = this;
                                    return b = document.createElement("div"), b.className = this.visualClass_, b.style.position = "relative", b.style.overflow = "hidden", b.style.height = this.visualSize_.height + "px", b.style.width = this.visualSize_.width + "px", b.title = this.visualTips_.off, c = document.createElement("img"), c.src = this.visualSprite_, c.style.position = "absolute", c.style.left = -(2 * this.visualSize_.width) + "px", c.style.top = "0px", b.appendChild(c), b.onclick = function(a) {
                                        d.hotKeyDown_ = !d.hotKeyDown_, d.hotKeyDown_ ? (d.buttonDiv_.firstChild.style.left = -(0 * d.visualSize_.width) + "px", d.buttonDiv_.title = d.visualTips_.on, d.activatedByControl_ = !0, google.maps.event.trigger(d, "activate")) : (d.buttonDiv_.firstChild.style.left = -(2 * d.visualSize_.width) + "px", d.buttonDiv_.title = d.visualTips_.off, google.maps.event.trigger(d, "deactivate")), d.onMouseMove_(a)
                                    }, b.onmouseover = function() {
                                        d.buttonDiv_.firstChild.style.left = -(1 * d.visualSize_.width) + "px"
                                    }, b.onmouseout = function() {
                                        d.hotKeyDown_ ? (d.buttonDiv_.firstChild.style.left = -(0 * d.visualSize_.width) + "px", d.buttonDiv_.title = d.visualTips_.on) : (d.buttonDiv_.firstChild.style.left = -(2 * d.visualSize_.width) + "px", d.buttonDiv_.title = d.visualTips_.off)
                                    }, b.ondragstart = function() {
                                        return !1
                                    }, i(b.style, {
                                        cursor: "pointer",
                                        marginTop: a.height + "px",
                                        marginLeft: a.width + "px"
                                    }), b
                                }, b.prototype.isHotKeyDown_ = function(b) {
                                    var c;
                                    if (b = b || a.event, c = b.shiftKey && "shift" === this.key_ || b.altKey && "alt" === this.key_ || b.ctrlKey && "ctrl" === this.key_, !c) switch (b.keyCode) {
                                        case 16:
                                            "shift" === this.key_ && (c = !0);
                                            break;
                                        case 17:
                                            "ctrl" === this.key_ && (c = !0);
                                            break;
                                        case 18:
                                            "alt" === this.key_ && (c = !0)
                                    }
                                    return c
                                }, b.prototype.isMouseOnMap_ = function() {
                                    var a = this.mousePosn_;
                                    if (a) {
                                        var b = this.mapPosn_,
                                            c = this.map_.getDiv();
                                        return a.left > b.left && a.left < b.left + c.offsetWidth && a.top > b.top && a.top < b.top + c.offsetHeight
                                    }
                                    return !1
                                }, b.prototype.setVeilVisibility_ = function() {
                                    var a;
                                    if (this.map_ && this.hotKeyDown_ && this.isMouseOnMap_()) {
                                        var b = this.map_.getDiv();
                                        if (this.mapWidth_ = b.offsetWidth - (this.borderWidths_.left + this.borderWidths_.right), this.mapHeight_ = b.offsetHeight - (this.borderWidths_.top + this.borderWidths_.bottom), this.activatedByControl_) {
                                            var c = parseInt(this.buttonDiv_.style.left, 10) + this.visualPositionOffset_.width,
                                                d = parseInt(this.buttonDiv_.style.top, 10) + this.visualPositionOffset_.height,
                                                e = this.visualSize_.width,
                                                f = this.visualSize_.height;
                                            for (this.veilDiv_[0].style.top = "0px", this.veilDiv_[0].style.left = "0px", this.veilDiv_[0].style.width = c + "px", this.veilDiv_[0].style.height = this.mapHeight_ + "px", this.veilDiv_[1].style.top = "0px", this.veilDiv_[1].style.left = c + e + "px", this.veilDiv_[1].style.width = this.mapWidth_ - (c + e) + "px", this.veilDiv_[1].style.height = this.mapHeight_ + "px", this.veilDiv_[2].style.top = "0px", this.veilDiv_[2].style.left = c + "px", this.veilDiv_[2].style.width = e + "px", this.veilDiv_[2].style.height = d + "px", this.veilDiv_[3].style.top = d + f + "px", this.veilDiv_[3].style.left = c + "px", this.veilDiv_[3].style.width = e + "px", this.veilDiv_[3].style.height = this.mapHeight_ - (d + f) + "px", a = 0; a < this.veilDiv_.length; a++) this.veilDiv_[a].style.display = "block"
                                        } else {
                                            for (this.veilDiv_[0].style.left = "0px", this.veilDiv_[0].style.top = "0px", this.veilDiv_[0].style.width = this.mapWidth_ + "px", this.veilDiv_[0].style.height = this.mapHeight_ + "px", a = 1; a < this.veilDiv_.length; a++) this.veilDiv_[a].style.width = "0px", this.veilDiv_[a].style.height = "0px";
                                            for (a = 0; a < this.veilDiv_.length; a++) this.veilDiv_[a].style.display = "block"
                                        }
                                    } else
                                        for (a = 0; a < this.veilDiv_.length; a++) this.veilDiv_[a].style.display = "none"
                                }, b.prototype.onKeyDown_ = function(a) {
                                    this.map_ && !this.hotKeyDown_ && this.isHotKeyDown_(a) && (this.mapPosn_ = h(this.map_.getDiv()), this.hotKeyDown_ = !0, this.activatedByControl_ = !1, this.setVeilVisibility_(), google.maps.event.trigger(this, "activate"))
                                }, b.prototype.getMousePoint_ = function(a) {
                                    var b = g(a),
                                        c = new google.maps.Point;
                                    return c.x = b.left - this.mapPosn_.left - this.borderWidths_.left, c.y = b.top - this.mapPosn_.top - this.borderWidths_.top, c.x = Math.min(c.x, this.mapWidth_), c.y = Math.min(c.y, this.mapHeight_), c.x = Math.max(c.x, 0), c.y = Math.max(c.y, 0), c
                                }, b.prototype.onMouseDown_ = function(a) {
                                    if (this.map_ && this.hotKeyDown_) {
                                        this.mapPosn_ = h(this.map_.getDiv()), this.dragging_ = !0, this.startPt_ = this.endPt_ = this.getMousePoint_(a), this.boxDiv_.style.width = this.boxDiv_.style.height = "0px";
                                        var b = this.prjov_.getProjection(),
                                            c = b.fromContainerPixelToLatLng(this.startPt_);
                                        google.maps.event.trigger(this, "dragstart", c)
                                    }
                                }, b.prototype.onMouseDownDocument_ = function(a) {
                                    this.mouseDown_ = !0
                                }, b.prototype.onMouseMove_ = function(a) {
                                    if (this.mousePosn_ = g(a), this.dragging_) {
                                        this.endPt_ = this.getMousePoint_(a);
                                        var b = Math.min(this.startPt_.x, this.endPt_.x),
                                            c = Math.min(this.startPt_.y, this.endPt_.y),
                                            d = Math.abs(this.startPt_.x - this.endPt_.x),
                                            e = Math.abs(this.startPt_.y - this.endPt_.y),
                                            f = Math.max(0, d - (this.boxBorderWidths_.left + this.boxBorderWidths_.right)),
                                            i = Math.max(0, e - (this.boxBorderWidths_.top + this.boxBorderWidths_.bottom));
                                        this.veilDiv_[0].style.top = "0px", this.veilDiv_[0].style.left = "0px", this.veilDiv_[0].style.width = b + "px", this.veilDiv_[0].style.height = this.mapHeight_ + "px", this.veilDiv_[1].style.top = "0px", this.veilDiv_[1].style.left = b + d + "px", this.veilDiv_[1].style.width = this.mapWidth_ - (b + d) + "px", this.veilDiv_[1].style.height = this.mapHeight_ + "px", this.veilDiv_[2].style.top = "0px", this.veilDiv_[2].style.left = b + "px", this.veilDiv_[2].style.width = d + "px", this.veilDiv_[2].style.height = c + "px", this.veilDiv_[3].style.top = c + e + "px", this.veilDiv_[3].style.left = b + "px", this.veilDiv_[3].style.width = d + "px", this.veilDiv_[3].style.height = this.mapHeight_ - (c + e) + "px", this.boxDiv_.style.top = c + "px", this.boxDiv_.style.left = b + "px", this.boxDiv_.style.width = f + "px", this.boxDiv_.style.height = i + "px", this.boxDiv_.style.display = "block", google.maps.event.trigger(this, "drag", new google.maps.Point(b, c + e), new google.maps.Point(b + d, c), this.prjov_.getProjection())
                                    } else this.mouseDown_ || (this.mapPosn_ = h(this.map_.getDiv()), this.setVeilVisibility_())
                                }, b.prototype.onMouseUp_ = function(a) {
                                    var b, c = this;
                                    if (this.mouseDown_ = !1, this.dragging_) {
                                        if (this.getMousePoint_(a).x === this.startPt_.x && this.getMousePoint_(a).y === this.startPt_.y) return void this.onKeyUp_(a);
                                        var d = Math.min(this.startPt_.x, this.endPt_.x),
                                            e = Math.min(this.startPt_.y, this.endPt_.y),
                                            f = Math.abs(this.startPt_.x - this.endPt_.x),
                                            g = Math.abs(this.startPt_.y - this.endPt_.y),
                                            h = !0;
                                        h && (d += this.borderWidths_.left, e += this.borderWidths_.top);
                                        var i = this.prjov_.getProjection(),
                                            j = i.fromContainerPixelToLatLng(new google.maps.Point(d, e + g)),
                                            k = i.fromContainerPixelToLatLng(new google.maps.Point(d + f, e)),
                                            l = new google.maps.LatLngBounds(j, k);
                                        if (this.noZoom_) this.boxDiv_.style.display = "none";
                                        else {
                                            b = this.map_.getZoom(), this.map_.fitBounds(l), this.map_.getZoom() < b && this.map_.setZoom(b);
                                            var m = i.fromLatLngToContainerPixel(j),
                                                n = i.fromLatLngToContainerPixel(k);
                                            h && (m.x -= this.borderWidths_.left, m.y -= this.borderWidths_.top, n.x -= this.borderWidths_.left, n.y -= this.borderWidths_.top), this.boxDiv_.style.left = m.x + "px", this.boxDiv_.style.top = n.y + "px", this.boxDiv_.style.width = Math.abs(n.x - m.x) - (this.boxBorderWidths_.left + this.boxBorderWidths_.right) + "px", this.boxDiv_.style.height = Math.abs(n.y - m.y) - (this.boxBorderWidths_.top + this.boxBorderWidths_.bottom) + "px", setTimeout(function() {
                                                c.boxDiv_.style.display = "none"
                                            }, 1e3)
                                        }
                                        this.dragging_ = !1, this.onMouseMove_(a), google.maps.event.trigger(this, "dragend", l), this.isHotKeyDown_(a) || this.onKeyUp_(a)
                                    }
                                }, b.prototype.onKeyUp_ = function(a) {
                                    var b, c, d, e, f, g, h, i, j = null;
                                    if (this.map_ && this.hotKeyDown_) {
                                        for (this.hotKeyDown_ = !1, this.dragging_ && (this.boxDiv_.style.display = "none", this.dragging_ = !1, c = Math.min(this.startPt_.x, this.endPt_.x), d = Math.min(this.startPt_.y, this.endPt_.y), e = Math.abs(this.startPt_.x - this.endPt_.x), f = Math.abs(this.startPt_.y - this.endPt_.y), g = this.prjov_.getProjection(), h = g.fromContainerPixelToLatLng(new google.maps.Point(c, d + f)), i = g.fromContainerPixelToLatLng(new google.maps.Point(c + e, d)), j = new google.maps.LatLngBounds(h, i)), b = 0; b < this.veilDiv_.length; b++) this.veilDiv_[b].style.display = "none";
                                        this.visualEnabled_ && (this.buttonDiv_.firstChild.style.left = -(2 * this.visualSize_.width) + "px", this.buttonDiv_.title = this.visualTips_.off, this.buttonDiv_.style.display = ""), google.maps.event.trigger(this, "deactivate", j)
                                    }
                                }, google.maps.Map.prototype.enableKeyDragZoom = function(a) {
                                    this.dragZoom_ = new b(this, a)
                                }, google.maps.Map.prototype.disableKeyDragZoom = function() {
                                    var a, b = this.dragZoom_;
                                    if (b) {
                                        for (a = 0; a < b.listeners_.length; ++a) google.maps.event.removeListener(b.listeners_[a]);
                                        for (this.getDiv().removeChild(b.boxDiv_), a = 0; a < b.veilDiv_.length; a++) this.getDiv().removeChild(b.veilDiv_[a]);
                                        b.visualEnabled_ && this.controls[b.visualPosition_].removeAt(b.controlIndex_), b.prjov_.setMap(null), this.dragZoom_ = null
                                    }
                                }, google.maps.Map.prototype.keyDragZoomEnabled = function() {
                                    return null !== this.dragZoom_
                                }, google.maps.Map.prototype.getDragZoomObject = function() {
                                    return this.dragZoom_
                                }
                            }(), g(h, google.maps.OverlayView), h.getSharedCross = function(a) {
                                var b;
                                return "undefined" == typeof h.getSharedCross.crossDiv && (b = document.createElement("img"), b.style.cssText = "position: absolute; z-index: 1000002; display: none;", b.style.marginLeft = "-8px", b.style.marginTop = "-9px", b.src = a, h.getSharedCross.crossDiv = b), h.getSharedCross.crossDiv
                            }, h.prototype.onAdd = function() {
                                var a, b, c, d, e, f, g, i = this,
                                    j = !1,
                                    k = !1,
                                    l = 20,
                                    m = "url(" + this.handCursorURL_ + ")",
                                    n = function(a) {
                                        a.preventDefault && a.preventDefault(), a.cancelBubble = !0, a.stopPropagation && a.stopPropagation()
                                    },
                                    o = function() {
                                        i.marker_.setAnimation(null)
                                    };
                                this.getPanes().overlayImage.appendChild(this.labelDiv_), this.getPanes().overlayMouseTarget.appendChild(this.eventDiv_), "undefined" == typeof h.getSharedCross.processed && (this.getPanes().overlayImage.appendChild(this.crossDiv_), h.getSharedCross.processed = !0), this.listeners_ = [google.maps.event.addDomListener(this.eventDiv_, "mouseover", function(a) {
                                    (i.marker_.getDraggable() || i.marker_.getClickable()) && (this.style.cursor = "pointer", google.maps.event.trigger(i.marker_, "mouseover", a))
                                }), google.maps.event.addDomListener(this.eventDiv_, "mouseout", function(a) {
                                    !i.marker_.getDraggable() && !i.marker_.getClickable() || k || (this.style.cursor = i.marker_.getCursor(), google.maps.event.trigger(i.marker_, "mouseout", a))
                                }), google.maps.event.addDomListener(this.eventDiv_, "mousedown", function(a) {
                                    k = !1, i.marker_.getDraggable() && (j = !0, this.style.cursor = m), (i.marker_.getDraggable() || i.marker_.getClickable()) && (google.maps.event.trigger(i.marker_, "mousedown", a), n(a))
                                }), google.maps.event.addDomListener(document, "mouseup", function(b) {
                                    var c;
                                    if (j && (j = !1, i.eventDiv_.style.cursor = "pointer", google.maps.event.trigger(i.marker_, "mouseup", b)), k) {
                                        if (e) {
                                            c = i.getProjection().fromLatLngToDivPixel(i.marker_.getPosition()), c.y += l, i.marker_.setPosition(i.getProjection().fromDivPixelToLatLng(c));
                                            try {
                                                i.marker_.setAnimation(google.maps.Animation.BOUNCE), setTimeout(o, 1406)
                                            } catch (f) {}
                                        }
                                        i.crossDiv_.style.display = "none", i.marker_.setZIndex(a), d = !0, k = !1, b.latLng = i.marker_.getPosition(), google.maps.event.trigger(i.marker_, "dragend", b)
                                    }
                                }), google.maps.event.addListener(i.marker_.getMap(), "mousemove", function(d) {
                                    var h;
                                    j && (k ? (d.latLng = new google.maps.LatLng(d.latLng.lat() - b, d.latLng.lng() - c), h = i.getProjection().fromLatLngToDivPixel(d.latLng), e && (i.crossDiv_.style.left = h.x + "px", i.crossDiv_.style.top = h.y + "px", i.crossDiv_.style.display = "", h.y -= l), i.marker_.setPosition(i.getProjection().fromDivPixelToLatLng(h)), e && (i.eventDiv_.style.top = h.y + l + "px"), google.maps.event.trigger(i.marker_, "drag", d)) : (b = d.latLng.lat() - i.marker_.getPosition().lat(), c = d.latLng.lng() - i.marker_.getPosition().lng(), a = i.marker_.getZIndex(), f = i.marker_.getPosition(), g = i.marker_.getMap().getCenter(), e = i.marker_.get("raiseOnDrag"), k = !0, i.marker_.setZIndex(1e6), d.latLng = i.marker_.getPosition(), google.maps.event.trigger(i.marker_, "dragstart", d)))
                                }), google.maps.event.addDomListener(document, "keydown", function(a) {
                                    k && 27 === a.keyCode && (e = !1, i.marker_.setPosition(f), i.marker_.getMap().setCenter(g), google.maps.event.trigger(document, "mouseup", a))
                                }), google.maps.event.addDomListener(this.eventDiv_, "click", function(a) {
                                    (i.marker_.getDraggable() || i.marker_.getClickable()) && (d ? d = !1 : (google.maps.event.trigger(i.marker_, "click", a), n(a)))
                                }), google.maps.event.addDomListener(this.eventDiv_, "dblclick", function(a) {
                                    (i.marker_.getDraggable() || i.marker_.getClickable()) && (google.maps.event.trigger(i.marker_, "dblclick", a), n(a))
                                }), google.maps.event.addListener(this.marker_, "dragstart", function(a) {
                                    k || (e = this.get("raiseOnDrag"))
                                }), google.maps.event.addListener(this.marker_, "drag", function(a) {
                                    k || e && (i.setPosition(l), i.labelDiv_.style.zIndex = 1e6 + (this.get("labelInBackground") ? -1 : 1))
                                }), google.maps.event.addListener(this.marker_, "dragend", function(a) {
                                    k || e && i.setPosition(0)
                                }), google.maps.event.addListener(this.marker_, "position_changed", function() {
                                    i.setPosition()
                                }), google.maps.event.addListener(this.marker_, "zindex_changed", function() {
                                    i.setZIndex()
                                }), google.maps.event.addListener(this.marker_, "visible_changed", function() {
                                    i.setVisible()
                                }), google.maps.event.addListener(this.marker_, "labelvisible_changed", function() {
                                    i.setVisible()
                                }), google.maps.event.addListener(this.marker_, "title_changed", function() {
                                    i.setTitle()
                                }), google.maps.event.addListener(this.marker_, "labelcontent_changed", function() {
                                    i.setContent()
                                }), google.maps.event.addListener(this.marker_, "labelanchor_changed", function() {
                                    i.setAnchor()
                                }), google.maps.event.addListener(this.marker_, "labelclass_changed", function() {
                                    i.setStyles()
                                }), google.maps.event.addListener(this.marker_, "labelstyle_changed", function() {
                                    i.setStyles()
                                })]
                            }, h.prototype.onRemove = function() {
                                var a;
                                for (this.labelDiv_.parentNode.removeChild(this.labelDiv_), this.eventDiv_.parentNode.removeChild(this.eventDiv_), a = 0; a < this.listeners_.length; a++) google.maps.event.removeListener(this.listeners_[a])
                            }, h.prototype.draw = function() {
                                this.setContent(), this.setTitle(), this.setStyles()
                            }, h.prototype.setContent = function() {
                                var a = this.marker_.get("labelContent");
                                "undefined" == typeof a.nodeType ? (this.labelDiv_.innerHTML = a, this.eventDiv_.innerHTML = this.labelDiv_.innerHTML) : (this.labelDiv_.innerHTML = "", this.labelDiv_.appendChild(a), a = a.cloneNode(!0), this.eventDiv_.innerHTML = "", this.eventDiv_.appendChild(a))
                            }, h.prototype.setTitle = function() {
                                this.eventDiv_.title = this.marker_.getTitle() || ""
                            }, h.prototype.setStyles = function() {
                                var a, b;
                                this.labelDiv_.className = this.marker_.get("labelClass"), this.eventDiv_.className = this.labelDiv_.className, this.labelDiv_.style.cssText = "", this.eventDiv_.style.cssText = "", b = this.marker_.get("labelStyle");
                                for (a in b) b.hasOwnProperty(a) && (this.labelDiv_.style[a] = b[a], this.eventDiv_.style[a] = b[a]);
                                this.setMandatoryStyles()
                            }, h.prototype.setMandatoryStyles = function() {
                                this.labelDiv_.style.position = "absolute", this.labelDiv_.style.overflow = "hidden", "undefined" != typeof this.labelDiv_.style.opacity && "" !== this.labelDiv_.style.opacity && (this.labelDiv_.style.MsFilter = '"progid:DXImageTransform.Microsoft.Alpha(opacity=' + 100 * this.labelDiv_.style.opacity + ')"', this.labelDiv_.style.filter = "alpha(opacity=" + 100 * this.labelDiv_.style.opacity + ")"), this.eventDiv_.style.position = this.labelDiv_.style.position, this.eventDiv_.style.overflow = this.labelDiv_.style.overflow, this.eventDiv_.style.opacity = .01, this.eventDiv_.style.MsFilter = '"progid:DXImageTransform.Microsoft.Alpha(opacity=1)"', this.eventDiv_.style.filter = "alpha(opacity=1)", this.setAnchor(), this.setPosition(), this.setVisible()
                            }, h.prototype.setAnchor = function() {
                                var a = this.marker_.get("labelAnchor");
                                this.labelDiv_.style.marginLeft = -a.x + "px", this.labelDiv_.style.marginTop = -a.y + "px", this.eventDiv_.style.marginLeft = -a.x + "px", this.eventDiv_.style.marginTop = -a.y + "px"
                            }, h.prototype.setPosition = function(a) {
                                var b = this.getProjection().fromLatLngToDivPixel(this.marker_.getPosition());
                                "undefined" == typeof a && (a = 0), this.labelDiv_.style.left = Math.round(b.x) + "px", this.labelDiv_.style.top = Math.round(b.y - a) + "px", this.eventDiv_.style.left = this.labelDiv_.style.left, this.eventDiv_.style.top = this.labelDiv_.style.top, this.setZIndex()
                            }, h.prototype.setZIndex = function() {
                                var a = this.marker_.get("labelInBackground") ? -1 : 1;
                                "undefined" == typeof this.marker_.getZIndex() ? (this.labelDiv_.style.zIndex = parseInt(this.labelDiv_.style.top, 10) + a, this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex) : (this.labelDiv_.style.zIndex = this.marker_.getZIndex() + a, this.eventDiv_.style.zIndex = this.labelDiv_.style.zIndex)
                            }, h.prototype.setVisible = function() {
                                this.marker_.get("labelVisible") ? this.labelDiv_.style.display = this.marker_.getVisible() ? "block" : "none" : this.labelDiv_.style.display = "none", this.eventDiv_.style.display = this.labelDiv_.style.display
                            }, g(i, google.maps.Marker), i.prototype.setMap = function(a) {
                                google.maps.Marker.prototype.setMap.apply(this, arguments), this.label.setMap(a)
                            }, j.prototype = new google.maps.OverlayView, a.RichMarker = j, j.prototype.getVisible = function() {
                                return this.get("visible")
                            }, j.prototype.getVisible = j.prototype.getVisible, j.prototype.setVisible = function(a) {
                                this.set("visible", a)
                            }, j.prototype.setVisible = j.prototype.setVisible, j.prototype.visible_changed = function() {
                                this.ready_ && (this.markerWrapper_.style.display = this.getVisible() ? "" : "none", this.draw())
                            }, j.prototype.visible_changed = j.prototype.visible_changed, j.prototype.setFlat = function(a) {
                                this.set("flat", !!a)
                            }, j.prototype.setFlat = j.prototype.setFlat, j.prototype.getFlat = function() {
                                return this.get("flat")
                            }, j.prototype.getFlat = j.prototype.getFlat, j.prototype.getWidth = function() {
                                return this.get("width")
                            }, j.prototype.getWidth = j.prototype.getWidth, j.prototype.getHeight = function() {
                                return this.get("height")
                            }, j.prototype.getHeight = j.prototype.getHeight, j.prototype.setShadow = function(a) {
                                this.set("shadow", a), this.flat_changed()
                            }, j.prototype.setShadow = j.prototype.setShadow, j.prototype.getShadow = function() {
                                return this.get("shadow")
                            }, j.prototype.getShadow = j.prototype.getShadow, j.prototype.flat_changed = function() {
                                this.ready_ && (this.markerWrapper_.style.boxShadow = this.markerWrapper_.style.webkitBoxShadow = this.markerWrapper_.style.MozBoxShadow = this.getFlat() ? "" : this.getShadow())
                            }, j.prototype.flat_changed = j.prototype.flat_changed, j.prototype.setZIndex = function(a) {
                                this.set("zIndex", a)
                            }, j.prototype.setZIndex = j.prototype.setZIndex, j.prototype.getZIndex = function() {
                                return this.get("zIndex")
                            }, j.prototype.getZIndex = j.prototype.getZIndex, j.prototype.zIndex_changed = function() {
                                this.getZIndex() && this.ready_ && (this.markerWrapper_.style.zIndex = this.getZIndex())
                            }, j.prototype.zIndex_changed = j.prototype.zIndex_changed, j.prototype.getDraggable = function() {
                                return this.get("draggable")
                            }, j.prototype.getDraggable = j.prototype.getDraggable, j.prototype.setDraggable = function(a) {
                                this.set("draggable", !!a)
                            }, j.prototype.setDraggable = j.prototype.setDraggable, j.prototype.draggable_changed = function() {
                                this.ready_ && (this.getDraggable() ? this.addDragging_(this.markerWrapper_) : this.removeDragListeners_())
                            }, j.prototype.draggable_changed = j.prototype.draggable_changed, j.prototype.getPosition = function() {
                                return this.get("position")
                            }, j.prototype.getPosition = j.prototype.getPosition, j.prototype.setPosition = function(a) {
                                this.set("position", a)
                            }, j.prototype.setPosition = j.prototype.setPosition, j.prototype.position_changed = function() {
                                this.draw()
                            }, j.prototype.position_changed = j.prototype.position_changed, j.prototype.getAnchor = function() {
                                return this.get("anchor")
                            }, j.prototype.getAnchor = j.prototype.getAnchor, j.prototype.setAnchor = function(a) {
                                this.set("anchor", a)
                            }, j.prototype.setAnchor = j.prototype.setAnchor, j.prototype.anchor_changed = function() {
                                this.draw()
                            }, j.prototype.anchor_changed = j.prototype.anchor_changed, j.prototype.htmlToDocumentFragment_ = function(a) {
                                var b = document.createElement("DIV");
                                if (b.innerHTML = a, 1 == b.childNodes.length) return b.removeChild(b.firstChild);
                                for (var c = document.createDocumentFragment(); b.firstChild;) c.appendChild(b.firstChild);
                                return c
                            }, j.prototype.removeChildren_ = function(a) {
                                if (a)
                                    for (var b; b = a.firstChild;) a.removeChild(b)
                            }, j.prototype.setContent = function(a) {
                                this.set("content", a)
                            }, j.prototype.setContent = j.prototype.setContent, j.prototype.getContent = function() {
                                return this.get("content")
                            }, j.prototype.getContent = j.prototype.getContent, j.prototype.content_changed = function() {
                                if (this.markerContent_) {
                                    this.removeChildren_(this.markerContent_);
                                    var a = this.getContent();
                                    if (a) {
                                        "string" == typeof a && (a = a.replace(/^\s*([\S\s]*)\b\s*$/, "$1"), a = this.htmlToDocumentFragment_(a)), this.markerContent_.appendChild(a);
                                        for (var b, c = this, d = this.markerContent_.getElementsByTagName("IMG"), e = 0; b = d[e]; e++) google.maps.event.addDomListener(b, "mousedown", function(a) {
                                            c.getDraggable() && (a.preventDefault && a.preventDefault(), a.returnValue = !1)
                                        }), google.maps.event.addDomListener(b, "load", function() {
                                            c.draw()
                                        });
                                        google.maps.event.trigger(this, "domready")
                                    }
                                    this.ready_ && this.draw()
                                }
                            }, j.prototype.content_changed = j.prototype.content_changed, j.prototype.setCursor_ = function(a) {
                                if (this.ready_) {
                                    var b = ""; - 1 !== navigator.userAgent.indexOf("Gecko/") ? ("dragging" == a && (b = "-moz-grabbing"), "dragready" == a && (b = "-moz-grab"), "draggable" == a && (b = "pointer")) : ("dragging" != a && "dragready" != a || (b = "move"), "draggable" == a && (b = "pointer")), this.markerWrapper_.style.cursor != b && (this.markerWrapper_.style.cursor = b)
                                }
                            }, j.prototype.startDrag = function(a) {
                                if (this.getDraggable() && !this.dragging_) {
                                    this.dragging_ = !0;
                                    var b = this.getMap();
                                    this.mapDraggable_ = b.get("draggable"), b.set("draggable", !1), this.mouseX_ = a.clientX, this.mouseY_ = a.clientY, this.setCursor_("dragready"), this.markerWrapper_.style.MozUserSelect = "none", this.markerWrapper_.style.KhtmlUserSelect = "none", this.markerWrapper_.style.WebkitUserSelect = "none", this.markerWrapper_.unselectable = "on", this.markerWrapper_.onselectstart = function() {
                                        return !1
                                    }, this.addDraggingListeners_(), google.maps.event.trigger(this, "dragstart")
                                }
                            }, j.prototype.stopDrag = function() {
                                this.getDraggable() && this.dragging_ && (this.dragging_ = !1, this.getMap().set("draggable", this.mapDraggable_), this.mouseX_ = this.mouseY_ = this.mapDraggable_ = null, this.markerWrapper_.style.MozUserSelect = "", this.markerWrapper_.style.KhtmlUserSelect = "", this.markerWrapper_.style.WebkitUserSelect = "", this.markerWrapper_.unselectable = "off", this.markerWrapper_.onselectstart = function() {}, this.removeDraggingListeners_(), this.setCursor_("draggable"), google.maps.event.trigger(this, "dragend"), this.draw())
                            }, j.prototype.drag = function(a) {
                                if (!this.getDraggable() || !this.dragging_) return void this.stopDrag();
                                var b = this.mouseX_ - a.clientX,
                                    c = this.mouseY_ - a.clientY;
                                this.mouseX_ = a.clientX, this.mouseY_ = a.clientY;
                                var d = parseInt(this.markerWrapper_.style.left, 10) - b,
                                    e = parseInt(this.markerWrapper_.style.top, 10) - c;
                                this.markerWrapper_.style.left = d + "px", this.markerWrapper_.style.top = e + "px";
                                var f = this.getOffset_(),
                                    g = new google.maps.Point(d - f.width, e - f.height),
                                    h = this.getProjection();
                                this.setPosition(h.fromDivPixelToLatLng(g)), this.setCursor_("dragging"), google.maps.event.trigger(this, "drag")
                            }, j.prototype.removeDragListeners_ = function() {
                                this.draggableListener_ && (google.maps.event.removeListener(this.draggableListener_), delete this.draggableListener_), this.setCursor_("")
                            }, j.prototype.addDragging_ = function(a) {
                                if (a) {
                                    var b = this;
                                    this.draggableListener_ = google.maps.event.addDomListener(a, "mousedown", function(a) {
                                        b.startDrag(a)
                                    }), this.setCursor_("draggable")
                                }
                            }, j.prototype.addDraggingListeners_ = function() {
                                var b = this;
                                this.markerWrapper_.setCapture ? (this.markerWrapper_.setCapture(!0), this.draggingListeners_ = [google.maps.event.addDomListener(this.markerWrapper_, "mousemove", function(a) {
                                    b.drag(a)
                                }, !0), google.maps.event.addDomListener(this.markerWrapper_, "mouseup", function() {
                                    b.stopDrag(), b.markerWrapper_.releaseCapture()
                                }, !0)]) : this.draggingListeners_ = [google.maps.event.addDomListener(a, "mousemove", function(a) {
                                    b.drag(a)
                                }, !0), google.maps.event.addDomListener(a, "mouseup", function() {
                                    b.stopDrag()
                                }, !0)]
                            }, j.prototype.removeDraggingListeners_ = function() {
                                if (this.draggingListeners_) {
                                    for (var a, b = 0; a = this.draggingListeners_[b]; b++) google.maps.event.removeListener(a);
                                    this.draggingListeners_.length = 0
                                }
                            }, j.prototype.getOffset_ = function() {
                                var a = this.getAnchor();
                                if ("object" == typeof a) return a;
                                var b = new google.maps.Size(0, 0);
                                if (!this.markerContent_) return b;
                                var c = this.markerContent_.offsetWidth,
                                    d = this.markerContent_.offsetHeight;
                                switch (a) {
                                    case k.TOP_LEFT:
                                        break;
                                    case k.TOP:
                                        b.width = -c / 2;
                                        break;
                                    case k.TOP_RIGHT:
                                        b.width = -c;
                                        break;
                                    case k.LEFT:
                                        b.height = -d / 2;
                                        break;
                                    case k.MIDDLE:
                                        b.width = -c / 2, b.height = -d / 2;
                                        break;
                                    case k.RIGHT:
                                        b.width = -c, b.height = -d / 2;
                                        break;
                                    case k.BOTTOM_LEFT:
                                        b.height = -d;
                                        break;
                                    case k.BOTTOM:
                                        b.width = -c / 2, b.height = -d;
                                        break;
                                    case k.BOTTOM_RIGHT:
                                        b.width = -c, b.height = -d;
                                }
                                return b
                            }, j.prototype.onAdd = function() {
                                if (this.markerWrapper_ || (this.markerWrapper_ = document.createElement("DIV"), this.markerWrapper_.style.position = "absolute"), this.getZIndex() && (this.markerWrapper_.style.zIndex = this.getZIndex()), this.markerWrapper_.style.display = this.getVisible() ? "" : "none", !this.markerContent_) {
                                    this.markerContent_ = document.createElement("DIV"), this.markerWrapper_.appendChild(this.markerContent_);
                                    var a = this;
                                    google.maps.event.addDomListener(this.markerContent_, "click", function(b) {
                                        google.maps.event.trigger(a, "click")
                                    }), google.maps.event.addDomListener(this.markerContent_, "mouseover", function(b) {
                                        google.maps.event.trigger(a, "mouseover")
                                    }), google.maps.event.addDomListener(this.markerContent_, "mouseout", function(b) {
                                        google.maps.event.trigger(a, "mouseout")
                                    })
                                }
                                this.ready_ = !0, this.content_changed(), this.flat_changed(), this.draggable_changed();
                                var b = this.getPanes();
                                b && b.overlayMouseTarget.appendChild(this.markerWrapper_), google.maps.event.trigger(this, "ready")
                            }, j.prototype.onAdd = j.prototype.onAdd, j.prototype.draw = function() {
                                if (this.ready_ && !this.dragging_) {
                                    var a = this.getProjection();
                                    if (a) {
                                        var b = this.get("position"),
                                            c = a.fromLatLngToDivPixel(b),
                                            d = this.getOffset_();
                                        this.markerWrapper_.style.top = c.y + d.height + "px", this.markerWrapper_.style.left = c.x + d.width + "px";
                                        var e = this.markerContent_.offsetHeight,
                                            f = this.markerContent_.offsetWidth;
                                        f != this.get("width") && this.set("width", f), e != this.get("height") && this.set("height", e)
                                    }
                                }
                            }, j.prototype.draw = j.prototype.draw, j.prototype.onRemove = function() {
                                this.markerWrapper_ && this.markerWrapper_.parentNode && this.markerWrapper_.parentNode.removeChild(this.markerWrapper_), this.removeDragListeners_()
                            }, j.prototype.onRemove = j.prototype.onRemove;
                        var k = {
                            TOP_LEFT: 1,
                            TOP: 2,
                            TOP_RIGHT: 3,
                            LEFT: 4,
                            MIDDLE: 5,
                            RIGHT: 6,
                            BOTTOM_LEFT: 7,
                            BOTTOM: 8,
                            BOTTOM_RIGHT: 9
                        };
                        a.RichMarkerPosition = k, a.InfoBox = f, a.Cluster = d, a.ClusterIcon = b, a.MarkerClusterer = e, a.MarkerLabel_ = h, a.MarkerWithLabel = i, a.RichMarker = j
                    }()
                })
            }
        }),
        function(a) {
            function b(d) {
                if (c[d]) return c[d].exports;
                var e = c[d] = {
                    exports: {},
                    id: d,
                    loaded: !1
                };
                return a[d].call(e.exports, e, e.exports, b), e.loaded = !0, e.exports
            }
            var c = {};
            return b.m = a, b.c = c, b.p = "", b(0)
        }([function(a, c, d) {
            b.module("uiGmapgoogle-maps.wrapped").service("uiGmapDataStructures", function() {
                return {
                    Graph: d(1).Graph,
                    Queue: d(1).Queue
                }
            })
        }, function(a, b, c) {
            (function() {
                a.exports = {
                    Graph: c(2),
                    Heap: c(3),
                    LinkedList: c(4),
                    Map: c(5),
                    Queue: c(6),
                    RedBlackTree: c(7),
                    Trie: c(8)
                }
            }).call(this)
        }, function(a, b) {
            (function() {
                var b, c = {}.hasOwnProperty;
                b = function() {
                    function a() {
                        this._nodes = {}, this.nodeSize = 0, this.edgeSize = 0
                    }
                    return a.prototype.addNode = function(a) {
                        return this._nodes[a] ? void 0 : (this.nodeSize++, this._nodes[a] = {
                            _outEdges: {},
                            _inEdges: {}
                        })
                    }, a.prototype.getNode = function(a) {
                        return this._nodes[a]
                    }, a.prototype.removeNode = function(a) {
                        var b, d, e, f, g;
                        if (d = this._nodes[a]) {
                            f = d._outEdges;
                            for (e in f) c.call(f, e) && this.removeEdge(a, e);
                            g = d._inEdges;
                            for (b in g) c.call(g, b) && this.removeEdge(b, a);
                            return this.nodeSize--, delete this._nodes[a], d
                        }
                    }, a.prototype.addEdge = function(a, b, c) {
                        var d, e, f;
                        return null == c && (c = 1), !this.getEdge(a, b) && (e = this._nodes[a], f = this._nodes[b], e && f) ? (d = {
                            weight: c
                        }, e._outEdges[b] = d, f._inEdges[a] = d, this.edgeSize++, d) : void 0
                    }, a.prototype.getEdge = function(a, b) {
                        var c, d;
                        return c = this._nodes[a], d = this._nodes[b], c && d ? c._outEdges[b] : void 0
                    }, a.prototype.removeEdge = function(a, b) {
                        var c, d, e;
                        return d = this._nodes[a], e = this._nodes[b], (c = this.getEdge(a, b)) ? (delete d._outEdges[b], delete e._inEdges[a], this.edgeSize--, c) : void 0
                    }, a.prototype.getInEdgesOf = function(a) {
                        var b, d, e, f;
                        e = this._nodes[a], d = [], f = null != e ? e._inEdges : void 0;
                        for (b in f) c.call(f, b) && d.push(this.getEdge(b, a));
                        return d
                    }, a.prototype.getOutEdgesOf = function(a) {
                        var b, d, e, f;
                        b = this._nodes[a], d = [], f = null != b ? b._outEdges : void 0;
                        for (e in f) c.call(f, e) && d.push(this.getEdge(a, e));
                        return d
                    }, a.prototype.getAllEdgesOf = function(a) {
                        var b, c, d, e, f, g, h;
                        if (c = this.getInEdgesOf(a), d = this.getOutEdgesOf(a), 0 === c.length) return d;
                        for (e = this.getEdge(a, a), b = f = 0, g = c.length; g >= 0 ? g > f : f > g; b = g >= 0 ? ++f : --f)
                            if (c[b] === e) {
                                h = [c[c.length - 1], c[b]], c[b] = h[0], c[c.length - 1] = h[1], c.pop();
                                break
                            }
                        return c.concat(d)
                    }, a.prototype.forEachNode = function(a) {
                        var b, d, e;
                        e = this._nodes;
                        for (b in e) c.call(e, b) && (d = e[b], a(d, b))
                    }, a.prototype.forEachEdge = function(a) {
                        var b, d, e, f, g, h;
                        g = this._nodes;
                        for (d in g)
                            if (c.call(g, d)) {
                                e = g[d], h = e._outEdges;
                                for (f in h) c.call(h, f) && (b = h[f], a(b))
                            }
                    }, a
                }(), a.exports = b
            }).call(this)
        }, function(a, b) {
            (function() {
                var b, c, d, e;
                b = function() {
                    function a(a) {
                        var b, c, d, e, f, g;
                        for (null == a && (a = []), this._data = [void 0], d = 0, f = a.length; f > d; d++) c = a[d], null != c && this._data.push(c);
                        if (this._data.length > 1)
                            for (b = e = 2, g = this._data.length; g >= 2 ? g > e : e > g; b = g >= 2 ? ++e : --e) this._upHeap(b);
                        this.size = this._data.length - 1
                    }
                    return a.prototype.add = function(a) {
                        return null != a ? (this._data.push(a), this._upHeap(this._data.length - 1), this.size++, a) : void 0
                    }, a.prototype.removeMin = function() {
                        var a;
                        if (1 !== this._data.length) return this.size--, 2 === this._data.length ? this._data.pop() : (a = this._data[1], this._data[1] = this._data.pop(), this._downHeap(), a)
                    }, a.prototype.peekMin = function() {
                        return this._data[1]
                    }, a.prototype._upHeap = function(a) {
                        var b, c;
                        for (b = this._data[a]; this._data[a] < this._data[d(a)] && a > 1;) c = [this._data[d(a)], this._data[a]], this._data[a] = c[0], this._data[d(a)] = c[1], a = d(a)
                    }, a.prototype._downHeap = function() {
                        var a, b, d;
                        for (a = 1; c(a < this._data.length) && (b = c(a), b < this._data.length - 1 && this._data[e(a)] < this._data[b] && (b = e(a)), this._data[b] < this._data[a]);) d = [this._data[a], this._data[b]], this._data[b] = d[0], this._data[a] = d[1], a = b
                    }, a
                }(), d = function(a) {
                    return a >> 1
                }, c = function(a) {
                    return a << 1
                }, e = function(a) {
                    return (a << 1) + 1
                }, a.exports = b
            }).call(this)
        }, function(a, b) {
            (function() {
                var b;
                b = function() {
                    function a(a) {
                        var b, c, d;
                        for (null == a && (a = []), this.head = {
                                prev: void 0,
                                value: void 0,
                                next: void 0
                            }, this.tail = {
                                prev: void 0,
                                value: void 0,
                                next: void 0
                            }, this.size = 0, c = 0, d = a.length; d > c; c++) b = a[c], this.add(b)
                    }
                    return a.prototype.at = function(a) {
                        var b, c, d, e, f;
                        if (-this.size <= a && a < this.size) {
                            if (a = this._adjust(a), 2 * a < this.size)
                                for (b = this.head, c = d = 1; a >= d; c = d += 1) b = b.next;
                            else
                                for (b = this.tail, c = e = 1, f = this.size - a - 1; f >= e; c = e += 1) b = b.prev;
                            return b
                        }
                    }, a.prototype.add = function(a, b) {
                        var c, d, e, f, g;
                        return null == b && (b = this.size), -this.size <= b && b <= this.size ? (d = {
                            value: a
                        }, b = this._adjust(b), 0 === this.size ? this.head = d : 0 === b ? (e = [d, this.head, d], this.head.prev = e[0], d.next = e[1], this.head = e[2]) : (c = this.at(b - 1), f = [c.next, d, d, c], d.next = f[0], null != (g = c.next) ? g.prev = f[1] : void 0, c.next = f[2], d.prev = f[3]), b === this.size && (this.tail = d), this.size++, a) : void 0
                    }, a.prototype.removeAt = function(a) {
                        var b, c, d;
                        return null == a && (a = this.size - 1), -this.size <= a && a < this.size && 0 !== this.size ? (a = this._adjust(a), 1 === this.size ? (c = this.head.value, this.head.value = this.tail.value = void 0) : 0 === a ? (c = this.head.value, this.head = this.head.next, this.head.prev = void 0) : (b = this.at(a), c = b.value, b.prev.next = b.next, null != (d = b.next) && (d.prev = b.prev), a === this.size - 1 && (this.tail = b.prev)), this.size--, c) : void 0
                    }, a.prototype.remove = function(a) {
                        var b;
                        if (null != a) {
                            for (b = this.head; b && b.value !== a;) b = b.next;
                            if (b) return 1 === this.size ? this.head.value = this.tail.value = void 0 : b === this.head ? (this.head = this.head.next, this.head.prev = void 0) : b === this.tail ? (this.tail = this.tail.prev, this.tail.next = void 0) : (b.prev.next = b.next, b.next.prev = b.prev), this.size--, a
                        }
                    }, a.prototype.indexOf = function(a, b) {
                        var c, d;
                        if (null == b && (b = 0), null == this.head.value && !this.head.next || b >= this.size) return -1;
                        for (b = Math.max(0, this._adjust(b)), c = this.at(b), d = b; c && c.value !== a;) c = c.next, d++;
                        return d === this.size ? -1 : d
                    }, a.prototype._adjust = function(a) {
                        return 0 > a ? this.size + a : a
                    }, a
                }(), a.exports = b
            }).call(this)
        }, function(a, b) {
            (function() {
                var b, c, d, e, f = {}.hasOwnProperty;
                c = "_mapId_", b = function() {
                    function a(b) {
                        var c, d;
                        this._content = {}, this._itemId = 0, this._id = a._newMapId(), this.size = 0;
                        for (c in b) f.call(b, c) && (d = b[c], this.set(c, d))
                    }
                    return a._mapIdTracker = 0, a._newMapId = function() {
                        return this._mapIdTracker++
                    }, a.prototype.hash = function(a, b) {
                        var f, g;
                        return null == b && (b = !1), g = d(a), e(a) ? (f = c + this._id, b && !a[f] && (a[f] = this._itemId++), f + "_" + a[f]) : g + "_" + a
                    }, a.prototype.set = function(a, b) {
                        return this.has(a) || this.size++, this._content[this.hash(a, !0)] = [b, a], b
                    }, a.prototype.get = function(a) {
                        var b;
                        return null != (b = this._content[this.hash(a)]) ? b[0] : void 0
                    }, a.prototype.has = function(a) {
                        return this.hash(a) in this._content
                    }, a.prototype["delete"] = function(a) {
                        var b;
                        return b = this.hash(a), b in this._content ? (delete this._content[b], e(a) && delete a[c + this._id], this.size--, !0) : !1
                    }, a.prototype.forEach = function(a) {
                        var b, c, d;
                        d = this._content;
                        for (b in d) f.call(d, b) && (c = d[b], a(c[1], c[0]))
                    }, a
                }(), e = function(a) {
                    var b, c, e, f, g;
                    for (b = ["Boolean", "Number", "String", "Undefined", "Null", "RegExp", "Function"], e = d(a), f = 0, g = b.length; g > f; f++)
                        if (c = b[f], e === c) return !1;
                    return !0
                }, d = function(a) {
                    return Object.prototype.toString.apply(a).match(/\[object (.+)\]/)[1]
                }, a.exports = b
            }).call(this)
        }, function(a, b) {
            (function() {
                var b;
                b = function() {
                    function a(a) {
                        null == a && (a = []), this._content = a, this._dequeueIndex = 0, this.size = this._content.length
                    }
                    return a.prototype.enqueue = function(a) {
                        return this.size++, this._content.push(a), a
                    }, a.prototype.dequeue = function() {
                        var a;
                        if (0 !== this.size) return this.size--, a = this._content[this._dequeueIndex], this._dequeueIndex++, 2 * this._dequeueIndex > this._content.length && (this._content = this._content.slice(this._dequeueIndex), this._dequeueIndex = 0), a
                    }, a.prototype.peek = function() {
                        return this._content[this._dequeueIndex]
                    }, a
                }(), a.exports = b
            }).call(this)
        }, function(a, b) {
            (function() {
                var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p;
                c = 0, d = 1, e = 2, h = 3, f = 1, b = 2, g = function() {
                    function a(a) {
                        var b, c, d;
                        for (null == a && (a = []), this._root, this.size = 0, c = 0, d = a.length; d > c; c++) b = a[c], null != b && this.add(b)
                    }
                    return a.prototype.add = function(a) {
                        var g, l, m, n;
                        if (null != a) {
                            if (this.size++, m = {
                                    value: a,
                                    _color: f
                                }, this._root) {
                                if (l = i(this._root, function(b) {
                                        return a === b.value ? c : a < b.value ? b._left ? d : (m._parent = b, b._left = m, h) : b._right ? e : (m._parent = b, b._right = m, h)
                                    }), null != l) return
                            } else this._root = m;
                            for (g = m;;) {
                                if (g === this._root) {
                                    g._color = b;
                                    break
                                }
                                if (g._parent._color === b) break; {
                                    if ((null != (n = p(g)) ? n._color : void 0) !== f) {
                                        !k(g) && k(g._parent) ? (this._rotateLeft(g._parent), g = g._left) : k(g) && !k(g._parent) && (this._rotateRight(g._parent), g = g._right), g._parent._color = b, j(g)._color = f, k(g) ? this._rotateRight(j(g)) : this._rotateLeft(j(g));
                                        break
                                    }
                                    g._parent._color = b, p(g)._color = b, j(g)._color = f, g = j(g)
                                }
                            }
                            return a
                        }
                    }, a.prototype.has = function(a) {
                        var b;
                        return b = i(this._root, function(b) {
                            return a === b.value ? c : a < b.value ? d : e
                        }), !!b
                    }, a.prototype.peekMin = function() {
                        var a;
                        return null != (a = n(this._root)) ? a.value : void 0
                    }, a.prototype.peekMax = function() {
                        var a;
                        return null != (a = m(this._root)) ? a.value : void 0
                    }, a.prototype.remove = function(a) {
                        var b;
                        return (b = i(this._root, function(b) {
                            return a === b.value ? c : a < b.value ? d : e
                        })) ? (this._removeNode(this._root, b), this.size--, a) : void 0
                    }, a.prototype.removeMin = function() {
                        var a, b;
                        return (a = n(this._root)) ? (b = a.value, this._removeNode(this._root, a), b) : void 0
                    }, a.prototype.removeMax = function() {
                        var a, b;
                        return (a = m(this._root)) ? (b = a.value, this._removeNode(this._root, a), b) : void 0
                    }, a.prototype._removeNode = function(a, c) {
                        var d, e, g, h, i, j, m, p, q, r;
                        if (c._left && c._right && (e = n(c._right), c.value = e.value, c = e), e = c._left || c._right, e || (e = {
                                color: b,
                                _right: void 0,
                                _left: void 0,
                                isLeaf: !0
                            }), e._parent = c._parent, null != (g = c._parent) && (g[l(c)] = e), c._color === b)
                            if (e._color === f) e._color = b, e._parent || (this._root = e);
                            else
                                for (;;) {
                                    if (!e._parent) {
                                        e.isLeaf ? this._root = void 0 : this._root = e;
                                        break
                                    }
                                    if (d = o(e), (null != d ? d._color : void 0) === f && (e._parent._color = f, d._color = b, k(e) ? this._rotateLeft(e._parent) : this._rotateRight(e._parent)), d = o(e), e._parent._color !== b || d && (d._color !== b || d._left && d._left._color !== b || d._right && d._right._color !== b)) {
                                        if (!(e._parent._color !== f || d && (d._color !== b || d._left && (null != (h = d._left) ? h._color : void 0) !== b || d._right && (null != (i = d._right) ? i._color : void 0) !== b))) {
                                            null != d && (d._color = f), e._parent._color = b;
                                            break
                                        }
                                        if ((null != d ? d._color : void 0) === b) {
                                            !k(e) || d._right && d._right._color !== b || (null != (j = d._left) ? j._color : void 0) !== f ? k(e) || d._left && d._left._color !== b || (null != (p = d._right) ? p._color : void 0) !== f || (d._color = f, null != (q = d._right) && (q._color = b), this._rotateLeft(d)) : (d._color = f, null != (m = d._left) && (m._color = b), this._rotateRight(d));
                                            break
                                        }
                                        d = o(e), d._color = e._parent._color, k(e) ? (d._right._color = b, this._rotateRight(e._parent)) : (d._left._color = b, this._rotateLeft(e._parent))
                                    } else null != d && (d._color = f), e.isLeaf && (e._parent[l(e)] = void 0), e = e._parent
                                }
                            return e.isLeaf && null != (r = e._parent) ? r[l(e)] = void 0 : void 0
                    }, a.prototype._rotateLeft = function(a) {
                        var b, c;
                        return null != (b = a._parent) && (b[l(a)] = a._right), a._right._parent = a._parent, a._parent = a._right, a._right = a._right._left, a._parent._left = a, null != (c = a._right) && (c._parent = a), null == a._parent._parent ? this._root = a._parent : void 0
                    }, a.prototype._rotateRight = function(a) {
                        var b, c;
                        return null != (b = a._parent) && (b[l(a)] = a._left), a._left._parent = a._parent, a._parent = a._left, a._left = a._left._right, a._parent._right = a, null != (c = a._left) && (c._parent = a), null == a._parent._parent ? this._root = a._parent : void 0
                    }, a
                }(), k = function(a) {
                    return a === a._parent._left
                }, l = function(a) {
                    return k(a) ? "_left" : "_right"
                }, i = function(a, b) {
                    var f, g, i;
                    for (g = a, i = void 0; g;) {
                        if (f = b(g), f === c) {
                            i = g;
                            break
                        }
                        if (f === d) g = g._left;
                        else if (f === e) g = g._right;
                        else if (f === h) break
                    }
                    return i
                }, n = function(a) {
                    return i(a, function(a) {
                        return a._left ? d : c
                    })
                }, m = function(a) {
                    return i(a, function(a) {
                        return a._right ? e : c
                    })
                }, j = function(a) {
                    var b;
                    return null != (b = a._parent) ? b._parent : void 0
                }, p = function(a) {
                    return j(a) ? k(a._parent) ? j(a)._right : j(a)._left : void 0
                }, o = function(a) {
                    return k(a) ? a._parent._right : a._parent._left
                }, a.exports = g
            }).call(this)
        }, function(a, b, c) {
            (function() {
                var b, d, e, f, g = {}.hasOwnProperty;
                b = c(6), e = "end", d = function() {
                    function a(a) {
                        var b, c, d;
                        for (null == a && (a = []), this._root = {}, this.size = 0, c = 0, d = a.length; d > c; c++) b = a[c], this.add(b)
                    }
                    return a.prototype.add = function(a) {
                        var b, c, d, f;
                        if (null != a) {
                            for (this.size++, b = this._root, d = 0, f = a.length; f > d; d++) c = a[d], null == b[c] && (b[c] = {}), b = b[c];
                            return b[e] = !0, a
                        }
                    }, a.prototype.has = function(a) {
                        var b, c, d, f;
                        if (null == a) return !1;
                        for (b = this._root, d = 0, f = a.length; f > d; d++) {
                            if (c = a[d], null == b[c]) return !1;
                            b = b[c]
                        }
                        return !!b[e]
                    }, a.prototype.longestPrefixOf = function(a) {
                        var b, c, d, e, f;
                        if (null == a) return "";
                        for (b = this._root, d = "", e = 0, f = a.length; f > e && (c = a[e], null != b[c]); e++) d += c, b = b[c];
                        return d
                    }, a.prototype.wordsWithPrefix = function(a) {
                        var c, d, f, h, i, j, k, l, m, n;
                        if (null == a) return [];
                        for (null != a || (a = ""), k = [], d = this._root, l = 0, m = a.length; m > l; l++)
                            if (f = a[l], d = d[f], null == d) return [];
                        for (i = new b, i.enqueue([d, ""]); 0 !== i.size;) {
                            n = i.dequeue(), h = n[0], c = n[1], h[e] && k.push(a + c);
                            for (f in h) g.call(h, f) && (j = h[f], i.enqueue([j, c + f]))
                        }
                        return k
                    }, a.prototype.remove = function(a) {
                        var b, c, d, g, h, i, j, k;
                        if (null != a) {
                            for (b = this._root, g = [], h = 0, j = a.length; j > h; h++) {
                                if (d = a[h], null == b[d]) return;
                                b = b[d], g.push([d, b])
                            }
                            if (b[e]) {
                                if (this.size--, delete b[e], f(b, 1)) return a;
                                for (c = i = k = g.length - 1;
                                    (1 >= k ? 1 >= i : i >= 1) && !f(g[c][1], 1); c = 1 >= k ? ++i : --i) delete g[c - 1][1][g[c][0]];
                                return f(this._root[g[0][0]], 1) || delete this._root[g[0][0]], a
                            }
                        }
                    }, a
                }(), f = function(a, b) {
                    var c, d;
                    if (0 === b) return !0;
                    d = 0;
                    for (c in a)
                        if (g.call(a, c) && (d++, d >= b)) return !0;
                    return !1
                }, a.exports = d
            }).call(this)
        }]), b.module("uiGmapgoogle-maps.wrapped").service("uiGmapMarkerSpiderfier", ["uiGmapGoogleMapApi", function(b) {
            var c = this;
            return + function() {
                var b = {}.hasOwnProperty,
                    c = [].slice;
                this.OverlappingMarkerSpiderfier = function() {
                    function d(a, c) {
                        var d, f, g, h, i, j;
                        this.map = a, null == c && (c = {});
                        for (f in c) b.call(c, f) && (j = c[f], this[f] = j);
                        for (this.projHelper = new this.constructor.ProjHelper(this.map), this.initMarkerArrays(), this.listeners = {}, i = ["click", "zoom_changed", "maptypeid_changed"], g = 0, h = i.length; h > g; g++) d = i[g], e.addListener(this.map, d, function(a) {
                            return function() {
                                return a.unspiderfy()
                            }
                        }(this))
                    }
                    var e, f, g, h, i, j, k, l, m, n, o;
                    for (l = d.prototype, m = [d, l], g = 0, j = m.length; j > g; g++) o = m[g], o.VERSION = "0.3.3";
                    return f = void 0, e = void 0, k = void 0, n = 2 * Math.PI, l.keepSpiderfied = !1, l.markersWontHide = !1, l.markersWontMove = !1, l.nearbyDistance = 20, l.circleSpiralSwitchover = 9, l.circleFootSeparation = 23, l.circleStartAngle = n / 12, l.spiralFootSeparation = 26, l.spiralLengthStart = 11, l.spiralLengthFactor = 4, l.spiderfiedZIndex = 1e3, l.usualLegZIndex = 10, l.highlightedLegZIndex = 20, l.event = "click", l.minZoomLevel = !1, l.legWeight = 1.5, l.legColors = {
                        usual: {},
                        highlighted: {}
                    }, i = l.legColors.usual, h = l.legColors.highlighted, d.initializeGoogleMaps = function(a) {
                        return f = a.maps, e = f.event, k = f.MapTypeId, i[k.HYBRID] = i[k.SATELLITE] = "#fff", h[k.HYBRID] = h[k.SATELLITE] = "#f00", i[k.TERRAIN] = i[k.ROADMAP] = "#444", h[k.TERRAIN] = h[k.ROADMAP] = "#f00", this.ProjHelper = function(a) {
                            return this.setMap(a)
                        }, this.ProjHelper.prototype = new f.OverlayView, this.ProjHelper.prototype.draw = function() {}
                    }, l.initMarkerArrays = function() {
                        return this.markers = [], this.markerListenerRefs = []
                    }, l.addMarker = function(a) {
                        var b;
                        return null != a._oms ? this : (a._oms = !0, b = [e.addListener(a, this.event, function(b) {
                            return function(c) {
                                return b.spiderListener(a, c)
                            }
                        }(this))], this.markersWontHide || b.push(e.addListener(a, "visible_changed", function(b) {
                            return function() {
                                return b.markerChangeListener(a, !1)
                            }
                        }(this))), this.markersWontMove || b.push(e.addListener(a, "position_changed", function(b) {
                            return function() {
                                return b.markerChangeListener(a, !0)
                            }
                        }(this))), this.markerListenerRefs.push(b), this.markers.push(a), this)
                    }, l.markerChangeListener = function(a, b) {
                        return null == a._omsData || !b && a.getVisible() || null != this.spiderfying || null != this.unspiderfying ? void 0 : this.unspiderfy(b ? a : null)
                    }, l.getMarkers = function() {
                        return this.markers.slice(0)
                    }, l.removeMarker = function(a) {
                        var b, c, d, f, g;
                        if (null != a._omsData && this.unspiderfy(), b = this.arrIndexOf(this.markers, a), 0 > b) return this;
                        for (g = this.markerListenerRefs.splice(b, 1)[0], c = 0, d = g.length; d > c; c++) f = g[c], e.removeListener(f);
                        return delete a._oms, this.markers.splice(b, 1), this
                    }, l.clearMarkers = function() {
                        var a, b, c, d, f, g, h, i, j;
                        for (this.unspiderfy(), j = this.markers, a = b = 0, c = j.length; c > b; a = ++b) {
                            for (h = j[a], g = this.markerListenerRefs[a], i = 0, d = g.length; d > i; i++) f = g[i], e.removeListener(f);
                            delete h._oms
                        }
                        return this.initMarkerArrays(), this
                    }, l.addListener = function(a, b) {
                        var c;
                        return (null != (c = this.listeners)[a] ? c[a] : c[a] = []).push(b), this
                    }, l.removeListener = function(a, b) {
                        var c;
                        return c = this.arrIndexOf(this.listeners[a], b), 0 > c || this.listeners[a].splice(c, 1), this
                    }, l.clearListeners = function(a) {
                        return this.listeners[a] = [], this
                    }, l.trigger = function() {
                        var a, b, d, e, f, g, h, i;
                        for (b = arguments[0], a = 2 <= arguments.length ? c.call(arguments, 1) : [], h = null != (g = this.listeners[b]) ? g : [], i = [], e = 0, f = h.length; f > e; e++) d = h[e], i.push(d.apply(null, a));
                        return i
                    }, l.generatePtsCircle = function(a, b) {
                        var c, d, e, g, h, i, j, k;
                        for (e = this.circleFootSeparation * (2 + a), i = e / n, d = n / a, k = [], g = h = 0, j = a; j >= 0 ? j > h : h > j; g = j >= 0 ? ++h : --h) c = this.circleStartAngle + g * d, k.push(new f.Point(b.x + i * Math.cos(c), b.y + i * Math.sin(c)));
                        return k
                    }, l.generatePtsSpiral = function(a, b) {
                        var c, d, e, g, h, i, j;
                        for (g = this.spiralLengthStart, c = 0, j = [], d = e = 0, i = a; i >= 0 ? i > e : e > i; d = i >= 0 ? ++e : --e) c += this.spiralFootSeparation / g + 5e-4 * d, h = new f.Point(b.x + g * Math.cos(c), b.y + g * Math.sin(c)), g += n * this.spiralLengthFactor / c, j.push(h);
                        return j
                    }, l.spiderListener = function(b, c) {
                        var d, e, f, g, h, i, j, k, m, n, o, p, q;
                        if (k = null != b._omsData, k && this.keepSpiderfied || ("mouseover" === this.event ? (d = this, e = function() {
                                return d.unspiderfy()
                            }, a.clearTimeout(l.timeout), l.timeout = setTimeout(e, 3e3)) : this.unspiderfy()), k || this.map.getStreetView().getVisible() || "GoogleEarthAPI" === this.map.getMapTypeId()) return this.trigger("click", b, c);
                        for (n = [], o = [], m = this.nearbyDistance, p = m * m, j = this.llToPt(b.position), q = this.markers, f = 0, g = q.length; g > f; f++) h = q[f], null != h.map && h.getVisible() && (i = this.llToPt(h.position), this.ptDistanceSq(i, j) < p ? n.push({
                            marker: h,
                            markerPt: i
                        }) : o.push(h));
                        return 1 === n.length ? this.trigger("click", b, c) : this.spiderfy(n, o)
                    }, l.markersNearMarker = function(a, b) {
                        var c, d, e, f, g, h, i, j, k, l, m;
                        if (null == b && (b = !1), null == this.projHelper.getProjection()) throw "Must wait for 'idle' event on map before calling markersNearMarker";
                        for (i = this.nearbyDistance, j = i * i, g = this.llToPt(a.position), h = [], k = this.markers, c = 0, d = k.length; d > c && (e = k[c], !(e !== a && null != e.map && e.getVisible() && (f = this.llToPt(null != (l = null != (m = e._omsData) ? m.usualPosition : void 0) ? l : e.position), this.ptDistanceSq(f, g) < j && (h.push(e), b)))); c++);
                        return h
                    }, l.markersNearAnyOtherMarker = function() {
                        var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u;
                        if (null == this.projHelper.getProjection()) throw "Must wait for 'idle' event on map before calling markersNearAnyOtherMarker";
                        for (o = this.nearbyDistance, p = o * o, m = function() {
                                var a, b, c, d, e, f;
                                for (c = this.markers, f = [], a = 0, b = c.length; b > a; a++) h = c[a], f.push({
                                    pt: this.llToPt(null != (d = null != (e = h._omsData) ? e.usualPosition : void 0) ? d : h.position),
                                    willSpiderfy: !1
                                });
                                return f
                            }.call(this), r = this.markers, b = d = 0, e = r.length; e > d; b = ++d)
                            if (i = r[b], null != i.map && i.getVisible() && (j = m[b], !j.willSpiderfy))
                                for (s = this.markers, c = n = 0, f = s.length; f > n; c = ++n)
                                    if (k = s[c], c !== b && null != k.map && k.getVisible() && (l = m[c], (!(b > c) || l.willSpiderfy) && this.ptDistanceSq(j.pt, l.pt) < p)) {
                                        j.willSpiderfy = l.willSpiderfy = !0;
                                        break
                                    }
                        for (t = this.markers, u = [], a = q = 0, g = t.length; g > q; a = ++q) h = t[a], m[a].willSpiderfy && u.push(h);
                        return u
                    }, l.makeHighlightListenerFuncs = function(a) {
                        return {
                            highlight: function(b) {
                                return function() {
                                    return a._omsData.leg.setOptions({
                                        strokeColor: b.legColors.highlighted[b.map.mapTypeId],
                                        zIndex: b.highlightedLegZIndex
                                    })
                                }
                            }(this),
                            unhighlight: function(b) {
                                return function() {
                                    return a._omsData.leg.setOptions({
                                        strokeColor: b.legColors.usual[b.map.mapTypeId],
                                        zIndex: b.usualLegZIndex
                                    })
                                }
                            }(this)
                        }
                    }, l.spiderfy = function(a, b) {
                        var c, d, g, h, i, j, k, l, m, n, o;
                        return this.minZoomLevel && this.map.getZoom() < this.minZoomLevel ? !1 : (this.spiderfying = !0, n = a.length, c = this.ptAverage(function() {
                            var b, c, d;
                            for (d = [], b = 0, c = a.length; c > b; b++) l = a[b], d.push(l.markerPt);
                            return d
                        }()), h = n >= this.circleSpiralSwitchover ? this.generatePtsSpiral(n, c).reverse() : this.generatePtsCircle(n, c), o = function() {
                            var b, c, l;
                            for (l = [], b = 0, c = h.length; c > b; b++) g = h[b], d = this.ptToLl(g), m = this.minExtract(a, function(a) {
                                return function(b) {
                                    return a.ptDistanceSq(b.markerPt, g)
                                }
                            }(this)), k = m.marker, j = new f.Polyline({
                                map: this.map,
                                path: [k.position, d],
                                strokeColor: this.legColors.usual[this.map.mapTypeId],
                                strokeWeight: this.legWeight,
                                zIndex: this.usualLegZIndex
                            }), k._omsData = {
                                usualPosition: k.position,
                                leg: j
                            }, this.legColors.highlighted[this.map.mapTypeId] !== this.legColors.usual[this.map.mapTypeId] && (i = this.makeHighlightListenerFuncs(k), k._omsData.hightlightListeners = {
                                highlight: e.addListener(k, "mouseover", i.highlight),
                                unhighlight: e.addListener(k, "mouseout", i.unhighlight)
                            }), k.setPosition(d), k.setZIndex(Math.round(this.spiderfiedZIndex + g.y)), l.push(k);
                            return l
                        }.call(this), delete this.spiderfying, this.spiderfied = !0, this.trigger("spiderfy", o, b))
                    }, l.unspiderfy = function(a) {
                        var b, c, d, f, g, h, i;
                        if (null == a && (a = null), null == this.spiderfied) return this;
                        for (this.unspiderfying = !0, i = [], g = [], h = this.markers, b = 0, c = h.length; c > b; b++) f = h[b], null != f._omsData ? (f._omsData.leg.setMap(null), f !== a && f.setPosition(f._omsData.usualPosition), f.setZIndex(null), d = f._omsData.hightlightListeners, null != d && (e.removeListener(d.highlight), e.removeListener(d.unhighlight)), delete f._omsData, i.push(f)) : g.push(f);
                        return delete this.unspiderfying, delete this.spiderfied, this.trigger("unspiderfy", i, g), this
                    }, l.ptDistanceSq = function(a, b) {
                        var c, d;
                        return c = a.x - b.x, d = a.y - b.y, c * c + d * d
                    }, l.ptAverage = function(a) {
                        var b, c, d, e, g, h;
                        for (g = h = 0, b = 0, c = a.length; c > b; b++) e = a[b], g += e.x, h += e.y;
                        return d = a.length, new f.Point(g / d, h / d)
                    }, l.llToPt = function(a) {
                        return this.projHelper.getProjection().fromLatLngToDivPixel(a)
                    }, l.ptToLl = function(a) {
                        return this.projHelper.getProjection().fromDivPixelToLatLng(a)
                    }, l.minExtract = function(a, b) {
                        var c, d, e, f, g, h, i;
                        for (e = g = 0, h = a.length; h > g; e = ++g) f = a[e], i = b(f), ("undefined" == typeof c || null === c || d > i) && (d = i, c = e);
                        return a.splice(c, 1)[0]
                    }, l.arrIndexOf = function(a, b) {
                        var c, d, e, f;
                        if (null != a.indexOf) return a.indexOf(b);
                        for (c = d = 0, e = a.length; e > d; c = ++d)
                            if (f = a[c], f === b) return c;
                        return -1
                    }, d
                }()
            }.apply(c), b.then(function() {
                c.OverlappingMarkerSpiderfier.initializeGoogleMaps(a.google)
            }), this.OverlappingMarkerSpiderfier
        }]), b.module("uiGmapgoogle-maps.extensions").service("uiGmapExtendMarkerClusterer", ["uiGmapLodash", "uiGmapPropMap", function(b, c) {
            return {
                init: _.once(function() {
                    (function() {
                        var d = {}.hasOwnProperty,
                            e = function(a, b) {
                                function c() {
                                    this.constructor = a
                                }
                                for (var e in b) d.call(b, e) && (a[e] = b[e]);
                                return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                            };
                        a.NgMapCluster = function(a) {
                            function d(a) {
                                d.__super__.constructor.call(this, a), this.markers_ = new c
                            }
                            return e(d, a), d.prototype.addMarker = function(a) {
                                var b, c;
                                if (this.isMarkerAlreadyAdded_(a)) {
                                    var d = this.markers_.get(a.key);
                                    if (d.getPosition().lat() == a.getPosition().lat() && d.getPosition().lon() == a.getPosition().lon()) return !1
                                }
                                if (this.center_) {
                                    if (this.averageCenter_) {
                                        var e = this.markers_.length + 1,
                                            f = (this.center_.lat() * (e - 1) + a.getPosition().lat()) / e,
                                            g = (this.center_.lng() * (e - 1) + a.getPosition().lng()) / e;
                                        this.center_ = new google.maps.LatLng(f, g), this.calculateBounds_()
                                    }
                                } else this.center_ = a.getPosition(), this.calculateBounds_();
                                return a.isAdded = !0, this.markers_.push(a), b = this.markers_.length, c = this.markerClusterer_.getMaxZoom(), null !== c && this.map_.getZoom() > c ? a.getMap() !== this.map_ && a.setMap(this.map_) : b < this.minClusterSize_ ? a.getMap() !== this.map_ && a.setMap(this.map_) : b === this.minClusterSize_ ? this.markers_.each(function(a) {
                                    a.setMap(null)
                                }) : a.setMap(null), !0
                            }, d.prototype.isMarkerAlreadyAdded_ = function(a) {
                                return b.isNullOrUndefined(this.markers_.get(a.key))
                            }, d.prototype.getBounds = function() {
                                var a = new google.maps.LatLngBounds(this.center_, this.center_);
                                return this.getMarkers().each(function(b) {
                                    a.extend(b.getPosition())
                                }), a
                            }, d.prototype.remove = function() {
                                this.clusterIcon_.setMap(null), this.markers_ = new c, delete this.markers_
                            }, d
                        }(Cluster), a.NgMapMarkerClusterer = function(a) {
                            function b(a, d, e) {
                                b.__super__.constructor.call(this, a, d, e), this.markers_ = new c
                            }
                            return e(b, a), b.prototype.clearMarkers = function() {
                                this.resetViewport_(!0), this.markers_ = new c
                            }, b.prototype.removeMarker_ = function(a) {
                                return this.markers_.get(a.key) ? (a.setMap(null), this.markers_.remove(a.key), !0) : !1
                            }, b.prototype.createClusters_ = function(a) {
                                var b, c, d, e = this;
                                if (this.ready_) {
                                    0 === a && (google.maps.event.trigger(this, "clusteringbegin", this), "undefined" != typeof this.timerRefStatic && (clearTimeout(this.timerRefStatic), delete this.timerRefStatic)), d = this.getMap().getZoom() > 3 ? new google.maps.LatLngBounds(this.getMap().getBounds().getSouthWest(), this.getMap().getBounds().getNorthEast()) : new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472, -178.48388434375), new google.maps.LatLng(-85.08136444384544, 178.00048865625));
                                    var f = this.getExtendedBounds(d),
                                        g = Math.min(a + this.batchSize_, this.markers_.length),
                                        h = this.markers_.values();
                                    for (b = a; g > b; b++) c = h[b], !c.isAdded && this.isMarkerInBounds_(c, f) && (!this.ignoreHidden_ || this.ignoreHidden_ && c.getVisible()) && this.addToClosestCluster_(c);
                                    if (g < this.markers_.length) this.timerRefStatic = setTimeout(function() {
                                        e.createClusters_(g)
                                    }, 0);
                                    else {
                                        for (b = 0; b < this.clusters_.length; b++) this.clusters_[b].updateIcon_();
                                        delete this.timerRefStatic, google.maps.event.trigger(this, "clusteringend", this)
                                    }
                                }
                            }, b.prototype.addToClosestCluster_ = function(a) {
                                var b, c, d, e, f = 4e4,
                                    g = null;
                                for (b = 0; b < this.clusters_.length; b++) d = this.clusters_[b], e = d.getCenter(), e && (c = this.distanceBetweenPoints_(e, a.getPosition()), f > c && (f = c, g = d));
                                g && g.isMarkerInClusterBounds(a) ? g.addMarker(a) : (d = new NgMapCluster(this), d.addMarker(a), this.clusters_.push(d))
                            }, b.prototype.redraw_ = function() {
                                this.createClusters_(0)
                            }, b.prototype.resetViewport_ = function(a) {
                                var b;
                                for (b = 0; b < this.clusters_.length; b++) this.clusters_[b].remove();
                                this.clusters_ = [], this.markers_.each(function(b) {
                                    b.isAdded = !1, a && b.setMap(null)
                                })
                            }, b.prototype.extend = function(a, b) {
                                return function(a) {
                                    var b;
                                    for (b in a.prototype) "constructor" !== b && (this.prototype[b] = a.prototype[b]);
                                    return this
                                }.apply(a, [b])
                            }, ClusterIcon.prototype.show = function() {
                                if (this.div_) {
                                    var a = "",
                                        b = this.backgroundPosition_.split(" "),
                                        c = parseInt(b[0].trim(), 10),
                                        d = parseInt(b[1].trim(), 10),
                                        e = this.getPosFromLatLng_(this.center_);
                                    this.div_.style.cssText = this.createCss(e), a = "<img src='" + this.url_ + "' style='position: absolute; top: " + d + "px; left: " + c + "px; ", a += this.cluster_.getMarkerClusterer().enableRetinaIcons_ ? "width: " + this.width_ + "px;height: " + this.height_ + "px;" : "clip: rect(" + -1 * d + "px, " + (-1 * c + this.width_) + "px, " + (-1 * d + this.height_) + "px, " + -1 * c + "px);", a += "'>", this.div_.innerHTML = a + "<div style='position: absolute;top: " + this.anchorText_[0] + "px;left: " + this.anchorText_[1] + "px;color: " + this.textColor_ + ";font-size: " + this.textSize_ + "px;font-family: " + this.fontFamily_ + ";font-weight: " + this.fontWeight_ + ";font-style: " + this.fontStyle_ + ";text-decoration: " + this.textDecoration_ + ";text-align: center;width: " + this.width_ + "px;line-height:" + this.height_ + "px;'>" + this.sums_.text + "</div>", "undefined" == typeof this.sums_.title || "" === this.sums_.title ? this.div_.title = this.cluster_.getMarkerClusterer().getTitle() : this.div_.title = this.sums_.title, this.div_.style.display = ""
                                }
                                this.visible_ = !0
                            }, b
                        }(MarkerClusterer)
                    }).call(this)
                })
            }
        }])
}(window, angular);
//# sourceMappingURL=angular-google-maps-street-view_dev_mapped.min.js.map