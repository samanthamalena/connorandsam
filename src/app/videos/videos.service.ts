import { Injectable } from '@angular/core';
import { Video } from "../videos/video.model";
import { Subject, Observable } from 'rxjs';
import { VideoEditComponent } from './video-edit/video-edit.component';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class VideoService {
    id: string;
    selectedVideo = new Subject<Video>();
    videoChangedEvent = new Subject<Video[]>();
    maxVideoId: number;
    originalVideo: VideoEditComponent;
    newVideo: string;
    maxId: number;
    currentId: number;
    videosListClone: Video[] = [];

    private videos: Video[] = [];

    constructor(private http: HttpClient) {
      //  this.documents = MOCKDOCUMENTS;
        this.maxVideoId = this.getMaxId();
    }

    // storeVideos() {
    //  //   let json = JSON.stringify(documents);
    //  //   let header = new HttpHeaders({'Content-Type': 'application/json'});
    //     this.http.put('https://connorandsam-69.firebaseio.com/videos.json', this.videos)
    //         .subscribe((response: Response)=> {
    //             console.log(response);
    //         });
    // }


    getVideos() {
        this.http.get<{ message: string, videos: Video[]}>('http://localhost:3000/videos')
            .subscribe(
                (responseData) => {
                    this.videos = responseData.videos;
                    this.videos.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
                    this.videoChangedEvent.next(this.videos.slice());
                },
                (error: any) => {
                    console.log(error);
                }
            );
    }

    getVideo(id: string): Video {
        for (let i = 0; i < this.videos.length; i++) {
            if (this.videos[i].id === id) {
                return this.videos[i];
            }
        }
        return null;
    }

    deleteVideo(video: Video) {
        if (!video) {
            return;
        }

        this.http.delete('http://localhost:3000/videos' + video.id)
            .subscribe(
                (videos: Video[]) => {
                    this.videos = videos;
                    this.videoChangedEvent.next(this.videos.slice());
                });
    }

    getMaxId(): number {
        this.videos.forEach(video => {
            this.currentId = +video.id;

            if (this.currentId > this.maxId)
                this.maxId = this.currentId;
        });
        return this.maxId;
    }


    addVideo(video: Video) {
        if (!video) {
            return;
        }
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        video.id = '';

        this.http.post('http://localhost:3000/videos', video, {headers: headers})
            .subscribe(
                (video: Video) => {
                    this.videos.push(video);
                    this.videoChangedEvent.next(this.videos.slice());
                });
    
    }

    updateVideo(originalVideo: Video,
        newVideo: Video) {
        if (!originalVideo || !newVideo) {
            return;
        }
        const pos = this.videos.findIndex(d => d.id === originalVideo.id)
        if (pos < 0) {
            return;
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        newVideo.id = originalVideo.id;

        this.http.put('http://localhost:3000/videos' + originalVideo.id
                        , newVideo
                        , {headers: headers})
            .subscribe(
                (response: Response) => {
                    this.videos[pos] = newVideo;
                    this.videoChangedEvent.next(this.videos.slice());
                });
    }

}