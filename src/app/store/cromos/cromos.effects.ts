import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {exhaustMap, map, mergeMap, of, withLatestFrom} from "rxjs";
import {catchError} from "rxjs/operators";
import {EditCollectionService} from "../../edit-collection/services/edit-collection.service";
import {getCollectionInfo, getCromos} from "./cromos.actions";
import {Store} from "@ngrx/store";
import {selectCollectionInfo} from "./cromos.selectors";

@Injectable()
export class CromosEffects {
  private actions$ = inject(Actions);
  private service = inject(EditCollectionService);
  private readonly router: Router = inject(Router);
  private store = inject(Store);


  getCollectionInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCollectionInfo),
      exhaustMap((action) => this.service.getCollectionById(action.collection_id)
        .pipe(
          map((collection) => {
            return {type: '[Cromos Page] Get Collection Success', collection: collection}
          }),
          catchError(error => of({type: '[Cromos Page] Get Collection Failure', error: error.error.code}))
        )
      )
    );
  })

  getCromos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCromos),
      exhaustMap((action) => this.service.getCromoTypeByCollectionId(action.collection_id)
        .pipe(
          map((cromos) => {
            return {type: '[Cromos Page] Get Cromos Success', cromos: cromos}
          }),
          catchError(error => of({type: '[Cromos Page] Get Cromos Failure', error: error.error.code}))
        )
      )
    );
  })

  createCromo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType('[Cromos API] Create Cromo'),
      withLatestFrom(this.store.select(selectCollectionInfo)),
      exhaustMap(([action, collection]) => this.service.createCromo(action.cromo)
        .pipe(
          mergeMap((cromo) => [
            {type: '[Cromos API] Create Cromo Success', cromo: cromo},
            {type: '[Growl] Set Growl Message', growl: {message: 'Cromo creat correctament', type: 'success'}},
            {type: '[Cromos Page] Get Cromos', collection_id: collection.collection_id},
          ]),
          catchError(error => of({type: '[Cromos API] Create Cromo Failure', error: error.error.code}))
        )
      )
    );
  })

  deleteCromo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType('[Cromos API] Delete Cromo'),
      withLatestFrom(this.store.select(selectCollectionInfo)),
      exhaustMap(([action, collection]) =>
        this.service.deleteCromo(action.cromo_id).pipe(
          mergeMap(() => [
            {type: '[Cromos API] Delete Cromo Success', cromo_id: action.cromo_id},
            {type: '[Growl] Set Growl Message', growl: {message: 'Cromo eliminat correctament', type: 'success'}},
            {type: '[Cromos Page] Get Cromos', collection_id: collection.collection_id},
          ]),
          catchError(error => of({type: '[Cromos API] Delete Cromo Failure', error: error.error.code}))
        )
      )
    );
  });


  updateCromo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType('[Cromos API] Update Cromo'),
      withLatestFrom(this.store.select(selectCollectionInfo)),
      exhaustMap(([action, collection]) =>
        this.service.updateCromo(action.cromo).pipe(
          mergeMap(() => [
            {type: '[Cromos API] Update Cromo Success', cromo: action},
            {type: '[Growl] Set Growl Message', growl: {message: 'Cromo modificat correctament', type: 'success'}},
            {type: '[Cromos Page] Get Cromos', collection_id: collection.collection_id},
          ]),
          catchError(error => of({type: '[Cromos API] Delete Cromo Failure', error: error.error.code}))
        )
      )
    );
  });
}
