import { Component } from '@angular/core';

@Component({
  selector: 'private-area',
  template: `
    <header>Private area header</header>
    <section class="container-fluid">
      <div class="row">
        <div class="col-md-2">Here goes the sidebar</div>
        <main class="col-md-10">
          Here goes the main content
        </main>
      </div>
    </section>
  `,
  styleUrls: ['./component.css'],
})
export class PrivateComponent {
}
