import { isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
declare var CanvasJS: any;

@Component({
  selector: 'app-root',
  template: '<div id="chartContainer" style="height: 360px; width: 100%;"></div>',
})
export class AppComponent implements AfterViewInit {  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadScript('https://canvasjs.com/assets/script/canvasjs.min.js').then(() => {
        this.createChart();
      }).catch(error => console.error('Script loading error: ', error));
    }
  }

  loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });
  }

  createChart() {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "India Bengaluru"
      },
      axisY: {
        title: "Temperature (°F)",
        suffix: "°F"
      },
      data: [{
        type: "rangeColumn",
        indexLabel: "{y[#index]}°",
        toolTipContent: "<b>{label}</b><br>Min: {y[0]}°F<br/>Max: {y[1]}°F",
        dataPoints: [
          { label: "Jan", y: [48.5, 68.1] },
          { label: "Feb", y: [50.3, 69.6] },
          { label: "Mar", y: [51.6, 69.8] },
          { label: "Apr", y: [54.4, 73.1] },
          { label: "May", y: [57.9, 74.5] },
          { label: "Jun", y: [61.4, 79.5] },
          { label: "Jul", y: [64.6, 83.8] },
          { label: "Aug", y: [65.6, 84.8] },
          { label: "Sept", y: [64.6, 83.3] },
          { label: "Oct", y: [59.9, 79.0] },
          { label: "Nov", y: [52.6, 73.2] },
          { label: "Dec", y: [48.3, 68.7] }
      ]
      }]
    });
    chart.render();
  }
}