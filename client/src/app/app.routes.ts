import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { PostFormComponent } from './pages/post-form/post-form.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'add-post', component: PostFormComponent },
  { path: 'edit-post/:id', component: EditPostComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
