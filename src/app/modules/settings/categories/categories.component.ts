import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { CategoriesFormComponent } from './categories-form/categories-form.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [DialogService]
})
export class CategoriesComponent {
  colsData: any[] = [
    {
      text: 'ID',
      field: 'Id',
    },
    {
      field: 'Image',
      text: 'Category photo',
    },
    {
      field: 'Name',
      text: 'Category name',
    },
  ];
  rowsData: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalRecords!: number;
  ref: DynamicDialogRef | undefined;

  constructor(private categoryService: CategoriesService,public dialogService: DialogService) {}

  ngOnInit(): void {
    this.getCategories({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    });
  }
  visible: boolean = false;

  showDialog() {
    this.visible = true;
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

  show(data?: Credential) {
    this.ref = this.dialogService.open(CategoriesFormComponent, {
      header: data ? 'Edit Category' : 'Add New Category',
      width: '40%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false,
      data: data,
    });

    this.ref.onClose.subscribe((res) =>
      res ? this.getCategories({ pageNumber: 1, pageSize: 10 }) : ''
    );
  }
}
