import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// keep if you scaffolded with hydration / SSR:
import { provideClientHydration } from '@angular/platform-browser';

// REQUIRED for your error:
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),                 // or provideHttpClient(withInterceptorsFromDi())
    provideClientHydration(),            // optional (only useful with SSR)
  ],
};
