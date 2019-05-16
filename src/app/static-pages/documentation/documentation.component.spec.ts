import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationComponent } from './documentation.component';
import { SharedModule } from '@src/app/shared/shared.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';

/**
 * ngx-markdown setup follows https://github.com/jfcere/ngx-markdown
 */
function markedOptions(): MarkedOptions {
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

describe('DocumentationComponent', () => {
  let component: DocumentationComponent;
  let fixture: ComponentFixture<DocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
      declarations: [DocumentationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
