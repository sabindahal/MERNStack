import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-post-detail',
  styleUrls: ['./post-detail.component.scss'],
  templateUrl: './post-detail.component.html',
  imports: [CommonModule]
})
export class PostDetailComponent implements OnInit {
  post: any;
  error: string = '';
  postId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.postId) {
      this.error = 'Post ID is missing';
      return;
    }

    this.postService.getPostById(this.postId).subscribe({
      next: (data) => {
        this.post = data;
      },
      error: (err) => {
        this.error = err.message || 'Failed to fetch post';
      }
    });
  }

  wave(): void {
    // You need to implement this on the backend first
    // For now we just simulate the effect
    if (!this.post.listOfUsersWaved) {
      this.post.listOfUsersWaved = [];
    }
    this.post.listOfUsersWaved.push('you@example.com');
  }

  goBack(): void {
    this.router.navigate(['/posts']);
  }
}
