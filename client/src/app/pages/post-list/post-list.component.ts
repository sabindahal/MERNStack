import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-post-list',
  styleUrls: ['./post-list.component.scss'],
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

  editPost(id: string) {
    this.router.navigate(['/edit-post', id]);
  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter(post => post._id !== id);
    });
  }
}
