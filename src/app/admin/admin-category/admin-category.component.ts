import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/modules/category.module';
import { database } from 'firebase';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  arrayCategories:Array<ICategory>=[]
  newCategory:string
  // editCategoryName:string
  CategoryId:string
  deleteCat:ICategory;

  modalRef: BsModalRef;

  searchName:string
  
  editStatus: boolean;
  constructor(private modalService: BsModalService,
              private categoryService:CategoryService) {}
 
  ngOnInit(): void {
    this.getCategory()
    // console.log(this.arrayCategories)
  }

  addModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.editStatus=false
  }

  deleteModal(template: TemplateRef<any>,category:ICategory) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-sm');
    this.deleteCat=category
  }
  editModal(template: TemplateRef<any>,category:ICategory) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-sm');
    
    this.newCategory=category.name
    this.CategoryId=category.id

    this.editStatus=true
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
  addCategory():void{
    const newCat:ICategory=new Category(`${this.uuid()}`,this.newCategory);
    // if (this.arrayCategories.length > 0) {
    //   console.log(this.arrayCategories.length)
    //   newCat.id = this.arrayCategories.slice(-1)[0].id + 1;
    this.arrayCategories.push(newCat)
    console.log(this.arrayCategories)
      // this.arrayCategories[length-1]=newCat
    this.categoryService.addCloudCategory(newCat)
    this.newCategory=''
    // console.log(newCat)
    // console.log(this.arrayCategories)
    
  }

  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  deleteCategory(category:ICategory):void{
    this.categoryService.deleteCloudCategory(category)
    this.getCategory()
    // .subscribe(
    //   ()=>{this.getCategory()}
    // )
    this.modalRef.hide()
  }
  dismissCategory():void{
    this.modalRef.hide()
  }
  public saveEditCategory(): void{
    const editD: ICategory = new Category(this.CategoryId,this.newCategory);
    console.log(editD)
    this.categoryService.updateCloudCategory(editD)
    this.getCategory();
    // .subscribe(
    //   () => {
    //     this.getCategory();
    //   }
    // );
    this.newCategory=''
  }
}
