//wait for whole document to load up before loading javascript
$(document).ready(function(){

var apiKey = "V9CIRQRJSAFI99RM";
var stockName = "SPY";
var trace = {
	x: [],
	close: [],
	high: [],
	low: [],
	open: [],
	type: 'candlestick',
};

$("#heading").html(stockName);

$("#submit").on("click", function(event){
	stockName = $("#search-stock").val();
	console.log(stockName);
	$("#heading").html(stockName);
	ajaxPull();
})

function ajaxPull(){
	$.ajax({
		type: 'GET',
		url: "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+stockName+"&interval=1min&outputsize=compact&apikey="+apiKey,
		//if successful do the following
		success: function(data){
			var data1 = data["Time Series (1min)"];
			//check if API is working
			console.log("Data:", data1);
			var trace = {
				x: [],
				close: [],
				high: [],
				low: [],
				open: [],
				type: 'candlestick',
				xaxis: 'x',
				yaxis: 'y'
			};
			//1min data updates every minute
			$.each(data1, function(key,value){
			trace.x.push(key);
			trace.close.push(data1[key]["4. close"]);
			trace.high.push(data1[key]["2. high"]);
			trace.low.push(data1[key]["3. low"]);
			trace.open.push(data1[key]["1. open"]);
			});

			var graph = [trace];
			Plotly.newPlot('myDiv', graph);
			console.log(trace);
			console.log("success");
		}, // need a comma btwn success and error callback
		error: function(){
			alert("errror");
		}
	});
}

ajaxPull();
var startInterval = setInterval(ajaxPull, 60000); //should be 60000 as we using 1min data

// $.ajax({
// 	type: 'GET',
// 	url: "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+stockName+"&interval=1min&outputsize=compact&apikey="+apiKey,
// 	//if successful do the following
// 	success: function(data){
// 		data1 = data["Time Series (1min)"];
// 		console.log(data["Time Series (1min)"]);
// 		console.log("success");
// 		//1min data updates every minute
// 		setInterval(function(){
// 			$.each(data1, function(key,value){
// 			trace.x.push(key);
// 			trace.y.push(data1[key]["4. close"]);
// 			})
// 			console.log(trace);
// 			console.log("success");
// 		}, 60000);
// 	}	
// 	// error: function(){
// 	// 	alert('error');
// 	// }
// });



//document on load close
});