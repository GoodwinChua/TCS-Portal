import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";

import { BehaviorSubject, EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, delay, last, map, mergeMap, pluck } from 'rxjs/operators';

import { Student } from "../model/student";
import { Lesson } from "../model/lesson";

@Injectable({
    providedIn: 'root'
})

export class LessonService {

    student_id: string;

    constructor(private http: HttpClient) { 
        this.student_id = "0";
    }

    getStudent(first_name: string, last_name: string): Observable<Student[]> {
        return this.http.get<Student[]>('https://api.teachworks.com/v1/students',
            {
                headers: {
                    'Authorization': 'Token token=st_live_a8TXhTVAzoDmrN4kfx9-uw',
                },
                params: {
                    'first_name': first_name,
                    'last_name': last_name
                }
            }
        );
    }

    getLessons(student_id: Student[], pageIndex: number, pageSize: number) {
        // console.log(student_id);
        // console.log("page: " + page + " count: " + per_page);
        
        if (student_id.length == 0){
            return throwError("NO STUDENT FOUND");
        }

        this.student_id = student_id[0].id;

        return this.http.get<Lesson[]>('https://api.teachworks.com/v1/lessons',
            {
                headers: {
                    'Authorization': 'Token token=st_live_a8TXhTVAzoDmrN4kfx9-uw',
                },
                params: {
                    'student_id': student_id[0].id,
                    'status': 'Attended',
                    'per_page': pageSize,
                    'page': pageIndex,
                }
            }
        )
    }

    findLessons(first_name: string, last_name: string, pageIndex: number, pageSize: number) {
        return this.getStudent(first_name, last_name)
            .pipe(
                concatMap(params => this.getLessons(params, pageIndex, pageSize)
                .pipe(
                    catchError( error => {
                        if ( error.status == 403 ) {
                            console.log("TW is a n g e r y");
                            return throwError(error);
                        } else {
                            return of([]);
                        }

                    })
                ))
            );
    }
      
}