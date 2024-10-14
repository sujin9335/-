'use strict';
let HC = Highcharts;
HC.theme = {
		chart: {
			backgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
				stops: [
					[0, '#2a2a2b'],
					[1, '#3e3e40']
				]
			},
			style: {
				fontFamily: '\'Unica One\', sans-serif'
			},
			plotBorderColor: '#606063'
		},
		title: {
			style: {
				color: '#E0E0E3',
				textTransform: 'uppercase',
				fontSize: '20px'
			}
		},
		subtitle: {
			style: {
				color: '#E0E0E3',
				textTransform: 'uppercase'
			}
		},
		xAxis: {
			gridLineColor: '#707073',
			labels: {
				style: {
					color: '#E0E0E3'
				}
			},
			lineColor: '#707073',
			minorGridLineColor: '#505053',
			tickColor: '#707073',
			title: {
				style: {
					color: '#A0A0A3'
				}
			}
		},
		yAxis: {
			gridLineWidth: 0,
			gridLineColor: '#707073',
			labels: {
				format: '{value:,.0f}',
				style: {
					color: '#E0E0E3'
				}
			},
			lineColor: '#707073',
			minorGridLineColor: '#505053',
			tickColor: '#707073',
			tickWidth: 1,
			title: {
				style: {
					color: '#A0A0A3'
				}
			}
		},
		plotOptions: {
			series: {
				dataLabels: {
					color: '#F0F0F3',
					style: {
						fontSize: '13px'
					}
				},
				marker: {
					lineColor: '#333'
				}
			},
			boxplot: {
				fillColor: '#505053'
			},
			candlestick: {
				lineColor: 'white'
			},
			error: {
				color: 'white'
			}
		},
		legend: {
			backgroundColor: 'rgba(0, 0, 0, 0)',
			itemStyle: {
				color: '#E0E0E3'
			},
			itemHoverStyle: {
				color: '#FFF'
			},
			itemHiddenStyle: {
				color: '#606063'
			},
			title: {
				style: {
					color: '#C0C0C0'
				}
			}
		},
		credits: {
			style: {
				color: '#666'
			}
		},
		labels: {
			style: {
				color: '#707073'
			}
		},
		drilldown: {
			activeAxisLabelStyle: {
				color: '#F0F0F3'
			},
			activeDataLabelStyle: {
				color: '#F0F0F3'
			}
		},
		navigation: {
			buttonOptions: {
				symbolStroke: '#DDDDDD',
				theme: {
					fill: '#505053'
				}
			}
		},
		rangeSelector: {
			buttonTheme: {
				fill: '#505053',
				stroke: '#000000',
				style: {
					color: '#CCC'
				},
				states: {
					hover: {
						fill: '#707073',
						stroke: '#000000',
						style: {
							color: 'white'
						}
					},
					select: {
						fill: '#000003',
						stroke: '#000000',
						style: {
							color: 'white'
						}
					}
				}
			},
			inputBoxBorderColor: '#505053',
			inputStyle: {
				backgroundColor: '#333',
				color: 'silver'
			},
			labelStyle: {
				color: 'silver'
			}
		},
		navigator: {
			handles: {
				backgroundColor: '#666',
				borderColor: '#AAA'
			},
			outlineColor: '#CCC',
			maskFill: 'rgba(255,255,255,0.1)',
			series: {
				color: '#7798BF',
				lineColor: '#A6C7ED'
			},
			xAxis: {
				gridLineColor: '#505053'
			}
		},
		scrollbar: {
			barBackgroundColor: '#808083',
			barBorderColor: '#808083',
			buttonArrowColor: '#CCC',
			buttonBackgroundColor: '#606063',
			buttonBorderColor: '#606063',
			rifleColor: '#FFF',
			trackBackgroundColor: '#404043',
			trackBorderColor: '#404043'
		}
	};

HC.setOptions(HC.theme);
HC.setOptions({lang: {thousandsSep: ','}});

  
// var default_color = ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee',
// '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'];
// var default_color = ['#2b908f', '#489897', '#5da1a0', '#80b3b2','#90ee7e','
// #90d982','#6cb35f','#679b5d'];

// var default_color =
// ['#0bfaff','#3ee976','#00FFFF','#2b908f','#07c3ff','#90ee7e','#19ff62','#04c9ff'];
// var default_color =
// ['#0bfaff','#3ee976','#00FFFF','#90ee7e','#2b908f','#07c3ff','#19ff62','#04c9ff'];

// var default_color1 = ['#1f83c4','#64a0b1','#236faf','#6bb0cb'];
// var default_color2 = ['#9b1d1d','#ab422a','#912790','#7d3492'];
 
  
// var default_color1 = ['#29b0eb','#1c79a1','#0dd1d4','#1f8f91'];
// var default_color2 = ['#935eff','#8c70c4','#5b3c99','#baa0f1'];

  
// var default_color1 =
// ['#29b0eb','#1c79a1','#0dd1d4','#1f8f91','#83a3f4','#4b6dcf','#6270a2','#716fac'];
// var default_color2 =
// ['#935eff','#8c70c4','#5b3c99','#baa0f1','#7865c7','#9989b9','#6b5599','#6464eb'];
// var default_color1 =
// ['#29b0eb','#83a3f4','#1c79a1','#4b6dcf','#0dd1d4','#6270a2','#1f8f91','#716fac'];
// var default_color2 =
// ['#935eff','#7865c7','#8c70c4','#9989b9','#5b3c99','#6b5599','#baa0f1','#6464eb'];

// var default_dns = ['#ff0000','#ff6600','#ffcc00','#27ade8'];
// var default_color1 =
// ['#2176b2','#d71413','#20a427','#fb8214','#8c57b9','#bcbe24','#1abfc8','#7f8182'];
// var default_color2 =
// ['#2176b2','#d71413','#20a427','#fb8214','#8c57b9','#bcbe24','#1abfc8','#7f8182'];

// var default_color1 =
// ['#2f4678','#4b774a','#d97a0c','#93d5ed','#d9a82f','#466030','#485f91','#c0461d'];
// var default_color2 =
// ['#798ec3','#467777','#60321a','#457873','#efbf2d','#6175b0','#c0d8da','#d7aa12'];

// 중복-3개-7번째 색부터 녹색
var default_color1 = ['#00FFFF','#00A5FF','#00F5FF','#00AFFF','#00EBFF','#00B9FF','#00E1FF','#00C3FF','#00D7FF','#00CDFF'];
var default_color2 = ['#61F3EB','#1EA4FF','#48DAD2','#32B8FF','#20B2AA','#46CCFF','#82F0F0','#80E12A','#5AC8C8','#BCFF66'];  
var default_color3 = ['#61F3EB','#1EA4FF','#48DAD2','#32B8FF','#20B2AA','#46CCFF','#82F0F0','#80E12A','#5AC8C8','#BCFF66'];  
var default_color4 = ['#61F3EB','#1EA4FF','#48DAD2','#32B8FF','#20B2AA','#46CCFF','#82F0F0','#80E12A','#5AC8C8','#BCFF66','#D72D71','#FCFC0D','#D23F53','#CCFFFF'];  

var area_color=default_color2;
var line_color=default_color2;
var column_color=default_color2;
var bar_color=default_color2;
var pie_color=default_color4;
var pie_polar_color=default_color3;
var spider_color=default_color2;
//var gauge_color=default_color3;
var gauge_color;

var bubble_color=default_color3;
var word_cloud_color=default_color4;

var chart_font_size = 20;
var line_type = "";
function createChart(chart_id, chart_type, labels, dataset, rotation_flag, gline, contents_info, create_flag,create_color, export_btn) {

	
	
	var colorArr = [];
	if(create_color != undefined){
		for(var colorIdx = 0 ; colorIdx < create_color.length; colorIdx++){
			if( colorIdx+1 == create_color[colorIdx].idx){
				colorArr.push(create_color[colorIdx].color)	
			}		
		}					
	}
	

	
	var legend_val = true;
	if(dataset != undefined && dataset.length == 1) {
		legend_val = false;
	}
	
	var export_val = true;
	if(export_btn == undefined) {
		export_val = false;
	}
	
	var chart_option;
	
	if(chart_type == "spider") {
		labels.forEach(function (value,key) {
			if(value.indexOf(".root-servers.net")>-1){
				labels[key] = value.replace(".root-servers.net",".root");
			}else if(value.indexOf(".dns.kr")>-1){
				labels[key] = value.replace(".dns.kr",".kr");
			}
		 });
		chart_option = {
			chart: {
				backgroundColor:"",
				polar: true,
				type: 'column'
			}, 
			title: {
				text: ''
			},
			xAxis: {
				categories: labels,
				tickmarkPlacement: 'on',
				lineWidth: 1,// 0
				labels:{
					style: {
						fontSize:chart_font_size
					}
				}
			},
			
			yAxis: {
				gridLineWidth: 0, // 1
				gridLineInterpolation: 'polygon',
				lineWidth: 0,
				tickPositions: [0,30,50,80,100],
				min: 0,
				max: 100,
				labels:{
					style: {
						fontSize:chart_font_size
					}
				}
			},
			legend: {
				enabled: legend_val,
				align: 'center',
				verticalAlign: 'bottom',
				itemStyle: {
					color: 'white',
					fontWeight: 'bold',
					fontSize: chart_font_size
				}
			},
			series: dataset,
			plotOptions: {
				series: {
					animation: {
						duration: (create_flag ? 3000 : 0)
					},
					lineWidth: 5,
					stacking: 'normal',
					shadow: true,
					groupPadding: 0,
					pointPlacement: 'off'

				}
			}
		}
	} else if(chart_type == "pie") {
		(function(H) {
			H.wrap(H.seriesTypes.pie.prototype, 'animate', function(proceed, init) {
				var series = this,
				points = series.points,
				startAngleRad = series.startAngleRad,
				len = points.length,
				anim = HC.pick(series.options.animation && series.options.animation.duration, 1),
				step = anim / len;
				
				if (!init) {
					HC.each(points, function(point, index) {
						var graphic = point.graphic,
						args = point.shapeArgs;
						
						if (graphic) {
							graphic.attr({
								innerR: 0.1,
								r: 0.1, // animate from inner radius (#779)
								start: args.start,
								end: args.end
							});
							
							// animate
							setTimeout(function() {
								if(series.center != undefined) {
									graphic.animate({
										innerR: (series.center[3] / 2) || 0,
										r: args.r,
										start: args.start,
										end: args.end
									}, series.options.animation);
								}
							}, index * step);
						}
					});
					
					// delete this function to allow it only once
					series.animate = null;
				}
			});
		})(HC)
		
		chart_option = {
			chart: {
				backgroundColor:"",
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: "pie",
				options3d: {
					enabled: true,
					alpha: 35
				}

			},
			title: {
				text: ''
			},
			legend: {
				enabled: false,
				itemStyle: {
					color: 'white',
					fontWeight: 'bold',
					fontSize: chart_font_size
				}
			},
			plotOptions: {
				 series: {
						animation: {
							duration: (create_flag ? 3000 : 0)
						}
					},
					pie: {
						innerSize: '40%',
						depth: 25,
						size: '80%',
						showInLegend: true,
						borderWidth: 0,
						dataLabels: {
							enabled: true,
							style: {
								fontWeight: 'bold',
								color: 'white'
							},
							format: contents_info && contents_info.contents_sub_type && contents_info.contents_sub_type === 'C' ? '<b style="opacity:0.7">{point.name}</b> {point.y}'+getMsgStr('w.cases') : '<b style="opacity:0.7">{point.name}</b> {point.percentage:.1f}%',
							connectorWidth: 1,
							connectorShape:'crookedLine',
							//connectorShape: 'fixedOffset',
							crookDistance:'90%',
							alignTo:'plotEdges'
						}
					}
				},
				
			series: [{
				name: 'Count',
				colorByPoint: true,
				dataLabels: {
					style: {
						fontSize: chart_font_size+2
					}
				},
				data: dataset
			}]
		};
	} else if(chart_type == "pie_polar") {
		chart_option = {
			chart: {
				backgroundColor:"",
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false
			},
			title: {
				text: ''
			},
			plotOptions: {
				sunburst: {
					borderWidth: 0
				},
				series: {
					animation: {
						duration: (create_flag ? 3000 : 0)
					}
				}
			},
			series: [{
				type: "sunburst",
				data: dataset,
				allowDrillToNode: true,
				cursor: 'pointer',
				dataLabels: {
					format: '{point.name}',
					filter: {
						property: 'innerArcLength',
						operator: '>',
						value: 16
					},
					style: {
						fontSize: chart_font_size
					}
				},
				levels: [{
					level: 1,
					levelIsConstant: false,
					dataLabels: {
						filter: {
							property: 'outerArcLength',
							operator: '>',
							value: 64
						},
						style: {
							fontSize: chart_font_size
						}
					}
				}, {
					level: 2,
					colorByPoint: true
				},
				{
					level: 3,
					colorVariation: {
						key: 'brightness',
						to: -0.5
					}
				}, {
					level: 4,
					colorVariation: {
						key: 'brightness',
						to: 0.5
					}
				}]
			}]
		}
	} else if(chart_type == "gauge") {
		gauge_color = colorArr;
		let pane_data = gaugePane(dataset);
		
		(function(H) {
			H.wrap(H.seriesTypes.pie.prototype, 'animate', function(proceed, init) {
				
			});
		})(HC)
		
		chart_option = {
				chart: {
					type: 'solidgauge',
					backgroundColor: 'none',
					events: {
						render: function() {
							var offsetTop = 5,
							offsetLeft = 5;
							var font_size = chart_font_size+'px';
							let this_render = this;
							
							$.each(this_render.series, function(index, value) {
								if (!value.label) {
									this_render.renderer.style = {fontSize: font_size};
									value.label = this_render.renderer
									.label(value.name + " : " + (value.data[0].y), 0, 0, 'rect', 0, 0, true, true)
									.add(this_render.series[0].group);
								}
								value.label.translate(
										this_render.chartWidth / 2 - value.label.width + offsetLeft,
										this_render.plotHeight / 2 - value.points[0].shapeArgs.innerR - (value.points[0].shapeArgs.r - value.points[0].shapeArgs.innerR) / 2 + offsetTop
								);
							});
						}
					}
				},
				title: {
					text: ''
				},
				tooltip: {
					borderWidth: 0,
					backgroundColor: 'none',
					shadow: false,
					style: {
						fontSize: '16px'
					},
					pointFormat: '<span style="color: {point.color};margin-top:-50px; text-align:center;float:left;font-size:2em;">{series.name}</span>'+
								'<span style="font-size:3em; color: {point.color}; font-weight: bold">{point.y}</span>',
					positioner: function(labelWidth) {
						return {
							x: (this.chart.chartWidth - labelWidth) / 2,
							y: (this.chart.plotHeight / 2)
						};
					}
				},
				pane: {
					startAngle: 0,
					endAngle: 360,
					background: pane_data.pane
				},
				yAxis: {
					min: 0,
					max: pane_data.max_length,
					lineWidth: 0,
					tickPositions: []
				},
				plotOptions: {
					solidgauge: {
						dataLabels: {
							enabled: false
						},
						linecap: 'round',
						stickyTracking: false,
						rounded: true
					}
				},
				series: pane_data.series
		}
	}else if(chart_type == "bubble") {
		
		let pane_data = bubblePane(dataset,labels);
				
		chart_option = {
				chart: {
					type: 'packedbubble',
					backgroundColor: ''
				},
				title: {
					text: ''
				},
				tooltip: {
			        useHTML: true,
			        pointFormat: '<b>{pane_data.series.name}:</b> {pane_data.series.value}'
			    },
				yAxis: {
					min: 0,
					max: pane_data.max_length,
					lineWidth: 0,
					tickPositions: []
				},
				legend: {
					enabled: legend_val,
					itemStyle: {
						textDecoration:'underline',
						color: 'white',
						fontWeight: 'bold',
						fontSize: chart_font_size
					},
				},
				states: {
					hover : {
						lineWidthPlus : 0
					}
				},
			    plotOptions: {
			        packedbubble: {
				        marker: {
				            lineWidth: 0,
				            lineColor: null 
				          },
			        	minSize: '30%',
			            maxSize: '100%',
			            zMin: 0,
			            zMax: 1000,
			            layoutAlgorithm: {
			                splitSeries: false,
			                gravitationalConstant: 0.02
			            },
			            events: {
			                click: function (event) {
			                	var bubbleData = {			                		
			                		name : this.name,
			                		data : event.point.options			                		
			                	};			                	
			                	bubble_link_move(bubbleData);
			                }
			            }
			        },			    
			    },
				series: pane_data.series,
		}
		

		
	}else if(chart_type == "word_cloud") {				
				
		chart_option = {
				chart: {					
					backgroundColor:"rgba(47,55,94,0.3)",
					type: 'wordcloud'
				
				},
				 series: [{
				        type: 'wordcloud',
				        data: dataset.data,				       
//				        minFontSize: 7,
				        style: {
						fontFamily: 'Arial',
						name: ''
				        },
				    }],
				    title: {
				        text: ''
				    }
		}		
		
			


		
	} else {
		var point_option = {};
		
		if(chart_type == "line_point") {
			chart_type = "line";
			line_type = "point";
			point_option = {
				lineWidth: 0,
				marker: {
					enabled: true
				},
				animation: {
					duration: (create_flag ? 3000 : 0)
				},
				states: {
					hover: {
						lineWidthPlus: 0
					}
				},
				cursor:'pointer',
				point: {
					events: {
						click: function(e) {
							let point_info = this.series.userOptions;
							if(point_info.pastdata_flag == "Y") {
								let today = new Date();
								let point_time = labels[this.x];
								if(point_time != undefined && point_time != "") {
									let past_date = $("#timeVal").val().substr(0,8)  + 
									point_time.split(":")[0] + 
									point_time.split(":")[1] + '00';
									
									var date = new Date(past_date.replace(
										/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
										'$4:$5:$6 $2/$3/$1'
									));
									
									timePlay(date);
								}
							}
							if(point_info.link_type != undefined && point_info.link_type != null && point_info.link_type != "") {
								if(point_info.link_type == "C") {
									getLinkData(point_info.link_contents, "id", point_info.name)
								} else if(point_info.link_type == "U") {
									if(this.series.userOptions.data[this.category][2] == undefined || this.series.userOptions.data[this.category][2] == "") {
										return false;
									} else {
										let url_result = setMappingData(point_info.link_url + "?id="+this.series.userOptions.data[this.category][2]);
										
										url_result.complete(function (res_data) {											
											linkWindowOpen(res_data.responseText, point_info.name);
										});
									}
								}
							}
						}
					}
				}
			};
		} else {
			line_type = "";
			point_option = {
					marker: {
						enabled: false,
						states: {
							hover: {
								enabled: true,
								radius: 3
							}
						}
					},
					lineWidth: 5,
					animation: {
						duration: (create_flag ? 3000 : 0)
					},
					cursor:'pointer',
					point: {
						events: {
							click: function(e) {
								let point_info = this.series.userOptions;
								if(point_info.pastdata_flag == "Y") {
									let today = new Date();
									let point_time = labels[this.x];
									if(point_time != undefined && point_time != "") {
										let past_date = today.getFullYear() + 
										setZero(today.getMonth()+1) + 
										setZero(today.getDate()) + 
										point_time.split(":")[0] + 
										point_time.split(":")[1] + '00';
										
										var date = new Date(past_date.replace(
											/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
											'$4:$5:$6 $2/$3/$1'
										));
										
										timePlay(date);
									}
								}
								if(point_info.link_type != undefined && point_info.link_type != null && point_info.link_type != "") {
									if(point_info.link_type == "C") {
										getLinkData(point_info.link_contents, "id", point_info.name)
									} else if(point_info.link_type == "U") {
										if(this.series.userOptions.data[this.category][2] == undefined || this.series.userOptions.data[this.category][2] == "") {
											return false;
										} else {
											let url_result = setMappingData(point_info.link_url + "?id="+this.series.userOptions.data[this.category][2]);
											
											url_result.complete(function (res_data) {
												linkWindowOpen(res_data.responseText, point_info.name);
											});
										}
									}
								}
							}
						}
					}
				};
		}
		chart_option = {
			chart: {
				backgroundColor:"",
				type: chart_type
			},
			title: {
				text: null
			},
			subtitle: {
				text: null
			},
			time: {
				useUTC: false
			},
			xAxis: {
				labels:{
					formatter:function() {
						return labels[this.value]
					},
					style: {
						fontSize:chart_font_size - 5
					}
				}
				,gridLineWidth:0
			},
			yAxis: {
				opposite:false,
				title: {
					text: null
				},
				min: 0.6,
				showFirstLabel: false,
				labels:{
						formatter: function() {
						  if (this.value > 1000000) {
							  return HC.numberFormat(this.value / 1000, 0) + "M";
							} else if (this.value > 1000) {
							  return HC.numberFormat(this.value / 1000, 0) + "K";
							} else {
							  return this.value;
							}
						},
					style: {
						fontSize:chart_font_size
					}
				}
			},
			credits: {
				enabled: false
			},
			legend: {
				enabled: legend_val,
				align: 'center',
				verticalAlign: 'bottom',
				itemStyle: {
					fontSize:chart_font_size
				}
			},
			series: dataset,
			rangeSelector: {
				selected: 4,
				inputEnabled: false,
				buttonTheme: {
					visibility: 'hidden'
				},
				labelStyle: {
					visibility: 'hidden'
				}
			},
			plotOptions: {
				series: point_option
				, column: { 
					borderWidth: 0,
					depth: 35
				}, bar: {
					borderWidth: 0
				}
			}
		}
	}
	
	if(chart_type == "column" || chart_type == "line" || chart_type == "area"){
		chart_option.tooltip = {
			useHTML: true,
			formatter: function() {
				var tooltipStr = '<table class="tooltip_style">'
					tooltipStr += '<tr><td style="font-size: '+chart_font_size+'px;">'+ this.series.name+'</td></tr>'
					tooltipStr += '<tr><td style="font-size: '+chart_font_size+'px">'+labels[this.x]+'</td><td style="text-align: right;font-size: '+chart_font_size+'px"><b>'+this.y+'</b></td></tr>'
					tooltipStr += '</table>'; 	
			  return tooltipStr;
			}
		}
	}else if(chart_type == "pie"){
		chart_option.tooltip = {
				useHTML: true,
				formatter: function() {
					var tooltipStr = '<table class="tooltip_style">'
						tooltipStr += '<tr><td style="font-size: '+chart_font_size+'px">'+ this.key+'</td></tr>'
						tooltipStr += '<tr><td style="font-size: '+chart_font_size+'px">'+ this.series.name+'</td><td style="text-align: right;font-size: '+chart_font_size+'px"><b>'+this.y+'</b></td></tr>'
						tooltipStr += '</table>'; 	
				  return tooltipStr;
				}
			}
	}else if(chart_type == "bubble"){
		chart_option.tooltip = {
				useHTML: true,
				formatter: function() {
					var tooltipStr = '<table class="tooltip_style">'
						tooltipStr += '<tr><td style="font-size: '+chart_font_size+'px;">'+ this.series.name+'</td></tr>'
						tooltipStr += '<tr><td style="font-size: '+chart_font_size+'px">'+this.key+'</td></tr>'
						tooltipStr += '<tr><td style="font-size: '+chart_font_size+'px""><b>'+this.y+'</b></td></tr>'
						tooltipStr += '</table>'; 	
				  return tooltipStr;
				}
			}
	} else {
		if(chart_type != "gauge") {
			chart_option.tooltip = {
				useHTML: true,
				formatter: function() {
					var tooltipStr = '<table class="tooltip_style">'
						tooltipStr += '<tr><td style="font-size: '+chart_font_size+'px">'+ this.x+'</td></tr>'
						tooltipStr += '<tr><td style="font-size: '+chart_font_size+'px">'+ this.series.name+'</td><td style="text-align: right;font-size: '+chart_font_size+'px"><b>'+this.y+'</b></td></tr>'
						tooltipStr += '</table>'; 	
					return tooltipStr;
				}
			}
		}
	}
	
	 function getRGB(colorStr,alpha) {
		 
	        let el = document.createElement("div");
	        el.style["background-color"] = colorStr;
	        document.body.appendChild(el);
	        let style = window.getComputedStyle(el);
	        let color = style["backgroundColor"];
	        document.body.removeChild(el);
	    
	        let colorArray = color.replace(/rgb\(/, "").replace(/\)/, "").split(",")
	        	        	       
	        return 'rgba('+colorArray[0]+','+colorArray[1] +','+colorArray[2] +','+ (alpha || 0) +')';
	    }
	 
	 

	if(chart_type == "area" ) {		
	
		if(dataset[0].color != ""){
			
			chart_option.plotOptions.series = {
					
					   fillColor: {
				        	 linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
				        	 stops: [
				        		 [0,dataset[0].color],
				                 [1, Highcharts.color(dataset[0].color).setOpacity(0.17).get('rgba')]
				             ]
				        }
				        
					
			}
			
		}else{
			
			setColor("area");
			chart_option.colors = colorArr;
			chart_option.plotOptions = {
			        area: {
			            fillOpacity: 0.3,
			            
			        },		     
			};	
			
			
		}
			
			
		
				
	
		
		
	} else if(chart_type == "line"){		
		
		setColor("line");
		chart_option.colors = colorArr;
	/*		
		if(line_type=="point"){
			chart_option.yAxis = {
				min:1,max:4,softMin:1,softMax:4,tickInterval:1
			}
		}
		*/
		
		if(gline!=undefined && gline=="y"){
			chart_option.yAxis.plotLines= [{
				color: 'red',
				value: 300,
				width: 3,
				zIndex: 10000,
				dashStyle: 'dash',
				label: {
					text: '300msec',
					align: 'right',
					x: -10,
					style: {
						color: 'white'
					}
				}
			}];
			
			chart_option.chart.events= {
					load: function () {
						var points = []
						this.series.forEach(function (entry) {
							entry.data.forEach(function (theData) {
								points.push(theData.y);
							});
						});
						
						var cnt = Math.max.apply(Math, points);
						if(cnt<300){
							cnt = 350;
						}
						
						this.yAxis[0].update({
							max: cnt
						});
					}
			}
		}
		
		
		
		if(!rotation_flag) {
			var data_arr = [];
			var data_obj = {};
			$.each(dataset, function(index, value) {
				data_obj = {};
				if(index > 0) {
					value.visible = false;
				}
				data_obj = value;
				data_arr.push(data_obj);
			});
			chart_option.series = data_arr;
			
		}
	} else if(chart_type == "spider"){
		setColor("spider");
		chart_option.colors =  colorArr;
	} else if(chart_type == "column"){
		setColor("column");
		chart_option.yAxis = {visible:false};
		chart_option.colors =  colorArr;
		
		chart_option.xAxis.labels = {
				enabled: true,
				formatter:function() {
					var val = labels[this.value];
					if(val!=undefined){
						val =  val.replace(/\ /g,'<br/>');
					}
					return val;
				},
				style: {
					fontSize:chart_font_size
				}
		}
		
		chart_option.chart.options3d = {
			enabled: true,
			alpha: 15,
			beta: 0,
			depth: 100,
			viewDistance: 25
		}
		
		chart_option.plotOptions.series.dataLabels  = {
			enabled: true,
			rotation: 0,
			color: '#FFFFFF',
			align: 'center',
			y: -10, // 10 pixels down from the top
			style: {
				fontSize: chart_font_size
			},
			formatter: function() {
				if (this.y > 1000000) {
					return HC.numberFormat(this.y / 1000, 0) + "M"
				} else if (this.y > 1000) {
					return HC.numberFormat(this.y / 1000, 0) + "K";
				} else {
					return this.y
				}
			}
		}
	} else if(chart_type == "bar"){		
		setColor("bar");
		chart_option.yAxis = {visible:false}
		chart_option.colors =  colorArr;
		
		chart_option.chart.options3d = {
			enabled: true,
			alpha: 0,
			beta: 25,
			depth: 100,
			viewDistance: 20
		}
		
		chart_option.plotOptions.series.dataLabels  = {
			enabled: true,
			rotation: 0,
			color: '#FFFFFF',
			y: -50, // 10 pixels down from the top
			style: {
				fontSize: chart_font_size
			},
			formatter: function() {
				if (this.y > 1000000) {
					return HC.numberFormat(this.y / 1000, 0) + "M"
				} else if (this.y > 1000) {
					return HC.numberFormat(this.y / 1000, 0) + "K";
				} else {
					return this.y
				}
			}
		}
	} else if(chart_type == "pie"){
		setColor("pie");
		chart_option.colors =  colorArr;
	}else if(chart_type == "pie_polar"){
		setColor("pie_polar");
		chart_option.colors =  colorArr;
	}else if(chart_type == "gauge"){
		setColor("gauge");		
		chart_option.colors =  colorArr;
	}else if(chart_type == "bubble"){
		setColor("bubble");
		chart_option.colors =  colorArr;
	}else if(chart_type == "word_cloud"){
		setColor("word_cloud");
		chart_option.colors =  colorArr;
	}
	
	chart_option.exporting= {enabled: export_val};
	const chart_area = document.getElementById(chart_id);
	var this_chart
	if ( chart_area !== undefined && chart_area !== null) this_chart = HC.chart(chart_id, chart_option);
	
	if(chart_type == "line") {
		if(!rotation_flag) {
			var idx = 1;
			setTimeout(function() {
				var this_timer = setInterval(function() {
					var data_arr = [];
					var data_obj = {};
					
					$.each(dataset, function(index, value) {
						// if(dataset[idx] == undefined) {
							// idx = 0;
						// }
						
						data_obj = {};
						if(index == idx) {
							value.visible = true;
						} else {
							value.visible = false;
						}
						data_obj = value;
						data_arr.push(data_obj);
					});
					
					chart_option.series = data_arr;
					$("#"+chart_id).empty();
					if($("#"+chart_id).length > 0){
						if ( chart_area !== undefined && chart_area !== null) this_chart = HC.chart(chart_id, chart_option);
						idx++;
						if(dataset[idx] == undefined) {
							idx = 0;
						}
					}
					
				}, 7000);
				if(contents_info.realtime_flag == "Y") {
					line_reload_timer.push(this_timer);
				} else {
					line_timer.push(this_timer);
				}
			}, 2000);
		}
	}
}

var line_timer = new Array();
var line_reload_timer = new Array();

function setColor(pType){
	/*
	 * if(pType == "area") { if(area_color[0]=="#00FFFF"){ area_color =
	 * default_color1; }else{ area_color = default_color2; } }else if(pType ==
	 * "line"){ if(line_color[0]=="#00FFFF"){ line_color = default_color1;
	 * }else{ line_color = default_color2; } }else if(pType == "spider"){
	 * if(spider_color[0]=="#00FFFF"){ spider_color = default_color1; }else{
	 * spider_color = default_color2; } }else if(pType == "column"){
	 * if(column_color[0]=="#00FFFF"){ column_color = default_color1; }else{
	 * column_color = default_color2; } }else if(pType == "bar"){
	 * if(bar_color[0]=="#00FFFF"){ bar_color = default_color1; }else{ bar_color =
	 * default_color2; } }else if(pType == "pie"){ if(pie_color[0]=="#00FFFF"){
	 * pie_color = default_color1; }else{ pie_color = default_color4; } }else
	 * if(pType == "pie_polar"){ if(pie_polar_color[0]=="#00FFFF"){
	 * pie_polar_color = default_color1; }else{ pie_polar_color =
	 * default_color3; } }else if(pType == "gauge"){
	 * if(gauge_color[0]=="#00FFFF"){ gauge_color = default_color1; }else{
	 * gauge_color = default_color3; } }
	 */
}

function gaugePane(dataset) {
	let pane_size = 112;
	let minus_size = Math.floor(45/dataset.length);
	let pane_array = new Array();
	let pane_obj = new Object();
	
	let series_array = new Array();
	let series_obj = new Object();
	let series_sub_obj = new Object();
	
	let max_length = 0;
	
	$.each(dataset, function(index, value) {
		pane_obj = new Object();
		pane_obj.outerRadius = (pane_size +"%");
		pane_obj.innerRadius = ((pane_size - minus_size) +"%");
		pane_obj.backgroundColor = (HC.Color(HC.getOptions().colors[index]).setOpacity(0.3).get());
		pane_obj.borderWidth = 0;
		pane_array.push(pane_obj);
		
		series_obj = new Object();
		series_sub_obj = new Object();
		series_obj.name = value.name;
		series_sub_obj.color = (gauge_color[index]);
		series_sub_obj.radius = (pane_size +"%");
		series_sub_obj.innerRadius = ((pane_size - minus_size) +"%");
		series_sub_obj.y = value.y;
		series_obj.data = [series_sub_obj];
		if(max_length < value.y) {
			max_length = value.y;
		}
		series_array.push(series_obj);
		
		pane_size = (pane_size - (minus_size+1));
	});
	
	let pane_data = new Object();
	pane_data.pane = pane_array;
	pane_data.series = series_array;
	pane_data.max_length = max_length+(max_length*0.1);
	
	return pane_data;
}

function bubblePane(dataset,labels) {
	let pane_size = 112;
	let minus_size = Math.floor(45/dataset.length);
	let pane_array = new Array();
	let pane_obj = new Object();
	
	let series_array = new Array();
	let data_array = new Array();
	let series_obj = new Object();
	let series_sub_obj = new Object();
	let series_super_sub_obj = new Object();
	
	let max_length = 0;
		
	
	$.each(dataset, function(index, value) {
		pane_obj = new Object();
		pane_obj.outerRadius = (pane_size +"%");
		pane_obj.innerRadius = ((pane_size - minus_size) +"%");
		pane_obj.backgroundColor = (HC.Color(HC.getOptions().colors[index]).setOpacity(0.3).get());
		pane_obj.borderWidth = 0;
		pane_array.push(pane_obj);		
		
		series_obj = new Object();
		data_array = new Array();
		
		series_obj.name = labels[index];				
		
		for(var i=0; i<value.name.length;i++){		
			series_sub_obj = new Object();
			series_super_sub_obj = new Object();

		      for(var key in value){		    	  
		    	 series_sub_obj[key] = value[key][i];
		      }		          
			data_array.push(series_sub_obj)		
		}			 	
			
			series_obj.data = data_array
			series_array.push(series_obj);		
			
			pane_size = (pane_size - (minus_size+1));						
			
	});
	
	let pane_data = new Object();
	pane_data.pane = pane_array;
	pane_data.series = series_array;
	pane_data.max_length = max_length+(max_length*0.1);
	
	return pane_data;
}


