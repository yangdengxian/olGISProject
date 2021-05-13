import { WFS } from 'ol/format';
import {
    ajaxPostReqeust
} from '../../utils/Util';
import XmlUtil from './XmlFormat';
import Feature from 'ol/Feature';
import GML from 'ol/format/GML3';
import GeoJSON from 'ol/format/GeoJSON';
/**
 * @classdesc ogc wfs-t数据服务
 * @author ydx
 * @date 2019-07-02
 * @module format/WFST
 * @extends WFS
 */
class WFST extends WFS {
    /**
     * @param {*} param 
     * @param {String} param.url wfs服务地址 必填 
     * @param {String} param.version wfs服务版本号
     * @param {String} param.service 服务类型
     * @param {String} param.outputFormat 数据格式
     * @param {Number} param.maxFeatures 最大查询数
     */
    constructor(param) {
        super(param);
        this.version = "1.1.0";
        this.service = "WFS";
        this.outputFormat = "application/json";
        this.maxFeatures = 50;
        this.url = param.url;
    }

    /**
     * @description 新增
     * @param {Array<Feature> | Feature} inserts 要素
     * @param {Object} options 参数对象
     */
    insert(inserts, options) {
        let node = null;
        inserts = Array.isArray(inserts) ? inserts : [inserts];
        node = this.writeTransaction(inserts, null, null, options);
        return this.save(node);
    }

    /**
     * @description 编辑
     * @param {Array<Feature> | Feature} updates 要素
     * @param {Object} options 参数对象
     */
    update(updates, options) {
        let node = null;
        updates = Array.isArray(updates) ? updates : [updates];
        node = this.writeTransaction(null, updates, null, options);
        return this.save(node);
    }


    /**
     * @description 删除
     * @param {Array<Number> | Number} featureIds 要素ids
     * @param {Object} options 参数对象
     */
    remove(featureIds, options) {
        let node = null,
            deletes = [];
        featureIds = Array.isArray(featureIds) ? featureIds : [featureIds];
        featureIds.forEach(featureId => {
            const deleteFeature = new Feature();
            deleteFeature.setId(featureId);
            deletes.push(deleteFeature);
        });
        node = this.writeTransaction(null, null, deletes, options);
        return this.save(node);
    }

    /**
     * @description 保存方法
     * @param {GML} gmlNode 
     */
    save(gmlNode) {
        return ajaxPostReqeust({
            data: new XMLSerializer().serializeToString(gmlNode),
            url: this.url
        }).then((result) => {
            let insertResult = XmlUtil.evaluate('//wfs:InsertResults/wfs:Feature/ogc:FeatureId/@fid', result);
            let id = insertResult.iterateNext();
            return id.value;
        }, (error) => {
            console.error(error);
            return error;
        });
    }

    /**
     * @description 查询
     * @param {Object} options
     * @param {String} options.version
     * @param {String} options.srsName eg: 'EPSG:3857'
     * @param {String} options.featureNS Namespace URI eg: 'http://openstreemap.org'
     * @param {String} options.featurePrefix workspace
     * @param {Array<String>} options.featureTypes 查询图层名称
     * @param {String} options.outputFormat 'application/json',
     * @param {Filter} options.filter 
     * 
     */
    loadFeatures(options) {
        options = Object.assign(options, {
            version: this.version,
            outputFormat: this.outputFormat,
            maxFeatures: options.maxFeatures || this.maxFeatures
        });
        return ajaxPostReqeust({
            data: new XMLSerializer().serializeToString(this.getQueryNode(options)),
            url: this.url
        }).then((json) => {
            let features = new GeoJSON().readFeatures(json);
            return features;
        }, (err) => {
            return err;
        })
    }

    /**
     * @description 获取查询Node
     * @param {Object} options
     */
    getQueryNode(options) {
        //是否传入主键featureId
        if (options.featureId || options.featureIds) {
            //主键查询
            let request = XmlUtil.createElementNS('wfs:GetFeature', {
                service: options.service,
                version: options.version,
                maxFeatures: options.maxFeatures,
                outputFormat: options.outputFormat
            });

            XmlUtil.setAttributes(request, {
                "xmlns:wfs": XmlUtil.namespaces.wfs,
                "xmlns:ogc": XmlUtil.namespaces.ogc,
                "xmlns:xsi": XmlUtil.namespaces.xsi
            })

            let query = request.appendChild(XmlUtil.createElementNS('wfs:Query', {
                typeName: options.featurePrefix + ":" + options.featureTypes[0],
                srsName: options.srsName,
                propertyNames: options.propertyNames || '*'
            }));

            //查询字段
            if (options.propertyNames && Array.isArray(options.propertyNames)) {
                options.propertyNames.forEach(propertyName => {
                    let propertyNameNode = XmlUtil.createElementNS("PropertyName");
                    propertyNameNode.innerHTML = propertyName;
                    query.appendChild(propertyNameNode);
                });
            }

            let filter = XmlUtil.createElementNS("ogc:Filter");
            //单条查询
            if (options.featureId) {
                filter.appendChild(XmlUtil.createElementNS('ogc:FeatureId', {
                    fid: options.featureId
                }));
            }
            //多条查询
            if (options.featureIds && Array.isArray(options.featureIds)) {
                options.featureIds.forEach(featureId => {
                    filter.appendChild(XmlUtil.createElementNS('ogc:FeatureId', {
                        fid: featureId
                    }));
                })
            }

            query.appendChild(filter);

            return request;
        } else {
            //普通属性查询
            return this.writeGetFeature(options);
        }

    }
}

export default WFST;