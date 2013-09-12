Ext.ns("lgv.plugins");

lgv.plugins.BoxInfo = Ext.extend(gxp.plugins.Tool, {

    ptype : "lgv_boxinfo",

    boxTool : null,

    tplText : 'Area: {area}, Perimeter: {length}',

    title : "Box info",

    addOutput : function(config) {
        if (this.boxTool !== null) {
            //this.target contains all the relevant objects of the viewer this tool is part of
            var layer = this.target.tools[this.boxTool].boxLayer;
            layer.events.on({
                featureadded : this.addFeature,
                scope : this
            });
            this.tpl = new Ext.Template(this.tplText);
        }
        return lgv.plugins.BoxInfo.superclass.addOutput.call(this, Ext.apply({
            title : this.title,
            autoScroll : true
            //which config is this? outputConfig, I guess..? who calls addOutput with config?
        }, config));
    },
    addFeature : function(evt) {
        var geom = evt.feature.geometry;
        //where does output[0] come from?
        var output = this.output[0];
        output.add({
            html : this.tpl.applyTemplate({
                area : geom.getArea(),
                length : geom.getLength()
            })
        });
        output.doLayout();
    }
});

Ext.preg(lgv.plugins.BoxInfo.prototype.ptype, lgv.plugins.BoxInfo);