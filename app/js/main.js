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

  // get the config and image src from localStorage, and pass it to processImage fn
  const importDataFn = () => {
    const imgData = localStorage.getItem("data");
    const { x, y, id: fileName } = JSON.parse(imgData).canvas.photo;
    const imgSrcBase64 = localStorage.getItem(fileName);
    processImage(imgSrcBase64, x, y, fileName);
  };

  importBtn.addEventListener("click", importDataFn);

  // handles all the main logic
  const processImage = (reader, xOff, yOff, fileName) => {
    // create HTMLImageElement holding image data
    img = new Image();
    img.src = reader.result !== undefined ? reader.result : reader;

    let ctx;
    let width;
    let height;
    let scale;

    img.onload = function () {
      // grab some data from the image
      width = img.naturalWidth;
      height = img.naturalHeight;

      editorCanvas.width = 500;
      editorCanvas.height = 500;

      scale = Math.max(
        editorCanvas.width / width,
        editorCanvas.height / height
      );

      const x = editorCanvas.width / 2 - (width / 2) * scale;
      const y = editorCanvas.height / 2 - (height / 2) * scale;
      ctx = editorCanvas.getContext("2d");

      if (width < editorCanvas.width || height < editorCanvas.height) {
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        ctx.translate(xOff, yOff);
        ctx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      } else {
        ctx.drawImage(
          img,
          width / 2 - editorCanvas.width / 2,
          height / 2 - editorCanvas.height / 2,
          editorCanvas.width,
          editorCanvas.height,
          0,
          0,
          editorCanvas.width,
          editorCanvas.height
        );
        ctx.translate(xOff, yOff);
        ctx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
        ctx.drawImage(
          img,
          width / 2 - editorCanvas.width / 2,
          height / 2 - editorCanvas.height / 2,
          editorCanvas.width,
          editorCanvas.height,
          0,
          0,
          editorCanvas.width,
          editorCanvas.height
        );
      }
    };

    // to cover image on top of canvas height and width
    const fillImage = () => {
      const x = editorCanvas.width / 2 - img.width / 2;
      const y = editorCanvas.height / 2 - img.height / 2;

      if (width < editorCanvas.width || height < editorCanvas.height) {
        x = editorCanvas.width / 2 - (img.width / 2) * scale;
        y = editorCanvas.height / 2 - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      } else {
        ctx.drawImage(img, x, y, width, height);
      }
    };

    const scaleUpFn = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
      ctx.drawImage(
        img,
        img.naturalWidth / 2 - editorCanvas.width / 2,
        img.naturalHeight / 2 - editorCanvas.height / 2,
        editorCanvas.width / 2,
        editorCanvas.height / 2,
        0,
        0,
        editorCanvas.width,
        editorCanvas.height
      );
    };

    const scaleDownFn = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
      ctx.drawImage(
        img,
        img.naturalWidth / 2 - editorCanvas.width / 2,
        img.naturalHeight / 2 - editorCanvas.height / 2,
        editorCanvas.width * 2,
        editorCanvas.height * 2,
        0,
        0,
        editorCanvas.width,
        editorCanvas.height
      );
    };

    // common funtion to move around the image
    const moveFn = (direction) => {
      var rect = img.getBoundingClientRect();
      var x = rect.left;
      var y = rect.top;
      var dist = 1;

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

      ctx.translate(x, y);
      ctx.save();
      // clears the transforms
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
      ctx.restore();
      fillImage();
    };

    //store data in localstorage
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
      localStorage.setItem(fileName, img.src);
    };

    scaleUp.addEventListener("click", scaleUpFn);
    scaleDown.addEventListener("click", scaleDownFn);
    moveLeft.addEventListener("click", () => moveFn("left"));
    moveRight.addEventListener("click", () => moveFn("right"));
    moveUp.addEventListener("click", () => moveFn("up"));
    moveDown.addEventListener("click", () => moveFn("down"));
    submitBtn.addEventListener("click", submitFn);
  };

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
            // handle all processing of the image, can be resued for import scenario as well
            processImage(reader, xOff, yOff, fileName);
          };
          reader.readAsDataURL(file);
          // process just one file.
          return;
      }
    }
  };
};

AppView();
