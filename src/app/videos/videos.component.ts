import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../videos/video.model';
import { VideoService } from './videos.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
  providers: []
})
export class VideosComponent implements OnInit {
  selectedVideo: Video;

  @Input() Video: Video;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.videoService.selectedVideo
    .subscribe(
      (video: Video) => {
        this.selectedVideo = video
      }
    );
  }

}
