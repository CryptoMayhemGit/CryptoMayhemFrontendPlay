import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AppConfig,
  APP_CONFIG,
} from '@crypto-mayhem-frontend/crypto-mayhem/config';

@Component({
  templateUrl: './grand-strategy.component.html',
  styleUrls: ['./grand-strategy.component.scss'],
})
export class GrandStrategyComponent implements OnInit, AfterViewInit {
  @ViewChild('gameContainer') gameContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('gameCanvas') gameCanvas!: ElementRef<HTMLCanvasElement>;

  gameInstance: unknown;
  progress = 0;
  constructor(@Inject(APP_CONFIG) private readonly appConfig: AppConfig) {}

  ngOnInit(): void {
    window.addEventListener('hello', (event: any) => {
      console.log(event.detail);
    });
  }

  ngAfterViewInit(): void {
    const loader = (window as any).createUnityInstance;

    this.gameInstance = loader(
      this.gameCanvas.nativeElement,
      {
        dataUrl: `${this.appConfig.webGlLocation}Build/build.data`,
        frameworkUrl: `${this.appConfig.webGlLocation}Build/build.framework.js`,
        codeUrl: `${this.appConfig.webGlLocation}Build/build.wasm`,
        symbolsUrl: `${this.appConfig.webGlLocation}Build/build.symbols.json`,
        streamingAssetsUrl: 'assets',
        companyName: 'DefaultCompany',
        productName: 'My project',
        productVersion: '0.1',
        showBanner: true,
      },
      (progress: any) => {
        this.progress = progress;
      }
    )
      .then((unityInstance: any) => {
        //unityInstance.SendMessage('Camera Controller', 'ZoomOnClickPlanet');
      })
      .catch((error: any) => {});
  }
}
