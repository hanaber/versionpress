/// <reference path='../../typings/typings.d.ts' />

import * as React from 'react';
import * as request from 'superagent';
import * as portal from '../common/portal';
import * as WpApi from '../services/WpApi';

export function revertDialog(title: React.ReactNode, okHandler: Function) {
  portal.confirmDialog(title, '', () => {}, () => {}, {loading: true});

  WpApi
    .get('can-revert')
    .end((err: any, res: request.Response) => {
      if (res.body) {
        const body = (
          <div>
            <p>
              For EAP releases, please have a backup. {' '}
              <a
                href='http://docs.versionpress.net/en/feature-focus/undo-and-rollback'
                target='_blank'
              >Learn more about reverts.</a>
            </p>
          </div>
        );
        portal.confirmDialog(title, body, okHandler, () => {}, {});
      } else {
        const body = (
          <div>
            <p className='undo-warning'>
              <span className='icon icon-warning' />
              You have {' '}
              <a
                href='http://docs.versionpress.net/en/feature-focus/undo-and-rollback#uncommitted-files'
                target='_blank'
              >uncommitted changes</a>
              in your WordPress directory. {' '}
              <br />
              Please commit them before doing a revert.
            </p>
          </div>
        );
        portal.confirmDialog(title, body, () => {}, () => {}, {okButtonClasses: 'disabled'});
      }
    });
}