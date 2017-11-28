/*
1. Ext.create 和 new 的区别是 new 需要用show() 显示pannel





*/
Ext.onReady(function(){

	// Ext.create('Ext.panel.Panel', {
	// 		title : "备品备件表",
	// 		id : "EquipRepairsView",
	// 		closable : true,
	// 		layout : {
	// 			type : "border"
	// 		},
	// 		autoScroll : true,
	// 	    height: 500,
	// 	    width: 200,
	// 	    renderTo: Ext.getBody(),
	// })
	getMesRandom = function(x) {
		return 'Mes-' + x + '-temp-' + Ext.Date.now() * Math.random();
	};
	repairsReader = function() {
		var modelid = getMesRandom("Model");
		Ext.define(modelid, {
			extend : "Ext.data.Model",
			fields : [{
						name : "EquipRepairsInfo_edit_repairsid",// 设备基本信息主键
						mapping : "REPAIRSID"// 数据库字段
					}, {
						name : "EquipRepairsInfo_edit_repairsNo",// 设备编码-基本信息
						mapping : "REPAIRS_NO"// 数据库字段
					}, {
						name : "EquipRepairsInfo_edit_equipname",// 设备型号名称
						mapping : "EQUIP_MODEL_NAME"// 数据库字段
					}, {
						name : "EquipRepairsInfo_edit_repairsName",// 设备型号名称
						mapping : "REPAIRS_NAME"// 数据库字段
					}, {
						name : "EquipRepairsInfo_edit_repairsSpecif",// 备注
						mapping : "REPAIRS_SPECIF"// 数据库字段
					}, {
						name : "EquipRepairsInfo_edit_repairsType",// 备注
						mapping : "REPAIRS_TYPE"// 数据库字段
					}, {
						name : "EquipRepairsInfo_edit_repairsUnit",// 备注
						mapping : "REPAIRS_UNIT"// 数据库字段
					}, {
						name : "EquipRepairsInfo_edit_supplier",// 备注
						mapping : "SUPPLIER"// 数据库字段
					}, {
						name : "EquipRepairsInfo_edit_agency",// 备注
						mapping : "AGENCY"// 数据库字段
					}, {
						name : "EquipRepairsInfo_edit_count",// 备注
						mapping : "COUNT"// 数据库字段
					}, {
						name : "EquipRepairsInfo_edit_mincount",// 备注
						mapping : "MINCOUNT"// 数据库字段
					}, {
						name : "EquipRepairsInfo_edit_maxcount",// 备注
						mapping : "MAXCOUNT"// 数据库字段
					}, {
						name : "EquipRepairsInfo_edit_equipModelId",// 备注
						mapping : "EQUIP_MODEL_ID"// 数据库字段
					}, {
						name : "EquipRepairsInfo_edit_equipmodelno",// 备注
						mapping : "EQUIP_MODEL_NO"// 数据库字段
					}, {
						name : "EquipRepairsInfo_edit_placePosition",// 备注
						mapping : "PLACE_POSITION"// 数据库字段
					}, {
						name : "EquipRepairsInfo_edit_note",// 备注
						mapping : "NOTE"// 数据库字段
					}]
				});
		var reader = new Ext.data.reader.Json({
			root : "result",
			totalProperty : "totalCounts",
			model : modelid
		});
		return reader;
	}
	repairsgrid0Columns = [
	  {header : "备件ID",	dataIndex : "REPAIRSID",sortable : false,hidden : true},
	  {header : "备件编号",	dataIndex : "REPAIRS_NO",sortable : false,},
	  {header : "备件名称",	dataIndex : "REPAIRS_NAME",sortable : false,},
	  {header : "设备型号ID",	dataIndex : "EQUIP_MODEL_ID",sortable : false,hidden:true},
	  {header : "设备型号",	dataIndex : "EQUIP_MODEL_NAME",sortable : false,},
	  {header : "规格型号",	dataIndex : "REPAIRS_SPECIF",sortable : false,},
	  {header : "备件类型dict",	dataIndex : "REPAIRS_TYPE",sortable : false,hidden : true},
	  {header : "备件类型",	dataIndex : "REPAIRS_TYPE_NAME",sortable : false,},
	  {header : "计量单位dict",	dataIndex : "REPAIRS_UNIT", sortable : false,hidden : true},
	  {header : "计量单位",	dataIndex : "REPAIRS_UNIT_NAME",sortable : false,},
	  {header : "生产厂商dict",	dataIndex : "SUPPLIER", sortable : false,hidden : true},
	  {header : "生产厂商",	dataIndex : "SUPPLIER_NAME",sortable : false,},
	  {header : "经销商dict",	dataIndex : "AGENCY", sortable : false,hidden : true},
	  {header : "经销商",		dataIndex : "AGENCY_NAME",sortable : false,},
	  {header : "数量",		dataIndex : "COUNT",sortable : false,},
	  {header : "最小警戒量",	dataIndex : "MINCOUNT",sortable : false,},
	  {header : "最大警戒量",	dataIndex : "MAXCOUNT",sortable : false,},
	  {header : "存放位置",	dataIndex : "PLACE_POSITION",sortable : false,},
	  {header : "备注",		dataIndex : "NOTE",sortable : false,}
	];
	repairsGrid = function() {
		var rdgridid = getMesRandom("test");
		fd = [{name: "REPAIRSID"},{name: "REPAIRS_NO"},{name: "REPAIRS_NAME"},{name: "EQUIP_MODEL_ID"},
			{name: "EQUIP_MODEL_NAME"},{name: "REPAIRS_SPECIF"},{name: "REPAIRS_TYPE"},
			{name: "REPAIRS_TYPE_NAME"},{name: "REPAIRS_UNIT"},{name: "REPAIRS_UNIT_NAME"},
			{name: "SUPPLIER"},{name: "SUPPLIER_NAME"},{name: "AGENCY"},{name: "AGENCY_NAME"},
			{name: "COUNT"},{name: "MINCOUNT"},{name: "MAXCOUNT"},{name: "PLACE_POSITION"},
			{name: "NOTE"}]	
				
		Ext.define(rdgridid, {
			extend : 'Ext.data.Model',
			fields : fd
		});

		var store = new Ext.data.Store({
			storeId:'repairsStore',
			model:rdgridid,
			pageSize : 15,
			proxy : {
				type : 'ajax',
				actionMethods : 'post',
				url : "equipRepairsData.json",
				reader : {
					root : 'result',
					totalProperty : 'totalCounts'
				},
				// extraParams : params.extraParams
			},
			autoLoad : true
		});

		var grid = Ext.create('Ext.grid.Panel', {
		    title: '自定义panel',
		    store: 'repairsStore',
		    columns: repairsgrid0Columns,
		    height: 200,
		    width: 800,
		    renderTo: Ext.getBody()
		});

		
		return grid;
	};
	repairsGridpanel = function() {
		return new Ext.Panel({
			title : "",
			layout : {
				type : "border"
			},
			border : false,
			flex : 1,
			items : [{
				xtype : "panel",
				title : "",
				region : "center",
				split : true,
				id : "EquipRepairsViewGridpanel0",
				layout : {
					type : "fit"
				},
				flex : 1,
				items : [this.repairsGrid()]
			}]
		});
	};
	repairsPage = function() {

		var page0 = new Ext.Panel({
			id : "EquipRepairsViewPage0",
			layout : {
				type : "hbox"
			},
			height : 35,
			defaults : {
				labelWidth : 85,
				labelAlign : "right",
				xtype : "textfield",
				margins : {
					top : 6,
					right : 4,
					bottom : 4,
					left : 4
				}
			},
			items : [{
					xtype : "textfield",
					fieldLabel : "备件类型",
					labelWidth : 60,
					width : 200,
					id : "repairType",
					listeners : {
						specialkey : function(field, e) {
							if (e.getKey() == e.ENTER) {
								console.log("enter");
							}
						}
					}
				}, {
					xtype : "textfield",
					fieldLabel : "备件名称",
					labelWidth : 60,
					width : 200,
					id : "repairName",
					listeners : {
						specialkey : function(field, e) {
							if (e.getKey() == e.ENTER) {
								console.log("enter");
							}
						}
					}
				}, {
					xtype : "button",
					text : "查询",
					width : 55
				},{
					xtype : "button",
					text : "清空",
					width : 55
				}]
		});
		return page0;
	};
	repairsPanel = function() {
		var panel0 = new Ext.Panel({
			title : "",
			id : "EquipRepairsViewPanel0",
			layout : {
				type : "vbox",
				align : "stretch"
			},
			border : false,
			region : "center",
			items : [this.repairsPage(), this.repairsGridpanel()]
		});
		return panel0;
	};

	var init = function() {

		var a = new Ext.Panel({
			title : "备品备件表",
			id : "EquipRepairsView",
			closable : true,
			layout : {
				type : "border"
			},
			autoScroll : true,
		    height: 500,
		    width: 700,
		    renderTo: Ext.getBody(), // 显示面板
			items : [repairsPanel()]
		});
		return a;
	}
	init().show();



})