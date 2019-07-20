import { Component, OnInit, OnDestroy } from '@angular/core';
import { Video } from '../video.model';
import { VideoService } from '../videos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  videos: Video[] = [];

  constructor(private videoService: VideoService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.videoService.getVideos();

    this.subscription = this.videoService.videoChangedEvent
    .subscribe(
      (videoList: Video[]) => {
        this.videos = videoList;
      }
    );
    this.videoService.getVideos();
  }

  onNewVideo() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
