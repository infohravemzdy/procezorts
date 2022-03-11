import { series, src, dest } from 'gulp';
import * as shell from 'gulp-shell';
import replace = require("gulp-replace");

const compile = () => src('package.json').pipe(shell('npm run compile'));

const copy = () => src(['README.md']).pipe(dest('dist'));

const update = () => src('package.json').pipe(replace('"private": true,', '"private": false,')).pipe(dest('dist'));

const publish = () => src('package.json').pipe(shell('cd dist && npm publish'));

export default series(compile, copy, update, publish);