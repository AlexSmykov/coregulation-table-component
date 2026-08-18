import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAngularQuery } from '@tanstack/angular-query-experimental';
import { QueryClient } from '@tanstack/query-core';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAngularQuery(new QueryClient()),
  ],
};
