# Image Resizer



Image resizer online to convert PNG SVG JPG files to PNG in multiple sizes.


## Online Demo

https://fraigo.github.io/image-resizer/

## Usage


1. Open an image from your computer using the **Select file** button.
2. Press the **Resize** button to start generating default resized images
3. Clic in some image generated to **Download** a copy


Optionally, you can do some additional configurations to get more specific output:


* Enter an <b>Image name</b>. It will be the base name for your exported images (`{name}` expression).
* Enter a <b>File name format</b>. You can compose a file name using `{name}`, `{width}`, `{height}` expressions. Example: `{name}.{width}x{height}`.
* Select a <b>Configuration set</b>. Each set has predefined sizes and filename formats for different targets (android, iOS,windows)


## About 

This application is a stand-alone HTML application with *no library dependencies* and can be executed locally in a web browser. It uses the following standard technologies:

* HTML5 File API
    * To retrieve files ans attributes from uploaded files (`File` object).
    * To get file contents of the uplodaded file locally and converting a data URL. No server-side load needed (`FileReader.readAsDataURL()`)

* HTML5 Canvas
    * To draw resized images and generate PNG files (`CanvasRenderingContext2D.drawImage()`)
    * To export the generated image to a PNG format (`Canvas.toDataUrl()`)

* HTML DOM manipulation
    * To generate dynamic content (resized images)



## Contributing

Feel free to [Fork](https://github.com/fraigo/image-resizer/fork) and contribute to this project.

