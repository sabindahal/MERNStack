import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = environment.server_api;

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

  wavePost(postId: string) {
    return this.http.patch(`/api/posts/${postId}/wave`, {});
  }
}
