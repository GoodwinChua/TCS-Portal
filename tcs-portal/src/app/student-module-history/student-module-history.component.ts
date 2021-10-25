import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { LessonDataSource } from '../services/lessons-datasource';
import { LessonService } from '../services/lessons.service';

@Component({
  selector: 'app-student-module-history',
  templateUrl: './student-module-history.component.html',
  styleUrls: ['./student-module-history.component.css']
})



export class StudentModuleHistoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  studentForm: FormGroup;
  lessonsDataSource: LessonDataSource;
  displayedColumns: string[] = ["lesson_name", "employee_name", "from_date"];
  lessonCount = 100;
    
  constructor(private lessonService : LessonService) {
    this.lessonsDataSource = new LessonDataSource(this.lessonService);
    
    this.studentForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required])
    });
   }
  
  ngOnInit(): void {
  }

  showStudentHistory(){
    const {first_name, last_name } = this.studentForm.getRawValue();
    console.log(first_name + " " + last_name);
    this.paginator.firstPage();
    this.lessonsDataSource.loadLessons(first_name, last_name, 1, 20);
  }

  onChangedPage(pageData: PageEvent){
    const {first_name, last_name } = this.studentForm.getRawValue();
    console.log(first_name + " " + last_name);

    console.log(pageData);
    console.log(pageData.pageIndex + 1, pageData.pageSize);
    this.lessonsDataSource.loadLessons(first_name, last_name, pageData.pageIndex + 1, pageData.pageSize);
    
  }

}
