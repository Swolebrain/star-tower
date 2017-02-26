import {Shield} from './Entities';
import {ShieldSection} from './Entities';
import {Projectile} from './Entities';
import preloader from './Preloader';
import Ship from './Ship/Ship.js';
var images;
preloader().then(img=>{
  images=img;
  game();
});

const initializeEntities = ()=>({
  shields: [new Shield(250, 12), new Shield(200, 10), new Shield(150, 6)],
  projectiles: [],
  player: new Ship(images, 100)
});

const game = ()=>{

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let {shields, projectiles, player} = initializeEntities(canvas);


  let loopStart = new Date().getTime();
  const loop = () =>{
    let loopDuration = new Date().getTime() - loopStart;
    loopStart = new Date().getTime();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let dt =loopDuration/1000;
    //projectiles.forEach(projectile=>projectile.update(dt, shields));
    shields.forEach(shield=>shield.update(dt));
    //projectiles = projectiles.filter(projectile=>!projectile.destroyed);
    player.update(dt, shields);

    // projectiles.forEach(projectile=>projectile.render(ctx));
    shields.forEach(shield=>shield.render(ctx));
    player.render(ctx);

    window.requestAnimationFrame(loop);
  }
  loop();
}
