import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of, timer } from "rxjs";
import { Injectable } from '@angular/core';
import { Lesson } from "../model/lesson";
import { LessonService } from "./lessons.service";
import { catchError, delayWhen, finalize, retryWhen, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class LessonDataSource extends DataSource<Lesson> {

    private loadingSubject = new BehaviorSubject<boolean>(false);
    private lessonsSubject = new BehaviorSubject<Lesson[]>([]);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private lessonsService: LessonService) {
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
        console.log("connect method");
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        console.log("DC");
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }

    loadLessons(first_name: string, last_name: string, pageIndex: number, pageSize: number) {
        this.loadingSubject.next(true);
        this.lessonsSubject.next([]);
        return this.lessonsService.findLessons(first_name, last_name, pageIndex, pageSize)
            .pipe(
                // finalize(() => this.loadingSubject.next(false)),
                retryWhen(errors => {
                    return errors.pipe(
                        delayWhen(() => timer(1000)),
                        tap( () => console.log("retrying..."))
                    );
                })
            ).subscribe(lessons => {
                console.log(lessons);
                this.loadingSubject.next(false);
                this.lessonsSubject.next(lessons);
            }, error => {
                console.log("uh oh in datasource");
                console.log(error);
            });
    }



}