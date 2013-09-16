OpenLayers.DOTS_PER_INCH = 96;
OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;
GeoExt.Lang.set("de");

var app = new gxp.Viewer({

    /* Sets the proxy to use in order to bypass the Same Origin Policy when accessing remote resources through JavaScript. Only needed when external resources (from outside the OpenGeo Suite instance that your app lives in) are used. Will be set as OpenLayers.ProxyHost. */
    proxy : '/cgi-bin/proxy.cgi?url=',

    /* The items to add to the portal, in addition to the map panel that the viewer will create automatically. */
    //portalItems: configured below in portalConfig.items

    /* Configuration object for the wrapping container (usually an Ext.Viewport) of the viewer */
    portalConfig : {
        layout : "border",
        region : "center",
        // by configuring items here, we don't need to configure portalItems and save a wrapping container
        items : [{
            id : "centerpanel",
            xtype : "panel",
            layout : "fit",
            region : "center",
            border : false,
            items : ["mymap"]
        }, {
            id : "westpanel",
            xtype : "panel",
            title : "Themen",
            layout : "fit",
            region : "west",
            width : 200,
            split : true,
            collapsible : true
        }]
    },

    /*A set of tools that you want to use in the application, such as measure tools or a layer tree*/
    tools : [{
        ptype : "gxp_layertree",
        outputConfig : {
            id : "tree",
            border : true,
            tbar : []
        },
        outputTarget : "westpanel"
    }, {
        ptype : "gxp_addlayers",
        actionTarget : "tree.tbar"
    }, {
        ptype : "gxp_removelayer",
        actionTarget : ["tree.tbar", "tree.contextMenu"]
    }, {
        ptype : 'gxp_measure',
        actionTarget : "map.tbar"
    }, {
        ptype : "gxp_navigationhistory",
        actionTarget : "map.tbar"
    }, {
        ptype : "gxp_wmsgetfeatureinfo",
        format : 'grid',
        outputConfig : {
            width : 400
        }
    }, {
        ptype : "gxp_zoomtolayerextent",
        actionTarget : ["tree.contextMenu"]
    }, {
        ptype : "gxp_legend",
        actionTarget : "tree.tbar"
    }, {
        ptype : "gxp_print",
        actionTarget : "map.tbar",
        printService : "http://wscd0096:8080/mapfish_print_2/pdf5/info.json?"
    },{
        ptype: "lgv_gaz",
        outputTarget: "map.tbar"
     },{
         ptype: "lgv_linktotim",
         actionTarget: "map.tbar"
     },  {
         ptype: "lgv_showcoords",
         actionTarget: "map.tbar"
     }, {
        ptype: "lgv_sendmail",
        outputTarget: "map.tbar"
     },{
        ptype: "lgv_help",
        outputTarget: "map.tbar",
        url: "http://geofos.fhhnet.stadt.hamburg.de/FHH-Atlas/img/Hilfe-FHH-Atlas.pdf"
     }
    ],

    /*Any items to be added to the map panel, such as a zoom slider*/
    mapItems : [{
        xtype : "gx_zoomslider",
        vertical : true,
        x: 10,
        y: 20,
        height : 100,
        aggressive: true
    },
    {
        xtype : "gxp_scaleoverlay"
    }],

    defaultSourceType : "gxp_wmssource",

    /*Configuration of layer sources available to the viewer, such as MapQuest or a WMS server*/
    sources : {
        webatlasde : {
            url : "http://geofos.fhhnet.stadt.hamburg.de/wms_webatlasde",
            version : "1.1.1"
        },
        hhde : {
            url : "/wms_hamburgde",
            version : "1.1.1"
        },
        kombiwms : {
            url : "http://lgvfds02.fhhnet.stadt.hamburg.de/ArcGIS/services/GBD_Image/Geobasisdaten/MapServer/WMSServer",
            version : "1.1.1"
        },
        ol : {
            ptype : "gxp_olsource"
        },
        local : {
            url : "http://wscd0095/fachdaten_public/services/wms",
            version : "1.1.1"
        }
    },

    /*The configuration for the actual map part of the viewer, such as projection, layers, center and zoom*/
    map : {
        id : "mymap", // id needed to reference map in portalConfig above
        // title : "Map",
        projection : "EPSG:25832",
        center : [565874, 5934140],
        zoom : 1,
        units : 'm',
        resolutions : [132.29159522920526, 66.14579761460263, 26.458319045841054, 15.874991427504629, 10.583327618336419, 5.2916638091682096, 2.6458319045841048, 1.3229159522920524, 0.6614579761460262, 0.2645831904584105],
        maxExtent : [458000.0, 5850000.0, 660000.0, 5990000.0],
		restrictedExtent: [458000.0, 5850000.0, 640000.0, 5990000.0],
        controls: [new OpenLayers.Control.Navigation(), new OpenLayers.Control.Zoom()],
        layers : [{
            source : "webatlasde",
            name : "1",
            group : "background",
            title : "WebAtlasDE",
            bbox: [458000.0, 5850000.0, 660000.0, 5990000.0], 
        },
        //add any OL layer, e.g. wms
        {
            source : "ol",
            type : "OpenLayers.Layer.WMS",
            args : ["Stadtplan Farbig", "http://lgvfds02.fhhnet.stadt.hamburg.de/ArcGIS/services/GBD_Image/Geobasisdaten/MapServer/WMSServer", {
                layers : '1,5,9,13,17,21',
                projection : 'EPSG:25832',
                format : 'image/jpeg'
            }],
            bbox: [458000.0, 5850000.0, 660000.0, 5990000.0],
            group : "background"
        }, {
            source : "hhde",
            name : "dop",
            title : "Luftbilder",
            bbox: [458000.0, 5850000.0, 660000.0, 5990000.0],            
            group : "background"
        }, {
            source : "hhde",
            name : "geobasisdaten",
            title : "Stadtplan",
            bbox: [458000.0, 5850000.0, 660000.0, 5990000.0], 
            group : "background"
        },
        //add any OL layer, e.g. vector
        {
            source : "ol",
            type : "OpenLayers.Layer.Vector",
            args : ["Energiewende-WFS", {
                protocol : new OpenLayers.Protocol.WFS.v1_1_0({
                    url : 'http://wscd0095/fachdaten_public/services/wfs',
                    featureType : 'energiewende',
                    srsName : 'epsg:25832',
                    version : '1.1.0'
                }),
                strategies : [new OpenLayers.Strategy.Fixed()],
                // style features invisible; only used
                // to generate fast popups from
                styleMap : new OpenLayers.StyleMap({
                    pointRadius : 6,
                    fillColor : '#ee0000',
                    fillOpacity : 0.5,
                    strokeColor : '#ee0000',
                    strokeOpacity : 0,
                    strokeWidth : 3
                })
            }],
            bbox: [458000.0, 5850000.0, 660000.0, 5990000.0]
        },
        //add any OL layer, wms
        {
            source : "ol",
            type : "OpenLayers.Layer.WMS",
            args : ["Verkehrslage auf Autobahnen", "http://wscd0095/fachdaten_public/services/wms", {
                layers : 'bab_vkl,bab_novkl',
                format : 'image/jpeg',
                transparent : true,
            }],
            bbox: [458000.0, 5850000.0, 660000.0, 5990000.0]
        }, {
            source : "local",
            name : "parkhaeuser",
            selected : true,
            tiled : false,
            getFeatureInfo : {
                fields : ["id", "name"],
                propertyNames : {
                    "id" : "ID",
                    "name" : "Name"
                }
            },
            title: "Parkhäuser",
            bbox: [458000.0, 5850000.0, 660000.0, 5990000.0]            
        }]
    }

});

/*
 {
 xtype : "gxp_autocompletecombo",
 // outputTarget: "map.tbar",
 url : "http://wscd0095/fachdaten_public/services/wfs",
 fieldName : "name",
 featureType : "verkehr_parkhaeuser",
 featurePrefix : "app",
 emptyText : "Suche nach Parkhaus..."
 }
 * */