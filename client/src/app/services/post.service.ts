import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:5000/api'; // Adjust if your backend is different

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts`);
  }

  getPostById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/posts/${id}`);
  }

  addPost(postData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/posts`, postData);
  }

  updatePost(id: string, postData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/posts/${id}`, postData);
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/posts/${id}`);
  }
}
