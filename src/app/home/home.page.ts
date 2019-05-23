
import { PostsService } from "./../posts.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  constructor(
    private postSrvc: PostsService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

ionRefresh(event) {
      console.log('Pull Event Triggered!');
      setTimeout(() => {
        console.log('Async operation has ended');
        //complete()  signify that the refreshing has completed and to close the refresher
        event.target.complete();
      }, 2000);
  }
  ionPull(event){
    //Emitted while the user is pulling down the content and exposing the refresher.
    console.log('ionPull Event Triggered!');
  }
  ionStart(event){
    //Emitted when the user begins to start pulling down.
    console.log('ionStart Event Triggered!');
  }
  
  
  posts$: Observable<any>;
  loadPost(post: any) {
    this.router.navigate(["/posts", post.id]);
  }
  ngOnInit() {
    this.posts$ = this.route.paramMap.pipe(
      switchMap(
        (params: ParamMap) =>
          params.get("category")
            ? this.postSrvc.fetchPostsByCategory(params.get("category"))
            : this.postSrvc.fetchPosts()
      )
    );
  }
}