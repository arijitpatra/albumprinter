import "../css/main.scss";

const AppView = () => {
  document.body.innerHTML = `<h1>Simple Example</h1>
        <form action="#">
            <fieldset>
                <label for="fileSelector">Select an Image file</label>
                <input type="file" id="fileSelector" />
            </fieldset>
        </form>

        <canvas id="editorCanvas"></canvas>
        
        <div>
            <button id="scaleUp">Scale Up</button>
            <button id="scaleDown">Scale Down</button>
            <button id="moveLeft">Move Left</button>
            <button id="moveRight">Move Right</button>
            <button id="moveUp">Move Up</button>
            <button id="moveDown">Move Down</button>
        </div>`;

  // grab DOM elements inside index.html
  const fileSelector = document.getElementById("fileSelector");
  const editorCanvas = document.getElementById("editorCanvas");
  const scaleUp = document.getElementById("scaleUp");
  const scaleDown = document.getElementById("scaleDown");
  const moveLeft = document.getElementById("moveLeft");
  const moveRight = document.getElementById("moveRight");
  const moveUp = document.getElementById("moveUp");
  const moveDown = document.getElementById("moveDown");

  let img;

  //   const scaleUpFn = () => {
  //     const ctx = editorCanvas.getContext("2d");
  //     ctx.drawImage(
  //       img,
  //       0,
  //       0,
  //       img.naturalWidth * 2,
  //       img.naturalHeight * 2,
  //       0,
  //       0,
  //       editorCanvas.width,
  //       editorCanvas.height
  //     );
  //   };

  //   scaleUp.addEventListener("click", scaleUpFn);

  fileSelector.onchange = function (e) {
    // get all selected Files
    const files = e.target.files;
    let file;
    for (let i = 0; i < files.length; ++i) {
      file = files[i];
      // check if file is valid Image (just a MIME check)
      switch (file.type) {
        case "image/jpeg":
        case "image/png":
        case "image/gif":
          // read Image contents from file
          const reader = new FileReader();
          reader.onload = function (e) {
            // create HTMLImageElement holding image data
            img = new Image();
            img.src = reader.result;
            let ctx;
            let width;
            let height;

            img.onload = function () {
              // grab some data from the image
              width = img.naturalWidth;
              height = img.naturalHeight;

              editorCanvas.width = 500;
              // editorCanvas.height = (500 * height) / width;
              editorCanvas.height = 500;

              //   var imageAspectRatio = width / height;
              //   var canvasAspectRatio = editorCanvas.width / editorCanvas.height;
              //   var renderableHeight, renderableWidth, xStart, yStart;

              //   if (imageAspectRatio < canvasAspectRatio) {
              //     renderableHeight = editorCanvas.height;
              //     renderableWidth = width * (renderableHeight / height);
              //     xStart = (editorCanvas.width - renderableWidth) / 2;
              //     yStart = 0;
              //   }

              //   // If image's aspect ratio is greater than canvas's we fit on width
              //   // and place the image centrally along height
              //   else if (imageAspectRatio > canvasAspectRatio) {
              //     renderableWidth = editorCanvas.width;
              //     renderableHeight = height * (renderableWidth / width);
              //     xStart = 0;
              //     yStart = (editorCanvas.height - renderableHeight) / 2;
              //   }

              // Happy path - keep aspect ratio
              //   else {
              //   renderableHeight = editorCanvas.height;
              //   renderableWidth = editorCanvas.width;
              //   xStart = 0;
              //   yStart = 0;
              //   //   }

              //   ctx = editorCanvas.getContext("2d");
              //   ctx.drawImage(
              //     img,
              //     xStart,
              //     yStart,
              //     renderableWidth,
              //     renderableHeight
              //   );

              // ************************************************

              var scale = Math.max(
                editorCanvas.width / img.width,
                editorCanvas.height / img.height
              );
              // get the top left position of the image
              var x = editorCanvas.width / 2 - (img.width / 2) * scale;
              var y = editorCanvas.height / 2 - (img.height / 2) * scale;
              ctx = editorCanvas.getContext("2d");
              ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

              //   ctx = editorCanvas.getContext("2d");
              //   ctx.drawImage(
              //     img,
              //     0,
              //     0,
              //     // width,
              //     // height,
              //     // 0,
              //     // 0,
              //     editorCanvas.width,
              //     editorCanvas.height
              //   );
            };
            // do your magic here...

            const fillImage = () => {
              var scale = Math.max(
                editorCanvas.width / img.width,
                editorCanvas.height / img.height
              );
              // get the top left position of the image
              var x = editorCanvas.width / 2 - (img.width / 2) * scale;
              var y = editorCanvas.height / 2 - (img.height / 2) * scale;
              ctx = editorCanvas.getContext("2d");
              ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            };

            const scaleUpFn = () => {
              ctx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
              //   ctx.drawImage(
              //     img,
              //     0,
              //     0,
              //     width,
              //     height,
              //     0,
              //     0,
              //     editorCanvas.width * 2,
              //     editorCanvas.height * 2
              //   );
              var scale = Math.max(
                editorCanvas.width / img.width,
                editorCanvas.height / img.height
              );
              // get the top left position of the image
              var x = editorCanvas.width / 2 - (img.width / 2) * scale;
              var y = editorCanvas.height / 2 - (img.height / 2) * scale;
              ctx = editorCanvas.getContext("2d");
              ctx.drawImage(
                img,
                x,
                y,
                img.width * scale * 2,
                img.height * scale * 2
              );
            };

            const scaleDownFn = () => {
              ctx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
              //   ctx.drawImage(
              //     img,
              //     0,
              //     0,
              //     width,
              //     height,
              //     0,
              //     0,
              //     editorCanvas.width * 0.5,
              //     editorCanvas.height * 0.5
              //   );
              var scale = Math.max(
                editorCanvas.width / img.width,
                editorCanvas.height / img.height
              );
              // get the top left position of the image
              var x = editorCanvas.width / 2 - (img.width / 2) * scale;
              var y = editorCanvas.height / 2 - (img.height / 2) * scale;
              ctx = editorCanvas.getContext("2d");
              ctx.drawImage(
                img,
                x,
                y,
                img.width * scale * 0.5,
                img.height * scale * 0.5
              );
            };

            const moveFn = (direction) => {
              var rect = img.getBoundingClientRect();
              var x = rect.left;
              var y = rect.top;
              var dist = 5; //set distance

              switch (direction) {
                case "up":
                  y -= dist;
                  break;
                case "down":
                  y += dist;
                  break;
                case "left":
                  x -= dist;
                  break;
                case "right":
                  x += dist;
                  break;
              }

              ctx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
              ctx.translate(x, y);
              //   ctx.drawImage(
              //     img,
              //     0,
              //     0,
              //     width,
              //     height,
              //     0,
              //     0,
              //     editorCanvas.width,
              //     editorCanvas.height
              //   );
              fillImage();
            };

            scaleUp.addEventListener("click", scaleUpFn);
            scaleDown.addEventListener("click", scaleDownFn);
            moveLeft.addEventListener("click", () => moveFn("left"));
            moveRight.addEventListener("click", () => moveFn("right"));
            moveUp.addEventListener("click", () => moveFn("up"));
            moveDown.addEventListener("click", () => moveFn("down"));
          };
          reader.readAsDataURL(file);
          // process just one file.
          return;
      }
    }
  };
};

AppView();
