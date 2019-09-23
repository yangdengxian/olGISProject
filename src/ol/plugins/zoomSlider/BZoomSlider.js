/**
 * zoomSlider插件
 * @autho ydx
 * @date 2019-04-02
 */
import Control from 'ol/control/Control';
import { linear as Linear, easeOut as EaseOut } from 'ol/easing';
import { rotate as Rotate } from 'ol/coordinate';

const BASE_CLASS_NAME = {
    CLASS_HIDDEN: 'hmap-hidden',
    CLASS_SELECTABLE: 'hmap-selectable',
    CLASS_UNSELECTABLE: 'hmap-unselectable',
    CLASS_CONTROL: 'hmap-control',
};

const Direction_ = {
    VERTICAL: 0,
    HORIZONTAL: 1,
};


export default class BZoomSlider {
    constructor(params) {
        this.options = params || {};

        this.currentResolution_ = undefined;

        this.direction_ = Direction_.VERTICAL;

        this.dragging_ = false;

        this.heightLimit_ = 0;

        this.widthLimit_ = 0;

        this.previousX_ = null;

        this.previousY_ = null;

        this.thumbSize_ = null;

        this.sliderInitialized_ = false;

        this.duration_ = this.options['duration'] !== undefined ? this.options['duration'] : 200;

        this.displayObject = this.options['displayObject'];

        this.viewHint = {
            ANIMATING: 0,
            INTERACTING: 1,
        };

        this.pixelDelta_ = this.options['pixelDelta'] !== undefined ? this.options['pixelDelta'] : 128;

        var className = this.options.className !== undefined ? this.options.className : 'hmap-zoom-slider';

        this.element = this.createElement('div', className + ' ' + BASE_CLASS_NAME.CLASS_UNSELECTABLE);

        var translateContent = this.createElement(
            'div',
            'hmap-zoom-slider-translate-content' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE,
            this.element
        );

        var silderContent = this.createElement(
            'div',
            'hmap-zoom-slider-content' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE,
            this.element
        );

        var translateN = this.createElement(
            'div',
            'hmap-zoom-slider-button hmap-zoom-slider-translate-n' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE,
            translateContent
        );
        translateN.setAttribute('title', this.displayObject["moveUp"]);
        this.listen(translateN, 'click', this.handletranslateClick_.bind(this, 'translateN'));
        var translateS = this.createElement(
            'div',
            'hmap-zoom-slider-button hmap-zoom-slider-translate-s' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE,
            translateContent
        );
        translateS.setAttribute('title', this.displayObject["moveDown"]);
        this.listen(translateS, 'click', this.handletranslateClick_.bind(this, 'translateS'));
        var translateW = this.createElement(
            'div',
            'hmap-zoom-slider-button hmap-zoom-slider-translate-w' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE,
            translateContent
        );
        translateW.setAttribute('title', this.displayObject["moveLeft"]);
        this.listen(translateW, 'click', this.handletranslateClick_.bind(this, 'translateW'));
        var translateE = this.createElement(
            'div',
            'hmap-zoom-slider-button hmap-zoom-slider-translate-e' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE,
            translateContent
        );
        translateE.setAttribute('title', this.displayObject["moveRight"]);
        this.listen(translateE, 'click', this.handletranslateClick_.bind(this, 'translateE'));
        var zoomIn = this.createElement(
            'div',
            'hmap-zoom-slider-zoom-in' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE,
            silderContent
        );
        zoomIn.setAttribute('title', this.displayObject["zoomIn"]);
        this.listen(zoomIn, 'click', this.handleZoomClick_.bind(this, 1));

        var zoomOut = this.createElement(
            'div',
            'hmap-zoom-slider-zoom-out' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE,
            silderContent
        );
        zoomOut.setAttribute('title', this.displayObject["zoomOut"]);
        this.listen(zoomOut, 'click', this.handleZoomClick_.bind(this, -1));

        var slider = this.createElement(
            'div',
            'hmap-zoom-slider-zoom-slider' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE,
            silderContent
        );
        this.sliderBackgroundTop = this.createElement(
            'div',
            'slider-background-top' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE,
            slider
        );
        this.sliderBackgroundBottom = this.createElement(
            'div',
            'slider-background-bottom' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE,
            slider
        );
        var sliderBackgroundMask = this.createElement(
            'div',
            'slider-background-mask' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE,
            slider
        );
        sliderBackgroundMask.setAttribute('title', this.displayObject["zoomTo"]);
        this.sliderBar = this.createElement('div', 'slider-bar' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE, slider);
        this.sliderBar.setAttribute('title', this.displayObject["zoomWheel"]);

        this.silderContent = silderContent;

        this.listen(this.silderContent, 'pointerdown', this.handleDraggerStart_, this);
        this.listen(this.silderContent, 'pointermove', this.handleDraggerDrag_, this);
        this.listen(this.silderContent, 'pointerup', this.handleDraggerEnd_, this);
        this.listen(this.silderContent, 'click', this.handleContainerClick_, this);
        this.listen(this.sliderBar, 'click', function(event) {
            event.stopPropagation();
        });
        var render = this.options['render'] ? this.options['render'] : this.render;
        Control.call(this, {
            element: this.element,
            render: render,
            target: this.options['target'],
        });
    }



    handleZoomClick_(delta, event) {
        event.preventDefault();
        this.zoomByDelta_(delta);
    }

    handletranslateClick_(type, event) {
        event.preventDefault();
        var view = this.getMap().getView();
        var mapUnitsDelta = view.getResolution() * this.pixelDelta_;
        var deltaX = 0,
            deltaY = 0;

        switch (type) {
            case 'translateN':
                deltaY = mapUnitsDelta;
                break;
            case 'translateS':
                deltaY = -mapUnitsDelta;
                break;
            case 'translateW':
                deltaX = -mapUnitsDelta;
                break;
            case 'translateE':
                deltaX = mapUnitsDelta;
                break;
        }
        var delta = [deltaX, deltaY];
        Rotate(delta, view.getRotation());
        this.pan(view, delta, this.duration_);
    }
    pan(view, delta, optDuration) {
        var currentCenter = view.getCenter();
        if (currentCenter) {
            var center = view.constrainCenter([currentCenter[0] + delta[0], currentCenter[1] + delta[1]]);
            if (optDuration) {
                view.animate({
                    duration: optDuration,
                    easing: Linear,
                    center: center,
                });
            } else {
                view.setCenter(center);
            }
        }
    }

    zoomByDelta_(delta) {
        var view = this.getMap().getView();
        if (view) {
            var currentResolution = view.getResolution();
            if (currentResolution) {
                var newResolution = view.constrainResolution(currentResolution, delta);
                if (this.duration_ > 0) {
                    if (view.getAnimating()) {
                        view.cancelAnimations();
                    }
                    view.animate({
                        resolution: newResolution,
                        duration: this.duration_,
                        easing: EaseOut,
                    });
                } else {
                    view.setResolution(newResolution);
                }
            }
        }
    }

    render(mapEvent) {
        if (!mapEvent.frameState) {
            return;
        }
        if (!this.sliderInitialized_) {
            this.initSlider_();
        }
        var res = mapEvent.frameState.viewState.resolution;
        if (res !== this.currentResolution_) {
            this.currentResolution_ = res;
            this.setThumbPosition_(res);
        }
    }

    setMap(map) {
        if (map) {
            Control.prototype.setMap.call(this, map);
            if (map) {
                map.render();
            }
        } else {
            throw Error('传入的不是地图对象！');
        }
    }

    getMap() {
        return this.map_;
    }

    disposeInternal() {
        listen(this.silderContent, 'pointercancel', function(event) {}, this);
        Control.prototype.disposeInternal.call(this);
    }

    initSlider_() {
        var container = this.silderContent;
        var containerSize = {
            width: container.offsetWidth,
            height: container.offsetHeight,
        };
        var thumb = this.getElement('.slider-bar', container)[0];
        var computedStyle = getComputedStyle(thumb);
        var thumbWidth =
            thumb.offsetWidth + parseFloat(computedStyle['marginRight']) + parseFloat(computedStyle['marginLeft']);
        var thumbHeight =
            thumb.offsetHeight + parseFloat(computedStyle['marginTop']) + parseFloat(computedStyle['marginBottom']);
        this.thumbSize_ = [thumbWidth, thumbHeight];
        if (containerSize.width > containerSize.height) {
            this.direction_ = Direction_.HORIZONTAL;
            this.widthLimit_ = containerSize.width - thumbWidth;
        } else {
            this.direction_ = Direction_.VERTICAL;
            this.heightLimit_ = containerSize.height - thumbHeight;
        }
        this.sliderInitialized_ = true;
    }

    handleContainerClick_(event) {
        var view = this.getMap().getView();
        var relativePosition = this.getRelativePosition_(
            event.offsetX - this.thumbSize_[0] / 2,
            event.offsetY - this.thumbSize_[1] / 2
        );
        var resolution = this.getResolutionForPosition_(relativePosition);
        view.animate({
            resolution: view.constrainResolution(resolution),
            duration: this.duration_,
            easing: EaseOut,
        });
    }

    handleDraggerStart_(event) {
        if (!this.dragging_ && event.target === this.getElement('.slider-bar', this.silderContent)) {
            this.previousX_ = event.clientX;
            this.previousY_ = event.clientY;
            this.dragging_ = true;
        }
    }

    handleDraggerDrag_(event) {
        if (this.dragging_) {
            var element = this.getElement('.slider-bar', this.silderContent)[0];
            var deltaX = event.clientX - this.previousX_ + parseInt(element.style.left, 10);
            var deltaY = event.clientY - this.previousY_ + parseInt(element.style.top, 10);
            var relativePosition = this.getRelativePosition_(deltaX, deltaY);
            this.currentResolution_ = this.getResolutionForPosition_(relativePosition);
            this.getMap()
                .getView()
                .setResolution(this.currentResolution_);
            this.setThumbPosition_(this.currentResolution_);
            this.previousX_ = event.clientX;
            this.previousY_ = event.clientY;
        }
    }

    handleDraggerEnd_(event) {
        if (this.dragging_) {
            var view = this.getMap().getView();

            view.animate({
                resolution: view.constrainResolution(this.currentResolution_),
                duration: this.duration_,
                easing: EaseOut,
            });
            this.dragging_ = false;
            this.previousX_ = undefined;
            this.previousY_ = undefined;
        }
    }

    setThumbPosition_(res) {
        var position = this.getPositionForResolution_(res);
        var thumb = this.getElement('.slider-bar', this.silderContent)[0];
        if (this.direction_ === Direction_.HORIZONTAL) {
            thumb.style.left = this.widthLimit_ * position + 'px';
            this.sliderBackgroundBottom.style.width = this.widthLimit_ - (this.widthLimit_ * position - 5) + 'px';
        } else {
            thumb.style.top = this.heightLimit_ * position + 'px';
            this.sliderBackgroundBottom.style.height = this.heightLimit_ - (this.heightLimit_ * position - 5) + 'px';
        }
    }

    getRelativePosition_(x, y) {
        var amount = void 0;
        if (this.direction_ === Direction_.HORIZONTAL) {
            amount = x / this.widthLimit_;
        } else {
            amount = y / this.heightLimit_;
        }
        return Math.min(Math.max(amount, 0), 1);
    }

    getResolutionForPosition_(position) {
        var view = this.getMap().getView();
        if (view) {
            return this.getResolutionForValueFunction(1 - position);
        }
    }

    getValueForResolutionFunction(resolution, optPower) {
        var power = optPower || 2;
        var view = this.getMap().getView();
        var maxResolution = view.getMaxResolution();
        var minResolution = view.getMinResolution();
        var max = Math.log(maxResolution / minResolution) / Math.log(power);
        return Math.log(maxResolution / resolution) / Math.log(power) / max;
    }

    getResolutionForValueFunction(value, optPower) {
        var power = optPower || 2;
        var view = this.getMap().getView();
        var maxResolution = view.getMaxResolution();
        var minResolution = view.getMinResolution();
        var max = Math.log(maxResolution / minResolution) / Math.log(power);
        return maxResolution / Math.pow(power, value * max);
    }

    getPositionForResolution_(res) {
        var view = this.getMap().getView();
        if (view) {
            return 1 - this.getValueForResolutionFunction(res);
        }
    }

    createElement(tagName, className, container, id) {
        var el = document.createElement(tagName);
        if (id) el.id = id;
        if (className) this.addClass(el, className);
        if (container) {
            container.appendChild(el);
        }
        return el;
    }

    getElement(selector, root) {
        var _root = root || window.document;
        var dom = (function() {
            var found = void 0;
            return _root.document && /^#([\w-]+)$/.test(selector) ?
                (found = _root.getElementById(RegExp.$1)) ? [found] : [] :
                Array.prototype.slice.call(
                    /^\.([\w-]+)$/.test(selector) ?
                    _root.getElementsByClassName(RegExp.$1) :
                    /^[\w-]+$/.test(selector) ?
                    _root.getElementsByTagName(selector) :
                    _root.querySelectorAll(selector)
                );
        })();
        return dom;
    }

    getTarget(content) {
        if (content instanceof Element) {
            return content;
        } else if (this.isString(content)) {
            return document.getElementById(content);
        } else {
            throw new Error('Invalid map container!');
        }
    }

    hasClass(el, cls) {
        if (!el || !cls) return false;
        if (cls.indexOf(' ') !== -1) {
            throw new Error('className should not contain space.');
        }
        if (el.classList) {
            return el.classList.contains(cls);
        } else {
            return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
        }
    }

    addClass(el, cls) {
        if (!el) return;
        var curClass = el.className;
        var classes = (cls || '').split(' ');
        for (var i = 0, j = classes.length; i < j; i++) {
            var clsName = classes[i];
            if (!clsName) continue;
            if (el.classList) {
                el.classList.add(clsName);
            } else if (!this.hasClass(el, clsName)) {
                curClass += ' ' + clsName;
            }
        }
        if (!el.classList) {
            el.className = curClass;
        }
    }

    removeClass(el, cls) {
        if (!el || !cls) return;
        var classes = cls.split(' ');
        var curClass = ' ' + el.className + ' ';
        for (var i = 0, j = classes.length; i < j; i++) {
            var clsName = classes[i];
            if (!clsName) continue;
            if (el.classList) {
                el.classList.remove(clsName);
            } else if (this.hasClass(el, clsName)) {
                curClass = curClass.replace(' ' + clsName + ' ', ' ');
            }
        }
        if (!el.classList) {
            el.className = this.trim(curClass);
        }
    }

    stamp(obj) {
        var key = '_event_id_';
        obj[key] = obj[key] || this.getuuid();
        return obj[key];
    }

    trim(str) {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
    };

    getuuid() {
        var s = [],
            hexDigits = '0123456789abcdef';

        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = '4';
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = '-';
        return s.join('');
    }

    isString(value) {
        if (value == null) {
            return false;
        }
        return typeof value === 'string' || (value.constructor !== null && value.constructor === String);
    }

    bindListener(listenerObj) {
        var boundListener = function boundListener(evt) {
            var listener = listenerObj.listener;
            var bindTo = listenerObj.bindTo || listenerObj.target;
            if (listenerObj.callOnce) {
                this.unListenByKey(listenerObj);
            }
            return listener.call(bindTo, evt);
        };
        listenerObj.boundListener = boundListener;
        return boundListener;
    };

    findListener(listeners, listener, optThis, optSetDeleteIndex) {
        var listenerObj = null;
        for (var i = 0, ii = listeners.length; i < ii; ++i) {
            listenerObj = listeners[i];
            if (listenerObj.listener === listener && listenerObj.bindTo === optThis) {
                if (optSetDeleteIndex) {
                    listenerObj.deleteIndex = i;
                }
                return listenerObj;
            }
        }
        return undefined;
    };

    getListeners(target, type) {
        var listenerMap = target.vlm;
        return listenerMap ? listenerMap[type] : undefined;
    };

    getListenerMap(target) {
        var listenerMap = target.vlm;
        if (!listenerMap) {
            listenerMap = target.vlm = {};
        }
        return listenerMap;
    };

    removeListeners(target, type) {
        var listeners = this.getListeners(target, type);
        if (listeners) {
            for (var i = 0, ii = listeners.length; i < ii; ++i) {
                target.removeEventListener(type, listeners[i].boundListener);
                this.clear(listeners[i]);
            }
            listeners.length = 0;
            var listenerMap = target.vlm;
            if (listenerMap) {
                delete listenerMap[type];
                if (Object.keys(listenerMap).length === 0) {
                    delete target.vlm;
                }
            }
        }
    };

    listen(target, type, listener, optThis, optOnce) {
        var listenerMap = this.getListenerMap(target);
        var listeners = listenerMap[type];
        if (!listeners) {
            listeners = listenerMap[type] = [];
        }
        var listenerObj = this.findListener(listeners, listener, optThis, false);
        if (listenerObj) {
            if (!optOnce) {
                listenerObj.callOnce = false;
            }
        } else {
            listenerObj = {
                bindTo: optThis,
                callOnce: !!optOnce,
                listener: listener,
                target: target,
                type: type,
            };
            target.addEventListener(type, this.bindListener(listenerObj));
            listeners.push(listenerObj);
        }
        return listenerObj;
    };

    listenOnce(target, type, listener, optThis) {
        return this.listen(target, type, listener, optThis, true);
    };

    unListen(target, type, listener, optThis) {
        var listeners = this.getListeners(target, type);
        if (listeners) {
            var listenerObj = this.findListener(listeners, listener, optThis, true);
            if (listenerObj) {
                this.unListenByKey(listenerObj);
            }
        }
    };

    unListenByKey(key) {
        if (key && key.target) {
            key.target.removeEventListener(key.type, key.boundListener);
            var listeners = this.getListeners(key.target, key.type);
            if (listeners) {
                var i = 'deleteIndex' in key ? key.deleteIndex : listeners.indexOf(key);
                if (i !== -1) {
                    listeners.splice(i, 1);
                }
                if (listeners.length === 0) {
                    this.removeListeners(key.target, key.type);
                }
            }
            this.clear(key);
        }
    };

    clear(object) {
        for (var property in object) {
            delete object[property];
        }
    };

    getDomEventKey(type, fn, context) {
        return '_dom_event_' + type + '_' + this.stamp(fn) + (context ? '_' + this.stamp(context) : '');
    };

    addListener(element, type, fn, context) {
        var eventKey = this.getDomEventKey(type, fn, context);
        var handler = element[eventKey];
        if (handler) {
            return this;
        }
        handler = function handler(e) {
            return fn.call(context || element, e);
        };
        if ('addEventListener' in element) {
            element.addEventListener(type, handler, false);
        } else if ('attachEvent' in element) {
            element.attachEvent('on' + type, handler);
        }
        element[eventKey] = handler;
        return this;
    };

}