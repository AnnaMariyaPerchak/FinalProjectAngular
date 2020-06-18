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
  
  arrayCategories:Array<any>=[]

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
