import { Component } from '@angular/core';

@Component({
  selector: 'home',
  template: `
<main>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="well">
          <h2>Home</h2>
          <p>This is the home page content.</p>
          <p>It has a link to <a routerLink="/private">private area</a>, in a lazily loaded module.<p>
        </div>
      </div>
    </div>
  </div>
</main>
  `,
  styles: [`
    .container {
      margin-top: 40px;
      background-color: peru;
    }
  `],
})
export class HomeComponent {
}
