//

let flowArea= null;
let flowList= null;
let exampleNodes= null;
function init(){
	
	flowArea= document.getElementById("flowArea");
	flowList= document.getElementById("flowList");
	exampleNodes= document.getElementById("exampleNodes");
	console.log(myData);
	refreshGUI();
}




let selectedFlowIndex=0;
let selectedFlowObj=null;
let myENodes=[
	{parentID:"exampleNodes",types:["example"],x:10,y:10}
];


function refreshGUI(){
	console.log("refreshGUI");
	selectedFlowObj=null;
//flowList
	flowList.innerHTML="";
	let currentFlow=false;
	myData.flows.forEach((flow,index)=>{
		let b=document.createElement('button');
		b.onclick=()=>{
			selectedFlowIndex=index;
			refreshGUI();
		};
		if(index==selectedFlowIndex){
			currentFlow=flow;
			selectedFlowObj=flow;
			b.style.fontWeight= "bold";
		}
		
		let t= document.createTextNode(flow.name);
		b.appendChild(t);
		flowList.appendChild(b);
	});
//exampleNodes
	exampleNodes.innerHTML="";
	exampleNodes.style.width=60+"px";
	exampleNodes.style.height=myENodes.length*40+"px";
	
	myENodes.forEach((node)=>{
		fixNode(node);
		let element=makeNodeElement(node);
		element.draggable=true;
		exampleNodes.appendChild(element);
	});
	
//flowArea
	flowArea.innerHTML="";
	flowArea.ondragover=dragover_handler;
	flowArea.ondrop=drop_handler;
	let w=1280;
	let h=720;
	flowArea.style.width=w+"px";
	flowArea.style.height=h+"px";
	if(currentFlow){
		if(currentFlow.w){
			w=currentFlow.w;
		}
		if(currentFlow.h){
			h=currentFlow.h;
		}
		currentFlow.w=w;
		currentFlow.h=h;
		flowArea.style.width=w+"px";
		flowArea.style.height=h+"px";
// ##########################  NODES ##########################
		myData.nodes.forEach((node)=>{
			fixNode(node);
			if(node.parentID=="flowArea"){
				let element=makeNodeElement(node);
				flowArea.appendChild(element);
			}
		});
		
	}
	
}

let dragging=false;
let offsetX;
let offsetY;
function dragstart_handler(ev){
	//console.log("dragstart_handler",ev);
	//ev.dataTransfer.dropEffect = "copy";
	//ev.dataTransfer.setData("application/my-app", ev.target);
	dragging=ev.target;
	window.debugLastDragging=dragging;
	const rect = ev.target.getBoundingClientRect();
	offsetX = ev.clientX;
	offsetY = ev.clientY;
}
function dragover_handler(ev) {
	//console.log("dragover_handler",ev);
	//ev.dataTransfer.dropEffect = "move";
	ev.preventDefault();
}
function drop_handler(ev) {
	console.log("drop_handler",ev);
	ev.preventDefault();
	
	
	let node=getNodeByID(dragging.id);
	if(!node){
		throw 'node not found by id "'+dragging.id+'" ';
	}
 	//const data = ev.dataTransfer.getData("application/my-app");
	
	
	const left = parseInt(dragging.style.left);
	const top = parseInt(dragging.style.top);
	
	if(node.types.includes("example") ){
		node={};
		myData.nodes.push(node);
		offsetX+=parseInt(getComputedStyle(flowArea).left);
	}
	node.x=left+ (ev.clientX-offsetX);
	node.y=top + (ev.clientY - offsetY);
	if(useGrid.checked){
		node.x=Math.round(node.x/20)*20;
		node.y=Math.round(node.y/20)*20;
	}
	
	fixNode(node);
	unsavedChanges++;
	
	dragging.style.left = node.x + 'px';
	dragging.style.top = node.y + 'px';
	console.log("dragging",dragging);
	dragging=false;
	
	refreshGUI();
}

function getNodeByID(id){
	if(id.startsWith("node_")){
		id=id.substr("node_".length);
	}
	let found=false;
	myData.nodes.forEach((node)=>{
		if(node.id==id){
			found=node;
		}
	});
	if(!found)myENodes.forEach((node)=>{
		if(node.id==id){
			found=node;
		}
	});
	
	return found;
}

function getNodeElementByID(id){
	if(id.startsWith("node_")){
		id=id.substr("node_".length);
	}
	return document.getElementById("node_"+id);
}

function fixNode(node){
	if(!node.id)node.id=makeID();
	
	if(!node.parentID)node.parentID="flowArea";
	let htmlParent=document.getElementById(node.parentID);
	//console.log(["fixNode",node,node.parentID,htmlParent])
	
	if(!node.x)node.x=0;
	if(!node.y)node.y=0;
	if(!node.w)node.w=20;
	if(!node.h)node.h=20;
	if(node.x<0)node.x=0;
	if(node.y<0)node.y=0;
	let maxX=parseInt(htmlParent.style.width)-node.w;
	let maxY=parseInt(htmlParent.style.height)-node.h;
	if(node.x>maxX)node.x=maxX;
	if(node.y>maxY)node.y=maxY;
	
	if(typeof node.types !='object')node.types=[];
	if(!Array.isArray(node.types))node.types=[];
	
	for(let i=0;i<node.types.length;i++){
		let type=node.types[i];
		switch(type){
			case "example":{
				
			}break;
			default:{
				console.log("removing ",type);
				node.types.splice(i, 1);
				i--;
			}
		}
	}
}

function makeNodeElement(node){
	let f=document.createElement('div');
	if(node.name){
		f.appendChild(document.createTextNode(node.name));
	}
	f.className="nodeEl";
	f.style.position = 'absolute';
	f.style.left = (node.x) + 'px';
	f.style.top = (node.y) + 'px';
	f.id="node_"+node.id;
	
	f.draggable=true;
	f.ondragstart=dragstart_handler;
	
	return f;
}


