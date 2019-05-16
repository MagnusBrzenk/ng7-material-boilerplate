import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DocumentationComponent } from './documentation/documentation.component';

import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from './contact/contact.component';

/**
 * ngx-markdown setup follows https://github.com/jfcere/ngx-markdown
 */
export function markedOptions(): MarkedOptions {
  const renderer = new MarkedRenderer();
  renderer.blockquote = (text: string) => {
    return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
  };
  return {
    renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  };
}

@NgModule({
  imports: [
    SharedModule, // For Ng Material
    HttpClientModule, // For dynamic loading of MD

    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptions
      }
    })
  ],
  declarations: [AboutComponent, HomeComponent, DocumentationComponent, ContactComponent]
})
export class StaticPagesModule {}
