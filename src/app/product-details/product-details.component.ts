import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { Cart, Product } from '../data-type';

@Component({
  selector: 'app-product-details',
  standalone: false,

  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productDetails: undefined | Product;
  productQuantity: number = 1;
  remveCart: boolean = false;
  removeCartDB: Product | undefined;
  constructor(private route: ActivatedRoute, private product: ProductService) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    productId &&
      this.product.GetProduct(productId).subscribe((data) => {
        this.productDetails = data;

        let CartData = localStorage.getItem('cart');
        if (CartData && productId) {
          let items = JSON.parse(CartData);
          items = items.filter((item: Product) => productId === item.id.toString());
          if (items.length ) {
            this.remveCart = true;
          } else {
            this.remveCart = false;
          }
        }
        let user = localStorage.getItem('user');
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.product.GetCartItems(userId);
          this.product.CartData.subscribe((data) => {
            let item = data.filter(
              (item: Product) =>
                productId?.toString() == item.productId?.toString()
            );
            if (item.length) {
              this.removeCartDB = item[0];
              this.remveCart = true;
            }
          });
        }
      });
  }
  HandleQuqntity(data: string) {
    if (this.productQuantity < 10 && data === 'max') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && data === 'min') {
      this.productQuantity -= 1;
    }
  }
  AddToCart() {
    if (this.productDetails) {
      this.productDetails.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        console.log(this.productDetails);
        this.product.localAddToCart(this.productDetails);
        this.remveCart = true;
      } else {
        console.log('user logged in');
        let user = localStorage.getItem('user');
        console.log(user);
        let userId = user && JSON.parse(user)[0].id;
        console.log(userId);
        let cartData: Cart = {
          ...this.productDetails,
           userId,
          productId: this.productDetails.id,
        };
        delete cartData.id;
        console.log(cartData);
        this.product.AddToCart(cartData).subscribe((data) => {
          if (data) {
            this.product.GetCartItems(userId);
            this.remveCart = true;
          }
        });
      }
    }
  }
  RemoveToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.RemoveItemToCart(productId);
    } else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse
      (user)[0].id; 
      console.log(this.removeCartDB);
       this.removeCartDB&& this.product.RemoveCartItemsDB(this.removeCartDB.id)
       .subscribe((data) => {
        if (data){
          this.product.GetCartItems(userId);
        }
        })
        this.remveCart = false;
    }
  }
}
