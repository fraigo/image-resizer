/**
 * Image resizer library
 * 
 * @author Francisco Igor franciscoigor@gmail.com
 * 
 */


/** 
 * Simulates a click in the file input (hidden)
*/
function openFile() {
	var file=document.getElementById("filename");
	file.click();
}

/**
 * To open or reopen a selected file to generate resized images
 * @param {DOMElement} newFile Optionally, the file input object. If no parameter is  
 */
function selectFile(newFile){
	var file=document.getElementById("filename");
	image=document.getElementById("image");
	if(!file.files[0]){
		//No file selected
		return;
	}
	image.value=file.files[0].name.replace(".png","").replace(".svg","").replace(".gif","").replace(".jpg","");
	image.fileType=file.files[0].type;
	resizeFile();
}

/** 
 * Call to the resize process when a file is loaded. Otherwise, call to the file selection.
*/
function resizeFile(){
	var file=document.getElementById("filename");
	if(!file.files[0]){
		//No file selected yet
		openFile();
		return;
	}
	readBlob(file.files[0]);
}

/**
 * Read a file input and get the data contents.
 * @param {File} file File to be loaded
 */
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


/**
 * Create a resized image from the original image.
 * @param {*} img Image source
 * @param {*} width Target width
 * @param {*} height Target height
 * @param {*} name Target filename
 * @param {*} type MIME type of the source image
 */
function createCanvas(img,width,height,name,type){
	var imgcontainer=document.createElement("div");
	var original=document.getElementById("original");
	var link=document.createElement("a");
	var label=document.createElement("div");
	var canvas=document.createElement("canvas");
	var ctx = canvas.getContext('2d');
	var name=name+".png";
	var factor=width/img.width;
	
	label.innerHTML=name+"<br>"+width+"x"+height;
	canvas.width=width;
	canvas.height=height;
	canvas.setAttribute("title",width+"x"+height);
	
	original.src=img.src;

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

/**
 * Update configuration using selected configuration
 * @param {*} value 
 */
function changeConfig(value){
	imagename=document.getElementById("imgname");
	imagename.value=names[value];
}

/**
 * To generate a source image using the file uploaded, and to create each rsized image from the current configuration.
 * @param {String} url File URL
 */
function readUrl(url){
	var imagename=document.getElementById("imgname");
	var image=document.getElementById("image");
	var container=document.getElementById("container");
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

