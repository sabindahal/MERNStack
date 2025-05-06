// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

// ⬇️ 强制保留 LoginComponent 组件（让 Angular 编译器不优化掉）
import '../app/pages/login/login.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    importProvidersFrom(FormsModule)
  ]
};
