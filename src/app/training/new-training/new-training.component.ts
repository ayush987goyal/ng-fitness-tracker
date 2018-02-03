import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { UIService } from '../../shared/ui.service';
import * as fromApp from '../../app.reducer';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
    exercises: Exercise[];
    isLoading$: Observable<boolean>;
    private exercisesSubscription: Subscription;

    constructor(
        private trainingService: TrainingService,
        private uiService: UIService,
        private store: Store<fromApp.State>
    ) {}

    ngOnInit() {
        this.isLoading$ = this.store.select(fromApp.getIsLoading);
        this.exercisesSubscription = this.trainingService.exercisesChanged.subscribe(
            exercises => {
                this.exercises = exercises;
            }
        );
        this.fetchExercises();
    }

    fetchExercises() {
        this.trainingService.fetchAvailableExercises();
    }

    onStartTraining(form: NgForm) {
        this.trainingService.startExercise(form.value.exercise);
    }

    ngOnDestroy() {
        if (this.exercisesSubscription) {
            this.exercisesSubscription.unsubscribe();
        }
    }
}
