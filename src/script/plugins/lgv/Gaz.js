Ext.ns("lgv.plugins");

lgv.plugins.Gaz = Ext.extend(gxp.plugins.Tool, {

    ptype : "lgv_gaz",

    addOutput : function(config) {
        var combo = new GeoExt.form.GeocoderComboBox({
            fieldLabel: 'Wo?',
            hideTrigger: true,
            srs: "EPSG:25832",
            ref: 'gcbox',
            emptyText: 'Straße eingeben..',
            width: 190,
            map: this.target.mapPanel.map,
            //layer: tmpAnliegen,
            minChars: 1,
            store: new Ext.data.Store({
                reader: new GeoExt.data.FeatureReader({}, [
                    {name: 'name', mapping: 'strassenname'},
                    {name: 'bounds', convert: function(v, feature) {
                        return feature.geometry.getBounds().toArray();                                               
                    }},
                    {name: 'lonlat', convert: function(v, feature) {
                        var lonlat = feature.geometry.getBounds().getCenterLonLat();
                        return [lonlat.lon, lonlat.lat];
                    }}                
                ]),
                sortInfo: {
                   field: 'name',
                    direction: 'ASC' // or 'DESC' (case sensitive for local sorting)
                },
                proxy: new (Ext.extend(GeoExt.data.ProtocolProxy, {
                    doRequest: function(action, records, params, reader, callback, scope, arg) {
                        if (params.q) {
                            params.filter = new OpenLayers.Filter.Comparison({
                                type: OpenLayers.Filter.Comparison.LIKE,
                                matchCase: false,
                                property: 'strassenname',
                                value: params.q + '*'
                            });
                            delete params.q;
                        }
                        GeoExt.data.ProtocolProxy.prototype.doRequest.apply(this, arguments);
                    }
                }))({
                    protocol: new OpenLayers.Protocol.WFS({
                        version: "1.1.0",
                        //lokal viel schneller als wscd 0095!! 
                        url: "http://wscd0095/dog_hh/services",
                        featureType: "Strassen",
                        //featurePrefix: "dog",
                        srsName: "EPSG:25832",
                        propertyNames: ['strassenname', 'geographicExtent'],
                        maxFeatures: 10,
                        readFormat: new OpenLayers.Format.GML()
                        //geometryName: 'position'
                    }),
                    setParamsAsOptions: true
                })
            })
        });
        
        return lgv.plugins.Gaz.superclass.addOutput.call(this, combo);
    }
});

Ext.preg(lgv.plugins.Gaz.prototype.ptype, lgv.plugins.Gaz);