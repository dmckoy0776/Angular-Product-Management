import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{
    
    constructor(private productService: ProductService){}
    

    pageTitle= 'Product List';
    imageWidth = 50;
    imageMargin = 2;
    showImage= false;
    filteredProducts: IProduct[] =[];
    errorMessage: string = '';
    sub!: Subscription;

    products: IProduct[] =[];
    
    private _listFilter: string ='';
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(valueToFind: string) {
        this._listFilter = valueToFind;
        this.filteredProducts = this.performFilter(valueToFind);
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
            product.productName.toLocaleLowerCase().includes(filterBy));
    }

    ngOnInit(): void{
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
            
        });
        
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }

    toggleImage(): void {
        this.showImage =! this.showImage
    }

    onRatingClicked(message: string){
        this.pageTitle = 'Product List: ' + message;
    }
}