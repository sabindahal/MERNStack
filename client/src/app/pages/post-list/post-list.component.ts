import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  imports: [CommonModule, RouterModule]
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  error: string = '';

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (err) => {
        this.error = err.message || 'Failed to fetch posts';
      }
    });
  }

  viewPost(id: string): void {
    this.router.navigate(['/posts', id]);
  }
}
