export class Lesson {
    id: string;
    lesson_id: string;
    student_name: string;
    course_name: string;
    start_date: Date;
    
    constructor(id: string, lesson_id: string, student_name: string, course_name: string, start_date: Date){
        this.id = id;
        this.lesson_id = lesson_id;
        this.student_name = student_name;
        this.course_name = course_name;
        this.start_date = start_date;
    }

}