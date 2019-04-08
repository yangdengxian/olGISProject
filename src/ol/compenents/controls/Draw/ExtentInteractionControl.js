/**
 * 框选
 * @author ydx
 * @date 2019-04-08
 */
import { platformModifierKeyOnly } from 'ol/events/condition';
import ExtentInteraction from 'ol/interaction/Extent';

/* 
var extent = new ExtentInteraction({
    condition: platformModifierKeyOnly
});
map.addInteraction(extent);
extent.setActive(false);

//Enable interaction by holding shift
window.addEventListener('keydown', function(event) {
    if (event.keyCode == 16) {
        extent.setActive(true);
    }
});
window.addEventListener('keyup', function(event) {
    if (event.keyCode == 16) {
        extent.setActive(false);
    }
});
 */
export default class ExtentInteractionControl extends ExtentInteraction {
    constructor(param) {
        super({
            condition: platformModifierKeyOnly
        });
    }

    drawEndHandler(evt) {
        var __this = this;

    }

}