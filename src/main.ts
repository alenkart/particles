import "./style.css";
import base64 from "./base64.json";
import Effect from "./core/Effect";

window.addEventListener("load", function () {
  const $canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
  $canvas.width = window.innerWidth;
  $canvas.height = window.innerHeight;

  const ctx = $canvas.getContext("2d")!;

  const $imgs = document.querySelector<HTMLDivElement>("#imgs")!;
  $imgs.innerHTML = `<img id="img1" src="${base64.angler}" />`;
  const $img1 = document.querySelector<HTMLImageElement>("#img1")!;

  const effect = new Effect($canvas.width, $canvas.height, $img1);
  effect.init(ctx);

  let active = false;

  window.addEventListener("mousedown", (e) => {
    active = true;
    effect.mouseX = e.x;
    effect.mouseY = e.y;
  });

  window.addEventListener("mouseup", () => {
    active = false;
    effect.mouseX = 0;
    effect.mouseY = 0;
  });

  window.addEventListener("mousemove", (e) => {
    if (!active) return;
    effect.mouseX = e.x;
    effect.mouseY = e.y;
  });

  function animate() {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);

    effect.draw(ctx);
    effect.update();

    window.requestAnimationFrame(animate);
  }

  animate();
});
