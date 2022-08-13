<html><head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>nodes.8th.at</title>
	<meta name="viewport" content="initial-scale=-3, maximum-scale=5, width=770">
	<script src="code/boilerplate.js"></script>
	<script src="code/script.js"></script>
	<style type="text/css">
		<?php echo file_get_contents("assets/style.css"); ?>
		a{
			margin:0px;
			color: #000;
			background-color: transparent;
			text-decoration: none;
		}
		.more {
			width:32px;height:32px;
			background-color:rgba(20, 20, 20, 0.1);
			background-image: url(android-more-vert.svg);
			background-repeat: no-repeat;
			background-position: center ;
			background-size: auto 22px;
			
			-webkit-border-radius: 18px;
			-moz-border-radius: 18px;
			border-radius: 18px;
			
			cursor: default;
		}
		.more:hover{
			background-color:rgba(20, 20, 20, 0.2);
		}
	</style>
</head>
<body style="">
<div id="loadingbar">loading</div>
<div id="header">
	<div id="headerContent">
		nodes
	</div>
</div>
<div id="flowList"></div>
<button onclick="pushData()">save</button>
<button onclick="reloadData()">reload</button>
<button onclick="refreshGUI()">redoGUI</button>
<input type="checkbox" id="useGrid" name="useGrid" value="0">
<label for="useGrid">useGrid</label>
<br/>
<div id="exampleNodes"></div>
<div id="flowArea"></div>
</body></html>