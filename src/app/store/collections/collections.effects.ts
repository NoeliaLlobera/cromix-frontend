import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {createCollection, loadCollections} from "./collections.actions";
import {exhaustMap, map, of} from "rxjs";
import {HomeService} from "../../home/service/home.service";
import {catchError} from "rxjs/operators";

@Injectable()
export class CollectionsEffects {
  private actions$ = inject(Actions);
  private service = inject(HomeService);
  private readonly router: Router = inject(Router);

  getCollections$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCollections),
      exhaustMap(() => this.service.getCollections()
        .pipe(
          map((collections) => {
            return {type: '[Collections API] Load Collections Success', collections: collections}
          }),
          catchError(error => of({type: '[Collections API] Load Collections Failure', error: error.error.code}))
        )
      )
    )
  })

  createCollection$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType(createCollection),
      exhaustMap((action) => this.service.postCollection(action.collection)
        .pipe(
          map((collections) => {
            return {type: '[Collections API] Create Collection Success', collections: collections}
          }),
          catchError(error => of({type: '[Collections API] Create Collection Failure', error: error.error.code}))
        )
      )
    )
  });

  deleteCollection$ = createEffect(()=> {
    return this.actions$.pipe(
      ofType('[Collections API] Delete Collection'),
      exhaustMap((action) => this.service.deleteCollection(action.collection_id)
        .pipe(
          map((collections) => {
            return {type: '[Collections API] Delete Collection Success', collections: collections}
          }),
          catchError(error => of({type: '[Collections API] Delete Collection Failure', error: error.error.code}))
        )
      )
    )
  })

  reloadAfterSucess = createEffect(() => {
    return this.actions$.pipe(
      ofType('[Collections API] Delete Collection Success', '[Collections API] Create Collection Success'),
      map(() => {
        return {type: '[Collections API] Load Collections'};
      })
    );
  })

}
