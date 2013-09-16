Ext.ns("lgv.plugins");

lgv.plugins.LinkToTim = Ext.extend(gxp.plugins.Tool, {
    ptype : "lgv_linktotim",

    addActions : function() {
        var map = this.target.mapPanel.map;
        var action = new Ext.Action({
        text: "Kartenänderung",
        tooltip: "Kartenänderung für die Hintergrundkarten melden",
        handler: function(){
            var center=map.getCenter();
            var resolution=map.getResolution();
            var param="lgv_center="+center.lon+","+center.lat;param+="&lgv_resol="+resolution+",1";window.open("http://www.hamburg.de/bsu/timonline/?"+param,"_blank");
        }
        });
        
        return lgv.plugins.DrawBox.superclass.addActions.call(this, [action]);
    }
});

//registers the ptype name as a shortcut for creating the plugin
Ext.preg(lgv.plugins.LinkToTim.prototype.ptype, lgv.plugins.LinkToTim);