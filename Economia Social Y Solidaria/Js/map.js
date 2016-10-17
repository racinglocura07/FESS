﻿/*
 Highmaps JS v5.0.0 (2016-09-29)
 Highmaps as a plugin for Highcharts 4.1.x or Highstock 2.1.x (x being the patch version of this file)

 (c) 2011-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (w) { "object" === typeof module && module.exports ? module.exports = w : w(Highcharts) })(function (w) {
    (function (a) {
        var h = a.Axis, l = a.each, e = a.pick; a = a.wrap; a(h.prototype, "getSeriesExtremes", function (a) {
            var d = this.isXAxis, q, r, h = [], t; d && l(this.series, function (a, b) { a.useMapGeometry && (h[b] = a.xData, a.xData = []) }); a.call(this); d && (q = e(this.dataMin, Number.MAX_VALUE), r = e(this.dataMax, -Number.MAX_VALUE), l(this.series, function (a, b) {
                a.useMapGeometry && (q = Math.min(q, e(a.minX, q)), r = Math.max(r, e(a.maxX, q)), a.xData = h[b],
                t = !0)
            }), t && (this.dataMin = q, this.dataMax = r))
        }); a(h.prototype, "setAxisTranslation", function (a) {
            var d = this.chart, q = d.plotWidth / d.plotHeight, d = d.xAxis[0], e; a.call(this); "yAxis" === this.coll && void 0 !== d.transA && l(this.series, function (a) { a.preserveAspectRatio && (e = !0) }); if (e && (this.transA = d.transA = Math.min(this.transA, d.transA), a = q / ((d.max - d.min) / (this.max - this.min)), a = 1 > a ? this : d, q = (a.max - a.min) * a.transA, a.pixelPadding = a.len - q, a.minPixelPadding = a.pixelPadding / 2, q = a.fixTo)) {
                q = q[1] - a.toValue(q[0], !0); q *= a.transA;
                if (Math.abs(q) > a.minPixelPadding || a.min === a.dataMin && a.max === a.dataMax) q = 0; a.minPixelPadding -= q
            }
        }); a(h.prototype, "render", function (a) { a.call(this); this.fixTo = null })
    })(w); (function (a) {
        var h = a.Axis, l = a.Chart, e = a.color, f, d = a.each, q = a.extend, r = a.isNumber, v = a.Legend, t = a.LegendSymbolMixin, k = a.noop, b = a.merge, c = a.pick, g = a.wrap; f = a.ColorAxis = function () { this.init.apply(this, arguments) }; q(f.prototype, h.prototype); q(f.prototype, {
            defaultColorAxisOptions: {
                lineWidth: 0, minPadding: 0, maxPadding: 0, gridLineWidth: 1, tickPixelInterval: 72,
                startOnTick: !0, endOnTick: !0, offset: 0, marker: { animation: { duration: 50 }, width: .01, color: "#999999" }, labels: { overflow: "justify" }, minColor: "#e6ebf5", maxColor: "#003399", tickLength: 5, showInLegend: !0
            }, init: function (a, p) {
                var c = "vertical" !== a.options.legend.layout, n; this.coll = "colorAxis"; n = b(this.defaultColorAxisOptions, { side: c ? 2 : 1, reversed: !c }, p, { opposite: !c, showEmpty: !1, title: null }); h.prototype.init.call(this, a, n); p.dataClasses && this.initDataClasses(p); this.initStops(p); this.horiz = c; this.zoomEnabled = !1; this.defaultLegendLength =
                200
            }, tweenColors: function (a, b, c) { var n; b.rgba.length && a.rgba.length ? (a = a.rgba, b = b.rgba, n = 1 !== b[3] || 1 !== a[3], a = (n ? "rgba(" : "rgb(") + Math.round(b[0] + (a[0] - b[0]) * (1 - c)) + "," + Math.round(b[1] + (a[1] - b[1]) * (1 - c)) + "," + Math.round(b[2] + (a[2] - b[2]) * (1 - c)) + (n ? "," + (b[3] + (a[3] - b[3]) * (1 - c)) : "") + ")") : a = b.input || "none"; return a }, initDataClasses: function (a) {
                var p = this, c = this.chart, n, m = 0, k = c.options.chart.colorCount, x = this.options, g = a.dataClasses.length; this.dataClasses = n = []; this.legendItems = []; d(a.dataClasses, function (a,
                u) { var d; a = b(a); n.push(a); a.color || ("category" === x.dataClassColor ? (d = c.options.colors, k = d.length, a.color = d[m], a.colorIndex = m, m++, m === k && (m = 0)) : a.color = p.tweenColors(e(x.minColor), e(x.maxColor), 2 > g ? .5 : u / (g - 1))) })
            }, initStops: function (a) { this.stops = a.stops || [[0, this.options.minColor], [1, this.options.maxColor]]; d(this.stops, function (a) { a.color = e(a[1]) }) }, setOptions: function (a) { h.prototype.setOptions.call(this, a); this.options.crosshair = this.options.marker }, setAxisSize: function () {
                var a = this.legendSymbol,
                b = this.chart, c = b.options.legend || {}, n, m; a ? (this.left = c = a.attr("x"), this.top = n = a.attr("y"), this.width = m = a.attr("width"), this.height = a = a.attr("height"), this.right = b.chartWidth - c - m, this.bottom = b.chartHeight - n - a, this.len = this.horiz ? m : a, this.pos = this.horiz ? c : n) : this.len = (this.horiz ? c.symbolWidth : c.symbolHeight) || this.defaultLegendLength
            }, toColor: function (a, b) {
                var c, n = this.stops, m, k = this.dataClasses, d, g; if (k) for (g = k.length; g--;) {
                    if (d = k[g], m = d.from, n = d.to, (void 0 === m || a >= m) && (void 0 === n || a <= n)) {
                        c = d.color;
                        b && (b.dataClass = g, b.colorIndex = d.colorIndex); break
                    }
                } else { this.isLog && (a = this.val2lin(a)); c = 1 - (this.max - a) / (this.max - this.min || 1); for (g = n.length; g-- && !(c > n[g][0]) ;); m = n[g] || n[g + 1]; n = n[g + 1] || m; c = 1 - (n[0] - c) / (n[0] - m[0] || 1); c = this.tweenColors(m.color, n.color, c) } return c
            }, getOffset: function () {
                var a = this.legendGroup, b = this.chart.axisOffset[this.side]; a && (this.axisParent = a, h.prototype.getOffset.call(this), this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] =
                b)
            }, setLegendColor: function () { var a, b = this.options, c = this.reversed; a = c ? 1 : 0; c = c ? 0 : 1; a = this.horiz ? [a, 0, c, 0] : [0, c, 0, a]; this.legendColor = { linearGradient: { x1: a[0], y1: a[1], x2: a[2], y2: a[3] }, stops: b.stops || [[0, b.minColor], [1, b.maxColor]] } }, drawLegendSymbol: function (a, b) {
                var d = a.padding, k = a.options, m = this.horiz, g = c(k.symbolWidth, m ? this.defaultLegendLength : 12), x = c(k.symbolHeight, m ? 12 : this.defaultLegendLength), t = c(k.labelPadding, m ? 16 : 30), k = c(k.itemDistance, 10); this.setLegendColor(); b.legendSymbol = this.chart.renderer.rect(0,
                a.baseline - 11, g, x).attr({ zIndex: 1 }).add(b.legendGroup); this.legendItemWidth = g + d + (m ? k : t); this.legendItemHeight = x + d + (m ? t : 0)
            }, setState: k, visible: !0, setVisible: k, getSeriesExtremes: function () { var a; this.series.length && (a = this.series[0], this.dataMin = a.valueMin, this.dataMax = a.valueMax) }, drawCrosshair: function (a, b) {
                var c = b && b.plotX, k = b && b.plotY, m, d = this.pos, g = this.len; b && (m = this.toPixels(b[b.series.colorKey]), m < d ? m = d - 2 : m > d + g && (m = d + g + 2), b.plotX = m, b.plotY = this.len - m, h.prototype.drawCrosshair.call(this, a, b),
                b.plotX = c, b.plotY = k, this.cross && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross.attr({ fill: this.crosshair.color })))
            }, getPlotLinePath: function (a, b, c, d, m) { return r(m) ? this.horiz ? ["M", m - 4, this.top - 6, "L", m + 4, this.top - 6, m, this.top, "Z"] : ["M", this.left, m, "L", this.left - 6, m + 6, this.left - 6, m - 6, "Z"] : h.prototype.getPlotLinePath.call(this, a, b, c, d) }, update: function (a, c) {
                var k = this.chart, g = k.legend; d(this.series, function (a) { a.isDirtyData = !0 }); a.dataClasses && g.allItems && (d(g.allItems,
                function (a) { a.isDataClass && a.legendGroup.destroy() }), k.isDirtyLegend = !0); k.options[this.coll] = b(this.userOptions, a); h.prototype.update.call(this, a, c); this.legendItem && (this.setLegendColor(), g.colorizeItem(this, !0))
            }, getDataClassLegendSymbols: function () {
                var b = this, c = this.chart, g = this.legendItems, n = c.options.legend, m = n.valueDecimals, f = n.valueSuffix || "", x; g.length || d(this.dataClasses, function (n, e) {
                    var h = !0, r = n.from, l = n.to; x = ""; void 0 === r ? x = "< " : void 0 === l && (x = "> "); void 0 !== r && (x += a.numberFormat(r, m) +
                    f); void 0 !== r && void 0 !== l && (x += " - "); void 0 !== l && (x += a.numberFormat(l, m) + f); g.push(q({ chart: c, name: x, options: {}, drawLegendSymbol: t.drawRectangle, visible: !0, setState: k, isDataClass: !0, setVisible: function () { h = this.visible = !h; d(b.series, function (a) { d(a.points, function (a) { a.dataClass === e && a.setVisible(h) }) }); c.legend.colorizeItem(this, h) } }, n))
                }); return g
            }, name: ""
        }); d(["fill", "stroke"], function (b) {
            a.Fx.prototype[b + "Setter"] = function () {
                this.elem.attr(b, f.prototype.tweenColors(e(this.start), e(this.end),
                this.pos))
            }
        }); g(l.prototype, "getAxes", function (a) { var b = this.options.colorAxis; a.call(this); this.colorAxis = []; b && new f(this, b) }); g(v.prototype, "getAllItems", function (a) { var b = [], c = this.chart.colorAxis[0]; c && c.options && (c.options.showInLegend && (c.options.dataClasses ? b = b.concat(c.getDataClassLegendSymbols()) : b.push(c)), d(c.series, function (a) { a.options.showInLegend = !1 })); return b.concat(a.call(this)) }); g(v.prototype, "colorizeItem", function (a, b, c) { a.call(this, b, c); c && b.legendColor && b.legendSymbol.attr({ fill: b.legendColor }) })
    })(w);
    (function (a) {
        var h = a.defined, l = a.each, e = a.noop, f = a.seriesTypes; a.colorPointMixin = { setVisible: function (a) { var f = this, e = a ? "show" : "hide"; l(["graphic", "dataLabel"], function (a) { if (f[a]) f[a][e]() }) } }; a.colorSeriesMixin = {
            pointArrayMap: ["value"], axisTypes: ["xAxis", "yAxis", "colorAxis"], optionalAxis: "colorAxis", trackerGroups: ["group", "markerGroup", "dataLabelsGroup"], getSymbol: e, parallelArrays: ["x", "y", "value"], colorKey: "value", pointAttribs: f.column.prototype.pointAttribs, translateColors: function () {
                var a = this,
                f = this.options.nullColor, e = this.colorAxis, h = this.colorKey; l(this.data, function (t) { var k = t[h]; if (k = t.options.color || (null === k ? f : e && void 0 !== k ? e.toColor(k, t) : t.color || a.color)) t.color = k })
            }, colorAttribs: function (a) { var f = {}; h(a.color) && (f[this.colorProp || "fill"] = a.color); return f }
        }
    })(w); (function (a) {
        function h(a) { a && (a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0) } var l = a.addEvent, e = a.Chart, f = a.doc, d = a.each, q = a.extend, r = a.merge, v = a.pick; a = a.wrap; q(e.prototype,
        {
            renderMapNavigation: function () {
                var a = this, k = this.options.mapNavigation, b = k.buttons, c, g, d, f, e, n = function (b) { this.handler.call(a, b); h(b) }; if (v(k.enableButtons, k.enabled) && !a.renderer.forExport) for (c in a.mapNavButtons = [], b) b.hasOwnProperty(c) && (d = r(k.buttonOptions, b[c]), g = d.theme, g.style = r(d.theme.style, d.style), e = (f = g.states) && f.hover, f = f && f.select, g = a.renderer.button(d.text, 0, 0, n, g, e, f, 0, "zoomIn" === c ? "topbutton" : "bottombutton").addClass("highcharts-map-navigation").attr({
                    width: d.width, height: d.height,
                    title: a.options.lang[c], padding: d.padding, zIndex: 5
                }).add(), g.handler = d.onclick, g.align(q(d, { width: g.width, height: 2 * g.height }), null, d.alignTo), l(g.element, "dblclick", h), a.mapNavButtons.push(g))
            }, fitToBox: function (a, k) { d([["x", "width"], ["y", "height"]], function (b) { var c = b[0]; b = b[1]; a[c] + a[b] > k[c] + k[b] && (a[b] > k[b] ? (a[b] = k[b], a[c] = k[c]) : a[c] = k[c] + k[b] - a[b]); a[b] > k[b] && (a[b] = k[b]); a[c] < k[c] && (a[c] = k[c]) }); return a }, mapZoom: function (a, d, b, c, g) {
                var f = this.xAxis[0], p = f.max - f.min, e = v(d, f.min + p / 2), n = p * a, p = this.yAxis[0],
                m = p.max - p.min, E = v(b, p.min + m / 2), m = m * a, e = this.fitToBox({ x: e - n * (c ? (c - f.pos) / f.len : .5), y: E - m * (g ? (g - p.pos) / p.len : .5), width: n, height: m }, { x: f.dataMin, y: p.dataMin, width: f.dataMax - f.dataMin, height: p.dataMax - p.dataMin }), n = e.x <= f.dataMin && e.width >= f.dataMax - f.dataMin && e.y <= p.dataMin && e.height >= p.dataMax - p.dataMin; c && (f.fixTo = [c - f.pos, d]); g && (p.fixTo = [g - p.pos, b]); void 0 === a || n ? (f.setExtremes(void 0, void 0, !1), p.setExtremes(void 0, void 0, !1)) : (f.setExtremes(e.x, e.x + e.width, !1), p.setExtremes(e.y, e.y + e.height, !1));
                this.redraw()
            }
        }); a(e.prototype, "render", function (a) { var d = this, b = d.options.mapNavigation; d.renderMapNavigation(); a.call(d); (v(b.enableDoubleClickZoom, b.enabled) || b.enableDoubleClickZoomTo) && l(d.container, "dblclick", function (a) { d.pointer.onContainerDblClick(a) }); v(b.enableMouseWheelZoom, b.enabled) && l(d.container, void 0 === f.onmousewheel ? "DOMMouseScroll" : "mousewheel", function (a) { d.pointer.onContainerMouseWheel(a); h(a); return !1 }) })
    })(w); (function (a) {
        var h = a.extend, l = a.pick, e = a.Pointer; a = a.wrap; h(e.prototype,
        {
            onContainerDblClick: function (a) { var d = this.chart; a = this.normalize(a); d.options.mapNavigation.enableDoubleClickZoomTo ? d.pointer.inClass(a.target, "highcharts-tracker") && d.hoverPoint && d.hoverPoint.zoomTo() : d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop) && d.mapZoom(.5, d.xAxis[0].toValue(a.chartX), d.yAxis[0].toValue(a.chartY), a.chartX, a.chartY) }, onContainerMouseWheel: function (a) {
                var d = this.chart, e; a = this.normalize(a); e = a.detail || -(a.wheelDelta / 120); d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop) &&
                d.mapZoom(Math.pow(d.options.mapNavigation.mouseWheelSensitivity, e), d.xAxis[0].toValue(a.chartX), d.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
            }
        }); a(e.prototype, "zoomOption", function (a) { var d = this.chart.options.mapNavigation; a.apply(this, [].slice.call(arguments, 1)); l(d.enableTouchZoom, d.enabled) && (this.pinchX = this.pinchHor = this.pinchY = this.pinchVert = this.hasZoom = !0) }); a(e.prototype, "pinchTranslate", function (a, d, e, h, l, t, k) {
            a.call(this, d, e, h, l, t, k); "map" === this.chart.options.chart.type && this.hasZoom &&
            (a = h.scaleX > h.scaleY, this.pinchTranslateDirection(!a, d, e, h, l, t, k, a ? h.scaleX : h.scaleY))
        })
    })(w); (function (a) {
        var h = a.color, l = a.ColorAxis, e = a.colorPointMixin, f = a.each, d = a.extend, q = a.isNumber, r = a.map, v = a.merge, t = a.noop, k = a.pick, b = a.isArray, c = a.Point, g = a.Series, u = a.seriesType, p = a.seriesTypes, z = a.splat, n = void 0 !== a.doc.documentElement.style.vectorEffect; u("map", "scatter", {
            allAreas: !0, animation: !1, nullColor: "#f7f7f7", borderColor: "#cccccc", borderWidth: 1, marker: null, stickyTracking: !1, joinBy: "hc-key", dataLabels: {
                formatter: function () { return this.point.value },
                inside: !0, verticalAlign: "middle", crop: !1, overflow: !1, padding: 0
            }, turboThreshold: 0, tooltip: { followPointer: !0, pointFormat: "{point.name}: {point.value}<br/>" }, states: { normal: { animation: !0 }, hover: { brightness: .2, halo: null }, select: { color: "#cccccc" } }
        }, v(a.colorSeriesMixin, {
            type: "map", supportsDrilldown: !0, getExtremesFromAll: !0, useMapGeometry: !0, forceDL: !0, searchPoint: t, directTouch: !0, preserveAspectRatio: !0, pointArrayMap: ["value"], getBox: function (b) {
                var c = Number.MAX_VALUE, d = -c, g = c, e = -c, n = c, p = c, h = this.xAxis,
                u = this.yAxis, l; f(b || [], function (b) {
                    if (b.path) {
                        "string" === typeof b.path && (b.path = a.splitPath(b.path)); var m = b.path || [], f = m.length, h = !1, u = -c, A = c, t = -c, r = c, z = b.properties; if (!b._foundBox) { for (; f--;) q(m[f]) && (h ? (u = Math.max(u, m[f]), A = Math.min(A, m[f])) : (t = Math.max(t, m[f]), r = Math.min(r, m[f])), h = !h); b._midX = A + (u - A) * (b.middleX || z && z["hc-middle-x"] || .5); b._midY = r + (t - r) * (b.middleY || z && z["hc-middle-y"] || .5); b._maxX = u; b._minX = A; b._maxY = t; b._minY = r; b.labelrank = k(b.labelrank, (u - A) * (t - r)); b._foundBox = !0 } d = Math.max(d,
                        b._maxX); g = Math.min(g, b._minX); e = Math.max(e, b._maxY); n = Math.min(n, b._minY); p = Math.min(b._maxX - b._minX, b._maxY - b._minY, p); l = !0
                    }
                }); l && (this.minY = Math.min(n, k(this.minY, c)), this.maxY = Math.max(e, k(this.maxY, -c)), this.minX = Math.min(g, k(this.minX, c)), this.maxX = Math.max(d, k(this.maxX, -c)), h && void 0 === h.options.minRange && (h.minRange = Math.min(5 * p, (this.maxX - this.minX) / 5, h.minRange || c)), u && void 0 === u.options.minRange && (u.minRange = Math.min(5 * p, (this.maxY - this.minY) / 5, u.minRange || c)))
            }, getExtremes: function () {
                g.prototype.getExtremes.call(this,
                this.valueData); this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data); this.valueMin = this.dataMin; this.valueMax = this.dataMax; this.dataMin = this.minY; this.dataMax = this.maxY
            }, translatePath: function (a) { var b = !1, c = this.xAxis, d = this.yAxis, g = c.min, k = c.transA, c = c.minPixelPadding, e = d.min, n = d.transA, d = d.minPixelPadding, f, p = []; if (a) for (f = a.length; f--;) q(a[f]) ? (p[f] = b ? (a[f] - g) * k + c : (a[f] - e) * n + d, b = !b) : p[f] = a[f]; return p }, setData: function (c, d, k, e) {
                var n = this.options, p = this.chart.options.chart,
                h = p && p.map, u = n.mapData, l = n.joinBy, t = null === l, w = n.keys || this.pointArrayMap, B = [], C = {}, y, D = this.chart.mapTransforms; !u && h && (u = "string" === typeof h ? a.maps[h] : h); t && (l = "_i"); l = this.joinBy = z(l); l[1] || (l[1] = l[0]); c && f(c, function (a, d) { var g = 0; if (q(a)) c[d] = { value: a }; else if (b(a)) { c[d] = {}; !n.keys && a.length > w.length && "string" === typeof a[0] && (c[d]["hc-key"] = a[0], ++g); for (var k = 0; k < w.length; ++k, ++g) w[k] && (c[d][w[k]] = a[g]) } t && (c[d]._i = d) }); this.getBox(c); if (this.chart.mapTransforms = D = p && p.mapTransforms || u && u["hc-transform"] ||
                D) for (y in D) D.hasOwnProperty(y) && y.rotation && (y.cosAngle = Math.cos(y.rotation), y.sinAngle = Math.sin(y.rotation)); if (u) {
                    "FeatureCollection" === u.type && (this.mapTitle = u.title, u = a.geojson(u, this.type, this)); this.mapData = u; this.mapMap = {}; for (y = 0; y < u.length; y++) p = u[y], h = p.properties, p._i = y, l[0] && h && h[l[0]] && (p[l[0]] = h[l[0]]), C[p[l[0]]] = p; this.mapMap = C; c && l[1] && f(c, function (a) { C[a[l[1]]] && B.push(C[a[l[1]]]) }); n.allAreas ? (this.getBox(u), c = c || [], l[1] && f(c, function (a) { B.push(a[l[1]]) }), B = "|" + r(B, function (a) {
                        return a &&
                        a[l[0]]
                    }).join("|") + "|", f(u, function (a) { l[0] && -1 !== B.indexOf("|" + a[l[0]] + "|") || (c.push(v(a, { value: null })), e = !1) })) : this.getBox(B)
                } g.prototype.setData.call(this, c, d, k, e)
            }, drawGraph: t, drawDataLabels: t, doFullTranslate: function () { return this.isDirtyData || this.chart.isResizing || this.chart.renderer.isVML || !this.baseTrans }, translate: function () {
                var a = this, b = a.xAxis, c = a.yAxis, d = a.doFullTranslate(); a.generatePoints(); f(a.data, function (g) {
                    g.plotX = b.toPixels(g._midX, !0); g.plotY = c.toPixels(g._midY, !0); d && (g.shapeType =
                    "path", g.shapeArgs = { d: a.translatePath(g.path) })
                }); a.translateColors()
            }, pointAttribs: function (a, b) { var c = p.column.prototype.pointAttribs.call(this, a, b); a.isFading && delete c.fill; n ? c["vector-effect"] = "non-scaling-stroke" : c["stroke-width"] = "inherit"; return c }, drawPoints: function () {
                var a = this, b = a.xAxis, c = a.yAxis, d = a.group, g = a.chart, k = g.renderer, e, u = this.baseTrans; a.transformGroup || (a.transformGroup = k.g().attr({ scaleX: 1, scaleY: 1 }).add(d), a.transformGroup.survive = !0); a.doFullTranslate() ? (g.hasRendered &&
                f(a.points, function (b) { b.shapeArgs && (b.shapeArgs.fill = a.pointAttribs(b, b.state).fill) }), a.group = a.transformGroup, p.column.prototype.drawPoints.apply(a), a.group = d, f(a.points, function (a) { a.graphic && (a.name && a.graphic.addClass("highcharts-name-" + a.name.replace(" ", "-").toLowerCase()), a.properties && a.properties["hc-key"] && a.graphic.addClass("highcharts-key-" + a.properties["hc-key"].toLowerCase())) }), this.baseTrans = {
                    originX: b.min - b.minPixelPadding / b.transA, originY: c.min - c.minPixelPadding / c.transA + (c.reversed ?
                    0 : c.len / c.transA), transAX: b.transA, transAY: c.transA
                }, this.transformGroup.animate({ translateX: 0, translateY: 0, scaleX: 1, scaleY: 1 })) : (e = b.transA / u.transAX, d = c.transA / u.transAY, b = b.toPixels(u.originX, !0), c = c.toPixels(u.originY, !0), .99 < e && 1.01 > e && .99 < d && 1.01 > d && (d = e = 1, b = Math.round(b), c = Math.round(c)), this.transformGroup.animate({ translateX: b, translateY: c, scaleX: e, scaleY: d })); n || a.group.element.setAttribute("stroke-width", a.options[a.pointAttrToOptions && a.pointAttrToOptions["stroke-width"] || "borderWidth"] /
                (e || 1)); this.drawMapDataLabels()
            }, drawMapDataLabels: function () { g.prototype.drawDataLabels.call(this); this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect) }, render: function () { var a = this, b = g.prototype.render; a.chart.renderer.isVML && 3E3 < a.data.length ? setTimeout(function () { b.call(a) }) : b.call(a) }, animate: function (a) {
                var b = this.options.animation, c = this.group, d = this.xAxis, g = this.yAxis, k = d.pos, e = g.pos; this.chart.renderer.isSVG && (!0 === b && (b = { duration: 1E3 }), a ? c.attr({
                    translateX: k + d.len / 2, translateY: e +
                    g.len / 2, scaleX: .001, scaleY: .001
                }) : (c.animate({ translateX: k, translateY: e, scaleX: 1, scaleY: 1 }, b), this.animate = null))
            }, animateDrilldown: function (a) {
                var b = this.chart.plotBox, c = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1], d = c.bBox, g = this.chart.options.drilldown.animation; a || (a = Math.min(d.width / b.width, d.height / b.height), c.shapeArgs = { scaleX: a, scaleY: a, translateX: d.x, translateY: d.y }, f(this.points, function (a) {
                    a.graphic && a.graphic.attr(c.shapeArgs).animate({
                        scaleX: 1, scaleY: 1, translateX: 0,
                        translateY: 0
                    }, g)
                }), this.animate = null)
            }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, animateDrillupFrom: function (a) { p.column.prototype.animateDrillupFrom.call(this, a) }, animateDrillupTo: function (a) { p.column.prototype.animateDrillupTo.call(this, a) }
        }), d({
            applyOptions: function (a, b) { var g = c.prototype.applyOptions.call(this, a, b), k = this.series, e = k.joinBy; k.mapData && ((e = void 0 !== g[e[1]] && k.mapMap[g[e[1]]]) ? (k.xyFromShape && (g.x = e._midX, g.y = e._midY), d(g, e)) : g.value = g.value || null); return g }, onMouseOver: function (a) {
                clearTimeout(this.colorInterval);
                if (null !== this.value) c.prototype.onMouseOver.call(this, a); else this.series.onMouseOut(a)
            }, onMouseOut: function () {
                var a = this, b = +new Date, d = h(this.series.pointAttribs(a).fill), g = h(this.series.pointAttribs(a, "hover").fill), k = a.series.options.states.normal.animation, e = k && (k.duration || 500); e && 4 === d.rgba.length && 4 === g.rgba.length && "select" !== a.state && (clearTimeout(a.colorInterval), a.colorInterval = setInterval(function () {
                    var c = (new Date - b) / e, k = a.graphic; 1 < c && (c = 1); k && k.attr("fill", l.prototype.tweenColors.call(0,
                    g, d, c)); 1 <= c && clearTimeout(a.colorInterval)
                }, 13)); a.isFading = !0; c.prototype.onMouseOut.call(a); a.isFading = null
            }, zoomTo: function () { var a = this.series; a.xAxis.setExtremes(this._minX, this._maxX, !1); a.yAxis.setExtremes(this._minY, this._maxY, !1); a.chart.redraw() }
        }, e))
    })(w); (function (a) {
        var h = a.seriesType, l = a.seriesTypes; h("mapline", "map", { lineWidth: 1, fillColor: "none" }, {
            type: "mapline", colorProp: "stroke", pointAttrToOptions: { stroke: "color", "stroke-width": "lineWidth" }, pointAttribs: function (a, f) {
                var d = l.map.prototype.pointAttribs.call(this,
                a, f); d.fill = this.options.fillColor; return d
            }, drawLegendSymbol: l.line.prototype.drawLegendSymbol
        })
    })(w); (function (a) { var h = a.merge, l = a.Point; a = a.seriesType; a("mappoint", "scatter", { dataLabels: { enabled: !0, formatter: function () { return this.point.name }, crop: !1, defer: !1, overflow: !1, style: { color: "#000000" } } }, { type: "mappoint", forceDL: !0 }, { applyOptions: function (a, f) { var d = void 0 !== a.lat && void 0 !== a.lon ? h(a, this.series.chart.fromLatLonToPoint(a)) : a; return l.prototype.applyOptions.call(this, d, f) } }) })(w); (function (a) {
        var h =
        a.extend, l = a.Point, e = a.seriesType, f = a.seriesTypes; f.bubble && e("mapbubble", "bubble", { animationLimit: 500, tooltip: { pointFormat: "{point.name}: {point.z}" } }, { xyFromShape: !0, type: "mapbubble", pointArrayMap: ["z"], getMapData: f.map.prototype.getMapData, getBox: f.map.prototype.getBox, setData: f.map.prototype.setData }, {
            applyOptions: function (a, e) {
                var r; a && void 0 !== a.lat && void 0 !== a.lon ? (r = l.prototype.applyOptions.call(this, a, e), r = h(r, this.series.chart.fromLatLonToPoint(r))) : r = f.map.prototype.pointClass.prototype.applyOptions.call(this,
                a, e); return r
            }, ttBelow: !1
        })
    })(w); (function (a) {
        var h = a.colorPointMixin, l = a.each, e = a.merge, f = a.noop, d = a.pick, q = a.Series, r = a.seriesType, v = a.seriesTypes; r("heatmap", "scatter", { animation: !1, borderWidth: 0, nullColor: "#f7f7f7", dataLabels: { formatter: function () { return this.point.value }, inside: !0, verticalAlign: "middle", crop: !1, overflow: !1, padding: 0 }, marker: null, pointRange: null, tooltip: { pointFormat: "{point.x}, {point.y}: {point.value}<br/>" }, states: { normal: { animation: !0 }, hover: { halo: !1, brightness: .2 } } }, e(a.colorSeriesMixin,
        {
            pointArrayMap: ["y", "value"], hasPointSpecificOptions: !0, supportsDrilldown: !0, getExtremesFromAll: !0, directTouch: !0, init: function () { var a; v.scatter.prototype.init.apply(this, arguments); a = this.options; a.pointRange = d(a.pointRange, a.colsize || 1); this.yAxis.axisPointRange = a.rowsize || 1 }, translate: function () {
                var a = this.options, d = this.xAxis, b = this.yAxis, c = function (a, b, c) { return Math.min(Math.max(b, a), c) }; this.generatePoints(); l(this.points, function (g) {
                    var e = (a.colsize || 1) / 2, f = (a.rowsize || 1) / 2, h = c(Math.round(d.len -
                    d.translate(g.x - e, 0, 1, 0, 1)), -d.len, 2 * d.len), e = c(Math.round(d.len - d.translate(g.x + e, 0, 1, 0, 1)), -d.len, 2 * d.len), n = c(Math.round(b.translate(g.y - f, 0, 1, 0, 1)), -b.len, 2 * b.len), f = c(Math.round(b.translate(g.y + f, 0, 1, 0, 1)), -b.len, 2 * b.len); g.plotX = g.clientX = (h + e) / 2; g.plotY = (n + f) / 2; g.shapeType = "rect"; g.shapeArgs = { x: Math.min(h, e), y: Math.min(n, f), width: Math.abs(e - h), height: Math.abs(f - n) }
                }); this.translateColors()
            }, drawPoints: function () {
                v.column.prototype.drawPoints.call(this); l(this.points, function (a) {
                    a.graphic.attr(this.colorAttribs(a,
                    a.state))
                }, this)
            }, animate: f, getBox: f, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, alignDataLabel: v.column.prototype.alignDataLabel, getExtremes: function () { q.prototype.getExtremes.call(this, this.valueData); this.valueMin = this.dataMin; this.valueMax = this.dataMax; q.prototype.getExtremes.call(this) }
        }), h)
    })(w); (function (a) {
        function h(a, b) {
            var c, d, e, f, h = !1, n = a.x, m = a.y; c = 0; for (d = b.length - 1; c < b.length; d = c++) e = b[c][1] > m, f = b[d][1] > m, e !== f && n < (b[d][0] - b[c][0]) * (m - b[c][1]) / (b[d][1] - b[c][1]) + b[c][0] && (h = !h);
            return h
        } var l = a.Chart, e = a.each, f = a.extend, d = a.error, q = a.format, r = a.merge, v = a.win, t = a.wrap; l.prototype.transformFromLatLon = function (a, b) {
            if (void 0 === v.proj4) return d(21), { x: 0, y: null }; var c = v.proj4(b.crs, [a.lon, a.lat]), g = b.cosAngle || b.rotation && Math.cos(b.rotation), e = b.sinAngle || b.rotation && Math.sin(b.rotation), c = b.rotation ? [c[0] * g + c[1] * e, -c[0] * e + c[1] * g] : c; return {
                x: ((c[0] - (b.xoffset || 0)) * (b.scale || 1) + (b.xpan || 0)) * (b.jsonres || 1) + (b.jsonmarginX || 0), y: (((b.yoffset || 0) - c[1]) * (b.scale || 1) + (b.ypan || 0)) *
                (b.jsonres || 1) - (b.jsonmarginY || 0)
            }
        }; l.prototype.transformToLatLon = function (a, b) { if (void 0 === v.proj4) d(21); else { var c = { x: ((a.x - (b.jsonmarginX || 0)) / (b.jsonres || 1) - (b.xpan || 0)) / (b.scale || 1) + (b.xoffset || 0), y: ((-a.y - (b.jsonmarginY || 0)) / (b.jsonres || 1) + (b.ypan || 0)) / (b.scale || 1) + (b.yoffset || 0) }, g = b.cosAngle || b.rotation && Math.cos(b.rotation), e = b.sinAngle || b.rotation && Math.sin(b.rotation), c = v.proj4(b.crs, "WGS84", b.rotation ? { x: c.x * g + c.y * -e, y: c.x * e + c.y * g } : c); return { lat: c.y, lon: c.x } } }; l.prototype.fromPointToLatLon =
        function (a) { var b = this.mapTransforms, c; if (b) { for (c in b) if (b.hasOwnProperty(c) && b[c].hitZone && h({ x: a.x, y: -a.y }, b[c].hitZone.coordinates[0])) return this.transformToLatLon(a, b[c]); return this.transformToLatLon(a, b["default"]) } d(22) }; l.prototype.fromLatLonToPoint = function (a) {
            var b = this.mapTransforms, c, g; if (!b) return d(22), { x: 0, y: null }; for (c in b) if (b.hasOwnProperty(c) && b[c].hitZone && (g = this.transformFromLatLon(a, b[c]), h({ x: g.x, y: -g.y }, b[c].hitZone.coordinates[0]))) return g; return this.transformFromLatLon(a,
            b["default"])
        }; a.geojson = function (a, b, c) {
            var d = [], h = [], p = function (a) { var b, c = a.length; h.push("M"); for (b = 0; b < c; b++) 1 === b && h.push("L"), h.push(a[b][0], -a[b][1]) }; b = b || "map"; e(a.features, function (a) {
                var c = a.geometry, k = c.type, c = c.coordinates; a = a.properties; var l; h = []; "map" === b || "mapbubble" === b ? ("Polygon" === k ? (e(c, p), h.push("Z")) : "MultiPolygon" === k && (e(c, function (a) { e(a, p) }), h.push("Z")), h.length && (l = { path: h })) : "mapline" === b ? ("LineString" === k ? p(c) : "MultiLineString" === k && e(c, p), h.length && (l = { path: h })) : "mappoint" ===
                b && "Point" === k && (l = { x: c[0], y: -c[1] }); l && d.push(f(l, { name: a.name || a.NAME, properties: a }))
            }); c && a.copyrightShort && (c.chart.mapCredits = q(c.chart.options.credits.mapText, { geojson: a }), c.chart.mapCreditsFull = q(c.chart.options.credits.mapTextFull, { geojson: a })); return d
        }; t(l.prototype, "addCredits", function (a, b) { b = r(!0, this.options.credits, b); this.mapCredits && (b.href = null); a.call(this, b); this.credits && this.mapCreditsFull && this.credits.attr({ title: this.mapCreditsFull }) })
    })(w); (function (a) {
        function h(a, c, d, e,
        f, h, k, l) { return ["M", a + f, c, "L", a + d - h, c, "C", a + d - h / 2, c, a + d, c + h / 2, a + d, c + h, "L", a + d, c + e - k, "C", a + d, c + e - k / 2, a + d - k / 2, c + e, a + d - k, c + e, "L", a + l, c + e, "C", a + l / 2, c + e, a, c + e - l / 2, a, c + e - l, "L", a, c + f, "C", a, c + f / 2, a + f / 2, c, a + f, c, "Z"] } var l = a.Chart, e = a.defaultOptions, f = a.each, d = a.extend, q = a.merge, r = a.pick, v = a.Renderer, t = a.SVGRenderer, k = a.VMLRenderer; d(e.lang, { zoomIn: "Zoom in", zoomOut: "Zoom out" }); e.mapNavigation = {
            buttonOptions: {
                alignTo: "plotBox", align: "left", verticalAlign: "top", x: 0, width: 18, height: 18, padding: 5, style: {
                    fontSize: "15px",
                    fontWeight: "bold"
                }, theme: { "stroke-width": 1, "text-align": "center" }
            }, buttons: { zoomIn: { onclick: function () { this.mapZoom(.5) }, text: "+", y: 0 }, zoomOut: { onclick: function () { this.mapZoom(2) }, text: "-", y: 28 } }, mouseWheelSensitivity: 1.1
        }; a.splitPath = function (a) { var c; a = a.replace(/([A-Za-z])/g, " $1 "); a = a.replace(/^\s*/, "").replace(/\s*$/, ""); a = a.split(/[ ,]+/); for (c = 0; c < a.length; c++) /[a-zA-Z]/.test(a[c]) || (a[c] = parseFloat(a[c])); return a }; a.maps = {}; t.prototype.symbols.topbutton = function (a, c, d, e, f) {
            return h(a - 1,
            c - 1, d, e, f.r, f.r, 0, 0)
        }; t.prototype.symbols.bottombutton = function (a, c, d, e, f) { return h(a - 1, c - 1, d, e, 0, 0, f.r, f.r) }; v === k && f(["topbutton", "bottombutton"], function (a) { k.prototype.symbols[a] = t.prototype.symbols[a] }); a.Map = a.mapChart = function (b, c, d) {
            var e = "string" === typeof b || b.nodeName, f = arguments[e ? 1 : 0], h = { endOnTick: !1, visible: !1, minPadding: 0, maxPadding: 0, startOnTick: !1 }, k, m = a.getOptions().credits; k = f.series; f.series = null; f = q({
                chart: { panning: "xy", type: "map" }, credits: {
                    mapText: r(m.mapText, ' \u00a9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>'),
                    mapTextFull: r(m.mapTextFull, "{geojson.copyright}")
                }, xAxis: h, yAxis: q(h, { reversed: !0 })
            }, f, { chart: { inverted: !1, alignTicks: !1 } }); f.series = k; return e ? new l(b, f, d) : new l(f, c)
        }
    })(w)
});
