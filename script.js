const debugEnabled = false;





var manDiv = document.getElementById("man");
var app = new PIXI.Application({
  resizeTo: manDiv,
  transparent: true,
  antialias: true
});

manDiv.appendChild(app.view);

var drawing;
var drawSteps = [];


function rescale(){
  let cWid = Math.min(manDiv.offsetWidth, manDiv.offsetHeight);
  drawing.scale.x = cWid / 250;
  drawing.scale.y = cWid / 250;
  if (manDiv.offsetWidth > manDiv.offsetHeight){
    drawing.x = (manDiv.offsetWidth - cWid) / 2;
  }
}

function startGame(){
  drawing = new PIXI.Container();

  let debugBox = new PIXI.Graphics();
  debugBox.lineStyle(4, 0xFF0000)
    .drawRect(0, 0, 250, 250);

  let gallows = new PIXI.Graphics();
  gallows.lineStyle(2, 0x000000)
    .arc(125, 700, 500, Math.PI, 0)
    .moveTo(75, 202)
    .lineTo(75, 50)
    .lineTo(150, 50)
    .moveTo(75, 70)
    .lineTo(95, 50);
  
  let noose = new PIXI.Graphics();
  noose.lineStyle(2, 0x000000)
    .moveTo(0, 0)
    .lineTo(0, 20);
  drawSteps.push(noose);

  let face = new PIXI.Graphics();
  face.lineStyle(2, 0x000000)
    .drawCircle(0, 30, 10);
  drawSteps.push(face);

  let body = new PIXI.Graphics();
  body.lineStyle(2, 0x000000)
    .moveTo(0, 40)
    .lineTo(0, 80);
  drawSteps.push(body);

  let leftLeg = new PIXI.Graphics();
  leftLeg.lineStyle(2, 0x000000)
    .moveTo(0, 80)
    .lineTo(-10, 110);
  drawSteps.push(leftLeg);

  let rightLeg = new PIXI.Graphics();
  rightLeg.lineStyle(2, 0x000000)
    .moveTo(0, 80)
    .lineTo(10, 110);
  drawSteps.push(rightLeg);

  let leftArm = new PIXI.Graphics();
  leftArm.lineStyle(2, 0x000000)
    .moveTo(0, 55)
    .lineTo(-10, 70);
  drawSteps.push(leftArm);

  let rightArm = new PIXI.Graphics();
  rightArm.lineStyle(2, 0x000000)
    .moveTo(0, 55)
    .lineTo(10, 70);
  drawSteps.push(rightArm);


  drawing.addChild(gallows);


  let man = new PIXI.Container();
  man.x = 150;
  man.y = 50;
  man.pivot.x = man.width / 2;
  man.pivot.y = 0;

  for (let i = 0; i < drawSteps.length; i++){
    man.addChild(drawSteps[i]);
    drawSteps[i].visible = false;
  }

  if (debugEnabled){
    drawing.addChild(debugBox);
  }

  drawing.addChild(man);
  app.stage.addChild(drawing);

  let mask = new PIXI.Sprite(PIXI.Texture.WHITE);
  mask.width = 250;
  mask.height = 250;
  drawing.addChild(mask);
  drawing.mask = mask;


  let totalTime = 0;
  app.ticker.add(function(delta){
    totalTime += delta;
    man.rotation = (Math.PI / 40) * Math.sin(totalTime / (60));
  });

  let filter = new PIXI.filters.BlurFilter();
  filter.blur = 0.3;
  drawing.filters = [filter];
}

startGame();


manDiv.addEventListener('resize', rescale, true);

var resizeObserver = new ResizeObserver(entries => {
  rescale();
});

resizeObserver.observe(manDiv);



var sounds = {
  open: new Howl({src: ["./paperFlip.ogg"]}),
  close: new Howl({src: ["./paperFlip.ogg"]}),
  draw: new Howl({src: ["./penStroke.ogg"]}),
  correct: new Howl({
    src: ["./correctSound.ogg"],
    volume: 0.25
  })
};