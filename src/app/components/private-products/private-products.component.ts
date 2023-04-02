import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-private-products',
  templateUrl: './private-products.component.html',
  styleUrls: ['./private-products.component.scss']
})
export class PrivateProductsComponent {
  PH_JULIAN = "/assets/images/anna.jpeg"

  products: Product[] = []

  view = "grid"

  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit() {
    this.chargeInit();
  }

  chargeInit() {
    this.productService.getAllProductsByUser().subscribe((res) => {
      console.log(res)
      this.products = res
    })
  }
  setView(view: string) {
    this.view = view
  }


}
