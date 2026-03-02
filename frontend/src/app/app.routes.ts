import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('../containers/home/home.container').then((m) => m.HomeContainer),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('../containers/products/products.container').then((m) => m.ProductsContainer),
  },
  {
    path: 'offers',
    loadComponent: () =>
      import('../containers/offers/offers.container').then((m) => m.OffersContainer),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('../containers/about/about.container').then((m) => m.AboutContainer),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
