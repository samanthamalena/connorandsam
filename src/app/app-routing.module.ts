import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideosComponent } from './videos/videos.component';
import { VideoDetailComponent } from './videos/video-detail/video-detail.component';
import { VideoEditComponent } from './videos/video-edit/video-edit.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/videos', pathMatch: 'full'},
    { path: 'videos' , component: VideosComponent, children: [
       { path: 'new', component: VideoEditComponent },
        { path: ':id', component: VideoDetailComponent},
        { path: ':id/edit', component: VideoEditComponent}
    ] }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}