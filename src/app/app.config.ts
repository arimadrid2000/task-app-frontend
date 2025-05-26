import { ApplicationConfig, NgModule } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from "./app.routes";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { AuthInterceptor } from './auth.interceptor'

export const appConfig: ApplicationConfig = {
    // providers: [
    //   provideRouter(routes),
    //   provideAnimationsAsync(),
    //   provideHttpClient(),
    //   provideFirebaseApp(() => initializeApp({"projectId":"task-app-293dd","appId":"1:1095150282846:web:8167f370662595ebedeccf","storageBucket":"task-app-293dd.firebasestorage.app","apiKey":"AIzaSyBbKg4nnQ5csnGGfYuwx3rb00FMNgQkcno","authDomain":"task-app-293dd.firebaseapp.com","messagingSenderId":"1095150282846"})),
    //   provideAuth(() => getAuth()),
    //   provideFirestore(() => getFirestore()),
    //   provideDatabase(() => getDatabase()),
    //   provideFunctions(() => getFunctions()),
    //   provideStorage(() => getStorage()),
    //   provideRemoteConfig(() => getRemoteConfig())
    // ]
    providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideFirebaseApp(() => initializeApp({"projectId":"task-app-293dd","appId":"1:1095150282846:web:8167f370662595ebedeccf","storageBucket":"task-app-293dd.firebasestorage.app","apiKey":"AIzaSyBbKg4nnQ5csnGGfYuwx3rb00FMNgQkcno","authDomain":"task-app-293dd.firebaseapp.com","messagingSenderId":"1095150282846"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    provideRemoteConfig(() => getRemoteConfig())
  ]
};
