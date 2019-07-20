import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { VideoDetailComponent } from './videos/video-detail/video-detail.component';
import { VideoEditComponent } from './videos/video-edit/video-edit.component';
import { VideoItemComponent } from './videos/video-item/video-item.component';
import { VideoListComponent } from './videos/video-list/video-list.component';
import { VideosComponent } from './videos/videos.component';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from './app-routing.module';
import { WinRefService } from './win-ref.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    VideoDetailComponent,
    VideoEditComponent,
    VideoItemComponent,
    VideoListComponent,
    VideosComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [WinRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
