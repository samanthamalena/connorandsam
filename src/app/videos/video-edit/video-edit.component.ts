import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VideoService } from '../videos.service';
import { NgForm } from '@angular/forms';
import { Video } from '../video.model';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css']
})
export class VideoEditComponent implements OnInit {
id: string;
editMode = false;
originialVideo: Video;
video: Video;

  constructor(private videoService: VideoService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];

        if(!this.id) {
          this.editMode = false;
          return;
        }
        
        this.originialVideo = this.videoService.getVideo(this.id);

        if(!this.originialVideo) {
          return;
        }

        this.editMode = true;
        this.video = JSON.parse(JSON.stringify(this.originialVideo));
      }
    );
  }

  onSubmit(form: NgForm) {
    let values = form.value;
    let newVideo = new Video(' ', values.name, values.description, values.url, null);

    if(this.editMode === true) {
      this.videoService.updateVideo(this.originialVideo, newVideo);
    }
    else {
      this.videoService.addVideo(newVideo);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
