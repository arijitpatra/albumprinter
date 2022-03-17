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
            <button id="submitBtn">Submit</button>
            <button id="importBtn">Import</button>
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
  const submitBtn = document.getElementById("submitBtn");
  const importBtn = document.getElementById("importBtn");

  let img;

  const importDataFn = () => {
    //   let img = document.getElementById("image");
    //   img.src = localStorage.getItem("image");

    const y = localStorage.getItem("data");
    const x = localStorage.getItem(JSON.parse(y).canvas.photo.id);
    console.log(x, JSON.parse(y).canvas);
  };

  importBtn.addEventListener("click", importDataFn);

  fileSelector.onchange = function (e) {
    // get all selected Files
    const files = e.target.files;
    let file;
    let reader;
    let xOff = 0;
    let yOff = 0;
    let fileName;

    for (let i = 0; i < files.length; ++i) {
      file = files[i];
      fileName = file.name;
      // check if file is valid Image (just a MIME check)
      switch (file.type) {
        case "image/jpeg":
        case "image/png":
        case "image/gif":
          // read Image contents from file
          reader = new FileReader();
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

              // do your magic here...

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
              ctx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
              ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            };

            const scaleUpFn = () => {
              ctx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
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
              var dist = 1; //set distance

              switch (direction) {
                case "up":
                  y -= dist;
                  yOff -= dist;
                  break;
                case "down":
                  y += dist;
                  yOff += dist;
                  break;
                case "left":
                  x -= dist;
                  xOff -= dist;
                  break;
                case "right":
                  x += dist;
                  xOff += dist;
                  break;
              }

              ctx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
              ctx.translate(x, y);
              fillImage();
            };

            const submitFn = () => {
              const data = {
                canvas: {
                  width: img.naturalWidth,
                  height: img.naturalHeight,
                  photo: {
                    id: fileName,
                    width: editorCanvas.width,
                    height: editorCanvas.height,
                    x: xOff,
                    y: yOff,
                  },
                },
              };
              localStorage.setItem("data", JSON.stringify(data));
              localStorage.setItem(fileName, reader.result);
            };

            scaleUp.addEventListener("click", scaleUpFn);
            scaleDown.addEventListener("click", scaleDownFn);
            moveLeft.addEventListener("click", () => moveFn("left"));
            moveRight.addEventListener("click", () => moveFn("right"));
            moveUp.addEventListener("click", () => moveFn("up"));
            moveDown.addEventListener("click", () => moveFn("down"));
            submitBtn.addEventListener("click", submitFn);
          };
          reader.readAsDataURL(file);
          // process just one file.
          return;
      }
    }
  };
};

AppView();
