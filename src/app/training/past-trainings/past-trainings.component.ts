import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    OnDestroy
} from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
    selector: 'app-past-trainings',
    templateUrl: './past-trainings.component.html',
    styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent
    implements OnInit, AfterViewInit, OnDestroy {
    displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
    dataSource = new MatTableDataSource<Exercise>();
    finishedExercisesSubscription: Subscription;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private trainingService: TrainingService) {}

    ngOnInit() {
        this.finishedExercisesSubscription = this.trainingService.finishedExercisesChanged.subscribe(
            (exercises: Exercise[]) => {
                this.dataSource.data = exercises;
            }
        );
        this.trainingService.fetchCompletedOrCancelledExercises();
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    doFiler(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnDestroy() {
        this.finishedExercisesSubscription.unsubscribe();
    }
}
