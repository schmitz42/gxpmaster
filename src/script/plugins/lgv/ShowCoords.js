Ext.ns("lgv.plugins");

lgv.plugins.ShowCoords = Ext.extend(gxp.plugins.Tool, {
    ptype : "lgv_showcoords",
    
    showCoordsTip: "Koordinaten anzeigen",
    
    addActions : function() {
        
        var map = this.target.mapPanel.map;
        
        var showCoords = function(e){
            var clickedLonLat = this.getLonLatFromPixel(new OpenLayers.Pixel(e.xy.x, e.xy.y));
            Ext.MessageBox.alert('Koordinate: ', Math.round(clickedLonLat.lon) + ', ' + Math.round(clickedLonLat.lat));
        };
        
        var gfi = this.target.tools[this.gfiId];
              
        var action = new Ext.Action({ 
            tooltip: this.showCoordsTip,
            iconCls: 'lgv-showCoords',
            toggleGroup: this.toggleGroup,
            enableToggle: true,
            allowDepress: true,
            toggleHandler: function(button, pressed) {
                    if (pressed) {
                        map.events.register("click", map, showCoords);
                        if (gfi) {gfi.deactivate();}
                    } else {
                        map.events.unregister("click", map, showCoords);                        
                        if (gfi) {gfi.activate();}                        
                    }                
             }
        });
        
        return lgv.plugins.ShowCoords.superclass.addActions.call(this, [action]);
    }
});

//registers the ptype name as a shortcut for creating the plugin
Ext.preg(lgv.plugins.ShowCoords.prototype.ptype, lgv.plugins.ShowCoords);