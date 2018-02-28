
function openFile() {
	var file=document.getElementById("filename");
	file.click();
}

function selectFile(updatePrefix){
	var file=document.getElementById("filename");
	image=document.getElementById("image");
	console.log(file.files[0]);
	if (updatePrefix){
		image.value=file.files[0].name.replace(".png","").replace(".svg","").replace(".gif","").replace(".jpg","");
		image.fileType=file.files[0].type;
	}else{
		file.click();
		return;
	}
	readBlob(file.files[0]);
}

function readBlob(file) {
    var reader = new FileReader();

    reader.onload = function(loadedEvent) {
		console.log("Loaded");
		var dataUrl=(loadedEvent.target.result);
		readUrl(dataUrl);
    }
	
	reader.onprogress=function(progress){
		console.log("Progress: "+progress.loaded+"/"+progress.total);
	}
	
	reader.onerror=function(error){
		console.log("Error");
	}
	reader.readAsDataURL(file);		
}



function createCanvas(img,width,height,name,type){
	var imgcontainer=document.createElement("div");
	var link=document.createElement("a");
	var label=document.createElement("div");
	var canvas=document.createElement("canvas");
	var ctx = canvas.getContext('2d');
	var name=name+".png";
	label.innerHTML=name+"<br>"+width+"x"+height;
	canvas.width=width;
	canvas.height=height;
	canvas.setAttribute("title",width+"x"+height);
	original.src=img.src;
	var factor=width/img.width;
	if (height>width){
		factor=height/img.height;
	}
	newWidth=Math.round(img.width*factor);
	newHeight=Math.round(img.height*factor);
	padLeft=(width-newWidth)/2;
	padTop=(height-newHeight)/2; 
	//console.log(img.width,img.height,canvas.width,canvas.height,factor,newWidth,newHeight,padLeft,padTop);
	if (type=="image/svg+xml"){
		ctx.drawImage(img,-padTop,-padLeft);
	}else{
		ctx.drawImage(img,0,0,img.width,img.height,padLeft,padTop,newWidth,newHeight);		
	}
	
	link.href=canvas.toDataURL();
	link.download=name;
	link.appendChild(canvas);
	link.appendChild(label);
	//imgcontainer.style.paddingTop=(height/2)+"px";
	imgcontainer.className='imgcontainer';
	imgcontainer.appendChild(link);
	return imgcontainer;
}


function changeConfig(value){
	imagename=document.getElementById("imgname");
	imagename.value=names[value];
}


function readUrl(url){
	var imagename=document.getElementById("imgname");
	var image=document.getElementById("image");
	var container=document.getElementById("container");
	var original=document.getElementById("original");
	var config=document.getElementById("config");
	var img = new Image;
	
	container.innerHTML="";
	img.onload = function(){
		var cfg=sizes[config.value];
		//console.log(cfg);
		for(var i=0;i<cfg.length;i++){
			var name=imagename.value
				.replace("{image}",image.value)
				.replace("{width}",cfg[i].width)
				.replace("{height}",cfg[i].height)
				.replace("{id}",cfg[i].id?cfg[i].id:'')
				.replace("{scale}",cfg[i].scale?cfg[i].scale:'')
				.replace("{type}",cfg[i].type?cfg[i].type:'');
			container.appendChild(createCanvas(img,cfg[i].width,cfg[i].height,name,image.type));
		}
	};
	img.src = url;
	
}
