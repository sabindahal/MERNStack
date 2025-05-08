import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

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
  isWaved: boolean = false;
  uploadBaseUrl: string = environment.server_api.replace('/api', '') + '/uploads/';


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

        // 👇 判断当前登录用户是否已经 wave
        const token = localStorage.getItem('token');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const userId = payload.id;
          this.isWaved = this.post.listOfUsersWaved.includes(userId);
        }
      },
      error: (err) => {
        this.error = err.message || 'Failed to fetch post';
      }
    });
  }

  wave(): void {
    this.postService.wavePost(this.postId).subscribe({
      next: (res) => {
        this.isWaved = !this.isWaved;

        // 👇 刷新 wave 数
        this.postService.getPostById(this.postId).subscribe({
          next: (data) => {
            this.post = data;
          },
          error: (err) => {
            this.error = err.message || 'Failed to reload post';
          }
        });
      },
      error: (err) => {
        this.error = err.error.message || 'Wave failed';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/posts']);
  }
}
