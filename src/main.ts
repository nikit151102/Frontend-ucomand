import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import { register as registerSwiperElements } from 'swiper/element/bundle';

// Register Swiper custom elements. We do this
registerSwiperElements();


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
