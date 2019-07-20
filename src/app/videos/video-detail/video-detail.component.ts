import { Component, OnInit } from '@angular/core';
import { Video } from '../video.model';
import { VideoService } from '../videos.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WinRefService } from 'src/app/win-ref.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
video: Video;
nativeWindow: any;
id: string; 

  constructor(private videoService: VideoService,
              private windowRefService: WinRefService,
              private route: ActivatedRoute,
              private router: Router) {
        this.nativeWindow = windowRefService.getNativeWindow();
               }

  ngOnInit() {
    this.route.params 
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.video = this.videoService.getVideo(this.id);
      }
    );
  }

onEditVideo() {
  this.router.navigate(['edit'], {relativeTo: this.route});
}

onView() {
  if (this.video.url)  {
    this.nativeWindow.open(this.video.url);
  }
}

onDelete() {
  this.videoService.deleteVideo(this.video)
  this.router.navigate(['/videos'], {relativeTo: this.route});
}

}
