import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import setupSinon from 'ember-sinon-qunit';
import 'qunit-sinon-assertions';

setApplication(Application.create(config.APP));

setupSinon();
start();
