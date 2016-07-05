var config = {
    wrapper: $('#wrapper')[0],
    item: $('.item'),
    loading: $('#loading')[0],
    lastItem: $('#lastItem')[0],
    touchScroll: undefined,
    isRunning: true,
    loadImgIndex: 0,
    path: '',
    delay: 'dly',
    loads: []
};
var APP = {
    init: function() {
        this.setClassAttr();
        this.loadImg(config.loads, function() {
            config.loading.classList.add('loading-hide');
            var items = $('#wrapper .item'),
                item, cls, oimg;

            function _init(i) {
                oimg = items.eq(i).find('img');
                oimg.each(function(k, v) {
                    if ($(v).attr("cls")) {
                        $(v).addClass($(v).attr("cls")).addClass("delay" + (k + 1)).css("visibility", "visible");
                    }
                });
            };

            function _remove(index) {
                $(".item").eq(index).find("img").each(function(m, n) {
                    if (!$(n).hasClass("background")) {
                        $(n).attr("class", "normal").css("visibility", "visible");
                    }
                });
            };
            setTimeout(function() {
                config.loading.parentNode.removeChild(config.loading);
                _init(0);
                config.touchScroll = new touchScroll('#wrapper', {
                    start: function(event) {

                    },
                    end: function(event) {
                        _remove(event.preCurrent);
                        _init(event.current);
                    }
                });

            }, 200);
        })

        this.bindEvent();

    },
    setClassAttr: function() {

    },
    bindEvent: function() {

    },
    loadImg: function(arr, cbk) {
        var len = arr.length,
            cbk = cbk || function() {};
        if (!len) {
            cbk();
            return;
        };
        var imgFunc;
        (function() {
            var img = new Image();
            imgFunc = arguments;
            img.onload = function() {
                if (config.loadImgIndex == len - 1) {
                    cbk();
                } else {
                    config.loadImgIndex++;
                    $("#loadingNum").html(Math.floor(config.loadImgIndex / len * 100) + "%");
                    imgFunc.callee();
                }
            }
            img.src = config.path + arr[config.loadImgIndex];
            img.onerror = function() {
                setTimeout(cbk, 1000);
            }

        })();
    }
}
APP.init();
// objectUtil.js
var ObjectUtil = function() {};
ObjectUtil.prototype.createEmptyObject = function(classFunction) {
    var emptyObject = {},
        emptyFunction = function() {};
    if ("function" == typeof classFunction)
        for (var key in classFunction.prototype) "function" == typeof classFunction.prototype[key] && (emptyObject[key] = emptyFunction);
    return emptyObject
};
var objectUtil = new ObjectUtil;
/*coffee*/
(function($) {
    $.fn.coffee = function(option) {
        function steam() {
            var fontSize = rand(8, opts.steamMaxSize),
                steamsFontFamily = randoms(1, opts.steamsFontFamily),
                color = "#" + randoms(6, "0123456789ABCDEF"),
                position = rand(0, 44),
                rotate = rand(-90, 89),
                scale = rand02(.4, 1),
                transform = $.fx.cssPrefix + "transform";
            transform = transform + ":rotate(" + rotate + "deg) scale(" + scale + ");";
            var $fly = $('<span class="coffee-steam">' + randoms(1, opts.steams) + "</span>"),
                left = rand(0, coffeeSteamBoxWidth - opts.steamWidth - fontSize);
            left > position && (left = rand(0, position)), $fly.css({
                position: "absolute",
                left: position,
                top: opts.steamHeight,
                "font-size:": fontSize + "px",
                color: color,
                "font-family": steamsFontFamily,
                display: "block",
                opacity: 1
            }).attr("style", $fly.attr("style") + transform).appendTo($coffeeSteamBox).animate({
                top: rand(opts.steamHeight / 2, 0),
                left: left,
                opacity: 0
            }, rand(opts.steamFlyTime / 2, 1.2 * opts.steamFlyTime), __flyFastSlow, function() {
                $fly.remove(), $fly = null
            })
        }

        function wind() {
            var left = rand(-10, 10);
            left += parseInt($coffeeSteamBox.css("left")), left >= 54 ? left = 54 : 34 >= left && (left = 34), $coffeeSteamBox.animate({
                left: left
            }, rand(1e3, 3e3), __flyFastSlow)
        }

        function randoms(length, chars) {
            length = length || 1;
            var hash = "",
                maxNum = chars.length - 1,
                num = 0;
            for (i = 0; length > i; i++) num = rand(0, maxNum - 1), hash += chars.slice(num, num + 1);
            return hash
        }

        function rand(mi, ma) {
            var range = ma - mi,
                out = mi + Math.round(Math.random() * range);
            return parseInt(out)
        }

        function rand02(mi, ma) {
            var range = ma - mi,
                out = mi + Math.random() * range;
            return parseFloat(out)
        }
        var __time_val = null,
            __time_wind = null,
            __flyFastSlow = "cubic-bezier(.09,.64,.16,.94)",
            $coffee = $(this),
            opts = $.extend({}, $.fn.coffee.defaults, option),
            coffeeSteamBoxWidth = opts.steamWidth,
            $coffeeSteamBox = $('<div class="coffee-steam-box"></div>').css({
                height: opts.steamHeight,
                width: opts.steamWidth,
                left: 60,
                top: -50,
                position: "absolute",
                overflow: "hidden",
                "z-index": 0
            }).appendTo($coffee);
        return $.fn.coffee.stop = function() {
            clearInterval(__time_val), clearInterval(__time_wind)
        }, $.fn.coffee.start = function() {
            __time_val = setInterval(function() {
                steam()
            }, rand(opts.steamInterval / 2, 2 * opts.steamInterval)), __time_wind = setInterval(function() {
                wind()
            }, rand(100, 1e3) + rand(1e3, 3e3))
        }, $coffee
    }, $.fn.coffee.defaults = {
        steams: new Array(100),
        steamsFontFamily: ["Verdana", "Geneva", "Comic Sans MS", "MS Serif", "Lucida Sans Unicode", "Times New Roman", "Trebuchet MS", "Arial", "Courier New", "Georgia"],
        steamFlyTime: 5e3,
        steamInterval: 500,
        steamMaxSize: 30,
        steamHeight: 200,
        steamWidth: 300
    };
})(Zepto);

/*music*/
var GlobalAudio = function($item) {
    this._$globalAudio = $item;
    this._$tip = $("<span></span>");
    this.audio = this._$globalAudio.find("audio")[0];
    if(!this.audio) return;
    this.isAllowManually = !1;
    this.playState = "ready";
    var theClass = this;
    this._$globalAudio.append(this._$tip);
    this._$globalAudio.coffee({
        steams: ['<img src="images/musicalNotes.png"/>', '<img src="images/musicalNotes.png"/>', '<img src="images/musicalNotes.png"/>', '<img src="images/musicalNotes.png"/>', '<img src="images/musicalNotes.png"/>', '<img src="images/musicalNotes.png"/>'],
        steamHeight: 100,
        steamWidth: 50
    });
    this.audio.autoplay && (this.audio.pause(), $(window).on("load", function() {
        theClass.play()
    }));
    $(window).on("load", function() {
        theClass.isAllowManually = !0
    });
    this._$globalAudio.on($.isPC ? "click" : "tap", function(e) {
        e.preventDefault(), theClass.isAllowManually && (theClass._$globalAudio.is(".z-play") ? theClass.pause() : theClass.play())
    });
    $(document).one("touchstart", function() {
        theClass.audio.play()
    })
};
GlobalAudio.prototype.play = function() {
    this._$globalAudio.is(".z-play") || (this.audio.play(), this._$globalAudio.removeClass("z-pause").addClass("z-play"), this._showTip("开启"), this.playState = "playing", $.fn.coffee.start())
};
GlobalAudio.prototype.pause = function() {
    this._$globalAudio.is(".z-pause") || (this.audio.pause(), this._$globalAudio.removeClass("z-play").addClass("z-pause"), this._showTip("关闭"), this.playState = "pause", $.fn.coffee.stop())
};
GlobalAudio.prototype._showTip = function(msg) {
    var theClass = this;
    this._$tip.text(msg), this._$tip.addClass("z-show"), setTimeout(function() {
        theClass._$tip.removeClass("z-show")
    }, 1e3)
};
if (PSDJSON) {
    var globalAudio = new GlobalAudio($(".u-globalAudio"));
} else {
    $(".u-globalAudio").remove();
}