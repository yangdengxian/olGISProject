import Print from './Print';
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image-more';
/**
 * @classdesc 专题图打印
 * @author ydx
 * @date 2019-05-28
 * @module controls/print/PrintControl
 * @extends Print
 */
class PrintControl extends Print {
    /**
     *  @param {*} options
     *  @param {string} options.id
     */
    constructor(options) {
        super(options);
    }

    /**
     * @description 根据类型打印
     * @param {string} type 打印类型 'jpg','png','pdf', 默认png
     */
    printByType(type) {
        let printOptions = {
            imageType: 'image/png'
        };
        switch (type) {
            case 'jpg':
                printOptions = {
                    imageType: 'image/jpeg'
                };
                break;
            case 'png':
                printOptions = {
                    imageType: 'image/png'
                };
                break;
            case 'pdf':
                printOptions = {
                    imageType: 'image/jpeg',
                    pdf: true
                };
                break;
            default:
                printOptions = {
                    imageType: 'image/png'
                };
                break;
        }

        this.print(printOptions);

        this.once('printing', function(e) {
            document.body.style.opacity = 0.1;
            console.log('printing')
        });
        this.once('print', function(e) {
            document.body.style.opacity = 1;
            // Print success
            if (e.canvas) {
                if (e.pdf) {
                    // Export pdf using the print info
                    var pdf = new jsPDF({
                        orientation: e.print.orientation,
                        unit: e.print.unit,
                        format: e.print.format
                    });
                    pdf.addImage(e.canvas.toDataURL(e.imageType, document.body.style.opacity), 'JPEG', e.print.position[0], e.print.position[0], e.print.imageWidth, e.print.imageHeight);
                    pdf.save();
                } else {
                    /*  domtoimage.toBlob(e.canvas).then((blob) => {
                         saveAs(blob, 'map.' + e.imageType.replace('image/', ''));
                     }); */
                    e.canvas.toBlob(function(blob) {
                        saveAs(blob, 'map.' + e.imageType.replace('image/', ''));
                    }, e.imageType);
                }
            } else {
                console.warn('No canvas to export');
            }
        });
    }
}

export default PrintControl;