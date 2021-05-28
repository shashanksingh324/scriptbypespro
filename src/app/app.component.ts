import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { DataService } from './services/data.service';

export interface UserDataElement {
  name: {
    title: string;
    first: string;
    last: string;
  };
  dob: Dob;
  location: Location;
  email: string;
  phone: string;
}

export interface Name {
  title: string;
  first: string;
  last: string;
}
export interface Dob {
  date: Date;
  age: number;
}
export interface Location {
  street: any;
  city: string;
  state: string;
  country: string;
  postcode: string;
  coordinates: any;
  timezone: any;
}
export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['name', 'dob', 'location', 'email', 'phone'];
  dataSource: MatTableDataSource<UserDataElement> = new MatTableDataSource<UserDataElement>();
  filterForm: FormGroup;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {

    this.filterForm = this.formBuilder.group({
      city: ''
    });

    this.getSourceData();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'name': return item.name.first;
        case 'dob': return item.dob.date;
        case 'location': return item.location.city;

        default: return item[property];
      }
    };
    this.dataSource.filterPredicate = ((data: UserDataElement, filter: string) => {
      return (data.location.city.toLocaleLowerCase()).indexOf(filter) != -1;
    });
  }
  getSourceData() {
    this.dataService.getData().subscribe((data: any) => {
      this.dataSource.data = data.results;
    }, err => {
      console.log(err);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  clearFilter() {
    this.filterForm.get('city').setValue('');
    this.dataSource.filter = '';
  }

}
