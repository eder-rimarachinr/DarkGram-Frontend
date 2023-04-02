import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  PH_JULIAN = "/assets/images/julian.jpeg"

  products: Product[] = []

  view = "list"

  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit() {
    this.chargeInit();
  }

  chargeInit() {
    this.productService.getAllProducts().subscribe((res) => {
      console.log(res)
      this.products = res
    })
  }

  setView(view: string) {
    this.view = view

  }
}
