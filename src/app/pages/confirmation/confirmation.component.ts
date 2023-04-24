import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  name: string = '';
  price: number = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.name = params.get('name');
      this.price = +params.get('price');
    });
  }
}
