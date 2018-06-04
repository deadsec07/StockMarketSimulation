import { Component } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'broker',
  templateUrl: './broker.component.html'
})
export class BrokerComponent {
    single: any[] = [
        {
            name: "Germany",
            value: 8940000
        },
        {
            name: "USA",
            value: 5000000
        },
        {
            name: "France",
            value: 7200000
        }
    ];

    view: any[] = [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = "Country";
    showYAxisLabel = true;
    yAxisLabel = "Population";

    colorScheme = {
        domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
    };

    onSelect(event) {
        console.log(event);
    }
    
}
