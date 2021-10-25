import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";

import { BehaviorSubject, Observable } from 'rxjs';
import { concatMap, delay, last, map, mergeMap, pluck } from 'rxjs/operators';

import { Student } from "../model/student";
import { Lesson } from "../model/lesson";

@Injectable({
    providedIn: 'root'
})

export class LessonService {

    constructor(private http: HttpClient) { }

    getStudent(first_name: string, last_name: string): Observable<Student> {
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
        ).pipe(
            pluck("0")
        );
    }

    getLessons(student_id: Student, pageIndex: number, pageSize: number) {
        // console.log(student_id);
        // console.log("page: " + page + " count: " + per_page);

        return this.http.get<Lesson[]>('https://api.teachworks.com/v1/lessons',
            {
                headers: {
                    'Authorization': 'Token token=st_live_a8TXhTVAzoDmrN4kfx9-uw',
                },
                params: {
                    'student_id': student_id.id,
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
                // delay(500),
                mergeMap(params => this.getLessons(params, pageIndex, pageSize))
            );
    }

}