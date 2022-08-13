let urls={"data":"?doData"};

let myData=null;





function makeID(){
	let now=fillLeft(new Date().getTime().toString(16),"0",12);
	let myRandom=fillLeft( Math.floor(Math.random() * Math.pow(2,48)) ,"0",12);
	return  now.substr(0,8)+"-"+
			now.substr(8,4)+"-"+
			myRandom.substr(0,4)+"-"+
			myRandom.substr(4,4)+"-"+
			myRandom.substr(8,4)+"-"+
			fillLeft( browserID().toString(16) ,"0",12 );
}

function fillLeft(input,fillsign,targetlength){
	input=input+"";
	if(input.length>targetlength){
		return input.substr(0,targetlength);
	}
	while(input.length<targetlength){
		input=fillsign+input;
	}
	return input;
}

function browserID(){
	let id=localStorage.getItem("22browserID");
	if(id){
		id=parseInt(id);
	}
	if(!(typeof id == 'number') || id > Math.pow(2,48)){
		id=Math.floor(Math.random() * Math.pow(2,48));
		localStorage.setItem("22browserID",id);
	}
	return id;
}



let unsavedChanges=0;

let isLoading=0;
let isLoadingWrite=0;
function setLoading(write=false){
	if(write){
		isLoadingWrite++;
	}else{
		isLoading++;
	}
	refreshLoading();
}
function unSetLoading(write=false){
	if(write){
		isLoadingWrite--;
	}else{
		isLoading--;
	}
	refreshLoading();
}
function refreshLoading(){
	let loadingbar=document.getElementById("loadingbar")
	if( (isLoading+isLoadingWrite)>0){
		loadingbar.style.transitionDuration='0.05s';
		loadingbar.style.top='0px';
	}else{
		loadingbar.style.transitionDuration='2s';
		loadingbar.style.top='-30px';
	}
}

document.addEventListener('DOMContentLoaded', function() {
	data(value=>{
		myData=value;
		init();
	});
}, false);


window.onbeforeunload = confirmExit;
	function confirmExit() {
		if (isLoadingWrite+unsavedChanges) {
			return "Some task is in progress. Are you sure, you want to close?";
		}
	}







function reloadData(){
	data(value=>{
		myData=value;
		refreshGUI();
		unsavedChanges=0;
	});
}


function pushData(){
	data(()=>{unsavedChanges=0;},myData);
}

function data(callback=()=>{},input=false){
	setLoading(input);
	fetch(urls["data"],input?{
		method: 'POST',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(input)
	}:undefined)
		.then(function(response) {
			unSetLoading(input);
			if(input){
				response.text().then(function(myJson) {
					if(callback)
					callback(myJson);
				});
			}else{
				response.json().then(function(myJson) {
					if(callback)
					callback(myJson);
				});
			}
		}).catch((error) => {
			unSetLoading(input);
			console.error('Error:', error);
		});
}