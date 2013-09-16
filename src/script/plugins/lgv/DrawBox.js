Ext.ns("lgv.plugins");

lgv.plugins.DrawBox = Ext.extend(gxp.plugins.Tool, {
    ptype : "lgv_drawbox",

    raiseLayer : function() {
        var map = this.boxLayer && this.boxLayer.map;
        if (map) {
            map.setLayerIndex(this.boxLayer, map.layers.length);
        }
    },

    addActions : function() {
        var map = this.target.mapPanel.map;
        this.boxLayer = new OpenLayers.Layer.Vector(null, {
            displayInLayerSwitcher : false
        });
        map.addLayers([this.boxLayer]);
        // keep our vector layer on top so that it's visible
        map.events.on({
            scope : this
        });
        var layer = this.boxLayer;
        layer.events.on({
            featureadded : this.raiseLayer,
            scope : this
        });
        
        var action = new GeoExt.Action({
                text : "Draw box",
                toggleGroup : "draw",
                enableToggle : true,
                map : map,
                control : new OpenLayers.Control.DrawFeature(this.boxLayer, OpenLayers.Handler.RegularPolygon, {
                    handlerOptions : {
                        sides : 4,
                        irregular : true
                    }
                })
            });
        
        var removeAction = new Ext.Action({
            text : 'remove boxes',
            handler : function() {
                this.boxLayer.removeAllFeatures();
            },
            scope : this
        });
        
        return lgv.plugins.DrawBox.superclass.addActions.call(this, [action, removeAction]);
    }
});

//registers the ptype name as a shortcut for creating the plugin
Ext.preg(lgv.plugins.DrawBox.prototype.ptype, lgv.plugins.DrawBox);