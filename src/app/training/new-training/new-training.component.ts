import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { UIService } from '../../shared/ui.service';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
    exercises: Exercise[];
    isLoading = false;
    private exercisesSubscription: Subscription;
    private loadingSub: Subscription;

    constructor(
        private trainingService: TrainingService,
        private uiService: UIService
    ) {}

    ngOnInit() {
        this.loadingSub = this.uiService.loadingStateChanged.subscribe(
            isLoading => {
                this.isLoading = isLoading;
            }
        );
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
        this.loadingSub.unsubscribe();
        this.exercisesSubscription.unsubscribe();
    }
}
