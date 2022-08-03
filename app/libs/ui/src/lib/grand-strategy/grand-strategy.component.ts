import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'ui-grand-strategy',
  templateUrl: './grand-strategy.component.html',
  styleUrls: ['./grand-strategy.component.scss'],
})
export class GrandStrategyComponent implements OnInit, AfterViewInit {
  @ViewChild('gameContainer') gameContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('gameCanvas') gameCanvas!: ElementRef<HTMLCanvasElement>;

  gameInstance: unknown;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const loader = (window as any).createUnityInstance;

    this.gameInstance = loader(this.gameCanvas.nativeElement, {
      dataUrl: 'assets/unity/Build/build.data',
      frameworkUrl: 'assets/unity/Build/build.framework.js',
      codeUrl: 'assets/unity/Build/build.wasm',
      symbolsUrl: 'assets/unity/Build/build.symbols.json',
      streamingAssetsUrl: 'assets',
      companyName: 'DefaultCompany',
      productName: 'My project',
      productVersion: '0.1',
      showBanner: true,
    });
  }
}
