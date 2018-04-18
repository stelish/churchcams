import { Component, Input } from '@angular/core';

declare var vxgplayer:any;

@Component({
  selector: 'cam',
  templateUrl: 'cam.html'
})
export class CamComponent {

  @Input() playerId:any = '';
  @Input() streamUrl:any = '';
  width = window.innerWidth/3;
  height = this.width * 0.7;
  maximized:boolean = false;

  constructor() {
    this.loadVideo();
  }

  loadVideo():void {
    const div = document.createElement('div');
    div.setAttribute("id", this.playerId);
    div.setAttribute("class", "vxgplayer");

    const runtimePlayers = document.getElementById(this.playerId+'-container');
    runtimePlayers.appendChild(div);

    vxgplayer(this.playerId, {
            url: '',
            nmf_path: 'media_player.nmf',
            nmf_src: '/assets/pnacl/Release/media_player.nmf',
            latency:"0",
            autohide:"1",
            volume:"0.7",
            avsync: true,
            autostart: true,
            controls: true,
            mute: true,
            aspect_ratio: true,
            aspect_ratio_mode:"2",
            auto_reconnect: true,
            connection_timeout:"5000",
            connection_udp:"0",
            custom_digital_zoom: true
    }).ready(function(){
        console.log(' =>ready player '+this.playerId);
        vxgplayer(this.playerId).src('rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov');
        vxgplayer(this.playerId).play();
        console.log(' <=ready player '+this.playerId);
    });
  }

  toggleFullScreen():void {
    this.maximized ? this.minimizeCam(): this.maximizeCam();
    this.maximized = !this.maximized;
  }

  maximizeCam():void {
    vxgplayer(this.playerId).size(window.innerWidth,window.innerHeight);
  }

  minimizeCam():void {
    vxgplayer(this.playerId).size(this.width,this.height);
  }

}
