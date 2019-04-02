/**
 * 地图事件
 * @author ydx
 * @date 2019-03-22
 */
import Map from './Map';


const MapEvent = {
    _onClickHandler: function(evt) {
        console.log(evt);

    }
}
Map.on('click', MapEvent._onClickHandler);

export default MapEvent;