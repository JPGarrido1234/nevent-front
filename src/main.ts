import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from "@sentry/angular";
import { BrowserTracing } from '@sentry/tracing';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

Sentry.init({
  environment: environment.production ? 'production' : 'development',
  dsn: "https://1df9b203ae264ef89a500f525049037f@o4504651545640960.ingest.sentry.io/4504788731297792",
  tunnel: environment.sentry.tunnel,
  integrations: [
    new BrowserTracing({
      tracePropagationTargets: ["localhost", "https://api.nevent.es"],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],
  tracesSampleRate: 1.0,
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => Sentry.captureException(err));
