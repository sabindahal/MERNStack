import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  imports: [CommonModule, FormsModule]
})
export class PostFormComponent {
  title: string = '';
  content: string = '';
  image: File | null = null;
  error: string = '';

  constructor(private postService: PostService, private router: Router) {}

  onFileSelected(event: any): void {
    this.image = event.target.files[0] || null;
  }

  submitPost(): void {
    if (!this.title || !this.content || !this.image) {
      this.error = 'All fields are required.';
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('content', this.content);
    if (this.image) {
      formData.append('image', this.image);
    }

    this.postService.addPost(formData).subscribe({
      next: () => this.router.navigate(['/posts']),
      error: (err) => {
        this.error = err.error.message || 'Failed to create post';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/posts']);
  }
}
