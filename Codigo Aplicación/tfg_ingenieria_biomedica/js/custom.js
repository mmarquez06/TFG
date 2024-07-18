/**************************
VERSION 18/01/2023 - v5
**************************/
var user,docId,chooseuser;
// Variables sesion
var tiempoMiniCiclo=1,altitude=0,altitudReal,limit=0,totaltime=0,cicles=0,altitudet=0,recovery=0,nivelInt2=0,nivelInt=0,SPO2=0,HR=0,BR=0,BV=0,BRacumulado=0,BVacumulado=0;
// Controles
var estadoActual,controlStop=0;
// Calculos tiempo real circulos
var tiempoConsumidoSesion=0,cicloActual=0,tiempoConsumidoCiclo=0,tiempoConsumidoMiniCilo=0;
var tipoMiniCiclo,cuentaAtras1,cuentaAtras2;
var unique=[];
// Reporting
var i90 = [], i88 = [], i86 = [], i84 = [], i82 = [], i80 = [], i78 = [], i76 = [], i74 = [], i72 = [], i70 = [], imenor70 = [];
var HTIscore=0,HTIscoreProgressBar=0,adaptacionAltitud,porcentajeAdaptacion,HTIScoreMax; 
var avgSPO2=0,avgHR=0,avgBR=0,avgBV=0,result=0;
var coef, HTImax2,coefSPO2,coefSPO22,resultadoEntre2,energiaEntre2,energiaEntre3,HTImax;
var resultadoEntreArray= [0],resultadoEntreArrayProgressBar= [0];
var sesionTipo;
var newdates =[];
var igualesE=[],igualesR=[],igualesC=[],igualesT=[],energiaVerde = [],energiaNaranja = [],energiaRoja = [],altitudSArray = [], cargaEArray = [],cargaArray=[],ltl=[],stl=[],lb=[];
// Energy Score
var energySA = 0;
var mensajeES = " ",consejoDelDia= " ";
// Sesion personalizada
var nivelCS,nivelCS2,nivelCS4,resultadoEntre,coefAlt,coefAlt2,newValue;
var energiaEntre=0;
// Trainning premium
var myChart5,myChart6,ctx5,ctx6;
var limitData = [];
var gfrt,trainP;
// Graficas 
Chart.defaults.font.size = 11;
Chart.defaults.font.family = "Titillium Web";
var config,myChart,ctxChar,config2,myChart2,ctx2,config4,ctx4,myChart4;	
// Electronica - asignacion variables
var statusMaquina,statusPulxi,myDataArray,myDataArray2,myDataArray3,tphip,tprec,ncicl,tpses;
var limspo,tipoSesion,objetivoSesion,numeroSesion,sesionDate,icon,sesLevel,programaNivel,levelName;
var SPO2array = [],SPO2arrayCompleto = [],HRarray = [],HRarrayCompleto = [],BRarray = [],BVarray = [],BRacumuladoarrayCompleto = [],BVacumuladoarrayCompleto = [],BRacumuladoarray = [],BVacumuladoarray = [],tpsarray = [];
// Reporting premium 
var myChart7,myChart8,ctx7,ctx8,timestampMS,myChart9,myChart10,ctx9,ctx10,ctx13,myChart13,ctx14,myChart14;
var avgBR1array=[],avgBV1array=[],avgHR1array=[],avgSPO21array=[],date1array=[],nivelDificultadArray=[],altitudArray=[],porcAdaptArray=[];
// Sesion detail
var myChart11,myChart12,ctx11,ctx12;
var ciclosGraph = [],spo290 = [],limsparray = [],frobjetivo=[],limhiperv=[];
var BRarray2=[],BVarray2=[],HRarray2=[],SPO2array2=[],limsparray2,BRarray2_reducido=[],BVarray2_reducido=[],HRarray2_reducido=[],SPO2array2_reducido=[];
// representacion training graph
var th1 = 100;
var tr1,th2,tr2;
var i=0; 
function getDateTime(){return new Date().toLocaleString();}
function sleep(ms){return new Promise(resolve => setTimeout(resolve, ms));}
function secondsToString(seconds) {
	var hour = Math.floor(seconds / 3600);
	hour = (second < 10)? + hour : hour;
	var minute = Math.floor((seconds / 60) % 60);
	minute = (minute < 10)? '0' + minute : minute;
	var second = seconds % 60;
	second = (second < 10)? '0' + second : second;
	if (hour > 0) {
		return hour + "h " + minute + "' " + second + '"';
	} else {
		return minute + "' " + second + '"';
	}
}
function minutesToString(minutes) {
	var hour = Math.floor(minutes / 60);
	hour = (minute < 10)? + hour : hour;
	var minute = minutes % 60;
	minute = (minute < 10)? '0' + minute : minute;
	if (hour > 0) {
		return hour + "h " + minute + "'";
	} else {
		return minute + "'";
	}
}
function hoursToString(hours) {
	var days = Math.floor(hours / 24);
	hours  -= days*24;
	if (days > 0) {
		if (days == 1){
			if (hours == 1) {
				return days + " día y " + hours + " hora desde la última sesión";
			} else {
				return days + " día y " + hours + " horas desde la última sesión";
			}
		} else {
			if (hours == 1) {
				return days + " días y " + hours + " hora desde la última sesión";
			} else {
				return days + " días y " + hours + " horas desde la última sesión";
			}
		}
	} else {
		if (hours == 1) {
			return hours + " hora desde la última sesión";
		} else {
			return hours + " horas desde la última sesión";
		}
	}
}
function hoursToString2(hours) {
	var days = Math.floor(hours / 24);
	hours  -= days*24;
	if (days > 0) {
		if (days == 1){
			if (hours == 1) {
				return days + " día y " + hours + " hora";
			} else {
				return days + " día y " + hours + " horas";
			}
		} else {
			if (hours == 1) {
				return days + " días y " + hours + " hora";
			} else {
				return days + " días y " + hours + " horas";
			}
		}
	} else {
		if (hours == 1) {
			return hours + " hora";
		} else {
			return hours + " horas";
		}
	}
}
var noSleep = new NoSleep();
var document = document.querySelector("#obj-lnoaky450");
document.addEventListener('click', function enableNoSleep() {noSleep.enable();}, false);
/*Android
var pausado = false;
function evitarBloqueo() {
	if ('wakeLock' in navigator) {
		try {
			wakeLock = navigator.wakeLock.request("screen");
			pausado = true;
		} catch (err) {
			pausado = false;
		}
	}
}
function desactivoWakeLock() {
	if (pausado) {
		wakeLock = null;
		pausado = false;
	}
}
*/
// -----------------------------------------------------------------------------------------------------
// 											GRAFICAS CIRCULARES
// -----------------------------------------------------------------------------------------------------
var sizeLabel1,colorLabel1,positionLabel1,sizeLabel2,colorLabel2,positionLabel2,sizeLabel3,colorLabel3,positionLabel3,sizeLabel4,colorLabel4,positionLabel4;
function editLabelsCircle(sl1,cl1,pl1,sl2,cl2,pl2,sl3,cl3,pl3,sl4,cl4,pl4){
	sizeLabel1 = sl1;colorLabel1 = cl1;positionLabel1 = pl1;
	sizeLabel2 = sl2;colorLabel2 = cl2;positionLabel2 = pl2;
	sizeLabel3 = sl3;colorLabel3 = cl3;positionLabel3 = pl3;
	sizeLabel4 = sl4;colorLabel4 = cl4;positionLabel4 = pl4;
}
function addDataSet_V2(label1,label2,label3,label4) {
	config = {
		type: 'doughnut',
		data: {
			datasets: [{
				data: [th1, th2 - th1],
				borderWidth: 0, 
				borderColor: 'rgba(242,227,20, 1.0)',
				backgroundColor: [
				'rgba(242,227,20, 1.0)',  
				'rgba(90, 97, 110, 0.3)',   
				],
				hoverBackgroundColor: [
				'rgba(242,227,20, 1.0)', 
				'rgba(90, 97, 110, 0.3)', 
				]
			},{
				data: [100,0],
				borderWidth: 0,
				borderColor: "Black",
				backgroundColor: [
				'rgba(242,227,20, 0)', 
				'#5A616E',
				],
				hoverBackgroundColor: [
				"#FC6E0C",
				"#5A616E",
				]
			},{
				data: [tr1,tr2 - tr1],
				borderWidth: 0,
				borderColor: "Black",
				backgroundColor: [
				'rgba(254, 248, 253, 1.0)',  
				'rgba(90, 97, 110, 0.3)', 
				],
				hoverBackgroundColor: [
				'rgba(254, 248, 253, 1.0)', 
				'rgba(90, 97, 110, 0.3)',  
				]
			},{
				data: [100,0],
				borderWidth: 0,
				borderColor: "Black",
				backgroundColor: [
				'rgba(242,227,20, 0)',
				'#5A616E',
				],
				hoverBackgroundColor: [
				"#FC6E0C",
				"#5A616E",
				]
			},{
				data: [cicloActual,ncicl - cicloActual],
				borderWidth: 0,
				borderColor: "Black",
				backgroundColor: [
				'rgba(145, 145, 145, 1.0)', 
				'rgba(90, 97, 110, 0.3)',
				],
				hoverBackgroundColor: [
				'rgba(145, 145, 145, 1.0)', 	
				'rgba(90, 97, 110, 0.3)',
				]
			}]
		},
		options: {
			elements: {
				arc: {
					roundedCornersFor: 0
				},
			}, 
			events: [],
			showTooltips: false,
			elements: {
				center: {
					text1: label1,		
					text2: label2,
					text3: label3,
					text4: label4
				}
			},
			animation: {
				animateScale: false,
				animateRotate: false
			},
			legend: {
				display: false
			},
			aspectRatio: 1.55,
			cutout: '70%',
			plugins: {
				customPlugin: {
					consoleText: 'testText'
				}
			}
		},
		plugins: [{
			id: 'customPlugin',
			beforeDraw: (chart, args, options) => {
				if(chart.config.type=='doughnut'){
					
					var width = chart.width,
					height = chart.height,
					ctx = chart.ctx;
					ctx.restore();
					ctx.clearRect(0, 0, 3000, 3000);
					
					var text;
					
					fontSize = (height / sizeLabel1).toFixed(2);  				
					ctx.fillStyle = colorLabel1;  					
					ctx.font = '400 ' + fontSize * 13 + 'px "Titillium Web"';
					text = chart.config.options.elements.center.text1; 
					textX = Math.round((width - ctx.measureText(text).width) / 2);
					textY = (height / positionLabel1) ;  								
					ctx.fillText(text, textX, textY);
					
					fontSize = (height / sizeLabel2).toFixed(2);    	
					ctx.fillStyle = colorLabel2;									
					ctx.font = 'Bold ' + fontSize * 13 + 'px "Titillium Web"';
					text = chart.config.options.elements.center.text2; 
					textX = Math.round((width - ctx.measureText(text).width) / 2);
					textY = (height / positionLabel2) ;    														
					ctx.fillText(text, textX, textY);
					
					fontSize = (height / sizeLabel3).toFixed(2);      					
					ctx.fillStyle = colorLabel3;										
					ctx.font = '100 ' + fontSize * 13 + 'px "Titillium Web"';
					text = chart.config.options.elements.center.text3;
					textX = Math.round((width - ctx.measureText(text).width) / 2);
					textY = (height / positionLabel3) ;     										
					ctx.fillText(text, textX, textY);
					
					fontSize = (height / sizeLabel4).toFixed(2); 							
					ctx.fillStyle = colorLabel4;											
					ctx.font = '400 ' + fontSize * 13 + 'px "Titillium Web"';
					text = chart.config.options.elements.center.text4;
					textX = Math.round((width - ctx.measureText(text).width) / 2);
					textY = (height / positionLabel4);      	
					ctx.fillText(text, textX, textY);
					
					ctx.save();
				}
			}
		}]
	};
	
	async function delayedGreeting() {
		ctxChar = await document.getElementById("obj-txhvmv305").getContext("2d", {alpha: false});
		const oldChart = Chart.getChart(ctxChar);
		if (oldChart) {
			oldChart.destroy();
		}
		myChart = new Chart(ctxChar, config);
	}
	delayedGreeting();
}
async function formatNumber(num) {
	if (!num || num == 'NaN') return '-';
	if (num == 'Infinity') return '&#x221e;';
	num = num.toString().replace(/$|,/g, '');
	if (isNaN(num))
	num = "0";
	sign = (num == (num = Math.abs(num)));
	num = Math.floor(num * 100 + 0.50000000001);
	num = Math.floor(num / 100).toString();
	for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
	num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
	return (((sign) ? '' : '-') + num);
}
// -----------------------------------------------------------------------------------------------------
// 										COMUNICACION ELECTRONICA
// -----------------------------------------------------------------------------------------------------
function onlyUnique(value, index, self) {return self.indexOf(value) === index;}
function readElectronica(){
	async function delayedGreeting() {
		
		const dbRef = firebase.database().ref('energy/' + docId);
		dbRef.on('value', (snapshot) => {
			myDataArray = snapshot.val().data;
			estadoActual = snapshot.val().estadoActual;
		});
		
		if (myDataArray == undefined || myDataArray == null || myDataArray == NaN) {myDataArray = "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0";}
		var arrayStrings =  String(myDataArray).split(",");
		console.log('myDataArray readElectronica: ' + myDataArray);
		console.log('estado actual: ' + estadoActual);
		
		// Asignar variables
		BRacumulado 			= parseInt(arrayStrings[0]);
		BVacumulado				= Number((parseFloat(arrayStrings[1])/10).toFixed(2)); 
		HR						= parseInt(arrayStrings[2]);
		SPO2 					= parseInt(arrayStrings[3]);
		statusPulxi				= parseInt(arrayStrings[5]);
		tiempoConsumidoSesion	= parseInt(arrayStrings[6]);
		limspo 					= parseInt(arrayStrings[11]);
		statusCaudalimetro		= parseInt(arrayStrings[14]);
		BR 						= parseInt(arrayStrings[15]);
		BV 						= Number((parseFloat(arrayStrings[16])/10).toFixed(2)); 
		altitude				= Number(parseFloat(arrayStrings[4]).toFixed(2));
		
		if (estadoActual != 4) {ncicl = 0;} 
		
		if (BRacumulado<0){BRacumulado=0;}if (BVacumulado<0){BVacumulado=0;}if (BR<0){BR=0;}if (BV<0){BV=0;}
		
		if (tpses != 0) {totaltime=tpses;}else{totaltime=totaltime*60;} 
		
		if (estadoActual == 4 && SPO2 != null && HR != null && BV != null && BR != null && BVacumulado != null && BRacumulado != null && tiempoConsumidoSesion != null && limspo != null && myDataArray !=  "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0") {			
			tphip 					= parseInt(arrayStrings[7])*60;
			tprec 					= parseInt(arrayStrings[8])*60;
			tpses 					= parseInt(arrayStrings[10])*60;
			altitudReal 			= parseInt(arrayStrings[12]);
			nivelInt 				= Number(eval(nivelCS4).toFixed(2));
			nivelInt2				= Number((eval(nivelCS4)/tpses).toFixed(2));
			ncicl = parseInt(arrayStrings[9]);
			desconnect = false;
			SPO2array = [...SPO2array,parseInt(SPO2),];
			SPO2arrayCompleto = [...SPO2arrayCompleto,parseInt(SPO2),];
			HRarray = [...HRarray,parseInt(HR),];
			HRarrayCompleto = [...HRarrayCompleto,parseInt(HR),];
			BRacumuladoarrayCompleto = [...BRacumuladoarrayCompleto,BRacumulado,];
			BVacumuladoarrayCompleto = [...BVacumuladoarrayCompleto,BVacumulado,];
			BRacumuladoarray = [...BRacumuladoarray,BRacumulado,];
			BVacumuladoarray = [...BVacumuladoarray,BVacumulado,];
			BRarray = [...BRarray,BR,];
			BVarray = [...BVarray,BV,];
			tpsarray = [...tpsarray,parseInt(tiempoConsumidoSesion),];
		} 
		
		var machine = document.getElementById('obj-cgvcwh151');  
		var sensor = document.getElementById('obj-jgexmm973');  
		if (tpsarray.length>20){
			var tpsarray2 = tpsarray.slice(tpsarray.length-20);
			unique = tpsarray2.filter(onlyUnique);
			if (unique.length == 1) {
				desconnect = true;
				machine.style.color = 'rgb(204,204,204)'; 
				sensor.style.color = 'rgb(204,204,204)'; 
			} else {
				desconnect = false;
				machine.style.color = 'rgb(43,159,42)'; 
				if (statusPulxi == 1) {
					sensor.style.color = 'rgb(43,159,42)'; 
				} else if (statusPulxi == 0){
					sensor.style.color = 'rgb(204,204,204)'; 
				} else if (statusPulxi == 2){
					sensor.style.color = '#FA3824'; 
				}	
			}	
		} else {
			desconnect = false;
			machine.style.color = 'rgb(43,159,42)'; 
			if (statusPulxi == 1) {
				sensor.style.color = 'rgb(43,159,42)'; 
			} else if (statusPulxi == 0){
				sensor.style.color = 'rgb(204,204,204)'; 
			} else if (statusPulxi == 2){
				sensor.style.color = '#FA3824'; 
			}	
		}
	}
	delayedGreeting();	
}
function checkIconos() {
	var machine = document.getElementById('obj-cgvcwh151');  
	var sensor = document.getElementById('obj-jgexmm973');  
	if (desconnect == false) {
		machine.style.color = 'rgb(43,159,42)'; 
		if (statusPulxi == 1) {
			sensor.style.color = 'rgb(43,159,42)'; 
		} else if (statusPulxi == 0){
			sensor.style.color = 'rgb(204,204,204)'; 
		} else if (statusPulxi == 2){
			sensor.style.color = '#FA3824'; 
		}
	} else {
		machine.style.color = 'rgb(204,204,204)'; 
		sensor.style.color = 'rgb(204,204,204)';   
	}
}
// -----------------------------------------------------------------------------------------------------
// 										LOGIN - INICIO APP
// -----------------------------------------------------------------------------------------------------
function checkSession() {
	async function delayedGreeting() {
		
		let fetchEstadoini = await fetch('https://ialtitude-esp32-default-rtdb.europe-west1.firebasedatabase.app/energy/'+String(docId)+'/estadoActual.json?&print=pretty');
		let myDataArrayini =  await fetchEstadoini.json();
		let arrayStringsini =  String(myDataArrayini).split(",");
		let estadoActualini = parseInt(arrayStringsini[0]);
		
		await sleep(1000);
		
		if (estadoActualini != 0) {
			app.dialog.alert("Hay un entrenamiento activo en otro dispositivo. Las medias mostradas no contienen los valores ya calculados, pero podrá visualizarlos una vez finalizada la sesión en Resultados.");
			estadoActual = estadoActualini;
			setTimeout(function() {seguirEntreno();},1000);
		} 
	}
	delayedGreeting();
}
function seguirEntreno() {
	app.tab.show("#toolbar-o-tphrnx030-subtab-3",true);
	controlStop = 1;
	
	var stopB = document.getElementById('obj-dhjxgy049'); 
	stopB.style.pointerEvents = 'auto';
	stopB.style.opacity = "1.0";
	stopB.style.color = 'rgb(242,227,20)';
	
	var start = document.getElementById('obj-lnoaky450'); 
	start.style.pointerEvents = 'none';
	start.style.opacity = "1.0";
	start.style.color = 'rgb(204,204,204)';
	
	document.getElementById('toolbar-o-tphrnx030').style.pointerEvents = 'none'; 
	document.getElementById('toolbar-o-tphrnx030').style.opacity = "0.5";
	
	let sesionInfo;
	const dbRef = firebase.database().ref('energy/' + docId);
	dbRef.on('value', (snapshot) => {
		sesionInfo = snapshot.val().session;
	});
	
	var arraySesInf =  String(sesionInfo).split(",");
	patronRespiratorio = Number(parseInt(arraySesInf[9]));
	if (String(patronRespiratorio)=='NaN'){patronRespiratorio=10;}
	
	$('#patronResp').removeClass("anim-circle");
	$('#patronResp').css("-webkit-animation-duration", patronRespiratorio+"s");
	$('#patronResp').addClass("anim-circle");
	
	trainning();
}
function cancel() {	
	stopSession();
	end();
}
app.on('appLoaded',function (e){
	if (firebase) {
		setTimeout(function() {firebasePlugin.showLoginScreen();},3000);
	}
});
$(document).on("click", "#submit_firebase-signin", function(e){
	let email = document.getElementById("firebase_email").value;
	firebase.auth().onAuthStateChanged(function (user) {
		if (user.email==email) {
			// Check numero dispositivo true	
			const userD = firestoredb.collection('thorium.users');
			userD.where('email','==',String(user.email)).get().then((querySnapshot) => {
				if (querySnapshot.empty) {
					console.log('no existe doc en thorium users')
				} else {
					querySnapshot.forEach((doc) => {
						let numSerie = doc.data().numSerieDispositivo;
						console.log('numSerie es ' + numSerie);
						if (numSerie != "") {
							thoriumCorePlugin.loadpage("home",null,null);
							chooseuser = 1;						} else {
								thoriumCorePlugin.loadpage("enlazar_dispositivo",null,null);				
							}
						});
					}
				});
			}
		});
	});
	
	$(document).on("click", "#submit_firebase-register", function(e){
		firebase.auth().onAuthStateChanged(function (user) {
			register(user.uid);
			setTimeout(function() {thoriumCorePlugin.loadpage("enlazar_dispositivo",null,null);},1500);
		});
	});
	
	function register(user) {
		
		docId = user;
		
		/*firebase.database().ref('energy/' + docId).set({
			data: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
			session: "0,0,0,0,0,0,0,0,0",
			program: "0,0,0,0,0,0",
			estadoActual: 0,
		});
		firebase.database().ref('energy/' + docId).off();
		
		const regT = firestoredb.collection('programs').doc(String(docId)).collection('reporting').doc('registroSesiones');
		const data14 = {
			tiempoTotal: "0'",
			sesionesCalentamiento: 0,
			sesionesRecovery: 0,
			sesionesTrainning: 0
		}
		regT.set(data14);
		
		const EnS = firestoredb.collection('programs').doc(String(docId)).collection('reporting').doc('energyScore');
		const data13 = {
			acumulado: 0
		}
		EnS.set(data13);*/
		
		const newData = {numSerieDispositivo: ""};
		setTimeout(function() {firestoredb.collection('thorium.users').doc(String(docId)).update(newData);},2000);
	}
	
	function registroPoliticaOK() {
		thoriumCorePlugin.loadpage("chooseuser",null,null);
		chooseuser = 1;
	}
	
	// -----------------------------------------------------------------------------------------------------
	// 									CHOOSE USER
	// -----------------------------------------------------------------------------------------------------
	function generarDatos(id) {
		firebase.database().ref('energy/' + id).once('value', (snapshot) => {
			estadoActual = snapshot.val().estadoActual;
			if (estadoActual != 0) {
				const estado = {estado: "(Entrenando)"};
				firestoredb.collection('thorium.users').doc(String(id)).update(estado);
			} else {
				const estado = {estado: "(Desconectado)"};
				firestoredb.collection('thorium.users').doc(String(id)).update(estado);
			}
		});
		
		const fstore = firestoredb.collection('programs').doc(id).collection('entrenoProgramado');
		fstore.get().then((querySnapshot) => {
			if (querySnapshot.empty) {
				firestoredb.collection('thorium.users').doc(String(id)).update({entrenoProgramado: 'no'});
			} else {
				firestoredb.collection('thorium.users').doc(String(id)).update({entrenoProgramado: 'si'});
			}
		}).catch(function (error) {
			console.log('Error al escribir entreno programado: ' + error)
		});
		
		let energy,fatiga;
		const EnS = firestoredb.collection('programs').doc(String(id)).collection('reporting');
		EnS.orderBy("acumulado","desc").limit(1).get().then((querySnapshot) => {
			querySnapshot.forEach(function (doc) {
				energy = Number(doc.data().acumulado);
				fatiga = Number(doc.data().fatigaHipoxica);
				if (String(fatiga) == 'NaN') {
					fatiga = 0;
				}
			});
			if (querySnapshot.empty) {
				energy=fatigaHipoxica=0;
			} 
			const miEnergia = {energyScore: Number(energy.toFixed(2)), fatigaHipoxica: Number(fatiga.toFixed(2))};
			firestoredb.collection('thorium.users').doc(String(id)).update(miEnergia);
		}).catch(function (error) {
			console.log('Error al escribir energia: ' + error)
		});	
		
		let date,timestamp,diferencia,difString;
		const avgData = firestoredb.collection('programs').doc(String(id)).collection('sessions');
		avgData.orderBy("timestamp","desc").limit(1).get().then((querySnapshot) => {
			querySnapshot.forEach(function (doc) {
				timestamp = doc.data().timestamp * 1000;
				let date3 = new Date(timestamp);
				let hours72 = Date.now();
				diferencia = (hours72 - timestamp)/(1000*3600);
				date = "Última sesión: " + String(date3.getDate()+"-"+(date3.getMonth()+1)+"-"+date3.getFullYear());
			});
			if (querySnapshot.empty) {
				date="Sin sesión en los últimos 30 días";timestamp=0;diferencia=75;
			} 
			if (diferencia >= 72) {difString='mas72h';} else {difString='menos72h';}
			const lastS = {fechaUltimaSesion: date,fechaUSms: timestamp,diferencia:difString};
			firestoredb.collection('thorium.users').doc(String(id)).update(lastS);
		}).catch(function (error) {
			console.log('Error al escribir fecha ultima sesion y diferencia: ' + error)
		});	
	}
	
	function generarRepeater(usuarioCorreo,campoFiltro,orden,repeater,campoFiltro2,orden2,campoFiltro3,orden3) {
		let query = firestoredb.collection("thorium.users");
		query = query.where(campoFiltro,'==',orden);
		if (campoFiltro2!=null&&orden2!=null){
			query = query.where(campoFiltro2,'==',orden2);
		}
		if (campoFiltro3!=null&&orden3!=null){
			query = query.where(campoFiltro3,'==',orden3);
		}
		let items = [];
		var i=0;
		let myVLContainer=document.getElementById("virtual-list-"+String(repeater));
		let template = document.getElementById("virtual-list-" +String(repeater)+ "-template").innerHTML;
		if (usuarioCorreo == "admin@ialtitude.es") {
			query.orderBy("email","asc").get().then(function (querySnapshot) {
				querySnapshot.forEach(function (doc) {
					let item = doc.data();
					item["uid"] = doc.id;
					item["dataindex"] = i;
					items.push(item);
					i=i+1;
				});
				thoriumCorePlugin.renderVirtualListFromData(myVLContainer, items,template);
				document.getElementById('obj-28205').style.opacity = "1.0";
				document.getElementById('obj-28259').style.opacity = "1.0";
				document.getElementById('obj-28279').style.opacity = "1.0";
			}).catch(function (error) {
				app.dialog.alert("Algo ha salido mal. Error = " + error);
			});	
		} else {
			query.orderBy("email","asc").where('miEntrenador','==',String(usuarioCorreo)).get().then(function (querySnapshot) {
				querySnapshot.forEach(function (doc) {
					let item = doc.data();
					item["uid"] = doc.id;
					item["dataindex"] = i;
					items.push(item);
					i=i+1;
					let correo = doc.data().correo;
					let nombre = doc.data().displayName;
					if (orden3 == 'mas72h' && chooseuser == 1) {
						firestoredb.collection('mail').add({
							to: `${correo}`,
							message: {
								subject: 'Recordatorio sesión programada',
								text: `Hola ${nombre}, tu entrenador te programó una sesión hace más de 72h. Es conveniente que la realices lo antes posible para no perder el Energy Score adquirido. Accede a la app para verla.`,
								html: `Hola ${nombre}, tu entrenador te programó una sesión hace más de 72h. Es conveniente que la realices lo antes posible para no perder el Energy Score adquirido. Accede a la app para verla.`,
							}
						})
						chooseuser = 2;
					}
				});
				thoriumCorePlugin.renderVirtualListFromData(myVLContainer, items,template);
				document.getElementById('obj-28205').style.opacity = "1.0";
				document.getElementById('obj-28259').style.opacity = "1.0";
				document.getElementById('obj-28279').style.opacity = "1.0";
			}).catch(function (error) {
				app.dialog.alert("Algo ha salido mal. Error = " + error);
			});	
		}
	}
	
	function actualizarRepeaters() {
		async function delayedGreeting() {
			
			var correoUsuario = firebase.auth().currentUser.email;
			
			document.getElementById('obj-28205').style.opacity = "0.0";
			document.getElementById('obj-28259').style.opacity = "0.0";
			document.getElementById('obj-28279').style.opacity = "0.0";
			
			if (correoUsuario == "admin@ialtitude.es") {
				const avgData = firestoredb.collection('thorium.users');
				avgData.orderBy("email","asc").get().then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						generarDatos(doc.id);
					});
				});	
			} else {
				const avgData = firestoredb.collection('thorium.users');
				avgData.orderBy("email","asc").where('miEntrenador','==',String(correoUsuario)).get().then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						generarDatos(doc.id);
					});
				});	
			}
			
			await sleep(5000);
			
			firebasePlugin.resetRepeaters();
			generarRepeater(correoUsuario,"estado","(Entrenando)","obj-28026",null,null,null,null);
			generarRepeater(correoUsuario,"entrenoProgramado","no","obj-28246",null,null,null,null);
			generarRepeater(correoUsuario,"entrenoProgramado","si","obj-28266","diferencia",'menos72h',null,null);
			generarRepeater(correoUsuario,"entrenoProgramado","si","obj-28286",null,null,"diferencia",'mas72h');
			app.preloader.hide();
		}
		delayedGreeting();
	}
	
	$(document).on('page:beforein','.page[data-name="chooseuser"]', function (e,page) {
		setTimeout(function() {app.preloader.show();},1000);
		actualizarRepeaters();
	});
	
	// Cambiamos de usuario desde navigation - energy score
	$(document).on("click", "#obj-xwarvf228", function(e){
		e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
	});
	
	// Cambiamos de usuario desde navigation - session swiper
	$(document).on("click", "#obj-28667", function(e){
		e.preventDefault();
		controlCambioUsuario = 1;
		app.preloader.show();
		setTimeout(function() {thoriumCorePlugin.backToPreviousPage();app.preloader.hide();},2000);
	});
	
	// Abrimos cuadro energias
	$(document).on("click", "#obj-28196", function(e){
		e.preventDefault();
		thoriumCorePlugin.loadpage("cuadroenergias",null,null);
	});
	
	function cuadroEnergias(orden) {
		async function delayedGreeting() {
			var user = firebase.auth().currentUser.email;
			let query = firestoredb.collection("thorium.users");
			query = query.orderBy(orden,"desc");
			let items = [];
			var i=0;
			let myVLContainer=document.getElementById("virtual-list-obj-28345");
			let template = document.getElementById("virtual-list-obj-28345-template").innerHTML;
			if (user == "admin@ialtitude.es") {
				query.get().then(function (querySnapshot) {
					querySnapshot.forEach(function (doc) {
						let item = doc.data();
						item["uid"] = doc.id;
						item["dataindex"] = i;
						items.push(item);
						i=i+1;				
					});
					thoriumCorePlugin.renderVirtualListFromData(myVLContainer, items,template);
					$ ('#obj-28388').text(items.length); 
				}).catch(function (error) {
					app.dialog.alert("Algo ha salido mal. Error = " + error);
				});	
			} else {
				query.where('miEntrenador','==',String(user)).get().then(function (querySnapshot) {
					querySnapshot.forEach(function (doc) {
						let item = doc.data();
						item["uid"] = doc.id;
						item["dataindex"] = i;
						items.push(item);
						i=i+1;
					});
					thoriumCorePlugin.renderVirtualListFromData(myVLContainer, items,template);
					$ ('#obj-28388').text(items.length); 
				}).catch(function (error) {
					app.dialog.alert("Algo ha salido mal. Error = " + error);
				});	
			}
		}
		delayedGreeting();
	}
	
	// Ordenar usuario de mayor a menor Energy Score
	$(document).on("click", "#obj-28833", function(e) {
		async function delayedGreeting() {
			e.preventDefault();
			firebasePlugin.resetRepeaters();
			cuadroEnergias("energyScore");
		}
		delayedGreeting();
	});
	
	// Ordenar usuario de mayor a menor Fatiga Hipóxica
	$(document).on("click", "#obj-28834", function(e) {
		async function delayedGreeting() {
			e.preventDefault();
			firebasePlugin.resetRepeaters();
			cuadroEnergias("fatigaHipoxica");
		}
		delayedGreeting();
	});
	
	$(document).on('page:beforein','.page[data-name="cuadroenergias"]', function (e,page) {
		var page = e.detail;
		cuadroEnergias("energyScore");
	});
	
	// Abrimos mis datos
	$(document).on("click", "#obj-28202", function(e){
		e.preventDefault();
		thoriumCorePlugin.loadpage("misdatos",null,null);
	});
	
	// Volvemos a choose user
	$(document).on("click", "#obj-27631", function(e){
		//e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
	});
	
	// Volvemos a choose user
	$(document).on("click", "#obj-27629", function(e){
		//e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
	});
	
	// -----------------------------------------------------------------------------------------------------
	// 										ENTRADA EN PERFIL USUARIO
	// -----------------------------------------------------------------------------------------------------
	function ini(user){
		async function delayedGreeting() {
			
			docId = user;
			
			SPO2array = SPO2arrayCompleto = HRarray = HRarrayCompleto = BRarray = BVarray = tpsarray = BRacumuladoarrayCompleto = BVacumuladoarrayCompleto = BRacumuladoarray = BVacumuladoarray = resultadoEntreArray = resultadoEntreArrayProgressBar = [];	
			controlCambioUsuario = estadoActual = myDataArray2 = myDataArray3 = tiempoConsumidoSesion = HTIscore = energiaEntre = HTIscoreProgressBar = controlStop = 0;
			
			newdates =[];
			for (var i=0;i<60;i++) {
				let sumadorDias = new Date();
				sumadorDias.setDate((sumadorDias.getDate() - 59) + i);
				let dia = sumadorDias.getDate();
				dia = (dia < 10)? '0' + dia : dia;
				let mes = sumadorDias.getMonth()+1;
				mes = (mes < 10)? '0' + mes : mes;
				newdates.push(String(dia+"/"+mes));
			}
			
			miobjetivo();
			
			const sesionConfig = firestoredb.collection("formulas").doc("energy");
			const doc = await sesionConfig.get();
			if (!doc.exists) {
			} else {
				coefAlt2 = doc.data().coefAlt;
				nivelCS2 = doc.data().nivelDificultad;
				nivelCS4 = doc.data().nivelInt;
			}
			
			editLabelsCircle(100,"#FFFEFE",3.10,90,"#FFFEFE",2.10,130,"#FFFEFE",1.60,150,"#FFFEFE",1.35);
			addDataSet_V2("","CLICK","ENTRENOS","");
			
			let fetchEstadoini = await fetch('https://ialtitude-esp32-default-rtdb.europe-west1.firebasedatabase.app/energy/'+String(docId)+'/estadoActual.json?&print=pretty');
			let myDataArrayini =  await fetchEstadoini.json();
			let arrayStringsini =  String(myDataArrayini).split(",");
			let estadoActualini = parseInt(arrayStringsini[0]);
			
			app.tab.show("#toolbar-o-tphrnx030-subtab-2",true);
			
			await sleep(1000);
			
			if (estadoActualini != 0) {
				document.getElementById('tabs-o-hvcywn610').style.opacity = "1.0"; 
				app.dialog.alert("Hay un entrenamiento activo en otro dispositivo. Las medias mostradas no contienen los valores ya calculados, pero podrá visualizarlos una vez finalizada la sesión en Resultados.");
				estadoActual = estadoActualini;
				setTimeout(function() {seguirEntreno();},1000);
			} else {
				app.tab.show("#toolbar-o-tphrnx030-subtab-1",true);
				var start = document.getElementById('obj-lnoaky450'); 
				start.style.opacity = "0.0";
				start.style.pointerEvents = 'none';
				var stopB = document.getElementById('obj-dhjxgy049'); 
				stopB.style.opacity = "0.0";
				stopB.style.pointerEvents = 'none'; 
				reporting();
			}
			app.preloader.hide();
		}
		delayedGreeting();
	}
	
	let fechaobjetivo="", diashastaobjetivo;
	function miobjetivo() {
		async function delayedGreeting() {
			let descripcionobjetivo="",nombreobjetivo="",dia = "",mmaa = "",fechasplit=[];
			let usermail = document.getElementById("div-28583").textContent;
			usermail= usermail.replace(/ /g, "");
			
			const avgData = firestoredb.collection('thorium.users');
			avgData.where('email','==',String(usermail)).get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					fechaobjetivo = doc.data().fechaObjetivo;
					nombreobjetivo = doc.data().nombreObjetivo;
					descripcionobjetivo = doc.data().descripcionObjetivo;
					if (fechaobjetivo==undefined) {
						dia='DD';
						mmaa='MM/AA';
						document.getElementById('obj-28693').style.color = 'rgb(204,204,204)';
						document.getElementById('obj-28705').style.color = 'rgb(204,204,204)';
						document.getElementById('obj-28694').style.color = 'rgb(204,204,204)';
						document.getElementById('obj-28706').style.color = 'rgb(204,204,204)';
						document.getElementById('obj-28689').style.borderColor = 'rgb(204,204,204)';
						document.getElementById('obj-28701').style.borderColor = 'rgb(204,204,204)';
						document.getElementById('obj-28688').style.opacity = "0.5";
						document.getElementById('obj-28700').style.opacity = "0.5";
					} else {
						fechasplit = fechaobjetivo.split("/");
						dia = fechasplit[0];
						let ano = fechasplit[2].split("");
						mmaa = fechasplit[1]+"/"+String(ano[2])+String(ano[3]);
						
						var dateParts = fechaobjetivo.split("/");
						var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
						var dateNow = new Date();
						
						let fechahoy = Math.floor(dateNow.getTime()/100000000);
						let fechaobj = Math.floor(dateObject.getTime()/100000000);
						
						if (fechaobj < fechahoy) {
							dia='DD';
							mmaa='MM/AA';
							nombreobjetivo='Sin objetivo definido';
							descripcionobjetivo = "Debe actualizar el objetivo, la fecha ha pasado.";
							document.getElementById('obj-28693').style.color = 'rgb(204,204,204)';
							document.getElementById('obj-28705').style.color = 'rgb(204,204,204)';
							document.getElementById('obj-28694').style.color = 'rgb(204,204,204)';
							document.getElementById('obj-28706').style.color = 'rgb(204,204,204)';
							document.getElementById('obj-28689').style.borderColor = 'rgb(204,204,204)';
							document.getElementById('obj-28701').style.borderColor = 'rgb(204,204,204)';
							document.getElementById('obj-28688').style.opacity = "0.5";
							document.getElementById('obj-28700').style.opacity = "0.5";
						} else if (dateObject.getDate() == dateNow.getDate() && dateObject.getMonth() == dateNow.getMonth() && dateObject.getFullYear() == dateNow.getFullYear()) {
							descripcionobjetivo = "Hoy se cumple el objetivo.";
							document.getElementById('obj-28693').style.color = 'FA3824';
							document.getElementById('obj-28705').style.color = 'FA3824';
							document.getElementById('obj-28694').style.color = 'FA3824';
							document.getElementById('obj-28706').style.color = 'FA3824';
							document.getElementById('obj-28689').style.borderColor = 'FA3824';
							document.getElementById('obj-28701').style.borderColor = 'FA3824';
							document.getElementById('obj-28688').style.opacity = "1.0";
							document.getElementById('obj-28700').style.opacity = "1.0";
						} else {
							diashastaobjetivo = Math.floor(dateObject.getTime()/86400000)-Math.floor(dateNow.getTime()/86400000);
							document.getElementById('obj-28693').style.color = 'rgb(242,227,20)';
							document.getElementById('obj-28705').style.color = 'rgb(242,227,20)';
							document.getElementById('obj-28694').style.color = 'rgb(242,227,20)';
							document.getElementById('obj-28706').style.color = 'rgb(242,227,20)';
							document.getElementById('obj-28689').style.borderColor = 'rgb(242,227,20)';
							document.getElementById('obj-28701').style.borderColor = 'rgb(242,227,20)';
							document.getElementById('obj-28688').style.opacity = "1.0";
							document.getElementById('obj-28700').style.opacity = "1.0";
						} 
					}
				});
				$ ('#obj-28693').text(dia); 
				$ ('#obj-28705').text(dia); 
				$ ('#obj-28694').text(mmaa); 
				$ ('#obj-28706').text(mmaa);
				$ ('#obj-28696').text(nombreobjetivo); 
				$ ('#obj-28708').text(nombreobjetivo); 
				$ ('#obj-28697').text(descripcionobjetivo); 
				$ ('#obj-28709').text(descripcionobjetivo); 
			}).catch(function (error) {
				console.log(error);
			});	
		}
		delayedGreeting();
	}
	
	$(document).on('page:init','.page[data-name="navigation"]', function (e,page) {
		var page = e.detail;
		nivelCS = 5.1;
		document.getElementById('tabs-o-hvcywn610').style.opacity = "0.0";
		user = document.getElementById('displayer-28431').getAttribute('data-parent-key');
		setTimeout(function() {ini(user);},1000);
	});
	
	$(document).on('page:mounted','.page[data-name="miperfil"]', function (e,page) {
		var page = e.detail;
		var myform = document.querySelector('#obj-27033');
		myform.setAttribute("data-loaded",false);
		firestorePlugin.singleRecordFormInit(myform);
	});
	
	// -----------------------------------------------------------------------------------------------------
	// 										STOP TRAINNING SESSION
	// -----------------------------------------------------------------------------------------------------
	// Boton de stop en Session
	$(document).on("click", "#obj-dhjxgy049", function(e){
		e.preventDefault();
		app.dialog.confirm("¡Atención! Si detienes el entrenamiento, se perderán todos los datos. ¿Estás seguro?",stopSession,null);
	});
	
	function stopSession() {
		console.log('se pulso stop');
		relojInterno = totaltime = -tpses;
		tiempoConsumidoSesion = tpses = controlStop = totaltime = 1;
		estadoActual = 0;
		cicloActual = ncicl;
		
		firebase.database().ref('energy/' + docId).update({
			data: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
			session: "0,0,0,0,0,0,0,0,0",
			program: "0,0,0,0,0,0",
			estadoActual: 0
		});
		firebase.database().ref('energy/' + docId).off();
	}
	
	// -----------------------------------------------------------------------------------------------------
	// 							       	EJECUCION DE UNA SESION DE ENTRENAMIENTO
	// -----------------------------------------------------------------------------------------------------
	// onClick toolbar para detectar si comienza una sesion desde otro dispositivo cuando el usuario navega entre pestañas
	$(document).on("click", "#toolbar-o-tphrnx030", function(e){
		e.preventDefault();
		checkSession();
		console.log('ejecutand checksession por tootlbar')
	});
	
	function paintTrainningSession(){
		async function delayedGreeting() {  
			
			$ ('#obj-kcdcjy036').text(await SPO2);                			
			$ ('#obj-uawkjo295').text(await limspo);             			
			$ ('#obj-rwkykd657').text(await HR);                			
			$ ('#obj-kurlgg469').text(await avgHR); 
			$ ('#obj-yxfouh403').text(await BRacumulado);                
			$ ('#obj-fpbgta571').text(await BVacumulado); 
			
			$ ('#obj-26414').text((await tpses/60)+"'");                  			
			$ ('#obj-26412').text(await formatNumber(altitudReal)+"m");               			
			$ ('#obj-26406').text((await tphip/60)+"'");            			
			$ ('#obj-26407').text((await tprec/60)+"'");   
			$ ('#obj-26408').text(await ncicl);                
			$ ('#obj-26409').text((await limspo)+"%");  
			$ ('#obj-28998').text((await patronRespiratorio)+"s");  
			
			
			if(await tipoMiniCiclo=="Hipoxia"){
				editLabelsCircle(180, "Grey", 2.95,90, "rgba(242,227,20, 1.0)", 2.20,150, "rgba(242,227,20, 1.0)", 1.75,120, "Grey", 1.45);
			}
			else{
				editLabelsCircle(180, "Grey", 2.95,90, "rgba(255, 255, 255, 1.0)", 2.20,150, "rgba(255, 255, 255, 1.0)", 1.75,120, "Grey", 1.45);
			}
			
			var textAltitude = document.getElementById('obj-zzyzpa559'); 
			var subtext = document.getElementById('obj-1037'); 
			var textspo2 = document.getElementById('obj-kcdcjy036'); 
			var textfc = document.getElementById('obj-rwkykd657'); 
			if (SPO2 < await limspo) {
				if (await statusPulxi == 0 || await statusPulxi == 2) {
					$ ('#obj-zzyzpa559').text("PULSIOXÍMETRO");  
					$ ('#obj-1037').text("NO CONECTADO"); 
					textAltitude.style.color = '#FA3824'; 
					textAltitude.style.fontSize = 24 + "px";
					textAltitude.style.lineHeight = "-40px";
					subtext.style.color = '#FA3824'; 
					$ ('#obj-kcdcjy036').text("---");
					$ ('#obj-rwkykd657').text("---");     				
					textspo2.style.color = '#FA3824'; 
					textfc.style.color = '#FA3824';           			
				} else if (await statusPulxi == 1){
					$ ('#obj-zzyzpa559').text("RECUPERACIÓN");  
					$ ('#obj-1037').text("ACTIVADA"); 
					textAltitude.style.color = '#FA3824'; 
					textAltitude.style.fontSize = 24 + "px";
					textAltitude.style.lineHeight = "-40px";
					subtext.style.color = '#FA3824'; 
					textspo2.style.color = '#FA3824';
				}
			} else {
				textspo2.style.color = '#FFFFFF'; 
				textfc.style.color = '#FFFFFF'; 
				if (BR <= BRlimit || BV <= BVlimit) {
					textAltitude.style.color = '#FFFFFF'; 
					textAltitude.style.fontSize = 30 + "px";
					textAltitude.style.lineHeight = "42px";
					subtext.style.color = '#CCCCCC'; 
					$ ('#obj-zzyzpa559').text(await formatNumber(altitudReal) + " M");       
					$ ('#obj-1037').text("ENTRENANDO");
				}         
			}
			
			var BRlimit = 12;
			var BVlimit = 12;
			var textBR = document.getElementById('obj-yxfouh403'); 
			var textBV = document.getElementById('obj-fpbgta571'); 
			if (BRacumulado >= BRlimit || BVacumulado >= BVlimit) {
				textAltitude.style.color = '#FA3824'; 
				textAltitude.style.fontSize = 22 + "px";
				textAltitude.style.lineHeight = "-40px";
				textBR.style.color = '#FA3824'; 
				textBV.style.color = '#FA3824'; 
				subtext.style.color = '#FA3824'; 
				$ ('#obj-zzyzpa559').text("HIPERVENTILACIÓN");  
				$ ('#obj-1037').text("DETECTADA");
			} else {
				textBR.style.color = '#FFFFFF'; 
				textBV.style.color = '#FFFFFF'; 
				if (SPO2 > await limspo) {
					textAltitude.style.color = '#FFFFFF'; 
					textAltitude.style.fontSize = 30 + "px";
					textAltitude.style.lineHeight = "42px";
					subtext.style.color = '#CCCCCC'; 
					$ ('#obj-zzyzpa559').text(await formatNumber(altitudReal) + " M");       
					$ ('#obj-1037').text("ENTRENANDO");
				}
			}
			
			cuentaAtras1 = secondsToString(tiempoMiniCiclo - tiempoConsumidoMiniCilo); 
			cuentaAtras2 = secondsToString(await tpses - tiempoConsumidoSesion);
			
			if ((myDataArray == "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0" ||(tpsarray.length > 5 && unique.length == 1)) && estadoActual != 0) {
				$ ('#obj-kcdcjy036').text("---");                  			
				$ ('#obj-rwkykd657').text("---");                			
				$ ('#obj-kurlgg469').text("---");                
				$ ('#obj-yxfouh403').text("---");                
				$ ('#obj-fpbgta571').text("---"); 
				$ ('#obj-zzyzpa559').text("---"); 
				$ ('#obj-1037').text("---");
				$ ('#obj-26414').text("---");             			
				$ ('#obj-26412').text("---");             			
				$ ('#obj-26406').text("---");      			
				$ ('#obj-26407').text("---");
				$ ('#obj-26408').text("---");         
				$ ('#obj-26409').text("---");
				
				desconnect = true;
				
				await sleep(500);
				addDataSet_V2("","PERDIDA","COMUNICACION",""); 
				myChart.update();
				await sleep(500);
				addDataSet_V2("","","",""); 
				myChart.update();
			} else {
				addDataSet_V2(
				"CICLO " + cicloActual + "/" + await ncicl,
				cuentaAtras1,
				await tipoMiniCiclo,
				cuentaAtras2		
				); 
				myChart.update();
			}
			
			if ((tiempoMiniCiclo - tiempoConsumidoMiniCilo)<11 && (tiempoMiniCiclo - tiempoConsumidoMiniCilo)>0 && unique.length != 1) {
				await sleep(500);
				addDataSet_V2(
				"CICLO " + cicloActual + "/" + await ncicl,
				"",
				await tipoMiniCiclo,
				cuentaAtras2		
				); 
				myChart.update();
			}
			
			if (tiempoConsumidoSesion == totaltime) {
				addDataSet_V2("","","",""); 
				myChart.update();
			}
		}
		delayedGreeting();
	}
	
	function ciclesCalc() {
		async function delayedGreeting() {
			cicloActual = Math.trunc(((tiempoConsumidoSesion / 60) / ((await tphip + await tprec) / 60)+1));
			if(cicloActual> await ncicl){
				cicloActual = cicloActual - 1;
			}	
			tiempoConsumidoCiclo = tiempoConsumidoSesion - ((await tphip+ await tprec)*(cicloActual-1));
			
			if(tiempoConsumidoCiclo < await tphip){
				tiempoConsumidoMiniCilo = tiempoConsumidoCiclo;
				th1 = tiempoConsumidoMiniCilo;
				th2 = await tphip;
				tr1 = 0;
				tr2 = 1;
				tiempoMiniCiclo = await tphip;
				tipoMiniCiclo = "Hipoxia";
			}
			else{
				th1 = 1;
				th2 = 1;
				tiempoConsumidoMiniCilo = tiempoConsumidoCiclo - await tphip;
				tr1 = tiempoConsumidoMiniCilo;
				tr2 = await tprec;
				tiempoMiniCiclo = await tprec;
				tipoMiniCiclo = "Recovery";
			}
			
			if (cicloActual == tiempoMiniCiclo == tiempoConsumidoMiniCilo == NaN) {
				cicloActual = tiempoMiniCiclo = tiempoConsumidoMiniCilo = 0;
			}
		}
		delayedGreeting();
	}
	
	var desconnect = false; 
	function trainning(){
		async function delayedGreeting() {
			let enviandoSesionReloj = 0;
			while (estadoActual == 1 && controlCambioUsuario != 1) {
				if (controlStop == 1) {
					enviandoSesionReloj = 0;
				} else {
					enviandoSesionReloj = enviandoSesionReloj + 1;
				}
				addDataSet_V2("","","","");
				myChart.update();
				await sleep(700);
				addDataSet_V2("","CARGANDO","SESION","");
				myChart.update();
				await sleep(700);
				readElectronica();
				checkIconos();
				if (enviandoSesionReloj > 10) {	
					desconnect = true;
					var textAltitude = document.getElementById('obj-zzyzpa559'); 
					textAltitude.style.fontSize = 20 + "px";
					$ ('#obj-zzyzpa559').text("REVISE CONEXIÓN"); 
					$ ('#obj-1037').text("DE LA MÁQUINA"); 
				} else {
					desconnect = false;
					$ ('#obj-zzyzpa559').text("---"); 
					var textAltitude = document.getElementById('obj-zzyzpa559'); 
					textAltitude.style.fontSize = 30 + "px";
					$ ('#obj-1037').text(""); 
				}	
			}
			let relojCalibracion = 0;
			while (estadoActual == 2 && controlCambioUsuario != 1) {
				desconnect = false;
				if (controlStop == 1) {
					relojCalibracion = 0;
				} else {
					relojCalibracion = relojCalibracion + 1;
				}
				addDataSet_V2("","","","");
				myChart.update();
				await sleep(700);
				addDataSet_V2("","LOADING","MACHINE","");
				myChart.update();
				await sleep(700);
				readElectronica();
				checkIconos();
				if (relojCalibracion > 80) {
					desconnect = true;
					var textAltitude = document.getElementById('obj-zzyzpa559'); 
					textAltitude.style.fontSize = 20 + "px";
					$ ('#obj-zzyzpa559').text("REVISE CONEXIÓN"); 
					$ ('#obj-1037').text("DE LA MÁQUINA"); 
				} else {
					$ ('#obj-zzyzpa559').text("---"); 
					var textAltitude = document.getElementById('obj-zzyzpa559'); 
					textAltitude.style.fontSize = 30 + "px";
					$ ('#obj-1037').text(""); 
				}	
			}
			let relojCalibracion2 = 0;
			while (estadoActual == 3 && controlCambioUsuario != 1) {
				$ ('#obj-zzyzpa559').text(await formatNumber(altitude)+"m"); 
				desconnect = false;
				if (controlStop == 1) {
					relojCalibracion2 = 0;
				} else {
					relojCalibracion2 = relojCalibracion2 + 1;
				}
				addDataSet_V2("","","","");
				myChart.update();
				await sleep(700);
				addDataSet_V2("","SETTING","ALTITUDE","");
				myChart.update();
				await sleep(700);
				readElectronica();
				checkIconos();
				if (relojCalibracion2 > 200) {
					desconnect = true;
					var textAltitude = document.getElementById('obj-zzyzpa559'); 
					textAltitude.style.fontSize = 20 + "px";
					$ ('#obj-zzyzpa559').text("REVISE CONEXIÓN"); 
					$ ('#obj-1037').text("DE LA MÁQUINA"); 
				} else {
					$ ('#obj-zzyzpa559').text("---"); 
					var textAltitude = document.getElementById('obj-zzyzpa559'); 
					textAltitude.style.fontSize = 30 + "px";
					$ ('#obj-1037').text(""); 
				}	
			}
			let relojCalibracion3 = 0;
			while (estadoActual == 5 && controlCambioUsuario != 1) {
				desconnect = false;
				if (controlStop == 1) {
					relojCalibracion3 = 0;
				} else {
					relojCalibracion3 = relojCalibracion3 + 1;
				}
				addDataSet_V2("","","","");
				myChart.update();
				$ ('#obj-zzyzpa559').text(" "); 
				$ ('#obj-1037').text(" "); 
				await sleep(700);
				addDataSet_V2("","READY","¡CALIBRADA!","");
				myChart.update();
				$ ('#obj-zzyzpa559').text("CLICK PLAY DISPLAY"); 
				var textAltitude = document.getElementById('obj-zzyzpa559'); 
				textAltitude.style.fontSize = 20 + "px";
				$ ('#obj-1037').text("PARA EMPEZAR LA SESION"); 
				await sleep(700);
				readElectronica();
				checkIconos();
				if (relojCalibracion3 > 620) {
					desconnect = true;
					var textAltitude = document.getElementById('obj-zzyzpa559'); 
					textAltitude.style.fontSize = 20 + "px";
					$ ('#obj-zzyzpa559').text("REVISE CONEXIÓN"); 
					$ ('#obj-1037').text("DE LA MÁQUINA"); 
				} 
			}
			let relojInterno = 0;
			while (estadoActual == 4 && controlCambioUsuario != 1){
				await sleep(1000);
				readElectronica();
				if (myDataArray !=  "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0") {
					medias();
				}
				ciclesCalc();
				paintTrainningSession();
				if (controlStop == 1) {
					relojInterno = 0;
				} else {
					relojInterno = relojInterno + 1;
				}
				console.log('tiempoConsumidoSesion: ' + tiempoConsumidoSesion);
				console.log('tpses: ' + tpses);
				console.log('relojInterno: ' + relojInterno);
			}
			if (((tiempoConsumidoSesion + 120) < await tpses) && estadoActual == 0) {
				controlStop = 1;
			}
			await sleep(1000);
			end();
		}
		delayedGreeting();
	}
	
	var notificationFull = app.notification.create({
		icon: '<img src="https://firebasestorage.googleapis.com/v0/b/ialtitude-esp32.appspot.com/o/Icons%2FenergyLogo.png?alt=media&token=664b7439-f770-4bec-a385-9e18b0e077f0" />',
		title: 'Energy',
		titleRightText: 'now',
		subtitle: 'Sesión finalizada',
		text: 'Si la sesión ha finalizado puede consultar los datos guardados en Resultados.',
		closeTimeout: 5000,
	});
	
	var controlCambioUsuario=0;
	function end(){
		async function delayedGreeting() {
			
			desconnect = false;
			tiempoConsumidoSesion = -1;
			th1 = th2 = 100;
			relojCalibracion = relojCalibracion2 = relojInterno = 0;
			tr1 = tr2 = cicloActual = ncicl = cuentaAtras1 = cuentaAtras2 = 0;
			tipoMiniCiclo = "MINICICLO";
			
			clearInterval(trainP);  
			clearInterval(gfrt); 
			
			var stop = document.getElementById('obj-dhjxgy049'); 
			stop.style.color = 'rgb(204,204,204)';
			var start = document.getElementById('obj-lnoaky450'); 
			start.style.color = 'rgb(242,227,20)';
			var machine = document.getElementById('obj-cgvcwh151'); 
			machine.style.color = 'rgb(204,204,204)'; 
			var sensor = document.getElementById('obj-jgexmm973'); 
			sensor.style.color = 'rgb(204,204,204)'; 
			var textAltitude = document.getElementById('obj-zzyzpa559'); 
			var subtext = document.getElementById('obj-1037'); 
			textAltitude.style.color = '#FFFFFF'; 
			subtext.style.color = '#CCCCCC'; 
			$ ('#obj-1037').text("");
			var textBR = document.getElementById('obj-yxfouh403'); 
			var textBV = document.getElementById('obj-fpbgta571'); 
			var textspo2 = document.getElementById('obj-kcdcjy036'); 
			var textfc = document.getElementById('obj-rwkykd657'); 
			textBR.style.color = '#FFFFFF'; 
			textBV.style.color = '#FFFFFF'; 
			textspo2.style.color = '#FFFFFF'; 
			textfc.style.color = '#FFFFFF'; 
			
			$ ('#obj-kcdcjy036').text("---");                   			
			$ ('#obj-uawkjo295').text("---");             			
			$ ('#obj-rwkykd657').text("---");                			
			$ ('#obj-kurlgg469').text("---");                
			$ ('#obj-yxfouh403').text("---");                
			$ ('#obj-fpbgta571').text("---"); 
			$ ('#obj-zzyzpa559').text("---"); 
			$ ('#obj-26414').text("---");             			
			$ ('#obj-26412').text("---");             			
			$ ('#obj-26406').text("---");      			
			$ ('#obj-26407').text("---");
			$ ('#obj-26408').text("---");         
			$ ('#obj-26409').text("---");
			
			$ ('#obj-1579').text("---");               			
			$ ('#obj-1581').text("---");               			
			$ ('#obj-1583').text("---");                			
			$ ('#obj-1585').text("---");                
			$ ('#obj-1643').text("---"); 
			$ ('#obj-1644').text("---"); 
			$ ('#obj-1645').text("---"); 
			$ ('#obj-1646').text("---"); 
			$ ('#obj-sapepw249').text("---");               			
			$ ('#obj-ytabqy554').text("---");             			
			$ ('#obj-sqbouj484').text("---");               
			$ ('#obj-rbhvqg270').text("---"); 
			$ ('#obj-1662').text("---"); 
			$ ('#obj-1656').text("MINICICLO"); 
			$ ('#obj-1659').text("---"); 
			$ ('#obj-1660').text("---"); 
			$ ('#obj-1661').text("---"); 
			
			var nivelIntensidad = document.getElementById("obj-25302");
			var resultadoEntrenamiento = document.getElementById("obj-25306");
			var energia = document.getElementById("obj-25310");
			$ ('#obj-22746').text("NIVEL DIFICULTAD SESION");
			$ ('#obj-22756').text("CARGA ENTRENAMIENTO");
			$ ('#obj-22766').text("ENERGIA OBTENIDA");
			await app.progressbar.set(nivelIntensidad,0,300);
			await app.progressbar.set(resultadoEntrenamiento,0,300);
			await app.progressbar.set(energia,0,300);
			resultadoEntreArray = [];
			resultadoEntreArrayProgressBar = [];
			
			editLabelsCircle(100,"#FFFEFE",3.30,90,"#FFFEFE",2.10,130,"#FFFEFE",1.60,170,"#FFFEFE",1.30);
			addDataSet_V2("","FINALIZADO","¡Buen trabajo!",""); 
			myChart.update();
			noSleep.disable();
			
			if (controlCambioUsuario == 0) {
				notificationFull.open();
				
				await sleep(2000);
				
				addDataSet_V2("","CARGANDO","REPORTING",""); 
				myChart.update();
				
				if (myChart4 && myChart2) {
					myChart4.clear();
					myChart2.clear();
				}
				reporting();
				
				await sleep(4000);
				
				var start = document.getElementById('obj-lnoaky450'); 
				start.style.opacity = "0.0";
				start.style.pointerEvents = 'none';
				var stop = document.getElementById('obj-dhjxgy049'); 
				stop.style.opacity = "0.0";
				stop.style.pointerEvents = 'none'; 
				
				addDataSet_V2("","CLICK","ENTRENOS",""); 
				myChart.update();
				
				document.getElementById('toolbar-o-tphrnx030').style.pointerEvents = 'auto';
				document.getElementById('toolbar-o-tphrnx030').style.opacity = "1.0";
			} else {
				if (myChart4 && myChart2) {
					myChart4.clear();
					myChart2.clear();
				}
				
				var start = document.getElementById('obj-lnoaky450'); 
				start.style.opacity = "0.0";
				start.style.pointerEvents = 'none';
				var stop = document.getElementById('obj-dhjxgy049'); 
				stop.style.opacity = "0.0";
				stop.style.pointerEvents = 'none'; 
				
				addDataSet_V2("","CLICK","ENTRENOS",""); 
				myChart.update();
				
				document.getElementById('toolbar-o-tphrnx030').style.pointerEvents = 'auto';
				document.getElementById('toolbar-o-tphrnx030').style.opacity = "1.0";
			}
		}
		delayedGreeting();
	}
	
	// -----------------------------------------------------------------------------------------------------
	// 									GRAFICAS ENERGY SCORE Y REPORTING
	// -----------------------------------------------------------------------------------------------------
	function energyScore() {
		async function delayedGreeting() {
			
			const EnS = firestoredb.collection('programs').doc(String(docId)).collection('reporting').doc('energyScore');
			const doc = await EnS.get();
			if (!doc.exists) {
			} else {
				energySA = doc.data().acumulado;
			}
			
			const avgData = firestoredb.collection('programs').doc(String(docId)).collection('sessions');
			avgData.orderBy("timestamp","desc").limit(1).get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					timestampMS = doc.data().timestamp;
					var horasUS = Math.floor(Date.now()/1000) - timestampMS;
					$ ('#obj-qubdon417').text(hoursToString(Math.floor(horasUS/3600)));
				});
			});
			
			if (energySA < 10) {mensajeES = "Poco a poco";}
			if (energySA >= 10 && energySA < 20) {mensajeES = "No está mal";}
			if (energySA >= 20 && energySA < 40) {mensajeES = "¡Buen progreso!";}
			if (energySA >= 40 && energySA < 55) {mensajeES = "¡Sigue así!";}
			if (energySA >= 55 && energySA < 70) {mensajeES = "¡Bien hecho!";}
			if (energySA >= 70 && energySA < 85) {mensajeES = "¡Gran trabajo!";}
			if (energySA >= 85 && energySA < 100) {mensajeES = "¡Enhorabuena!";}
			if (energySA >= 100) {mensajeES = "¡Nivel experto!";}
			
			if (energySA >= 0 && energySA <= 5) {consejoDelDia = "Hoy comienzas a resincronizar tu metabolismo con tus orígenes. Al nacer abandonamos un entorno hipóxico y hoy recuperas ese estímulo. Te acompañaremos para guiarte con la mejor metodología de entrenamiento en hipoxia existente en el mundo para optimizar todos sus beneficios. ¡Comenzamos!";}
			if (energySA > 5 && energySA <= 10) {consejoDelDia = "Tus primeras sesiones han de servirte para modular tu forma de respirar. El control de tu patrón respiratorio te hará más eficiente y mejorará tu salud. Poco a poco irás ganando energía. ¡Relájate y disfruta!";}
			if (energySA > 10 && energySA <= 15) {consejoDelDia = "La clave del éxito de cualquier metodología de entrenamiento enfocado a la mejora del metabolismo humano está en la aplicación de la dosis de estímulo adecuada en el momento oportuno de forma repetida. Tu organismo está adaptándose y acumulando energía. ¡Sigue así!";}
			if (energySA > 15 && energySA <= 20) {consejoDelDia = "Cada vez que utilizas ENERGY tu acumulador de energía se recarga, pero si el estímulo no se repite en el tiempo perderás esos beneficios. Subir a nuestras montañas a menudo es tu objetivo.¡Sé constante!";}
			if (energySA > 20 && energySA <= 25) {consejoDelDia = "Algunos de los beneficios derivados del uso adecuado del entrenamiento en hipoxia que se han documentado son mejoras en el sistema cardiovascular y respiratorio. Cada sesión ENERGY estimula esos cambios. ¡Entrena!";}
			if (energySA > 25 && energySA <= 30) {consejoDelDia = "¡Enhorabuena! Has alcanzado un nivel de energía en el que seguramente estás disfrutando de algunos de los beneficios del entrenamiento en hipoxia. ¿Duermes mejor? ¿Más relajación? ¿Mejor humor? Todos ellos son efectos derivados de tus sesiones ENERGY. Y los que te quedan por descubrir...";}
			if (energySA > 30 && energySA <= 35) {consejoDelDia = "En un estudio realizado sobre longevidad y altitud en la población de Bolivia los autores concluyeron que las adaptaciones derivadas de la hipoxia conllevaban una vida más larga y saludable. Con ENERGY tienes la montaña en tu casa. ¡No dejes de subir a menudo!";}
			if (energySA > 35 && energySA <= 40) {consejoDelDia = "Las montañas más altas están hechas de la acumulación de pequeñas rocas. En este nivel de energía la biogénesis mitocondrial te dará mayor vitalidad. ¡Sigue realizando sesiones para provocar grandes cambios en tu organismo, donde estás estimulando más de 300 genes diana!";}
			if (energySA > 40 && energySA <= 45) {consejoDelDia = "Cuando tu cuerpo es más eficiente cada latido de tu corazón es capaz de impulsar un mayor transporte de oxígeno por lo que tu frecuencia cardiaca se reduce. En el apartado resultados de la app puedes seguir esta evolución. ¡Analiza!";}
			if (energySA > 45 && energySA <= 50) {consejoDelDia = "¡Felicidades! Estás a mitad del camino de tu mejor versión. Seguro que ya eres consciente de que tus niveles de fatiga son ahora menores frente a esfuerzos que, antes de comenzar a usar ENERGY, te costaban más. ¿Eres capaz de imaginarte hasta donde te haremos llegar?";}
			if (energySA > 50 && energySA <= 55) {consejoDelDia = "Cuando subes una montaña es importante mirar atrás y ver el camino recorrido. Si revisas tus valores de saturación de oxígeno en sangre desde que comenzaste a usar ENERGY seguramente te sorprenderás de su evolución a distintas alturas. ¡Aprende!";}
			if (energySA > 55 && energySA <= 60) {consejoDelDia = "En este nivel de energía tu sistema cardiovascular ha sufrido importantes cambios. El estímulo de la VEGF ha provocado en tu organismo la generación  de nuevos vasos capilares, vías para transportar más oxígeno y de forma más rápida. Al elevarse también tus niveles de óxido nítrico con un gran efecto vasodilatador: ¡Todo fluye mejor!";}
			if (energySA > 60 && energySA <= 65) {consejoDelDia = "30 billones de células conforman el cuerpo humano y, en  ellas, sus mitocondrias se encargan de generar energía. Al utilizar ENERGY estás estimulando que tu central energética sea mayor y más potente. ¡Obsérvate!";}
			if (energySA > 65 && energySA <= 70) {consejoDelDia = "Tu organismo ya respira de forma más eficiente. La acumulación de sesiones ENERGY incide en la mejora de tu plasticidad respiratoria, como consecuencia del aumento de los niveles de serotonina en tu cuerpo que provocan una mayor actividad basal del nervio frénico, encargado de controlar tu diafragma. ¡Qué bien sienta el aire fresco!";}
			if (energySA > 70 && energySA <= 75) {consejoDelDia = "Poder analizar tus datos históricos te permite valorar cómo ha ido cambiando tu sistema cardiovascular y respiratorio. Comprueba en resultados la evolución de tus niveles de SpO2, FC, VR y FR. ¡Con este nivel de energía los cambios seguro que han sido muy grandes!";}
			if (energySA > 75 && energySA <= 80) {consejoDelDia = "Con ENERGY has conseguido la potenciación de tu sistema inmune. Ahora es más resistente. El entrenamiento en hipoxia induce la expresión de una serie de genes que activan tus encimas antioxidantes con un efecto antiinflamatorio general. Esto es lo que nos dicen los estudios científicos, pero aun quedan mejoras por conseguir ¡Sigue a por el 100%!";}
			if (energySA > 80 && energySA <= 85) {consejoDelDia = "Cuando estás próximo a la cima de la montaña todo cuesta más y se hace más lento. Tu organismo ya está muy adaptado, así que ganar puntos ENERGY te resultará más dificil ahora. Es el precio de mejorar. ¡Esfuérzate!";}
			if (energySA > 85 && energySA <= 90) {consejoDelDia = "Con este nivel de ENERGY la optimización de tu respiración celular y el funcionamiento de tus mitocondrias deberá de estar próxima a su máximo. Con las centrales energéticas a pleno rendimiento tu organismo está próximo a la HOMEOSTASIS. ¡Tu mejor versión está cerca!";}
			if (energySA > 90 && energySA <= 95) {consejoDelDia = "El camino que nos ha llevado hasta aquí está basado en los descubrimientos sobre la adaptación de las celulas a la falta de oxígeno, por los cuales 3 científicos recibieron el premio Nobel de medicina en 2019. Tu nivel ENERGY actual es fruto de su aplicación con la metodología de entrenamiento más avanzada del mundo. ¡Disfruta!";}
			if (energySA > 95 && energySA <= 100) {consejoDelDia = "Cuando comenzaste a entrenar parecía difícil llegar hasta aquí, pero con constancia lo has conseguido. Tienes nuestra admiración, pero no hay trofeos ni premios. Sólo la mejora de tu metabolismo y de tu salud. ¿Acaso hay algo más importante?. Aquí no finaliza el camino, sino que comienza el reto de preservarla. La ciencia que hay en ENERGY es la herramienta. ¡Persiste!";}
			if (energySA > 100) {consejoDelDia = "Enhorabuena, eres todo un experto en el entrenamiento en hipoxia intermitente. Ahora tienes el desafío de preservar todo lo adquirido. El camino no ha sido fácil, ¿serás capaz de permanecer en el más alto nivel?";}
			
			$ ('#obj-ulsppo267').text(consejoDelDia);
			
			if (energySA > 100) {
				var energyNormal = 100;
				var energyExpert = energySA - 100;
				var energyExpert2 = energyExpert;
				if (energyExpert>100){energyExpert=100;}
			} else {
				var energyNormal = energySA;
				var energyExpert = 0;
				var energyExpert2 = 100;
			}
			config2 = {
				type: 'doughnut',
				data: {
					datasets: [{
						data: [energyNormal,100 - energyNormal,0.01],
						borderWidth: 0, 
						borderColor: 'rgba(242,227,20, 1.0)',
						backgroundColor: [
						'rgba(242,227,20, 1.0)',  
						'rgba(90, 97, 110, 0.3)',  
						],
						hoverBackgroundColor: [
						'rgba(242,227,20, 1.0)', 
						'rgba(90, 97, 110, 0.3)',  
						]
					},{
						data: [100,0],
						borderWidth: 0,
						borderColor: "Black",
						backgroundColor: [
						'rgba(252, 110, 12, 0)',  
						'#5A616E',
						],
						hoverBackgroundColor: [
						"#FC6E0C",
						"#5A616E",
						]
					},{
						data: [energyExpert,100 - energyExpert2],
						borderWidth: 0,
						borderColor: 'rgba(43,159,42, 1.0)',
						backgroundColor: [
						'rgba(43,159,42, 1.0)', 
						'rgba(90, 97, 110, 0.3)',  
						],
						hoverBackgroundColor: [
						'rgba(43,159,42, 1.0)', 
						'rgba(90, 97, 110, 0.3)', 
						]
					},{
						data: [100,0],
						borderWidth: 0,
						borderColor: "Black",
						backgroundColor: [
						'rgba(252, 110, 12, 0)',
						'#5A616E',
						],
						hoverBackgroundColor: [
						"#FC6E0C",
						"#5A616E",
						]
					},{
						data: [0,0],
						borderWidth: 0,
						borderColor: "Black",
						backgroundColor: [
						'rgba(145, 145, 145, 1.0)', 
						'rgba(90, 97, 110, 0.3)',
						],
						hoverBackgroundColor: [
						'rgba(145, 145, 145, 1.0)', 	
						'rgba(90, 97, 110, 0.3)',
						]
					}],
				},
				options: { 
					elements: {
						center: {
							text1: " ",	
							text2: Math.round(energySA) + " %",
							text3: mensajeES,
							text4: " ",
							color: 'rgba(252, 110, 12, 1.0)',
							sidePadding: 20,
							lineHeight: 25
						}
					},
					animation: {
						animateScale: false,
						animateRotate: true
					},
					legend: {
						display: false
					},
					events: [],
					showTooltips: false,
					aspectRatio: 1.55,
					cutout: '70%',
					plugins: {
						customPlugin: {
							consoleText: 'testText'
						}
					}
				},
				plugins: [{
					id: 'customPlugin',
					beforeDraw: (chart, args, options) => {
						if(chart.config.type=='doughnut'){
							
							var width = chart.width,
							height = chart.height,
							ctx = chart.ctx;
							ctx.restore();
							ctx.clearRect(0, 0, 3000, 3000);
							
							var text;
							
							fontSize = (height / sizeLabel1).toFixed(2);  			
							ctx.fillStyle = colorLabel1;  							
							ctx.font = '400 ' + fontSize * 13 + 'px "Titillium Web"';
							text = chart.config.options.elements.center.text1; 
							textX = Math.round((width - ctx.measureText(text).width) / 2);
							textY = (height / positionLabel1) ;  										  					
							ctx.fillText(text, textX, textY);
							
							fontSize = (height / sizeLabel2).toFixed(2);    							
							ctx.fillStyle = colorLabel2;											
							ctx.font = 'Bold ' + fontSize * 13 + 'px "Titillium Web"';
							text = chart.config.options.elements.center.text2; 
							textX = Math.round((width - ctx.measureText(text).width) / 2);
							textY = (height / positionLabel2) ;    											
							ctx.fillText(text, textX, textY);
							
							fontSize = (height / sizeLabel3).toFixed(2);      								
							ctx.fillStyle = colorLabel3;											
							ctx.font = '100 ' + fontSize * 13 + 'px "Titillium Web"';
							text = chart.config.options.elements.center.text3;
							textX = Math.round((width - ctx.measureText(text).width) / 2);
							textY = (height / positionLabel3) ;     													
							ctx.fillText(text, textX, textY);
							
							fontSize = (height / sizeLabel4).toFixed(2); 								    				
							ctx.fillStyle = colorLabel4;												
							ctx.font = '400 ' + fontSize * 13 + 'px "Titillium Web"';
							text = chart.config.options.elements.center.text4;
							textX = Math.round((width - ctx.measureText(text).width) / 2);
							textY = (height / positionLabel4);      											
							ctx.fillText(text, textX, textY);
							ctx.save();
						}
					}
				}]
			};
			
			async function delayedGreeting() {
				ctx2 = await document.getElementById("obj-1237").getContext("2d", {alpha: false});
				const oldChart = Chart.getChart(ctx2);
				if (oldChart) {
					oldChart.destroy();
				}
				myChart2 = new Chart(ctx2, config2);
			}
			delayedGreeting();
			document.getElementById('tabs-o-hvcywn610').style.opacity = "1.0";
		}
		delayedGreeting();
	}
	
	// Flecha izquierda grafica barras reporting
	$(document).on("click", "#flexbox-25724", function(e) {
		async function delayedGreeting() {
			e.preventDefault();
			primeros15();
			addDataSet_reporting();
			await myChart4.update();
		}
		delayedGreeting();
	});
	
	// Flecha derecha grafica barras reporting
	$(document).on("click", "#flexbox-25725", function(e) {
		async function delayedGreeting() {
			e.preventDefault();
			ultimos15();
			addDataSet_reporting();
			await myChart4.update();
		}
		delayedGreeting();
	});
	
	var sesC = [],sesE = [], sesR = [], sesT = [], labelGraph = [];
	async function primeros15() {
		sesC = igualesC.slice(0,30);
		sesE = igualesE.slice(0,30);
		sesR = igualesR.slice(0,30);
		sesT = igualesT.slice(0,30);
		labelGraph = newdates.slice(0,30);
	}
	
	async function ultimos15() {
		sesC = igualesC.slice(-30);
		sesE = igualesE.slice(-30);
		sesR = igualesR.slice(-30);
		sesT = igualesT.slice(-30);
		labelGraph = newdates.slice(-30);
	}
	
	function addDataSet_reporting() {
		config4 = {
			type: 'bar',
			data: {
				labels: labelGraph,
				datasets: [
				{
					label: 'Calentamiento',
					data: sesC,
					fill: true,
					barThickness: 6,
					backgroundColor: 'rgb(255,63,0)', 
				},
				{
					label: 'Entrenamiento',
					data: sesE,
					fill: true,
					barThickness: 6,
					backgroundColor: 'rgba(242,227,20, 1.0)',
				},
				{
					label: 'Recuperación',
					data: sesR,
					fill: true,
					barThickness: 6,
					backgroundColor: 'rgba(90, 97, 110, 1.0)', 
				},
				{
					label: 'Test',
					data: sesT,
					fill: true,
					barThickness: 6,
					backgroundColor: 'rgba(255,255, 255, 1.0)',
				}]
			},
			options: {
				aspectRatio: 3,
				layout: {
					padding: 0
				},
				elements: {
					bar:{
						borderRadius: 5,
						skipNull: false,
						drawNull: true,
					},
				},
				scales: {
					y: {
						stacked:true,
						type: 'linear',
						display: false,
						grid: {
							offset:false,
							display: false,
						},
						suggestedMax: 4,
						suggestedMin: 0,
						ticks: {
							color: 'rgba(255, 255, 255, 0.7)',
							padding: 0,
							font: {
								size:10,
							},
						}
					},
					x: {
						stacked: true,
						type: 'category',
						display: true,
						suggestedMin: 30,
						ticks: {
							color: 'rgba(255, 255, 255, 0.7)', 
							padding: 0,
							minRotation: 0,
							maxRotation: 0,
							font: {
								size:10,
							},
						},
						grid: {
							offset:false,
							display: false,
						},
					}
				},
				plugins: {
					legend: {
						labels: {
							boxHeight: 7,
							boxWidth: 7,
						},
						display: true,
						position: 'bottom',
					},
					title: {
						display: false,
					}
				}
			}
		};
		
		async function delayedGreeting() {
			ctx4 = await document.getElementById('obj-25438').getContext('2d', {alpha: false});
			const oldChart2 = Chart.getChart(ctx4);
			if (oldChart2) {
				oldChart2.destroy();
			}
			myChart4 = new Chart(ctx4,config4);
		}
		delayedGreeting();
	}
	
	function reporting() {
		async function delayedGreeting() {
			wb = XLSX.utils.book_new();
			let arrayDates2 = [], arrayTipo2 = [],arrayEnergia2 = [],arrayTiempoTotal2=[], arrayCarga=[], arrayDificultad=[];
			let timestamp2,sesionTipo2,tiempoTotal2,tiempoTotalE,tiempoTotalC,tiempoTotalR,tiempoTotalT,energiaEntrenamiento2,date3,cargaSesion,altitudSesionR;
			let energiaAcumulada=[],tiempoTotalAcumuladoE = [],tiempoTotalAcumuladoR = [],tiempoTotalAcumuladoC = [],tiempoTotalAcumuladoT=[];
			let sesionesCalentamiento = 0,sesionesRecovery = 0,sesionesTrainning = 0,sesionesTest = 0;
			let dt = new Date();
			dt.setDate(dt.getDate() - 59);
			let dtmili = Math.floor(dt.getTime()/1000); 
			let query = firestoredb.collection("programs/" + String(docId) + "/sessions");
			query = query.where('timestamp', '>=', dtmili).orderBy("timestamp","desc");
			let items = [];
			var i=0;
			let myVLContainer=document.getElementById("virtual-list-repeater-20536");
			let template = document.getElementById("virtual-list-repeater-20536-template").innerHTML;
			query.get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					let item = doc.data();
					item["uid"] = doc.id;
					item["dataindex"] = i;
					items.push(item);
					i=i+1;
					timestamp2 = doc.data().timestamp * 1000;
					sesionTipo2 = doc.data().sesionTipo;
					tiempoTotal2 = doc.data().tiempoTotal;
					let tiempoTotal3 = tiempoTotal2.split(" ",1);
					energiaEntrenamiento2 = doc.data().energiaEntrenamiento;
					cargaSesion = doc.data().resultadoEntrenamiento;
					altitudSesionR = parseInt(doc.data().altitud); 				
					date3 = new Date(timestamp2);
					let dateSimple = String(date3.getDate()+"-"+(date3.getMonth()+1)+"-"+date3.getFullYear());
					let dateSimple2 = String(date3.getDate()+"-"+(date3.getMonth()+1)+"-"+date3.getFullYear()+"_"+date3.getHours()+"|"+date3.getMinutes());
					if (String(energiaEntrenamiento2) == 'NaN') {energiaEntrenamiento2=0;}
					arrayDates2 = [...arrayDates2,dateSimple,];
					arrayTipo2 = [...arrayTipo2,String(sesionTipo2),];
					arrayTiempoTotal2 = [...arrayTiempoTotal2,parseInt(tiempoTotal3),];
					arrayEnergia2 = [...arrayEnergia2,parseFloat(energiaEntrenamiento2),];
					arrayCarga = [...arrayCarga,parseFloat(cargaSesion),];
					arrayDificultad = [...arrayDificultad,parseFloat(altitudSesionR),];
					
					// Exportar a Excel
					const data = {
						fechaSesion: doc.data().date,
						limiteSpo2: doc.data().limiteSpo2,
						tiempoTotal: doc.data().tiempoTotal,
						numeroCiclos: doc.data().ciclos,
						tiempoHipoxia: doc.data().tiempoHip,
						tiempoRecuperacion: doc.data().tiempoRec
					}
					const data2 = {
						datosSPO2: Object.assign({},doc.data().SPO2array)
					}
					const result1 = {}
					Object.entries(data2).filter(([k, v]) => typeof v !== 'object').forEach(([k, v]) => result1[k] = v ) 
					Object.keys(data2).filter(k => !(k in result1)).map(k => Object.entries(data2[k]).forEach(([n, v]) => result1[`${k}-${n}`] = v))
					
					const data3 = {
						datosFrecuenciaCardiaca: Object.assign({},doc.data().HRarray)
					}
					const result2 = {}
					Object.entries(data3).filter(([k, v]) => typeof v !== 'object').forEach(([k, v]) => result2[k] = v ) 
					Object.keys(data3).filter(k => !(k in result2)).map(k => Object.entries(data3[k]).forEach(([n, v]) => result2[`${k}-${n}`] = v))
					
					const data4 = {
						datosFrecuenciaRespiratoria: Object.assign({},doc.data().BRarray)
					}
					const result3 = {}
					Object.entries(data4).filter(([k, v]) => typeof v !== 'object').forEach(([k, v]) => result3[k] = v ) 
					Object.keys(data4).filter(k => !(k in result3)).map(k => Object.entries(data4[k]).forEach(([n, v]) => result3[`${k}-${n}`] = v))
					
					const data5 = {
						datosVolumenRespiratorio: Object.assign({},doc.data().BVarray)
					}
					const result4 = {}
					Object.entries(data5).filter(([k, v]) => typeof v !== 'object').forEach(([k, v]) => result4[k] = v ) 
					Object.keys(data5).filter(k => !(k in result4)).map(k => Object.entries(data5[k]).forEach(([n, v]) => result4[`${k}-${n}`] = v))
					
					ws = XLSX.utils.json_to_sheet(Array(data),{header:["fechaSesion","limiteSpo2","tiempoTotal","numeroCiclos","tiempoHipoxia","tiempoRecuperacion"]});
					XLSX.utils.sheet_add_json(ws,Array(result1),{origin: 'A4'});
					XLSX.utils.sheet_add_json(ws,Array(result2),{origin: 'A7'});
					XLSX.utils.sheet_add_json(ws,Array(result3),{origin: 'A10'});
					XLSX.utils.sheet_add_json(ws,Array(result4),{origin: 'A13'});
					XLSX.utils.book_append_sheet(wb, ws, "Sesion" + dateSimple2);
				});
				thoriumCorePlugin.renderVirtualListFromData(myVLContainer, items,template);
			}).catch(function (error) {
				app.dialog.alert("Algo ha salido mal. Error = " + error);
			});		
			
			await sleep(2000);
			
			let arrayDates = [];
			for (var i=0;i<60;i++) {
				let sumadorDias = new Date();
				sumadorDias.setDate((sumadorDias.getDate() - 59) + i);
				arrayDates.push(String(sumadorDias.getDate()+"-"+(sumadorDias.getMonth()+1)+"-"+sumadorDias.getFullYear()));
			}
			
			igualesE=[],igualesR=[],igualesC=[],igualesT=[];
			energiaVerde = [],energiaNaranja = [],energiaRoja = [];
			altitudSArray = [], cargaEArray = [],cargaArray=[],ltl=[],stl=[],lb=[];
			let energiaAcumulada2Array=[],energiaAcumulada2;
			let energiaPerdida=0;
			for(var i=0;i<arrayDates.length;i++) {		
				let contadorTotal=0,contadorCarga=0,contadorAltitud=0,contadorEntrenamiento = 0,contadorTest = 0,contadorCalentamiento = 0,contadorRecuperacion = 0,contadorEnergia = 0,contadorTiempoTotal1 = 0,contadorTiempoTotal2 = 0,contadorTiempoTotal3 = 0,contadorTiempoTotal4 = 0;
				for(var j=0;j<arrayDates2.length;j++) {
					if(arrayDates[i]==arrayDates2[j]) {
						contadorTotal = contadorTotal + 1;
						if (arrayTipo2[j] == "Entrenamiento"){
							contadorEntrenamiento = contadorEntrenamiento + 1;
							contadorTiempoTotal1 = contadorTiempoTotal1 + arrayTiempoTotal2[j];
						}
						if (arrayTipo2[j] == "Calentamiento"){
							contadorCalentamiento = contadorCalentamiento + 1;
							contadorTiempoTotal2 = contadorTiempoTotal2 + arrayTiempoTotal2[j];
						}
						if (arrayTipo2[j] == "Recuperación"){
							contadorRecuperacion = contadorRecuperacion + 1;
							contadorTiempoTotal3 = contadorTiempoTotal3 + arrayTiempoTotal2[j];
						}
						if (arrayTipo2[j] == "Test"){
							contadorTest = contadorTest + 1;
							contadorTiempoTotal4 = contadorTiempoTotal4 + arrayTiempoTotal2[j];
						}
						contadorEnergia = contadorEnergia + arrayEnergia2[j];
						contadorCarga = contadorCarga + arrayCarga[j];
						contadorAltitud = contadorAltitud + arrayDificultad[j];
					} 
				}
				energiaAcumulada.push(contadorEnergia);
				if (contadorTotal==0) {altitudSArray.push(0);} else {altitudSArray.push(contadorAltitud/contadorTotal);}
				cargaEArray.push(contadorCarga);
				energiaAcumulada2 = energiaAcumulada.reduce((previous, current) => current += previous);
				energiaAcumulada2Array.push(energiaAcumulada2);
				igualesE.push(contadorEntrenamiento);
				igualesC.push(contadorCalentamiento);
				igualesR.push(contadorRecuperacion);
				igualesT.push(contadorTest);
				tiempoTotalAcumuladoE.push(contadorTiempoTotal1);
				tiempoTotalAcumuladoC.push(contadorTiempoTotal2);
				tiempoTotalAcumuladoR.push(contadorTiempoTotal3);
				tiempoTotalAcumuladoT.push(contadorTiempoTotal4);
			}
			
			cargaAcumulada = Number((cargaEArray.reduce((previous, current) => current += previous)).toFixed(2));
			
			sesionesCalentamiento = igualesC.reduce((previous, current) => current += previous);
			sesionesTrainning = igualesE.reduce((previous, current) => current += previous);
			sesionesRecovery = igualesR.reduce((previous, current) => current += previous);
			sesionesTest = igualesT.reduce((previous, current) => current += previous);
			tiempoTotalE = tiempoTotalAcumuladoE.reduce((previous, current) => current += previous);
			tiempoTotalC = tiempoTotalAcumuladoC.reduce((previous, current) => current += previous);
			tiempoTotalR = tiempoTotalAcumuladoR.reduce((previous, current) => current += previous);
			tiempoTotalT = tiempoTotalAcumuladoT.reduce((previous, current) => current += previous);
			
			if (sesionesCalentamiento == NaN) {sesionesCalentamiento=0;}
			if (sesionesTrainning == NaN) {sesionesTrainning=0;}
			if (sesionesRecovery == NaN) {sesionesRecovery=0;}
			if (sesionesTest == NaN) {sesionesTest=0;}
			if (tiempoTotalE == NaN) {tiempoTotalE="0'";}
			if (tiempoTotalC == NaN) {tiempoTotalC="0'";}
			if (tiempoTotalR == NaN) {tiempoTotalR="0'";}
			if (tiempoTotalT == NaN) {tiempoTotalT="0'";}
			
			tiempoTotal2 = tiempoTotalE + tiempoTotalC + tiempoTotalR + tiempoTotalT;
			
			$ ('#obj-22575').text(sesionesCalentamiento);
			$ ('#obj-22576').text(sesionesTrainning);	
			$ ('#obj-22577').text(sesionesRecovery);
			$ ('#obj-27602').text(sesionesTest);
			$ ('#obj-25691').text(minutesToString(tiempoTotalE));
			$ ('#obj-25692').text(minutesToString(tiempoTotalR));
			$ ('#obj-25694').text(minutesToString(tiempoTotalC));
			$ ('#obj-27603').text(minutesToString(tiempoTotalT));
			$ ('#obj-xpgzxm873').text(minutesToString(tiempoTotal2));
			
			const regT = firestoredb.collection('programs').doc(String(docId)).collection('reporting').doc('registroSesiones');
			const data14 = {
				tiempoTotal: tiempoTotal2 + "'",
				sesionesCalentamiento: sesionesCalentamiento,
				sesionesRecovery: sesionesRecovery,
				sesionesTrainning: sesionesTrainning,
				sesionesTest: sesionesTest
			}
			regT.set(data14);
			
			cargaArray = cargaEArray;
			for(var i=0;i<7;i++) {
				cargaArray.push(0);
				cargaArray.shift();
			}
			for(var i=0;i<(cargaArray.length);i++) {
				if (i==0){
					ltl.push(0);
					stl.push(0);
					lb.push(0);
				} else {
					let longTermLoad = (ltl[i-1] + ((cargaArray[i]-ltl[i-1])/30)).toFixed(2);
					ltl.push(Number(longTermLoad));
					let shortTermLoad = (stl[i-1] + ((cargaArray[i]-stl[i-1])/7)).toFixed(2);
					stl.push(Number(shortTermLoad));
					let loadBalance = Number(longTermLoad) - Number(shortTermLoad);
					lb.push(loadBalance);
				}
			}
			
			energiaVerde = energiaAcumulada;
			for(var i=0;i<(energiaAcumulada2Array.length);i++) {
				let primeraSesion = energiaVerde.findIndex(element => element != 0 );
				if (energiaVerde[i] == 0 && energiaVerde[i-1] == 0 && energiaVerde[i-2] == 0 && i!=0 && i!=1 && i>primeraSesion) {
					let resta = energiaNaranja[i-1]/(energiaNaranja.length-primeraSesion-1);
					if (energiaNaranja[i-1] <= 0) {energiaRoja.push(0);resta=0;} 
					else {energiaRoja.push(resta*2);}
					let energiaAcum = energiaVerde.slice(0,i);
					energiaAcum = energiaAcum.reduce((previous, current) => current += previous);
					let energiaAcumResta = energiaRoja.slice(0,i);
					energiaAcumResta = energiaAcumResta.reduce((previous, current) => current += previous);
					let total = energiaAcum-energiaAcumResta-(resta*2);
					if (total<0){energiaNaranja.push(0);} 
					else {energiaNaranja.push(total);}
				} else if (i!=0 && i!=1 && energiaVerde[i] == 0 && i>primeraSesion){
					let resta = energiaNaranja[i-1]/(energiaNaranja.length-primeraSesion-1);
					if (energiaNaranja[i-1] <= 0) {energiaRoja.push(0);resta=0;} 
					else {energiaRoja.push(resta);}
					let energiaAcum = energiaVerde.slice(0,i);
					energiaAcum = energiaAcum.reduce((previous, current) => current += previous);
					let energiaAcumResta = energiaRoja.slice(0,i);
					energiaAcumResta = energiaAcumResta.reduce((previous, current) => current += previous);
					let total = energiaAcum-energiaAcumResta-resta;
					if (total<0){energiaNaranja.push(0);} 
					else {energiaNaranja.push(total);}
				} else if (i!=0 && i!=1){
					energiaRoja.push(0);
					let energiaAcum = energiaVerde.slice(0,i);
					energiaAcum = energiaAcum.reduce((previous, current) => current += previous);
					let energiaAcumResta = energiaRoja.slice(0,i);
					energiaAcumResta = energiaAcumResta.reduce((previous, current) => current += previous);
					let total = energiaAcum-energiaAcumResta;
					if (total<0){energiaNaranja.push(0);} 
					else {energiaNaranja.push(total);}
				} else if (i==0) {
					energiaRoja.push(0);
					energiaNaranja.push(0);
				} else if (i==1) {
					energiaRoja.push(0);
					let suma = (energiaVerde[0] + energiaVerde[1])-energiaVerde[1];
					if (suma<0){energiaNaranja.push(0);} 
					else {energiaNaranja.push(suma);}
				}
			}
			
			energySA = 	energiaVerde.reduce((previous, current) => current += previous);		
			energiaPerdida = energiaRoja.reduce((previous, current) => current += previous);		
			let nuevaEnergia = energySA-energiaPerdida;
			if (nuevaEnergia<0){nuevaEnergia=0;}
			
			const EnS = firestoredb.collection('programs').doc(String(docId)).collection('reporting').doc('energyScore');
			const data13 = {acumulado: nuevaEnergia}
			EnS.set(data13);
			
			await ultimos15();
			addDataSet_reporting();
			energyScore();
			
			Mfr=[];Mvr=[];Mspo2=[];Mfc=[];tCarga=[];tls=[];alts=[],ths=[],trs=[],ncs=[],lss=[],tts=[];
			const avgData = firestoredb.collection('programs').doc(String(docId)).collection('sessions');
			avgData.orderBy("timestamp","desc").limit(7).get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					Mfr.push(parseFloat(doc.data().avgBR)); 
					Mvr.push(parseFloat(doc.data().avgBV)); 
					Mspo2.push(parseInt(doc.data().avgSPO2)); 
					Mfc.push(parseInt(doc.data().avgHR));
					alts.push(doc.data().altitud);
					ths.push(doc.data().tiempoHip);
					trs.push(doc.data().tiempoRec);
					lss.push(doc.data().limiteSpo2);
					ncs.push(doc.data().ciclos);
					tts.push(doc.data().tiempoTotal);
					tCarga.push(parseFloat(doc.data().resultadoEntrenamiento)); 
					let timestampLast = doc.data().timestamp; 
					tls.push(((((Math.floor(Date.now()/1000) - timestampLast)/3600)/24)*100)/7); 
				});
				if (querySnapshot.empty) {
					Mfr.push(12); 
					Mvr.push(12); 
					Mspo2.push(0); 
					Mfc.push(90);
					alts.push('0 M');
					ths.push('---');
					trs.push('---');
					lss.push('---');
					ncs.push('---');
					tts.push('---');
					tCarga.push(600); 
					tls.push(100);
				}
				sesionPolar(0);
				polarChart();	
			});
		}
		delayedGreeting();		
	}
	
	// ----------------------------------------------------------------
	//						EXPORTAR DATOS EXCEL
	// ----------------------------------------------------------------
	var ws,wb;
	$(document).on("click", "#obj-28081", function(e){
		async function delayedGreeting() {
			e.preventDefault();
			try {
				XLSX.writeFile(await wb, "reportingEnergy.xlsx")
			} catch(err) {
				app.dialog.alert('No hay datos para exportar')
			}
		}
		delayedGreeting();
	});
	
	// ----------------------------------------------------------------
	//						TOMA DE DECISIONES
	// ----------------------------------------------------------------
	async function sesionPolar(number) {
		ultMfr=Number(Mfr[number].toFixed(2));
		ultMvr=Number(Mvr[number].toFixed(2));
		ultMspo2=Number(Mspo2[number].toFixed(2));
		ultMfc=Number(Mfc[number].toFixed(2));
		ultCarga=Number(tCarga[number].toFixed(2));
		tiempoLastSession=Number(tls[number].toFixed(2));
		alturaSesion=alts[number];
		$ ('#obj-28171').text(ths[number]);
		$ ('#obj-28172').text(trs[number]);
		$ ('#obj-28173').text(ncs[number]);
		$ ('#obj-28174').text(lss[number]);
		$ ('#obj-28175').text(alturaSesion);
		$ ('#obj-28176').text(tts[number]);
		if (alturaSesion == '0 M'){
			$ ('#obj-28116').text("---"); 
			$ ('#obj-28117').text("Sin sesión"); 
			$ ('#obj-26952').text("---");
			$ ('#obj-26956').text("---");
			$ ('#obj-26960').text("---");
			$ ('#obj-26964').text("---");
			$ ('#obj-26968').text("---");
		} else {
			let hours = Math.floor(((tiempoLastSession*7)/100)*24);
			if (hours <= 24) {document.getElementById("obj-28116").style.color ='rgba(43,159,42, 1.0)';}
			else if (hours > 24 && hours <= 72) {document.getElementById("obj-28116").style.color ='rgba(242,227,20, 1.0)';}
			else if (hours > 72) {document.getElementById("obj-28116").style.color ='rgba(250,56,36, 1.0)';}
			$ ('#obj-28116').text(hoursToString2(hours));
			$ ('#obj-28117').text("desde la última sesión");  
			$ ('#obj-26952').text(ultMspo2+"%");
			$ ('#obj-26956').text(ultMfc+" LPM");
			$ ('#obj-26960').text(ultMfr+" RPM");
			$ ('#obj-26964').text(ultMvr+" LPM");
			$ ('#obj-26968').text(Number(ultCarga.toFixed(2)));
		}
	}
	
	// Sesion 1 (más antigua)
	$(document).on("click", "#obj-28845", function(e) {
		async function delayedGreeting() {
			e.preventDefault();
			sesionPolar(6);
			polarChart();
			await myChart15.update();
		}
		delayedGreeting();
	});
	
	// Sesion 2 
	$(document).on("click", "#obj-28846", function(e) {
		async function delayedGreeting() {
			e.preventDefault();
			sesionPolar(5);
			polarChart();
			await myChart15.update();
		}
		delayedGreeting();
	});
	
	// Sesion 3 
	$(document).on("click", "#button-28847", function(e) {
		async function delayedGreeting() {
			e.preventDefault();
			sesionPolar(4);
			polarChart();
			await myChart15.update();
		}
		delayedGreeting();
	});
	
	// Sesion 4
	$(document).on("click", "#button-28848", function(e) {
		async function delayedGreeting() {
			e.preventDefault();
			sesionPolar(3);
			polarChart();
			await myChart15.update();
		}
		delayedGreeting();
	});
	
	// Sesion 5 
	$(document).on("click", "#button-28849", function(e) {
		async function delayedGreeting() {
			e.preventDefault();
			sesionPolar(2);
			polarChart();
			await myChart15.update();
		}
		delayedGreeting();
	});
	
	// Sesion 6
	$(document).on("click", "#button-28850", function(e) {
		async function delayedGreeting() {
			e.preventDefault();
			sesionPolar(1);
			polarChart();
			await myChart15.update();
		}
		delayedGreeting();
	});
	
	// Sesion 7 (más reciente) 
	$(document).on("click", "#button-28851", function(e) {
		async function delayedGreeting() {
			e.preventDefault();
			sesionPolar(0);
			polarChart();
			await myChart15.update();
		}
		delayedGreeting();
	});
	
	var alturaSesion;
	function polarChart() {
		
		let p1=0,p2=0,p3=0,p4=0,p5=0;
		
		if (ultMfr<5){ultMfr=5; p1=100;} else if (ultMfr>12){ultMfr=12; p1=0;} else {p1=100-(ultMfr*100)/12;}
		if (ultMvr<5){ultMvr=5; p2=100;} else if (ultMvr>12){ultMvr=12; p2=0;} else {p2=100-(ultMvr*100)/12;}
		if (ultMspo2>93){ultMspo2=93; p3=100;} else if (ultMspo2<85){ultMspo2=85; p3=0;} else {p3=(ultMspo2*100)/93;}
		if (ultMfc<60){ultMfc=60; p4=100;} else if (ultMfc>90){ultMfc=90; p4=0;} else {p4=100-(ultMfc*100)/90;}
		if (ultCarga<100){ultCarga=100; p5=100;} else if (ultCarga>600){ultCarga=600; p5=0;} else {p5=100-(ultCarga*100)/500;}
		
		if (alturaSesion == '0 M') {
			var porcentajeTotal = 0;
		} else {
			var porcentajeTotal = Math.floor((p1+p2+p3+p4+p5)/5);
		}
		
		$ ('#obj-27935').text(porcentajeTotal); 
		if (porcentajeTotal > 75) {
			document.getElementById("obj-27935").style.color ='rgba(43,159,42, 1.0)';
			document.getElementById("obj-27937").style.color ='rgba(43,159,42, 1.0)';
		} else if (porcentajeTotal < 50) {
			document.getElementById("obj-27935").style.color = 'rgba(250,56,36, 1.0)';
			document.getElementById("obj-27937").style.color = 'rgba(250,56,36, 1.0)';
		} else if (porcentajeTotal <= 75 && porcentajeTotal >= 50) {
			document.getElementById("obj-27935").style.color = 'rgba(242,227,20, 1.0)';
			document.getElementById("obj-27937").style.color = 'rgba(242,227,20, 1.0)';
		}
		
		async function delayedGreeting() {
			ctx15 = await document.getElementById('obj-26945').getContext('2d', {alpha: false});
			const oldChart = Chart.getChart(ctx15);
			if (oldChart) {
				oldChart.destroy();
			}
			myChart15 = new Chart(ctx15, {	
				type: 'doughnut',
				data: {
					labels: ["AVG SPO2","","AVG FC","","AVG FR","","AVG VR","","Carga",""],
					datasets: [{
						data: [8-(93-ultMspo2),8-(8-(93-ultMspo2))],
						label: "AVG SPO2",
						borderWidth: 0, 
						borderColor: 'rgba(122, 204, 255, 1.0)',
						backgroundColor: [
						'rgba(122, 204, 255, 1.0)',  
						'rgba(122, 204, 255,0.08)',   
						],
						hoverBackgroundColor: [
						'rgba(122, 204, 255, 1.0)',  
						'rgba(122, 204, 255,0.08)',   
						]
					},{
						data: [30-(ultMfc-60),30-(30-(ultMfc-60))],
						label: "AVG FC",
						borderWidth: 0, 
						borderColor: 'rgba(255, 98, 144, 1.0)',
						backgroundColor: [
						'rgba(255, 98, 144, 1.0)',  
						'rgba(255, 98, 144,0.08)',   
						],
						hoverBackgroundColor: [
						'rgba(255, 98, 144, 1.0)',  
						'rgba(255, 98, 144,0.08)',   
						]
					},{
						data: [7-(ultMfr-5),7-(7-(ultMfr-5))],
						label: "AVG FR",
						borderWidth: 0, 
						borderColor: 'rgba(204,204,204, 1.0)',
						backgroundColor: [
						'rgba(204,204,204, 1.0)',  
						'rgba(204,204,204,0.08)',   
						],
						hoverBackgroundColor: [
						'rgba(204,204,204, 1.0)',  
						'rgba(204,204,204,0.08)',   
						]
					},{
						data: [7-(ultMvr-5),7-(7-(ultMvr-5))],
						label: "AVG VR",
						borderWidth: 0, 
						borderColor: 'rgba(43,159,42, 1.0)',
						backgroundColor: [
						'rgba(43,159,42, 1.0)',  
						'rgba(43,159,42,0.08)',   
						],
						hoverBackgroundColor: [
						'rgba(43,159,42, 1.0)',  
						'rgba(43,159,42,0.08)',   
						]
					},{
						data: [500-(ultCarga-100),500-(500-(ultCarga-100))],
						label: "Carga",
						borderWidth: 0, 
						borderColor: 'rgba(252, 110, 12, 1.0)',
						backgroundColor: [
						'rgba(252, 110, 12, 1.0)',  
						'rgba(252, 110, 12,0.08)',   
						],
						hoverBackgroundColor: [
						'rgba(252, 110, 12, 1.0)',  
						'rgba(252, 110, 12,0.08)',   
						]
					}]
				},
				options: {
					aspectRatio: 1.55,
					cutout: '50%',	
					events:[],
					elements: {
						center: {
							text1: alturaSesion	
						}
					},
					plugins: {
						legend: {
							display: true,
							position: 'bottom',
							labels: {
								boxHeight: 7,
								boxWidth: 7,
								generateLabels: function(chart) {
									const original = Chart.overrides.doughnut.plugins.legend.labels.generateLabels;
									var labelsOriginal = original.call(this, chart);
									var labelsOriginal2 = [];
									for (i=0;i<labelsOriginal.length;i++){
										if(i==0||i==2||i==4||i==6||i==8){
											labelsOriginal2.push(labelsOriginal[i]);
										}
									}
									let datasetColors = chart.data.datasets.map(function(e) {
										return e.backgroundColor;
									});
									datasetColors = datasetColors.flat();
									
									labelsOriginal2.forEach(label => {
										label.datasetIndex = (label.index - label.index % 2) / 2;
										label.hidden = !chart.isDatasetVisible(label.datasetIndex);
										label.fillStyle = datasetColors[label.index];
									});
									labelsOriginal=labelsOriginal2;
									return labelsOriginal;
								}
							}
						},			
						title: {
							display: false,
						},
						customPlugin: {
							consoleText: 'testText'
						}
					}
				},
				plugins: [{
					id: 'customPlugin',
					beforeDraw: (chart, args, options) => {
						if(chart.config.type=='doughnut'){
							
							var width = chart.width,
							height = chart.height,
							ctx = chart.ctx;
							var text;
							
							ctx.restore();
							ctx.clearRect(0, 0, 4000, 4000);
							
							fontSize = (height / 200).toFixed(2)*15;
							text = chart.config.options.elements.center.text1; 
							ctx.textAlign = 'center';
							ctx.textBaseline = 'middle';
							textX = ((chart.chartArea.left + chart.chartArea.right) / 2);
							textY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
							ctx.font = fontSize+ 'px "Titillium Web"';
							ctx.fillStyle = "rgb(255,255,255)";  	 						     					
							ctx.fillText(text, textX, textY);
							
							ctx.save();
						}
					}
				}]
			});
		}
		delayedGreeting();
	}
	
	// ----------------------------------- COMPARATIVA DE TEST ----------------------------------- //
	
	var arrayFC=[],arraySpo2=[],arrayBR=[],arrayBV=[];
	
	function test4k() {
		arrayFC=[],arraySpo2=[],arrayBR=[],arrayBV=[];
		async function delayedGreeting() {
			const avgData = firestoredb.collection('programs').doc(String(docId)).collection('sessions');
			avgData.orderBy("timestamp","desc").where('sesionTipo','==','Test').where("altitud", "==", "4000 M").limit(3).get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					arrayFC.push(doc.data().HRarray);
					arraySpo2.push(doc.data().SPO2array);
					arrayBR.push(doc.data().BRarray);
					arrayBV.push(doc.data().BVarray);
				});
				if (arrayFC.length==0){arrayFC.push(0,0,0);arraySpo2.push(0,0,0);arrayBR.push(0,0,0);arrayBV.push(0,0,0);}
				if (arrayFC.length==1){arrayFC.push(0,0);arraySpo2.push(0,0);arrayBR.push(0,0);arrayBV.push(0,0);}
				if (arrayFC.length==2){arrayFC.push(0);arraySpo2.push(0);arrayBR.push(0);arrayBV.push(0);}			
				graficarTodo();
				var content = document.getElementById('obj-nuevo'); 
				content.style.opacity = "1.0";
			}).catch(function (error) {
				app.dialog.alert("Algo ha salido mal. Error = " + error);
			});		
		}
		delayedGreeting();
	}
	$(document).on("click", "#obj-27545", function(e) {
		async function delayedGreeting() {
			e.preventDefault();
			test4k();
			myChart18.update();
			myChart19.update();
			myChart20.update();
		}
		delayedGreeting();
	});
	
	function test5k() {
		arrayFC=[],arraySpo2=[],arrayBR=[],arrayBV=[];
		async function delayedGreeting() {
			const avgData = firestoredb.collection('programs').doc(String(docId)).collection('sessions');
			avgData.orderBy("timestamp","desc").where('sesionTipo','==','Test').where("altitud", "==", "5000 M").limit(3).get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					arrayFC.push(doc.data().HRarray);
					arraySpo2.push(doc.data().SPO2array);
					arrayBR.push(doc.data().BRarray);
					arrayBV.push(doc.data().BVarray);
				});
				if (arrayFC.length==0){arrayFC.push(0,0,0);arraySpo2.push(0,0,0);arrayBR.push(0,0,0);arrayBV.push(0,0,0);}
				if (arrayFC.length==1){arrayFC.push(0,0);arraySpo2.push(0,0);arrayBR.push(0,0);arrayBV.push(0,0);}
				if (arrayFC.length==2){arrayFC.push(0);arraySpo2.push(0);arrayBR.push(0);arrayBV.push(0);}			
				graficarTodo();
				var content = document.getElementById('obj-nuevo'); 
				content.style.opacity = "1.0";
			}).catch(function (error) {
				app.dialog.alert("Algo ha salido mal. Error = " + error);
			});		
		}
		delayedGreeting();
	}
	$(document).on("click", "#obj-27546", function(e) {
		async function delayedGreeting() {
			e.preventDefault();
			test5k();
			myChart18.update();
			myChart19.update();
			myChart20.update();
		}
		delayedGreeting();
	});
	
	function test6k() {
		arrayFC=[],arraySpo2=[],arrayBR=[],arrayBV=[];
		async function delayedGreeting() {
			const avgData = firestoredb.collection('programs').doc(String(docId)).collection('sessions');
			avgData.orderBy("timestamp","desc").where('sesionTipo','==','Test').where("altitud", "==", "6000 M").limit(3).get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					arrayFC.push(doc.data().HRarray);
					arraySpo2.push(doc.data().SPO2array);
					arrayBR.push(doc.data().BRarray);
					arrayBV.push(doc.data().BVarray);
				});
				if (arrayFC.length==0){arrayFC.push(0,0,0);arraySpo2.push(0,0,0);arrayBR.push(0,0,0);arrayBV.push(0,0,0);}
				if (arrayFC.length==1){arrayFC.push(0,0);arraySpo2.push(0,0);arrayBR.push(0,0);arrayBV.push(0,0);}
				if (arrayFC.length==2){arrayFC.push(0);arraySpo2.push(0);arrayBR.push(0);arrayBV.push(0);}			
				graficarTodo();
				var content = document.getElementById('obj-nuevo'); 
				content.style.opacity = "1.0";
			}).catch(function (error) {
				app.dialog.alert("Algo ha salido mal. Error = " + error);
			});		
		}
		delayedGreeting();
	}
	$(document).on("click", "#obj-27547", function(e) {
		async function delayedGreeting() {
			e.preventDefault();
			test6k();
			myChart18.update();
			myChart19.update();
			myChart20.update();
		}
		delayedGreeting();
	});
	
	function testinicial() {
		arrayFC=[],arraySpo2=[],arrayBR=[],arrayBV=[];
		async function delayedGreeting() {
			const avgData = firestoredb.collection('programs').doc(String(docId)).collection('sessions');
			avgData.orderBy("timestamp","desc").where('sesionTipo','==','Test').where("objetivoSesion", "==", "Test inicial").limit(3).get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					arrayFC.push(doc.data().HRarray);
					arraySpo2.push(doc.data().SPO2array);
					arrayBR.push(doc.data().BRarray);
					arrayBV.push(doc.data().BVarray);
				});
				if (arrayFC.length==0){arrayFC.push(0,0,0);arraySpo2.push(0,0,0);arrayBR.push(0,0,0);arrayBV.push(0,0,0);}
				if (arrayFC.length==1){arrayFC.push(0,0);arraySpo2.push(0,0);arrayBR.push(0,0);arrayBV.push(0,0);}
				if (arrayFC.length==2){arrayFC.push(0);arraySpo2.push(0);arrayBR.push(0);arrayBV.push(0);}			
				graficarTodo();
				var content = document.getElementById('obj-nuevo'); 
				content.style.opacity = "1.0";
			}).catch(function (error) {
				app.dialog.alert("Algo ha salido mal. Error = " + error);
			});		
		}
		delayedGreeting();
	}
	
	$(document).on("click", "#button-29001", function(e) {
		async function delayedGreeting() {
			e.preventDefault();
			testinicial();
			myChart18.update();
			myChart19.update();
			myChart20.update();
		}
		delayedGreeting();
	});
	
	function testbasal() {
		arrayFC=[],arraySpo2=[],arrayBR=[],arrayBV=[];
		async function delayedGreeting() {
			const avgData = firestoredb.collection('programs').doc(String(docId)).collection('sessions');
			avgData.orderBy("timestamp","desc").where('sesionTipo','==','Test').where("objetivoSesion", "==", "Test basal").limit(3).get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					arrayFC.push(doc.data().HRarray);
					arraySpo2.push(doc.data().SPO2array);
					arrayBR.push(doc.data().BRarray);
					arrayBV.push(doc.data().BVarray);
				});
				if (arrayFC.length==0){arrayFC.push(0,0,0);arraySpo2.push(0,0,0);arrayBR.push(0,0,0);arrayBV.push(0,0,0);}
				if (arrayFC.length==1){arrayFC.push(0,0);arraySpo2.push(0,0);arrayBR.push(0,0);arrayBV.push(0,0);}
				if (arrayFC.length==2){arrayFC.push(0);arraySpo2.push(0);arrayBR.push(0);arrayBV.push(0);}			
				graficarTodo();
				var content = document.getElementById('obj-nuevo'); 
				content.style.opacity = "1.0";
			}).catch(function (error) {
				app.dialog.alert("Algo ha salido mal. Error = " + error);
			});		
		}
		delayedGreeting();
	}
	
	$(document).on("click", "#button-29000", function(e) {
		async function delayedGreeting() {
			e.preventDefault();
			testbasal();
			myChart18.update();
			myChart19.update();
			myChart20.update();
		}
		delayedGreeting();
	});
	
	var ctx17,ctx18,ctx19,ctx20,myChart17,myChart18,myChart19,myChart20;
	function graficarTodo() {
		async function delayedGreeting() {
			
			// FC
			ctx17 = await document.getElementById('obj-27549').getContext('2d', {alpha: false});
			const oldChart = Chart.getChart(ctx17);
			if (oldChart) {
				oldChart.destroy();
			}
			myChart17 = new Chart(ctx17, {
				type: 'line',
				data: {
					labels: Array.from({length: arrayFC[0].length}, (v, i) => i),
					datasets: [{
						label: 'FC 1',
						data: arrayFC[0],
						fill: false,
						yAxisID: 'y', 
						showLine: true,
						backgroundColor: 'rgba(250,56,36, 0.0)', 
						borderColor: 'rgba(250,56,36, 1.0)', 
						borderWidth: 1,
					},{
						label: 'FC 2',
						data: arrayFC[1],
						fill: false,
						yAxisID: 'y',
						showLine: true,
						backgroundColor: 'rgba(242,227,20, 0.0)', 
						borderColor: 'rgba(242,227,20, 1.0)', 
						borderWidth: 1,
					},{
						label: 'FC 3',
						data: arrayFC[2],
						fill: false,
						yAxisID: 'y',
						showLine: true,
						backgroundColor: 'rgba(204,204,204, 0.0)', 
						borderColor: 'rgba(204,204,204, 1.0)', 
						borderWidth: 1,
					}]
				},
				options: {
					elements: {
						point:{
							pointRadius: 0,
						},
					},
					scales: {
						y: {
							type: 'linear',
							display: true,
							position: 'left',
							suggestedMax: 120,
							min: 50,
							beginAtZero: false,
							grid: {
								display: false,
							},						
							ticks: {
								color: 'rgba(204, 204, 204, 0.7)', 
								font: {
									size:10,
								},
							}
						},
						x: {
							display: false,
						}
					},
					plugins: {
						legend: {
							labels: {
								boxHeight: 7,
								boxWidth: 7,
							},
							display: true,
							position: 'bottom',
						},
						title: {
							display: false,
						}
					}
				}
			});
			
			// SPO2
			ctx18 = await document.getElementById('obj-27548').getContext('2d', {alpha: false});
			const oldChart2 = Chart.getChart(ctx18);
			if (oldChart2) {
				oldChart2.destroy();
			}
			myChart18 = new Chart(ctx18, {
				type: 'line',
				data: {
					labels: Array.from({length: arraySpo2[0].length}, (v, i) => i),
					datasets: [{
						label: 'SPO2 1',
						data: arraySpo2[0],
						fill: false,
						yAxisID: 'y',
						showLine: true,
						backgroundColor: 'rgba(250,56,36, 0.0)',  
						borderColor: 'rgba(250,56,36, 1.0)',  
						borderWidth: 1,
					},{
						label: 'SPO2 2',
						data: arraySpo2[1],
						fill: false,
						yAxisID: 'y',
						showLine: true,
						backgroundColor: 'rgba(242,227,20, 0.0)',
						borderColor: 'rgba(242,227,20, 1.0)', 
						borderWidth: 1,
					},{
						label: 'SPO2 3',
						data: arraySpo2[2],
						fill: false,
						yAxisID: 'y',
						showLine: true,
						backgroundColor: 'rgba(204,204,204, 0.0)', 
						borderColor: 'rgba(204,204,204, 1.0)', 
						borderWidth: 1,
					}]
				},
				options: {
					elements: {
						point:{
							pointRadius: 0,
						},
					},
					scales: {
						y: {
							type: 'linear',
							display: true,
							position: 'left',
							suggestedMax: 100,
							min: 70,
							beginAtZero: false,
							grid: {
								display: false,
							},
							ticks: {
								color: 'rgba(204, 204, 204, 0.7)', 
								font: {
									size:10,
								},
							}
						},
						x: {
							display: false,
						}
					},
					plugins: {
						legend: {
							labels: {
								boxHeight: 7,
								boxWidth: 7,
							},
							display: true,
							position: 'bottom',
						},
						title: {
							display: false,
						}
					}
				}
			});
			
			// FR
			ctx19 = await document.getElementById('obj-27550').getContext('2d', {alpha: false});
			const oldChart3 = Chart.getChart(ctx19);
			if (oldChart3) {
				oldChart3.destroy();
			}
			myChart19 = new Chart(ctx19, {
				type: 'line',
				data: {
					labels: Array.from({length: arrayBR[0].length}, (v, i) => i),
					datasets: [{
						label: 'FR 1',
						data: arrayBR[0],
						fill: false,
						yAxisID: 'y',
						showLine: true,					
						backgroundColor: 'rgba(250,56,36, 0.0)',  
						borderColor: 'rgba(250,56,36, 1.0)', 
						borderWidth: 1,
					},{
						label: 'FR 2',
						data: arrayBR[1],
						fill: false,
						yAxisID: 'y',
						showLine: true,					
						backgroundColor: 'rgba(242,227,20, 0.0)', 
						borderColor: 'rgba(242,227,20, 1.0)', 
						borderWidth: 1,
					},{
						label: 'FR 3',
						data: arrayBR[2],
						fill: false,
						yAxisID: 'y',
						showLine: true,					
						backgroundColor: 'rgba(204,204,204, 0.0)',
						borderColor: 'rgba(204,204,204, 1.0)',
						borderWidth: 1,
					}]
				},
				options: {
					elements: {
						point:{
							pointRadius: 0,
						},
					},
					scales: {
						y: {
							type: 'linear',
							display: true,
							position: 'left',
							suggestedMax: 15,
							min: 0,
							grid: {
								display: false,
							},
							ticks: {
								color: 'rgba(204, 204, 204, 0.7)', 
								font: {
									size:10,
								},
							}
						},
						x: {
							display: false,
						}
					},
					plugins: {
						legend: {
							labels: {
								boxHeight: 7,
								boxWidth: 7,
							},
							display: true,
							position: 'bottom',
						},
						title: {
							display: false,
						}
					}
				}
			});
			
			// VR
			ctx20 = await document.getElementById('obj-27551').getContext('2d', {alpha: false});
			const oldChart4 = Chart.getChart(ctx20);
			if (oldChart4) {
				oldChart4.destroy();
			}
			myChart20 = new Chart(ctx20, {
				type: 'line',
				data: {
					labels: Array.from({length: arrayBV[0].length}, (v, i) => i),
					datasets: [{
						label: 'VR 1',
						data: arrayBV[0],
						fill: false,
						yAxisID: 'y',
						showLine: true,					
						backgroundColor: 'rgba(250,56,36, 0.0)', 
						borderColor: 'rgba(250,56,36, 1.0)',  
						borderWidth: 1,
					},{
						label: 'VR 2',
						data: arrayBV[1],
						fill: false,
						yAxisID: 'y',
						showLine: true,					
						backgroundColor: 'rgba(242,227,20, 0.0)', 
						borderColor: 'rgba(242,227,20, 1.0)', 
						borderWidth: 1,
					},{
						label: 'VR 3',
						data: arrayBV[2],
						fill: false,
						yAxisID: 'y',
						showLine: true,					
						backgroundColor: 'rgba(204,204,204, 0.0)',
						borderColor: 'rgba(204,204,204, 1.0)', 
						borderWidth: 1,
					}]
				},
				options: {
					elements: {
						point:{
							pointRadius: 0,
						},
					},
					scales: {
						y: {
							type: 'linear',
							display: true,
							position: 'left',
							suggestedMax: 1,
							min: 0,
							grid: {
								display: false,
							},
							ticks: {
								color: 'rgba(204, 204, 204, 0.7)', 
								font: {
									size:10,
								},
							}
						},
						x: {
							display: false,
						}
					},
					plugins: {
						legend: {
							labels: {
								boxHeight: 7,
								boxWidth: 7,
							},
							display: true,
							position: 'bottom',
						},
						title: {
							display: false,
						}
					}
				}
			});
			
		}
		delayedGreeting();
	}
	
	$(document).on('page:mounted', '.page[data-name="comparaciontest"]', function (e,page) {
		var page = e.detail;
		var content = document.getElementById('obj-nuevo'); 
		content.style.opacity = "0.0";
		test4k();
	});
	
	// ----------------------------------- ADAPTACION GENERAL A LA ALTITUD ----------------------------------- //
	
	// Flecha izquierda grafica daptacion altitud
	$(document).on("click", "#obj-27668", function(e) {
		async function delayedGreeting() {
			e.preventDefault();
			primeros15AA();
			adaptacionAltitudGraph();
			await myChart22.update();
		}
		delayedGreeting();
	});
	
	// Flecha derecha grafica adaptacion altitud
	$(document).on("click", "#obj-27672", function(e) {
		async function delayedGreeting() {
			e.preventDefault();
			ultimos15AA();
			adaptacionAltitudGraph();
			await myChart22.update();
		}
		delayedGreeting();
	});
	
	var stlG = [],ltlG = [], lbG = [], cargaEArrayG = [], labelGraph8 = [], datesGraph = [];
	
	async function primeros15AA() {
		stlG = stl.slice(0,30);
		ltlG = ltl.slice(0,30);
		lbG = lb.slice(0,30);
		cargaEArrayG = cargaArray.slice(0,30);
		labelGraph8 = datesGraph.slice(0,30);
	}
	
	async function ultimos15AA() {
		stlG = stl.slice(-30);
		ltlG = ltl.slice(-30);
		lbG = lb.slice(-30);
		cargaEArrayG = cargaArray.slice(-30);
		labelGraph8 = datesGraph.slice(-30);
	}
	
	var myChart22,ctx22;
	function adaptacionAltitudGraph() {
		async function delayedGreeting() {
			ctx22 = await document.getElementById('obj-27659').getContext('2d', {alpha: false});
			const oldChart5 = Chart.getChart(ctx22);
			if (oldChart5) {
				oldChart5.destroy();
			}
			myChart22 = new Chart(ctx22, {	
				data: {
					labels: labelGraph8,
					datasets: [{
						type: 'line',
						label: 'LTL',
						data: ltlG,
						fill: false,
						yAxisID: 'y',
						xAxisID: 'x',
						pointRadius: 2,
						showLine: true,					
						backgroundColor: 'rgba(252, 110, 12, 0.0)',  
						borderColor: 'rgba(252, 110, 12, 1.0)', 
						borderWidth: 1,
					},{
						type: 'line',
						label: 'STL',
						data: stlG,
						fill: false,
						yAxisID: 'y',
						xAxisID: 'x',
						pointRadius: 2,
						showLine: true,					
						backgroundColor: 'rgba(250,56,36, 0.0)',  
						borderColor: 'rgba(250,56,36, 1.0)', 
						borderWidth: 1,
					},{
						type: 'line',
						label: 'Fatiga hipóxica',
						data: lbG,
						fill: false,
						yAxisID: 'y',
						xAxisID: 'x',
						pointRadius: 2,
						showLine: true,					
						backgroundColor: 'rgba(242,227,20, 0.0)', 
						borderColor: 'rgba(242,227,20, 1.0)', 
						borderWidth: 1,
					},{
						type: 'bar',
						label: 'Carga entrenamiento',
						data: cargaEArrayG,
						barThickness: 6,
						fill: true,
						yAxisID: 'y',
						showLine: true,					
						backgroundColor: 'rgba(171,223,255, 1.0)', 
						borderWidth: 0,
					}]
				},
				options: {
					scales: {
						y: {
							type: 'linear',
							display: true,
							position: 'left',
							max: 1000,
							min: -200,
							beginAtZero: false,
							grid: {
								display: true,
								drawBorder: false,
								color: function(context) {
									if (context.tick.value > 0) {
										return 'rgba(90,97,110, 0.5)';
									} else if (context.tick.value < 0 && context.tick.value > -50) {
										return 'rgba(43,159,42, 0.5)'; 
									} else if (context.tick.value < -50 && context.tick.value > -150) {
										return 'rgba(252, 110, 12, 0.5)'; 
									} else if (context.tick.value < -150) {
										return 'rgba(250,56,36, 0.5)'; 
									} 
									return 'rgba(204,204,204, 1.0)';
								},
							},
							ticks: {
								color: 'rgba(204,204,204, 0.7)',
								font: {
									size:10,
								},
							}
						},
						x: {
							type: 'category',
							display: true,
							suggestedMin: 30,
							ticks: {
								color: 'rgba(204,204,204, 0.7)',
								padding: 0,
								minRotation: 0,
								maxRotation: 0,
								font: {
									size:10,
								},
							},
							grid: {
								offset:false,
								display: false,
							}
						}
					},
					aspectRatio: 0,
					maintainAspectRatio: true,
					responsive: true,
					plugins: {
						legend: {
							labels: {
								boxHeight: 7,
								boxWidth: 7,
							},
							display: true,
							position: 'bottom',
						},
						title: {
							display: false,
						}
					}
				}
			});
			
			document.getElementById('obj-27651').style.opacity = "1.0";
			
		}
		delayedGreeting();
	}
	
	var ctx23,ctx24,ctx25,myChart23,myChart24,myChart25;
	function rampLoad(){
		async function delayedGreeting() {
			
			let rl7=[],rl28=[],rl60=[];
			
			for(var i=7;i>-1;i--) {
				let rampLoad7 = Number(((ltl[(ltl.length-1)-i]-ltl[(ltl.length-8)-i])).toFixed(2));
				rl7.push(rampLoad7);
			}
			
			for(var i=28;i>-1;i--) {
				let rampLoad28 = Number(((ltl[(ltl.length-1)-i]-ltl[(ltl.length-29)-i])).toFixed(2));
				rl28.push(rampLoad28);
			}
			
			for(var i=59;i>-1;i--) {
				let rampLoad60 = Number(((ltl[(ltl.length-1)-i]-ltl[0])).toFixed(2));
				rl60.push(rampLoad60);
			}
			
			// 7 dias
			ctx23 = await document.getElementById('obj-28634').getContext('2d', {alpha: false});
			const oldChart = Chart.getChart(ctx23);
			if (oldChart) {
				oldChart.destroy();
			}
			myChart23 = new Chart(ctx23, {
				type: 'line',
				data: {
					labels: rl7,
					datasets: [{
						label: 'RL7',
						data: rl7,
						fill: true,
						showLine: true,
						backgroundColor: 'rgba(242,227,20, 1.0)', 
						borderColor: 'rgba(242,227,20, 1.0)', 
						borderWidth: 1,
					}]
				},
				options: {
					elements: {
						point:{
							pointRadius: 0,
						},
					},
					scales: {
						y: {
							type: 'linear',
							display: false,
							beginAtZero: false,
							grid: {
								display: false,
							}
						},
						x: {
							display: false,
						}
					},
					plugins: {
						legend: {
							display: false,
						},
						title: {
							display: false,
						}
					}
				}
			});
			
			// 28 dias
			ctx24 = await document.getElementById('obj-28664').getContext('2d', {alpha: false});
			const oldChart2 = Chart.getChart(ctx24);
			if (oldChart2) {
				oldChart2.destroy();
			}
			myChart24 = new Chart(ctx24, {
				type: 'line',
				data: {
					labels: rl28,
					datasets: [{
						label: 'RL28',
						data: rl28,
						fill: true,
						showLine: true,
						backgroundColor: 'rgba(242,227,20, 1.0)', 
						borderColor: 'rgba(242,227,20, 1.0)', 
						borderWidth: 1,
					}]
				},
				options: {
					elements: {
						point:{
							pointRadius: 0,
						},
					},
					scales: {
						y: {
							type: 'linear',
							display: false,
							beginAtZero: false,
							grid: {
								display: false,
							}
						},
						x: {
							display: false,
						}
					},
					plugins: {
						legend: {
							display: false,
						},
						title: {
							display: false,
						}
					}
				}
			});
			
			// 60 dias
			ctx25 = await document.getElementById('obj-28665').getContext('2d', {alpha: false});
			const oldChart3 = Chart.getChart(ctx25);
			if (oldChart3) {
				oldChart3.destroy();
			}
			myChart25 = new Chart(ctx25, {
				type: 'line',
				data: {
					labels: rl60,
					datasets: [{
						label: 'RL60',
						data: rl60,
						fill: true,
						showLine: true,
						backgroundColor: 'rgba(242,227,20, 1.0)', 
						borderColor: 'rgba(242,227,20, 1.0)', 
						borderWidth: 1,
					}]
				},
				options: {
					elements: {
						point:{
							pointRadius: 0,
						},
					},
					scales: {
						y: {
							type: 'linear',
							display: false,
							beginAtZero: false,
							grid: {
								display: false,
							}
						},
						x: {
							display: false,
						}
					},
					plugins: {
						legend: {
							display: false,
						},
						title: {
							display: false,
						}
					}
				}
			});
			
			document.getElementById('obj-28608').style.opacity = "1.0";
		}
		delayedGreeting();
	}
	
	$(document).on('page:beforein', '.page[data-name="adaptacionaltitud"]', function (e,page) {
		document.getElementById('obj-27651').style.opacity = "0.0";
		document.getElementById('obj-28608').style.opacity = "0.0";
		
		datesGraph = newdates;
		for (var i=1;i<8;i++) {
			let sumadorDias = new Date();
			sumadorDias.setDate(sumadorDias.getDate() + i);
			let dia = sumadorDias.getDate();
			dia = (dia < 10)? '0' + dia : dia;
			let mes = sumadorDias.getMonth()+1;
			mes = (mes < 10)? '0' + mes : mes;
			datesGraph.push(String(dia+"/"+mes));
		}
		datesGraph = datesGraph.slice(-60);
		
		$ ('#obj-28594').text(Number((stl[stl.length-1]).toFixed(2))); // STL
		$ ('#obj-28604').text(Number((ltl[ltl.length-1]).toFixed(2))); // LTL
		$ ('#obj-28605').text(Number((lb[lb.length-1]).toFixed(2))); // Fatiga Hipoxica
		
		let rampLoad7 = Number(((ltl[ltl.length-1]-ltl[ltl.length-8])).toFixed(2));
		let rampLoad28 = Number(((ltl[ltl.length-1]-ltl[ltl.length-29])).toFixed(2));
		let rampLoad60 = Number(((ltl[ltl.length-1]-ltl[0])).toFixed(2));
		
		$ ('#obj-28619').text(rampLoad7); // Ramp Load 7 days
		$ ('#obj-28640').text(rampLoad28); // Ramp Load 28 days
		$ ('#obj-28641').text(rampLoad60); // Ramp Load 60 days
		
		ultimos15AA();
		adaptacionAltitudGraph();
		rampLoad();
	});
	
	// -----------------------------------------------------------------------------------------------------
	// 							       	   PROGRAMACION ENTRENAMIENTO
	// -----------------------------------------------------------------------------------------------------
	function myVariablesSession() {
		async function delayedGreeting() {
			
			const entrenoProgramado = firestoredb.collection('programs').doc(String(docId)).collection('entrenoProgramado').doc('nextSession');
			const data = {
				altitudeMeters: Number(altitude),
				altitudeTime: Number(altitudet),
				ciclesNumber: Number(cicles),
				recoveryTime: Number(recovery),
				sesLevel: await nivelCS,
				spo2Limit: Number(limit),
				totalTime: Number(totaltime),
				patronRespiratorio: Number(patronRespiratorio)
			}
			entrenoProgramado.set(data);
			app.dialog.alert("El entreno ha sido programado para el usuario.");
			
			var user = firebase.auth().currentUser.email;
			var nombre,telefono,correo;
			
			if (user == 'admin@ialtitude.es') {
				var avgData = firestoredb.collection('thorium.users');
			} else {
				var avgData = firestoredb.collection('thorium.users').where('miEntrenador','==',String(user));
			}
			
			avgData.get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					if (doc.id == docId) {
						nombre = doc.data().displayName;
						telefono = doc.data().telefono;
						correo = doc.data().correo;
					}
				});
				
				firestoredb.collection('mail').add({
					to: `${correo}`,
					message: {
						subject: 'Nueva notificación de Energy App',
						text: `Hola ${nombre}, tu entrenador acaba de programarte una sesión. Accede a la app para verla.`,
						html: `Hola ${nombre}, tu entrenador acaba de programarte una sesión. Accede a la app para verla.`,
					}
				})
				
			}).catch(function (error) {
				console.log(error);
			});	
		}
		delayedGreeting();
	}
	
	// -----------------------------------------------------------------
	// 						SESION PERSONALIZADA
	// -----------------------------------------------------------------
	function calculoNivel() {		
		altitude = document.getElementById("altitude-slider");
		altitudet = document.getElementById("altitude-time-slider");
		recovery = document.getElementById("recovery-slider");
		cicles = document.getElementById("cicles-slider");
		limit = document.getElementById("limitslider");
		var progressBar2 = document.getElementById("obj-25283");
		totaltime = (parseInt(altitudet.value) + parseInt(recovery.value))*parseInt(cicles.value);
		coefAlt = eval(coefAlt2);
		if (coefAlt<1){coefAlt = 1;}
		nivelCS = eval(nivelCS2);
		if (totaltime > 90) {
			nivelCS = 0; 
			$("#flex4").css("opacity", 0.5);
		} else {
			$("#flex4").css("opacity", 1);
		}		
		if (nivelCS > 100) {nivelCS = 100;}	
		app.progressbar.set(progressBar2,nivelCS,300);
	}
	
	var limitSlider;
	function calculoLimSPO2() {
		var altitudeSlider = document.getElementById("altitude-slider");
		
		if (altitudeSlider.value == 1000) {newValue = 90;}
		if (altitudeSlider.value == 1500) {newValue = 89;}
		if (altitudeSlider.value == 2000) {newValue = 88;}
		if (altitudeSlider.value == 2500) {newValue = 87;}
		if (altitudeSlider.value == 3000) {newValue = 86;}
		if (altitudeSlider.value == 3500) {newValue = 85;}
		if (altitudeSlider.value == 4000) {newValue = 84;}
		if (altitudeSlider.value == 4500) {newValue = 83;}
		if (altitudeSlider.value == 5000) {newValue = 82;}
		if (altitudeSlider.value == 5500) {newValue = 81;}
		if (altitudeSlider.value == 6000) {newValue = 80;}
		
		document.getElementById("obj-ntydnn448").innerHTML =newValue+"%";
	}
	
	function calculoTtotal(){
		var altitudetSlider = document.getElementById("altitude-time-slider");
		var recoverySlider = document.getElementById("recovery-slider");
		var ciclesSlider = document.getElementById("cicles-slider");
		
		totaltime = 0;
		totaltime = (parseInt(altitudetSlider.value) + parseInt(recoverySlider.value))*parseInt(ciclesSlider.value);
		$ ('#obj_totaltime').text(totaltime+" '");
		
		if (totaltime > 90) {
			$('#obj_totaltime').css('color', 'red');
			var start = document.getElementById('obj_startcustom'); 
			start.style.pointerEvents = 'none';
			start.style.opacity = "0.7";
			start.style.backgroundColor = "rgb(90, 97, 110)";
		} else {
			$('#obj_totaltime').css('color', 'white');
			var start = document.getElementById('obj_startcustom'); 
			start.style.pointerEvents = 'auto';
			start.style.opacity = "1.0";
			start.style.backgroundColor = "rgb(242,227,20)";
		}
	}
	
	function updateAltitude(val){
		document.getElementById("obj-uyhgdy447").innerHTML =val+" m"; 
		calculoLimSPO2();
		limitSlider = app.range.get("#limit-slider");
		limitSlider.setValue(+newValue);
		calculoNivel();
	}
	
	function updateAltitudeTime(val){
		$ ('#obj-zjtipq599').text(val+"'");
		calculoTtotal();
		calculoNivel();
	}
	
	function updateRecovery(val){
		$ ('#obj-nvwqkm137').text(val+"'");
		calculoTtotal();
		calculoNivel();
	}
	
	function updateCicles(val){
		$ ('#obj-nirpue299').text(val);
		calculoTtotal();
		calculoNivel();
	}
	
	function updateLimit(val){
		document.getElementById("obj-ntydnn448").innerHTML =val+"%"; 
		calculoNivel();
	}
	
	var patronRespiratorio,patronresp;
	function updatePatron(val){
		document.getElementById("obj-28946").innerHTML =val+" s"; 
		$('#patronResp').removeClass("anim-circle");
		$('#patronResp').css("-webkit-animation-duration", val+"s");
		$('#patronResp').addClass("anim-circle");
	}
	
	// Boton de programar entrenamiento
	$(document).on("click", "#obj_startcustom", function(e){
		e.preventDefault();
		async function delayedGreeting() {
			altitudet = document.getElementById("altitude-time-slider");
			recovery = document.getElementById("recovery-slider");
			cicles = document.getElementById("cicles-slider");
			limit = document.getElementById("limitslider");
			altitude = document.getElementById("altitude-slider");
			patronresp = document.getElementById("patron-respiratorio-slider");
			
			altitude = altitude.value;
			altitudet = altitudet.value;
			recovery = recovery.value;
			cicles = cicles.value;
			limit	= limit.value;
			totaltime = (parseInt(altitudet) + parseInt(recovery))*parseInt(cicles);
			patronRespiratorio = patronresp.value;
			
			myVariablesSession();
		}
		delayedGreeting();
	});
	
	// -----------------------------------------------------------------
	// 			     		  Trainning Premium
	// -----------------------------------------------------------------
	function trainningPremium() {
		async function delayedGreeting() {
			
			// PROGRESS BAR DE NIVEL INTENSIDAD, CARGA ENTRENAMIENTO Y ENERGIA
			var nivelIntensidad = document.getElementById("obj-25302");
			var resultadoEntrenamiento = document.getElementById("obj-25306");
			var energia = document.getElementById("obj-25310");
			$ ('#obj-22758').text(HTIScoreMax);
			$ ('#obj-22746').text("NIVEL DIFICULTAD SESION: " + parseFloat(nivelInt).toFixed(2));
			$ ('#obj-22756').text("CARGA ENTRENAMIENTO: " + parseFloat(HTIscore).toFixed(2));
			$ ('#obj-22766').text("ENERGIA OBTENIDA: " + parseFloat(energiaEntre).toFixed(2));
			await app.progressbar.set(nivelIntensidad,nivelInt,300);
			await app.progressbar.set(resultadoEntrenamiento,parseInt((HTIscore*100)/HTIScoreMax),300);
			await app.progressbar.set(energia,energiaEntre*10,300);
			
			$ ('#obj-sapepw249').text(parseFloat(avgBR));               			
			$ ('#obj-ytabqy554').text(parseFloat(avgBV));              			
			$ ('#obj-sqbouj484').text(parseInt(avgHR));                
			$ ('#obj-rbhvqg270').text(parseInt(avgSPO2));   
			
			$ ('#obj-1662').text(await cuentaAtras2); 
			$ ('#obj-1656').text(await tipoMiniCiclo);
			$ ('#obj-1659').text(await formatNumber(altitudReal)); 
			$ ('#obj-1660').text(cicloActual + "/" + await ncicl); 
			$ ('#obj-1661').text(await cuentaAtras1); 
			
			if ((tiempoMiniCiclo - tiempoConsumidoMiniCilo)<11) {
				await sleep(500);
				$ ('#obj-1661').text(""); 
			}
			
			if(tipoMiniCiclo=="Hipoxia"){
				document.getElementById("obj-1656").style.color = "rgba(242,227,20, 1.0)";
				document.getElementById("obj-1661").style.color = "rgba(242,227,20, 1.0)";
			}
			else{
				document.getElementById("obj-1656").style.color = "#FFFEFE";
				document.getElementById("obj-1661").style.color = "#FFFEFE";
			}
			
			if (await statusPulxi == 0 || await statusPulxi == 2 || desconnect==true || estadoActual == 0) {
				thoriumCorePlugin.backToPreviousPage();
				app.tab.show("#toolbar-o-tphrnx030-subtab-3",true);
				clearInterval(trainP);
			}
		}
		delayedGreeting();
	}
	
	function medias() {
		async function delayedGreeting() {
			let HTIscoreInst = 0;
			if (SPO2 > 91 || SPO2 == 0 || SPO2 <= 65) {coef = 0;}
			if (SPO2 == 91 || SPO2 == 90) {coef = 1;}
			if (SPO2 == 89 || SPO2 == 88) {coef = 1.3;}
			if (SPO2 == 87 || SPO2 == 86) {coef = 1.6;}
			if (SPO2 == 85 || SPO2 == 84) {coef = 2;}
			if (SPO2 == 83 || SPO2 == 82) {coef = 2.5;}
			if (SPO2 == 81 || SPO2 == 80) {coef = 3.1;}
			if (SPO2 == 79 || SPO2 == 78) {coef = 3.7;}
			if (SPO2 == 77 || SPO2 == 76) {coef = 4.3;}
			if (SPO2 == 75 || SPO2 == 74) {coef = 4.7;}
			if (SPO2 == 73 || SPO2 == 72) {coef = 5.1;}
			if (SPO2 == 71 || SPO2 == 70) {coef = 5.6;}
			if (SPO2 < 70 && SPO2 > 65) {coef = 6;}
			
			HTIscoreInst = ((92-SPO2)/60)*coef;
			if (HTIscoreInst == NaN) {HTIscoreInst=0;}
			resultadoEntreArray.push(HTIscoreInst);
			HTIScoreMax = (92-70)*59;
			if (resultadoEntreArray.length > 1) {
				HTIscore = resultadoEntreArray.reduce((previous, current) => current += previous);
			} else {
				HTIscore = 0;
			}
			let nivelInt3 = nivelInt2*tiempoConsumidoSesion;
			if (nivelInt3 == NaN) {nivelInt3=0;}
			energiaEntre = ((nivelInt3/2)+(HTIscore*0.077))/10;
			if (energiaEntre == NaN || energiaEntre == "NaN") {energiaEntre=0;}
			if (energiaEntre>10) {energiaEntre=10;}
			
			var SPO2arrayFinal = [];
			SPO2arrayFinal = SPO2array;
			for(var i = SPO2arrayFinal.length - 1; i >= 0; i--) {
				if(SPO2arrayFinal[i] == 0) {
					SPO2arrayFinal.splice(i, 1);
				}
			}
			if (SPO2arrayFinal.length > 1) {
				var sum1 = SPO2arrayFinal.reduce((previous, current) => current += previous);
				avgSPO2 = Math.round(sum1 / SPO2arrayFinal.length);
			} else {
				avgSPO2 = 0;
			}
			
			var HRarrayFinal = [];
			HRarrayFinal = HRarray;
			for(var i = HRarrayFinal.length - 1; i >= 0; i--) {
				if(HRarrayFinal[i] == 0) {
					HRarrayFinal.splice(i, 1);
				}
			}	
			if (HRarrayFinal.length > 1) {
				var sum2 = HRarrayFinal.reduce((previous, current) => current += previous);
				avgHR = Math.round(sum2 / HRarrayFinal.length);
			} else {
				avgHR = 0;
			}	
			
			var BRacumuladoarrayFinal = [];
			BRacumuladoarrayFinal = BRacumuladoarray;
			for(var i = BRacumuladoarrayFinal.length - 1; i >= 0; i--) {
				if(BRacumuladoarrayFinal[i] == 0.00) {
					BRacumuladoarrayFinal.splice(i, 1);
				}
			}
			if (BRacumuladoarrayFinal.length > 1) {
				var sum4 = BRacumuladoarrayFinal.reduce((previous, current) => current += previous);
				avgBR = (sum4 / BRacumuladoarrayFinal.length).toFixed(2);	
			} else {
				avgBR = 0;
			}
			
			var BVacumuladoarrayFinal = [];
			BVacumuladoarrayFinal = BVacumuladoarray;
			for(var i = BVacumuladoarrayFinal.length - 1; i >= 0; i--) {
				if(BVacumuladoarrayFinal[i] == 0.00) {
					BVacumuladoarrayFinal.splice(i, 1);
				}
			}
			if (BVacumuladoarrayFinal.length > 1) {
				var sum5 = BVacumuladoarrayFinal.reduce((previous, current) => current += previous);
				avgBV = (sum5 / BVacumuladoarrayFinal.length).toFixed(2);	
			} else {
				avgBV = 0;
			}
		}
		delayedGreeting();
	}
	
	$(document).on("click", "#flexbox-1028", function(e){
		e.preventDefault();
		thoriumCorePlugin.loadpage("sessionpremium2",null,null);
		if (tiempoConsumidoSesion>0){
			trainP = setInterval(trainningPremium,1000);
		} 
	});
	
	// -----------------------------------------------------------------
	// 			     		Trainning Premium Graphs
	// -----------------------------------------------------------------
	function rtdb_graphs() {
		async function delayedGreeting() {
			
			await sleep(1000);
			
			ctx5 = await document.getElementById('obj-25422').getContext('2d', {alpha: false});
			const oldChart3 = Chart.getChart(ctx5);
			if (oldChart3) {
				oldChart3.destroy();
			}
			myChart5 = new Chart(ctx5, {
				type: 'line',
				data: {
					labels: [''],
					datasets: [{
						label: 'FC',
						data: [65],
						fill: false,
						yAxisID: 'y',
						showLine: true,
						borderColor: 'rgba(255, 98, 144, 1.0)',  
						borderWidth: 1,
						tension: 0.75
					},{
						label: 'SPO2',
						data: [100],
						fill: false,
						yAxisID: 'y1',
						showLine: true,
						borderColor: 'rgba(171,223,255, 1.0)',  
						borderWidth: 1,
						tension: 0.75
					},{
						label: 'Límite SPO2',
						data: [88],
						fill: false,
						yAxisID: 'y1',
						showLine: true,
						borderColor: '#FA3824',  
						borderWidth: 1,
					},
					{
						label: 'SPO2 92',
						data: [92],
						fill: false,
						yAxisID: 'y1',
						showLine: true,
						borderColor: 'rgba(242,227,20, 1.0)',  
						borderWidth: 1,
					}]
				},
				options: {
					elements: {
						point:{
							pointRadius: 0,
						},
					},
					scales: {
						y: {
							type: 'linear',
							position: 'right',
							display: true,
							grid: {
								display: false,
							},
							max: 150,
							min: 40,
							beginAtZero: false,
							ticks: {
								color: 'rgba(255, 98, 144, 0.7)', 
							}
						},
						y1: {
							type: 'linear',
							position: 'left',
							display: true,
							grid: {
								display: false,
							},
							max: 100,
							min: 70,
							beginAtZero: false,
							ticks: {
								color: 'rgba(171,223,255, 0.7)',
							}
						},
						x: {
							display: false,
						}
					},
					events: [],
					plugins: {
						legend: {
							labels: {
								boxHeight: 7,
								boxWidth: 7,
							},
							display: true,
							position: 'top',
						},
						title: {
							display: false,
						}
					}
				}
			});
			
			ctx6 = await document.getElementById('obj-1573').getContext('2d', {alpha: false});
			const oldChart2 = Chart.getChart(ctx6);
			if (oldChart2) {
				oldChart2.destroy();
			}
			myChart6 = new Chart(ctx6, {
				type: 'line',
				data: {
					labels: [''],
					datasets: [{
						label: 'AVG RPM',
						data: [0],
						fill: false,
						yAxisID: 'y',
						showLine: true,
						borderColor: 'rgba(204,204,204, 1.0)',  
						borderWidth: 1,
						tension: 0.25
					},{
						label: 'VR',
						data: [0],
						fill: false,
						yAxisID: 'y1',
						showLine: true,
						borderColor: 'rgba(43,159,42, 1.0)',  
						borderWidth: 1,
						tension: 0.25
					},{
						label: 'Objetivos',
						data: [8],
						fill: false,
						yAxisID: 'y',
						showLine: true,
						borderColor: 'rgba(242,227,20, 1.0)', 
						borderWidth: 1,
					},{
						label: 'Límite hiperventilación',
						data: [12],
						fill: false,
						yAxisID: 'y',
						showLine: true,
						borderColor: '#FA3824', 
						borderWidth: 1,
					}]
				},
				options: {
					elements: {
						point:{
							pointRadius: 0,
						},
					},
					scales: {
						y: {
							type: 'linear',
							display: true,
							position: 'right',
							grid: {
								display: false,
							},
							max: 15,
							min: 0,
							ticks: {
								color: 'rgba(204,204,204, 0.7)', 
							}
						},
						y1: {
							type: 'linear',
							display: true,
							position: 'left',
							grid: {
								display: false,
							},
							max: 1.5,
							min: 0,
							ticks: {
								color: 'rgba(43,159,42, 0.7)', 
							}
						},
						x: {
							display: false,
						}
					},
					events: [],
					plugins: {
						legend: {
							labels: {
								boxHeight: 7,
								boxWidth: 7,
							},
							display: true,
							position: 'bottom',
						},
						title: {
							display: false,
						}
					}
				}
			});
			
			document.getElementById('flexbox-26745').style.opacity = "1.0";
			
		}
		delayedGreeting();
	}
	
	function addData(chart, label, data1, data2, data3,data4) {
		chart.data.labels.push(label);
		chart.data.datasets[0].data.push(data1);
		chart.data.datasets[1].data.push(data2);
		if (data3 != null){
			chart.data.datasets[2].data.push(data3);
		}
		if (data4 != null){
			chart.data.datasets[3].data.push(data4);
		}
		chart.update();
	}
	
	function removeData(chart) {
		chart.data.labels.pop();
		chart.data.datasets.forEach((dataset) => {
			dataset.data.shift();
		});
		chart.update();
	}
	
	function graficar() {
		async function delayedGreeting() {
			
			$ ('#obj-1579').text(SPO2);               			
			$ ('#obj-1581').text(HR);               			
			$ ('#obj-1583').text(BV);                			
			$ ('#obj-1585').text(BRacumulado); 
			$ ('#obj-25625').text("AVG"); 
			$ ('#obj-1646').text(await cuentaAtras2); 
			$ ('#obj-1640').text(await tipoMiniCiclo); 
			$ ('#obj-1643').text(await formatNumber(altitudReal)); 
			$ ('#obj-1644').text(cicloActual + "/" + await ncicl);
			$ ('#obj-1645').text(await cuentaAtras1);  
			
			var textspo22 = document.getElementById('obj-1579'); 
			if (await statusPulxi == 1 && SPO2 < await limspo){
				textspo22.style.color = '#FA3824'; 
			} else {
				textspo22.style.color = '#FFFFFF'; 
			}
			
			var BRlimit = 12;
			var BVlimit = 12;
			var textbv = document.getElementById('obj-1583'); 
			var textbr = document.getElementById('obj-1585'); 
			if (BRacumulado >= BRlimit || BVacumulado >= BVlimit) {
				textbr.style.color = '#FA3824'; 
				textbv.style.color = '#FA3824'; 
			} else {
				textbr.style.color = '#FFFFFF'; 
				textbv.style.color = '#FFFFFF'; 
			}
			
			if (await statusPulxi == 0 || await statusPulxi == 2 || desconnect==true || estadoActual == 0) {
				thoriumCorePlugin.backToPreviousPage();
				app.tab.show("#toolbar-o-tphrnx030-subtab-3",true);
				clearInterval(gfrt); 
				myChart5.clear();	
				myChart6.clear();        			
			}
			
			if ((tiempoMiniCiclo - tiempoConsumidoMiniCilo)<11) {
				await sleep(500);
				$ ('#obj-1645').text(""); 
			}
			
			limitData.push(BR);
			
			if(tipoMiniCiclo=="Hipoxia"){
				document.getElementById("obj-1640").style.color = "rgba(252, 110, 12, 1.0)";
				document.getElementById("obj-1645").style.color = "rgba(252, 110, 12, 1.0)";
			}
			else{
				document.getElementById("obj-1640").style.color = "#FFFEFE";
				document.getElementById("obj-1645").style.color = "#FFFEFE";
			}
			
			addData(myChart5, tiempoConsumidoSesion, HR, SPO2,await limspo,92);
			addData(myChart6, tiempoConsumidoSesion, BRacumulado, BV, 8,12);
			
			if (limitData.length > 300) {
				removeData(await myChart5,HR);
				removeData(await myChart6,BV);
			}
		}
		delayedGreeting();
	}
	
	
	$(document).on("click", "#flexbox-1025", function(e) {
		e.preventDefault();
		thoriumCorePlugin.loadpage("sessionpremium3",null,null);
		if (tiempoConsumidoSesion>0){
			limitData = [];
			gfrt = setInterval(graficar,1000);
		} 
	});
	
	$(document).on('page:init','.page[data-name="sessionpremium3"]', function (e,page) {
		var page = e.detail;
		document.getElementById('flexbox-26745').style.opacity = "0.0";
		rtdb_graphs();
	});
	
	// -----------------------------------------------------------------
	// 		      	     Reporting Premium Resultados
	// -----------------------------------------------------------------
	var EnR = [],EnV = [], EnN = [], cargaAcumulada=[],nda = [], cae = [], labelGraph2 = [],labelGraph3 = [],k1=[],k3=[],k5=[],energia25 = [],energia50 = [],energia75 = [],myChart16,ctx16;
	async function primeros15Energia() {
		EnR = energiaRoja.slice(0,30);
		EnV = energiaVerde.slice(0,30);
		EnN = energiaNaranja.slice(0,30);
		nda = altitudSArray.slice(0,30);
		cae = cargaEArray.slice(0,30);
		k1 = [2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000];
		k3 = [4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000];
		k5 = [6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000];
		energia25 = [25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25];
		energia50 = [50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50];
		energia75 = [75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75];
		labelGraph3 = newdates.slice(0,30);
		labelGraph2 = newdates.slice(0,30);
	}
	
	async function ultimos15Energia() {
		EnR = energiaRoja.slice(-30);
		EnV = energiaVerde.slice(-30);
		EnN = energiaNaranja.slice(-30);
		nda = altitudSArray.slice(-30);
		cae = cargaEArray.slice(-30);
		k1 = [2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000];
		k3 = [4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000];
		k5 = [6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000,6000];
		energia25 = [25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25];
		energia50 = [50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50];
		energia75 = [75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75];
		labelGraph3 = newdates.slice(-30);
		labelGraph2 = newdates.slice(-30);
	}
	
	// Evolucion de la energia
	function report_graph() {
		async function delayedGreeting() {
			ctx7 = await document.getElementById('obj-25486').getContext('2d', {alpha: false});
			const oldChart = Chart.getChart(ctx7);
			if (oldChart) {
				oldChart.destroy();
			}
			myChart7 = new Chart(ctx7, {
				data: {
					labels: labelGraph2,
					datasets: [{
						type: 'bar',
						label: 'Acumulada',
						data: EnN,
						fill: true,
						barThickness: 6,
						yAxisID: 'y',
						showLine: true,	
						backgroundColor: 'rgba(242,227,20, 1.0)',  
					},{
						type: 'bar',
						label: 'Ganada',
						data: EnV,
						fill: true,
						barThickness: 6,
						yAxisID: 'y',
						showLine: true,	
						backgroundColor: 'rgba(43,159,42, 1.0)', 
					},{
						type: 'bar',
						label: 'Perdida',
						data: EnR,
						fill: true,
						barThickness: 6,
						yAxisID: 'y',
						showLine: true,	
						backgroundColor: 'rgba(250,56,36, 1.0)', 
					},{
						type: 'line',
						label: '25%',
						data: energia25,
						fill: false,
						yAxisID: 'y1',
						showLine: true,	
						borderColor: 'rgba(90,97,110, 0.5)', 
						borderWidth: 0.5
					},{
						type: 'line',
						label: '50%',
						data: energia50,
						fill: false,
						yAxisID: 'y1',
						showLine: true,	
						borderColor: 'rgba(90,97,110, 0.5)', 
						borderWidth: 0.5
					},{
						type: 'line',
						label: '75%',
						data: energia75,
						fill: false,
						yAxisID: 'y1',
						showLine: true,	
						borderColor: 'rgba(90,97,110, 0.5)', 
						borderWidth: 0.5
					}]
				},
				options: {
					layout: {
						padding: 0
					},
					elements: {
						point:{
							pointRadius: 0,
						},
						bar:{
							borderRadius: 5,
							skipNull: false,
							drawNull: false,
						},
					},
					scales: {
						y: {
							stacked: true,
							type: 'linear',
							display: false,
							grid: {
								display: false,
							},
							max: 100,
							min: 0,
							beginAtZero: true,
							ticks: {
								color: 'rgba(255, 255, 255, 0.7)',
								padding: 0,
								font: {
									size:10,
								},
							}
						},
						y1: {
							type: 'linear',
							display: false,
							grid: {
								display: false,
							},
							max: 100,
							min: 0,
							beginAtZero: true,
							ticks: {
								color: 'rgba(255, 255, 255, 0.7)',
								padding: 0,
								font: {
									size:10,
								},
							}
						},
						x: {
							stacked: true,
							type: 'category',
							display: true,
							suggestedMin: 30,
							ticks: {
								color: 'rgba(255, 255, 255, 0.7)', 
								padding: 0,
								minRotation: 0,
								maxRotation: 0,
								font: {
									size:10,
								},
							},
							grid: {
								offset:false,
								display: false,
							},
						}
					},
					plugins: {
						legend: {
							labels: {
								boxHeight: 7,
								boxWidth: 7,
							},
							display: true,
							position: 'top',
						},
						title: {
							display: false,
						}
					}
				}
			});
		}
		delayedGreeting();
	}
	
	// Carga VS Altitud
	var ctx21,myChart21;
	function report_graph2() {
		async function delayedGreeting() {
			ctx14 = await document.getElementById('obj-26873').getContext('2d', {alpha: false});
			const oldChart4 = Chart.getChart(ctx14);
			if (oldChart4) {
				oldChart4.destroy();
			}
			myChart14 = new Chart(ctx14, {	
				data: {
					labels: labelGraph3,
					datasets: [{
						type: 'bar',
						label: 'Carga entrenamiento',
						data: cae,
						barThickness: 6,
						fill: true,
						yAxisID: 'y1',
						xAxisID: 'x1',
						showLine: true,					
						backgroundColor: 'rgba(171,223,255, 1.0)',
					}]
				},
				options: {
					elements: {
						bar:{
							borderRadius: 5,
							skipNull: false,
							drawNull: true,
						},
					},
					scales: {
						y1: {
							type: 'linear',
							display: false,
							position: 'right',
							suggestedMax: 1298,
							suggestedMin: 0,
							reverse: true,
							grid: {
								display: false,
							},
							ticks: {
								color: 'rgba(242,227,20, 0.7)',
								font: {
									size:10,
								},
							}
						},
						x1: {
							type: 'category',
							display: false,
							position: 'bottom',
							suggestedMin: 30,
							grid: {
								offset:false,
								display: false,
							}
						}
					},
					plugins: {
						legend: {
							labels: {
								boxHeight: 7,
								boxWidth: 7,
							},
							display: false,
							position: 'bottom',
						},
						title: {
							display: false,
						}
					}
				}
			});
			
			ctx21 = await document.getElementById('obj-27622').getContext('2d', {alpha: false});
			const oldChart5 = Chart.getChart(ctx21);
			if (oldChart5) {
				oldChart5.destroy();
			}
			myChart21 = new Chart(ctx21, {	
				data: {
					labels: labelGraph3,
					datasets: [{
						type: 'line',
						label: 'Altitud promedio',
						data: nda,
						fill: false,
						yAxisID: 'y',
						xAxisID: 'x',
						pointRadius: 2,
						showLine: true,					
						backgroundColor: 'rgba(250,56,36, 0.0)',  
						borderColor: 'rgba(250,56,36, 1.0)', 
						borderWidth: 1,
					},{
						type: 'line',
						label: '2k',
						data: k1,
						fill: false,
						yAxisID: 'y',
						xAxisID: 'x',
						pointRadius: 0,
						showLine: true,	
						borderColor: 'rgba(90,97,110, 0.5)', 
						borderWidth: 0.5
					},{
						type: 'line',
						label: '4k',
						data: k3,
						fill: false,
						yAxisID: 'y',
						xAxisID: 'x',
						pointRadius: 0,
						showLine: true,	
						borderColor: 'rgba(90,97,110, 0.5)', 
						borderWidth: 0.5
					},{
						type: 'line',
						label: '6k',
						data: k5,
						fill: false,
						yAxisID: 'y',
						xAxisID: 'x',
						pointRadius: 0,
						showLine: true,	
						borderColor: 'rgba(90,97,110, 0.5)', 
						borderWidth: 0.5
					}]
				},
				options: {
					elements: {
						bar:{
							borderRadius: 5,
							skipNull: false,
							drawNull: true,
						},
					},
					scales: {
						y: {
							type: 'linear',
							display: false,
							position: 'left',
							suggestedMax: 6000,
							min: 1000,
							grid: {
								display: false,
							},
							ticks: {
								color: 'rgba(250,56,36, 0.7)',
								font: {
									size:10,
								},
							}
						},
						x: {
							type: 'category',
							display: false,
							suggestedMin: 30,
							position: 'top',
							grid: {
								offset:false,
								display: false,
							}
						}
					},
					plugins: {
						legend: {
							labels: {
								boxHeight: 7,
								boxWidth: 7,
							},
							display: true,
							position: 'bottom',
						},
						title: {
							display: false,
						}
					}
				}
			});
		}
		delayedGreeting();
	}
	
	// Energia acumuladas
	function report_graph3() {
		async function delayedGreeting() {
			ctx16 = await document.getElementById('obj-27142').getContext('2d', {alpha: false});
			const oldChart6 = Chart.getChart(ctx16);
			if (oldChart6) {
				oldChart6.destroy();
			}
			myChart16 = new Chart(ctx16, {	
				type: 'bar',
				data: {
					labels: ['Total'],
					datasets: [{
						label: ['Ganada'],
						data: [energiaVerde.reduce((previous, current) => current += previous)],
						barThickness: 10,
						barPercentage: 0.75,
						fill: true,
						showLine: true,					
						backgroundColor: 'rgba(43,159,42, 1.0)',
						borderColor: 'rgba(43,159,42, 1.0)', 
						borderWidth: 0
					},{
						label: ['Perdida'],
						data: [energiaRoja.reduce((previous, current) => current += previous)],
						barThickness: 10,
						barPercentage: 0.75,
						fill: true,
						showLine: true,					
						backgroundColor: 'rgba(250,56,36, 1.0)',  
						borderColor: 'rgba(250,56,36, 1.0)', 
						borderWidth: 0
					},{
						label: ['Energía acumulada'],
						data: [energySA],
						barThickness: 10,
						barPercentage: 0.75,
						fill: true,
						showLine: true,					
						backgroundColor: 'rgba(242,227,20, 1.0)',
						borderColor: 'rgba(242,227,20, 1.0)', 
						borderWidth: 0
					}]
				},
				options: {
					indexAxis: 'y',
					scales: {
						y: {
							display: false,
							min:0,
							max:100,
							grid: {
								display: false,
							},
							ticks: {
								color: 'rgba(255, 255, 255, 0.7)', 
								font: {
									size:10,
								},
							}
						},
						x: {
							display: true,
							min:0,
							max:100,
							grid: {
								display: true,
								drawBorder: false,
								color:'rgba(242,227,20, 1.0)',
							},
							ticks: {
								color: 'rgba(242,227,20, 0.7)', 
								font: {
									size:10,
								},
							}
						}
					},
					plugins: {
						legend: {
							labels: {
								boxHeight: 7,
								boxWidth: 7,
							},
							display: true,
							position: 'bottom',
						},
						title: {
							display: false,
						}
					}
				}
			});
		}
		delayedGreeting();
	}
	
	// Flecha izquierda grafica barras evolucion energia y carga
	$(document).on("click", "#obj-26851", function(e) {
		async function delayedGreeting() {
			e.preventDefault();
			primeros15Energia();
			report_graph();
			await myChart7.update();
			report_graph2();
			await myChart14.update();
		}
		delayedGreeting();
	});
	
	// Flecha derecha grafica barras evolucion energia y carga
	$(document).on("click", "#obj-26855", function(e) {
		async function delayedGreeting() {
			e.preventDefault();
			ultimos15Energia();
			report_graph();
			await myChart7.update();
			report_graph2();
			await myChart14.update();
		}
		delayedGreeting();
	});
	
	var ultMfr,ultMvr,ultMspo2,ultMfc,ultCarga,tiempoLastSession,myChart15,ctx15;
	var Mfr=[];Mvr=[];Mspo2=[];Mfc=[];tCarga=[];tls=[];alts=[],ths=[],trs=[],ncs=[],lss=[],tts=[];
	$(document).on('page:beforein','.page[data-name="reportingpremium"]', function (e,page) {
		async function delayedGreeting() {
			document.getElementById('obj-25543').style.opacity = "0.0";
			document.getElementById('obj-26877').style.opacity = "0.0";
			ultimos15Energia();
			report_graph();
			report_graph2();
			report_graph3();
			document.getElementById('obj-25543').style.opacity = "1.0";
			document.getElementById('obj-26877').style.opacity = "1.0";
		}
		delayedGreeting();
	});   
	
	// -----------------------------------------------------------------
	// 			     Reporting Premium Biomarcadores
	// -----------------------------------------------------------------
	function report_all_graphs() {
		async function delayedGreeting() {
			
			ctx9 = await document.getElementById('obj_1289').getContext('2d', {alpha: false});
			const oldChart = Chart.getChart(ctx9);
			if (oldChart) {
				oldChart.destroy();
			}
			myChart9 = new Chart(ctx9, {
				type: 'line',
				data: {
					labels: date1array,
					datasets: [{
						label: 'Media FC',
						data: avgHR1array,
						fill: false,
						yAxisID: 'y',
						showLine: true,
						backgroundColor: 'rgba(255, 98, 144, 0.0)',
						borderColor: 'rgba(255, 98, 144, 1.0)',  
						borderWidth: 1,
					},{
						label: 'Media SPO2',
						data: avgSPO21array,
						fill: false,
						yAxisID: 'y1',
						showLine: true,
						backgroundColor: 'rgba(171,223,255, 0.0)',  
						borderColor: 'rgba(171,223,255, 1.0)',
						borderWidth: 1,
					}]
				},
				options: {
					elements: {
						point:{
							pointRadius: 2,
						},
					},
					scales: {
						y: {
							type: 'linear',
							display: true,
							position: 'right',
							suggestedMax: 85,
							suggestedMin: 50,
							beginAtZero: false,
							grid: {
								display: false,
							},						
							ticks: {
								color: 'rgba(255, 98, 144, 0.7)', 
								font: {
									size:10,
								},
							}
						},
						y1: {
							type: 'linear',
							display: true,
							position: 'left',
							suggestedMax: 98,
							suggestedMin: 85,
							beginAtZero: false,
							grid: {
								display: false,
							},
							ticks: {
								color: 'rgba(171,223,255, 0.7)',
								font: {
									size:10,
								},
							}
						},
						x: {
							display: false,
						}
					},
					plugins: {
						legend: {
							labels: {
								boxHeight: 7,
								boxWidth: 7,
							},
							display: true,
							position: 'top',
						},
						title: {
							display: false,
						}
					}
				}
			});
			
			ctx10 = await document.getElementById('obj_1679').getContext('2d', {alpha: false});
			const oldChart2 = Chart.getChart(ctx10);
			if (oldChart2) {
				oldChart2.destroy();
			}
			myChart10 = new Chart(ctx10, {
				type: 'line',
				data: {
					labels: date1array,
					datasets: [{
						label: 'Media FR',
						data: avgBR1array,
						fill: false,
						yAxisID: 'y',
						showLine: true,					
						backgroundColor: 'rgba(204,204,204, 0.0)',  
						borderColor: 'rgba(204,204,204, 1.0)',  
						borderWidth: 1,
					},{
						label: 'Media VR',
						data: avgBV1array,
						fill: false,
						yAxisID: 'y1',
						showLine: true,					
						backgroundColor: 'rgba(43,159,42, 0.0)',  
						borderColor: 'rgba(43,159,42, 1.0)',  
						borderWidth: 1,
					}]
				},
				options: {
					elements: {
						point:{
							pointRadius: 2,
						},
					},
					scales: {
						y: {
							type: 'linear',
							display: true,
							position: 'right',
							suggestedMax: 12,
							suggestedMin: 1,
							grid: {
								display: false,
							},
							ticks: {
								color: 'rgba(204, 204, 204, 0.7)', 
								font: {
									size:10,
								},
							}
						},
						y1: {
							type: 'linear',
							display: true,
							position: 'left',
							suggestedMax: 12,
							suggestedMin: 1,
							grid: {
								display: false,
							},
							ticks: {
								color: 'rgba(43,159,42, 0.7)', 
								font: {
									size:10,
								},
							}
						},
						x: {
							display: false,
						}
					},
					plugins: {
						legend: {
							labels: {
								boxHeight: 7,
								boxWidth: 7,
							},
							display: true,
							position: 'bottom',
						},
						title: {
							display: false,
						}
					}
				}
			});
			
			ctx13 = await document.getElementById('obj-26845').getContext('2d', {alpha: false});
			const oldChart3 = Chart.getChart(ctx13);
			if (oldChart3) {
				oldChart3.destroy();
			}
			myChart13 = new Chart(ctx13, {	
				data: {
					labels: date1array,
					datasets: [{
						type: 'bar',
						label: 'Nivel dificultad',
						data: nivelDificultadArray,
						barThickness: 6,
						fill: true,
						yAxisID: 'y1',
						showLine: true,					
						backgroundColor: 'rgba(204, 204, 204, 1.0)', 
						borderColor: 'rgba(204, 204, 204, 1.0)',  
						borderWidth: 0,
					},{
						type: 'line',
						label: 'Altitud',
						data: altitudArray,
						fill: false,
						yAxisID: 'y',
						showLine: true,					
						backgroundColor: 'rgba(250,56,36, 0.0)', 
						borderColor: 'rgba(250,56,36, 1.0)', 
						borderWidth: 1,
					},{
						type: 'line',
						label: '% Adaptación',
						data: porcAdaptArray,
						fill: false,
						yAxisID: 'y1',
						showLine: true,					
						backgroundColor: 'rgba(242,227,20, 0.0)', 
						borderColor: 'rgba(242,227,20, 1.0)', 
						borderWidth: 1,
					}]
				},
				options: {
					elements: {
						point:{
							pointRadius: 2,
						},
						bar:{
							borderRadius: 5,
							skipNull: false,
							drawNull: true,
						},
					},
					scales: {
						y: {
							type: 'linear',
							display: true,
							position: 'left',
							suggestedMax: 6000,
							suggestedMin: 1000,
							grid: {
								display: false,
							},
							ticks: {
								color: 'rgba(250,56,36, 0.7)', 
								font: {
									size:10,
								},
							}
						},
						y1: {
							type: 'linear',
							display: true,
							position: 'right',
							suggestedMax: 100,
							suggestedMin: 0,
							grid: {
								display: false,
							},
							ticks: {
								color: 'rgba(204, 204, 204, 0.7)', 
								font: {
									size:10,
								},
							}
						},
						x: {
							display: false,
						}
					},
					plugins: {
						legend: {
							labels: {
								boxHeight: 7,
								boxWidth: 7,
							},
							display: true,
							position: 'bottom',
						},
						title: {
							display: false,
						}
					}
				}
			});
			
			var content = document.getElementById('obj-1571'); 
			content.style.opacity = "1.0";
		}
		delayedGreeting();
	}
	
	$(document).on('page:init','.page[data-name="reportingpremium2"]', function (e,page) {
		var page = e.detail;
		
		var content = document.getElementById('obj-1571'); 
		content.style.opacity = "0.0";
		
		avgBR1array=[];avgBV1array=[];avgHR1array=[];avgSPO21array=[];date1array=[];altitudArray = [];porcAdaptArray=[];nivelDificultadArray = [];
		
		var dt = new Date();
		dt.setDate(dt.getDate() - 60); 
		var dtmili = Math.floor(dt.getTime()/1000); 
		
		const avgData = firestoredb.collection('programs').doc(String(docId)).collection('sessions');
		avgData.orderBy("timestamp","asc").where('timestamp', '>=', dtmili).get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				avgBR1array.push(doc.data().avgBR);
				avgBV1array.push(doc.data().avgBV);
				avgHR1array.push(doc.data().avgHR);
				avgSPO21array.push(doc.data().avgSPO2);
				altitudArray.push(parseInt(doc.data().altitud));
				let porcAdapt = parseFloat(doc.data().porcAdaptacion);
				if (String(porcAdapt) == 'NaN') {porcAdapt = 0;}
				porcAdaptArray.push(porcAdapt);
				nivelDificultadArray.push(Number(doc.data().nivelIntensidad));
				var timestamp2 = doc.data().timestamp * 1000;
				var date3 = new Date(timestamp2);
				date1array.push(String(date3.getDate()+"/"+(date3.getMonth()+1)+"/"+date3.getFullYear()));
			});
			report_all_graphs();
		});
	});
	
	// -----------------------------------------------------------------
	// 			       				 Sesion detail 
	// -----------------------------------------------------------------
	function sesion_detail_graphs() {
		async function delayedGreeting() {
			ctx11 = await document.getElementById('obj-25530').getContext('2d', {alpha: false});
			const oldChart = Chart.getChart(ctx11);
			if (oldChart) {
				oldChart.destroy();
			}
			myChart11 = new Chart(ctx11, {
				data: {
					labels: Array.from({length: HRarray2.length}, (v, i) => i),
					datasets: [{
						type: 'line',
						label: 'Ciclos hipoxia e hiperoxia',
						fill: true,
						yAxisID: 'y1',
						data: ciclosGraph,
						backgroundColor: 'rgba(155,169,216, 0.1)',  
						borderWidth: 0
					},{
						type: 'line',
						label: 'FC',
						data: HRarray2,
						fill: false,
						yAxisID: 'y',
						showLine: true,
						backgroundColor: 'rgba(255, 98, 144, 0.2)',  
						borderColor: 'rgba(255, 98, 144, 1.0)', 
						borderWidth: 1,
						tension: 0.75
					},{
						type: 'line',
						label: 'SPO2',
						data: SPO2array2,
						fill: false,
						yAxisID: 'y1',
						showLine: true,
						backgroundColor: 'rgba(171,223,255, 0.2)', 
						borderColor: 'rgba(171,223,255, 1.0)',  
						borderWidth: 1,
						tension: 0.75
					},{
						type: 'line',
						label: 'Límite SPO2',
						data: limsparray,
						fill: false,
						yAxisID: 'y1',
						showLine: true,
						borderColor: '#FA3824', 
						borderWidth: 1,
						tension: 0.75
					},{
						type: 'line',
						label: 'SPO2 92',
						data: spo290,
						fill: false,
						yAxisID: 'y1',
						showLine: true,
						borderColor: 'rgba(242,227,20, 1.0)', 
						borderWidth: 1,
						tension: 0.75
					}]
				},
				options: {
					elements: {
						point:{
							pointRadius: 0,
						},
					},
					scales: {
						y: {
							type: 'linear',
							position: 'right',
							display: true,
							grid: {
								display: false,
							},
							suggestedMax: 150,
							min: 40,
							beginAtZero: false,
							ticks: {
								color: 'rgba(255, 98, 144, 0.7)',
								font: {
									size:10,
								}, 
							}
						},
						y1: {
							type: 'linear',
							position: 'left',
							display: true,
							grid: {
								display: false,
							},
							suggestedMax: 100,
							min: 70,
							beginAtZero: false,
							ticks: {
								color: 'rgba(171,223,255, 0.7)',
								font: {
									size:10,
								},
							}
						},
						x: {
							display: false,
							grid: {
								display: false,
							},
						}
					},
					plugins: {
						zoom: {
							pan: {
								enabled: true,
								mode: 'x',
							},
							zoom: {
								wheel: {
									enabled: true,
								},
								pinch: {
									enabled: true,
								},
								mode: 'x',
							}
						},
						legend: {
							labels: {
								boxHeight: 7,
								boxWidth: 7,
							},
							display: true,
							position: 'bottom',
						},
						title: {
							display: false,
						}
					}
				}
			});
			
			ctx12 = await document.getElementById('obj-25531').getContext('2d', {alpha: false});
			const oldChart2 = Chart.getChart(ctx12);
			if (oldChart2) {
				oldChart2.destroy();
			}
			myChart12 = new Chart(ctx12, {
				type: 'line',
				data: {
					labels: Array.from({length: BRarray2.length}, (v, i) => i),
					datasets: [{
						type: 'line',
						label: 'Ciclos hipoxia e hiperoxia',
						fill: true,
						yAxisID: 'y',
						data: ciclosGraph,
						backgroundColor: 'rgba(155,169,216, 0.1)',  
						borderWidth: 0
					},{
						label: 'AVG RPM',
						data: BRarray2,
						fill: false,
						yAxisID: 'y',
						showLine: true,
						backgroundColor: 'rgba(204,204,204, 0.2)', 
						borderColor: 'rgba(204,204,204, 1.0)',
						borderWidth: 1,
						tension: 0.25
					},{
						label: 'VR',
						data: BVarray2,
						fill: false,
						yAxisID: 'y1',
						showLine: true,
						backgroundColor: 'rgba(43,159,42, 0.2)', 
						borderColor: 'rgba(43,159,42, 1.0)',
						borderWidth: 1,
						tension: 0.25
					},{
						label: 'Objetivos',
						data: frobjetivo,
						fill: false,
						yAxisID: 'y',
						showLine: true,
						borderColor: 'rgba(242,227,20, 1.0)', 
						borderWidth: 1,
					},{
						label: 'Límite hiperventilación',
						data: limhiperv,
						fill: false,
						yAxisID: 'y',
						showLine: true,
						borderColor: '#FA3824', 
						borderWidth: 1,
					}]
				},
				options: {
					elements: {
						point:{
							pointRadius: 0,
						},
					},
					scales: {
						y: {
							type: 'linear',
							display: true,
							position: 'right',
							grid: {
								display: false,
							},
							max: 15,
							min: 0,
							ticks: {
								color: 'rgba(204,204,204, 0.7)', 
								font: {
									size:10,
								},
							}
						},
						y1: {
							type: 'linear',
							display: true,
							position: 'left',
							grid: {
								display: false,
							},
							suggestedMax: 1,
							min: 0,
							ticks: {
								color: 'rgba(43,159,42, 0.7)', 
								font: {
									size:10,
								},
							}
						},
						x: {
							display: false,
							grid: {
								display: false,
							},
						}
					},
					plugins: {
						zoom: {
							pan: {
								enabled: true,
								mode: 'x',
							},
							zoom: {
								wheel: {
									enabled: true,
								},
								pinch: {
									enabled: true,
								},
								mode: 'x',
							}
						},
						legend: {
							labels: {
								boxHeight: 7,
								boxWidth: 7,
							},
							display: true,
							position: 'bottom',
						},
						title: {
							display: false,
						},
					}
				}
			});
		}
		delayedGreeting();
	}
	
	$(document).on('page:beforein','.page[data-name="sesion_detail"]', function (e,page) {
		var page = e.detail;
		
		ciclosGraph=[];spo290=[];limsparray=[];frobjetivo=[];limhiperv=[];
		
		var ciclosSesion = document.getElementById("obj-22500").textContent;
		var hipoxiaSesion = document.getElementById("obj-22494").textContent.split("'");
		var recoverySesion = document.getElementById("obj-22497").textContent.split("'");;
		hipoxiaSesion =  parseInt(hipoxiaSesion.map(Number));
		recoverySesion =  parseInt(recoverySesion.map(Number));
		
		for(var i=0;i<ciclosSesion;i++) {
			for(var j=0;j<(hipoxiaSesion*60);j++) {
				ciclosGraph.push(100);
			}
			for(var j=0;j<(recoverySesion*60);j++) {
				ciclosGraph.push(0);
			}
		}
		
		var nivelIntensidad2 = document.getElementById("obj-25255").textContent;
		var resultadoEntrenamiento2 = document.getElementById("obj-25257").textContent;
		var energia2 = document.getElementById("div-25249").textContent;
		
		var nivelIntensidad = document.getElementById("obj-25318");
		var resultadoEntrenamiento = document.getElementById("obj-25314");
		var energia = document.getElementById("obj-25322");
		$ ('#obj-22716').text("NIVEL DIFICULTAD SESION: " + parseFloat(nivelIntensidad2).toFixed(2));
		$ ('#obj-22726').text("CARGA ENTRENAMIENTO: " + parseFloat(resultadoEntrenamiento2).toFixed(2));
		$ ('#obj-22736').text("ENERGIA OBTENIDA: " + parseFloat(energia2).toFixed(2));
		let HTIScoreMaxPB = (92-70)*59;
		app.progressbar.set(nivelIntensidad,parseInt(nivelIntensidad2),500);
		app.progressbar.set(resultadoEntrenamiento,parseInt((resultadoEntrenamiento2*100)/HTIScoreMaxPB),500);
		app.progressbar.set(energia,energia2*10,500);
		
		BRarray2 = document.getElementById("obj-25495").textContent.split(',');
		BRarray2 = BRarray2.map(Number);
		
		BVarray2 = document.getElementById("obj-25497").textContent.split(',');
		BVarray2 = BVarray2.map(Number);
		
		HRarray2 = document.getElementById("obj-25499").textContent.split(',');
		HRarray2 = HRarray2.map(Number);
		
		SPO2array2 = document.getElementById("obj-25501").textContent.split(',');
		SPO2array2 = SPO2array2.map(Number);
		
		limsparray2 = document.getElementById("obj-22503").textContent;
		
		for(var i=0;i<HRarray2.length;i++) {
			spo290.push(92);
			limsparray.push(parseInt(limsparray2));
			frobjetivo.push(8);
			limhiperv.push(12);
		}
		
		$ ('#obj-24583').text( "%");
		$ ('#obj-24584').text(" LPM");
		$ ('#obj-24585').text(" RPM");
		$ ('#obj-24586').text(" LPM");
		
		sesion_detail_graphs();
	});
	
	$(document).on("click", "#obj-28862", function(e){
		e.preventDefault();
		setTimeout(function() {
			var element = document.getElementById('obj-wlowfc070');
			var opt = {
				margin:       0,
				filename:     'informeSesion.pdf',
				image:        { type: 'png', quality: 1},
				html2canvas:  { scale: 2},
				jsPDF:        { unit: 'mm', format: [215,450], orientation: 'portrait' }
			};
			html2pdf().set(opt).from(element).save();
		},1500);
	});
	
	
	// -----------------------------------------------------------------
	// 			       			 MIS NOTAS 
	// -----------------------------------------------------------------
	function generarRepeaterNotasUser() {
		let query = firestoredb.collection("sensaciones");
		let items = [];
		var i=0;
		let myVLContainer=document.getElementById("virtual-list-obj-28102");
		let template = document.getElementById("virtual-list-obj-28102-template").innerHTML;
		query.orderBy("createddate","desc").where('createdby','==',String(docId)).get().then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				let item = doc.data();
				item["uid"] = doc.id;
				item["dataindex"] = i;
				items.push(item);
				i=i+1;
			});
			thoriumCorePlugin.renderVirtualListFromData(myVLContainer, items,template);
		}).catch(function (error) {
			app.dialog.alert("Algo ha salido mal. Error = " + error);
		});	
	}
	
	$(document).on('page:beforein','.page[data-name="misnotas"]', function (e,page) {
		var page = e.detail;
		generarRepeaterNotasUser();
	});
	
	$(document).on('page:beforein','.page[data-name="enviarnota"]', function (e,page) {
		var page = e.detail;
		generarRepeaterNotasCreadas();
	});
	
	function generarRepeaterNotasCreadas() {
		let user = String(docId);
		$ ('#input-obj-28883-to').value(user); 
		
		let query = firestoredb.collection("notasEntrenador");
		let items = [];
		var i=0;
		let myVLContainer=document.getElementById("virtual-list-obj-28905");
		let template = document.getElementById("virtual-list-obj-28905-template").innerHTML;
		query.orderBy("createddate","desc").where('createdby','==',String(firebase.auth().currentUser.uid)).where('to','==',String(docId)).get().then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				let item = doc.data();
				item["uid"] = doc.id;
				item["dataindex"] = i;
				items.push(item);
				i=i+1;
			});
			thoriumCorePlugin.renderVirtualListFromData(myVLContainer, items,template);
		}).catch(function (error) {
			app.dialog.alert("Algo ha salido mal. Error = " + error);
		});	
	}
	
	$(document).on("click", "#obj-28867", function(e){
		e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
	});
	
	// -----------------------------------------------------------------------------------------------------
	// 									NAVEGACION ENTRE VENTANAS
	// -----------------------------------------------------------------------------------------------------
	// Abrir ventanas desde navegacion
	$(document).on("click", "#obj-27012", function(e){
		e.preventDefault();
		thoriumCorePlugin.loadpage("misnotas",null,null);
	});
	
	$(document).on("click", "#obj-27930", function(e){
		e.preventDefault();
		thoriumCorePlugin.loadpage("exportardatos",null,null);
	});
	
	$(document).on("click", "#obj-27430", function(e){
		e.preventDefault();
		thoriumCorePlugin.loadpage("comparaciontest",null,null);
	});
	
	$(document).on("click", "#obj-12904", function(e){
		e.preventDefault();
		thoriumCorePlugin.loadpage("sesioneslibres",null,null);
	});
	
	$(document).on("click", "#obj-12910", function(e){
		e.preventDefault();
		thoriumCorePlugin.loadpage("programascompletos",null,null);
	});
	
	$(document).on("click", "#obj-1044", function(e){
		e.preventDefault();
		thoriumCorePlugin.loadpage("reportingpremium2",null,null);
	});
	
	$(document).on("click", "#obj-1050", function(e){
		e.preventDefault();
		thoriumCorePlugin.loadpage("reportingpremium",null,null);
	});
	
	$(document).on("click", "#obj-27018", function(e){
		e.preventDefault();
		thoriumCorePlugin.loadpage("miperfil",null,null);
	});
	
	$(document).on("click", "#obj-27012", function(e){
		e.preventDefault();
		thoriumCorePlugin.loadpage("misnotas",null,null);
	});
	
	$(document).on("click", "#obj-27430", function(e){
		e.preventDefault();
		thoriumCorePlugin.loadpage("comparaciontest",null,null);
	});
	
	$(document).on("click", "#obj-27635", function(e){
		e.preventDefault();
		thoriumCorePlugin.loadpage("adaptacionaltitud",null,null);
	});
	
	// Back to Mi perfil - misnotas 
	$(document).on("click", "#obj-27631", function(e){
		e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
		app.tab.show("#toolbar-o-tphrnx030-subtab1",true);
	});
	
	// Back to Mi perfil - exportar
	$(document).on("click", "#obj-27629", function(e){
		e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
		app.tab.show("#toolbar-o-tphrnx030-subtab1",true);
	});
	
	// Back to de Programas completos a Entrenos
	$(document).on("click", "#obj-12855", function(e){
		e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
		app.tab.show("#toolbar-o-tphrnx030-subtab-2",true);
	});
	
	// Back to de Programas independientes a Entrenos
	$(document).on("click", "#obj-12872", function(e){
		e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
		app.tab.show("#toolbar-o-tphrnx030-subtab-2",true);
	});
	
	// De sesiones de programa a lista programas nivel
	$(document).on("click", "#obj-23155", function(e){
		e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
	});
	
	$(document).on("click", "#obj-28471", function(e){
		e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
	});
	
	$(document).on("click", "#obj-25699", function(e){
		e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
	});
	
	$(document).on("click", "#obj-25701", function(e){
		e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
	});
	
	$(document).on("click", "#obj-25703", function(e){
		e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
	});
	
	// De session_config a lista sesiones programa
	$(document).on("click", "#obj-14526", function(e){
		e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
	});
	
	// De session_config_recov a programas independientes
	$(document).on("click", "#obj-25705", function(e){
		e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
	});
	
	$(document).on("click", "#obj-25707", function(e){
		e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
	});
	
	$(document).on("click", "#obj_sesionini", function(e){
		e.preventDefault();
		myVariablesSession();
		thoriumCorePlugin.backToPreviousPage();
	});
	
	$(document).on("click", "#obj_sesionini2", function(e){
		e.preventDefault();
		myVariablesSession();
		thoriumCorePlugin.backToPreviousPage();
	});
	
	// Return back a programas completos
	$(document).on("click", "#obj-1124", function(e){
		e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
	});
	
	// Back to reporting - reporting premium
	$(document).on("click", "#obj-1057", function(e){
		e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
		app.tab.show("#toolbar-o-tphrnx030-subtab-4",true);
	});
	
	// Back to reporting - reporting premium 2
	$(document).on("click", "#obj-1568", function(e){
		e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
		app.tab.show("#toolbar-o-tphrnx030-subtab-4",true);
	});
	
	// Back to training - sesion premium 2
	$(document).on("click", "#obj-25709", function(e){
		e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
		app.tab.show("#toolbar-o-tphrnx030-subtab-3",true);
		clearInterval(trainP);
	});
	
	// Back to training - sesion premium 3
	$(document).on("click", "#obj-25715", function(e) {
		e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
		app.tab.show("#toolbar-o-tphrnx030-subtab-3",true);
		clearInterval(gfrt); 
		myChart5.clear();	
		myChart6.clear();
	});
	
	// Back to decisiones - comparacion test
	$(document).on("click", "#obj-27627", function(e){
		e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
		app.tab.show("#toolbar-o-tphrnx030-subtab-5",true);
	});
	
	// Back to decisiones - adaptacion altitud
	$(document).on("click", "#obj-27641", function(e){
		e.preventDefault();
		thoriumCorePlugin.backToPreviousPage();
		app.tab.show("#toolbar-o-tphrnx030-subtab-5",true);
	});
	
	// -------------------------------------------------------------------------------------------
	// 			 		        PLANNING - carga y ejecucion de sesiones
	// -------------------------------------------------------------------------------------------
	$(document).on('page:mounted', '.page[data-name="sesioneslibres"]', function (e,page) {
		$("#obj-26176").attr("src","https://firebasestorage.googleapis.com/v0/b/ialtitude-esp32.appspot.com/o/Icons%2FrecoveryTrainer.png?alt=media&token=bd4e319f-eb22-453f-8e6d-e673c18285eb");
		$("#obj-26189").attr("src","https://firebasestorage.googleapis.com/v0/b/ialtitude-esp32.appspot.com/o/Icons%2FrecoveryTrainer.png?alt=media&token=bd4e319f-eb22-453f-8e6d-e673c18285eb");
		$("#obj-26202").attr("src","https://firebasestorage.googleapis.com/v0/b/ialtitude-esp32.appspot.com/o/Icons%2FrecoveryTrainer.png?alt=media&token=bd4e319f-eb22-453f-8e6d-e673c18285eb");
		$("#obj-26222").attr("src","https://firebasestorage.googleapis.com/v0/b/ialtitude-esp32.appspot.com/o/Icons%2Fo2boostTrainer.png?alt=media&token=b495fa91-4a1a-48e1-8d17-84f438d1224e");
		$("#obj-26761").attr("src","https://firebasestorage.googleapis.com/v0/b/ialtitude-esp32.appspot.com/o/Icons%2FtestTrainer.png?alt=media&token=7baf8a77-d8dd-47e4-ade8-f338c851c92e");
		$("#obj-26817").attr("src","https://firebasestorage.googleapis.com/v0/b/ialtitude-esp32.appspot.com/o/Icons%2FtestTrainer.png?alt=media&token=7baf8a77-d8dd-47e4-ade8-f338c851c92e");
		$("#obj-26831").attr("src","https://firebasestorage.googleapis.com/v0/b/ialtitude-esp32.appspot.com/o/Icons%2FtestTrainer.png?alt=media&token=7baf8a77-d8dd-47e4-ade8-f338c851c92e");
		$("#obj-28761").attr("src","https://firebasestorage.googleapis.com/v0/b/ialtitude-esp32.appspot.com/o/Icons%2FtestTrainer.png?alt=media&token=7baf8a77-d8dd-47e4-ade8-f338c851c92e");
		$("#obj-28733").attr("src","https://firebasestorage.googleapis.com/v0/b/ialtitude-esp32.appspot.com/o/Icons%2FtestTrainer.png?alt=media&token=7baf8a77-d8dd-47e4-ade8-f338c851c92e");
		$("#obj-27566").attr("src","https://firebasestorage.googleapis.com/v0/b/ialtitude-esp32.appspot.com/o/Icons%2FentrenadorTrainer.png?alt=media&token=5767d9ba-c196-4297-bf39-91b1a0f6c92d");
	});
	
	$(document).on("click", "#obj-27560", function(e) {
		e.preventDefault();
		tipoSesion = "Programa Independiente";
		objetivoSesion = "Entrenador";
		numeroSesion = "Sesion Programada";
		sesionTipo = "Entrenamiento";
		const fstore = firestoredb.collection('programs').doc(docId).collection('entrenoProgramado');
		fstore.get().then((querySnapshot) => {
			if (querySnapshot.empty) {
				app.dialog.alert("No ha programado ninguna sesión");
			} else {
				querySnapshot.forEach((doc) => {
					altitude = doc.data().altitudeMeters;
					altitudet = doc.data().altitudeTime;
					cicles = doc.data().ciclesNumber;
					recovery = doc.data().recoveryTime;
					limit = doc.data().spo2Limit;
					totaltime = doc.data().totalTime;
					nivelCS = doc.data().sesLevel; 
				});
				if (nivelCS<25){sesLevel='Baja';}
				if (nivelCS>25 && nivelCS<50){sesLevel='Media';}
				if (nivelCS>50 && nivelCS<75){sesLevel='Alta';}
				if (nivelCS>75){sesLevel='Extrema';}
				thoriumCorePlugin.loadpage("sesion_config_recov",null,null);
			}
		}).catch(function (error) {
			app.dialog.alert("No ha programado ninguna sesión");
		});		
	});
	
	$(document).on("click", "#obj-28727", function(e) {
		e.preventDefault();
		tipoSesion = "Programa Independiente";
		objetivoSesion = "Test basal";
		numeroSesion = "Sesion Unica";
		sesionTipo = "Test";
		sessionConfigFirestore('entrenos','test','entrenamiento','basal','session','ses1',"sesion_config_recov");
	});
	
	$(document).on("click", "#obj-28755", function(e) {
		e.preventDefault();
		tipoSesion = "Programa Independiente";
		objetivoSesion = "Test inicial";
		numeroSesion = "Sesion Unica";
		sesionTipo = "Test";
		sessionConfigFirestore('entrenos','test','entrenamiento','inicial','session','ses1',"sesion_config_recov");
	});
	
	$(document).on("click", "#obj-26755", function(e) {
		e.preventDefault();
		tipoSesion = "Programa Independiente";
		objetivoSesion = "Test 4k";
		numeroSesion = "Sesion Unica";
		sesionTipo = "Test";
		sessionConfigFirestore('entrenos','test','entrenamiento','4k','session','ses1',"sesion_config_recov");
	});
	
	$(document).on("click", "#obj-26811", function(e) {
		e.preventDefault();
		tipoSesion = "Programa Independiente";
		objetivoSesion = "Test 5k";
		numeroSesion = "Sesion Unica";
		sesionTipo = "Test";
		sessionConfigFirestore('entrenos','test','entrenamiento','5k','session','ses1',"sesion_config_recov");
	});
	
	$(document).on("click", "#obj-26825", function(e) {
		e.preventDefault();
		tipoSesion = "Programa Independiente";
		objetivoSesion = "Test 6k";
		numeroSesion = "Sesion Unica";
		sesionTipo = "Test";
		sessionConfigFirestore('entrenos','test','entrenamiento','6k','session','ses1',"sesion_config_recov");
	});
	
	$(document).on("click", "#obj-26216", function(e) {
		e.preventDefault();
		tipoSesion = "Programa Independiente";
		objetivoSesion = "O2 Boost 15'";
		numeroSesion = "Sesion Unica";
		sesionTipo = "Calentamiento";
		sessionConfigFirestore('entrenos','nivel1','calentamiento','o2boost','session','ses1',"sesion_config_recov");
	});
	
	$(document).on("click", "#obj-26170", function(e) {
		e.preventDefault();
		tipoSesion = "Programa Independiente";
		objetivoSesion = "Recovery 15'";
		numeroSesion = "Sesion Unica";
		sesionTipo = "Recuperación";
		sessionConfigFirestore('entrenos','nivel1','recuperacion','recovery15','session','ses1',"sesion_config_recov");
	});
	
	$(document).on("click", "#obj-26183", function(e) {
		e.preventDefault();
		tipoSesion = "Programa Independiente";
		objetivoSesion = "Recovery 25'";
		numeroSesion = "Sesion Unica";
		sesionTipo = "Recuperación";
		sessionConfigFirestore('entrenos','nivel1','recuperacion','recovery25','session','ses1',"sesion_config_recov");
	});
	
	$(document).on("click", "#obj-26196", function(e) {
		e.preventDefault();
		tipoSesion = "Programa Independiente";
		objetivoSesion = "Recovery 35'";
		numeroSesion = "Sesion Unica";
		sesionTipo = "Recuperación";
		sessionConfigFirestore('entrenos','nivel1','recuperacion','recovery35','session','ses1',"sesion_config_recov");
	});
	
	$(document).on("click", "#obj-14535", function(e) {
		e.preventDefault();
		programaNivel = 'Nivel 1';
		levelName = 'nivel1';
		tipoSesion = 'Nivel 1';
		thoriumCorePlugin.loadpage("programas_nivel",null,null);
	});
	
	$(document).on("click", "#obj-12940", function(e) {
		e.preventDefault();
		programaNivel = 'Nivel 2';
		levelName = 'nivel2';
		tipoSesion = 'Nivel 2';
		thoriumCorePlugin.loadpage("programas_nivel",null,null);
	});
	
	$(document).on("click", "#obj-12954", function(e) {
		e.preventDefault();
		programaNivel = 'Nivel 3';
		levelName = 'nivel3';
		tipoSesion = 'Nivel 3';
		thoriumCorePlugin.loadpage("programas_nivel",null,null);
	});
	
	$(document).on("click", "#obj-23938", function(e) {
		e.preventDefault();
		programaNivel = 'Nivel 4';
		levelName = 'nivel4';
		tipoSesion = 'Nivel 4';
		thoriumCorePlugin.loadpage("programas_nivel",null,null);
	});
	
	$(document).on("click", "#obj-23948", function(e) {
		e.preventDefault();
		programaNivel = 'Nivel 5';
		levelName = 'nivel5';
		tipoSesion = 'Nivel 5';
		thoriumCorePlugin.loadpage("programas_nivel",null,null);
	});
	
	$(document).on("click", "#obj-23958", function(e) {
		e.preventDefault();
		programaNivel = 'Nivel 6';
		levelName = 'nivel6';
		tipoSesion = 'Nivel 6';
		thoriumCorePlugin.loadpage("programas_nivel",null,null);
	});
	
	$(document).on("click", "#obj-23969", function(e) {
		e.preventDefault();
		programaNivel = 'Nivel 7';
		levelName = 'nivel7';
		tipoSesion = 'Nivel 7';
		thoriumCorePlugin.loadpage("programas_nivel",null,null);
	});
	
	$(document).on("click", "#obj-23979", function(e) {
		e.preventDefault();
		programaNivel = 'Nivel 8';
		levelName = 'nivel8';
		tipoSesion = 'Nivel 8';
		thoriumCorePlugin.loadpage("programas_nivel",null,null);
	});
	
	$(document).on("click", "#obj-23989", function(e) {
		e.preventDefault();
		programaNivel = 'Nivel 9';
		levelName = 'nivel9';
		tipoSesion = 'Nivel 9';
		thoriumCorePlugin.loadpage("programas_nivel",null,null);
	});
	
	$(document).on("click", "#obj-12968", function(e) {
		e.preventDefault();
		programaNivel = 'Nivel 10';
		levelName = 'nivel10';
		tipoSesion = 'Nivel 10';
		thoriumCorePlugin.loadpage("programas_nivel",null,null);
	});
	
	$(document).on('page:mounted', '.page[data-name="programas_nivel"]', function (e,page) {
		// Titulo
		$ ('#obj-1128').text(programaNivel); 		
		// Iconos
		$("#img-24540").attr("src","https://firebasestorage.googleapis.com/v0/b/ialtitude-esp32.appspot.com/o/Icons%2FadaptateTrainer.png?alt=media&token=179c61df-fa3a-4751-8c7a-797e5b199595");
		$("#obj-24542").attr("src","https://firebasestorage.googleapis.com/v0/b/ialtitude-esp32.appspot.com/o/Icons%2FprogresaTrainer.png?alt=media&token=c590e3c9-c532-47fd-98a2-52f6abcf3a63");
		$("#obj-24543").attr("src","https://firebasestorage.googleapis.com/v0/b/ialtitude-esp32.appspot.com/o/Icons%2FmejoraTrainer.png?alt=media&token=0476b354-3e2d-4071-9a66-73c6572fe7ef");
		$("#obj-24544").attr("src","https://firebasestorage.googleapis.com/v0/b/ialtitude-esp32.appspot.com/o/Icons%2FmantenteTrainer.png?alt=media&token=d59d4e19-1118-417e-a802-fb833c69213c");
		$("#obj-24545").attr("src","https://firebasestorage.googleapis.com/v0/b/ialtitude-esp32.appspot.com/o/Icons%2FactivateTrainer.png?alt=media&token=1a00638a-dda1-43bd-be7f-85a51e8830df");
	});
	
	$(document).on('page:init','.page[data-name="programa_adaptate"]', function (e,page) {
		var page = e.detail;
		$ ('#obj-28478').text(programaNivel + " > Programa Adáptate"); 		
	});
	
	$(document).on('page:init','.page[data-name="programa_progresa"]', function (e,page) {
		var page = e.detail;
		$ ('#obj-24592').text(programaNivel + " > Programa Progresa"); 		
	});
	
	$(document).on('page:init','.page[data-name="programa_mantente"]', function (e,page) {
		var page = e.detail;
		$ ('#obj-24593').text(programaNivel + " > Programa Mantente"); 		
	});
	
	$(document).on('page:init','.page[data-name="programa_activate"]', function (e,page) {
		var page = e.detail;
		$ ('#obj-24594').text(programaNivel + " > Programa Actívate"); 		
	});
	
	$(document).on('page:init','.page[data-name="programa_mejora"]', function (e,page) {
		var page = e.detail;
		$ ('#obj-24595').text(programaNivel + " > Programa Consolida"); 		
	});
	
	// Guardar objetivo y tipo de sesion
	$(document).on("click", "#obj-15721", function(e) {
		e.preventDefault();
		objetivoSesion = 'Programa Adáptate';
		thoriumCorePlugin.loadpage("programa_adaptate",null,null);
	});
	
	$(document).on("click", "#obj-15736", function(e) {
		e.preventDefault();
		objetivoSesion = 'Programa Progresa';
		thoriumCorePlugin.loadpage("programa_progresa",null,null);
	});
	
	$(document).on("click", "#obj-15751", function(e) {
		e.preventDefault();
		objetivoSesion = 'Programa Consolida';
		thoriumCorePlugin.loadpage("programa_mejora",null,null);
	});
	
	$(document).on("click", "#obj-15766", function(e) {
		e.preventDefault();
		objetivoSesion = 'Programa Mantente';
		thoriumCorePlugin.loadpage("programa_mantente",null,null);
	});
	
	$(document).on("click", "#obj-24097", function(e) {
		e.preventDefault();
		objetivoSesion = 'Programa Actívate';
		thoriumCorePlugin.loadpage("programa_activate",null,null);
	});
	
	// Adaptate
	$(document).on("click", "#obj-28486", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 1"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','adaptate','session','ses1',"sesion_config");
	});
	
	$(document).on("click", "#obj-28500", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 2"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','adaptate','session','ses2',"sesion_config");
	});
	
	$(document).on("click", "#obj-28514", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 3"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','adaptate','session','ses3',"sesion_config");
	});
	
	$(document).on("click", "#obj-28528", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 4"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','adaptate','session','ses4',"sesion_config");
	});
	
	$(document).on("click", "#obj-28542", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 5"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','adaptate','session','ses5',"sesion_config");
	});
	
	$(document).on("click", "#obj-28556", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 6"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','adaptate','session','ses6',"sesion_config");
	});
	
	$(document).on("click", "#obj-28570", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 7"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','adaptate','session','ses7',"sesion_config");
	});
	
	// Mantente
	$(document).on("click", "#obj-24622", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 1"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','mantente','session','ses1',"sesion_config");
	});
	
	$(document).on("click", "#obj-24636", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 2"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','mantente','session','ses2',"sesion_config");
	});
	
	$(document).on("click", "#obj-24650", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 3"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','mantente','session','ses3',"sesion_config");
	});
	
	$(document).on("click", "#obj-24664", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 4"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','mantente','session','ses4',"sesion_config");
	});
	
	// Mejora - consolida
	$(document).on("click", "#obj-24937", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 1"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','consolida','session','ses1',"sesion_config");
	});
	
	$(document).on("click", "#obj-24951", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 2"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','consolida','session','ses2',"sesion_config");
	});
	
	$(document).on("click", "#obj-24965", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 3"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','consolida','session','ses3',"sesion_config");
	});
	
	$(document).on("click", "#obj-24979", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 4"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','consolida','session','ses4',"sesion_config");
	});
	
	$(document).on("click", "#obj-24993", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 5"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','consolida','session','ses5',"sesion_config");
	});
	
	$(document).on("click", "#obj-25007", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 6"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','consolida','session','ses6',"sesion_config");
	});
	
	$(document).on("click", "#obj-25021", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 7"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','consolida','session','ses7',"sesion_config");
	});
	
	// Progresa
	$(document).on("click", "#obj-25042", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 1"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','progresa','session','ses1',"sesion_config");
	});
	
	$(document).on("click", "#obj-25056", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 2"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','progresa','session','ses2',"sesion_config");
	});
	
	$(document).on("click", "#obj-25070", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 3"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','progresa','session','ses3',"sesion_config");
	});
	
	$(document).on("click", "#obj-25084", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 4"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','progresa','session','ses4',"sesion_config");
	});
	
	$(document).on("click", "#obj-25098", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 5"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','progresa','session','ses5',"sesion_config");
	});
	
	$(document).on("click", "#obj-25112", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 6"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','progresa','session','ses6',"sesion_config");
	});
	
	$(document).on("click", "#obj-25126", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 7"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','progresa','session','ses7',"sesion_config");
	});
	
	// Activate
	$(document).on("click", "#obj-25147", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 1"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','activate','session','ses1',"sesion_config");
	});
	
	$(document).on("click", "#obj-25161", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 2"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','activate','session','ses2',"sesion_config");
	});
	
	$(document).on("click", "#obj-25175", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 3"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','activate','session','ses3',"sesion_config");
	});
	
	$(document).on("click", "#obj-25189", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 4"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','activate','session','ses4',"sesion_config");
	});
	
	$(document).on("click", "#obj-25203", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 5"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','activate','session','ses5',"sesion_config");
	});
	
	$(document).on("click", "#obj-25217", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 6"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','activate','session','ses6',"sesion_config");
	});
	
	$(document).on("click", "#obj-25231", function(e) {
		e.preventDefault();	
		sesionTipo = "Entrenamiento";
		numeroSesion = "Sesion 7"; 
		sessionConfigFirestore('entrenos',levelName,'entrenamiento','activate','session','ses7',"sesion_config");
	});
	
	// Accesos a firestore para carga de sesiones
	async function sessionConfigFirestore(planName,programName,categoryName,level,sesion,sesionNumber,pagename) {
		const fstore = firestoredb.collection(planName).doc(programName).collection(categoryName).doc(level).collection(sesion).doc(sesionNumber);
		const doc = await fstore.get();
		if (!doc.exists) {
			app.dialog.alert("No existe la sesión solicitada, contacte al administrador.");
		} else {
			altitude = doc.data().altitudeMeters;
			altitudet = doc.data().altitudeTime;
			cicles = doc.data().ciclesNumber;
			recovery = doc.data().recoveryTime;
			limit = doc.data().spo2Limit;
			totaltime = doc.data().totalTime;
			nivelCS = doc.data().sesLevel; 
			if (nivelCS<25){sesLevel='Baja';}
			if (nivelCS>25 && nivelCS<50){sesLevel='Media';}
			if (nivelCS>50 && nivelCS<75){sesLevel='Alta';}
			if (nivelCS>75){sesLevel='Extrema';}
			thoriumCorePlugin.loadpage(pagename,null,null);
		}
	}
	
	$(document).on('page:mounted', '.page[data-name="sesion_config"]', function (e,page) {
		$ ('#obj-14533').text(programaNivel + " > " + objetivoSesion + " > " + numeroSesion); 
		$ ('#obj_tt').text(totaltime + "'"); 
		$ ('#obj_level').text(sesLevel); 
		$ ('#obj_alt').text(altitude + " m"); 
		$ ('#obj-14466').text(altitudet + "'"); 
		$ ('#obj-14495').text(recovery + "'"); 
		$ ('#obj_cic').text(cicles); 
		$ ('#obj_lim').text(limit + "%");  
	});
	
	$(document).on('page:mounted', '.page[data-name="sesion_config_recov"]', function (e,page) {
		$ ('#obj-24596').text(objetivoSesion + " > " + numeroSesion); 
		$ ('#obj-24597').text(totaltime + "'"); 
		$ ('#obj-24598').text(sesLevel); 
		$ ('#obj-24599').text(altitude + " m"); 
		$ ('#obj-24600').text(altitudet + "'"); 
		$ ('#obj-24601').text(recovery + "'"); 
		$ ('#obj-24602').text(cicles); 
		$ ('#obj-24603').text(limit + "%");  	
		if (objetivoSesion == 'Entrenador'){
			document.getElementById('obj-jkdltc713').style.opacity = "0.0";
			document.getElementById('obj_sesionini2').style.pointerEvents = 'none'; // deshabilitamos start
		}
	});	/* --- A place where you can add your own code -- */

