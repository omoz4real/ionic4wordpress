import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { PostsService } from "./../posts.service";

import { DomSanitizer } from '@angular/platform-browser';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx'

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})

export class PostDetailPage implements OnInit {
    
    text = 'Check out the latest News from Us!';
  url = 'https://omosaziegbe.com.com';

  constructor(private route: ActivatedRoute, private postSrvc: PostsService, private socialSharing: SocialSharing,private sanitizer: DomSanitizer) {}
  post$: Observable<any>;
  ngOnInit() {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.postSrvc.fetchPost(params.get("id")))
    );
  }
  
   async shareTwitter() {
    // Either URL or Image
    this.socialSharing.shareViaTwitter(null, null, this.url).then(() => {
      // Success
    }).catch((e) => {
      // Error!
    });
  }
 
  async shareWhatsApp() {
    // Text + Image or URL works
    this.socialSharing.shareViaWhatsApp(this.text, null, this.url).then(() => {
      // Success
    }).catch((e) => {
      // Error!
    });
  }
  
  async shareEmail() {
    //let file = await this.resolveLocalFile();
 
    this.socialSharing.shareViaEmail(this.text, 'My custom subject', ['admin@omosaziegbe.com'], null, null, this.url).then(() => {
    //  this.removeTempFile(file.name);
    }).catch((e) => {
      // Error!
    });
  }
 
  async shareFacebook() {
    //let file = await this.resolveLocalFile();
 
    // Image or URL works
    this.socialSharing.shareViaFacebook(null, this.url, null).then(() => {
     // this.removeTempFile(file.name);
    }).catch((e) => {
      // Error!
    });
  }

async share(){
    
    this.socialSharing.share().then(() => {
        
        
    }).catch((e)=> {
        
    });
}

}
