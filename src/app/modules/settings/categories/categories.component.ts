import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  colsData: any[] = [
    {
      text: 'ID',
      field:'Id'
    },
    {
      field: 'Image',
      text: 'Category photo',
    },
    {
      field: 'Name',
      text: 'Category name',
    }
  ];
  rowsData: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalRecords!: number;
  constructor(private categoryService:CategoriesService){}

  ngOnInit(): void {
    this.getCategories({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    });
  }

  getCategories(e: any) {
    this.categoryService
      .getAllCategories(e.page ? e.page + 1 : 1, e.rows ? e.rows : 10)
      .subscribe((data: any) => {
        this.rowsData = data.Data;
        this.totalRecords = data.PgTotal;
        this.pageNumber = data.PageNumber;
        this.pageSize = data.PageSize;
      });
  }
}
