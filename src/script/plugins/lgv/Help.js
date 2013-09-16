/*
 * Dieses Modul erzeugt eine Aktion, um die Online-Hilfe zur jeweiligen Kartenanwendung zu öffnen.
 * Die URL zur Hilfe wird in apps.js konfiguriert.
 * Das in helpActionCSS definierte Icon wird in der Toolbar angezeigt.
*/

Ext.ns("lgv.plugins");

lgv.plugins.help = Ext.extend(gxp.plugins.Tool, {

    ptype : "lgv_help",

	url: null,

    addActions: function() {

	    var url = this.url;

		var action = new Ext.Action({
	        tooltip: 'Hilfe anzeigen',
			iconCls: 'helpActionCSS',
		    handler: function(){
	        	window.open(url);
	        }
    	});
    return lgv.plugins.help.superclass.addActions.call(this, [action]);
  }
});

Ext.preg(lgv.plugins.help.prototype.ptype, lgv.plugins.help);