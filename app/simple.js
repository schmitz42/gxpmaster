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
        }]
    },

    /*A set of tools that you want to use in the application, such as measure tools or a layer tree*/
    tools : [],

    /*Any items to be added to the map panel, such as a zoom slider*/
    mapItems : [],

    defaultSourceType : "gxp_wmssource",

    /*Configuration of layer sources available to the viewer, such as MapQuest or a WMS server*/
    sources : {
        wms_bwvi_opendata : {
            url : "http://wscd0095/fachdaten_public/services/wms_bwvi_opendata",
            version : "1.1.1"
        },
        hhde : {
            url : "/wms_hamburgde",
            version : "1.1.1"
        }
    },

    /*The configuration for the actual map part of the viewer, such as projection, layers, center and zoom*/
    map : {
        id : "mymap", // id needed to reference map in portalConfig above
        // title : "Map",
        projection : "EPSG:25832",
        center : [565874, 5934140],
        zoom : 3,
        units : 'm',
        resolutions : [132.29159522920526, 66.14579761460263, 26.458319045841054, 15.874991427504629, 10.583327618336419, 5.2916638091682096, 2.6458319045841048, 1.3229159522920524, 0.6614579761460262, 0.2645831904584105],
        maxExtent : [458000.0, 5850000.0, 660000.0, 5990000.0],
        controls: [
                new OpenLayers.Control.Navigation()
            ],
        layers : [
            {
                source : "hhde",
                name : "dop",
                title : "Luftbilder",
                group : "background"
            }, {
                source : "hhde",
                name : "geobasisdaten",
                title : "Stadtplan",
                group : "background"
            }, {
                source : "wms_bwvi_opendata",
                name : "bab_vkl",
                title: 'Verkehrslage auf Autobahnen',
                tiled : true
            }
        ]
    }
});