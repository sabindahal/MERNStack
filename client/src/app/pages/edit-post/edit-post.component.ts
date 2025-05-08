import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  imports: [CommonModule, FormsModule]
})
export class EditPostComponent implements OnInit {
  postId: string = '';
  title: string = '';
  content: string = '';
  image: File | null = null;
  existingImageName: string = '';
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.postId) {
      this.error = 'Missing post ID';
      return;
    }

    this.postService.getPostById(this.postId).subscribe({
      next: (post) => {
        this.title = post.title;
        this.content = post.content;
        this.existingImageName = post.imageName;
      },
      error: () => {
        this.error = 'Failed to load post';
      }
    });
  }

  onFileSelected(event: any): void {
    this.image = event.target.files[0] || null;
  }

  updatePost(): void {
    if (!this.title || !this.content) {
      this.error = 'Title and content are required.';
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('content', this.content);
    if (this.image) {
      formData.append('image', this.image);
    }

    this.postService.updatePost(this.postId, formData).subscribe({
      next: () => this.router.navigate(['/posts', this.postId]),
      error: () => {
        this.error = 'Failed to update post';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/posts', this.postId]);
  }
}
