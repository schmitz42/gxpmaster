/* global lgv, gxp, Ext, app */

/**
 * Erstellt ein Control auf der Karte für die Auswahl der Hintergrundkarten
 * und registriert die Events.
 * 
 * Wichtig: Der Layer-Titel und das jeweils dazugehörige Thumbnail müssen den
 * gleichen Namen(Case Sensitive) haben. --> siehe createControl
 * 
 * Hinweis: Funktioniert im IE erst ab der Version 9.0 fehlerfrei.
 */

Ext.ns("lgv.plugins");

lgv.plugins.BaseLayer = Ext.extend(gxp.plugins.Tool, {

	ptype: "lgv_baselayer",

	/**
	 * Holt die Hintergrundkarten aus der map-Konfiguration der app.js und speichert die Layer in ein Array.
	 *
	 * @return {Array} baseLayer - Liste der Hintergrundlayer
	 */
	getBaseLayer: function() {
		var map = this.target.map;
		var baseLayer = [];
		for(var i = map.layers.length-1; i >= 0; i--) {
			if(map.layers[i].group === "background") {
				baseLayer.push(map.layers[i]);
			}
		}
		return baseLayer;
	},

	/**
	 * Erstellt das Control bzw. erzeugt die HTML-Struktur und fügt es der Karte als Inline-Control hinzu.
	 */
	createControl: function () {
		var baseLayerArray = this.getBaseLayer();
		var baseLayerControl = "<div id='baseLayerControl'>";

		// Anzeige aktueller Layer
		baseLayerControl +="<div id='activeLayer'>";
		baseLayerControl +="<p id='activeLayerName'>" + baseLayerArray[0].title + "</p>";
		baseLayerControl +="<p id='switchLayerButton'>&#9660;</p>";
		baseLayerControl +="</div>";

		// Auswahl der Hintergrundkarten
		baseLayerControl +="<div id='layerSelection'>";
		for(var i = 0; i < baseLayerArray.length; i++) {
			baseLayerControl +="<div class='baseLayer'>";
			baseLayerControl +="<p><img src='../src/theme/img/lgv/" + baseLayerArray[i].title + ".png' alt='" + baseLayerArray[i].title + " Thumbnail'></p>";
			baseLayerControl +="<p>" + baseLayerArray[i].title + "</p>";
			baseLayerControl +="</div>";
		}
		baseLayerControl +="</div>";
		baseLayerControl +="</div>";

		// Control wird der Karte hinzugefügt
		Ext.select("#mymap").createChild(baseLayerControl);
	},

	/**
	 * Ruft die "Controlerzeugung" auf. Registriert und verarbeitet dessen Events.
	 */
	addOutput: function() {
		this.createControl();

		// Beim mouseover-Event des Controls wird die Auswahl an Hintergrundkarten eingeblendet
		Ext.select("#activeLayer").on({
			mouseover: function() {
				Ext.select("#layerSelection").show();
			}
		});

		// Beim mouseleave-Event des Controls wird die Auswahl wieder ausgeblendet
		Ext.select("#baseLayerControl").on({
			mouseleave: function() {
				Ext.select("#layerSelection").hide();
			}
		});

		//
		Ext.select(".baseLayer").on({
			click: function() {
				var map = app.mapPanel.map;
				if ($(this).children().text() === 'Stadtplan') {
					map.getLayersByName('Stadtplan')[0].setVisibility(true);
					map.getLayersByName('Luftbilder')[0].setVisibility(false);
					Ext.select("#activeLayerName").update('Stadtplan');
				}
				else if ($(this).children().text() === 'Luftbilder') {
					map.getLayersByName('Stadtplan')[0].setVisibility(false);
					map.getLayersByName('Luftbilder')[0].setVisibility(true);
					Ext.select("#activeLayerName").update('Luftbilder');
				}
			}
		});
		return lgv.plugins.BaseLayer.superclass.addOutput.call(this);
	}
});
Ext.preg(lgv.plugins.BaseLayer.prototype.ptype, lgv.plugins.BaseLayer);