// Angular 2 polyfills

//import 'ie-shim';  // Internet Explorer
import 'core-js/es6';
import 'core-js/es7/reflect';

// Angular 2 libs
import 'zone.js/dist/zone.min';

// RxJS
// avoid importing the whole RxJS library here. Although more tedious, look for all
// "import 'rxjs/xxx';" occurences in your source code, and collect them here as well
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/sample';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/withLatestFrom';
