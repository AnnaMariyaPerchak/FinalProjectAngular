import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { IDish } from 'src/app/shared/interfaces/dish.interface';
import { DishService } from 'src/app/shared/services/dish.service';
import { Dish } from 'src/app/shared/modules/dish.module';
import { Category } from 'src/app/shared/modules/category.module';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  arrayProducts:Array<IDish>=[]
  
  arrayCategories:Array<any>=[
    // {id:'a0ef7164-e581-4263-a448-58281db45376',name:'soup'},
    // {id:'f928ea93-325f-49ca-b6d0-fb0f840ed240',name:'pasta'},
    // {id:'872f6f9c-c4e8-44d8-ac3f-ac84569afd4d',name:'bowl'},
    // {id:'f518b3de-9f52-4026-93b9-48dfe7fa78a7',name:'fish'},
    // {id:'09908d69-016d-45bb-bcff-d64e9cbac52d',name:'meat'},
    // {id:'4a46c615-fe81-4bfe-83d0-0f88e6a46a5d',name:'salad'},
    // {id:'e2323444-744f-46da-b805-db409cafb4cd',name:'bakery'},
    // {id:'c9edd853-cc17-4967-85e4-7899d844a9ef',name:'desserts'},
    // {id:'9e7e1a5d-725f-4227-b851-44e319fdbebb',name:'smoothie'},
  ]

  category:string
  
  newCategory:string
  categoryId:string
  newName:string
  newDescription:string
  newWeight:string
  newPrice:number
  productImage:string

  productId:string

  deleteProd:IDish;

  modalRef: BsModalRef;

  search:string
  
  searchName:string
  
  editStatus: boolean;

  selected :string

  uploadProgress: Observable<number>;
  
  constructor(private modalService: BsModalService,
              private productService:DishService,
              private categoryService:CategoryService,
              private afStorage:AngularFireStorage) {}

  ngOnInit(): void {
    this.getProduct()
    this.getCategory()
  }

  addModal(template: TemplateRef<any>) {
    this.resetForm()
    this.modalRef = this.modalService.show(template);
    this.editStatus=false
  }

  deleteModal(template: TemplateRef<any>,product:IDish) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-sm');
    this.deleteProd=product
  }
  editModal(template: TemplateRef<any>,product:IDish) {
    this.modalRef = this.modalService.show(template);

    this.newCategory=product.category.name
    this.newName=product.name
    this.newDescription=product.description
    this.newWeight=product.weight
    this.newPrice=product.price
    this.productImage=product.image
    this.productId=product.id

    this.editStatus = true;
  }

  private getProduct():void{
    this.productService.getCloudDishes().subscribe(data => {
      this.arrayProducts = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Dish;
      })
    });
  }

  private getCategory():void{
    this.categoryService.getCloudCategories().subscribe(data => {
      this.arrayCategories = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Category;
      })
    });
  }

  addProduct():void{
    for(let i=0;i<this.arrayCategories.length;i++){
      if (this.arrayCategories[i].name==this.newCategory){
        this.categoryId=this.arrayCategories[i].id
        console.log(this.categoryId)
      }
    }
    const catProd:ICategory=new Category(this.categoryId,this.newCategory)
    const newProduct:IDish=new Dish(`${this.uuid()}`,catProd,this.newName,this.newDescription,this.newWeight,this.newPrice,this.productImage);
    this.arrayProducts.push(newProduct)
    this.productService.addCloudDish(newProduct)
    this.getProduct()
    this.resetForm()
  }

  deleteProduct(product:IDish):void{
    this.productService.deleteCloudDish(product)
    this.getProduct()
    this.modalRef.hide()
  }

  dismissProduct():void{
    this.modalRef.hide()
  }

  public saveEditProduct(): void{
    for(let i=0;i<this.arrayCategories.length;i++){
      if (this.arrayCategories[i].name==this.newCategory){
        this.categoryId=this.arrayCategories[i].id
        console.log(this.categoryId)
      }
    }
    const editProduct: IDish = new Dish(this.productId,
      new Category(this.categoryId,this.newCategory),
                                              this.newName,
                                              this.newDescription,
                                              this.newWeight,
                                              this.newPrice,
                                              this.productImage);
    this.productService.updateCloudDish(editProduct)
    this.getProduct()
  }

  private resetForm():void{
    this.newCategory=''
    this.newName=''
    this.newDescription=''
    this.newWeight=''
    this.newPrice=null
    this.productImage=''
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${this.uuid()}.${file.type.split('/')[1]}`;
    const task = this.afStorage.upload(filePath, file);
    this.uploadProgress = task.percentageChanges();
    task.then( e => {
      this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe( url => {
        this.productImage = url;
      });
    });
  }

  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
