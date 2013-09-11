OpenLayers.DOTS_PER_INCH = 96;
OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;
GeoExt.Lang.set("de");

var app = new gxp.Viewer(
		{
			
			/* Sets the proxy to use in order to bypass the Same Origin Policy when accessing remote resources through JavaScript. Only needed when external resources (from outside the OpenGeo Suite instance that your app lives in) are used. Will be set as OpenLayers.ProxyHost. */
			proxy : '/cgi-bin/proxy.cgi?url=',
			
			/* The items to add to the portal, in addition to the map panel that the viewer will create automatically. */
			//portalItems: configured below in portalConfig.items
			  
			/* Configuration object for the wrapping container (usually an Ext.Viewport) of the viewer */
			portalConfig : {
				layout : "border",
				region : "center",
				// by configuring items here, we don't need to configure portalItems and save a wrapping container
				items: [ {
                    id : "centerpanel",
                    xtype : "panel",
                    layout : "fit",
                    region : "center",
                    border : false,
                    items : [ "mymap" ]
                }, {
                    id : "westpanel",
                    xtype : "panel",
                    title: "Themen",
                    layout : "fit",
                    region : "west",
                    width : 200,
                    split: true,
                    collapsible: true
                }]
			},
			
			/*A set of tools that you want to use in the application, such as measure tools or a layer tree*/
			tools : [ {
				ptype : "gxp_layertree",
				outputConfig : {
					id : "tree",
					border : true,
					tbar : [] // we will add buttons to "tree.bbar" later				
				},
				outputTarget : "westpanel"
			}, {
				ptype : "gxp_addlayers",
				actionTarget : "tree.tbar"
			}, {
				ptype : "gxp_removelayer",
				actionTarget : [ "tree.tbar", "tree.contextMenu" ]
			}, {
			    ptype: 'gxp_measure',
			    actionTarget : "map.tbar"
			}, {
				ptype : "gxp_zoomtoextent",
				actionTarget : "map.tbar"
			}, {
				ptype : "gxp_zoom",
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
				actionTarget : [ "tree.tbar", "tree.contextMenu" ]
			}, {
				ptype : "gxp_legend",
				actionTarget : "tree.tbar"				
			}, {
                ptype : "gxp_print",
                actionTarget : "map.tbar" ,
                printCapabilities: printConfig
        }
			/*, {
				ptype: "lgv_drawbox",
				id: "drawbox",
				actionTarget: "map.tbar", //where the action appears
				outputTarget: "map"	//where output is placed
			},{
				ptype: "lgv_boxinfo",
				boxTool: "drawbox",
				tplText: "AREA:{area}",
		        outputTarget: "eastpanel",
		        outputConfig: {
		        	title: 'boxinfo'
		        }
			}, {
				ptype: "lgv_gaz",
				outputTarget: "map.tbar"
			}*/
			],
            
            /*Any items to be added to the map panel, such as a zoom slider*/
			mapItems:  [{
                    xtype : "gx_zoomslider",
                    vertical : true,
                    height : 100
                }, {
                    xtype: "gxp_scaleoverlay"
                }],
			
			/*Configuration of layer sources available to the viewer, such as MapQuest or a WMS server*/
			sources : {
				local : {
					ptype : "gxp_wmssource",
					url : "http://wscd0095/fachdaten_public/services/wms",
					version : "1.1.1"
				},
				webatlasde : {
					ptype : "gxp_wmssource",
					url : "http://geofos.fhhnet.stadt.hamburg.de/wms_webatlasde",
					version : "1.1.1"
				},
				ol : {
					ptype : "gxp_olsource"
				}
			},
			
			/*The configuration for the actual map part of the viewer, such as projection, layers, center and zoom*/
			map : {
				id : "mymap", // id needed to reference map in portalConfig
				// above
				// title : "Map",
				projection : "EPSG:25832",
				center : [ 565874, 5934140 ],
				zoom : 1,
				resolutions : [ 132.29159522920526, 66.14579761460263, 26.458319045841054, 15.874991427504629, 10.583327618336419, 5.2916638091682096, 2.6458319045841048, 1.3229159522920524, 0.6614579761460262, 0.2645831904584105 ],
				maxExtent : [ 458000.0, 5850000.0,660000.0, 5990000.0 ],
				layers : [
						{
							source : "webatlasde",
							name : "1",
							group : "background",
							isBaseLayer: true
						},
						{
							source : "ol",
							type : "OpenLayers.Layer.WMS",
							args : [
									"Stadtplan Farbig",
									"http://lgvfds02.fhhnet.stadt.hamburg.de/ArcGIS/services/GBD_Image/Geobasisdaten/MapServer/WMSServer",
									{
										layers : '1,5,9,13,17,21',
										projection : 'EPSG:25832',
										format : 'image/jpeg'
									} ],
							group : "background"
						},
						//add any OL layer, vector
						{
							source : "ol",
							type : "OpenLayers.Layer.Vector",
							args : [
									"Energiewende-WFS",
									{
										protocol : new OpenLayers.Protocol.WFS.v1_1_0(
												{
													url : 'http://wscd0095/fachdaten_public/services/wfs',
													featureType : 'energiewende',
													srsName : 'epsg:25832',
													version : '1.1.0'
												}),
										visibility : true,
										strategies : [ new OpenLayers.Strategy.Fixed() ],
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
									} ]
						},
						{
							source : "local",
							name : "parkhaeuser",
							selected : true,
							tiled : false,
							getFeatureInfo : {
								fields : [ "id", "name" ],
								propertyNames : {
									"id" : "ID",
									"name" : "Name"
								}
							}
						},
						//add any OL layer, wms
						{  
							source : "ol",
							type : "OpenLayers.Layer.WMS",
							args : [
									"Verkehrslage auf Autobahnen",
									"http://wscd0095/fachdaten_public/services/wms",
									{
										layers : 'bab_vkl,bab_novkl',
										format : 'image/jpeg',
										transparent: true
									} ]
						}
					]
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