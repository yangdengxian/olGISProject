/*	Copyright (c) 2019 Jean-Marc VIGLINO,
	released under the CeCILL-B license (French BSD license)
	(http://www.cecill.info/licences/Licence_CeCILL-B_V1-en.txt).
*/

import ol_ext_inherits from 'ol-ext/util/ext';
import ol_control_Control from 'ol/control/Control';
import ol_ext_element from 'ol-ext/util/element';

/** Print control to get an image of the map
 *
 * @constructor
 * @fire print
 * @fire printing
 * @extends {ol.control.Control}
 * @param {Object=} options Control options.
 *	@param {String} options.className class of the control
 *	@param {string} options.imageType A string indicating the image format, default image/jpeg
 *	@param {number} options.quality Number between 0 and 1 indicating the image quality to use for image formats that use lossy compression such as image/jpeg and image/webp
 */
var ol_control_Print = function(options) {
    if (!options) options = {};

    var element = ol_ext_element.create('DIV', {
        className: (options.className || 'ol-print')
    });

    if (!options.target) {
        element.classList.add('ol-unselectable', 'ol-control');
        ol_ext_element.create('BUTTON', {
            type: 'button',
            click: function() { this.print(); }.bind(this),
            parent: element
        });
    }

    ol_control_Control.call(this, {
        element: element,
        target: options.target
    });

    //ydx 2019-05-28
    for (const key in options) {
        if (options.hasOwnProperty(key)) {
            this.set(key, options[key])
        }
    }

    this.set('imageType', options.imageType || 'image/jpeg');
    this.set('quality', options.quality || .8);
};
ol_ext_inherits(ol_control_Print, ol_control_Control);

/** Print the map
 * @param {function} cback a callback function that take a string containing the requested data URI.
 * @param {Object} options
 *	@param {string} options.imageType A string indicating the image format, default the control one
 *	@param {number} options.quality Number between 0 and 1 indicating the image quality to use for image formats that use lossy compression such as image/jpeg and image/webp
 *  @param {*} options.any any options passed to the print event when fired
 * @api
 */
ol_control_Print.prototype.print = function(options) {
    options = options || {};
    var imageType = options.imageType || this.get('imageType');
    var quality = options.quality || this.get('quality');
    if (this.getMap()) {
        this.dispatchEvent(Object.assign({
            type: 'printing',
        }, options));
        this.getMap().once('rendercomplete', function(event) {
            var canvas, ctx;
            // ol <= 5 > get the canavs
            if (event.context) {
                canvas = event.context.canvas;
            } else {
                // ol6 > create canvas using layer canvas
                this.getMap().getViewport().querySelectorAll('.ol-layer').forEach(function(c) {
                    if (c.width) {
                        // Create a canvas if none
                        if (!canvas) {
                            canvas = document.createElement('canvas');
                            var size = this.getMap().getSize();
                            canvas.width = size[0];
                            canvas.height = size[1];
                            ctx = canvas.getContext('2d');
                            if (/jp.*g$/.test(imageType)) {
                                ctx.fillStyle = "white";
                                ctx.fillRect(0, 0, canvas.width, canvas.height);
                            }
                        }
                        ctx.save();
                        // opacity
                        ctx.globalAlpha = c.style.opacity || 1;
                        // transform
                        var tr = ol_ext_element.getStyle(c, 'transform') || ol_ext_element.getStyle(c, '-webkit-transform');
                        if (/^matrix/.test(tr)) {
                            tr = tr.replace(/^matrix\(|\)$/g, '').split(',');
                            tr.forEach(function(t, i) { tr[i] = parseFloat(t); });
                            ctx.transform(tr[0], tr[1], tr[2], tr[3], tr[4], tr[5]);
                            ctx.drawImage(c, 0, 0);
                        } else {
                            ctx.drawImage(c, 0, 0, ol_ext_element.getStyle(c, 'width'), ol_ext_element.getStyle(c, 'height'));
                        }
                        ctx.restore();
                    }
                }.bind(this));
            }
            // Calculate print format
            var size = [210, 297],
                w, h, position, orient, format = 'a4';
            var margin = 10;
            if (canvas) {
                // Calculate size
                if (canvas.width > canvas.height) {
                    orient = 'landscape';
                    size = [size[1], size[0]];
                } else {
                    orient = 'portrait';
                }
                var sc = Math.min((size[0] - 2 * margin) / canvas.width, (size[1] - 2 * margin) / canvas.height);
                w = sc * canvas.width;
                h = sc * canvas.height;
                // Image position
                position = [(size[0] - w) / 2, (size[1] - h) / 2];
            }
            // Fire print event

            var e = Object.assign({
                type: 'print',
                print: {
                    format: format,
                    orientation: orient,
                    unit: 'mm',
                    size: size,
                    position: position,
                    imageWidth: w,
                    imageHeight: h
                },
                /* image: (function(canvas) {
                    var image = new Image();
                    //ydx 2019-05-28 防止跨域
                    image.setAttribute('crossOrigin', 'anonymous');
                    image.src = canvas ? canvas.toDataURL(imageType, quality) : null
                    return image;
                })(canvas), */
                imageType: imageType,
                canvas: canvas
            }, options);
            this.dispatchEvent(e);
        }.bind(this));
        this.getMap().render();
    }
};

export default ol_control_Print