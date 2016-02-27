module.exports = `
  function Glimpse(options) {
    this.div = d3.select(options.element).append('div').style({position:'absolute', color:'white', background:'rgba(1,1,1,0.2)', 'font-family':'helvetica, arial, sans-serif'});
    this.scales = {};
    this.scales.accel = d3.scale.linear().domain([-4000,4000]).range([-1,1]);
    this.roll = 0;
    this.pitch = 0;
    this.element = options.element;
    this.host = options.host
    
    this.init();
  }

  Glimpse.prototype.init = function() {
    this.host.on('update', this.update.bind(this));

    var texture = new THREE.Texture();
    var image = new Image();
    image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAIAAAB7GkOtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0RjQ4MTM3OUQ1QzcxMUU1OUI1OEE2Mzg0OTc3REI4MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0RjQ4MTM3QUQ1QzcxMUU1OUI1OEE2Mzg0OTc3REI4MyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRGNDgxMzc3RDVDNzExRTU5QjU4QTYzODQ5NzdEQjgzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRGNDgxMzc4RDVDNzExRTU5QjU4QTYzODQ5NzdEQjgzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+he8drAAACQ5JREFUeNrs3c+KHEUcwPFfdffMzrgbswr+ISBRcwvk4gt48OJd0Ffw6Mt48Q08CD6AL6AXhUi8RU8KASWb2T/zp7vLnn2DqY2hYj4fFnKqnVBTXd/qZqHTarUKAF49jSkAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAB4PrrCcTlHO4vFIpI5pGI5Yn0VQx8pHTguN6mbN8tpXDaNVCldL/DdsB7yLhXtxaUB6Lq4PEu//xzjeOilBS/ItDi7WX73XiyOYxwOGtqmbjusnlz8OIy9BU6155uU0huL+0fd6ZiHgl9QGoDFMj3+pfvmq1ifx+zIF0GNNpdx+nb/5df5gwdxeX7Q0Fmz/Pvq1x8ef36+O5t5UEqV+jHm7fzTe9+/d/uTTX9e8Bu68g+fjlTT7r9exbDzTVBlAC5ifby/Dyg8XQ27YbUdttkzIGoNQMR2jKH4N9wgAKnZn/2n3d8dAHWazijT4ix9gpOiaZtF16w7dwDUqmvm6QZ/y2NpA7yiBABAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABABAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABABAAEwBgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAAAgCAAAAgAAAIAAACAIAAACAAAAgAALXrCseliHGMzeX+ZxzMIzWaFuf2KvJYNjrH2I8Xu9E8Uql+jJS2OZfvwKUBGHN0szh9JzYn0c19E9Ro2v1vvxVtFzkX7P9Nmr02u5PjbOY+mVoDMGvnbXO0P66UneRXq1XJuKaZjlfpn7/29wEp+Sao0XT2b7v85p2YL/YL9aALIzX9eLXa/DHmwQKn0gWeo0npZH531p7kojvd0gBMnzwdrI6W4dqg6kvk+kHQMBx+TMkpdbNmaYFTud24HvMuivbi0gAA8JLzdBNAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAD+U4WvhMwRsxSL9volBNk0UqXrxXk1RJ8LXpYxjelyszSL1L7Mx3WUvhCmMABtimdDPDy3+VO1aaG+v4hlu3+J9YFX1TTmsr16FHnw2jsqlfcvL83zu7k9iaJXQhYGYNnFT8/ii4fjdvAYiVoNcfsovnvQfPR6XPQHXlnNsl3/tnj8WdqdWeFUatrz2/n6w2/71z9O/cWLC8B0JNqM8WSzv8ZcHlQbgIv9G1PLTvBpuq1udn/GbmeFU28A9j+bKL1L7Yo/erq5nrexDQGgXsdtNOUPcJrcHKfmqRVOvZr5/nFl8WgTCPCK5sMUAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAACAAAAgCAAAAgAAAIAAACAIAAACAAAFSuKx455tiO0z/mkFqNsR5vskKnwWsrnJpXeKTtTXbh8gC0KU7a2Kbpf+B7oEopbrXRlo+fBt+KcXSfTLUrPNp53GCNp9VqVbb7P+3j0UXkLADUKkeX4v5x3OpiyIdeGW0Mq3b9KMbeCqfaFR4pjYv7uTuNPLy4AEyfO0ux6HwD1O6qjz4X7OHTmC43S7s/td8GDOvIu7KTeOEWPn3UdFGd70w+L8eNcsmgPKTh3Ozxv13j/goI4JUlAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAADx//wowAOjMTKgZ184+AAAAAElFTkSuQmCC';
    texture.image = image;
    image.onload = function() { texture.needsUpdate = true; };
    texture.repeat.set(1, 1);
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
    var material = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, map: texture } ); 
    
    var scene = this.scene = new THREE.Scene(); 
    var camera = this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ); 
    var renderer = this.renderer = new THREE.WebGLRenderer(); 
    renderer.setSize( 500, 500 );
    this.element.appendChild( renderer.domElement ); 
    
    var geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
    var cube = this.cube = new THREE.Mesh( geometry, material ); 
    scene.add(cube); 
    
    scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x333333));
    
    var keyLight = new THREE.PointLight(0xaaaaaa);
    keyLight.position.x = 15;
    keyLight.position.y = -10;
    keyLight.position.z = 35;
    scene.add(keyLight);
    
    var rimLight = new THREE.PointLight(0x888888);
    rimLight.position.x = 100;
    rimLight.position.y = 100;
    rimLight.position.z = -50;
    scene.add(rimLight);
    
    camera.position.z = 2; 

    cube.rotation.x = 0;
    cube.rotation.y = 0;
    cube.rotation.z = 0;

    this.draw();
  }

  Glimpse.prototype.resize = function (viewport) {
    if(this.camera && this.renderer) {
      this.camera.aspect = viewport.width / viewport.height;
  		this.camera.updateProjectionMatrix();
  
  		this.renderer.setSize( viewport.width, viewport.height );
      console.log('resize', viewport);
    }
  }

  Glimpse.prototype.update = function(data) {
    var x = this.scales.accel(data.accel.x);
    var y = this.scales.accel(data.accel.y);
    var z = this.scales.accel(data.accel.z);
    var miu = 0.001
    var sign = z > 0 ? 1 : -1;
    //var roll = Math.atan2(y, z) * 180 / Math.PI;
    var roll = Math.atan2(y, sign * Math.sqrt(z * z + miu * x * x)) * 180 / Math.PI * -1;
    var pitch = Math.atan2(-x, Math.sqrt(y * y + z * z)) * 180 / Math.PI;

    if(Math.abs(this.roll - roll) > 1) {
      this.roll = roll;
      this.changed = true;
    }

    if(Math.abs(this.pitch - pitch) > 1) {
      this.pitch = pitch;
      this.changed = true;
    }
  }

  Glimpse.prototype.draw = function(data) {
    requestAnimationFrame(this.draw.bind(this));
    var now = new Date;
    var fps = 1000 / (now - this.lastDraw);
    this.lastDraw = now;

    if(!this.changed) return;
    this.changed = false;

    this.div.html('roll: '+ this.roll + '<br>  pitch: ' + this.pitch + '<br>  fps:' + fps.toFixed(2));
    this.cube.rotation.x = THREE.Math.degToRad(this.roll);
    this.cube.rotation.z = THREE.Math.degToRad(this.pitch);
    this.renderer.render( this.scene, this.camera );
  }
`;